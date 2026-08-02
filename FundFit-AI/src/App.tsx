import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { PortfolioView } from './components/PortfolioView';
import { FundExplorerView } from './components/FundExplorerView';
import { GoalPlannerView } from './components/GoalPlannerView';
import { MarketIntelligenceView } from './components/MarketIntelligenceView';
import { AIRecommendationsView } from './components/AIRecommendationsView';
import { ReportsView } from './components/ReportsView';
import { AdvisorPortalView } from './components/AdvisorPortalView';
import { AdminPortalView } from './components/AdminPortalView';
import { SettingsView } from './components/SettingsView';
import { CommandPalette } from './components/CommandPalette';
import { AIChatbotDrawer } from './components/AIChatbotDrawer';
import { FullAppView } from './components/FullAppView';

export function App() {
  const [appState, setAppState] = useState<'landing' | 'auth' | 'app'>('landing');
  const [currentView, setCurrentView] = useState<string>('mobile-ui');
  const [userRole, setUserRole] = useState<'investor' | 'advisor' | 'admin'>('investor');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);

  // Sync role selection to view if switching to Advisor/Admin portal
  const handleSetUserRole = (role: 'investor' | 'advisor' | 'admin') => {
    setUserRole(role);
    if (role === 'advisor') setCurrentView('advisor');
    else if (role === 'admin') setCurrentView('admin');
    else setCurrentView('dashboard');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (appState === 'landing') {
    return (
      <LandingPage
        onLoginClick={() => setAppState('auth')}
        onExploreApp={() => setAppState('app')}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  if (appState === 'auth') {
    return (
      <AuthPage
        onSuccessLogin={() => setAppState('app')}
        onBackToHome={() => setAppState('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-white flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* App Shell Container */}
      <div className="flex flex-1 min-h-screen">
        
        {/* Animated Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          userRole={userRole}
          onLogout={() => setAppState('landing')}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Header Bar */}
          <TopBar
            currentView={currentView}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            userRole={userRole}
            setUserRole={handleSetUserRole}
            theme={theme}
            toggleTheme={toggleTheme}
            onLogout={() => setAppState('landing')}
          />

          {/* View Routing Body */}
          <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            
            {currentView === 'dashboard' && (
              <DashboardView onNavigate={(view) => setCurrentView(view)} />
            )}

            {currentView === 'portfolio' && (
              <PortfolioView onNavigate={(view) => setCurrentView(view)} />
            )}

            {currentView === 'funds' && (
              <FundExplorerView />
            )}

            {currentView === 'goals' && (
              <GoalPlannerView />
            )}

            {currentView === 'market' && (
              <MarketIntelligenceView />
            )}

            {currentView === 'ai-recommendations' && (
              <AIRecommendationsView onNavigate={(view) => setCurrentView(view)} />
            )}

            {currentView === 'reports' && (
              <ReportsView />
            )}

            {currentView === 'alerts' && (
              <AIRecommendationsView onNavigate={(view) => setCurrentView(view)} />
            )}

            {currentView === 'advisor' && (
              <AdvisorPortalView />
            )}

            {currentView === 'admin' && (
              <AdminPortalView />
            )}

            {currentView === 'settings' && (
              <SettingsView />
            )}

            {currentView === 'mobile-ui' && (
              <FullAppView onNavigate={(view) => setCurrentView(view)} />
            )}

          </main>

          {/* Footer Bar */}
          <footer className="border-t border-white/5 py-4 px-6 text-center text-xs text-slate-500 bg-[#090D16]">
            <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-300">FUND FIT AI</span> • Enterprise Mutual Fund Intelligence Platform
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <button onClick={() => setIsCopilotOpen(true)} className="text-indigo-400 hover:underline font-semibold">
                  Ask AI Copilot
                </button>
                <span>SEBI Registered RIA Partner</span>
              </div>
            </div>
          </footer>

        </div>

      </div>

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(view) => {
          setAppState('app');
          setCurrentView(view);
        }}
      />

      {/* Floating AI Chatbot Assistant Drawer */}
      <AIChatbotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />

      {/* Floating Trigger Button for AI Chatbot */}
      {!isCopilotOpen && appState === 'app' && (
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="fixed bottom-6 right-6 z-40 btn-primary p-3.5 rounded-full shadow-2xl shadow-indigo-600/50 flex items-center gap-2"
          title="Open AI Wealth Assistant"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold hidden sm:inline">Ask AI Assistant</span>
        </button>
      )}

    </div>
  );
}

export default App;
