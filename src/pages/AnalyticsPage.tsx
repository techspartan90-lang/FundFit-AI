import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart, 
  Area 
} from 'recharts';
import { Activity, BrainCircuit, ShieldCheck, Zap, Sliders, ArrowUpRight } from 'lucide-react';
import SpecularButton from '../components/SpecularButton';
import { useAppStore } from '../store/useAppStore';

const monteCarloPaths = [
  { year: '2026', p10: 100, p50: 100, p90: 100 },
  { year: '2027', p10: 104, p50: 112, p90: 124 },
  { year: '2028', p10: 108, p50: 128, p90: 155 },
  { year: '2029', p10: 115, p50: 145, p90: 190 },
  { year: '2030', p10: 122, p50: 168, p90: 240 },
  { year: '2031', p10: 130, p50: 192, p90: 310 },
  { year: '2032', p10: 142, p50: 220, p90: 395 },
];

export const AnalyticsPage: React.FC = () => {
  const { addToast } = useAppStore();
  const [scenario, setScenario] = useState<'base' | 'stress' | 'bull'>('base');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Monte Carlo & Risk Deconstruction Analytics</h1>
        <p className="text-xs text-slate-400">10,000-path stochastic forecast with multi-factor risk attribution.</p>
      </div>

      {/* Scenario Filter Controls */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200">Simulation Scenario:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScenario('base')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              scenario === 'base' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-slate-950 text-slate-400'
            }`}
          >
            Base Market Regime (12% CAGR)
          </button>
          <button
            onClick={() => setScenario('stress')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              scenario === 'stress' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-slate-950 text-slate-400'
            }`}
          >
            Severe Stagflation Shock
          </button>
          <button
            onClick={() => setScenario('bull')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              scenario === 'bull' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-950 text-slate-400'
            }`}
          >
            Tech Super-Cycle Expansion
          </button>
        </div>
      </div>

      {/* Monte Carlo Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Stochastic Path Distribution (2026 - 2032)</h3>
            <p className="text-xs text-slate-400">P10 (Pessimistic), P50 (Median Expectation), P90 (Optimistic Expansion)</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-cyan-400 font-bold">P90 Path</span>
            <span className="text-indigo-400 font-bold">P50 Median</span>
            <span className="text-rose-400 font-bold">P10 Downside</span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monteCarloPaths}>
              <defs>
                <linearGradient id="p90Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="p90" stroke="#06B6D4" strokeWidth={2.5} fill="url(#p90Grad)" />
              <Area type="monotone" dataKey="p50" stroke="#6366F1" strokeWidth={2.5} fill="none" />
              <Area type="monotone" dataKey="p10" stroke="#F43F5E" strokeWidth={2} strokeDasharray="3 3" fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quantitative Risk Factor Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-xs text-slate-400 font-medium">Sharpe Ratio</div>
          <div className="text-3xl font-black text-emerald-400">2.18</div>
          <div className="text-[11px] text-slate-500">Top 5% category performance</div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-xs text-slate-400 font-medium">Jensen's Alpha</div>
          <div className="text-3xl font-black text-cyan-400">+4.85%</div>
          <div className="text-[11px] text-slate-500">Excess return vs benchmark</div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-xs text-slate-400 font-medium">Portfolio Beta</div>
          <div className="text-3xl font-black text-indigo-400">0.88</div>
          <div className="text-[11px] text-slate-500">Lower volatility than index</div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-xs text-slate-400 font-medium">Sortino Ratio</div>
          <div className="text-3xl font-black text-amber-400">3.12</div>
          <div className="text-[11px] text-slate-500">Downside risk protection</div>
        </div>
      </div>

    </div>
  );
};
