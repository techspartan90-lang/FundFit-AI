import React, { useState } from 'react';
import type { StartupProfile } from '../data/mockData';
import { 
  Building2, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck
} from 'lucide-react';

interface InvestorModeViewProps {
  startup: StartupProfile;
}

export const InvestorModeView: React.FC<InvestorModeViewProps> = ({ startup }) => {
  const [selectedDeal, setSelectedDeal] = useState<string>('deal-1');
  const [generatedMemo, setGeneratedMemo] = useState<boolean>(false);

  const inboundDeals = [
    {
      id: 'deal-1',
      name: startup.name,
      tagline: startup.tagline,
      sector: startup.sector,
      stage: startup.stage,
      ask: `$${(startup.targetRaise / 1000000).toFixed(1)}M at $${(startup.valPreMoney / 1000000).toFixed(0)}M Pre`,
      arr: `$${(startup.arr / 1000).toFixed(0)}k ARR (+${startup.momGrowth}% MoM)`,
      aiFitScore: 96,
      submittedDate: '2 hours ago',
      founders: startup.founders
    },
    {
      id: 'deal-2',
      name: 'OmniCompute AI',
      tagline: 'GPU Cluster Orchestration for LLM Training Workloads',
      sector: 'AI Infrastructure',
      stage: 'Seed',
      ask: '$3.5M at $14M Pre',
      arr: '$320k ARR (+18% MoM)',
      aiFitScore: 88,
      submittedDate: '1 day ago',
      founders: [{ name: 'Kaelen Voss', role: 'CEO', background: 'Ex-NVIDIA Principal Scientist' }]
    },
    {
      id: 'deal-3',
      name: 'Veritas Health',
      tagline: 'Clinical Trial Patient Matching via Sovereign AI',
      sector: 'HealthTech AI',
      stage: 'Pre-seed',
      ask: '$1.2M at $6M Pre',
      arr: '$140k ARR (+12% MoM)',
      aiFitScore: 74,
      submittedDate: '3 days ago',
      founders: [{ name: 'Dr. Maya Patel', role: 'CEO', background: 'MD/PhD Johns Hopkins' }]
    }
  ];

  const currentDeal = inboundDeals.find(d => d.id === selectedDeal) || inboundDeals[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 border-emerald-500/20 bg-gradient-to-r from-[#111726] via-[#10241F] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-emerald flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                Apex Horizon Ventures Partner Portal
              </span>
              <span className="badge badge-indigo">Active Fund III ($120M)</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              VC Deal Inbox & AI Investment Memo Engine
            </h1>
            <p className="text-slate-300 text-sm">
              Review inbound pitch decks, automated thesis fit scores, and 1-click IC investment memo generation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-400">Inbound Deaflflow Today</div>
              <div className="text-xl font-extrabold text-emerald-400">{inboundDeals.length} New Pitch Submissions</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Deal Inbox (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Inbound Startup Submissions
          </h3>

          <div className="space-y-2.5">
            {inboundDeals.map((deal) => {
              const isSelected = deal.id === selectedDeal;

              return (
                <div
                  key={deal.id}
                  onClick={() => {
                    setSelectedDeal(deal.id);
                    setGeneratedMemo(false);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                      : 'bg-[#111726]/80 hover:bg-[#182033] border-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-sm text-white">{deal.name}</div>
                      <div className="text-xs text-slate-400 font-medium">{deal.sector} • {deal.stage}</div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="badge badge-emerald text-[11px] font-bold">
                        {deal.aiFitScore}% Fit
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">{deal.submittedDate}</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-1 mt-2">{deal.tagline}</p>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/5 mt-2">
                    <span className="text-slate-400">{deal.ask}</span>
                    <span className="text-emerald-400 font-semibold">{deal.arr}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Investment Memo & Evaluation (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="glass-card p-6 border-emerald-500/20 space-y-6">
            
            {/* Top Deal Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="badge badge-indigo">{currentDeal.sector}</span>
                  <span className="badge badge-emerald">{currentDeal.stage} Round</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">{currentDeal.name}</h2>
                <p className="text-xs text-slate-300">{currentDeal.tagline}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGeneratedMemo(true)}
                  className="btn-emerald text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate IC Investment Memo</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 block font-semibold">Target Ask</span>
                <span className="text-white font-extrabold text-sm">{currentDeal.ask}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 block font-semibold">Revenue & Traction</span>
                <span className="text-emerald-400 font-extrabold text-sm">{currentDeal.arr}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 block font-semibold">Founding Team</span>
                <span className="text-indigo-400 font-bold">{currentDeal.founders[0].name} ({currentDeal.founders[0].background})</span>
              </div>
            </div>

            {/* AI Fit Analysis for VC */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Thesis Match Intelligence Summary
                </span>
                <span className="text-xs font-bold text-emerald-300">{currentDeal.aiFitScore}% High Conviction</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Matches Apex Horizon Fund III mandate for early-stage AI productivity. Founders hold ex-Stripe and DeepMind backgrounds with proven 22% MoM revenue expansion.
              </p>
            </div>

            {/* Generated IC Memo View */}
            {generatedMemo && (
              <div className="p-5 rounded-xl bg-slate-900/90 border border-emerald-500/40 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-extrabold text-white text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    Investment Committee (IC) Deal Memo Draft
                  </span>
                  <span className="badge badge-emerald">Ready for Partner Vote</span>
                </div>

                <div className="space-y-2 text-slate-200 leading-relaxed font-mono">
                  <p><strong className="text-emerald-400">1. Executive Summary:</strong> {currentDeal.name} is building an autonomous platform for startup fundraising with $480k ARR growing 22% MoM.</p>
                  <p><strong className="text-indigo-400">2. Market Opportunity:</strong> $18B global market for private market deal flow and capital software.</p>
                  <p><strong className="text-amber-400">3. Deal Terms Proposed:</strong> Recommend participating with $1.5M check at $10M Pre-money valuation.</p>
                  <p><strong className="text-violet-400">4. Key Risk & Mitigation:</strong> High pace of AI feature launches from incumbents. Mitigated by proprietary data flywheel on investor feedback loops.</p>
                </div>
              </div>
            )}

            {/* Partner Decision Bar */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400 font-semibold">Partner Action:</span>
              
              <div className="flex items-center gap-3">
                <button className="btn-secondary text-xs text-rose-400 hover:text-rose-300">
                  <XCircle className="w-4 h-4" />
                  <span>Pass on Deal</span>
                </button>

                <button className="btn-emerald text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Invite to Partner Meeting</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
