import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  UserCheck, 
  Settings, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  LogOut, 
  CreditCard,
  Bell
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAppStore();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: UserCheck },
    { name: 'Pricing & Plans', path: '/pricing', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'FAQ & Help', path: '/faq', icon: HelpCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 shrink-0">
      
      {/* Top Header */}
      <div>
        <div className="h-16 px-6 flex items-center border-b border-slate-800/80">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[2px]">
              <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">
              FUND FIT <span className="text-cyan-400">AI</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Main Workspace
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-indigo-600/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-9 h-9 rounded-lg object-cover border border-indigo-500/40"
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-slate-100 truncate">{user?.name}</div>
            <div className="text-[10px] text-cyan-400 font-medium truncate">{user?.plan}</div>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
