'use client';

import React, { useState } from 'react';

export type UserRole = 
  | 'investor' 
  | 'advisor' 
  | 'admin' 
  | 'research' 
  | 'portfolio_manager' 
  | 'compliance' 
  | 'operations';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenCommandPalette: () => void;
  onToggleCopilot: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  onOpenCommandPalette,
  onToggleCopilot,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roles: { id: UserRole; label: string; badge: string; color: string }[] = [
    { id: 'investor', label: 'Investor Dashboard', badge: 'Retail / HNI', color: 'bg-blue-600' },
    { id: 'advisor', label: 'Advisor Portal', badge: 'RIA / MFD', color: 'bg-teal-600' },
    { id: 'admin', label: 'Admin Console', badge: 'System Ops', color: 'bg-[#7C3AED]' },
    { id: 'research', label: 'Research Analyst', badge: 'Quant & AMC', color: 'bg-purple-600' },
    { id: 'portfolio_manager', label: 'Portfolio Manager', badge: 'AUM Engine', color: 'bg-amber-600' },
    { id: 'compliance', label: 'Compliance & Audit', badge: 'SEBI / RBI', color: 'bg-rose-600' },
    { id: 'operations', label: 'Operations & Clearing', badge: 'Settlements', color: 'bg-[#14B8A6]' },
  ];

  const currentRoleObj = roles.find((r) => r.id === currentRole) || roles[0];

  const notifications = [
    { id: '1', title: 'Fund Risk Drift Warning', desc: 'Quant Small Cap weight exceeds target risk profile by 4.2%.', time: '5m ago', priority: 'High' },
    { id: '2', title: 'SIP Auto-Debit Executed', desc: '₹25,000 processed for Parag Parikh Flexi Cap Fund.', time: '1h ago', priority: 'Normal' },
    { id: '3', title: 'SEBI Regulatory Update', desc: 'New circular on mutual fund stress testing released.', time: '3h ago', priority: 'Info' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#020617]/95 backdrop-blur-xl border-b border-[#1E293B] px-4 sm:px-8 py-2.5 shadow-xl font-sans selection:bg-blue-600 selection:text-white">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Universal Command Palette Launcher */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-black text-base shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-white flex items-center gap-1.5">
                FundFit <span className="text-[#2563EB]">AI</span>
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                Wealth Operating System
              </span>
            </div>
          </div>

          {/* Universal Search Command Bar */}
          <button 
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-xs text-slate-400 w-64 lg:w-72 transition-all shadow-inner"
          >
            <span className="text-blue-500 font-bold">🔍</span>
            <span className="truncate font-semibold">Search funds, AMCs, clients (Ctrl+K)...</span>
            <kbd className="ml-auto px-1.5 py-0.5 text-[10px] bg-[#1E293B] text-slate-300 rounded-md font-mono border border-slate-700">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Center: Real-Time Live Ticker */}
        <div className="hidden xl:flex items-center gap-4 text-xs py-1.5 px-4 rounded-xl bg-[#0F172A] border border-[#1E293B] font-mono shadow-inner">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            MARKET LIVE:
          </span>
          <span className="font-bold text-slate-300">NIFTY 50 <span className="text-white font-black">24,180.5</span> <span className="text-[#22C55E] font-bold">+0.59%</span></span>
          <span className="font-bold text-slate-300">SENSEX <span className="text-white font-black">79,450.2</span> <span className="text-[#22C55E] font-bold">+0.61%</span></span>
          <span className="font-bold text-slate-300">BANK NIFTY <span className="text-white font-black">51,200.0</span></span>
          <span className="font-bold text-slate-300">GOLD <span className="text-amber-400 font-black">₹72,400</span></span>
          <span className="font-bold text-slate-300">USD/INR <span className="text-white font-black">83.50</span></span>
        </div>

        {/* Right: Role Switcher, Copilot Toggle, Notifications & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-xs font-extrabold text-white transition-all shadow-sm"
            >
              <span className={`w-2 h-2 rounded-full ${currentRoleObj.color}`}></span>
              <span>{currentRoleObj.label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                {currentRoleObj.badge}
              </span>
              <span className="text-slate-400 text-[10px]">▼</span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl p-2 border border-[#1E293B] bg-[#0F172A] shadow-2xl z-50 space-y-1 text-xs">
                <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-[#1E293B] mb-1">
                  Switch Role Persona
                </div>
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onRoleChange(r.id);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all font-bold ${
                      currentRole === r.id
                        ? 'bg-[#2563EB]/20 text-blue-400 border border-[#2563EB]/40'
                        : 'text-slate-300 hover:bg-[#020617] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${r.color}`}></span>
                      <span>{r.label}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      {r.badge}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Copilot Quick Launcher Button */}
          <button
            onClick={onToggleCopilot}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-700 hover:to-purple-700 text-white text-xs font-black shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
          >
            <span>⚡ AI Copilot</span>
          </button>

          {/* Notifications Popover */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-slate-300 relative transition-all"
              title="Notifications"
            >
              <span>🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444] animate-pulse"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl p-4 border border-[#1E293B] bg-[#0F172A] shadow-2xl z-50 space-y-3">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Enterprise Alerts</h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#EF4444]/20 text-[#EF4444] text-[9px] font-black">
                    1 High Priority
                  </span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-[#020617] border border-[#1E293B] space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-300">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-[#1E293B]">
            <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center font-black text-white text-xs shadow-md shadow-blue-500/20">
              AV
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="font-extrabold text-xs text-white">Aria Vance</span>
              <span className="text-[10px] text-blue-400 font-mono">Principal RIA</span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
