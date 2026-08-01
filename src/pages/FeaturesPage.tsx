import React from 'react';
import { BrainCircuit, ShieldCheck, Activity, Layers, Sliders, BarChart3, CheckCircle2 } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const featureList = [
    { title: 'Explainable AI Scoring Engine', desc: 'Break down complex factor scores (Sharpe, Alpha, Beta, Downside Deviation) into human-readable insights.' },
    { title: '10,000 Stochastic Path Simulation', desc: 'Simulate extreme tail risk events and economic regime changes over 1-30 year investment horizons.' },
    { title: 'Sector Overlap & Concentration Guard', desc: 'Detect subtle duplicate holdings across multiple mutual funds to eliminate unintentional single-stock exposure.' },
    { title: 'Real-Time Market Pulse Ticker', desc: 'Live benchmark tracking across indices, bond yields, and volatility metrics.' },
    { title: 'Interactive Risk Tolerance Profiling', desc: 'Dynamic questionnaire adjusting portfolio weights based on behavioral loss aversion thresholds.' },
    { title: '3NF Database Architecture', desc: 'Normalized relational storage ensuring strict transaction safety and audit traceability.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">Deep Capability Technical Matrix</div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">Engineered for Quantitative Rigor</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureList.map((feat, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold">
              0{idx + 1}
            </div>
            <h3 className="text-base font-bold text-white">{feat.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
