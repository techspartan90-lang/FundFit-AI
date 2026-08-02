'use client';

import React, { useState } from 'react';

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'portfolio' | 'funds' | 'goals' | 'market' | 'ai-recommendations' | 'reports' | 'alerts' | 'watchlist' | 'settings'>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [chartRange, setChartRange] = useState<'1M' | '3M' | '6M' | '1Y' | '5Y' | 'MAX'>('1Y');
  const [userRole, setUserRole] = useState<'investor' | 'advisor' | 'admin'>('investor');

  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', badge: null },
    { id: 'portfolio', label: 'Portfolio & Holdings', badge: '₹24.8L' },
    { id: 'funds', label: 'Mutual Fund Explorer', badge: '25k+' },
    { id: 'goals', label: 'Goal Planner', badge: '3 Goals' },
    { id: 'market', label: 'Market Intelligence', badge: 'Live' },
    { id: 'ai-recommendations', label: 'AI Recommendations', badge: '94 Score' },
    { id: 'reports', label: 'Reports & Tax Statements', badge: null },
    { id: 'alerts', label: 'Risk Alerts', badge: '1 Alert' },
    { id: 'watchlist', label: 'Watchlist', badge: '4 Funds' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans flex flex-col justify-between selection:bg-[#2563EB] selection:text-white antialiased">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#020617]/90 backdrop-blur-md border-b border-[#1E293B] px-4 sm:px-8 py-2.5 shadow-md">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Search */}
          <div className="flex items-center gap-6">
            <div onClick={() => setCurrentView('dashboard')} className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
                ⚡
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                FUND FIT <span className="text-[#2563EB]">AI</span>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0F172A] border border-[#1E293B] text-xs text-slate-400 w-64">
              <span>🔍 Search funds, goals (Ctrl+K)...</span>
              <kbd className="ml-auto px-1.5 py-0.5 text-[10px] bg-[#1E293B] text-slate-300 rounded font-mono">Ctrl+K</kbd>
            </div>
          </div>

          {/* Center Market Ticker */}
          <div className="hidden lg:flex items-center gap-4 text-xs py-1.5 px-3.5 rounded-xl bg-[#0F172A] border border-[#1E293B] font-mono">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
              MARKET LIVE:
            </span>
            <span className="font-bold text-slate-300">NIFTY 50 <span className="text-white font-black">24,180.5</span> <span className="text-[#22C55E]">+0.59%</span></span>
            <span className="font-bold text-slate-300">SENSEX <span className="text-white font-black">79,450.2</span> <span className="text-[#22C55E]">+0.61%</span></span>
            <span className="font-bold text-slate-300">USD/INR <span className="text-white font-black">83.50</span></span>
          </div>

          {/* Right User Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 bg-[#0F172A] p-1 rounded-xl border border-[#1E293B] text-xs font-bold">
              <button onClick={() => setUserRole('investor')} className={`px-2.5 py-1 rounded-lg ${userRole === 'investor' ? 'bg-[#2563EB] text-white' : 'text-slate-400'}`}>Investor</button>
              <button onClick={() => setUserRole('advisor')} className={`px-2.5 py-1 rounded-lg ${userRole === 'advisor' ? 'bg-[#14B8A6] text-white' : 'text-slate-400'}`}>Advisor</button>
              <button onClick={() => setUserRole('admin')} className={`px-2.5 py-1 rounded-lg ${userRole === 'admin' ? 'bg-[#7C3AED] text-white' : 'text-slate-400'}`}>Admin</button>
            </div>

            <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center font-black text-white text-xs">
              AV
            </div>
          </div>

        </div>
      </header>

      {/* Main Shell */}
      <div className="flex flex-1 max-w-[1600px] w-full mx-auto">
        
        {/* Collapsible Sidebar */}
        <aside className={`bg-[#0F172A] border-r border-[#1E293B] flex flex-col justify-between transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} shrink-0 min-h-screen p-3 space-y-4`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2 pt-2">
              {!collapsed && <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Mutual Fund Intelligence</span>}
              <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded bg-[#1E293B] text-slate-400 hover:text-white text-xs ml-auto">
                {collapsed ? '→' : '←'}
              </button>
            </div>

            <div className="space-y-1">
              {mainNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as typeof currentView)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                    currentView === item.id
                      ? 'bg-[#2563EB]/15 text-[#2563EB] border-r-2 border-[#2563EB]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {!collapsed && <span>{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">{item.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Body */}
        <main className="flex-1 p-6 space-y-6">
          
          {/* Top Hero Card */}
          <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-extrabold">
                ● SEBI Registered RIA Partner
              </span>
              <span className="px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-blue-400 text-xs font-extrabold">
                Regime: Bullish Expansion
              </span>
            </div>

            <h1 className="text-3xl font-black text-white tracking-tight">
              Investor Command Center <span className="text-slate-400 font-normal text-lg">| FinTech Platform</span>
            </h1>
          </div>

          {/* 6 Top KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Portfolio Value</span>
              <div className="text-xl font-black text-white font-mono">₹24,85,000</div>
              <span className="text-xs font-bold text-[#22C55E]">+18.4% XIRR</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Today&apos;s Gain</span>
              <div className="text-xl font-black text-[#22C55E] font-mono">+₹14,250</div>
              <span className="text-xs font-bold text-[#22C55E]">+0.58% Today</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">AI Health Score</span>
              <div className="text-xl font-black text-white font-mono">94 / 100</div>
              <span className="text-xs font-bold text-[#7C3AED]">Excellent</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Risk Profile</span>
              <div className="text-xl font-black text-cyan-400 font-mono">28 / 100</div>
              <span className="text-xs font-bold text-cyan-400">Low-Medium Risk</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Goal Progress</span>
              <div className="text-xl font-black text-[#F59E0B] font-mono">68%</div>
              <span className="text-xs font-bold text-slate-400">Retirement Target</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Market Status</span>
              <div className="text-sm font-black text-white">Bullish Cycle</div>
              <span className="text-xs font-bold text-[#22C55E]">VIX Low (14.2)</span>
            </div>
          </div>

          {/* Main Chart */}
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-[#1E293B] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-white">Portfolio Growth Performance</h3>
              <div className="flex p-0.5 bg-[#020617] rounded-xl border border-[#1E293B] text-xs font-bold">
                {(['1M', '3M', '6M', '1Y', '5Y', 'MAX'] as const).map((r) => (
                  <button key={r} onClick={() => setChartRange(r)} className={`px-3 py-1 rounded-lg ${chartRange === r ? 'bg-[#2563EB] text-white' : 'text-slate-400'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative pt-2">
              <svg className="w-full h-44" viewBox="0 0 300 100" preserveAspectRatio="none">
                <path d="M 10 70 C 50 70, 70 85, 100 80 C 130 75, 150 35, 180 35 C 210 35, 230 85, 250 85 C 270 85, 280 40, 290 30" fill="none" stroke="#2563EB" strokeWidth="3.5" />
                <circle cx="180" cy="35" r="4" fill="#7C3AED" />
                <circle cx="290" cy="30" r="4" fill="#14B8A6" />
              </svg>
            </div>
          </div>

        </main>

      </div>

    </div>
  );
}
