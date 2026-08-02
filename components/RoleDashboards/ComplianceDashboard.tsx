'use client';

import React from 'react';

export const ComplianceDashboard: React.FC = () => {
  return (
    <div className="space-y-6 font-sans selection:bg-rose-600 selection:text-white">
      <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-2xl space-y-2">
        <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[#EF4444] text-xs font-extrabold">
          SEBI & RBI Regulatory Compliance Terminal
        </span>
        <h1 className="text-3xl font-black text-white">Compliance Audit & Risk Mitigation Portal</h1>
        <p className="text-slate-400 text-xs sm:text-sm font-semibold">
          Monitor AML/KYC verification trails, SEBI circular adherence, tax-loss harvesting rules, and investor risk limits.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">KYC Verification Rate</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">100%</div>
          <span className="text-xs font-bold text-[#22C55E]">Fully Compliant</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">SEBI Audit Status</span>
          <div className="text-2xl font-black text-[#2563EB] font-mono">Passed</div>
          <span className="text-xs font-bold text-blue-400">Zero Violations</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">AML Risk Alerts</span>
          <div className="text-2xl font-black text-purple-400 font-mono">0 Flagged</div>
          <span className="text-xs font-bold text-purple-400">Clean Logs</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Tax Harvesting Status</span>
          <div className="text-2xl font-black text-amber-400 font-mono">₹1.80 L</div>
          <span className="text-xs font-bold text-amber-400">Loss Harvested</span>
        </div>
      </div>
    </div>
  );
};
