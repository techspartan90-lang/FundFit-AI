'use client';

import React from 'react';

export const OperationsDashboard: React.FC = () => {
  return (
    <div className="space-y-6 font-sans selection:bg-teal-600 selection:text-white">
      <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-2xl space-y-2">
        <span className="px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-xs font-extrabold">
          Clearing & Operations Control Center
        </span>
        <h1 className="text-3xl font-black text-white">Mutual Fund Settlement & Execution Pipeline</h1>
        <p className="text-slate-400 text-xs sm:text-sm font-semibold">
          Monitor BSE StAR MF / NSE NMF II gateway integrations, SIP auto-debit success rates, and NAV reconciliation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">SIP Auto-Debit Success</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">99.4%</div>
          <span className="text-xs font-bold text-[#22C55E]">High Completion</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">NAV Settlement Queue</span>
          <div className="text-2xl font-black text-white font-mono">T+1 Standard</div>
          <span className="text-xs font-bold text-slate-400">On Time</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">BSE / NSE API Gateway</span>
          <div className="text-2xl font-black text-teal-400 font-mono">Connected</div>
          <span className="text-xs font-bold text-teal-400">Zero Latency</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Rebalance Pipeline</span>
          <div className="text-2xl font-black text-[#2563EB] font-mono">100% Cleared</div>
          <span className="text-xs font-bold text-blue-400">No Order Stalls</span>
        </div>
      </div>
    </div>
  );
};
