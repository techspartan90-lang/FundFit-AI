import React, { useState } from 'react';
import { 
  Search, 
  X, 
  LayoutDashboard, 
  PieChart, 
  Compass, 
  Target, 
  TrendingUp, 
  BrainCircuit, 
  FileText, 
  Building2, 
  ShieldCheck, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { MUTUAL_FUNDS_REGISTRY } from '../data/mutualFundData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const pageShortcuts = [
    { id: 'dashboard', label: 'Investor Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio & Holdings', icon: PieChart },
    { id: 'funds', label: 'Mutual Fund Explorer', icon: Compass },
    { id: 'goals', label: 'Goal Planner', icon: Target },
    { id: 'market', label: 'Market Intelligence & Regimes', icon: TrendingUp },
    { id: 'ai-recommendations', label: 'AI Recommendations', icon: BrainCircuit },
    { id: 'reports', label: 'Reports & Statements', icon: FileText },
    { id: 'advisor', label: 'Advisor Portal', icon: Building2 },
    { id: 'admin', label: 'Admin Portal', icon: ShieldCheck },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  const filteredFunds = MUTUAL_FUNDS_REGISTRY.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.amc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPages = pageShortcuts.filter(p => 
    p.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-card max-w-2xl w-full border-indigo-500/40 bg-[#0D121F] shadow-2xl overflow-hidden space-y-3">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search funds, AMC, or press shortcut (e.g. Portfolio)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-500 font-sans"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto px-4 pb-4 space-y-4 text-xs">
          
          {/* Quick Page Navigation */}
          {filteredPages.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">Navigation Shortcuts</span>
              {filteredPages.map((page) => {
                const Icon = page.icon;
                return (
                  <div
                    key={page.id}
                    onClick={() => {
                      onNavigate(page.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-indigo-950/40 border border-white/5 hover:border-indigo-500/40 cursor-pointer flex items-center justify-between text-slate-200 hover:text-white transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-indigo-400" />
                      <span className="font-semibold">{page.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                );
              })}
            </div>
          )}

          {/* Mutual Fund Search Results */}
          {filteredFunds.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">Mutual Funds ({filteredFunds.length})</span>
              {filteredFunds.map((fund) => (
                <div
                  key={fund.id}
                  onClick={() => {
                    onNavigate('funds');
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-emerald-950/40 border border-white/5 hover:border-emerald-500/40 cursor-pointer flex items-center justify-between text-slate-200 hover:text-white transition-all"
                >
                  <div>
                    <div className="font-bold text-white text-xs">{fund.name}</div>
                    <div className="text-[11px] text-slate-400">{fund.amc} • {fund.category}</div>
                  </div>
                  <div className="text-right">
                    <span className="badge badge-emerald text-[10px] font-bold">{fund.fundFitScore}% Fit</span>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">+{fund.cagr3Y}% (3Y CAGR)</div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
