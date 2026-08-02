import React, { useState } from 'react';

export const MobileMockupView: React.FC = () => {
  // Left Screen State
  const [leftTab, setLeftTab] = useState<'1W' | '1M'>('1W');
  const [leftNav, setLeftNav] = useState<'home' | 'analytics' | 'dashboard' | 'profile'>('home');
  const [showNotificationAlert, setShowNotificationAlert] = useState(true);
  
  // Right Screen State
  const [step, setStep] = useState<number>(2);
  const [selectedHorizon, setSelectedHorizon] = useState<'short' | 'medium' | 'long'>('long');
  const [selectedGoal, setSelectedGoal] = useState<'wealth' | 'retirement' | 'education' | 'safety'>('wealth');
  const [selectedReaction, setSelectedReaction] = useState<'sell' | 'hold' | 'buy'>('buy');
  const [selectedRebalance, setSelectedRebalance] = useState<'auto' | 'manual'>('auto');

  // Next/Prev step handlers
  const handleNextStep = () => {
    if (step < 5) setStep(prev => prev + 1);
  };
  const handlePrevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };
  const handleResetAssessment = () => {
    setStep(1);
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="glass-card p-6 border-indigo-500/20 bg-gradient-to-r from-[#111726] via-[#161D30] to-[#121A2C] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Interactive Mobile Mockup Showcase
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              High-fidelity prototype rendering of the new light-themed FundFit AI mobile design, fully interactive.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="badge badge-indigo">Light Theme V4</span>
            <span className="badge badge-emerald">Interactive Proto</span>
          </div>
        </div>
      </div>

      {/* Main Showcase Layout */}
      <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-12 py-6">
        
        {/* ========================================================================= */}
        {/* MOBILE SCREEN 1: DYNAMIC BOTTOM NAV VIEWPORT */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">1. Mobile Dashboard View</span>
            <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold">Dynamic Bottom Nav</span>
          </div>
          
          {/* Phone Frame Wrapper */}
          <div className="w-[375px] h-[812px] bg-[#F7F9FC] text-[#0D121F] rounded-[48px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-[12px] border-[#090D16] flex flex-col justify-between overflow-hidden relative font-sans selection:bg-indigo-200">
            
            {/* Camera Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-[#090D16] rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800"></div>
            </div>

            {/* Screen Header */}
            <header className="pt-8 px-6 pb-2 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-slate-100 sticky top-0 z-20">
              <div className="flex items-center gap-2">
                {/* Logo Icon */}
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <circle cx="9" cy="12" r="2" />
                    <path d="M16 12h2" />
                  </svg>
                </div>
                <span className="font-extrabold text-base tracking-tight text-slate-800">FundFit AI</span>
              </div>
              <button 
                onClick={() => setShowNotificationAlert(prev => !prev)}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600 relative"
              >
                {showNotificationAlert && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600"></span>}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </button>
            </header>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              
              {/* Home tab Content */}
              {leftNav === 'home' && (
                <>
                  {/* Portfolio Balance Area */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Global Portfolio</span>
                    <div className="flex items-baseline gap-2.5">
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight">$124,500.00</h2>
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                        2.4%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-blue-700">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>Low-Medium Risk</span>
                      </div>
                      <div className="flex-1 max-w-[80px] h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-[28%] h-full bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Performance History Card */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-sm text-slate-800">Performance History</h3>
                      <div className="flex p-0.5 bg-slate-100 rounded-lg">
                        <button 
                          onClick={() => setLeftTab('1W')}
                          className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${leftTab === '1W' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          1W
                        </button>
                        <button 
                          onClick={() => setLeftTab('1M')}
                          className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${leftTab === '1M' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          1M
                        </button>
                      </div>
                    </div>

                    {/* SVG Curve Chart */}
                    <div className="relative pt-2">
                      <svg className="w-full h-24 overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        
                        {/* Grid Lines */}
                        <line x1="0" y1="90" x2="300" y2="90" stroke="#F1F5F9" strokeWidth="1" />
                        
                        {/* Fill Area */}
                        <path 
                          d={leftTab === '1W' 
                            ? "M 0 70 Q 40 72 75 80 T 150 40 T 225 90 T 300 35 L 300 90 L 0 90 Z"
                            : "M 0 50 Q 50 20 100 80 T 200 30 T 300 65 L 300 90 L 0 90 Z"
                          } 
                          fill="url(#chartGlow)" 
                          className="transition-all duration-500"
                        />
                        
                        {/* Line Path */}
                        <path 
                          d={leftTab === '1W'
                            ? "M 0 70 Q 40 72 75 80 T 150 40 T 225 90 T 300 35"
                            : "M 0 50 Q 50 20 100 80 T 200 30 T 300 65"
                          }
                          fill="none" 
                          stroke="#2563EB" 
                          strokeWidth="3.5" 
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />

                        {/* Peak Point */}
                        {leftTab === '1W' ? (
                          <>
                            <circle cx="150" cy="40" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                            <circle cx="300" cy="35" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                          </>
                        ) : (
                          <>
                            <circle cx="200" cy="30" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                          </>
                        )}
                      </svg>

                      {/* Chart Labels */}
                      <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider pt-2.5">
                        {leftTab === '1W' ? (
                          <>
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                          </>
                        ) : (
                          <>
                            <span>Week 1</span>
                            <span>Week 2</span>
                            <span>Week 3</span>
                            <span>Week 4</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sentiment & Goal cards */}
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Sentiment Card */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-28">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path d="M23 6l-9.5 9.5-5-5L1 18" />
                          </svg>
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-600 tracking-wide">Bullish</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 block">Market Sentiment</span>
                        <span className="text-sm font-black text-slate-800 leading-tight">Strong Momentum</span>
                      </div>
                    </div>

                    {/* Goal Card */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-28 relative overflow-hidden">
                      <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10 pointer-events-none">
                        <svg className="w-20 h-20 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-xs font-black text-blue-600">68%</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 block">Goal: Retirement</span>
                        <span className="text-sm font-black text-slate-800 leading-tight">On Track</span>
                      </div>
                    </div>

                  </div>

                  {/* AI Insights Header */}
                  <div className="flex items-center justify-between pt-1">
                    <h3 className="font-extrabold text-sm text-slate-800">AI Insights</h3>
                    <button onClick={() => setLeftNav('analytics')} className="text-[11px] font-bold text-blue-600 hover:underline">View All</button>
                  </div>

                  {/* dark blue AI Insights card */}
                  <div className="bg-[#0A1931] text-white rounded-3xl p-5 shadow-lg border border-slate-800 relative overflow-hidden space-y-4">
                    
                    {/* Background gear SVG head */}
                    <div className="absolute right-2 bottom-2 w-28 h-28 opacity-10 text-slate-300 pointer-events-none">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 3.43 1.72 6.45 4.34 8.28l1.09-1.9C5.46 17.07 4 14.7 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.7-1.46 5.07-3.43 6.38l1.09 1.9C20.28 18.45 22 15.43 22 12c0-5.52-4.48-10-10-10zm-1 5h2v6h-2zm0 8h2v2h-2z" />
                      </svg>
                    </div>

                    <div className="flex items-center justify-between relative z-10">
                      {/* Top pick pill */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-[10px] font-extrabold uppercase tracking-widest text-white">
                        <svg className="w-3 h-3 text-yellow-300 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        Top Pick
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">94% Confidence Score</span>
                    </div>

                    <div className="space-y-1 relative z-10">
                      <h4 className="text-base font-black text-white leading-tight">Vanguard Total Stock Market</h4>
                      <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Ticker: VTI</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800/80 pt-3.5 relative z-10">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-black text-slate-300">S&P</div>
                        <div className="w-7 h-7 rounded-full bg-white border border-slate-700 flex items-center justify-center text-[9px] font-black text-slate-900">US</div>
                      </div>
                      <button className="px-5 py-2 rounded-full bg-white text-slate-900 hover:bg-slate-100 transition-colors font-bold text-xs shadow-md">
                        Invest Now
                      </button>
                    </div>
                  </div>

                  {/* Warning Banner */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between hover:border-slate-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                        <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-slate-800 leading-tight">Rebalance Required</h4>
                        <p className="text-[10px] text-slate-400 leading-snug">Tech sector exposure exceeded 45% threshold.</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Action Buttons Grid */}
                  <div className="grid grid-cols-4 gap-3.5 pt-1">
                    <div className="flex flex-col items-center space-y-1">
                      <button className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all text-blue-600 flex items-center justify-center font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </button>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wide">Deposit</span>
                    </div>

                    <div className="flex flex-col items-center space-y-1">
                      <button className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all text-blue-600 flex items-center justify-center font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </button>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wide">Transfer</span>
                    </div>

                    <div className="flex flex-col items-center space-y-1">
                      <button onClick={() => setLeftNav('analytics')} className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all text-blue-600 flex items-center justify-center font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </button>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wide">Insights</span>
                    </div>

                    <div className="flex flex-col items-center space-y-1">
                      <button onClick={() => setLeftNav('profile')} className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all text-blue-600 flex items-center justify-center font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wide">Config</span>
                    </div>
                  </div>
                </>
              )}

              {/* Analytics Tab Content */}
              {leftNav === 'analytics' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Asset Allocation</span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Portfolio Analysis</h3>
                  </div>

                  {/* Custom Donut Chart */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-6">
                    <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        {/* Empty ring */}
                        <circle cx="18" cy="18" r="15.91" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                        {/* Equity: 60% */}
                        <circle cx="18" cy="18" r="15.91" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="60 40" strokeDashoffset="0" />
                        {/* Debt: 30% */}
                        <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="-60" />
                        {/* Gold: 10% */}
                        <circle cx="18" cy="18" r="15.91" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="10 90" strokeDashoffset="-90" />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-xs font-black text-slate-800">18.4%</span>
                        <span className="text-[8px] font-bold text-slate-400">XIRR</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs w-full">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>Equity</span>
                        <span className="text-slate-800">60%</span>
                      </div>
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>Debt / Cash</span>
                        <span className="text-slate-800">30%</span>
                      </div>
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>Alternative</span>
                        <span className="text-slate-800">10%</span>
                      </div>
                    </div>
                  </div>

                  {/* Fund Performance List */}
                  <div className="space-y-2.5">
                    <h4 className="font-extrabold text-xs text-slate-800">Top Performing Funds</h4>
                    
                    <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-xs text-slate-800 block">PPFAS Flexi Cap</span>
                        <span className="text-[9px] text-slate-400">Mutual Fund • Value</span>
                      </div>
                      <span className="text-xs font-black text-emerald-600">+22.4% YTD</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-xs text-slate-800 block">Quant Small Cap</span>
                        <span className="text-[9px] text-slate-400">Mutual Fund • Aggressive</span>
                      </div>
                      <span className="text-xs font-black text-emerald-600">+28.1% YTD</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Dashboard Tab Content */}
              {leftNav === 'dashboard' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mutual Fund Tickers</span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Holdings</h3>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-extrabold text-slate-800">Parag Parikh Flexi Cap</span>
                        <span className="font-bold text-emerald-600">+₹1,42,800</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-2/3"></div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span>Current: $45,200</span>
                        <span>Invested: $30,000</span>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-extrabold text-slate-800">HDFC Top 100 Fund</span>
                        <span className="font-bold text-emerald-600">+₹58,400</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-1/2"></div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span>Current: $28,400</span>
                        <span>Invested: $20,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Tab Content */}
              {leftNav === 'profile' && (
                <div className="space-y-5 animate-fadeIn">
                  {/* Profile Card */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
                      AV
                    </div>
                    <div>
                      <h3 className="font-black text-base text-slate-800">Aria Vance</h3>
                      <p className="text-[10px] text-slate-400 font-bold">Premium Investor Account</p>
                    </div>
                  </div>

                  {/* Settings toggles */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3.5 text-xs font-semibold">
                    <h4 className="font-black text-slate-800 text-[11px] uppercase tracking-wider border-b border-slate-100 pb-2">Account Configuration</h4>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Multi-Factor Auth (MFA)</span>
                      <div className="w-8 h-4.5 bg-blue-600 rounded-full p-0.5 flex justify-end cursor-pointer">
                        <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Real-Time Risk Alerts</span>
                      <div className="w-8 h-4.5 bg-blue-600 rounded-full p-0.5 flex justify-end cursor-pointer">
                        <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Weekly Performance Reports</span>
                      <div className="w-8 h-4.5 bg-slate-200 rounded-full p-0.5 flex cursor-pointer">
                        <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Screen Bottom Nav Bar */}
            <footer className="border-t border-slate-100 bg-white py-3 px-6 flex items-center justify-between sticky bottom-0 z-20">
              <button 
                onClick={() => setLeftNav('home')}
                className="flex flex-col items-center gap-1 transition-all"
              >
                <div className={`p-1.5 rounded-xl transition-all ${leftNav === 'home' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className={`text-[9px] font-extrabold ${leftNav === 'home' ? 'text-blue-600' : 'text-slate-400'}`}>Home</span>
              </button>

              <button 
                onClick={() => setLeftNav('analytics')}
                className="flex flex-col items-center gap-1 transition-all"
              >
                <div className={`p-1.5 rounded-xl transition-all ${leftNav === 'analytics' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                    <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className={`text-[9px] font-extrabold ${leftNav === 'analytics' ? 'text-blue-600' : 'text-slate-400'}`}>Analytics</span>
              </button>

              <button 
                onClick={() => setLeftNav('dashboard')}
                className="flex flex-col items-center gap-1 transition-all"
              >
                <div className={`p-1.5 rounded-xl transition-all ${leftNav === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                    <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <span className={`text-[9px] font-extrabold ${leftNav === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}>Dashboard</span>
              </button>

              <button 
                onClick={() => setLeftNav('profile')}
                className="flex flex-col items-center gap-1 transition-all"
              >
                <div className={`p-1.5 rounded-xl transition-all ${leftNav === 'profile' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className={`text-[9px] font-extrabold ${leftNav === 'profile' ? 'text-blue-600' : 'text-slate-400'}`}>Profile</span>
              </button>
            </footer>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE SCREEN 2: MULTI-STEP RISK ASSESSMENT WIZARD */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">2. Risk Assessment Wizard</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">5-Step Flow</span>
          </div>
          
          {/* Phone Frame Wrapper */}
          <div className="w-[375px] h-[812px] bg-[#F7F9FC] text-[#0D121F] rounded-[48px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-[12px] border-[#090D16] flex flex-col justify-between overflow-hidden relative font-sans selection:bg-indigo-200">
            
            {/* Camera Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-[#090D16] rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800"></div>
            </div>

            {/* Screen Header */}
            <header className="pt-8 px-6 pb-2 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-slate-100 sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <circle cx="9" cy="12" r="2" />
                    <path d="M16 12h2" />
                  </svg>
                </div>
                <span className="font-extrabold text-base tracking-tight text-slate-800">FundFit AI</span>
              </div>
              <button 
                onClick={handleResetAssessment}
                className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                title="Reset Assessment"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.306 7" />
                </svg>
              </button>
            </header>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              
              {/* Progress indicator */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-black text-blue-600">
                  <span>STEP 0{step} OF 05</span>
                  <span>{step * 20}% Complete</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${step * 20}%` }}></div>
                </div>
              </div>

              {/* STEP 1: HORIZON */}
              {step === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="space-y-1 pt-1">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Time Horizon</h2>
                    <p className="text-[11px] font-semibold text-slate-400 leading-snug">
                      Let's start with your investment duration.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[13px] text-slate-800">How long do you plan to invest?</h3>
                    
                    <button 
                      onClick={() => setSelectedHorizon('short')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        selectedHorizon === 'short' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-xs text-slate-800 block">Short Term</span>
                        <span className="text-[10px] text-slate-400">1 to 3 Years horizon</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedHorizon === 'short' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {selectedHorizon === 'short' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </button>

                    <button 
                      onClick={() => setSelectedHorizon('medium')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        selectedHorizon === 'medium' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-xs text-slate-800 block">Medium Term</span>
                        <span className="text-[10px] text-slate-400">3 to 7 Years horizon</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedHorizon === 'medium' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {selectedHorizon === 'medium' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </button>

                    <button 
                      onClick={() => setSelectedHorizon('long')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        selectedHorizon === 'long' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-xs text-slate-800 block">Long Term</span>
                        <span className="text-[10px] text-slate-400">7+ Years (Compound Growth)</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedHorizon === 'long' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {selectedHorizon === 'long' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PRIMARY GOAL (MOCKUP IMAGE VIEW) */}
              {step === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  {/* Title Header */}
                  <div className="space-y-1 pt-1">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Risk Assessment</h2>
                    <p className="text-[11px] font-semibold text-slate-400 leading-snug">
                      Determine your strategy and alignment with market volatility.
                    </p>
                  </div>

                  {/* Radar Chart Card */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-4">
                    
                    {/* SVG Pentagonal Radar Chart */}
                    <div className="flex justify-center py-2 relative">
                      <svg className="w-48 h-48 overflow-visible" viewBox="0 0 100 100">
                        <polygon points="50,10 90,40 75,85 25,85 10,40" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                        <polygon points="50,22 80,45 69,79 31,79 20,45" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                        <polygon points="50,34 70,50 62,72 38,72 30,50" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
                        <polygon points="50,46 60,55 56,66 44,66 40,55" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />

                        <line x1="50" y1="50" x2="50" y2="10" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="2,2" />
                        <line x1="50" y1="50" x2="90" y2="40" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="2,2" />
                        <line x1="50" y1="50" x2="75" y2="85" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="2,2" />
                        <line x1="50" y1="50" x2="25" y2="85" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="2,2" />
                        <line x1="50" y1="50" x2="10" y2="40" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="2,2" />

                        <polygon 
                          points="50,20 82,42 67.5,74.5 33.75,72.75 20,45" 
                          fill="rgba(59, 130, 246, 0.25)" 
                          stroke="#2563EB" 
                          strokeWidth="2" 
                        />

                        <circle cx="50" cy="20" r="3" fill="#2563EB" />
                        <circle cx="82" cy="42" r="3" fill="#2563EB" />
                        <circle cx="67.5" cy="74.5" r="3" fill="#2563EB" />
                        <circle cx="33.75" cy="72.75" r="3" fill="#2563EB" />
                        <circle cx="20" cy="45" r="3" fill="#2563EB" />

                        <text x="50" y="7" textAnchor="middle" className="text-[6px] font-black fill-blue-600">GROWTH</text>
                        <text x="92" y="42" textAnchor="start" className="text-[6px] font-black fill-blue-600">AGILITY</text>
                        <text x="77" y="89" textAnchor="start" className="text-[6px] font-black fill-slate-400">STABILITY</text>
                        <text x="23" y="89" textAnchor="end" className="text-[6px] font-black fill-blue-600">SECURITY</text>
                        <text x="8" y="42" textAnchor="end" className="text-[6px] font-black fill-slate-400">DIVERSIFY</text>
                      </svg>
                    </div>

                    <div className="text-center space-y-1 pb-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-[10px] font-black text-blue-600 border border-blue-100">
                        Growth-Oriented Persona
                      </span>
                      <p className="text-xs font-bold text-slate-500">
                        Investor Score: <span className="text-slate-800 font-extrabold">84/100</span>
                      </p>
                    </div>
                  </div>

                  {/* Questions Section */}
                  <div className="space-y-3.5">
                    <h3 className="font-extrabold text-[13px] text-slate-800">What is your primary investment goal?</h3>
                    
                    <div className="space-y-2.5">
                      <button 
                        onClick={() => setSelectedGoal('wealth')}
                        className={`w-full p-3.5 rounded-2xl text-left border flex items-center justify-between transition-all ${
                          selectedGoal === 'wealth' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selectedGoal === 'wealth' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path d="M23 6l-9.5 9.5-5-5L1 18" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-extrabold text-xs text-slate-800 block">Wealth Creation</span>
                            <span className="text-[10px] text-slate-400">Long-term capital appreciation.</span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                          selectedGoal === 'wealth' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                        }`}>
                          {selectedGoal === 'wealth' && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>

                      <button 
                        onClick={() => setSelectedGoal('retirement')}
                        className={`w-full p-3.5 rounded-2xl text-left border flex items-center justify-between transition-all ${
                          selectedGoal === 'retirement' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selectedGoal === 'retirement' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-extrabold text-xs text-slate-800 block">Retirement</span>
                            <span className="text-[10px] text-slate-400">Steady growth and preservation.</span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                          selectedGoal === 'retirement' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                        }`}>
                          {selectedGoal === 'retirement' && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>

                      <button 
                        onClick={() => setSelectedGoal('education')}
                        className={`w-full p-3.5 rounded-2xl text-left border flex items-center justify-between transition-all ${
                          selectedGoal === 'education' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selectedGoal === 'education' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9-5m9 5v7m-9-2v3m18-3v3m-9-10v7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-extrabold text-xs text-slate-800 block">Education</span>
                            <span className="text-[10px] text-slate-400">Funding future learning goals.</span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                          selectedGoal === 'education' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                        }`}>
                          {selectedGoal === 'education' && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>

                      <button 
                        onClick={() => setSelectedGoal('safety')}
                        className={`w-full p-3.5 rounded-2xl text-left border flex items-center justify-between transition-all ${
                          selectedGoal === 'safety' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selectedGoal === 'safety' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path d="M9 12l2 2 4-4m5 .5a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-extrabold text-xs text-slate-800 block">Safety</span>
                            <span className="text-[10px] text-slate-400">Focus on capital protection.</span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                          selectedGoal === 'safety' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                        }`}>
                          {selectedGoal === 'safety' && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: RISK TOLERANCE */}
              {step === 3 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="space-y-1 pt-1">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Market Behavior</h2>
                    <p className="text-[11px] font-semibold text-slate-400 leading-snug">
                      Understand how you view portfolio fluctuations.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[13px] text-slate-800">How do you react to a 20% market drop?</h3>
                    
                    <button 
                      onClick={() => setSelectedReaction('sell')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        selectedReaction === 'sell' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-xs text-slate-800 block">Sell & Capital Preservation</span>
                        <span className="text-[10px] text-slate-400">Sell to prevent further downside risk.</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedReaction === 'sell' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {selectedReaction === 'sell' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </button>

                    <button 
                      onClick={() => setSelectedReaction('hold')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        selectedReaction === 'hold' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-xs text-slate-800 block">Hold & Monitor</span>
                        <span className="text-[10px] text-slate-400">Do nothing and wait for recovery.</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedReaction === 'hold' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {selectedReaction === 'hold' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </button>

                    <button 
                      onClick={() => setSelectedReaction('buy')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        selectedReaction === 'buy' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-xs text-slate-800 block">Buy the Dip</span>
                        <span className="text-[10px] text-slate-400">Add capital to buy quality stocks at discount.</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedReaction === 'buy' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {selectedReaction === 'buy' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: RECOMMENDATION */}
              {step === 4 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="space-y-1 pt-1">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Asset Allocation</h2>
                    <p className="text-[11px] font-semibold text-slate-400 leading-snug">
                      Suggested portfolio blueprint for your profile.
                    </p>
                  </div>

                  {/* Recommendation Pie Chart */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-6">
                    <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.91" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.91" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="75 25" strokeDashoffset="0" />
                        <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="15 85" strokeDashoffset="-75" />
                        <circle cx="18" cy="18" r="15.91" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="10 90" strokeDashoffset="-90" />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-800">Growth</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs w-full">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>Equity</span>
                        <span className="text-slate-800">75%</span>
                      </div>
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>Debt</span>
                        <span className="text-slate-800">15%</span>
                      </div>
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>Gold / Alt</span>
                        <span className="text-slate-800">10%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[13px] text-slate-800">Rebalancing Strategy</h3>
                    
                    <button 
                      onClick={() => setSelectedRebalance('auto')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        selectedRebalance === 'auto' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-xs text-slate-800 block">Automatic Rebalance</span>
                        <span className="text-[10px] text-slate-400">Trigger smart adjustments on regime shift.</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedRebalance === 'auto' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {selectedRebalance === 'auto' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </button>

                    <button 
                      onClick={() => setSelectedRebalance('manual')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        selectedRebalance === 'manual' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-xs text-slate-800 block">Manual Alerts</span>
                        <span className="text-[10px] text-slate-400">Send recommendation notifications.</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedRebalance === 'manual' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {selectedRebalance === 'manual' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: COMPLETED */}
              {step === 5 && (
                <div className="text-center py-8 space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Assessment Completed!</h2>
                    <p className="text-[11px] font-semibold text-slate-400 max-w-[240px] mx-auto leading-normal">
                      Your customized Wealth Blueprint is ready and applied to your account.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-100 text-left text-xs font-semibold text-slate-700 space-y-2.5 max-w-[280px] mx-auto">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Horizon:</span>
                      <span className="text-slate-900 uppercase">{selectedHorizon} Term</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Primary Goal:</span>
                      <span className="text-slate-900 capitalize">{selectedGoal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Persona:</span>
                      <span className="text-blue-600 font-extrabold">Growth-Oriented</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleResetAssessment}
                    className="btn-primary px-8 py-3 text-xs rounded-xl shadow-md w-full max-w-[220px] mx-auto justify-center"
                  >
                    Start New Assessment
                  </button>
                </div>
              )}

            </div>

            {/* Screen Bottom Button Actions */}
            <footer className="border-t border-slate-100 bg-white py-4 px-6 flex items-center gap-4 sticky bottom-0 z-20">
              <button 
                onClick={handlePrevStep}
                className="flex-1 py-3 text-xs font-extrabold text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50/50 transition-colors text-center disabled:opacity-40 disabled:pointer-events-none"
                disabled={step === 1}
              >
                Previous
              </button>
              <button 
                onClick={handleNextStep}
                className="flex-1 py-3 text-xs font-extrabold text-white bg-[#0A1931] rounded-xl hover:bg-slate-900 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
                disabled={step === 5}
              >
                <span>Next Step</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </footer>

          </div>
        </div>

      </div>
    </div>
  );
};
