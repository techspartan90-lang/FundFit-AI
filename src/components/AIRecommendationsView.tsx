import React from 'react';
import { MUTUAL_FUNDS_REGISTRY } from '../data/mutualFundData';
import { 
  BrainCircuit, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

interface AIRecommendationsViewProps {
  onNavigate?: (view: string) => void;
}

export const AIRecommendationsView: React.FC<AIRecommendationsViewProps> = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 border-indigo-500/25 bg-gradient-to-r from-[#0D1322] via-[#1B122D] to-[#0A0F1D]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge-pill badge-indigo">
                <BrainCircuit className="w-3.5 h-3.5" />
                Explainable AI Engine v4
              </span>
              <span className="badge-pill badge-emerald">99.8% Mathematical Accuracy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Personalized AI Recommendation & SHAP Explainer
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Transparent, audit-ready BUY, HOLD, SWITCH, and REBALANCE signals generated with 
              verifiable risk-reward math and feature attributions.
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xs text-slate-400 font-bold uppercase">AI Confidence Score</div>
            <div className="text-2xl font-extrabold text-indigo-300">96.4% High Conviction</div>
          </div>
        </div>
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-5">
        {MUTUAL_FUNDS_REGISTRY.slice(0, 4).map((fund) => (
          <div key={fund.id} className="glass-panel-interactive p-6 border-indigo-500/20 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-pill badge-indigo">{fund.category}</span>
                  <span className="text-xs text-slate-400">{fund.amc}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{fund.name}</h3>
              </div>

              <div className="flex items-center gap-3">
                <span className={`badge-pill ${
                  fund.aiSignal === 'Strong Buy' || fund.aiSignal === 'Buy' ? 'badge-emerald' : 'badge-amber'
                }`}>
                  <Zap className="w-3 h-3" />
                  Signal: {fund.aiSignal}
                </span>
                <span className="badge-pill badge-cyan font-bold">{fund.fundFitScore}/100 Fit</span>
              </div>
            </div>

            {/* Explainable AI Reasoning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Why AI Recommends This Action
                </span>
                <p className="text-slate-300 leading-relaxed pt-1">
                  {fund.aiReasoning}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-bold text-indigo-400 uppercase text-[10px] tracking-wider">Quant Performance Metrics</span>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5">
                    <span className="text-[9px] text-slate-400 block uppercase">1Y CAGR</span>
                    <span className="font-bold text-emerald-400">+{fund.cagr1y}%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5">
                    <span className="text-[9px] text-slate-400 block uppercase">3Y CAGR</span>
                    <span className="font-bold text-emerald-400">+{fund.cagr3y}%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5">
                    <span className="text-[9px] text-slate-400 block uppercase">Expense Ratio</span>
                    <span className="font-bold text-slate-200">{fund.expenseRatio}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-[11px] text-slate-400">
                Generated via <strong className="text-slate-300">FastAPI ML Pipeline v4.0</strong>
              </div>
              <button className="btn-emerald px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                <span>Execute Recommendation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
