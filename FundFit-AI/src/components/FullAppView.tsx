import React, { useState } from 'react';

export const FullAppView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'risk-assessment' | 'analytics' | 'ai-oracle' | 'profile'>('dashboard');
  const [timeRange, setTimeRange] = useState<'1W' | '1M' | '1Y' | 'ALL'>('1W');
  const [riskStep] = useState<number>(2);
  const [selectedGoal, setSelectedGoal] = useState<'wealth' | 'retirement' | 'education' | 'safety'>('wealth');

  // Sample data points for 1W spline curve
  const chartData = {
    '1W': { path: 'M 10 65 C 50 65, 70 85, 100 80 C 130 75, 150 35, 180 35 C 210 35, 230 85, 250 85 C 270 85, 280 35, 290 30', fill: 'M 10 65 C 50 65, 70 85, 100 80 C 130 75, 150 35, 180 35 C 210 35, 230 85, 250 85 C 270 85, 280 35, 290 30 L 290 95 L 10 95 Z', labels: ['MON', 'TUE', 'WED', 'THU', 'FRI'] },
    '1M': { path: 'M 10 85 C 60 40, 90 20, 130 65 C 170 100, 200 35, 250 25 C 270 20, 280 45, 290 40', fill: 'M 10 85 C 60 40, 90 20, 130 65 C 170 100, 200 35, 250 25 C 270 20, 280 45, 290 40 L 290 95 L 10 95 Z', labels: ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4'] },
    '1Y': { path: 'M 10 70 C 50 90, 100 20, 150 60 C 200 100, 240 30, 290 20', fill: 'M 10 70 C 50 90, 100 20, 150 60 C 200 100, 240 30, 290 20 L 290 95 L 10 95 Z', labels: ['Q1', 'Q2', 'Q3', 'Q4'] },
    'ALL': { path: 'M 10 90 C 80 80, 120 40, 180 50 C 220 60, 260 20, 290 15', fill: 'M 10 90 C 80 80, 120 40, 180 50 C 220 60, 260 20, 290 15 L 290 95 L 10 95 Z', labels: ['2023', '2024', '2025', '2026'] },
  };

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 font-sans flex flex-col justify-between relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* AMBIENT FANTASY NEBULA BACKGROUND GLOWS */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute top-[30%] right-[-10%] w-[550px] h-[550px] bg-purple-600/15 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]"></div>
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e2640_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
      </div>

      {/* ========================================================================= */}
      {/* GLOWING HEADER NAVBAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#090E20]/80 backdrop-blur-xl border-b border-indigo-500/15 px-4 sm:px-8 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <div onClick={() => setActiveTab('dashboard')} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-10 h-10 rounded-xl bg-[#0B1026] flex items-center justify-center text-indigo-400 font-black text-xl border border-indigo-500/30">
                ⚡
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                FundFit <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">AI</span>
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-400/80">Fantasy Financial Console</span>
            </div>
          </div>

          {/* Nav Badges & Quick Controls */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('ai-oracle')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all duration-300 flex items-center gap-1.5 border ${
                activeTab === 'ai-oracle' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-purple-400/40 shadow-[0_0_20px_rgba(147,51,234,0.4)]' 
                  : 'bg-[#0E152E] text-indigo-300 border-indigo-500/20 hover:border-indigo-500/40'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>AI ORACLE ⚡</span>
            </button>

            <button 
              onClick={() => setActiveTab('risk-assessment')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all duration-300 flex items-center gap-1.5 border ${
                activeTab === 'risk-assessment' 
                  ? 'bg-indigo-600 text-white border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
                  : 'bg-[#0E152E] text-slate-300 border-slate-700/50 hover:border-slate-600'
              }`}
            >
              <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M9 12l2 2 4-4m5 .5a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Risk App</span>
            </button>

            <div className="w-px h-6 bg-slate-800 hidden sm:block"></div>

            <button className="p-2 rounded-full bg-[#0E152E] hover:bg-[#141E42] border border-indigo-500/20 text-slate-300 relative transition-all">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTAINER */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8 pb-32">
        
        {/* ========================================================================= */}
        {/* VIEW 1: FANTASY DASHBOARD PAGE */}
        {/* ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Stats Banner Card */}
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0D142B]/90 via-[#101938]/90 to-[#0A1024]/90 border border-indigo-500/25 shadow-[0_0_40px_rgba(79,70,229,0.15)] backdrop-blur-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 via-purple-500/05 to-transparent rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                      Global Portfolio Balance
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">USD • Real-Time Feed</span>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-4">
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] font-mono">
                      $124,500<span className="text-slate-400 text-3xl sm:text-4xl">.00</span>
                    </h1>
                    
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                      ~ 2.4% ($2,918.40)
                    </span>
                  </div>
                </div>

                {/* Risk Gauge Bar */}
                <div className="bg-[#090F24] p-4 rounded-2xl border border-indigo-500/20 max-w-xs w-full space-y-2">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      Low-Medium Risk
                    </span>
                    <span className="text-indigo-400">Score: 28/100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full w-[28%] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance History Chart Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#0D1328]/80 border border-indigo-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-black text-xl text-white tracking-tight flex items-center gap-2">
                    Performance History
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">Interactive algorithmic trend spline visualization</p>
                </div>

                {/* Time Range Pill Selector */}
                <div className="flex p-1 bg-[#070A17] rounded-2xl border border-indigo-500/20">
                  {(['1W', '1M', '1Y', 'ALL'] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all duration-300 ${
                        timeRange === range
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-indigo-400/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fantasy SVG Spline Graph */}
              <div className="relative pt-4">
                <svg className="w-full h-44 overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="neonGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="50%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>

                    <linearGradient id="neonFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#A855F7" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                    </linearGradient>

                    <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Horizontal Grid */}
                  <line x1="0" y1="95" x2="300" y2="95" stroke="#1E293B" strokeWidth="1" strokeDasharray="4,4" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="#1E293B" strokeWidth="1" strokeDasharray="4,4" />
                  <line x1="0" y1="5" x2="300" y2="5" stroke="#1E293B" strokeWidth="1" strokeDasharray="4,4" />

                  {/* Area Gradient Fill */}
                  <path
                    d={chartData[timeRange].fill}
                    fill="url(#neonFill)"
                    className="transition-all duration-700 ease-out"
                  />

                  {/* Spline Stroke Line */}
                  <path
                    d={chartData[timeRange].path}
                    fill="none"
                    stroke="url(#neonGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="url(#glowEffect)"
                    className="transition-all duration-700 ease-out"
                  />

                  {/* Nodes */}
                  <circle cx="180" cy="35" r="5" fill="#A855F7" stroke="#FFFFFF" strokeWidth="2.5" className="animate-pulse" />
                  <circle cx="290" cy="30" r="5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="2.5" />
                </svg>

                {/* X Labels */}
                <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest pt-4">
                  {chartData[timeRange].labels.map((lbl, idx) => (
                    <span key={idx} className="hover:text-indigo-400 cursor-pointer transition-colors">{lbl}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Fantasy Grid 2 Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Market Sentiment */}
              <div className="rounded-3xl p-6 bg-[#0D1328]/80 border border-indigo-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl flex flex-col justify-between h-44 hover:border-emerald-500/40 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path d="M23 6l-9.5 9.5-5-5L1 18" />
                    </svg>
                  </div>
                  <span className="text-xs font-black text-emerald-400 tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    Bullish Momentum
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Market Sentiment</span>
                  <span className="text-2xl font-black text-white leading-tight">Strong Upward Surge</span>
                </div>
              </div>

              {/* Card 2: Goal Retirement */}
              <div className="rounded-3xl p-6 bg-[#0D1328]/80 border border-indigo-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl flex flex-col justify-between h-44 relative overflow-hidden group hover:border-blue-500/40 transition-all">
                <div className="absolute right-[-10px] bottom-[-10px] opacity-20 pointer-events-none group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 36 36" className="w-36 h-36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#334155" strokeWidth="4" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3B82F6" strokeWidth="4" strokeDasharray="68 32" strokeDashoffset="0" />
                  </svg>
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xl font-black text-blue-400 font-mono">68%</span>
                </div>

                <div className="relative z-10 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Goal: Retirement Corpus</span>
                  <span className="text-2xl font-black text-white leading-tight">On Track to Target</span>
                </div>
              </div>

            </div>

            {/* AI Insights Section Header */}
            <div className="flex items-center justify-between pt-4">
              <h2 className="font-black text-2xl text-white tracking-tight flex items-center gap-2">
                AI Oracle Recommendations
                <span className="text-xs font-bold text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  Algorithmic Engine v4
                </span>
              </h2>
              <button onClick={() => setActiveTab('ai-oracle')} className="text-xs font-black text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest">
                Explore All Picks →
              </button>
            </div>

            {/* Fantasy Featured AI Oracle Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#121B38] via-[#1A184B] to-[#0D1226] border border-purple-500/30 shadow-[0_0_40px_rgba(147,51,234,0.25)] relative overflow-hidden space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-600 text-xs font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(147,51,234,0.6)]">
                    ★ TOP PICK
                  </span>
                  <span className="text-xs font-extrabold text-cyan-300">CONFIDENCE: 94.8%</span>
                </div>

                <span className="text-xs font-bold text-slate-400">Rebalance Period: Monthly</span>
              </div>

              <div className="space-y-1 relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
                  Vanguard Total Stock Market Index
                </h3>
                <p className="text-xs font-mono font-bold text-purple-400 tracking-widest uppercase">
                  TICKER: VTI • LARGE CAP BLEND
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-purple-500/20 pt-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-9 h-9 rounded-full bg-slate-900 border-2 border-purple-500/40 flex items-center justify-center text-xs font-black text-indigo-300">S&P</div>
                    <div className="w-9 h-9 rounded-full bg-white border-2 border-purple-500/40 flex items-center justify-center text-xs font-black text-slate-900">US</div>
                  </div>
                  <span className="text-xs font-bold text-slate-300">Broad Market Exposure</span>
                </div>

                <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-black text-xs shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all uppercase tracking-wider">
                  INVEST WITH AI ORACLE ⚡
                </button>
              </div>
            </div>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <button className="p-5 rounded-3xl bg-[#0D1328]/80 border border-indigo-500/20 shadow-sm hover:border-indigo-500/50 hover:scale-105 transition-all text-left space-y-3 group">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                <span className="text-xs font-black text-white block uppercase tracking-wider">DEPOSIT CAPITAL</span>
              </button>

              <button className="p-5 rounded-3xl bg-[#0D1328]/80 border border-indigo-500/20 shadow-sm hover:border-indigo-500/50 hover:scale-105 transition-all text-left space-y-3 group">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <span className="text-xs font-black text-white block uppercase tracking-wider">SMART TRANSFER</span>
              </button>

              <button onClick={() => setActiveTab('analytics')} className="p-5 rounded-3xl bg-[#0D1328]/80 border border-indigo-500/20 shadow-sm hover:border-indigo-500/50 hover:scale-105 transition-all text-left space-y-3 group">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-xs font-black text-white block uppercase tracking-wider">ANALYTICS MIX</span>
              </button>

              <button onClick={() => setActiveTab('profile')} className="p-5 rounded-3xl bg-[#0D1328]/80 border border-indigo-500/20 shadow-sm hover:border-indigo-500/50 hover:scale-105 transition-all text-left space-y-3 group">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <span className="text-xs font-black text-white block uppercase tracking-wider">CONFIG SETTINGS</span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: RISK ASSESSMENT FANTASY RADAR */}
        {/* ========================================================================= */}
        {activeTab === 'risk-assessment' && (
          <div className="space-y-8 animate-fadeIn max-w-2xl mx-auto">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-black text-cyan-400 font-mono">
                <span>STEP 0{riskStep} OF 05</span>
                <span>{riskStep * 20}% COMPLETE</span>
              </div>
              <div className="w-full h-2 bg-[#090F24] rounded-full overflow-hidden p-0.5 border border-indigo-500/20">
                <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]" style={{ width: `${riskStep * 20}%` }}></div>
              </div>
            </div>

            {/* Radar Chart Card */}
            <div className="rounded-3xl p-8 bg-[#0D1328]/90 border border-indigo-500/25 shadow-[0_0_40px_rgba(79,70,229,0.2)] backdrop-blur-xl space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-3xl font-black text-white tracking-tight">Risk Assessment Radar</h2>
                <p className="text-xs font-semibold text-slate-400">Algorithmic investor profile pentagon visualization</p>
              </div>

              {/* Pentagon SVG Radar */}
              <div className="flex justify-center py-4 relative">
                <svg className="w-64 h-64 overflow-visible" viewBox="0 0 100 100">
                  <polygon points="50,10 90,40 75,85 25,85 10,40" fill="none" stroke="#1E293B" strokeWidth="1" />
                  <polygon points="50,22 80,45 69,79 31,79 20,45" fill="none" stroke="#1E293B" strokeWidth="1" />
                  <polygon points="50,34 70,50 62,72 38,72 30,50" fill="none" stroke="#334155" strokeWidth="0.8" />

                  <line x1="50" y1="50" x2="50" y2="10" stroke="#334155" strokeWidth="0.8" strokeDasharray="2,2" />
                  <line x1="50" y1="50" x2="90" y2="40" stroke="#334155" strokeWidth="0.8" strokeDasharray="2,2" />
                  <line x1="50" y1="50" x2="75" y2="85" stroke="#334155" strokeWidth="0.8" strokeDasharray="2,2" />
                  <line x1="50" y1="50" x2="25" y2="85" stroke="#334155" strokeWidth="0.8" strokeDasharray="2,2" />
                  <line x1="50" y1="50" x2="10" y2="40" stroke="#334155" strokeWidth="0.8" strokeDasharray="2,2" />

                  <polygon points="50,20 82,42 67.5,74.5 33.75,72.75 20,45" fill="rgba(147, 51, 234, 0.25)" stroke="#A855F7" strokeWidth="2.5" />

                  <circle cx="50" cy="20" r="4" fill="#A855F7" className="animate-ping" />
                  <circle cx="50" cy="20" r="4" fill="#A855F7" />
                  <circle cx="82" cy="42" r="4" fill="#06B6D4" />
                  <circle cx="67.5" cy="74.5" r="4" fill="#6366F1" />
                  <circle cx="33.75" cy="72.75" r="4" fill="#10B981" />
                  <circle cx="20" cy="45" r="4" fill="#F59E0B" />

                  <text x="50" y="5" textAnchor="middle" className="text-[6px] font-black fill-purple-400">GROWTH</text>
                  <text x="94" y="42" textAnchor="start" className="text-[6px] font-black fill-cyan-400">AGILITY</text>
                  <text x="77" y="91" textAnchor="start" className="text-[6px] font-black fill-indigo-400">STABILITY</text>
                  <text x="23" y="91" textAnchor="end" className="text-[6px] font-black fill-emerald-400">SECURITY</text>
                  <text x="6" y="42" textAnchor="end" className="text-[6px] font-black fill-amber-400">DIVERSIFY</text>
                </svg>
              </div>

              <div className="text-center space-y-1">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-500/10 text-xs font-black text-purple-400 border border-purple-500/30">
                  Growth-Oriented Persona
                </span>
                <p className="text-xs font-bold text-slate-400">
                  Investor Score: <span className="text-white font-black text-base font-mono">84/100</span>
                </p>
              </div>
            </div>

            {/* Question Section */}
            <div className="space-y-4">
              <h3 className="font-black text-lg text-white">What is your primary investment goal?</h3>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setSelectedGoal('wealth')}
                  className={`w-full p-5 rounded-3xl text-left border flex items-center justify-between transition-all ${
                    selectedGoal === 'wealth'
                      ? 'border-purple-500/50 bg-[#141B3B] shadow-[0_0_20px_rgba(147,51,234,0.3)]'
                      : 'border-indigo-500/15 bg-[#0D1328]/80 hover:border-indigo-500/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${selectedGoal === 'wealth' ? 'bg-purple-600 text-white' : 'bg-purple-500/10 text-purple-400'}`}>
                      ⚡
                    </div>
                    <div>
                      <span className="font-black text-base text-white block">Wealth Creation</span>
                      <span className="text-xs text-slate-400 font-semibold">Long-term aggressive capital appreciation.</span>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                    selectedGoal === 'wealth' ? 'border-purple-500 bg-purple-600 text-white' : 'border-slate-700'
                  }`}>
                    {selectedGoal === 'wealth' && <span className="text-xs font-black">✓</span>}
                  </div>
                </button>

                <button 
                  onClick={() => setSelectedGoal('retirement')}
                  className={`w-full p-5 rounded-3xl text-left border flex items-center justify-between transition-all ${
                    selectedGoal === 'retirement'
                      ? 'border-purple-500/50 bg-[#141B3B] shadow-[0_0_20px_rgba(147,51,234,0.3)]'
                      : 'border-indigo-500/15 bg-[#0D1328]/80 hover:border-indigo-500/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${selectedGoal === 'retirement' ? 'bg-purple-600 text-white' : 'bg-purple-500/10 text-purple-400'}`}>
                      🛡️
                    </div>
                    <div>
                      <span className="font-black text-base text-white block">Retirement Corpus</span>
                      <span className="text-xs text-slate-400 font-semibold">Steady compounding and capital preservation.</span>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                    selectedGoal === 'retirement' ? 'border-purple-500 bg-purple-600 text-white' : 'border-slate-700'
                  }`}>
                    {selectedGoal === 'retirement' && <span className="text-xs font-black">✓</span>}
                  </div>
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* FLOATING NEON NAVIGATION BAR */}
      {/* ========================================================================= */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0A1024]/90 backdrop-blur-2xl border border-indigo-500/30 py-2.5 px-6 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-6 text-xs font-black">
          
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🏠 Home</span>
          </button>

          <button 
            onClick={() => setActiveTab('ai-oracle')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              activeTab === 'ai-oracle'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>⚡ AI Oracle</span>
          </button>

          <button 
            onClick={() => setActiveTab('risk-assessment')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              activeTab === 'risk-assessment'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>📊 Risk Radar</span>
          </button>

        </div>
      </nav>

    </div>
  );
};
