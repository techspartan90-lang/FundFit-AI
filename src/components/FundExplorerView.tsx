import React, { useState } from 'react';
import type { MutualFund } from '../data/mutualFundData';
import { MUTUAL_FUNDS_REGISTRY } from '../data/mutualFundData';
import { 
  Compass, 
  Search, 
  Sparkles, 
  ArrowRight,
  X
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
      <div className="glass-card p-6 border-emerald-500/20 bg-gradient-to-r from-[#111726] via-[#10241F] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-emerald flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                AMFI Registry Engine
              </span>
              <span className="badge badge-indigo">25,410 Schemes Scanned</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Mutual Fund Explorer & Compare Studio
            </h1>
            <p className="text-slate-300 text-sm">
              Discover top-rated mutual funds by rolling returns, expense ratio, AI Fund Fit Score, and top holdings.
            </p>
          </div>

          {compareFund1 && compareFund2 && (
            <div className="btn-emerald text-xs">
              <span>Compare Selected ({compareFund1.name.split(' ')[0]} vs {compareFund2.name.split(' ')[0]})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>

      {/* Filter controls */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search fund name, manager, or AMC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-9 text-xs"
          />
        </div>

        <div className="w-full md:w-48">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-field text-xs"
          >
            <option value="All">All Categories</option>
            <option value="Flexi Cap">Flexi Cap</option>
            <option value="Large Cap">Large Cap</option>
            <option value="Small Cap">Small Cap</option>
            <option value="Mid Cap">Mid Cap</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 ml-auto hidden lg:block">
          Displaying {filteredFunds.length} Verified Mutual Funds
        </div>
      </div>

      {/* Fund Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFunds.map((fund) => (
          <div key={fund.id} className="glass-card p-6 border-indigo-500/20 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="badge badge-indigo text-[10px] mb-1">{fund.category}</span>
                  <h3 className="text-base font-bold text-white leading-snug">{fund.name}</h3>
                  <div className="text-xs text-slate-400 font-medium">{fund.amc}</div>
                </div>

                <div className="text-center bg-indigo-950/60 p-2 rounded-xl border border-indigo-500/30 shrink-0">
                  <div className="text-lg font-extrabold text-emerald-400">{fund.fundFitScore}%</div>
                  <div className="text-[9px] uppercase font-bold text-slate-400">Fit Score</div>
                </div>
              </div>

              {/* Fund Stats Grid */}
              <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-white/5 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase">NAV</span>
                  <span className="text-white font-bold">₹{fund.nav}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-white/5 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase">3Y CAGR</span>
                  <span className="text-emerald-400 font-bold">+{fund.cagr3Y}%</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-white/5 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase">Expense Ratio</span>
                  <span className="text-slate-200 font-bold">{fund.expenseRatio}%</span>
                </div>
              </div>

              {/* AI Signal */}
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs space-y-1">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Signal: {fund.aiSignal}
                </span>
                <p className="text-slate-300 text-[11px] line-clamp-2 leading-relaxed">
                  {fund.aiReasoning}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
              <button onClick={() => setSelectedFund(fund)} className="btn-primary text-xs flex-1 justify-center">
                <span>View Full Details</span>
              </button>

              <button 
                onClick={() => {
                  if (!compareFund1) setCompareFund1(fund);
                  else if (!compareFund2) setCompareFund2(fund);
                  else setCompareFund1(fund);
                }} 
                className="btn-secondary text-xs"
              >
                <span>+ Compare</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL: Fund Detail View */}
      {selectedFund && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card max-w-2xl w-full p-6 space-y-6 border-emerald-500/40 bg-[#111726] max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="badge badge-emerald text-[10px]">{selectedFund.category}</span>
                <h2 className="text-xl font-bold text-white mt-1">{selectedFund.name}</h2>
                <div className="text-xs text-slate-400">{selectedFund.amc} • Manager: {selectedFund.fundManager}</div>
              </div>
              <button onClick={() => setSelectedFund(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 block font-semibold">Current NAV</span>
                <span className="text-white font-extrabold text-sm">₹{selectedFund.nav}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 block font-semibold">3Y CAGR</span>
                <span className="text-emerald-400 font-extrabold text-sm">+{selectedFund.cagr3Y}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 block font-semibold">Fund AUM</span>
                <span className="text-indigo-400 font-extrabold text-sm">₹{selectedFund.aumInCr.toLocaleString('en-IN')} Cr</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 block font-semibold">Expense Ratio</span>
                <span className="text-slate-200 font-extrabold text-sm">{selectedFund.expenseRatio}%</span>
              </div>
            </div>

            {/* Top Holdings */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Top Stock Holdings</h4>
              <div className="space-y-1.5">
                {selectedFund.topHoldings.map((stock, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-white">{stock.company}</span>
                      <span className="text-[10px] text-slate-400 ml-2">({stock.sector})</span>
                    </div>
                    <span className="font-bold text-emerald-400">{stock.weight}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setSelectedFund(null)} className="btn-primary text-xs">
                Close Detail View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
