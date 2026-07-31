import React, { useState } from 'react';
import { USER_PORTFOLIO } from '../data/mutualFundData';
import { 
  Search, 
  AlertTriangle, 
  Plus, 
  Download
} from 'lucide-react';

interface PortfolioViewProps {
  onNavigate: (view: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const totalInvested = USER_PORTFOLIO.reduce((acc, p) => acc + p.investedValue, 0);
  const totalCurrent = USER_PORTFOLIO.reduce((acc, p) => acc + p.currentValue, 0);
  const totalReturns = totalCurrent - totalInvested;

  const filteredHoldings = USER_PORTFOLIO.filter(h => {
    const matchesSearch = h.fundName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          h.amc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || h.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 border-indigo-500/20 bg-gradient-to-r from-[#111726] via-[#1A1F36] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-indigo">Portfolio & Holdings</span>
              <span className="badge badge-emerald">18.4% XIRR</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Mutual Fund Portfolio Analytics
            </h1>
            <p className="text-slate-300 text-sm">
              Track XIRR, CAGR, capital gains, category allocation, and rebalancing alerts across all active funds.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('reports')} className="btn-secondary text-xs">
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Download Statement</span>
            </button>
            <button onClick={() => onNavigate('funds')} className="btn-primary text-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Add New SIP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="glass-card p-5 space-y-1">
          <span className="text-slate-400 font-semibold uppercase">Total Invested</span>
          <div className="text-2xl font-extrabold text-white">₹{totalInvested.toLocaleString('en-IN')}</div>
          <span className="text-slate-400">Across 4 Schemes</span>
        </div>

        <div className="glass-card p-5 space-y-1">
          <span className="text-slate-400 font-semibold uppercase">Current Value</span>
          <div className="text-2xl font-extrabold text-white">₹{totalCurrent.toLocaleString('en-IN')}</div>
          <span className="text-emerald-400 font-semibold">+₹{totalReturns.toLocaleString('en-IN')} Profit</span>
        </div>

        <div className="glass-card p-5 space-y-1">
          <span className="text-slate-400 font-semibold uppercase">Portfolio Health Score</span>
          <div className="text-2xl font-extrabold text-indigo-400">92 / 100</div>
          <span className="text-emerald-400 font-semibold">1 Alert Requires Attention</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Filter fund name or AMC..."
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
          Showing {filteredHoldings.length} of {USER_PORTFOLIO.length} Active Schemes
        </div>
      </div>

      {/* Holdings Table */}
      <div className="glass-card p-6 border-indigo-500/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider">
              <th className="pb-3">Scheme Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Invested</th>
              <th className="pb-3">Current Value</th>
              <th className="pb-3">Returns (INR)</th>
              <th className="pb-3">XIRR</th>
              <th className="pb-3">Monthly SIP</th>
              <th className="pb-3 text-right">Fund Fit Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {filteredHoldings.map((h) => (
              <tr key={h.fundId} className="hover:bg-slate-900/60 transition-colors">
                <td className="py-4">
                  <div className="font-bold text-white text-sm">{h.fundName}</div>
                  <div className="text-[11px] text-slate-400">{h.amc}</div>
                  {h.mismatchAlert && (
                    <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 mt-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{h.mismatchAlert}</span>
                    </div>
                  )}
                </td>
                <td className="py-4">
                  <span className="badge badge-indigo text-[11px]">{h.category}</span>
                </td>
                <td className="py-4 font-medium">₹{h.investedValue.toLocaleString('en-IN')}</td>
                <td className="py-4 font-bold text-white">₹{h.currentValue.toLocaleString('en-IN')}</td>
                <td className="py-4 font-bold text-emerald-400">+₹{h.returnsINR.toLocaleString('en-IN')}</td>
                <td className="py-4 font-bold text-emerald-400">+{h.xirr}%</td>
                <td className="py-4 font-medium">₹{h.sipAmount.toLocaleString('en-IN')}/mo</td>
                <td className="py-4 text-right">
                  <span className="badge badge-emerald font-bold text-[11px]">{h.fitScore}% Fit</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
