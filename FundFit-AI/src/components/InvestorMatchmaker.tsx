import React, { useState } from 'react';
import type { VCInvestor, PipelineItem } from '../data/mockData';
import { 
  Users, 
  Search, 
  Zap, 
  CheckCircle2, 
  Mail, 
  Send, 
  Plus, 
  Copy, 
  Sparkles, 
  ShieldCheck
} from 'lucide-react';

interface InvestorMatchmakerProps {
  investors: VCInvestor[];
  pipeline: PipelineItem[];
  onAddToPipeline: (investor: VCInvestor) => void;
}

export const InvestorMatchmaker: React.FC<InvestorMatchmakerProps> = ({
  investors,
  pipeline,
  onAddToPipeline
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedVcForIntro, setSelectedVcForIntro] = useState<VCInvestor | null>(null);
  const [copiedIntro, setCopiedIntro] = useState(false);

  // Filter logic
  const filteredInvestors = investors.filter(vc => {
    const matchesSearch = vc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vc.firm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vc.thesisAlignmentReason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSector = selectedSector === 'All' || vc.sectors.some(s => s.toLowerCase().includes(selectedSector.toLowerCase()));
    const matchesStage = selectedStage === 'All' || vc.stages.includes(selectedStage);

    return matchesSearch && matchesSector && matchesStage;
  });

  const generateWarmIntroText = (vc: VCInvestor) => {
    return `Subject: Intro request: Fundfit AI (Seed | $480k ARR, 22% MoM) - ${vc.firm} Alignment

Hi ${vc.name.split(' ')[0]},

I noticed your active investments in ${vc.notableInvestments.join(', ')} and your focus on ${vc.sectors[0]}. 

We are building Fundfit AI — an autonomous AI platform that streamlines founder fundraising and deck auditing. We've scaled to $480k ARR growing 22% MoM with 140 paying accounts.

Given ${vc.firm}'s thesis in AI infrastructure and your recent Fund III deployment activity, I thought there could be strong alignment for our $2.5M Seed round (with soft commitments already secured).

Would you be open to a brief 15-min intro call next week? I'd be happy to share our deck and live product metrics.

Best regards,
Aria Vance | CEO & Co-founder, Fundfit AI
aria@fundfit.ai`;
  };

  const handleCopyIntro = (vc: VCInvestor) => {
    navigator.clipboard.writeText(generateWarmIntroText(vc));
    setCopiedIntro(true);
    setTimeout(() => setCopiedIntro(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 border-indigo-500/20 bg-gradient-to-r from-[#111726] via-[#1A1F36] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-indigo flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-yellow-300" />
                AI Thesis Matching Active
              </span>
              <span className="badge badge-emerald">5,400+ VCs Indexed</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              AI Investor Matchmaker & Warm Intro Studio
            </h1>
            <p className="text-slate-300 text-sm">
              Discover high-conviction VCs and Angels matching your stage, check size, sector thesis, and dry powder status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Total Top Matches</div>
              <div className="text-2xl font-extrabold text-indigo-400">{filteredInvestors.length} Active VCs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search VC firm, partner, or thesis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-9 text-xs"
          />
        </div>

        {/* Sector Dropdown */}
        <div className="w-full md:w-48">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="input-field text-xs"
          >
            <option value="All">All Sectors</option>
            <option value="AI">AI & Fintech</option>
            <option value="SaaS">B2B SaaS</option>
            <option value="Developer">Developer Tools</option>
            <option value="Marketplace">Marketplaces</option>
          </select>
        </div>

        {/* Stage Dropdown */}
        <div className="w-full md:w-44">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="input-field text-xs"
          >
            <option value="All">All Stages</option>
            <option value="Pre-seed">Pre-seed</option>
            <option value="Seed">Seed</option>
            <option value="Series A">Series A</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 ml-auto hidden lg:block">
          Showing {filteredInvestors.length} of {investors.length} Verified VC Matches
        </div>

      </div>

      {/* VC Match Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvestors.map((vc) => {
          const inPipeline = pipeline.some(p => p.investorId === vc.id);

          return (
            <div 
              key={vc.id} 
              className="glass-card p-6 space-y-4 border-indigo-500/20 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
            >
              
              <div className="space-y-3">
                
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="badge badge-violet text-[11px] mb-1">{vc.type}</span>
                    <h3 className="text-lg font-bold text-white">{vc.firm}</h3>
                    <div className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{vc.name}</span>
                    </div>
                  </div>

                  {/* Match score badge */}
                  <div className="text-center bg-indigo-950/60 p-2 rounded-xl border border-indigo-500/30">
                    <div className="text-lg font-extrabold text-emerald-400">{vc.matchScore}%</div>
                    <div className="text-[9px] uppercase font-bold text-slate-400">Match</div>
                  </div>
                </div>

                {/* Key VC Details */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 rounded-lg bg-slate-900/50 border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Check Size</span>
                    <span className="text-slate-200 font-bold">
                      ${(vc.checkSizeMin / 1000).toFixed(0)}k - ${(vc.checkSizeMax / 1000000).toFixed(1)}M
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/50 border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Location</span>
                    <span className="text-slate-200 font-semibold truncate block">{vc.location}</span>
                  </div>
                </div>

                {/* Thesis Alignment Reason */}
                <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Thesis Alignment
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {vc.thesisAlignmentReason}
                  </p>
                </div>

                {/* Warm Intro Path */}
                <div className="text-xs text-emerald-400 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span className="truncate">{vc.warmPath}</span>
                </div>

                {/* Portfolio mentions */}
                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Portfolio: </span>
                  {vc.notableInvestments.join(', ')}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedVcForIntro(vc)}
                  className="btn-primary text-xs flex-1 justify-center"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Draft Warm Intro</span>
                </button>

                <button
                  onClick={() => onAddToPipeline(vc)}
                  disabled={inPipeline}
                  className={`btn-secondary text-xs ${inPipeline ? 'opacity-50 cursor-not-allowed text-emerald-400' : ''}`}
                >
                  {inPipeline ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>In Pipeline</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Track</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* MODAL: AI Warm Intro Email Generator */}
      {selectedVcForIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="glass-card max-w-2xl w-full p-6 space-y-4 border-indigo-500/40 bg-[#111726]">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="badge badge-emerald text-[10px]">Tailored AI Draft</span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Warm Intro Email for {selectedVcForIntro.name} ({selectedVcForIntro.firm})
                </h3>
              </div>
              <button 
                onClick={() => setSelectedVcForIntro(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400">Generated Copy (Editable)</label>
              <textarea
                rows={10}
                defaultValue={generateWarmIntroText(selectedVcForIntro)}
                className="input-field font-mono text-xs leading-relaxed"
              ></textarea>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Optimized for 42% cold-to-call conversion rate</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleCopyIntro(selectedVcForIntro)}
                  className="btn-secondary text-xs"
                >
                  <Copy className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{copiedIntro ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                </button>

                <button
                  onClick={() => {
                    onAddToPipeline(selectedVcForIntro);
                    setSelectedVcForIntro(null);
                  }}
                  className="btn-primary text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Add to Pipeline CRM</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
