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
  onLogout
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'portfolio', label: 'Portfolio & Holdings', icon: PieChart, badge: '₹24.8L' },
    { id: 'funds', label: 'Mutual Fund Explorer', icon: Compass, badge: '25k+' },
    { id: 'goals', label: 'Goal Planner', icon: Target, badge: '3 Goals' },
    { id: 'market', label: 'Market Intelligence', icon: TrendingUp, badge: 'Live' },
    { id: 'ai-recommendations', label: 'AI Recommendations', icon: BrainCircuit, badge: '92 Score' },
    { id: 'reports', label: 'Reports & Tax Statements', icon: FileText, badge: null },
    { id: 'alerts', label: 'Risk Alerts', icon: Bell, badge: '1 Alert' },
    { id: 'mobile-ui', label: 'Mobile Mockup UI', icon: Sparkles, badge: 'New' },
  ];

  const portalNav = [
    { id: 'advisor', label: 'Advisor Portal', icon: Building2, role: 'advisor' },
    { id: 'admin', label: 'Admin Portal', icon: ShieldCheck, role: 'admin' },
    { id: 'settings', label: 'Settings & Security', icon: Settings, role: null },
  ];

  return (
    <aside className={`bg-[#0D121F] border-r border-white/10 flex flex-col justify-between transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} shrink-0 min-h-screen sticky top-0 z-30`}>
      
      {/* Top Branding */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-emerald-400 p-[1px]">
              <div className="w-full h-full bg-[#090D16] rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">FUND FIT <span className="text-emerald-400">AI</span></span>
          </div>
        )}

        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-white/5 transition-colors mx-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        
        {/* Main Investor Navigation */}
        <div className="space-y-1">
          {!collapsed && <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 block mb-1">Mutual Fund Intelligence</span>}
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Portals Section */}
        <div className="space-y-1 pt-3 border-t border-white/5">
          {!collapsed && <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 block mb-1">Enterprise Portals</span>}
          {portalNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-white/10">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>

    </aside>
  );
};
