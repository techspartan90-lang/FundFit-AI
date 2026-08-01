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
  Compass,
  BrainCircuit,
  Activity,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const totalInvested = USER_PORTFOLIO.reduce((acc, p) => acc + p.investedValue, 0);
  const totalCurrent = USER_PORTFOLIO.reduce((acc, p) => acc + p.currentValue, 0);
  const totalReturns = totalCurrent - totalInvested;
  const overallXIRR = 22.4;
  const fundFitScore = 92;

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Hero Header */}
      <div className="glass-panel p-6 sm:p-8 border-indigo-500/25 bg-gradient-to-r from-[#0D1322] via-[#121A2F] to-[#0A0F1D] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-1/3 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-pill badge-emerald">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                SEBI Registered Mutual Fund Intelligence
              </span>
              <span className="badge-pill badge-indigo">Market Regime: Bullish Expansion</span>
              <span className="badge-pill badge-cyan">India VIX: 14.25 (Normal Volatility)</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Investor Command Center <span className="text-slate-400 font-normal text-lg">| Wealth Portfolio</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              AI-driven mutual fund allocation, 10,000-path Monte Carlo goal forecasting, 
              downside risk VaR analytics, and Explainable AI recommendations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => onNavigate('ai-recommendations')} className="btn-indigo px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>AI Recommendations</span>
            </button>

            <button onClick={() => onNavigate('funds')} className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Explore 25k+ Funds</span>
            </button>
          </div>

        </div>
      </div>

      {/* Top KPI Cards Grid (4 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Portfolio Current Value */}
        <div className="glass-panel p-5 space-y-3 border-indigo-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Portfolio Value</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <PieChart className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ₹{totalCurrent.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mt-1">
              <ArrowUpRight className="w-4 h-4" />
              <span>+₹{totalReturns.toLocaleString('en-IN')} (+25.17%)</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 border-t border-white/5 pt-2 flex justify-between">
            <span>Invested Amount</span>
            <span className="font-semibold text-slate-200">₹{totalInvested.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* XIRR & Returns */}
        <div className="glass-panel p-5 space-y-3 border-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Portfolio XIRR</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">
              {overallXIRR}%
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mt-1">
              <ArrowUpRight className="w-4 h-4" />
              <span>+8.2% vs Category Benchmark</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 border-t border-white/5 pt-2 flex justify-between">
            <span>3Y CAGR Return</span>
            <span className="font-semibold text-slate-200">18.5%</span>
          </div>
        </div>

        {/* Fund Fit Score */}
        <div className="glass-panel p-5 space-y-3 border-cyan-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Fund Fit Score</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <BrainCircuit className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 tracking-tight">{fundFitScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <div className="text-xs text-cyan-400 font-semibold mt-1">
              Optimal Risk & Goal Alignment
            </div>
          </div>
          <div className="text-[11px] text-slate-400 border-t border-white/5 pt-2 flex justify-between">
            <span>Score Grade</span>
            <span className="badge-pill badge-cyan text-[10px]">EXCELLENT MATCH</span>
          </div>
        </div>

        {/* Downside Risk & VaR */}
        <div className="glass-panel p-5 space-y-3 border-purple-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Downside Risk (VaR 95%)</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-300 tracking-tight">
              14.2%
            </div>
            <div className="text-xs text-slate-400 font-semibold mt-1">
              Max Drawdown Tolerance: 25.0%
            </div>
          </div>
          <div className="text-[11px] text-slate-400 border-t border-white/5 pt-2 flex justify-between">
            <span>Risk Profile</span>
            <span className="font-semibold text-purple-300">Moderately Aggressive</span>
          </div>
        </div>

      </div>

      {/* Main Row: 2 Grid Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Holdings Breakdown & Allocation */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Holdings Table */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-white">Portfolio Holdings ({USER_PORTFOLIO.length})</h3>
                <p className="text-xs text-slate-400">Real-time NAV, XIRR returns, and allocation weights</p>
              </div>
              <button onClick={() => onNavigate('portfolio')} className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                <span>View Full Portfolio</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-3">Mutual Fund</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3 text-right">Current NAV</th>
                    <th className="py-3 px-3 text-right">Value (₹)</th>
                    <th className="py-3 px-3 text-right">Returns</th>
                    <th className="py-3 px-3 text-right">Fit Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {USER_PORTFOLIO.map((fund) => (
                    <tr key={fund.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white">{fund.name}</div>
                        <div className="text-[11px] text-slate-400">{fund.amc} • Units: {fund.units}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="badge-pill badge-indigo text-[10px]">{fund.category}</span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-semibold text-slate-200">₹{fund.currentNav}</td>
                      <td className="py-3.5 px-3 text-right font-bold text-white">₹{fund.currentValue.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="font-bold text-emerald-400">+{fund.returnsPct}%</div>
                        <div className="text-[10px] text-slate-400">₹{fund.gainLoss.toLocaleString('en-IN')}</div>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-extrabold text-xs">
                          {fund.fundFitScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Goal Probability Preview */}
          <div className="glass-panel p-6 border-emerald-500/20 bg-gradient-to-r from-[#0D1322] to-[#0D1A2B]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Retirement Wealth Goal (10k Monte Carlo)</h3>
                  <p className="text-xs text-slate-400">Target: ₹5.0 Cr by 2040 • Current: ₹30.3 Lakhs</p>
                </div>
              </div>
              <button onClick={() => onNavigate('goals')} className="btn-emerald text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5">
                <span>Run Simulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Goal Achievement Probability</span>
                <span className="text-emerald-400 font-extrabold">84.5% (ON TRACK)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
                <div className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 h-full rounded-full w-[84.5%]"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: AI Recommendations & Market Intelligence */}
        <div className="space-y-6">
          
          {/* Active AI Recommendations */}
          <div className="glass-panel p-6 border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">Active AI Recommendations</h3>
              </div>
              <span className="badge-pill badge-amber text-[10px]">2 Actions</span>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="badge-pill badge-emerald text-[10px]">BUY • Flexi Cap</span>
                  <span className="text-[11px] font-bold text-cyan-400">94.5 Fit Score</span>
                </div>
                <div className="text-xs font-bold text-white mb-1">Quant Flexi Cap Fund Direct</div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  Exceptional Sharpe ratio (1.65) and Alpha (5.2%). High fit score aligned with your risk appetite.
                </p>
                <button onClick={() => onNavigate('ai-recommendations')} className="w-full btn-indigo py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1">
                  <span>View XAI Explanation</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-all">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="badge-pill badge-amber text-[10px]">REBALANCE • Allocation</span>
                  <span className="text-[11px] font-bold text-amber-400">Drift: 4.2%</span>
                </div>
                <div className="text-xs font-bold text-white mb-1">Equity Allocation Rebalance</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Portfolio small-cap weight has expanded beyond risk limits. Rebalance ₹45,000 into debt funds.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="glass-panel p-6">
            <h3 className="text-base font-bold text-white mb-4">Quick Intelligence Tools</h3>
            <div className="space-y-2.5">
              <button onClick={() => onNavigate('market')} className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs font-semibold text-slate-200 transition-all">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Market Regime Terminal</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button onClick={() => onNavigate('reports')} className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs font-semibold text-slate-200 transition-all">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>Tax Statement & CAS Audit</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button onClick={() => onNavigate('settings')} className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs font-semibold text-slate-200 transition-all">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Security & Risk Preferences</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
