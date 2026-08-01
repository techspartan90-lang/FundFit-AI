import React, { useState } from 'react';
import type { MutualFund } from '../data/mutualFundData';
import { MUTUAL_FUNDS_REGISTRY } from '../data/mutualFundData';
import { 
  Compass, 
  Search, 
  Sparkles, 
  ArrowRight,
  X,
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart3,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const FundExplorerView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);
  const [compareFund1, setCompareFund1] = useState<MutualFund | null>(null);
  const [compareFund2, setCompareFund2] = useState<MutualFund | null>(null);

  const filteredFunds = MUTUAL_FUNDS_REGISTRY.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.amc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || f.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 border-emerald-500/25 bg-gradient-to-r from-[#0D1322] via-[#0F221D] to-[#0A0F1D]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge-pill badge-emerald">
                <Compass className="w-3.5 h-3.5" />
                AMFI Registry Engine
              </span>
              <span className="badge-pill badge-indigo">25,410 Schemes Scanned</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Mutual Fund Explorer & AI Compare Studio
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Discover top-rated mutual funds evaluated by 3Y/5Y rolling CAGR, expense ratio efficiency, 
              downside beta, and AI Fund Fit Score.
            </p>
          </div>

          {compareFund1 && compareFund2 && (
            <div className="btn-emerald text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2">
              <span>Compare Selected ({compareFund1.name.split(' ')[0]} vs {compareFund2.name.split(' ')[0]})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>

      {/* Filter controls */}
      <div className="glass-panel p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search fund name, manager, or AMC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="w-full md:w-56">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1322] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All Categories (Flexi, Small, Mid)</option>
            <option value="Flexi Cap">Flexi Cap</option>
            <option value="Large Cap">Large Cap</option>
            <option value="Small Cap">Small Cap</option>
            <option value="Mid Cap">Mid Cap</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 ml-auto hidden lg:block font-medium">
          Displaying {filteredFunds.length} Verified Mutual Funds
        </div>
      </div>

      {/* Fund Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFunds.map((fund) => (
          <div key={fund.id} className="glass-panel-interactive p-6 border-indigo-500/20 flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="badge-pill badge-indigo text-[10px] mb-2">{fund.category}</span>
                  <h3 className="text-base font-bold text-white leading-snug">{fund.name}</h3>
                  <div className="text-xs text-slate-400 font-medium">{fund.amc} • Scheme #{fund.schemeCode}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Fund Fit Score</div>
                  <div className="text-xl font-extrabold text-cyan-300">{fund.fundFitScore}</div>
                </div>
              </div>

              {/* Returns Grid */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">1Y Return</div>
                  <div className="font-bold text-emerald-400">+{fund.cagr1y}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">3Y CAGR</div>
                  <div className="font-bold text-emerald-400">+{fund.cagr3y}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Sharpe Ratio</div>
                  <div className="font-bold text-cyan-300">{fund.sharpeRatio}</div>
                </div>
              </div>

              {/* Ratios & Manager */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Expense: <strong className="text-slate-200">{fund.expenseRatio}%</strong></span>
                <span>AUM: <strong className="text-slate-200">₹{fund.aumCrores} Cr</strong></span>
                <span>Alpha: <strong className="text-emerald-400">+{fund.alpha}%</strong></span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <button 
                onClick={() => setSelectedFund(fund)}
                className="flex-1 btn-indigo py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
              >
                <span>Full Analytics</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button 
                onClick={() => {
                  if (!compareFund1) setCompareFund1(fund);
                  else if (!compareFund2) setCompareFund2(fund);
                  else { setCompareFund1(fund); setCompareFund2(null); }
                }}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300"
              >
                {compareFund1?.id === fund.id || compareFund2?.id === fund.id ? 'Compared' : '+ Compare'}
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Fund Detail Drawer Modal */}
      {selectedFund && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 max-w-2xl w-full border-cyan-500/30 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedFund(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="badge-pill badge-indigo">{selectedFund.category}</span>
              <span className="badge-pill badge-cyan">AI Fit Score: {selectedFund.fundFitScore}/100</span>
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-1">{selectedFund.name}</h2>
            <p className="text-xs text-slate-400 mb-6">AMC: {selectedFund.amc} • Manager: {selectedFund.fundManager}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white/5 border border-white/10 mb-6 text-xs">
              <div>
                <div className="text-slate-400">Current NAV</div>
                <div className="text-base font-bold text-white">₹{selectedFund.currentNav}</div>
              </div>
              <div>
                <div className="text-slate-400">Expense Ratio</div>
                <div className="text-base font-bold text-white">{selectedFund.expenseRatio}%</div>
              </div>
              <div>
                <div className="text-slate-400">3Y CAGR</div>
                <div className="text-base font-bold text-emerald-400">+{selectedFund.cagr3y}%</div>
              </div>
              <div>
                <div className="text-slate-400">Alpha</div>
                <div className="text-base font-bold text-cyan-300">+{selectedFund.alpha}%</div>
              </div>
            </div>

            <h4 className="text-sm font-bold text-white mb-3">Top Underlying Equity Holdings</h4>
            <div className="space-y-2 mb-6 text-xs">
              {selectedFund.topHoldings.map((h) => (
                <div key={h.name} className="flex justify-between items-center p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="font-semibold text-white">{h.name}</span>
                  <span className="font-bold text-cyan-400">{h.weight}%</span>
                </div>
              ))}
            </div>

            <button onClick={() => setSelectedFund(null)} className="w-full btn-emerald py-3 rounded-xl text-xs font-bold">
              Done & Return to Explorer
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
