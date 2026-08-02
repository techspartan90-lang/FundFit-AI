'use client';

import React, { useState } from 'react';
import { UserRole } from './Navbar';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  userRole,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', badge: null },
    { id: 'portfolio', label: 'Portfolio & Holdings', icon: '💼', badge: '₹24.8L' },
    { id: 'funds', label: 'Mutual Fund Explorer', icon: '🔍', badge: '25k+' },
    { id: 'goals', label: 'Goal Planner', icon: '🎯', badge: '3 Goals' },
    { id: 'market', label: 'Market Intelligence', icon: '📈', badge: 'Live' },
    { id: 'ai-recommendations', label: 'AI Recommendations', icon: '⚡', badge: '94.8 Score' },
    { id: 'reports', label: 'Reports & Tax Center', icon: '📑', badge: null },
    { id: 'alerts', label: 'Risk & Compliance Alerts', icon: '🔔', badge: '1 Alert' },
    { id: 'watchlist', label: 'Watchlist Funds', icon: '⭐', badge: '4 Funds' },
  ];

  const enterpriseNav = [
    { id: 'advisor_portal', label: 'Advisor Client CRM', icon: '🤝', roles: ['advisor', 'admin'] },
    { id: 'research_portal', label: 'Quant Research Terminal', icon: '🔬', roles: ['research', 'admin', 'portfolio_manager'] },
    { id: 'compliance_portal', label: 'SEBI Regulatory Audit', icon: '🛡️', roles: ['compliance', 'admin'] },
    { id: 'operations_portal', label: 'Clearing & SIP Pipeline', icon: '⚙️', roles: ['operations', 'admin'] },
  ];

  const systemNav = [
    { id: 'settings', label: 'Settings & Security', icon: '🔐' },
    { id: 'help', label: 'Help & Knowledge Base', icon: '❓' },
  ];

  return (
    <aside className={`bg-[#0F172A] border-r border-[#1E293B] flex flex-col justify-between transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} shrink-0 min-h-screen sticky top-0 z-30 font-sans selection:bg-[#2563EB] selection:text-white`}>
      
      {/* Top Sidebar Header & Collapse Toggle */}
      <div className="p-4 border-b border-[#1E293B] flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
              Role: <span className="text-blue-400 uppercase font-mono">{userRole}</span>
            </span>
          </div>
        )}

        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-[#1E293B] text-slate-400 hover:text-white border border-slate-700/50 transition-colors mx-auto"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        
        {/* Main Mutual Fund Intelligence Group */}
        <div className="space-y-1">
          {!collapsed && (
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 block mb-1.5">
              Mutual Fund Intelligence
            </span>
          )}
          {mainNav.map((item) => {
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-[#2563EB]/15 text-blue-400 border-r-2 border-[#2563EB] shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-extrabold ${
                    isActive ? 'bg-[#2563EB]/20 text-blue-300' : 'bg-[#020617] text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Enterprise Portals Group */}
        <div className="space-y-1 pt-3 border-t border-[#1E293B]">
          {!collapsed && (
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 block mb-1.5">
              Enterprise Portals
            </span>
          )}
          {enterpriseNav.map((item) => {
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-400 border-r-2 border-teal-500 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* System & Security Group */}
        <div className="space-y-1 pt-3 border-t border-[#1E293B]">
          {!collapsed && (
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 block mb-1.5">
              System & Security
            </span>
          )}
          {systemNav.map((item) => {
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-purple-500/15 text-purple-400 border-r-2 border-purple-500 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Footer Details */}
      <div className="p-3 border-t border-[#1E293B] text-[10px] text-slate-500 font-mono">
        {!collapsed && <div>FundFit OS v4.2.0 • SEBI Reg</div>}
      </div>

    </aside>
  );
};
