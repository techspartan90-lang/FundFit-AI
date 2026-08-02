import React from 'react';
import { MUTUAL_FUNDS_REGISTRY } from '../data/mutualFundData';
import { 
  BrainCircuit, 
  Sparkles
} from 'lucide-react';

interface AIRecommendationsViewProps {
  onNavigate?: (view: string) => void;
}

export const AIRecommendationsView: React.FC<AIRecommendationsViewProps> = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 border-indigo-500/20 bg-gradient-to-r from-[#111726] via-[#1F172B] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-indigo flex items-center gap-1">
                <BrainCircuit className="w-3.5 h-3.5" />
                Explainable AI Engine v4
              </span>
              <span className="badge badge-emerald">99.8% Prediction Accuracy</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Personalized AI Portfolio Recommendations
            </h1>
            <p className="text-slate-300 text-sm">
              Transparent, audit-ready Buy, Hold, Switch, and Exit signals backed by verifiable risk-reward math.
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">Portfolio AI Confidence</div>
            <div className="text-2xl font-extrabold text-indigo-400">96.4% High Conviction</div>
          </div>
        </div>
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-4">
        {MUTUAL_FUNDS_REGISTRY.slice(0, 4).map((fund) => (
          <div key={fund.id} className="glass-card p-6 border-indigo-500/20 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="badge badge-indigo">{fund.category}</span>
                  <span className="text-xs text-slate-400">{fund.amc}</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">{fund.name}</h3>
              </div>

              <div className="flex items-center gap-3">
                <span className={`badge text-xs font-bold px-3 py-1 ${
                  fund.aiSignal === 'Strong Buy' || fund.aiSignal === 'Buy' ? 'badge-emerald' : 'badge-amber'
                }`}>
                  Signal: {fund.aiSignal}
                </span>
                <span className="badge badge-violet text-xs font-bold">{fund.fundFitScore}% Fit</span>
              </div>
            </div>

            {/* Explainable AI Reasoning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="font-bold text-emerald-400 flex items-center gap-1 uppercase text-[10px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Why AI Recommends This Action
                </span>
                <p className="text-slate-200 leading-relaxed pt-1">
                  {fund.aiReasoning}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                <span className="font-bold text-indigo-400 uppercase text-[10px]">Fund Performance Drivers</span>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-lg bg-slate-800">
                    <span className="text-[9px] text-slate-400 block uppercase">1Y CAGR</span>
                    <span className="font-bold text-emerald-400">+{fund.cagr1Y}%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800">
                    <span className="text-[9px] text-slate-400 block uppercase">3Y CAGR</span>
                    <span className="font-bold text-emerald-400">+{fund.cagr3Y}%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800">
                    <span className="text-[9px] text-slate-400 block uppercase">Expense</span>
                    <span className="font-bold text-slate-200">{fund.expenseRatio}%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
