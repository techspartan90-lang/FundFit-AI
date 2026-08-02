'use client';

import React, { useState } from 'react';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; confidence?: number; reasoning?: string }>>([
    {
      sender: 'ai',
      text: "Hello Aria! I am your Enterprise Wealth Copilot. I've analyzed your ₹24.85L portfolio across 8 mutual funds and identified a 4.2% overweight drift in high-beta small cap equity.",
      confidence: 94.8,
      reasoning: "Portfolio beta is currently 1.28. Trimming Quant Small Cap by ₹1,00,000 into ICICI Corporate Bond will reduce overall portfolio VaR from 4.8% to 3.2% while retaining 17.5% expected XIRR."
    }
  ]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const suggestedPrompts = [
    "Rebalance portfolio to target risk budget",
    "Analyze tax-loss harvesting opportunities for FY26",
    "Compare Parag Parikh Flexi Cap vs Quant Small Cap",
    "Run 1,000-iteration Monte Carlo Retirement simulation",
  ];

  const handleSend = (textToSend?: string) => {
    const promptText = textToSend || query;
    if (!promptText.trim()) return;

    const userMsg = { sender: 'user' as const, text: promptText };
    const aiMsg = {
      sender: 'ai' as const,
      text: `Algorithmic analysis completed for: "${promptText}". Model evaluated 25,000+ mutual fund NAVs and historical rolling returns.`,
      confidence: 95.2,
      reasoning: "Backtested across 10-year market cycles including 2020 crash and 2024 bull run. Sharpe ratio improves from 1.45 to 1.82."
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-[#0F172A] border-l border-[#1E293B] shadow-2xl flex flex-col justify-between font-sans selection:bg-blue-600 selection:text-white animate-slideInRight">
      
      {/* Drawer Header */}
      <div className="p-4 border-b border-[#1E293B] bg-[#020617] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-black text-sm shadow-md">
            ⚡
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white">Enterprise AI Wealth Copilot</h3>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
              LLM Financial Reasoning Engine v4
            </span>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg bg-[#1E293B] text-slate-400 hover:text-white border border-slate-700/50 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Chat Conversation History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((m, idx) => (
          <div key={idx} className={`space-y-2 ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3.5 rounded-2xl max-w-[90%] font-medium leading-relaxed ${
              m.sender === 'user'
                ? 'bg-[#2563EB] text-white rounded-br-none shadow-md'
                : 'bg-[#020617] border border-[#1E293B] text-slate-200 rounded-bl-none shadow-md'
            }`}>
              {m.text}
            </div>

            {/* AI Reasoning & Confidence Score Card */}
            {m.sender === 'ai' && m.confidence && (
              <div className="p-3 rounded-xl bg-[#020617]/80 border border-[#7C3AED]/30 space-y-1.5 text-left font-mono">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-purple-400 font-extrabold uppercase tracking-wider">AI Reasoning Breakdown</span>
                  <span className="text-cyan-400 font-black">Confidence: {m.confidence}%</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans font-medium">{m.reasoning}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggested Prompts & Input Area */}
      <div className="p-4 border-t border-[#1E293B] bg-[#020617] space-y-3">
        
        {/* Suggested Prompts Pills */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Suggested Queries:</span>
          <div className="flex flex-wrap gap-1.5">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-[11px] font-bold text-slate-300 hover:text-white transition-all text-left truncate max-w-full"
              >
                💡 {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
              isVoiceActive
                ? 'bg-rose-600/20 text-rose-400 border-rose-500/40 animate-pulse'
                : 'bg-[#0F172A] text-slate-400 border-[#1E293B] hover:text-white'
            }`}
            title="Toggle Voice Input Mode"
          >
            🎙️
          </button>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI Copilot about funds, tax, risk..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-[#1E293B] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-medium"
          />

          <button
            onClick={() => handleSend()}
            className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all"
          >
            Send
          </button>
        </div>

      </div>

    </div>
  );
};
