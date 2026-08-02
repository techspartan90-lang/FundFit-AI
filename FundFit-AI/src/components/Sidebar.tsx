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
  LogOut,
  HelpCircle,
  Bookmark
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
  onLogout
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'portfolio', label: 'Portfolio & Holdings', icon: PieChart, badge: '₹24.8L' },
    { id: 'funds', label: 'Mutual Fund Explorer', icon: Compass, badge: '25k+' },
    { id: 'goals', label: 'Goal Planner', icon: Target, badge: '3 Goals' },
    { id: 'market', label: 'Market Intelligence', icon: TrendingUp, badge: 'Live' },
    { id: 'ai-recommendations', label: 'AI Recommendations', icon: BrainCircuit, badge: '94 Score' },
    { id: 'reports', label: 'Reports & Tax Statements', icon: FileText, badge: null },
    { id: 'alerts', label: 'Risk Alerts', icon: Bell, badge: '1 Alert' },
    { id: 'watchlist', label: 'Watchlist', icon: Bookmark, badge: '4 Funds' },
    { id: 'mobile-ui', label: 'Mobile Mockup UI', icon: Sparkles, badge: 'New' },
  ];

  const portalNav = [
    { id: 'advisor', label: 'Advisor Portal', icon: Building2 },
    { id: 'admin', label: 'Admin Portal', icon: ShieldCheck },
  ];

  const systemNav = [
    { id: 'settings', label: 'Settings & Security', icon: Settings },
    { id: 'help', label: 'Help & Documentation', icon: HelpCircle },
  ];

  return (
    <aside className={`bg-[#0F172A] border-r border-[#1E293B] flex flex-col justify-between transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} shrink-0 min-h-screen sticky top-0 z-30 font-sans selection:bg-blue-600 selection:text-white`}>
      
      {/* Top Branding */}
      <div className="p-4 border-b border-[#1E293B] flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
              ⚡
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">
              FUND FIT <span className="text-blue-500">AI</span>
            </span>
          </div>
        )}

        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-[#1E293B] text-slate-400 hover:text-white border border-slate-700/50 transition-colors mx-auto"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        
        {/* Main Investor Navigation */}
        <div className="space-y-1">
          {!collapsed && <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 block mb-1.5">Mutual Fund Intelligence</span>}
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border-r-2 border-blue-500 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                    isActive ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Enterprise Portals Section */}
        <div className="space-y-1 pt-3 border-t border-[#1E293B]">
          {!collapsed && <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 block mb-1.5">Enterprise Portals</span>}
          {portalNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-400 border-r-2 border-teal-500 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* System & Security Section */}
        <div className="space-y-1 pt-3 border-t border-[#1E293B]">
          {!collapsed && <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 block mb-1.5">System & Security</span>}
          {systemNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-violet-500/15 text-violet-400 border-r-2 border-violet-500 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-violet-400' : 'text-slate-400'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Footer / Sign Out */}
      <div className="p-3 border-t border-[#1E293B]">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/30 transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>

    </aside>
  );
};
