import React from 'react';
import { MARKET_INDICES } from '../data/mutualFundData';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Globe, 
  Zap
} from 'lucide-react';

export const MarketIntelligenceView: React.FC = () => {
  const sectorPerformance = [
    { sector: 'Financials & Banking', return1M: 3.4, return1Y: 22.8, regime: 'Strong Outperform' },
    { sector: 'Information Technology', return1M: 1.8, return1Y: 18.4, regime: 'Neutral Recovery' },
    { sector: 'Automobile & EV', return1M: 4.2, return1Y: 34.6, regime: 'High Growth' },
    { sector: 'Healthcare & Pharma', return1M: -0.8, return1Y: 14.2, regime: 'Defensive Value' },
    { sector: 'Capital Goods & Infra', return1M: 5.1, return1Y: 38.2, regime: 'Strong Outperform' },
  ];

  const fiiDiiFlows = [
    { category: 'FII Net Buy (Equity)', value: '+₹2,480 Cr', trend: 'up' },
    { category: 'DII Net Buy (Equity)', value: '+₹3,120 Cr', trend: 'up' },
    { category: 'Monthly SIP Net Inflow', value: '+₹23,540 Cr', trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 border-indigo-500/20 bg-gradient-to-r from-[#111726] via-[#1A1F36] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-indigo flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                Macro Market Regime Engine
              </span>
              <span className="badge badge-emerald">Bullish Expansion Cycle</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Market Intelligence & Sector Analytics
            </h1>
            <p className="text-slate-300 text-sm">
              Real-time volatility analysis, FII/DII institutional liquidity flows, interest rates, and macro sector momentum.
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">India VIX Index</div>
            <div className="text-2xl font-extrabold text-emerald-400">14.25 <span className="text-xs text-slate-400 font-normal">(-5.6%)</span></div>
          </div>
        </div>
      </div>

      {/* Indices Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {MARKET_INDICES.map((idx) => (
          <div key={idx.name} className="glass-card p-4 space-y-1 text-xs">
            <span className="text-slate-400 font-semibold uppercase">{idx.name}</span>
            <div className="text-xl font-extrabold text-white">{idx.value.toLocaleString('en-IN')}</div>
            <div className={`flex items-center gap-1 font-bold ${idx.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {idx.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{idx.changePercent > 0 ? `+${idx.changePercent}%` : `${idx.changePercent}%`}</span>
            </div>
          </div>
        ))}
      </div>

      {/* FII/DII Institutional Flows & Macro Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Sector Performance Matrix */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-6 border-indigo-500/20 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                Sector Performance & Momentum Matrix
              </h3>
              <span className="text-xs text-slate-400">1M vs 1Y Return</span>
            </div>

            <div className="space-y-3 text-xs">
              {sectorPerformance.map((sec) => (
                <div key={sec.sector} className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-white text-sm">{sec.sector}</div>
                    <div className="text-[11px] text-slate-400">{sec.regime}</div>
                  </div>

                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">1M Return</div>
                      <div className={`font-bold ${sec.return1M >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {sec.return1M >= 0 ? `+${sec.return1M}%` : `${sec.return1M}%`}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">1Y CAGR</div>
                      <div className="font-bold text-emerald-400">+{sec.return1Y}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Institutional Flows */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-emerald-500/20 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Institutional Liquidity Stream
            </h3>

            <div className="space-y-3 text-xs">
              {fiiDiiFlows.map((flow, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                  <span className="text-slate-400 font-semibold block">{flow.category}</span>
                  <span className="text-lg font-extrabold text-emerald-400">{flow.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
