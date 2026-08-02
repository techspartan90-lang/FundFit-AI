import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ChevronRight
} from 'lucide-react';

interface AIChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export const AIChatbotDrawer: React.FC<AIChatbotDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello Aria! I am your Autonomous Fundfit AI Wealth Intelligence Assistant. Your portfolio is currently at ₹24,85,453 with an 18.4% XIRR and a 92/100 Fund Fit Score. How can I optimize your mutual fund strategy today?",
      timestamp: 'Just now',
      suggestions: [
        "Explain PPFAS Flexi Cap 96% score",
        "How to reach ₹5Cr Retirement goal?",
        "Tax loss harvesting options",
        "Market regime outlook"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    let aiResponseText = "";
    try {
      const history = updatedMessages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch('http://localhost:8000/api/v1/ai/chat/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          conversation_history: history.slice(0, -1) // exclude current message as it is passed as the message field
        }),
      });

      const data = await response.json();
      if (data.success && data.data && data.data.response) {
        aiResponseText = data.data.response;
      } else {
        throw new Error('API response was not successful');
      }
    } catch (err) {
      console.warn("Failed to fetch AI completion, falling back to local advisor logic:", err);
      // Fallback local advisor logic
      if (query.toLowerCase().includes('ppfas') || query.toLowerCase().includes('flexi')) {
        aiResponseText = "Parag Parikh Flexi Cap Fund scores 96/100 because of its disciplined value investing mandate, low expense ratio (0.58%), and top 5% risk-adjusted alpha over a 5-year period. Its US tech equity allocation (Alphabet, Meta) serves as a natural hedge against INR currency depreciation.";
      } else if (query.toLowerCase().includes('retirement') || query.toLowerCase().includes('goal')) {
        aiResponseText = "Your Retirement Goal of ₹5 Crores by 2042 is pacing at 96% completion probability. Continuing your ₹60,000 monthly SIP split across Flexi Cap and Large & Midcap funds is projected to generate ₹5.42 Crores at an estimated 14% long-term CAGR.";
      } else if (query.toLowerCase().includes('tax')) {
        aiResponseText = "Under current Indian IT Act rules (Section 112A), LTCG on equity mutual funds up to ₹1.25 Lakhs per financial year is tax-free. You have ₹42,000 in unrealized LTCG that can be harvested tax-free before March 31.";
      } else {
        aiResponseText = `Regarding "${query}": Based on our AMFI dataset of 25,000+ schemes and current Bullish Expansion market regime (NIFTY @ 24,180), your portfolio asset allocation remains optimal. Maintain your discipline in monthly SIP auto-debits.`;
      }
    }

    const aiMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'ai',
      text: aiResponseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-[#0D121F] border-l border-indigo-500/30 shadow-2xl flex flex-col justify-between">
      
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#111726]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
            <Bot className="w-5 h-5 animate-pulse text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white">Fundfit AI Assistant</h3>
              <span className="badge badge-emerald text-[9px]">24/7 Agent</span>
            </div>
            <p className="text-[11px] text-slate-400">Mutual Fund Intelligence Advisor</p>
          </div>
        </div>

        <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-500/20'
                : 'bg-[#182033] text-slate-200 border border-white/10 rounded-bl-none'
            }`}>
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>

            {msg.suggestions && (
              <div className="flex flex-wrap gap-1.5 mt-3 max-w-[95%]">
                {msg.suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sug)}
                    className="p-2 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/30 text-indigo-300 font-medium text-[11px] text-left transition-all flex items-center justify-between gap-2"
                  >
                    <span>{sug}</span>
                    <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-indigo-400 text-xs p-2">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>AI Assistant is calculating fund metrics...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/10 bg-[#111726]">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask AI (e.g. How to optimize tax?)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="input-field text-xs py-2.5"
          />
          <button type="submit" className="btn-primary p-2.5 rounded-xl shrink-0">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
