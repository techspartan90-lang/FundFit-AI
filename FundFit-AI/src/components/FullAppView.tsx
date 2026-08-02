import React, { useState } from 'react';

interface FullAppViewProps {
  onNavigate?: (view: string) => void;
}

export const FullAppView: React.FC<FullAppViewProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState<'1W' | '1M' | '1Y' | 'ALL'>('1W');
  const [selectedGoal, setSelectedGoal] = useState<'wealth' | 'retirement' | 'education' | 'safety'>('wealth');
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'risk-assessment'>('overview');

  // Sample chart paths
  const chartData = {
    '1W': { path: 'M 10 65 C 50 65, 70 85, 100 80 C 130 75, 150 35, 180 35 C 210 35, 230 85, 250 85 C 270 85, 280 35, 290 30', fill: 'M 10 65 C 50 65, 70 85, 100 80 C 130 75, 150 35, 180 35 C 210 35, 230 85, 250 85 C 270 85, 280 35, 290 30 L 290 95 L 10 95 Z', labels: ['MON', 'TUE', 'WED', 'THU', 'FRI'] },
    '1M': { path: 'M 10 85 C 60 40, 90 20, 130 65 C 170 100, 200 35, 250 25 C 270 20, 280 45, 290 40', fill: 'M 10 85 C 60 40, 90 20, 130 65 C 170 100, 200 35, 250 25 C 270 20, 280 45, 290 40 L 290 95 L 10 95 Z', labels: ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4'] },
    '1Y': { path: 'M 10 70 C 50 90, 100 20, 150 60 C 200 100, 240 30, 290 20', fill: 'M 10 70 C 50 90, 100 20, 150 60 C 200 100, 240 30, 290 20 L 290 95 L 10 95 Z', labels: ['Q1', 'Q2', 'Q3', 'Q4'] },
    'ALL': { path: 'M 10 90 C 80 80, 120 40, 180 50 C 220 60, 260 20, 290 15', fill: 'M 10 90 C 80 80, 120 40, 180 50 C 220 60, 260 20, 290 15 L 290 95 L 10 95 Z', labels: ['2023', '2024', '2025', '2026'] },
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      
      {/* View Header with Sub-tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E152E]/70 p-5 rounded-2xl border border-indigo-500/20 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge badge-indigo">AI Wealth Console</span>
            <span className="text-xs font-mono text-indigo-400">Live Feed</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Portfolio Intelligence & Analytics
          </h1>
        </div>

        {/* Overview vs Risk Assessment Sub-tabs */}
        <div className="flex p-1 bg-[#070A17] rounded-xl border border-indigo-500/20">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSubTab('risk-assessment')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'risk-assessment'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Risk Assessment Radar
          </button>
        </div>
      </div>

      {/* OVERVIEW SUBTAB */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Top Hero Balance Section */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0F172A] via-[#111C3A] to-[#0D142B] border border-indigo-500/25 shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                  Global Portfolio Balance
                </span>

                <div className="flex flex-wrap items-baseline gap-4">
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono">
                    $124,500<span className="text-slate-400 text-3xl sm:text-4xl">.00</span>
                  </h2>
                  
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                    ~ 2.4% ($2,918.40)
                  </span>
                </div>
              </div>

              {/* Risk Level Gauge */}
              <div className="bg-[#090F24] p-4 rounded-2xl border border-indigo-500/20 max-w-xs w-full space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Low-Medium Risk
                  </span>
                  <span className="text-indigo-400 font-mono">28 / 100</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full w-[28%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance History Chart Card */}
          <div className="rounded-3xl p-6 bg-[#0E152E] border border-indigo-500/20 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
                  Performance History
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <p className="text-xs text-slate-400">Algorithmic trend spline visualization</p>
              </div>

              {/* Range Selector Pills */}
              <div className="flex p-1 bg-[#070A17] rounded-xl border border-indigo-500/20">
                {(['1W', '1M', '1Y', 'ALL'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      timeRange === range
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Spline Chart */}
            <div className="relative pt-2">
              <svg className="w-full h-40 overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="splineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>

                  <linearGradient id="splineFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <line x1="0" y1="95" x2="300" y2="95" stroke="#1E293B" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#1E293B" strokeWidth="1" strokeDasharray="4,4" />

                <path
                  d={chartData[timeRange].fill}
                  fill="url(#splineFill)"
                  className="transition-all duration-500"
                />

                <path
                  d={chartData[timeRange].path}
                  fill="none"
                  stroke="url(#splineGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />

                <circle cx="180" cy="35" r="4.5" fill="#A855F7" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="290" cy="30" r="4.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="2" />
              </svg>

              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest pt-3">
                {chartData[timeRange].labels.map((lbl, idx) => (
                  <span key={idx} className="hover:text-indigo-400 transition-colors">{lbl}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Market Sentiment & Goal Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Sentiment */}
            <div className="rounded-3xl p-6 bg-[#0E152E] border border-indigo-500/20 shadow-md flex flex-col justify-between h-40">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M23 6l-9.5 9.5-5-5L1 18" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  Bullish
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Market Sentiment</span>
                <span className="text-xl font-extrabold text-white">Strong Upward Surge</span>
              </div>
            </div>

            {/* Card 2: Goal Retirement */}
            <div className="rounded-3xl p-6 bg-[#0E152E] border border-indigo-500/20 shadow-md flex flex-col justify-between h-40 relative overflow-hidden">
              <div className="absolute right-[-10px] bottom-[-10px] opacity-15 pointer-events-none">
                <svg viewBox="0 0 36 36" className="w-32 h-32">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#334155" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3B82F6" strokeWidth="4" strokeDasharray="68 32" strokeDashoffset="0" />
                </svg>
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-lg font-black text-blue-400 font-mono">68%</span>
              </div>

              <div className="relative z-10 space-y-0.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Goal: Retirement</span>
                <span className="text-xl font-extrabold text-white">On Track to Target</span>
              </div>
            </div>

          </div>

          {/* AI Oracle Featured Recommendation Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#121B38] via-[#1A184B] to-[#0D1226] border border-purple-500/30 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-purple-600 text-xs font-black uppercase tracking-widest text-white shadow-md">
                  ★ TOP PICK
                </span>
                <span className="text-xs font-extrabold text-cyan-300">Confidence Score: 94.8%</span>
              </div>
              <span className="text-xs text-slate-400 font-semibold">Monthly Rebalance</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white tracking-tight">
                Vanguard Total Stock Market Index
              </h3>
              <p className="text-xs font-mono font-bold text-purple-400 tracking-widest uppercase">
                TICKER: VTI • LARGE CAP BLEND
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-purple-500/20 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-purple-500/40 flex items-center justify-center text-xs font-bold text-indigo-300">S&P</div>
                  <div className="w-8 h-8 rounded-full bg-white border border-purple-500/40 flex items-center justify-center text-xs font-bold text-slate-900">US</div>
                </div>
                <span className="text-xs text-slate-300 font-semibold">Broad Market Exposure</span>
              </div>

              <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs shadow-md transition-all">
                Invest Now ⚡
              </button>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button className="p-4 rounded-2xl bg-[#0E152E] border border-indigo-500/20 hover:border-indigo-500/40 transition-all text-left space-y-2 group">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <span className="text-xs font-bold text-white block uppercase tracking-wider">Deposit Capital</span>
            </button>

            <button className="p-4 rounded-2xl bg-[#0E152E] border border-indigo-500/20 hover:border-indigo-500/40 transition-all text-left space-y-2 group">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <span className="text-xs font-bold text-white block uppercase tracking-wider">Transfer Funds</span>
            </button>

            <button onClick={() => onNavigate?.('reports')} className="p-4 rounded-2xl bg-[#0E152E] border border-indigo-500/20 hover:border-indigo-500/40 transition-all text-left space-y-2 group">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-white block uppercase tracking-wider">Analytics Mix</span>
            </button>

            <button onClick={() => onNavigate?.('settings')} className="p-4 rounded-2xl bg-[#0E152E] border border-indigo-500/20 hover:border-indigo-500/40 transition-all text-left space-y-2 group">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="text-xs font-bold text-white block uppercase tracking-wider">Config Settings</span>
            </button>
          </div>

        </div>
      )}

      {/* RISK ASSESSMENT SUBTAB */}
      {activeSubTab === 'risk-assessment' && (
        <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-cyan-400 font-mono">
              <span>STEP 02 OF 05</span>
              <span>40% COMPLETE</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-indigo-500/20">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full w-[40%]"></div>
            </div>
          </div>

          <div className="rounded-3xl p-6 bg-[#0E152E] border border-indigo-500/20 shadow-lg space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-white">Risk Assessment Radar</h2>
              <p className="text-xs text-slate-400">Algorithmic investor profile pentagon visualization</p>
            </div>

            {/* Radar Chart SVG */}
            <div className="flex justify-center py-4 relative">
              <svg className="w-60 h-60 overflow-visible" viewBox="0 0 100 100">
                <polygon points="50,10 90,40 75,85 25,85 10,40" fill="none" stroke="#1E293B" strokeWidth="1" />
                <polygon points="50,22 80,45 69,79 31,79 20,45" fill="none" stroke="#1E293B" strokeWidth="1" />
                <polygon points="50,34 70,50 62,72 38,72 30,50" fill="none" stroke="#334155" strokeWidth="0.8" />

                <line x1="50" y1="50" x2="50" y2="10" stroke="#334155" strokeWidth="0.8" strokeDasharray="2,2" />
                <line x1="50" y1="50" x2="90" y2="40" stroke="#334155" strokeWidth="0.8" strokeDasharray="2,2" />
                <line x1="50" y1="50" x2="75" y2="85" stroke="#334155" strokeWidth="0.8" strokeDasharray="2,2" />
                <line x1="50" y1="50" x2="25" y2="85" stroke="#334155" strokeWidth="0.8" strokeDasharray="2,2" />
                <line x1="50" y1="50" x2="10" y2="40" stroke="#334155" strokeWidth="0.8" strokeDasharray="2,2" />

                <polygon points="50,20 82,42 67.5,74.5 33.75,72.75 20,45" fill="rgba(147, 51, 234, 0.25)" stroke="#A855F7" strokeWidth="2.5" />

                <circle cx="50" cy="20" r="4" fill="#A855F7" />
                <circle cx="82" cy="42" r="4" fill="#06B6D4" />
                <circle cx="67.5" cy="74.5" r="4" fill="#6366F1" />
                <circle cx="33.75" cy="72.75" r="4" fill="#10B981" />
                <circle cx="20" cy="45" r="4" fill="#F59E0B" />

                <text x="50" y="5" textAnchor="middle" className="text-[6px] font-bold fill-purple-400">GROWTH</text>
                <text x="94" y="42" textAnchor="start" className="text-[6px] font-bold fill-cyan-400">AGILITY</text>
                <text x="77" y="91" textAnchor="start" className="text-[6px] font-bold fill-indigo-400">STABILITY</text>
                <text x="23" y="91" textAnchor="end" className="text-[6px] font-bold fill-emerald-400">SECURITY</text>
                <text x="6" y="42" textAnchor="end" className="text-[6px] font-bold fill-amber-400">DIVERSIFY</text>
              </svg>
            </div>

            <div className="text-center space-y-1">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-500/10 text-xs font-bold text-purple-400 border border-purple-500/30">
                Growth-Oriented Persona
              </span>
              <p className="text-xs font-bold text-slate-400">
                Investor Score: <span className="text-white font-mono font-black text-sm">84/100</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-base text-white">What is your primary investment goal?</h3>
            
            <button 
              onClick={() => setSelectedGoal('wealth')}
              className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                selectedGoal === 'wealth' ? 'border-purple-500 bg-[#141B3B]' : 'border-indigo-500/20 bg-[#0E152E]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold">⚡</div>
                <div>
                  <span className="font-bold text-sm text-white block">Wealth Creation</span>
                  <span className="text-xs text-slate-400">Long-term aggressive growth.</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${selectedGoal === 'wealth' ? 'border-purple-500 bg-purple-600 text-white' : 'border-slate-700'}`}>
                {selectedGoal === 'wealth' && <span className="text-xs font-black">✓</span>}
              </div>
            </button>

            <button 
              onClick={() => setSelectedGoal('retirement')}
              className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                selectedGoal === 'retirement' ? 'border-purple-500 bg-[#141B3B]' : 'border-indigo-500/20 bg-[#0E152E]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold">🛡️</div>
                <div>
                  <span className="font-bold text-sm text-white block">Retirement Corpus</span>
                  <span className="text-xs text-slate-400">Steady growth and preservation.</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${selectedGoal === 'retirement' ? 'border-purple-500 bg-purple-600 text-white' : 'border-slate-700'}`}>
                {selectedGoal === 'retirement' && <span className="text-xs font-black">✓</span>}
              </div>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
