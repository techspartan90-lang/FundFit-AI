import React from 'react';
import { USER_PORTFOLIO } from '../data/mutualFundData';
import { 
  TrendingUp, 
  PieChart, 
  ShieldCheck, 
  Target, 
  Zap, 
  ArrowUpRight, 
  ChevronRight, 
  Calendar,
  Compass
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const totalInvested = USER_PORTFOLIO.reduce((acc, p) => acc + p.investedValue, 0);
  const totalCurrent = USER_PORTFOLIO.reduce((acc, p) => acc + p.currentValue, 0);
  const totalReturns = totalCurrent - totalInvested;
  const overallXIRR = 18.4;
  const fundFitScore = 92;

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Hero Header */}
      <div className="glass-card p-6 border-indigo-500/20 bg-gradient-to-r from-[#111726] via-[#161D30] to-[#121A2C] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-emerald flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                SEBI Registered Mutual Fund Intelligence
              </span>
              <span className="badge badge-indigo">Market Regime: Bullish Expansion</span>
              <span className="badge badge-violet">India VIX: 14.25 (Low Volatility)</span>
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Investor Command Center <span className="text-slate-400 font-normal text-lg">| Wealth Portfolio</span>
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              AI-driven mutual fund allocation, adaptive benchmarking, tax optimization, and goal completion analysis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('ai-recommendations')} className="btn-primary">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>AI Recommendations</span>
            </button>

            <button onClick={() => onNavigate('funds')} className="btn-secondary">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Explore 25k+ Funds</span>
            </button>
          </div>

        </div>
      </div>

      {/* Top KPI Cards Grid (4 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Portfolio Current Value */}
        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Portfolio Value</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">
              ₹{totalCurrent.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+₹{totalReturns.toLocaleString('en-IN')} Total Gain</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            Invested: ₹{totalInvested.toLocaleString('en-IN')}
          </div>
        </div>

        {/* XIRR & Returns */}
        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Portfolio XIRR</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-emerald-400">
              {overallXIRR}% <span className="text-xs text-slate-400 font-normal">XIRR</span>
            </div>
            <div className="text-xs text-slate-300 mt-1">
              16.2% CAGR • Beats NIFTY 50 by <span className="text-emerald-400 font-semibold">+3.8%</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            Monthly SIP: ₹60,000 across 4 funds
          </div>
        </div>

        {/* Fund Fit Score */}
        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fund Fit Index</span>
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">
              {fundFitScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
            <div className="text-xs text-indigo-400 font-semibold mt-1">
              Optimal Risk & AMC Diversification
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            1 Mismatch Alert Pending
          </div>
        </div>

        {/* Retirement Goal Progress */}
        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Retirement Goal</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">
              96% <span className="text-xs text-slate-400 font-normal">Probability</span>
            </div>
            <div className="text-xs text-emerald-400 font-semibold mt-1">
              On Track for ₹5 Crore Corpus
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            Target Year: 2042 (16 Years Remaining)
          </div>
        </div>

      </div>

      {/* Main Grid Section: Holdings Table & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Portfolio Holdings Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5 space-y-4 border-indigo-500/20">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Active Mutual Fund Holdings ({USER_PORTFOLIO.length})</h3>
              </div>
              <button onClick={() => onNavigate('portfolio')} className="text-xs text-indigo-400 font-semibold hover:underline flex items-center gap-1">
                <span>View Full Portfolio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {USER_PORTFOLIO.map((holding) => (
                <div key={holding.fundId} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 hover:border-indigo-500/30 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-sm text-white">{holding.fundName}</div>
                      <div className="text-xs text-slate-400">{holding.amc} • {holding.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-white">₹{holding.currentValue.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-emerald-400 font-semibold">+{holding.xirr}% XIRR (+₹{holding.returnsINR.toLocaleString('en-IN')})</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5 text-slate-400">
                    <span>Monthly SIP: ₹{holding.sipAmount.toLocaleString('en-IN')}</span>
                    <span className="badge badge-emerald text-[10px] font-bold">{holding.fitScore}% Fit Score</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: AI Recommendation Teaser & Upcoming SIPs */}
        <div className="space-y-6">
          
          {/* AI Signal Box */}
          <div className="glass-card p-5 space-y-3 border-emerald-500/30">
            <div className="flex items-center justify-between">
              <span className="badge badge-emerald text-[10px]">AI Signal Engine</span>
              <span className="text-xs text-slate-400">Updated Today</span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
              <div className="text-xs font-bold text-emerald-400 uppercase">Top Recommendation</div>
              <div className="text-sm font-bold text-white">Parag Parikh Flexi Cap (Strong Buy)</div>
              <p className="text-xs text-slate-300 mt-1">
                Maintain ₹25,000 monthly SIP. High alpha generation through defensive USD tech exposure.
              </p>
            </div>

            <button onClick={() => onNavigate('ai-recommendations')} className="btn-secondary text-xs w-full justify-center">
              <span>View All AI Signals</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Upcoming SIP Auto-Debits */}
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                Upcoming SIP Debits
              </h4>
              <span className="text-xs text-indigo-400 font-semibold">Total ₹60k/mo</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">PPFAS Flexi Cap</div>
                  <div className="text-[10px] text-slate-400">Due: 5th of Next Month</div>
                </div>
                <span className="font-bold text-white">₹25,000</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">HDFC Top 100</div>
                  <div className="text-[10px] text-slate-400">Due: 10th of Next Month</div>
                </div>
                <span className="font-bold text-white">₹15,000</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
