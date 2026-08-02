'use client';

import React, { useState, useEffect } from 'react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [search, setSearch] = useState('');

  const commands = [
    { category: 'Quick Navigation', title: 'Open Main Investor Dashboard', view: 'dashboard', icon: '📊' },
    { category: 'Quick Navigation', title: 'View Portfolio & Mutual Fund Holdings', view: 'portfolio', icon: '💼' },
    { category: 'Quick Navigation', title: 'Explore 25,000+ SEBI Mutual Funds', view: 'funds', icon: '🔍' },
    { category: 'Quick Navigation', title: 'Retirement & Wealth Goal Planner', view: 'goals', icon: '🎯' },
    { category: 'Quick Navigation', title: 'Live Market Intelligence & Indices', view: 'market', icon: '📈' },
    { category: 'Quick Navigation', title: 'AI Recommendation Engine', view: 'ai-recommendations', icon: '⚡' },
    { category: 'Quick Navigation', title: 'Generate Tax & Capital Gains Report', view: 'reports', icon: '📑' },
    { category: 'Enterprise Portals', title: 'Advisor Client Management CRM', view: 'advisor_portal', icon: '🤝' },
    { category: 'Enterprise Portals', title: 'Quant Research & AMC Screener', view: 'research_portal', icon: '🔬' },
    { category: 'Enterprise Portals', title: 'SEBI / RBI Compliance & Audit Terminal', view: 'compliance_portal', icon: '🛡️' },
  ];

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from parent window event
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#020617]/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 font-sans selection:bg-[#2563EB] selection:text-white">
      <div className="w-full max-w-xl bg-[#0F172A] border border-[#1E293B] rounded-3xl shadow-2xl overflow-hidden space-y-3 animate-fadeIn">
        
        {/* Search Header */}
        <div className="p-4 border-b border-[#1E293B] flex items-center gap-3 bg-[#020617]">
          <span className="text-blue-500 font-bold text-base">🔍</span>
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search funds, AMCs, goals..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
          />
          <kbd className="px-2 py-0.5 text-[10px] bg-[#1E293B] text-slate-400 rounded font-mono border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Command Items List */}
        <div className="max-h-80 overflow-y-auto px-2 pb-3 space-y-1">
          {filtered.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                onNavigate(item.view);
                onClose();
              }}
              className="w-full p-3 rounded-2xl flex items-center justify-between text-xs font-extrabold text-slate-300 hover:text-white hover:bg-[#2563EB]/20 hover:border-[#2563EB]/40 border border-transparent transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <div>
                  <span className="block text-white font-extrabold">{item.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{item.category}</span>
                </div>
              </div>
              <span className="text-[10px] text-blue-400 font-mono">Jump →</span>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-500 font-bold">
              No matching commands or mutual funds found for &quot;{search}&quot;.
            </div>
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="p-3 border-t border-[#1E293B] bg-[#020617] text-[10px] text-slate-500 flex justify-between font-mono px-4">
          <span>Use <b>↑ ↓</b> to navigate</span>
          <span><b>ENTER</b> to select</span>
          <span><b>ESC</b> to dismiss</span>
        </div>

      </div>
    </div>
  );
};
