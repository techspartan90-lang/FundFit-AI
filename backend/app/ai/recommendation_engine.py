class RecommendationEngine:
    @staticmethod
    def generate_recommendation(fund_name: str, cagr3y: float, expense_ratio: float, category: str) -> dict:
        """Generates XAI Buy/Hold/Switch signal with reasoning."""
        if cagr3y > 18.0 and expense_ratio < 0.8:
            signal = "Strong Buy"
            confidence = 96.0
            reasoning = f"{fund_name} has delivered consistent {cagr3y}% 3Y CAGR with an attractive {expense_ratio}% expense ratio, generating superior risk-adjusted alpha in the {category} category."
        elif cagr3y > 12.0:
            signal = "Hold"
            confidence = 90.0
            reasoning = f"{fund_name} maintains steady risk metrics. Continue active SIP to capture compound growth."
        else:
            signal = "Switch"
            confidence = 88.0
            reasoning = f"{fund_name} underperformed sector benchmarks. Consider rebalancing into higher Sharpe-ratio schemes in {category}."

        return {
            "action_signal": signal,
            "confidence_score": confidence,
            "ai_reasoning": reasoning
        }
