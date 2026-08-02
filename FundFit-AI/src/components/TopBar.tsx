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
    { id: '1', title: 'Fund Mismatch Alert', desc: 'Quant Small Cap weight exceeds target risk profile by 4%.', time: '10m ago', unread: true },
    { id: '2', title: 'SIP Auto-Debit Executed', desc: '₹25,000 processed for Parag Parikh Flexi Cap.', time: '2h ago', unread: false },
    { id: '3', title: 'Market Regime Update', desc: 'NIFTY shifted to Bullish Expansion cycle.', time: '1d ago', unread: false },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090D16]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-2.5">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        
        {/* Live Market Index Ticker */}
        <div className="hidden md:flex items-center gap-4 overflow-x-auto text-xs py-1 px-3 rounded-xl bg-slate-900/60 border border-white/5">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Market Live:</span>
          {MARKET_INDICES.map((idx) => (
            <div key={idx.name} className="flex items-center gap-1.5 shrink-0">
              <span className="font-semibold text-slate-300">{idx.name}</span>
              <span className="font-extrabold text-white">{idx.value.toLocaleString('en-IN')}</span>
              <span className={`flex items-center font-bold text-[10px] ${idx.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {idx.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {idx.changePercent > 0 ? `+${idx.changePercent}%` : `${idx.changePercent}%`}
              </span>
            </div>
          ))}
        </div>

        {/* Global Search Trigger */}
        <button 
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs text-slate-400 w-full max-w-xs transition-all"
        >
          <Search className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="truncate">Search funds, AMC, goals (Ctrl+K)...</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded font-mono ml-auto">⌘K</kbd>
        </button>

        {/* Right Actions & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Role Switcher */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/5 text-xs">
            <button
              onClick={() => setUserRole('investor')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${userRole === 'investor' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Investor
            </button>
            <button
              onClick={() => setUserRole('advisor')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${userRole === 'advisor' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <Building2 className="w-3 h-3" /> Advisor
            </button>
            <button
              onClick={() => setUserRole('admin')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${userRole === 'admin' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <ShieldCheck className="w-3 h-3" /> Admin
            </button>
          </div>

          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 transition-all"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Notification Popover */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 relative transition-all"
            >
              <Bell className="w-4 h-4 text-indigo-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 glass-card p-4 border-indigo-500/30 bg-[#0D121F] shadow-2xl z-50 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-xs font-bold text-white">Notifications</h4>
                  <span className="badge badge-rose text-[9px]">1 Unread</span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-500">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-300">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center font-bold text-white text-xs">
                AV
              </div>
              <span className="font-semibold text-white hidden sm:inline">Aria Vance</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 glass-card p-3 border-indigo-500/30 bg-[#0D121F] shadow-2xl z-50 space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/20">
                  <div className="font-bold text-white">Aria Vance</div>
                  <div className="text-[10px] text-indigo-300 font-semibold">Pro Investor • ₹24.85L AUM</div>
                </div>

                <div className="space-y-1 pt-1">
                  <button onClick={onLogout} className="w-full text-left p-2 rounded-lg text-rose-400 hover:bg-rose-950/30 flex items-center gap-2">
                    <LogOut className="w-3.5 h-3.5" /> Log Out
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
