import React, { useState } from 'react';
import type { PipelineItem } from '../data/mockData';
import { 
  Kanban, 
  ChevronRight, 
  ChevronLeft, 
  Trash2
} from 'lucide-react';

interface InvestorCRMProps {
  pipeline: PipelineItem[];
  setPipeline: React.Dispatch<React.SetStateAction<PipelineItem[]>>;
}

const STAGES: PipelineItem['stage'][] = [
  'Identified',
  'Intro Requested',
  'First Meeting',
  'Due Diligence',
  'Term Sheet',
  'Closed Pass'
];

export const InvestorCRM: React.FC<InvestorCRMProps> = ({
  pipeline,
  setPipeline
}) => {
  const [selectedItemNotes, setSelectedItemNotes] = useState<PipelineItem | null>(null);

  // Total weighted value
  const totalWeighted = pipeline.reduce((acc, curr) => acc + (curr.dealSize * curr.probability) / 100, 0);
  const totalTarget = pipeline.reduce((acc, curr) => acc + curr.dealSize, 0);

  const moveStage = (id: string, direction: 'next' | 'prev') => {
    setPipeline(prev => prev.map(item => {
      if (item.id !== id) return item;
      const currentIndex = STAGES.indexOf(item.stage);
      let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= STAGES.length) newIndex = STAGES.length - 1;
      
      return {
        ...item,
        stage: STAGES[newIndex],
        lastActivity: 'Just now'
      };
    }));
  };

  const deleteItem = (id: string) => {
    setPipeline(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 border-amber-500/20 bg-gradient-to-r from-[#111726] via-[#1F1C2B] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-amber flex items-center gap-1">
                <Kanban className="w-3.5 h-3.5" />
                Pipeline Tracking Active
              </span>
              <span className="badge badge-indigo">{pipeline.length} Investors Tracked</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Investor Deal Flow CRM
            </h1>
            <p className="text-slate-300 text-sm">
              Manage pitch stages, due diligence requests, meeting notes, and term sheet commitments.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-slate-400">Weighted Pipeline</div>
              <div className="text-xl font-extrabold text-amber-400">${(totalWeighted / 1000).toFixed(0)}k</div>
            </div>

            <div className="text-right pl-4 border-l border-white/10">
              <div className="text-xs text-slate-400">Total Unweighted</div>
              <div className="text-xl font-extrabold text-white">${(totalTarget / 1000000).toFixed(2)}M</div>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const items = pipeline.filter(p => p.stage === stage);
          const stageSum = items.reduce((acc, curr) => acc + curr.dealSize, 0);

          return (
            <div key={stage} className="glass-card p-3 bg-[#0D121F]/90 border-white/5 space-y-3 min-w-[220px]">
              
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div>
                  <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">{stage}</h3>
                  <div className="text-[10px] text-slate-400 font-semibold">${(stageSum / 1000).toFixed(0)}k total</div>
                </div>
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center">
                  {items.length}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-2.5 min-h-[400px]">
                {items.map((item) => (
                  <div 
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#131A2B] border border-white/10 hover:border-amber-500/40 transition-all space-y-2 group relative"
                  >
                    
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <div className="font-bold text-xs text-white">{item.firm}</div>
                        <div className="text-[11px] text-slate-400">{item.contactName}</div>
                      </div>

                      <button 
                        onClick={() => deleteItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove investor"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Deal size & probability */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="font-extrabold text-emerald-400">
                        ${(item.dealSize / 1000).toFixed(0)}k
                      </span>
                      <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded">
                        {item.probability}% Win
                      </span>
                    </div>

                    {/* Next step snippet */}
                    <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-white/5 space-y-1">
                      <span className="text-[9px] font-bold text-amber-400 uppercase block">Next Step:</span>
                      <p className="line-clamp-2">{item.nextStep}</p>
                    </div>

                    {/* Stage shift arrows */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                      <button
                        onClick={() => moveStage(item.id, 'prev')}
                        disabled={STAGES.indexOf(item.stage) === 0}
                        className="text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 flex items-center gap-0.5"
                      >
                        <ChevronLeft className="w-3 h-3" /> Back
                      </button>

                      <button
                        onClick={() => setSelectedItemNotes(item)}
                        className="text-indigo-400 hover:underline font-semibold"
                      >
                        Notes
                      </button>

                      <button
                        onClick={() => moveStage(item.id, 'next')}
                        disabled={STAGES.indexOf(item.stage) === STAGES.length - 1}
                        className="text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 flex items-center gap-0.5"
                      >
                        Next <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                ))}

                {items.length === 0 && (
                  <div className="text-center py-10 text-xs text-slate-500 border border-dashed border-white/5 rounded-xl">
                    No deals in {stage}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* MODAL: View/Edit Item Notes */}
      {selectedItemNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="glass-card max-w-md w-full p-6 space-y-4 border-amber-500/40 bg-[#111726]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{selectedItemNotes.firm}</h3>
                <p className="text-xs text-slate-400">{selectedItemNotes.contactName} • {selectedItemNotes.stage}</p>
              </div>
              <button 
                onClick={() => setSelectedItemNotes(null)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400">Meeting & Deal Notes</label>
              <textarea
                rows={5}
                defaultValue={selectedItemNotes.notes}
                onChange={(e) => {
                  const val = e.target.value;
                  setPipeline(prev => prev.map(p => p.id === selectedItemNotes.id ? { ...p, notes: val } : p));
                }}
                className="input-field text-xs leading-relaxed"
              ></textarea>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setSelectedItemNotes(null)} className="btn-primary text-xs">
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
