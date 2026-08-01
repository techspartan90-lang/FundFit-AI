import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Search, Bell, Sun, Moon, Sparkles, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardTopBar: React.FC = () => {
  const { theme, toggleTheme, setSearchOpen, user, addToast } = useAppStore();

  return (
    <header className="h-16 bg-slate-950/80 border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-xl">
      {/* Search Input */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs hover:border-slate-700 transition-all w-64 md:w-80"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span className="flex-1 text-left">Search funds, portfolios, reports...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded font-mono">⌘K</kbd>
        </button>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-3">
        
        {/* Market Engine Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Monte Carlo Engine Active (10k Paths)</span>
        </div>

        {/* Notifications */}
        <button
          onClick={() => addToast('info', 'You have 3 new portfolio insights ready for review')}
          className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-all"
        >
          <Bell className="w-4 h-4 text-slate-300" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400"></span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-all"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Profile Avatar Direct Link */}
        <Link to="/profile" className="flex items-center gap-2">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-8 h-8 rounded-lg object-cover border border-cyan-500/40"
          />
        </Link>
      </div>
    </header>
  );
};
