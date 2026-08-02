import React, { useState } from 'react';

export const FullAppView: React.FC = () => {
  // Navigation & View state: 'dashboard' | 'risk-assessment' | 'analytics' | 'profile'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'risk-assessment' | 'analytics' | 'profile'>('dashboard');
  
  // Dashboard states
  const [timeRange, setTimeRange] = useState<'1W' | '1M'>('1W');
  
  // Risk Assessment states (Step 1 to 5)
  const [riskStep, setRiskStep] = useState<number>(2);
  const [selectedGoal, setSelectedGoal] = useState<'wealth' | 'retirement' | 'education' | 'safety'>('wealth');

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0D121F] font-sans flex flex-col justify-between selection:bg-blue-200">
      
      {/* ========================================================================= */}
      {/* MAIN TOP HEADER / NAVBAR */}
      {/* ========================================================================= */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <circle cx="9" cy="12" r="2" />
                <path d="M16 12h2" />
              </svg>
            </div>
            <span className="font-black text-xl tracking-tight text-slate-900">
              FundFit AI
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('risk-assessment')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                activeTab === 'risk-assessment' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M9 12l2 2 4-4m5 .5a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Risk Assessment</span>
            </button>

            <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600 relative transition-colors">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600"></span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTENT CONTAINER */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 pb-24">
        
        {/* VIEW 1: DASHBOARD MAIN PAGE */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Global Portfolio Balance */}
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Global Portfolio</span>
              
              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">$124,500.00</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-extrabold shadow-sm">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                  ~ 2.4%
                </span>
              </div>

              {/* Risk Level Bar */}
              <div className="flex items-center gap-2.5 pt-1.5">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-blue-700">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>Low-Medium Risk</span>
                </div>
                <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[28%] h-full bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Performance History Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-base text-slate-900">Performance History</h3>
                
                {/* 1W / 1M Pill Tabs */}
                <div className="flex p-0.5 bg-slate-100 rounded-xl">
                  <button 
                    onClick={() => setTimeRange('1W')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      timeRange === '1W' 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    1W
                  </button>
                  <button 
                    onClick={() => setTimeRange('1M')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      timeRange === '1M' 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    1M
                  </button>
                </div>
              </div>

              {/* Interactive Smooth SVG Chart */}
              <div className="relative pt-4">
                <svg className="w-full h-32 overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="fullChartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Horizontal Grid */}
                  <line x1="0" y1="90" x2="300" y2="90" stroke="#F1F5F9" strokeWidth="1" />
                  
                  {/* Fill Path */}
                  <path 
                    d={timeRange === '1W' 
                      ? "M 10 65 C 50 65, 70 80, 100 80 C 130 80, 150 40, 180 40 C 210 40, 230 90, 250 90 C 270 90, 280 40, 290 35 L 290 90 L 10 90 Z"
                      : "M 10 80 C 60 40, 90 20, 130 60 C 170 100, 200 40, 250 30 C 270 20, 280 50, 290 45 L 290 90 L 10 90 Z"
                    } 
                    fill="url(#fullChartGlow)" 
                    className="transition-all duration-500"
                  />
                  
                  {/* Line Path */}
                  <path 
                    d={timeRange === '1W'
                      ? "M 10 65 C 50 65, 70 80, 100 80 C 130 80, 150 40, 180 40 C 210 40, 230 90, 250 90 C 270 90, 280 40, 290 35"
                      : "M 10 80 C 60 40, 90 20, 130 60 C 170 100, 200 40, 250 30 C 270 20, 280 50, 290 45"
                    }
                    fill="none" 
                    stroke="#2563EB" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />

                  {/* Nodes */}
                  <circle cx={timeRange === '1W' ? "180" : "250"} cy={timeRange === '1W' ? "40" : "30"} r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
                  <circle cx="290" cy={timeRange === '1W' ? "35" : "45"} r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
                </svg>

                {/* X Axis Labels */}
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider pt-3">
                  {timeRange === '1W' ? (
                    <>
                      <span>MON</span>
                      <span>TUE</span>
                      <span>WED</span>
                      <span>THU</span>
                      <span>FRI</span>
                    </>
                  ) : (
                    <>
                      <span>WEEK 1</span>
                      <span>WEEK 2</span>
                      <span>WEEK 3</span>
                      <span>WEEK 4</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Grid 2 Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Market Sentiment */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between h-36">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path d="M23 6l-9.5 9.5-5-5L1 18" />
                    </svg>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 tracking-wide">Bullish</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-400 block">Market Sentiment</span>
                  <span className="text-lg font-black text-slate-900 leading-tight">Strong Momentum</span>
                </div>
              </div>

              {/* Card 2: Goal Retirement */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between h-36 relative overflow-hidden">
                {/* SVG Donut Arc Background */}
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-15 pointer-events-none">
                  <svg viewBox="0 0 36 36" className="w-28 h-28">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#CBD5E1" strokeWidth="4" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2563EB" strokeWidth="4" strokeDasharray="68 32" strokeDashoffset="0" />
                  </svg>
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-base font-black text-blue-600">68%</span>
                </div>

                <div className="relative z-10 space-y-0.5">
                  <span className="text-xs font-bold text-slate-400 block">Goal: Retirement</span>
                  <span className="text-lg font-black text-slate-900 leading-tight">On Track</span>
                </div>
              </div>

            </div>

            {/* AI Insights Header */}
            <div className="flex items-center justify-between pt-2">
              <h2 className="font-black text-lg text-slate-900 tracking-tight">AI Insights</h2>
              <button onClick={() => setActiveTab('analytics')} className="text-xs font-extrabold text-blue-600 hover:underline">
                View All
              </button>
            </div>

            {/* AI Insights Featured Dark Card */}
            <div className="bg-[#0A1931] text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden space-y-5">
              {/* Gear Head Watermark SVG */}
              <div className="absolute right-2 bottom-2 w-36 h-36 opacity-10 text-slate-300 pointer-events-none">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 3.43 1.72 6.45 4.34 8.28l1.09-1.9C5.46 17.07 4 14.7 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.7-1.46 5.07-3.43 6.38l1.09 1.9C20.28 18.45 22 15.43 22 12c0-5.52-4.48-10-10-10zm-1 5h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>

              <div className="flex items-center justify-between relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-600 text-xs font-black uppercase tracking-widest text-white shadow-md">
                  <svg className="w-3.5 h-3.5 text-yellow-300 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  TOP PICK
                </span>
                <span className="text-xs font-bold text-slate-300">94% Confidence Score</span>
              </div>

              <div className="space-y-1 relative z-10">
                <h3 className="text-xl font-black text-white leading-tight">Vanguard Total Stock Market</h3>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Ticker: VTI</p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 relative z-10">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-xs font-black text-slate-300">S&P</div>
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-700 flex items-center justify-center text-xs font-black text-slate-900">US</div>
                </div>
                <button className="px-6 py-2.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 transition-all font-black text-xs shadow-lg">
                  Invest Now
                </button>
              </div>
            </div>

            {/* Rebalance Warning Banner */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between hover:border-slate-200 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Rebalance Required</h4>
                  <p className="text-xs text-slate-400 leading-snug">Tech sector exposure exceeded 45% threshold.</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-4 gap-4 pt-2">
              <div className="flex flex-col items-center space-y-1.5">
                <button className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-blue-600 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">DEPOSIT</span>
              </div>

              <div className="flex flex-col items-center space-y-1.5">
                <button className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-blue-600 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">TRANSFER</span>
              </div>

              <div className="flex flex-col items-center space-y-1.5">
                <button onClick={() => setActiveTab('analytics')} className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-blue-600 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </button>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">INSIGHTS</span>
              </div>

              <div className="flex flex-col items-center space-y-1.5">
                <button onClick={() => setActiveTab('profile')} className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-blue-600 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">CONFIG</span>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: RISK ASSESSMENT WIZARD PAGE */}
        {activeTab === 'risk-assessment' && (
          <div className="space-y-6 animate-fadeIn max-w-xl mx-auto">
            
            {/* Progress Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-blue-600">
                <span>STEP 0{riskStep} OF 05</span>
                <span>{riskStep * 20}% Complete</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${riskStep * 20}%` }}></div>
              </div>
            </div>

            {/* STEP 2: PRIMARY GOAL & RADAR CHART (EXACT SCREENSHOT MOCKUP) */}
            {riskStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Risk Assessment</h2>
                  <p className="text-xs font-semibold text-slate-500">
                    Determine your strategy and alignment with market volatility.
                  </p>
                </div>

                {/* Radar Chart Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
                  <div className="flex justify-center py-2 relative">
                    <svg className="w-56 h-56 overflow-visible" viewBox="0 0 100 100">
                      <polygon points="50,10 90,40 75,85 25,85 10,40" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                      <polygon points="50,22 80,45 69,79 31,79 20,45" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                      <polygon points="50,34 70,50 62,72 38,72 30,50" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
                      <polygon points="50,46 60,55 56,66 44,66 40,55" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />

                      <line x1="50" y1="50" x2="50" y2="10" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="2,2" />
                      <line x1="50" y1="50" x2="90" y2="40" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="2,2" />
                      <line x1="50" y1="50" x2="75" y2="85" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="2,2" />
                      <line x1="50" y1="50" x2="25" y2="85" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="2,2" />
                      <line x1="50" y1="50" x2="10" y2="40" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="2,2" />

                      <polygon points="50,20 82,42 67.5,74.5 33.75,72.75 20,45" fill="rgba(59, 130, 246, 0.25)" stroke="#2563EB" strokeWidth="2.5" />

                      <circle cx="50" cy="20" r="3.5" fill="#2563EB" />
                      <circle cx="82" cy="42" r="3.5" fill="#2563EB" />
                      <circle cx="67.5" cy="74.5" r="3.5" fill="#2563EB" />
                      <circle cx="33.75" cy="72.75" r="3.5" fill="#2563EB" />
                      <circle cx="20" cy="45" r="3.5" fill="#2563EB" />

                      <text x="50" y="6" textAnchor="middle" className="text-[6px] font-black fill-blue-600">GROWTH</text>
                      <text x="94" y="42" textAnchor="start" className="text-[6px] font-black fill-blue-600">AGILITY</text>
                      <text x="77" y="90" textAnchor="start" className="text-[6px] font-black fill-slate-400">STABILITY</text>
                      <text x="23" y="90" textAnchor="end" className="text-[6px] font-black fill-blue-600">SECURITY</text>
                      <text x="6" y="42" textAnchor="end" className="text-[6px] font-black fill-slate-400">DIVERSIFY</text>
                    </svg>
                  </div>

                  <div className="text-center space-y-1 pb-1">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-xs font-black text-blue-600 border border-blue-100">
                      Growth-Oriented Persona
                    </span>
                    <p className="text-xs font-bold text-slate-500">
                      Investor Score: <span className="text-slate-900 font-black text-sm">84/100</span>
                    </p>
                  </div>
                </div>

                {/* Questions Section */}
                <div className="space-y-4">
                  <h3 className="font-black text-base text-slate-900">What is your primary investment goal?</h3>
                  
                  <div className="space-y-3">
                    {/* Option 1: Wealth Creation */}
                    <button 
                      onClick={() => setSelectedGoal('wealth')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        selectedGoal === 'wealth' ? 'border-blue-600 bg-blue-50/40 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${selectedGoal === 'wealth' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                          <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path d="M23 6l-9.5 9.5-5-5L1 18" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-black text-sm text-slate-900 block">Wealth Creation</span>
                          <span className="text-xs text-slate-400 font-semibold">Long-term capital appreciation.</span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                        selectedGoal === 'wealth' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                      }`}>
                        {selectedGoal === 'wealth' && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>

                    {/* Option 2: Retirement */}
                    <button 
                      onClick={() => setSelectedGoal('retirement')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        selectedGoal === 'retirement' ? 'border-blue-600 bg-blue-50/40 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${selectedGoal === 'retirement' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                          <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-black text-sm text-slate-900 block">Retirement</span>
                          <span className="text-xs text-slate-400 font-semibold">Steady growth and preservation.</span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                        selectedGoal === 'retirement' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                      }`}>
                        {selectedGoal === 'retirement' && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>

                    {/* Option 3: Education */}
                    <button 
                      onClick={() => setSelectedGoal('education')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        selectedGoal === 'education' ? 'border-blue-600 bg-blue-50/40 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${selectedGoal === 'education' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                          <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9-5m9 5v7m-9-2v3m18-3v3m-9-10v7" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-black text-sm text-slate-900 block">Education</span>
                          <span className="text-xs text-slate-400 font-semibold">Funding future learning goals.</span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                        selectedGoal === 'education' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                      }`}>
                        {selectedGoal === 'education' && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>

                    {/* Option 4: Safety */}
                    <button 
                      onClick={() => setSelectedGoal('safety')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        selectedGoal === 'safety' ? 'border-blue-600 bg-blue-50/40 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${selectedGoal === 'safety' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                          <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path d="M9 12l2 2 4-4m5 .5a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-black text-sm text-slate-900 block">Safety</span>
                          <span className="text-xs text-slate-400 font-semibold">Focus on capital protection.</span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                        selectedGoal === 'safety' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                      }`}>
                        {selectedGoal === 'safety' && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => setRiskStep(1)}
                    className="flex-1 py-3.5 text-xs font-extrabold text-blue-600 border border-blue-600 rounded-2xl hover:bg-blue-50 transition-colors text-center"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={() => setRiskStep(3)}
                    className="flex-1 py-3.5 text-xs font-extrabold text-white bg-[#0A1931] rounded-2xl hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Next Step</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>

              </div>
            )}

            {/* Other Steps */}
            {riskStep !== 2 && (
              <div className="text-center py-12 space-y-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-slate-900">Step 0{riskStep} Configuration</h3>
                <p className="text-xs text-slate-500 font-semibold">Customize additional risk parameters or return to main goal step.</p>
                <button 
                  onClick={() => setRiskStep(2)}
                  className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-extrabold text-xs shadow-md"
                >
                  Return to Step 02 (Mockup Screen)
                </button>
              </div>
            )}

          </div>
        )}

        {/* VIEW 3: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Asset Allocation</span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Analytics & Breakdown</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-8">
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="60 40" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="-60" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="10 90" strokeDashoffset="-90" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-base font-black text-slate-900">18.4%</span>
                  <span className="text-[10px] font-bold text-slate-400">XIRR</span>
                </div>
              </div>

              <div className="space-y-3 text-xs w-full">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-600"></span>Equity Holdings</span>
                  <span className="text-slate-900 font-extrabold text-sm">60%</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span>Debt & Cash</span>
                  <span className="text-slate-900 font-extrabold text-sm">30%</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span>Gold / Alternatives</span>
                  <span className="text-slate-900 font-extrabold text-sm">10%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                AV
              </div>
              <div>
                <h2 className="font-black text-xl text-slate-900">Aria Vance</h2>
                <p className="text-xs text-slate-400 font-bold mt-0.5">Premium Wealth Account • RIA Client</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* FIXED BOTTOM NAVIGATION BAR */}
      {/* ========================================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 py-3 px-6 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="flex flex-col items-center gap-1 transition-all"
          >
            <div className={`px-4 py-1.5 rounded-full transition-all ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className={`text-[10px] font-extrabold ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}>Home</span>
          </button>

          <button 
            onClick={() => setActiveTab('analytics')}
            className="flex flex-col items-center gap-1 transition-all"
          >
            <div className={`px-4 py-1.5 rounded-full transition-all ${activeTab === 'analytics' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className={`text-[10px] font-extrabold ${activeTab === 'analytics' ? 'text-blue-600' : 'text-slate-400'}`}>Analytics</span>
          </button>

          <button 
            onClick={() => setActiveTab('risk-assessment')}
            className="flex flex-col items-center gap-1 transition-all"
          >
            <div className={`px-4 py-1.5 rounded-full transition-all ${activeTab === 'risk-assessment' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <span className={`text-[10px] font-extrabold ${activeTab === 'risk-assessment' ? 'text-blue-600' : 'text-slate-400'}`}>Risk App</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className="flex flex-col items-center gap-1 transition-all"
          >
            <div className={`px-4 py-1.5 rounded-full transition-all ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className={`text-[10px] font-extrabold ${activeTab === 'profile' ? 'text-blue-600' : 'text-slate-400'}`}>Profile</span>
          </button>

        </div>
      </nav>

    </div>
  );
};
