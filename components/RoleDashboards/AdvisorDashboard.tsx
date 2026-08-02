'use client';

import React from 'react';

export const AdvisorDashboard: React.FC = () => {
  const clients = [
    { name: 'Rohan Sharma', aum: '₹1.85 Cr', risk: 'Moderate', status: 'Rebalance Due', sip: '₹1,50,000' },
    { name: 'Priya Patel', aum: '₹3.40 Cr', risk: 'Aggressive', status: 'Optimal', sip: '₹2,20,000' },
    { name: 'Vikram Mehta', aum: '₹8.90 Cr', risk: 'Conservative', status: 'KYC Renewal', sip: '₹5,00,000' },
    { name: 'Ananya Deshmukh', aum: '₹95.0 L', risk: 'Moderate', status: 'Optimal', sip: '₹75,000' },
  ];

  return (
    <div className="space-y-6 font-sans selection:bg-teal-600 selection:text-white">
      
      {/* Advisor Header */}
      <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-2xl space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-xs font-extrabold">
            SEBI Registered Investment Advisor (RIA) Portal
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold">
            ARN-189240
          </span>
        </div>
        <h1 className="text-3xl font-black text-white">Advisor Wealth Management Portal</h1>
        <p className="text-slate-400 text-xs sm:text-sm font-semibold">
          Manage 124 HNI client portfolios, track fee billing, review automated AI rebalance triggers, and send CAS statements.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Total Client AUM</span>
          <div className="text-2xl font-black text-white font-mono">₹45.80 Cr</div>
          <span className="text-xs font-bold text-[#22C55E]">+14.2% YoY Growth</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Active HNI Clients</span>
          <div className="text-2xl font-black text-[#14B8A6] font-mono">124</div>
          <span className="text-xs font-bold text-slate-400">98.4% Retention</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Monthly SIP Book</span>
          <div className="text-2xl font-black text-purple-400 font-mono">₹42.50 L</div>
          <span className="text-xs font-bold text-purple-400">100% Executed</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Pending Actions</span>
          <div className="text-2xl font-black text-amber-400 font-mono">3 Rebalances</div>
          <span className="text-xs font-bold text-amber-400">Review Required</span>
        </div>
      </div>

      {/* Client Portfolio List */}
      <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-4">
        <h3 className="font-extrabold text-base text-white">High Net-Worth Client Roster</h3>

        <div className="space-y-2.5">
          {clients.map((c, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#020617] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-extrabold text-sm text-white block">{c.name}</span>
                <span className="text-xs text-slate-500 font-medium">Risk Profile: {c.risk} • Monthly SIP: {c.sip}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-black text-white font-mono text-sm">{c.aum} AUM</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${c.status === 'Rebalance Due' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {c.status}
                </span>
                <button className="px-3 py-1.5 rounded-xl bg-[#14B8A6]/20 hover:bg-[#14B8A6] text-[#14B8A6] hover:text-white text-xs font-bold transition-all">
                  Open Client Portal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
