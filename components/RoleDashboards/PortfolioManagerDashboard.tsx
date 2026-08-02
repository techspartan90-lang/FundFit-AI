'use client';

import React from 'react';

export const PortfolioManagerDashboard: React.FC = () => {
  return (
    <div className="space-y-6 font-sans selection:bg-amber-600 selection:text-white">
      <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-2xl space-y-2">
        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-extrabold">
          Institutional Portfolio Manager Terminal
        </span>
        <h1 className="text-3xl font-black text-white">Tactical Asset Allocation & Rebalancing Hub</h1>
        <p className="text-slate-400 text-xs sm:text-sm font-semibold">
          Monitor tracking error, cash liquidity buffers, stress testing, and Monte Carlo scenario projections.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Tracking Error</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">0.42%</div>
          <span className="text-xs font-bold text-[#22C55E]">Tight Benchmark Fit</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Liquidity Buffer</span>
          <div className="text-2xl font-black text-amber-400 font-mono">₹1.25 Cr</div>
          <span className="text-xs font-bold text-amber-400">Cash Reserved</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Monte Carlo Success Rate</span>
          <div className="text-2xl font-black text-[#2563EB] font-mono">96.4%</div>
          <span className="text-xs font-bold text-blue-400">1,000 Iterations</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Information Ratio</span>
          <div className="text-2xl font-black text-purple-400 font-mono">1.62</div>
          <span className="text-xs font-bold text-purple-400">Superior Alpha</span>
        </div>
      </div>
    </div>
  );
};
