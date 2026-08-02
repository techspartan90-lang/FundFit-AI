'use client';

import React from 'react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6 font-sans selection:bg-purple-600 selection:text-white">
      <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-2xl space-y-2">
        <span className="px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] text-xs font-extrabold">
          Super Admin Console
        </span>
        <h1 className="text-3xl font-black text-white">System Operations & Security Control Center</h1>
        <p className="text-slate-400 text-xs sm:text-sm font-semibold">
          Monitor API Gateway traffic, microservice health, user authentication security logs, and database replication status.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">API Gateway Latency</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">18 ms</div>
          <span className="text-xs font-bold text-[#22C55E]">Optimal Response</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">System Uptime</span>
          <div className="text-2xl font-black text-white font-mono">99.99%</div>
          <span className="text-xs font-bold text-slate-400">Zero Outages</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Active WebSockets</span>
          <div className="text-2xl font-black text-purple-400 font-mono">14,280</div>
          <span className="text-xs font-bold text-purple-400">Live Ticker Stream</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Security Threats</span>
          <div className="text-2xl font-black text-blue-400 font-mono">0 Blocked</div>
          <span className="text-xs font-bold text-blue-400">WAF Active</span>
        </div>
      </div>
    </div>
  );
};
