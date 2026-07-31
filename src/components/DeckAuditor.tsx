import React, { useState } from 'react';
import type { PitchSlide } from '../data/mockData';
import { PITCH_DECK_SLIDES, PREDICTED_VC_QUESTIONS } from '../data/mockData';
import { 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  UploadCloud, 
  Sparkles, 
  ShieldAlert, 
  Layers, 
  RefreshCw,
  Zap,
  Lightbulb
} from 'lucide-react';

export const DeckAuditor: React.FC = () => {
  const [slides] = useState<PitchSlide[]>(PITCH_DECK_SLIDES);
  const [selectedSlideId, setSelectedSlideId] = useState<number>(1);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'slides' | 'qa' | 'redflags'>('slides');

  const selectedSlide = slides.find(s => s.id === selectedSlideId) || slides[0];

  // Calculate overall deck average score
  const avgScore = Math.round(slides.reduce((acc, curr) => acc + curr.score, 0) / slides.length);

  // Filter red flags count
  const allRedFlags = slides.flatMap(s => s.vcRedFlags.map(rf => ({ slideTitle: s.title, redFlag: rf })));

  const handleSimulateReAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 border-emerald-500/20 bg-gradient-to-r from-[#111726] via-[#13202E] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-emerald flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                AI Audit Engine active
              </span>
              <span className="badge badge-indigo">9 Slides Scanned</span>
              <span className="badge badge-amber">{allRedFlags.length} Red Flags Flagged</span>
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Pitch Deck AI Auditor & VC Q&A Engine
            </h1>
            <p className="text-slate-300 text-sm">
              Deep semantic audit of your pitch deck structure, financial metrics, TAM calculation, and competitive defensibility.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleSimulateReAudit}
              disabled={isAuditing}
              className="btn-emerald"
            >
              <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
              <span>{isAuditing ? 'Auditing Slides...' : 'Re-Run AI Deck Scan'}</span>
            </button>

            <label className="btn-secondary cursor-pointer">
              <UploadCloud className="w-4 h-4 text-indigo-400" />
              <span>Upload New PDF</span>
              <input type="file" accept=".pdf,.pptx" className="hidden" onChange={handleSimulateReAudit} />
            </label>
          </div>

        </div>
      </div>

      {/* Sub navigation for Auditor */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('slides')}
          className={`nav-tab ${activeTab === 'slides' ? 'active' : ''}`}
        >
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Slide-by-Slide Audit</span>
        </button>

        <button
          onClick={() => setActiveTab('qa')}
          className={`nav-tab ${activeTab === 'qa' ? 'active' : ''}`}
        >
          <HelpCircle className="w-4 h-4 text-indigo-400" />
          <span>Predicted VC Q&A ({PREDICTED_VC_QUESTIONS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('redflags')}
          className={`nav-tab ${activeTab === 'redflags' ? 'active' : ''}`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Red Flag Alerts ({allRedFlags.length})</span>
        </button>
      </div>

      {/* TAB 1: Slide-by-Slide Breakdown */}
      {activeTab === 'slides' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Slide List Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Slide Directory</span>
              <span className="text-xs font-semibold text-emerald-400">Avg Score: {avgScore}/100</span>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {slides.map((slide) => {
                const isSelected = slide.id === selectedSlideId;
                return (
                  <div
                    key={slide.id}
                    onClick={() => setSelectedSlideId(slide.id)}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md shadow-indigo-500/10'
                        : 'bg-[#111726]/80 hover:bg-[#182033] border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center">
                          {slide.id}
                        </span>
                        <div>
                          <div className="font-semibold text-xs text-white">{slide.title}</div>
                          <div className="text-[11px] text-slate-400">{slide.type}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {slide.vcRedFlags.length > 0 && (
                          <div title="Has Red Flags">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                          </div>
                        )}
                        <span className={`badge ${
                          slide.score >= 90 ? 'badge-emerald' : slide.score >= 80 ? 'badge-indigo' : 'badge-amber'
                        }`}>
                          {slide.score}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Slide Detailed Analysis (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="glass-card p-6 border-indigo-500/20 space-y-6">
              
              {/* Top Slide Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase">Slide {selectedSlide.id} • {selectedSlide.type}</span>
                    <span className={`badge ${
                      selectedSlide.status === 'excellent' ? 'badge-emerald' :
                      selectedSlide.status === 'good' ? 'badge-indigo' : 'badge-amber'
                    }`}>
                      {selectedSlide.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">{selectedSlide.title}</h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Slide AI Score</div>
                    <div className="text-2xl font-extrabold text-white">{selectedSlide.score}/100</div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-1">Executive Summary</h4>
                <p className="text-sm text-slate-200 bg-slate-900/50 p-3 rounded-xl border border-white/5">
                  {selectedSlide.summary}
                </p>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Strengths */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Key Strengths
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {selectedSlide.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    Recommended Enhancements
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {selectedSlide.improvements.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-400">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* VC Red Flag Warnings on this Slide */}
              {selectedSlide.vcRedFlags.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    VC Red Flag Alert
                  </h4>
                  {selectedSlide.vcRedFlags.map((rf, idx) => (
                    <p key={idx} className="text-xs text-amber-200">
                      {rf}
                    </p>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: Predicted VC Q&A */}
      {activeTab === 'qa' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex items-center gap-3">
            <Zap className="w-5 h-5 text-indigo-400 shrink-0" />
            <span>
              These questions are generated by Fundfit AI based on real VC partner decision memos for Seed AI/SaaS startups.
            </span>
          </div>

          <div className="space-y-4">
            {PREDICTED_VC_QUESTIONS.map((qa, index) => (
              <div key={index} className="glass-card p-5 border-indigo-500/20 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="badge badge-indigo">{qa.category}</span>
                    <span className={`badge ${
                      qa.difficulty === 'Extreme' ? 'badge-rose' : qa.difficulty === 'Hard' ? 'badge-amber' : 'badge-emerald'
                    }`}>
                      {qa.difficulty} Difficulty
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white flex items-start gap-2">
                  <span className="text-indigo-400">Q:</span>
                  <span>{qa.question}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5 space-y-1">
                    <span className="font-semibold text-amber-400 block">Why VCs Ask This:</span>
                    <p className="text-slate-300">{qa.whyTheyAsk}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                    <span className="font-semibold text-emerald-400 block">Recommended AI Defense:</span>
                    <p className="text-slate-200">{qa.recommendedAnswer}</p>
                  </div>
                </div>

                <div className="text-xs text-rose-300 bg-rose-950/20 p-2.5 rounded-lg border border-rose-500/20">
                  <span className="font-semibold text-rose-400">Pitfall to Avoid: </span>
                  {qa.pitfallsToAvoid}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Red Flag Summary */}
      {activeTab === 'redflags' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              Resolving these red flags before pitch meetings increases partner pass-through rates by up to 40%.
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {allRedFlags.map((item, idx) => (
              <div key={idx} className="glass-card p-5 border-amber-500/30 flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <span className="badge badge-amber">Slide: {item.slideTitle}</span>
                  <p className="text-sm font-semibold text-white">{item.redFlag}</p>
                  <p className="text-xs text-slate-400">
                    Suggested Action: Update slide content to provide verifiable bottom-up calculations or regulatory disclaimers.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setActiveTab('slides');
                  }}
                  className="btn-secondary text-xs shrink-0"
                >
                  Edit Slide
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
