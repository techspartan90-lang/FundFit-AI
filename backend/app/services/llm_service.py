# LLM Service for Ollama Integration
from typing import Optional, List, Dict, Any
import logging
from ollama import AsyncClient
from app.core.config import settings

logger = logging.getLogger(__name__)

class LLMService:
    def __init__(self):
        # Initialize Ollama client
        self.ollama_host = getattr(settings, 'OLLAMA_HOST', 'http://localhost:11434')
        self.client = AsyncClient(host=self.ollama_host)
        self.default_model = getattr(settings, 'OLLAMA_DEFAULT_MODEL', 'llama2')
        logger.info(f"LLM Service initialized with host: {self.ollama_host}")
    
    async def generate_text(self, prompt: str, model: Optional[str] = None, 
                           temperature: float = 0.7, max_tokens: Optional[int] = None,
                           system: Optional[str] = None) -> str:
        """Generate text using Ollama."""
        try:
            model_to_use = model or self.default_model
            
            messages = []
            if system:
                messages.append({"role": "system", "content": system})
            else:
                messages.append({"role": "system", "content": "You are a helpful financial assistant specializing in mutual fund investments."})
            messages.append({"role": "user", "content": prompt})
            
            response = await self.client.chat(
                model=model_to_use,
                messages=messages,
                options={
                    "temperature": temperature,
                    "num_predict": max_tokens if max_tokens else -1,
                }
            )
            
            return response['message']['content']
        except Exception as e:
            logger.error(f"LLM error: {e}")
            # Return a fallback response
            return "I apologize, but I'm experiencing technical difficulties. Please try again later."
    
    async def generate_chat_response(
        self,
        messages: List[Dict[str, str]],
        model: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None
    ) -> str:
        """Generate a chat response using Ollama with message history."""
        try:
            model_to_use = model or self.default_model
            
            # Ensure we have a system message for financial advice context
            has_system = any(msg.get("role") == "system" for msg in messages)
            if not has_system:
                financial_system_msg = {
                    "role": "system",
                    "content": """You are FundFit AI, an expert financial advisor specializing in mutual fund investments, 
                    portfolio management, and financial planning for Indian investors. You provide clear, accurate, 
                    and actionable advice based on sound financial principles. When discussing specific funds, 
                    consider factors like expense ratios, historical performance, risk profile, and suitability for 
                    different investor types. Always encourage diversification and remind users that past performance 
                    does not guarantee future results. If uncertain about specific regulatory or tax matters, 
                    recommend consulting with a qualified financial advisor or tax professional."""
                }
                messages = [financial_system_msg] + messages
            
            response = await self.client.chat(
                model=model_to_use,
                messages=messages,
                options={
                    "temperature": temperature,
                    "num_predict": max_tokens if max_tokens else -1,
                }
            )
            
            return response['message']['content']
        except Exception as e:
            logger.error(f"LLM chat error: {e}")
            # Fallback response
            return self._get_fallback_response(messages)
    
    async def generate_completion(
        self,
        prompt: str,
        model: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None
    ) -> str:
        """Generate a completion - alias for generate_text for compatibility."""
        return await self.generate_text(
            prompt=prompt,
            model=model,
            temperature=temperature,
            max_tokens=max_tokens
        )
    
    def _get_fallback_response(self, messages: List[Dict[str, str]]) -> str:
        """Generate a helpful fallback response when LLM is unavailable."""
        # Extract user's last message
        user_message = ""
        for msg in reversed(messages):
            if msg.get("role") == "user":
                user_message = msg.get("content", "").lower()
                break
        
        # Provide contextual fallback responses
        if any(word in user_message for word in ["sip", "systematic", "monthly invest"]):
            return ("Systematic Investment Plans (SIPs) allow you to invest fixed amounts regularly in mutual funds. "
                   "They benefit from rupee-cost averaging and help build discipline. Consider your financial goals "
                   "and risk tolerance when choosing SIP amounts and funds.")
        elif any(word in user_message for word in ["retirement", "pension"]):
            return ("For retirement planning, start early to benefit from compounding. Estimate your retirement "
                   "needs based on expected lifestyle and inflation. Consider increasing your investments as your "
                   "income grows and review your plan annually.")
        elif any(word in user_message for word in ["tax", "saving", "80c", "elss"]):
            return ("ELSS funds offer tax benefits under Section 80C with potential for market-linked returns. "
                   "They have a 3-year lock-in. Other 80C options like PPF have longer lock-ins but different risk "
                   "profiles. Consider your investment horizon and tax bracket when choosing.")
        elif any(word in user_message for word in ["risk", "safe", "conservative"]):
            return ("If capital preservation is important, consider large-cap index funds, debt funds, or "
                   "hybrid funds with lower equity exposure. Always match investments to your risk tolerance "
                   "and investment horizon.")
        else:
            return ("I'm here to help with your investment questions. For personalized advice, consider "
                   "sharing your financial goals, investment horizon, and risk tolerance. Remember that "
                   "all investments involve risk, and you should do your own research or consult a financial advisor.")

# Create singleton instance
llm_service = LLMService()
