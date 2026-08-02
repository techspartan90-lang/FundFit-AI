import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ChevronRight
} from 'lucide-react';

interface AICopilotDrawerProps {
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

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello Aria! I am your Autonomous Fundfit AI Copilot. I've audited your deck ($480k ARR, 22% MoM) and matched 5 high-conviction VCs for your $2.5M Seed round. How can I assist your pitch preparation today?",
      timestamp: 'Just now',
      suggestions: [
        "Practice VC valuation defense",
        "Refine bottom-up TAM pitch",
        "Draft monthly investor update",
        "Explain liquidation preference"
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
          conversation_history: history.slice(0, -1) // exclude current message
        }),
      });

      const data = await response.json();
      if (data.success && data.data && data.data.response) {
        aiResponseText = data.data.response;
      } else {
        throw new Error('API response was not successful');
      }
    } catch (err) {
      console.warn("Failed to fetch AI completion, falling back to local copilot logic:", err);
      // Fallback local copilot logic
      if (query.toLowerCase().includes('valuation')) {
        aiResponseText = "When VCs question your $10M Pre-Money valuation at $480k ARR, highlight your 22% MoM compounding growth rate. Remind them that at this velocity you reach $1.2M ARR in 5 months, pricing your Seed round effectively at ~8.3x forward ARR, well below the 20x median for top tier AI Seed deals.";
      } else if (query.toLowerCase().includes('tam') || query.toLowerCase().includes('market')) {
        aiResponseText = "For bottom-up TAM: State 'There are 60,000 global tech startups raising capital annually. At our average annual contract value (ACV) of $6,000/yr, our core founder market is $360M TAM. Adding VC deal-flow licensing ($12,000/yr across 5,000 funds) expands total TAM to $4.2 Billion.'";
      } else if (query.toLowerCase().includes('update')) {
        aiResponseText = "Here is a draft monthly investor update snippet:\n\n🚀 **Fundfit AI - Monthly Update**\n- **ARR:** $480k (+22% MoM)\n- **Customers:** 140 paying founders\n- **Runway:** 14 Months ($35k net burn)\n- **Ask:** Introductions to Tier-1 Seed AI VCs actively deploying Fund III.";
      } else {
        aiResponseText = `Great question regarding "${query}". Based on our investor match engine and recent Seed deal benchmarks in AI/SaaS, I recommend emphasizing your 88% gross margins and team background from Stripe & DeepMind to maintain high leverage in partner meetings.`;
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
      
      {/* Drawer Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#111726]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white">Fundfit AI Copilot</h3>
              <span className="badge badge-emerald text-[9px]">Live Agent</span>
            </div>
            <p className="text-[11px] text-slate-400">AI Pitch & Valuation Advisor</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-500/20'
                  : 'bg-[#182033] text-slate-200 border border-white/10 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>

            <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>

            {/* Render Prompt Suggestions if present */}
            {msg.suggestions && msg.suggestions.length > 0 && (
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
            <span>AI Copilot is analyzing fund data...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-white/10 bg-[#111726]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask AI Copilot (e.g. How to defend valuation?)..."
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
