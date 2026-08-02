import React from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  FileSearch, 
  Users, 
  Kanban, 
  Calculator, 
  Bot, 
  ArrowRightLeft,
  Building2
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: 'founder' | 'investor';
  setUserRole: (role: 'founder' | 'investor') => void;
  toggleCopilot: () => void;
  isCopilotOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  toggleCopilot,
  isCopilotOpen
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[rgba(9,13,22,0.85)] backdrop-blur-md border-b border-[rgba(255,255,255,0.08)] px-4 lg:px-8 py-3">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-400 p-[2px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                Fundfit <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">AI</span>
              </span>
              <span className="badge badge-indigo text-[10px]">v2.4 Autonomous</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              {userRole === 'founder' ? 'Founder Fundraising & Deck Copilot' : 'VC Deal Flow & Match Intelligence'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#111726]/80 p-1.5 rounded-xl border border-white/5">
          {userRole === 'founder' ? (
            <>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('deck-auditor')}
                className={`nav-tab ${activeTab === 'deck-auditor' ? 'active' : ''}`}
              >
                <FileSearch className="w-4 h-4 text-emerald-400" />
                <span>Deck Auditor</span>
              </button>

              <button
                onClick={() => setActiveTab('matchmaker')}
                className={`nav-tab ${activeTab === 'matchmaker' ? 'active' : ''}`}
              >
                <Users className="w-4 h-4 text-indigo-400" />
                <span>AI Investor Match</span>
              </button>

              <button
                onClick={() => setActiveTab('crm')}
                className={`nav-tab ${activeTab === 'crm' ? 'active' : ''}`}
              >
                <Kanban className="w-4 h-4 text-amber-400" />
                <span>Pipeline CRM</span>
              </button>

              <button
                onClick={() => setActiveTab('financials')}
                className={`nav-tab ${activeTab === 'financials' ? 'active' : ''}`}
              >
                <Calculator className="w-4 h-4 text-violet-400" />
                <span>Valuation & Cap Table</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('investor-portal')}
                className={`nav-tab ${activeTab === 'investor-portal' ? 'active' : ''}`}
              >
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Inbound Deal Flow</span>
              </button>
              <button
                onClick={() => setActiveTab('matchmaker')}
                className={`nav-tab ${activeTab === 'matchmaker' ? 'active' : ''}`}
              >
                <Users className="w-4 h-4 text-indigo-400" />
                <span>VC Network Directory</span>
              </button>
            </>
          )}
        </nav>

        {/* Right Actions & Controls */}
        <div className="flex items-center gap-3">
          
          {/* Role Switcher Toggle */}
          <button
            onClick={() => {
              const newRole = userRole === 'founder' ? 'investor' : 'founder';
              setUserRole(newRole);
              setActiveTab(newRole === 'founder' ? 'dashboard' : 'investor-portal');
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 transition-all"
            title="Switch between Founder and Investor perspectives"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-400" />
            <span>Role:</span>
            <span className={userRole === 'founder' ? 'text-indigo-400 font-bold' : 'text-emerald-400 font-bold'}>
              {userRole === 'founder' ? 'Founder Mode' : 'Investor/VC Mode'}
            </span>
          </button>

          {/* AI Copilot Button */}
          <button
            onClick={toggleCopilot}
            className={`btn-primary text-xs ${isCopilotOpen ? 'ring-2 ring-indigo-400' : ''}`}
          >
            <Bot className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span className="hidden sm:inline">AI Copilot</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </button>
        </div>

      </div>

      {/* Mobile Nav Drawer Row */}
      <div className="flex md:hidden items-center justify-around mt-2 pt-2 border-t border-white/5 text-xs">
        {userRole === 'founder' ? (
          <>
            <button onClick={() => setActiveTab('dashboard')} className={`p-2 ${activeTab === 'dashboard' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}>Overview</button>
            <button onClick={() => setActiveTab('deck-auditor')} className={`p-2 ${activeTab === 'deck-auditor' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>Audit Deck</button>
            <button onClick={() => setActiveTab('matchmaker')} className={`p-2 ${activeTab === 'matchmaker' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}>Match VCs</button>
            <button onClick={() => setActiveTab('crm')} className={`p-2 ${activeTab === 'crm' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>Pipeline</button>
            <button onClick={() => setActiveTab('financials')} className={`p-2 ${activeTab === 'financials' ? 'text-violet-400 font-bold' : 'text-slate-400'}`}>Valuation</button>
          </>
        ) : (
          <>
            <button onClick={() => setActiveTab('investor-portal')} className={`p-2 ${activeTab === 'investor-portal' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>Deal Flow</button>
            <button onClick={() => setActiveTab('matchmaker')} className={`p-2 ${activeTab === 'matchmaker' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}>Directory</button>
          </>
        )}
      </div>
    </header>
  );
};
