import React, { useState } from 'react';
import SplitText from './SplitText';
import SpecularButton from './SpecularButton';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  PieChart, 
  BrainCircuit, 
  CheckCircle2, 
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  BarChart3,
  Sliders,
  ChevronRight,
  Search,
  Moon,
  Sun,
  X,
  Lock,
  Globe,
  Award,
  Users
} from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
  onExploreApp: () => void;
  onOpenCommandPalette: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLoginClick,
  onExploreApp,
  onOpenCommandPalette,
  theme,
  toggleTheme
}) => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'fit_score' | 'monte_carlo' | 'xai' | 'regime'>('fit_score');
  
  // Interactive Simulator State
  const [simAge, setSimAge] = useState<number>(32);
  const [simIncome, setSimIncome] = useState<number>(150000);
  const [simRisk, setSimRisk] = useState<number>(75);
  const [simHorizon, setSimHorizon] = useState<number>(7);

  // Dynamic Fit Score Calculation
  const calculatedFitScore = Math.min(99, Math.max(50, Math.round(simRisk * 0.4 + (100 - simAge) * 0.3 + (simHorizon * 3))));

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Dynamic Ambient Background Spotlights */}
      <div className="bg-glow-container">
        <div className="bg-glow-spot-1"></div>
        <div className="bg-glow-spot-2"></div>
        <div className="bg-glow-spot-3"></div>
      </div>

      {/* Top Live Ticker Bar */}
      <div className="relative z-50 bg-[#0A0F1D]/90 border-b border-white/10 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between overflow-x-auto gap-6 scrollbar-none">
          <div className="flex items-center gap-6 shrink-0">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              LIVE MARKET PULSE
            </span>
            <span className="flex items-center gap-1">
              <span className="text-slate-400">NIFTY 50</span>
              <span className="font-semibold text-emerald-400">24,850.20 (+0.58%)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="text-slate-400">SENSEX</span>
              <span className="font-semibold text-emerald-400">81,450.60 (+0.52%)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="text-slate-400">India VIX</span>
              <span className="font-semibold text-cyan-400">14.25 (Normal Volatility)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="text-slate-400">10Y Bond Yield</span>
              <span className="font-semibold text-slate-200">7.08%</span>
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-indigo-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Market Regime: <strong className="text-emerald-400">Bullish Expansion</strong> (88.5% Confidence)</span>
          </div>
        </div>
      </div>

      {/* Sticky Header Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#060913]/85 border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onExploreApp}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-cyan-400 to-emerald-400 p-[2px] shadow-lg shadow-indigo-500/25">
              <div className="w-full h-full bg-[#060913] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                  FUND FIT <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">AI</span>
                </span>
                <span className="badge-pill badge-cyan text-[10px]">Enterprise 4.0</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#simulator" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <span>AI Simulator</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            </a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-all"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Search Funds...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded font-mono">⌘K</kbd>
            </button>

            <button onClick={onLoginClick} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all">
              Sign In
            </button>

            <button onClick={onExploreApp} className="btn-emerald text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-2">
              <span>Launch Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-16 pb-20 px-4 lg:px-8 max-w-[1400px] mx-auto text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-emerald-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-8 shadow-lg shadow-cyan-500/10">
          <BrainCircuit className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Next-Generation Mutual Fund Intelligence & Monte Carlo Engine</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Main Headline with GSAP SplitText Animation */}
        <SplitText
          text="Precision Investment Decisions Powered by Explainable AI"
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1] mb-6 text-slate-100 block"
          delay={40}
          duration={0.7}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          tag="h1"
          onLetterAnimationComplete={() => {
            console.log('SplitText hero animation complete!');
          }}
        />

        <p className="text-slate-400 text-base sm:text-xl max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
          Unify investor behavior profiling, 10,000-path Monte Carlo goal forecasting, 
          downside risk VaR analytics, and 0–100 Fund Fit Scoring into an enterprise-grade wealth platform.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={onExploreApp} 
            className="w-full sm:w-auto btn-emerald text-sm font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 text-white shadow-xl shadow-emerald-500/25"
          >
            <span>Explore AI Wealth Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <SpecularButton 
            onClick={() => setIsDemoModalOpen(true)} 
            size="lg"
            radius={14}
            tint="#6366f1"
            tintOpacity={0.15}
            blur={8}
            textColor="#ffffff"
            lineColor="#06b6d4"
            baseColor="#3b82f6"
            intensity={1.2}
            shineSize={12}
            shineFade={45}
            thickness={1.5}
            speed={0.4}
            followMouse
            proximity={300}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Request Institutional Demo</span>
          </SpecularButton>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
          <div className="glass-panel p-4 flex items-center gap-3 border-emerald-500/20">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">3NF PostgreSQL</div>
              <div className="text-xs text-slate-400">29 Relational Tables</div>
            </div>
          </div>

          <div className="glass-panel p-4 flex items-center gap-3 border-cyan-500/20">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">10k Monte Carlo</div>
              <div className="text-xs text-slate-400">Stochastic Simulations</div>
            </div>
          </div>

          <div className="glass-panel p-4 flex items-center gap-3 border-indigo-500/20">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Explainable AI</div>
              <div className="text-xs text-slate-400">SHAP Feature Explanations</div>
            </div>
          </div>

          <div className="glass-panel p-4 flex items-center gap-3 border-purple-500/20">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">OpenAPI 3.1</div>
              <div className="text-xs text-slate-400">REST & WebSockets</div>
            </div>
          </div>
        </div>

      </section>

      {/* INTERACTIVE AI SIMULATOR SECTION */}
      <section id="simulator" className="relative z-10 py-16 px-4 lg:px-8 max-w-[1400px] mx-auto">
        <div className="glass-panel p-6 sm:p-10 border-indigo-500/30 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Controls */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Live Engine Demo</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Experience Real-Time <span className="text-cyan-400">Fund Fit Scoring</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Adjust investor profile parameters below to see how our multi-factor engine dynamically evaluates 
                risk capacity, loss aversion, and market regime alignment.
              </p>

              {/* Sliders */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Investor Age</span>
                    <span className="text-cyan-400">{simAge} Years</span>
                  </div>
                  <input 
                    type="range" min="18" max="75" value={simAge} 
                    onChange={(e) => setSimAge(Number(e.target.value))} 
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Monthly Income</span>
                    <span className="text-emerald-400">₹{simIncome.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" min="30000" max="1000000" step="10000" value={simIncome} 
                    onChange={(e) => setSimIncome(Number(e.target.value))} 
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Risk Preference Score</span>
                    <span className="text-indigo-400">{simRisk} / 100</span>
                  </div>
                  <input 
                    type="range" min="10" max="95" value={simRisk} 
                    onChange={(e) => setSimRisk(Number(e.target.value))} 
                    className="w-full accent-indigo-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Investment Horizon</span>
                    <span className="text-purple-400">{simHorizon} Years</span>
                  </div>
                  <input 
                    type="range" min="1" max="25" value={simHorizon} 
                    onChange={(e) => setSimHorizon(Number(e.target.value))} 
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right Interactive Result Dial */}
            <div className="w-full lg:w-1/2 glass-panel p-6 sm:p-8 border-cyan-500/20 text-center bg-[#090D18]/90">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Calculated Fund Fit Score</div>
              
              <div className="relative w-44 h-44 mx-auto my-4 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="transparent" />
                  <circle 
                    cx="50" cy="50" r="40" 
                    stroke="url(#gradient-dial)" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray={251.2} 
                    strokeDashoffset={251.2 - (251.2 * calculatedFitScore) / 100} 
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="gradient-dial" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="50%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-white tracking-tight">{calculatedFitScore}</span>
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-widest mt-1">
                    {calculatedFitScore >= 85 ? 'Perfect Match' : calculatedFitScore >= 70 ? 'Strong Fit' : 'Moderate Fit'}
                  </span>
                </div>
              </div>

              {/* Sub-Dimension Breakdown */}
              <div className="grid grid-cols-2 gap-3 text-left pt-2">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[11px] text-slate-400">Risk Match</div>
                  <div className="text-sm font-bold text-cyan-400">{Math.round(simRisk * 0.95)} / 100</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[11px] text-slate-400">Goal Alignment</div>
                  <div className="text-sm font-bold text-emerald-400">{Math.min(98, simHorizon * 12)}%</div>
                </div>
              </div>

              <button onClick={onExploreApp} className="w-full mt-6 btn-indigo py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                <span>View Full AI Intelligence Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* PRODUCT FEATURES GRID */}
      <section id="features" className="relative z-10 py-16 px-4 lg:px-8 max-w-[1400px] mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Complete Suite of <span className="text-emerald-400">Wealth Intelligence</span> Engines
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Designed for institutional wealth managers, financial advisors, and individual investors seeking algorithmic precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          
          {/* Card 1 */}
          <div className="glass-panel-interactive p-6 border-indigo-500/20">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-5 border border-indigo-500/20">
              <BrainCircuit className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Behavioral Bias Analyzer</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Quantifies 9 psychological bias metrics including Loss Aversion, Overconfidence, Anchoring, and Recency to protect against emotional investing.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel-interactive p-6 border-cyan-500/20">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5 border border-cyan-500/20">
              <Activity className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">10,000-Path Monte Carlo</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Simulates stochastic Geometric Brownian Motion paths to predict goal completion probability, required monthly SIPs, and target dates.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel-interactive p-6 border-emerald-500/20">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 border border-emerald-500/20">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">0–100 Fund Fit Score</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Multi-dimensional evaluation across Risk, Goal, Liquidity, Market Regime, Alpha, Sharpe Ratio, and Sector Concentration metrics.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel-interactive p-6 border-purple-500/20">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5 border border-purple-500/20">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">SHAP Explainable AI (XAI)</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Transparent, audit-ready narrative explanations detailing Why every recommendation (BUY, SWITCH, REBALANCE) was generated.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-panel-interactive p-6 border-amber-500/20">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-5 border border-amber-500/20">
              <TrendingUp className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Macro Market Regime Engine</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Detects Bull, Bear, Recovery, Correction, and Sideways regimes using India VIX, 10Y Bond Yields, and inflation indicators.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-panel-interactive p-6 border-rose-500/20">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-5 border border-rose-500/20">
              <ShieldCheck className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Downside Risk & VaR 95%</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Computes 95% Value-at-Risk (VaR) and Conditional VaR (Expected Shortfall) to ensure capital preservation during market crashes.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="relative z-10 border-t border-white/10 bg-[#04060E] py-12 px-4 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              FUND FIT <span className="text-cyan-400">AI</span>
            </span>
          </div>

          <div className="text-xs text-slate-500">
            © 2026 FUND FIT AI Inc. Enterprise Mutual Fund Intelligence Platform. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-white transition-colors">Security Audit</a>
          </div>
        </div>
      </footer>

      {/* REQUEST DEMO MODAL */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 max-w-md w-full border-cyan-500/30 relative">
            <button 
              onClick={() => setIsDemoModalOpen(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-2">Request Enterprise Demo</h3>
            <p className="text-slate-400 text-xs mb-6">
              Schedule a personalized walkthrough of the FUND FIT AI engine with our solutions architects.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setIsDemoModalOpen(false); alert("Demo request submitted!"); }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
                <input type="email" required placeholder="name@firm.com" className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Organization / Firm</label>
                <input type="text" required placeholder="Wealth Advisory Firm" className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400" />
              </div>
              <button type="submit" className="w-full btn-emerald py-3 rounded-xl text-xs font-bold">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
