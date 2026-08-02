'use client';

import React, { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'risk-assessment' | 'analytics' | 'profile'>('dashboard');
  const [timeRange, setTimeRange] = useState<'1W' | '1M'>('1W');
  const [selectedGoal, setSelectedGoal] = useState<'wealth' | 'retirement' | 'education' | 'safety'>('wealth');

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0D121F] font-sans flex flex-col justify-between selection:bg-blue-200 antialiased">
      
      {/* Top Navbar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div onClick={() => setActiveTab('dashboard')} className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <circle cx="9" cy="12" r="2" />
                <path d="M16 12h2" />
              </svg>
            </div>
            <span className="font-black text-xl tracking-tight text-slate-900">FundFit AI</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('risk-assessment')} 
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                activeTab === 'risk-assessment' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M9 12l2 2 4-4m5 .5a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Risk Assessment</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 pb-28">
        
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Balance */}
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
                <div className="flex p-0.5 bg-slate-100 rounded-xl">
                  <button 
                    onClick={() => setTimeRange('1W')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      timeRange === '1W' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    1W
                  </button>
                  <button 
                    onClick={() => setTimeRange('1M')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      timeRange === '1M' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    1M
                  </button>
                </div>
              </div>

              <div className="relative pt-4">
                <svg className="w-full h-32 overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="nextChartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="90" x2="300" y2="90" stroke="#F1F5F9" strokeWidth="1" />
                  <path 
                    d={timeRange === '1W' 
                      ? "M 10 65 C 50 65, 70 80, 100 80 C 130 80, 150 40, 180 40 C 210 40, 230 90, 250 90 C 270 90, 280 40, 290 35 L 290 90 L 10 90 Z"
                      : "M 10 80 C 60 40, 90 20, 130 60 C 170 100, 200 40, 250 30 C 270 20, 280 50, 290 45 L 290 90 L 10 90 Z"
                    } 
                    fill="url(#nextChartGlow)" 
                    className="transition-all duration-500"
                  />
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
                  <circle cx={timeRange === '1W' ? "180" : "250"} cy={timeRange === '1W' ? "40" : "30"} r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
                  <circle cx="290" cy={timeRange === '1W' ? "35" : "45"} r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
                </svg>

                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider pt-3">
                  {timeRange === '1W' ? (
                    <><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span></>
                  ) : (
                    <><span>WEEK 1</span><span>WEEK 2</span><span>WEEK 3</span><span>WEEK 4</span></>
                  )}
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between h-36 relative overflow-hidden">
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

            {/* AI Pick Card */}
            <div className="bg-[#0A1931] text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-600 text-xs font-black uppercase tracking-widest text-white shadow-md">
                  TOP PICK
                </span>
                <span className="text-xs font-bold text-slate-300">94% Confidence Score</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white leading-tight">Vanguard Total Stock Market</h3>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Ticker: VTI</p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-xs font-black text-slate-300">S&P</div>
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-700 flex items-center justify-center text-xs font-black text-slate-900">US</div>
                </div>
                <button className="px-6 py-2.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-black text-xs shadow-lg">
                  Invest Now
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Risk Assessment View */}
        {activeTab === 'risk-assessment' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-blue-600">
                <span>STEP 02 OF 05</span>
                <span>40% Complete</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-[40%]"></div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="text-center space-y-1">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-xs font-black text-blue-600 border border-blue-100">
                  Growth-Oriented Persona
                </span>
                <p className="text-xs font-bold text-slate-500">
                  Investor Score: <span className="text-slate-900 font-black text-sm">84/100</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-base text-slate-900">What is your primary investment goal?</h3>
              <button onClick={() => setSelectedGoal('wealth')} className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between ${selectedGoal === 'wealth' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'}`}>
                <span className="font-black text-sm text-slate-900">Wealth Creation</span>
              </button>
              <button onClick={() => setSelectedGoal('retirement')} className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between ${selectedGoal === 'retirement' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-100 bg-white'}`}>
                <span className="font-black text-sm text-slate-900">Retirement</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Fixed Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 py-3 px-6 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between text-xs font-black">
          <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}>Home</button>
          <button onClick={() => setActiveTab('risk-assessment')} className={activeTab === 'risk-assessment' ? 'text-blue-600' : 'text-slate-400'}>Risk App</button>
        </div>
      </nav>

    </div>
  );
}
