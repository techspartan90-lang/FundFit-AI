import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  ChevronDown, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  LogOut,
  Building2
} from 'lucide-react';
import { MARKET_INDICES } from '../data/mutualFundData';

interface TopBarProps {
  currentView: string;
  onOpenCommandPalette: () => void;
  userRole: 'investor' | 'advisor' | 'admin';
  setUserRole: (role: 'investor' | 'advisor' | 'admin') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onLogout: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenCommandPalette,
  userRole,
  setUserRole,
  theme,
  toggleTheme,
  onLogout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: '1', title: 'Fund Risk Mismatch', desc: 'Quant Small Cap weight exceeds risk budget by 4%.', time: '10m ago', unread: true },
    { id: '2', title: 'SIP Executed', desc: '₹25,000 processed for Parag Parikh Flexi Cap.', time: '2h ago', unread: false },
    { id: '3', title: 'Market Cycle Shift', desc: 'NIFTY shifted to Bullish Expansion cycle.', time: '1d ago', unread: false },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#020617]/90 backdrop-blur-md border-b border-[#1E293B] px-4 lg:px-8 py-2.5 selection:bg-blue-600 selection:text-white font-sans">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        
        {/* Live Market Index Ticker */}
        <div className="hidden lg:flex items-center gap-4 overflow-x-auto text-xs py-1.5 px-3.5 rounded-xl bg-[#0F172A] border border-[#1E293B]">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            MARKET LIVE:
          </span>
          {MARKET_INDICES.map((idx) => (
            <div key={idx.name} className="flex items-center gap-1.5 shrink-0 font-mono">
              <span className="font-bold text-slate-300">{idx.name}</span>
              <span className="font-extrabold text-white">{idx.value.toLocaleString('en-IN')}</span>
              <span className={`flex items-center font-bold text-[10px] ${idx.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {idx.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {idx.changePercent > 0 ? `+${idx.changePercent}%` : `${idx.changePercent}%`}
              </span>
            </div>
          ))}
        </div>

        {/* Global Search Trigger (Ctrl + K) */}
        <button 
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-xs text-slate-400 w-full max-w-xs transition-all"
        >
          <Search className="w-4 h-4 text-blue-500 shrink-0" />
          <span className="truncate">Search funds, AMC, goals (Ctrl+K)...</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] bg-[#1E293B] text-slate-300 rounded font-mono ml-auto">Ctrl+K</kbd>
        </button>

        {/* Right Actions & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Role Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-[#0F172A] p-1 rounded-xl border border-[#1E293B] text-xs font-bold">
            <button
              onClick={() => setUserRole('investor')}
              className={`px-2.5 py-1 rounded-lg transition-all ${userRole === 'investor' ? 'bg-[#2563EB] text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Investor
            </button>
            <button
              onClick={() => setUserRole('advisor')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${userRole === 'advisor' ? 'bg-[#14B8A6] text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <Building2 className="w-3 h-3" /> Advisor
            </button>
            <button
              onClick={() => setUserRole('admin')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${userRole === 'admin' ? 'bg-[#7C3AED] text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <ShieldCheck className="w-3 h-3" /> Admin
            </button>
          </div>

          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-slate-300 transition-all"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>

          {/* Notification Popover */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-slate-300 relative transition-all"
            >
              <Bell className="w-4 h-4 text-blue-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl p-4 border border-[#1E293B] bg-[#0F172A] shadow-2xl z-50 space-y-3">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">System Notifications</h4>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[9px] font-extrabold">1 Unread</span>
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

          {/* User Profile */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-xs transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center font-black text-white text-xs shadow-sm">
                AV
              </div>
              <span className="font-extrabold text-white hidden sm:inline">Aria Vance</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl p-3 border border-[#1E293B] bg-[#0F172A] shadow-2xl z-50 space-y-2 text-xs font-bold">
                <div className="p-2.5 rounded-xl bg-[#020617] border border-[#1E293B]">
                  <div className="font-extrabold text-white">Aria Vance</div>
                  <div className="text-[10px] text-blue-400 font-mono mt-0.5">RIA Investor • ₹24.85L AUM</div>
                </div>

                <div className="space-y-1 pt-1">
                  <button onClick={onLogout} className="w-full text-left p-2 rounded-xl text-rose-400 hover:bg-rose-950/30 flex items-center gap-2">
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
