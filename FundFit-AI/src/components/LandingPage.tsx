import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  PieChart, 
  BrainCircuit, 
  CheckCircle2, 
  Calendar,
  Search,
  Moon,
  Sun,
  X
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
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', organization: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('https://script.google.com/macros/s/AKfycbzHHEUEDKQC6T0CNwrgSRt70Fqq9IvlTh3HcdE0xZCpqV4JN5lqM7VV_dYgvf-Q8636/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          timestamp: new Date().toISOString()
        })
      });
      setDemoSubmitted(true);
    } catch (error) {
      console.error("Failed to submit demo request to Google Apps Script:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-white flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-emerald-600/08 rounded-full blur-[160px]"></div>
      </div>

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090D16]/85 border-b border-white/10 px-4 lg:px-8 py-3.5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onExploreApp}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-400 p-[2px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                  FUND FIT <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">AI</span>
                </span>
                <span className="badge badge-indigo text-[10px]">Enterprise v4.0</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#products" className="hover:text-white transition-colors">Product Modules</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#resources" className="hover:text-white transition-colors">Resources</a>
            <a href="#advisor" className="hover:text-white transition-colors">Advisor Portal</a>
            <a href="#admin" className="hover:text-white transition-colors">Admin Portal</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Command Palette Trigger */}
            <button 
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-400 transition-all"
            >
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              <span>Search Funds...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded font-mono">⌘K</kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Login & Demo */}
            <button onClick={onLoginClick} className="btn-secondary text-xs font-semibold">
              Sign In
            </button>

            <button onClick={onExploreApp} className="btn-primary text-xs font-bold">
              <span>Launch Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-16 pb-20 px-4 lg:px-8 max-w-[1400px] mx-auto text-center space-y-8">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-bold shadow-lg shadow-indigo-500/10">
          <BrainCircuit className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Next-Generation Institutional Wealth Intelligence</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
          AI-Powered Personalized <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400">
            Mutual Fund Intelligence
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Helping investors, financial advisors, and wealth managers make smarter mutual fund decisions using Artificial Intelligence, Adaptive Benchmarking, Market Regime Detection, and Personalized Analytics.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button 
            onClick={onExploreApp}
            className="btn-primary text-base px-8 py-3.5 rounded-xl shadow-xl shadow-indigo-600/30"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span>Start Free Trial</span>
          </button>

          <button 
            onClick={() => setIsDemoModalOpen(true)}
            className="btn-secondary text-base px-6 py-3.5 rounded-xl"
          >
            <Calendar className="w-5 h-5 text-indigo-400" />
            <span>Book Live Demo</span>
          </button>
        </div>

        {/* Hero Interactive Floating Card Preview */}
        <div className="pt-8 relative max-w-5xl mx-auto">
          <div className="glass-card p-6 sm:p-8 border-indigo-500/30 bg-gradient-to-b from-[#111726]/90 to-[#0D121F]/90 shadow-2xl relative z-10 text-left space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-mono text-slate-400 ml-2">fundfit.ai/dashboard/live-portfolio</span>
              </div>
              <span className="badge badge-emerald text-xs font-bold">
                Live Portfolio Sync • 18.4% XIRR
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase">Total Portfolio Value</span>
                <div className="text-2xl font-extrabold text-white">₹24,85,453</div>
                <span className="text-xs font-semibold text-emerald-400">+₹14,200 (+0.59% Today)</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase">Fund Fit Score</span>
                <div className="text-2xl font-extrabold text-indigo-400">92 / 100</div>
                <span className="text-xs font-semibold text-slate-300">Optimal Asset Allocation</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase">Market Regime</span>
                <div className="text-2xl font-extrabold text-emerald-400">Bullish Expansion</div>
                <span className="text-xs font-semibold text-slate-300">NIFTY 50 @ 24,180.50</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* STATS BANNER */}
      <section className="border-y border-white/10 bg-[#0D121F]/80 py-10 px-4">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div className="space-y-1">
            <div className="text-3xl lg:text-4xl font-extrabold text-white">100K+</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Investors</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl lg:text-4xl font-extrabold text-indigo-400">25K+</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mutual Funds Tracked</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl lg:text-4xl font-extrabold text-emerald-400">99.8%</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prediction Accuracy</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl lg:text-4xl font-extrabold text-purple-400">₹5000Cr+</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assets Analyzed</div>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-4 lg:px-8 max-w-[1400px] mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="badge badge-indigo">Institutional Capabilities</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
            Powered by Explainable AI & Adaptive Benchmarking
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Everything you need to audit, optimize, and grow mutual fund wealth with institutional precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-card p-6 border-indigo-500/20 space-y-3 hover:border-indigo-500/40 transition-all">
            <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400 w-fit">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Explainable AI Recommendations</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transparent Buy, Hold, Switch, and Exit signals backed by verifiable risk-reward and sector weight factors.
            </p>
          </div>

          <div className="glass-card p-6 border-emerald-500/20 space-y-3 hover:border-emerald-500/40 transition-all">
            <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400 w-fit">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Market Regime Detection</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Real-time volatility and macroeconomic cycle indicators guiding tactical asset rebalancing.
            </p>
          </div>

          <div className="glass-card p-6 border-violet-500/20 space-y-3 hover:border-violet-500/40 transition-all">
            <div className="p-3 rounded-xl bg-violet-600/20 text-violet-400 w-fit">
              <PieChart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Personalized Goal Alignment</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dynamic SIP projection engine calculating exact corpus probability for Retirement, Dream Home, and Education.
            </p>
          </div>

        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 px-4 lg:px-8 max-w-[1400px] mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="badge badge-emerald">Flexible Pricing</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
            Designed for Individual Investors & Enterprise Advisors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Free Tier */}
          <div className="glass-card p-8 space-y-6 border-white/10 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="badge badge-indigo">Starter</span>
              <h3 className="text-2xl font-bold text-white">Free Forever</h3>
              <div className="text-3xl font-extrabold text-white">₹0 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Up to 5 Mutual Fund Holdings</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Basic Fund Fit Score</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Standard Market Intelligence</li>
              </ul>
            </div>
            <button onClick={onExploreApp} className="btn-secondary text-xs w-full justify-center">Get Started Free</button>
          </div>

          {/* Pro Tier */}
          <div className="glass-card p-8 space-y-6 border-indigo-500/50 bg-gradient-to-b from-indigo-950/30 to-[#111726] flex flex-col justify-between relative">
            <div className="absolute -top-3 right-6 badge badge-emerald text-[10px]">Most Popular</div>
            <div className="space-y-4">
              <span className="badge badge-emerald">Professional</span>
              <h3 className="text-2xl font-bold text-white">Pro Wealth</h3>
              <div className="text-3xl font-extrabold text-white">₹999 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Fund & Portfolio Tracking</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full Explainable AI Recommendations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Goal Probability & Tax Harvesting Reports</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24/7 AI Copilot Assistant</li>
              </ul>
            </div>
            <button onClick={onExploreApp} className="btn-primary text-xs w-full justify-center">Start 14-Day Free Trial</button>
          </div>

          {/* Enterprise Tier */}
          <div className="glass-card p-8 space-y-6 border-purple-500/30 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="badge badge-violet">Institutional</span>
              <h3 className="text-2xl font-bold text-white">Enterprise / RIAs</h3>
              <div className="text-3xl font-extrabold text-white">Custom <span className="text-xs text-slate-400 font-normal">billing</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full Advisor & Admin Portal Access</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> White-label Client Portal & PDF Memos</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> API Access & CAMS/KFintech Integration</li>
              </ul>
            </div>
            <button onClick={() => setIsDemoModalOpen(true)} className="btn-secondary text-xs w-full justify-center">Contact Sales</button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#060911] py-12 px-4 lg:px-8 text-xs text-slate-400">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <span className="font-extrabold text-lg text-white">FUND FIT AI</span>
            <p className="text-xs text-slate-400">
              Autonomous AI platform for Mutual Fund Intelligence, Adaptive Benchmarking, and Portfolio Optimization.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Platform</h4>
            <ul className="space-y-1.5">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#advisor" className="hover:text-white">Advisor Portal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Resources</h4>
            <ul className="space-y-1.5">
              <li><a href="#docs" className="hover:text-white">API Documentation</a></li>
              <li><a href="#research" className="hover:text-white">Research Papers</a></li>
              <li><a href="#help" className="hover:text-white">Security & Compliance</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Legal Disclaimer</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.
            </p>
          </div>
        </div>
      </footer>

      {/* MODAL: Book Demo */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="glass-card max-w-md w-full p-6 space-y-4 border-indigo-500/40 bg-[#111726]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Schedule Enterprise Demo</h3>
              <button onClick={() => setIsDemoModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {demoSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Demo Request Received!</h4>
                <p className="text-xs text-slate-300">Our enterprise solution architect will contact you within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitDemo} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Aria Vance" 
                    className="input-field text-xs bg-slate-950/40 text-white" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Work Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="aria@techcorp.in" 
                    className="input-field text-xs bg-slate-950/40 text-white" 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">AUM / Organization</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="₹25 Crore+ AUM" 
                    className="input-field text-xs bg-slate-950/40 text-white" 
                    value={formData.organization}
                    onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                    disabled={isSubmitting}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-primary w-full text-xs justify-center pt-2 flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></span>
                      <span>Booking...</span>
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
