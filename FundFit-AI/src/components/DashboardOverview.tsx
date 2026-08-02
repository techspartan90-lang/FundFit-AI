import React from 'react';
import type { 
  StartupProfile, 
  VCInvestor, 
  PipelineItem 
} from '../data/mockData';
import { 
  TrendingUp, 
  FileText, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  ChevronRight,
  PieChart,
  Kanban,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface DashboardOverviewProps {
  startup: StartupProfile;
  investors: VCInvestor[];
  pipeline: PipelineItem[];
  onNavigate: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  startup,
  investors,
  pipeline,
  onNavigate
}) => {
  // Score gauge calculation
  const score = startup.fundabilityScore;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const percentRaised = Math.round((startup.raisedSoFar / startup.targetRaise) * 100);
  const topMatch = investors[0];

  const recentEvents = [
    { id: '1', title: 'Dr. Sarah Thorne issued soft term sheet commitment ($250k)', time: '2 hours ago', type: 'term_sheet' },
    { id: '2', title: 'Apex Horizon requested data room technical deep-dive access', time: 'Yesterday', type: 'diligence' },
    { id: '3', title: 'AI Auditor updated Fundability Score to 86/100 (+4 pts)', time: '2 days ago', type: 'score' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Hero Header */}
      <div className="glass-card p-6 border-indigo-500/20 bg-gradient-to-r from-[#111726] via-[#161D30] to-[#121A2C] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-emerald flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Seed Round
              </span>
              <span className="badge badge-indigo">{startup.sector}</span>
              <span className="badge badge-violet">Pre-Money: ${(startup.valPreMoney / 1000000).toFixed(1)}M</span>
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {startup.name} <span className="text-slate-400 font-normal text-lg">| Fundraising Command Center</span>
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              {startup.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('matchmaker')}
              className="btn-primary"
            >
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>AI Match VCs ({investors.length})</span>
            </button>

            <button 
              onClick={() => onNavigate('deck-auditor')}
              className="btn-secondary"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Audit Deck</span>
            </button>
          </div>

        </div>
      </div>

      {/* Primary Row: 3 Equal Dashboard Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Column 1: AI Fundability Score Index */}
        <div className="glass-card p-6 border-indigo-500/30 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fundability Index</h3>
              <p className="text-[11px] text-slate-400">Autonomous AI Readiness</p>
            </div>
            <span className="badge badge-emerald text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              VC Ready
            </span>
          </div>

          {/* Score Circle */}
          <div className="flex items-center justify-center my-1 relative">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle cx="72" cy="72" r={radius} className="score-circle-bg" />
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="score-circle-progress"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                  stroke: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#F43F5E'
                }}
              />
            </svg>
            <div className="absolute flex flex-col items-center text-center">
              <span className="text-3xl font-extrabold text-white">{score}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">out of 100</span>
            </div>
          </div>

          {/* Quick breakdown bars */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-300 font-semibold">
              <span>Team Background</span>
              <span className="text-indigo-400">{startup.scoreBreakdown.team}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5">
              <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${startup.scoreBreakdown.team}%` }}></div>
            </div>

            <div className="flex justify-between text-slate-300 font-semibold pt-1">
              <span>Market Opportunity</span>
              <span className="text-emerald-400">{startup.scoreBreakdown.market}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${startup.scoreBreakdown.market}%` }}></div>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('deck-auditor')}
            className="btn-secondary text-xs w-full justify-center mt-2"
          >
            <span>Audit Deck & Improve Score</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Column 2: Financial & Momentum Metrics */}
        <div className="glass-card p-6 border-emerald-500/30 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Round & Revenue Momentum</h3>
              <p className="text-[11px] text-slate-400">Live Seed Capital Pace</p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-3">
            {/* Target raise progress */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Target Round ($2.5M)</span>
                <span className="text-emerald-400 font-bold">{percentRaised}% Committed</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2 rounded-full" 
                  style={{ width: `${percentRaised}%` }}
                ></div>
              </div>
              <div className="text-[11px] text-slate-300 flex justify-between">
                <span>Raised: ${(startup.raisedSoFar / 1000).toFixed(0)}k</span>
                <span>Seeking: ${(startup.targetRaise / 1000000).toFixed(2)}M</span>
              </div>
            </div>

            {/* ARR & Runway grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">ARR Pace</span>
                <div className="text-base font-extrabold text-white">${(startup.arr / 1000).toFixed(0)}k</div>
                <span className="text-emerald-400 font-semibold text-[10px]">+{startup.momGrowth}% MoM</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Runway</span>
                <div className="text-base font-extrabold text-white">{startup.runwayMonths} Mo</div>
                <span className="text-amber-400 font-semibold text-[10px]">${(startup.burnRateMonthly / 1000).toFixed(0)}k/mo Burn</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('financials')}
            className="btn-secondary text-xs w-full justify-center mt-2"
          >
            <span>Simulate Cap Table & Dilution</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Column 3: Active VC Pipeline & Top Match Teaser */}
        <div className="glass-card p-6 border-amber-500/30 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Pipeline CRM</h3>
              <p className="text-[11px] text-slate-400">{pipeline.length} Active VC Discussions</p>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Kanban className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-3">
            {/* Top Match Highlight */}
            {topMatch && (
              <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="badge badge-indigo text-[10px]">Top AI VC Match</span>
                  <span className="text-emerald-400 font-bold text-xs">{topMatch.matchScore}% Match</span>
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{topMatch.firm}</div>
                  <div className="text-xs text-slate-300">{topMatch.name} • {topMatch.type}</div>
                </div>
              </div>
            )}

            {/* Pipeline Stage Summary */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1.5 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Term Sheets Issued:</span>
                <span className="text-emerald-400 font-bold">1 ($250k commitment)</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Due Diligence Stage:</span>
                <span className="text-indigo-400 font-bold">1 ($1.5M check)</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('crm')}
            className="btn-secondary text-xs w-full justify-center mt-2"
          >
            <span>Open Pipeline Kanban Board</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Secondary Row: Autonomous AI Feature Command Hub */}
      <div className="glass-card p-6 space-y-4 border-indigo-500/20">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Autonomous AI Feature Hub
          </h2>
          <span className="text-xs text-slate-400 hidden sm:inline">Select a module to initiate AI workflow</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={() => onNavigate('deck-auditor')}
            className="glass-card glass-card-interactive p-4 cursor-pointer space-y-2 bg-indigo-950/20 border-indigo-500/20"
          >
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 w-fit">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Pitch Deck AI Audit</h4>
            <p className="text-xs text-slate-400">
              Slide-by-slide scoring, VC red flag alerts, and predicted partner Q&A defenses.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('matchmaker')}
            className="glass-card glass-card-interactive p-4 cursor-pointer space-y-2 bg-emerald-950/20 border-emerald-500/20"
          >
            <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Investor Match Matrix</h4>
            <p className="text-xs text-slate-400">
              Match with 5,400+ indexed VCs based on sector thesis, check size, and dry powder.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('financials')}
            className="glass-card glass-card-interactive p-4 cursor-pointer space-y-2 bg-violet-950/20 border-violet-500/20"
          >
            <div className="p-2.5 rounded-xl bg-violet-600/20 text-violet-400 w-fit">
              <PieChart className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Valuation & Cap Table</h4>
            <p className="text-xs text-slate-400">
              Simulate ARR multiples, pre/post-money equity dilution, and runway depletion.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('crm')}
            className="glass-card glass-card-interactive p-4 cursor-pointer space-y-2 bg-amber-950/20 border-amber-500/20"
          >
            <div className="p-2.5 rounded-xl bg-amber-600/20 text-amber-400 w-fit">
              <Kanban className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Investor Pipeline CRM</h4>
            <p className="text-xs text-slate-400">
              Manage pitch stages, due diligence tasks, warm intro paths, and term sheets.
            </p>
          </div>

        </div>
      </div>

      {/* Tertiary Row: Recent AI Insights & Feed */}
      <div className="glass-card p-6 space-y-4 border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            Recent Live Fundraising Activity & AI Milestones
          </h3>
          <span className="badge badge-indigo text-[10px]">Real-time Stream</span>
        </div>

        <div className="space-y-2.5 text-xs">
          {recentEvents.map((evt) => (
            <div key={evt.id} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200 font-medium">{evt.title}</span>
              </div>
              <span className="text-slate-500 text-[11px] shrink-0">{evt.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
