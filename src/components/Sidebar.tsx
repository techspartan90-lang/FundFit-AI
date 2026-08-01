import React, { useState } from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  PieChart, 
  Compass, 
  Target, 
  TrendingUp, 
  BrainCircuit, 
  FileText, 
  Bell, 
  Building2, 
  ShieldCheck, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userRole: 'investor' | 'advisor' | 'admin';
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  userRole,
  onLogout
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const mainNav = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
    { id: 'portfolio', label: 'Portfolio Holdings', icon: PieChart, badge: '₹30.3L' },
    { id: 'funds', label: 'Mutual Fund Explorer', icon: Compass, badge: '25k+' },
    { id: 'goals', label: 'Goal Monte Carlo', icon: Target, badge: '3 Active' },
    { id: 'market', label: 'Market Intelligence', icon: TrendingUp, badge: 'Live' },
    { id: 'ai-recommendations', label: 'AI Recommendation Center', icon: BrainCircuit, badge: '94 Score' },
    { id: 'reports', label: 'Reports & Statements', icon: FileText, badge: null },
    { id: 'alerts', label: 'Risk & Portfolio Alerts', icon: Bell, badge: '1 Trigger' },
  ];

  const portalNav = [
    { id: 'advisor', label: 'Advisor Workspace', icon: Building2, role: 'advisor' },
    { id: 'admin', label: 'Admin Command Center', icon: ShieldCheck, role: 'admin' },
    { id: 'settings', label: 'Settings & Security', icon: Settings, role: null },
  ];

  return (
    <aside className={`bg-[#080C17]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between transition-all duration-300 ${collapsed ? 'w-18' : 'w-64'} shrink-0 min-h-screen sticky top-0 z-30`}>
      
      {/* Top Branding */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#080C17] rounded-[9px] flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white">FUND FIT <span className="text-cyan-400">AI</span></span>
            </div>
          </div>
        )}

        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white border border-white/10 transition-colors mx-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-none">
        
        {/* Main Investor Navigation */}
        <div className="space-y-1">
          {!collapsed && <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 block mb-2">Mutual Fund Intelligence</span>}
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-emerald-500/20 border border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                    item.badge === 'Live' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-300 border border-white/5'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Portal & Administration */}
        <div className="space-y-1 pt-2 border-t border-white/5">
          {!collapsed && <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 block mb-2">Portals & Control</span>}
          {portalNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/40 text-purple-300'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-emerald-400 text-slate-950 font-bold flex items-center justify-center text-xs shrink-0">
              GR
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate">Guruprasanth R</div>
                <div className="text-[10px] text-emerald-400 font-medium capitalize truncate">{userRole} Account</div>
              </div>
            )}
          </div>

          {!collapsed && (
            <button onClick={onLogout} className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </aside>
  );
};
