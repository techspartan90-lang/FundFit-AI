'use client';

import React from 'react';

export const ResearchAnalystDashboard: React.FC = () => {
  const amcRankings = [
    { amc: 'SBI Mutual Fund', totalAum: '₹9.40 L Cr', topFund: 'SBI Small Cap Fund', rating: '5 Star' },
    { amc: 'ICICI Prudential Mutual Fund', totalAum: '₹7.80 L Cr', topFund: 'ICICI Bluechip Fund', rating: '5 Star' },
    { amc: 'HDFC Mutual Fund', totalAum: '₹6.90 L Cr', topFund: 'HDFC Flexi Cap Fund', rating: '4 Star' },
    { amc: 'Nippon India Mutual Fund', totalAum: '₹4.50 L Cr', topFund: 'Nippon India Small Cap', rating: '5 Star' },
  ];

  return (
    <div className="space-y-6 font-sans selection:bg-purple-600 selection:text-white">
      <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-2xl space-y-2">
        <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-extrabold">
          Quant & Research Analyst Terminal
        </span>
        <h1 className="text-3xl font-black text-white">Quant Mutual Fund Screener & AMC Rankings</h1>
        <p className="text-slate-400 text-xs sm:text-sm font-semibold">
          Evaluate Sharpe, Sortino, Treynor, Jensen Alpha, Beta, VaR, rolling volatility, and factor exposure across 25,000+ SEBI funds.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Average Portfolio Sharpe Ratio</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">1.84</div>
          <span className="text-xs font-bold text-[#22C55E]">High Risk-Adjusted Return</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Jensen Alpha (1Y)</span>
          <div className="text-2xl font-black text-purple-400 font-mono">+4.25%</div>
          <span className="text-xs font-bold text-purple-400">Outperforming Benchmark</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Portfolio Beta</span>
          <div className="text-2xl font-black text-cyan-400 font-mono">0.88</div>
          <span className="text-xs font-bold text-cyan-400">Lower Market Volatility</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Value-at-Risk (VaR 95%)</span>
          <div className="text-2xl font-black text-amber-400 font-mono">3.2%</div>
          <span className="text-xs font-bold text-amber-400">Controlled Risk Exposure</span>
        </div>
      </div>

      <div className="rounded-3xl p-6 bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-4">
        <h3 className="font-extrabold text-base text-white">Top Asset Management Companies (AMCs)</h3>
        <div className="space-y-2">
          {amcRankings.map((a, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-[#020617] border border-[#1E293B] flex items-center justify-between text-xs">
              <div>
                <span className="font-extrabold text-white block">{a.amc}</span>
                <span className="text-[10px] text-slate-500">Top Fund: {a.topFund}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white block font-mono">{a.totalAum}</span>
                <span className="text-[10px] text-purple-400 font-bold">{a.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
