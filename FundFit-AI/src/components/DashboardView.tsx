import React, { useState } from 'react';
import { USER_PORTFOLIO } from '../data/mutualFundData';
import { 
  TrendingUp, 
  PieChart, 
  ShieldCheck, 
  Target, 
  Zap, 
  ArrowUpRight, 
  Compass,
  Activity,
  Bookmark,
  Sparkles,
  Layers,
  BarChart3
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const [chartRange, setChartRange] = useState<'1M' | '3M' | '6M' | '1Y' | '5Y' | 'MAX'>('1Y');
  const [benchmark, setBenchmark] = useState<'NIFTY' | 'SP500'>('NIFTY');

  const totalInvested = USER_PORTFOLIO.reduce((acc, p) => acc + p.investedValue, 0);
  const totalCurrent = USER_PORTFOLIO.reduce((acc, p) => acc + p.currentValue, 0);
  const totalReturns = totalCurrent - totalInvested;
  const overallXIRR = 18.4;

  const watchlist = [
    { name: 'Parag Parikh Flexi Cap Fund', return1Y: '+24.2%', rating: '5 Star', category: 'Equity - Flexi Cap', nav: '₹78.40' },
    { name: 'Quant Small Cap Fund', return1Y: '+32.8%', rating: '5 Star', category: 'Equity - Small Cap', nav: '₹245.10' },
    { name: 'HDFC Top 100 Fund', return1Y: '+18.6%', rating: '4 Star', category: 'Equity - Large Cap', nav: '₹1,020.50' },
    { name: 'ICICI Prudential Corporate Bond', return1Y: '+8.2%', rating: '5 Star', category: 'Debt - Corporate Bond', nav: '₹26.30' },
  ];

  const transactions = [
    { id: '1', type: 'SIP Purchase', fund: 'Parag Parikh Flexi Cap', amount: '₹25,000', date: 'Today, 10:30 AM', status: 'Completed' },
    { id: '2', type: 'Rebalance Buy', fund: 'Vanguard Total Stock Market (VTI)', amount: '₹50,000', date: 'Yesterday', status: 'Completed' },
    { id: '3', type: 'Dividend Payout', fund: 'HDFC Top 100 Fund', amount: '₹4,250', date: 'Jul 28, 2026', status: 'Completed' },
  ];

  return (
    <div className="space-y-6 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Banner / Hero Header */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#0F172A] border border-[#1E293B] shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                SEBI Registered Mutual Fund Intelligence
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-extrabold">
                Regime: Bullish Expansion
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-extrabold font-mono">
                India VIX: 14.25
              </span>
            </div>
            
            <h1 className="text-3xl font-black text-white tracking-tight">
              Investor Command Center <span className="text-slate-400 font-normal text-lg">| Wealth Portfolio</span>
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl font-semibold">
              Bloomberg & Aladdin-grade mutual fund allocation, adaptive benchmarking, tax optimization, and AI risk management.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('ai-recommendations')} className="px-5 py-2.5 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>AI Recommendations</span>
            </button>

            <button onClick={() => onNavigate('funds')} className="px-5 py-2.5 rounded-2xl bg-[#1E293B] hover:bg-slate-700 text-slate-200 border border-slate-700 font-extrabold text-xs flex items-center gap-2 transition-all">
              <Compass className="w-4 h-4 text-teal-400" />
              <span>Explore 25k+ Funds</span>
            </button>
          </div>

        </div>
      </div>

      {/* Row 1: Top 6 Summary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Card 1: Portfolio Value */}
        <div className="rounded-2xl p-4 bg-[#0F172A] border border-[#1E293B] space-y-2 hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Portfolio Value</span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl font-black text-white font-mono">
              ₹{totalCurrent.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+₹{totalReturns.toLocaleString('en-IN')} (+{overallXIRR}%)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Today's Gain */}
        <div className="rounded-2xl p-4 bg-[#0F172A] border border-[#1E293B] space-y-2 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Today's Gain</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl font-black text-emerald-400 font-mono">
              +₹14,250
            </div>
            <div className="text-[11px] text-emerald-400 font-bold mt-1">
              +0.58% Today
            </div>
          </div>
        </div>

        {/* Card 3: AI Health Score */}
        <div className="rounded-2xl p-4 bg-[#0F172A] border border-[#1E293B] space-y-2 hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">AI Health Score</span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl font-black text-white font-mono">
              94 <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
            <div className="text-[11px] text-purple-400 font-bold mt-1">
              Excellent Alignment
            </div>
          </div>
        </div>

        {/* Card 4: Risk Score */}
        <div className="rounded-2xl p-4 bg-[#0F172A] border border-[#1E293B] space-y-2 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Risk Profile</span>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl font-black text-cyan-400 font-mono">
              28 <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
            <div className="text-[11px] text-cyan-400 font-bold mt-1">
              Low-Medium Volatility
            </div>
          </div>
        </div>

        {/* Card 5: Goal Completion */}
        <div className="rounded-2xl p-4 bg-[#0F172A] border border-[#1E293B] space-y-2 hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Goal Completion</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl font-black text-amber-400 font-mono">
              68%
            </div>
            <div className="text-[11px] text-slate-400 font-bold mt-1">
              Retirement Target
            </div>
          </div>
        </div>

        {/* Card 6: Market Status */}
        <div className="rounded-2xl p-4 bg-[#0F172A] border border-[#1E293B] space-y-2 hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Market Status</span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-sm font-black text-white">
              Bullish Cycle
            </div>
            <div className="text-[11px] text-emerald-400 font-bold mt-1">
              VIX Low (14.2)
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: Main Interactive Portfolio Chart */}
      <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
              Portfolio Growth Performance
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            <p className="text-xs text-slate-400 font-semibold">Real-time benchmark comparison vs NIFTY 50 & S&P 500</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Benchmark Toggle */}
            <div className="flex p-0.5 bg-[#020617] rounded-xl border border-[#1E293B] text-xs font-bold">
              <button
                onClick={() => setBenchmark('NIFTY')}
                className={`px-3 py-1 rounded-lg transition-all ${benchmark === 'NIFTY' ? 'bg-[#2563EB] text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                vs NIFTY 50
              </button>
              <button
                onClick={() => setBenchmark('SP500')}
                className={`px-3 py-1 rounded-lg transition-all ${benchmark === 'SP500' ? 'bg-[#7C3AED] text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                vs S&P 500
              </button>
            </div>

            {/* Timeframe Selector */}
            <div className="flex p-0.5 bg-[#020617] rounded-xl border border-[#1E293B] text-xs font-bold">
              {(['1M', '3M', '6M', '1Y', '5Y', 'MAX'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setChartRange(r)}
                  className={`px-3 py-1 rounded-lg transition-all ${chartRange === r ? 'bg-[#2563EB] text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive SVG Spline Line Chart */}
        <div className="relative pt-2">
          <svg className="w-full h-48 overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mainChartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <line x1="0" y1="95" x2="300" y2="95" stroke="#1E293B" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="#1E293B" strokeWidth="1" strokeDasharray="4,4" />

            <path
              d="M 10 70 C 50 70, 70 85, 100 80 C 130 75, 150 35, 180 35 C 210 35, 230 85, 250 85 C 270 85, 280 40, 290 30 L 290 95 L 10 95 Z"
              fill="url(#mainChartGlow)"
            />

            <path
              d="M 10 70 C 50 70, 70 85, 100 80 C 130 75, 150 35, 180 35 C 210 35, 230 85, 250 85 C 270 85, 280 40, 290 30"
              fill="none"
              stroke="#2563EB"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

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

      {/* Row 3: Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1 & 2: Asset Allocation & Watchlist */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Asset Allocation Breakdown */}
          <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                Asset & Sector Allocation Breakdown
              </h3>
              <span className="text-xs font-mono text-slate-400">Target Mix</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#020617] border border-[#1E293B] space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Equity Holdings</span>
                  <span className="text-blue-500 font-mono">60%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-[60%]"></div>
                </div>
                <span className="text-[10px] text-slate-500 block">₹14.91L Invested</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#020617] border border-[#1E293B] space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Debt & Fixed Income</span>
                  <span className="text-teal-400 font-mono">30%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 w-[30%]"></div>
                </div>
                <span className="text-[10px] text-slate-500 block">₹7.45L Invested</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#020617] border border-[#1E293B] space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Gold & Alternatives</span>
                  <span className="text-amber-400 font-mono">10%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[10%]"></div>
                </div>
                <span className="text-[10px] text-slate-500 block">₹2.48L Invested</span>
              </div>
            </div>
          </div>

          {/* Watchlist Funds Table */}
          <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-purple-500" />
                Tracked Mutual Funds Watchlist
              </h3>
              <button onClick={() => onNavigate('funds')} className="text-xs font-bold text-blue-500 hover:underline">
                Explore All 25k+ Funds →
              </button>
            </div>

            <div className="space-y-2.5">
              {watchlist.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#020617] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-all">
                  <div>
                    <span className="font-extrabold text-sm text-white block">{item.name}</span>
                    <span className="text-xs text-slate-500 font-medium">{item.category} • NAV: {item.nav}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
                      {item.rating}
                    </span>
                    <span className="text-xs font-black text-emerald-400 font-mono">
                      {item.return1Y} YTD
                    </span>
                    <button className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-bold transition-all">
                      Invest
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Column 3: AI Oracle & Goal Tracker */}
        <div className="space-y-6">
          
          {/* AI Oracle Card */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-[#121B38] via-[#1A184B] to-[#0F172A] border border-purple-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-600 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-md">
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

            <button className="w-full py-3 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>Invest with AI Oracle</span>
            </button>
          </div>

          {/* Goal Progress Tracker */}
          <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-500" />
                Retirement Goal Tracker
              </h4>
              <span className="text-xs font-mono font-extrabold text-amber-400">68%</span>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-300">
              <div className="flex justify-between">
                <span>Target Amount:</span>
                <span className="text-white font-mono font-bold">₹50,00,000</span>
              </div>
              <div className="flex justify-between">
                <span>Current Amount:</span>
                <span className="text-emerald-400 font-mono font-bold">₹24,85,000</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly SIP:</span>
                <span className="text-blue-400 font-mono font-bold">₹25,000 / mo</span>
              </div>
              <div className="flex justify-between">
                <span>Probability:</span>
                <span className="text-purple-400 font-mono font-bold">92% On Track</span>
              </div>
            </div>

            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full w-[68%]"></div>
            </div>
          </div>

        </div>

      </div>

      {/* Row 4: Recent Transactions & Audit Logs */}
      <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-500" />
            Recent Activity & Audit Logs
          </h3>
          <button onClick={() => onNavigate('reports')} className="text-xs font-bold text-blue-500 hover:underline">
            View Complete Statement →
          </button>
        </div>

        <div className="space-y-2">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-3.5 rounded-2xl bg-[#020617] border border-[#1E293B] flex items-center justify-between text-xs">
              <div>
                <span className="font-extrabold text-white block">{tx.type} • {tx.fund}</span>
                <span className="text-[10px] text-slate-500">{tx.date}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white block font-mono">{tx.amount}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
