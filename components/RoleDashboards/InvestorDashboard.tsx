'use client';

import React, { useState } from 'react';

interface InvestorDashboardProps {
  onNavigate: (view: string) => void;
}

export const InvestorDashboard: React.FC<InvestorDashboardProps> = ({ onNavigate }) => {
  const [chartRange, setChartRange] = useState<'1M' | '3M' | '6M' | '1Y' | '5Y' | 'MAX'>('1Y');
  const [benchmark, setBenchmark] = useState<'NIFTY' | 'SP500'>('NIFTY');

  const watchlist = [
    { name: 'Parag Parikh Flexi Cap Fund', return1Y: '+24.2%', rating: '5 Star', category: 'Equity - Flexi Cap', nav: '₹78.40' },
    { name: 'Quant Small Cap Fund', return1Y: '+32.8%', rating: '5 Star', category: 'Equity - Small Cap', nav: '₹245.10' },
    { name: 'HDFC Top 100 Fund', return1Y: '+18.6%', rating: '4 Star', category: 'Equity - Large Cap', nav: '₹1,020.50' },
    { name: 'ICICI Prudential Corporate Bond', return1Y: '+8.2%', rating: '5 Star', category: 'Debt - Corporate Bond', nav: '₹26.30' },
  ];

  return (
    <div className="space-y-6 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Hero Header */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#0F172A] border border-[#1E293B] shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#22C55E] text-xs font-extrabold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            SEBI Registered RIA Investor Console
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-extrabold">
            Regime: Bullish Expansion
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-extrabold font-mono">
            India VIX: 14.25
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Investor Command Center <span className="text-slate-400 font-normal text-lg">| Wealth Portfolio</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold max-w-2xl mt-1">
              Bloomberg & Aladdin-grade mutual fund allocation, adaptive benchmarking, tax optimization, and AI risk management.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('ai-recommendations')} className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5">
              <span>⚡ AI Recommendations</span>
            </button>
            <button onClick={() => onNavigate('funds')} className="px-4 py-2.5 rounded-xl bg-[#1E293B] hover:bg-slate-700 text-slate-200 border border-slate-700 font-extrabold text-xs transition-all">
              <span>Explore 25k+ Funds</span>
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: 6 KPI Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1 hover:border-blue-500/40 transition-all">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Portfolio Value</span>
          <div className="text-xl font-black text-white font-mono">₹24,85,000</div>
          <span className="text-xs font-bold text-[#22C55E]">+18.4% XIRR</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1 hover:border-emerald-500/40 transition-all">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Today&apos;s Gain</span>
          <div className="text-xl font-black text-[#22C55E] font-mono">+₹14,250</div>
          <span className="text-xs font-bold text-[#22C55E]">+0.58% Today</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1 hover:border-purple-500/40 transition-all">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">AI Health Score</span>
          <div className="text-xl font-black text-white font-mono">94 / 100</div>
          <span className="text-xs font-bold text-[#7C3AED]">Excellent</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1 hover:border-cyan-500/40 transition-all">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Risk Profile</span>
          <div className="text-xl font-black text-cyan-400 font-mono">28 / 100</div>
          <span className="text-xs font-bold text-cyan-400">Low-Medium Risk</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1 hover:border-amber-500/40 transition-all">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Goal Progress</span>
          <div className="text-xl font-black text-[#F59E0B] font-mono">68%</div>
          <span className="text-xs font-bold text-slate-400">Retirement Target</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1 hover:border-blue-500/40 transition-all">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Market Status</span>
          <div className="text-sm font-black text-white">Bullish Cycle</div>
          <span className="text-xs font-bold text-[#22C55E]">VIX Low (14.2)</span>
        </div>
      </div>

      {/* Row 2: Main Interactive Spline Chart */}
      <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              Portfolio Growth Performance
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            </h3>
            <p className="text-xs text-slate-400 font-semibold">Real-time benchmark comparison vs NIFTY 50 & S&P 500</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex p-0.5 bg-[#020617] rounded-xl border border-[#1E293B] text-xs font-bold">
              <button onClick={() => setBenchmark('NIFTY')} className={`px-3 py-1 rounded-lg ${benchmark === 'NIFTY' ? 'bg-[#2563EB] text-white' : 'text-slate-400'}`}>vs NIFTY 50</button>
              <button onClick={() => setBenchmark('SP500')} className={`px-3 py-1 rounded-lg ${benchmark === 'SP500' ? 'bg-[#7C3AED] text-white' : 'text-slate-400'}`}>vs S&P 500</button>
            </div>

            <div className="flex p-0.5 bg-[#020617] rounded-xl border border-[#1E293B] text-xs font-bold">
              {(['1M', '3M', '6M', '1Y', '5Y', 'MAX'] as const).map((r) => (
                <button key={r} onClick={() => setChartRange(r)} className={`px-3 py-1 rounded-lg ${chartRange === r ? 'bg-[#2563EB] text-white' : 'text-slate-400'}`}>{r}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative pt-2">
          <svg className="w-full h-44 overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mainChartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="95" x2="300" y2="95" stroke="#1E293B" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="#1E293B" strokeWidth="1" strokeDasharray="4,4" />

            <path d="M 10 70 C 50 70, 70 85, 100 80 C 130 75, 150 35, 180 35 C 210 35, 230 85, 250 85 C 270 85, 280 40, 290 30 L 290 95 L 10 95 Z" fill="url(#mainChartGlow)" />
            <path d="M 10 70 C 50 70, 70 85, 100 80 C 130 75, 150 35, 180 35 C 210 35, 230 85, 250 85 C 270 85, 280 40, 290 30" fill="none" stroke="#2563EB" strokeWidth="3.5" strokeLinecap="round" />

            <circle cx="180" cy="35" r="4.5" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="290" cy="30" r="4.5" fill="#14B8A6" stroke="#FFFFFF" strokeWidth="2" />
          </svg>

          <div className="flex justify-between text-xs font-mono font-bold text-slate-500 pt-3">
            <span>JAN 2026</span>
            <span>MAR 2026</span>
            <span>MAY 2026</span>
            <span>JUL 2026</span>
            <span>SEP 2026</span>
            <span>NOV 2026</span>
          </div>
        </div>
      </div>

      {/* Row 3: Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          {/* Asset Allocation */}
          <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white">Asset & Sector Allocation Breakdown</h3>
              <span className="text-xs font-mono text-slate-400">Target Balanced Mix</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#020617] border border-[#1E293B] space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Equity Holdings</span>
                  <span className="text-blue-500 font-mono">60%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] w-[60%]"></div>
                </div>
                <span className="text-[10px] text-slate-500 block">₹14.91L Invested</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#020617] border border-[#1E293B] space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Debt & Fixed Income</span>
                  <span className="text-teal-400 font-mono">30%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-[#14B8A6] w-[30%]"></div>
                </div>
                <span className="text-[10px] text-slate-500 block">₹7.45L Invested</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#020617] border border-[#1E293B] space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Gold & Alternatives</span>
                  <span className="text-amber-400 font-mono">10%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] w-[10%]"></div>
                </div>
                <span className="text-[10px] text-slate-500 block">₹2.48L Invested</span>
              </div>
            </div>
          </div>

          {/* Watchlist */}
          <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white">Tracked Mutual Funds Watchlist</h3>
              <button onClick={() => onNavigate('funds')} className="text-xs font-bold text-blue-500 hover:underline">
                Explore All 25k+ Funds →
              </button>
            </div>

            <div className="space-y-2.5">
              {watchlist.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#020617] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-extrabold text-sm text-white block">{item.name}</span>
                    <span className="text-xs text-slate-500 font-medium">{item.category} • NAV: {item.nav}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
                      {item.rating}
                    </span>
                    <span className="text-xs font-black text-[#22C55E] font-mono">
                      {item.return1Y} YTD
                    </span>
                    <button className="px-3 py-1.5 rounded-xl bg-[#2563EB]/20 hover:bg-[#2563EB] text-blue-400 hover:text-white text-xs font-bold transition-all">
                      Invest
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Oracle & Goal Tracker */}
        <div className="space-y-6">
          <div className="rounded-3xl p-6 bg-gradient-to-br from-[#121B38] via-[#1A184B] to-[#0F172A] border border-purple-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#7C3AED] text-[10px] font-extrabold uppercase tracking-widest text-white">
                ★ TOP AI PICK
              </span>
              <span className="text-xs font-extrabold text-cyan-400">94.8% Score</span>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-black text-white">Vanguard Total Stock Market</h4>
              <p className="text-xs font-mono font-bold text-purple-400">TICKER: VTI • LARGE CAP</p>
            </div>

            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Algorithmic model identifies optimal broad-market equity exposure with low expense ratio (0.03%).
            </p>

            <button className="w-full py-3 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
              <span>⚡ Invest with AI Oracle</span>
            </button>
          </div>

          <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-base text-white">Retirement Goal Tracker</h4>
              <span className="text-xs font-mono font-extrabold text-amber-400">68%</span>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-300">
              <div className="flex justify-between">
                <span>Target Amount:</span>
                <span className="text-white font-mono font-bold">₹50,00,000</span>
              </div>
              <div className="flex justify-between">
                <span>Current Amount:</span>
                <span className="text-[#22C55E] font-mono font-bold">₹24,85,000</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly SIP:</span>
                <span className="text-blue-400 font-mono font-bold">₹25,000 / mo</span>
              </div>
            </div>

            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full w-[68%]"></div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
