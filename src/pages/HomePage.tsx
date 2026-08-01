import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  BrainCircuit, 
  ShieldCheck, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  CheckCircle2, 
  ChevronRight,
  Activity,
  LayoutDashboard,
  SlidersHorizontal,
  DollarSign,
  PieChart,
  LineChart,
  ArrowUpRight,
  Lock,
  Play,
  Award,
  Users,
  Building2,
  HelpCircle,
  ChevronDown,
  Layers,
  Search,
  Filter,
  Check,
  XCircle,
  FileText
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Interactive Product Showcase Active Tab State
  const [showcaseTab, setShowcaseTab] = useState<'dashboard' | 'portfolio' | 'funds' | 'market' | 'ai' | 'reports'>('dashboard');

  // Live AI Demo Calculator State
  const [calcAge, setCalcAge] = useState<number>(32);
  const [calcIncome, setCalcIncome] = useState<number>(150000);
  const [calcRisk, setCalcRisk] = useState<number>(75);
  const [calcHorizon, setCalcHorizon] = useState<number>(10);
  const [calcGoal, setCalcGoal] = useState<string>('Wealth Accumulation');

  // Calculations
  const calculatedScore = Math.min(99, Math.max(50, Math.round(calcRisk * 0.35 + (100 - calcAge) * 0.3 + (calcHorizon * 3.5))));
  const expectedReturn = (7.5 + (calcRisk * 0.08)).toFixed(1);
  const riskLevel = calcRisk > 80 ? 'High Growth Risk' : calcRisk > 50 ? 'Moderate Growth' : 'Conservative Capital';

  // FAQ State
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const featuresList = [
    { title: 'AI Investor Profiling', desc: 'Behavioral questionnaires and loss-aversion metrics to map risk capacity.' },
    { title: 'Portfolio Analytics', desc: 'Real-time asset allocation breakdown, factor exposures, and performance attribution.' },
    { title: 'Risk Assessment', desc: 'Downside VaR, Sharpe ratio, and drawdown stress testing under market shocks.' },
    { title: 'Adaptive Benchmarking', desc: 'Dynamic benchmark comparison against custom multi-index models.' },
    { title: 'Goal Planner', desc: 'Stochastic path forecasts ensuring target capital goals are achieved.' },
    { title: 'Fund Comparison', desc: 'Side-by-side underlying equity holding overlap and expense ratio analysis.' },
    { title: 'Market Intelligence', desc: 'Real-time regime classification, volatility index tracking, and macro signals.' },
    { title: 'Explainable AI', desc: 'Transparent factor rationale behind every fund fit recommendation.' },
    { title: 'Behavior Analysis', desc: 'Tracking emotional trade tendencies to prevent panic selling in corrections.' },
    { title: 'Portfolio Health', desc: 'Continuous health score monitoring across diversification and liquidity.' },
    { title: 'Smart Alerts', desc: 'Instant notifications when asset allocation drifts beyond target bands.' },
    { title: 'Institutional Reports', desc: 'Automated white-label PDF generation for advisor-client reviews.' },
  ];

  const comparisons = [
    {
      aspect: 'Analysis Approach',
      traditional: 'Static historical return rankings & star ratings.',
      ai: 'Dynamic risk-adjusted factor decomposition & adaptive modeling.'
    },
    {
      aspect: 'Personalization',
      traditional: 'Generic one-size-fits-all asset allocation models.',
      ai: 'Hyper-personalized investor profiling & behavioral scoring.'
    },
    {
      aspect: 'Risk Management',
      traditional: 'Simple standard deviation calculation.',
      ai: 'Downside VaR, 10k Monte Carlo paths, & regime detection.'
    },
    {
      aspect: 'Holding Overlap',
      traditional: 'Manual inspection of top 10 stocks across funds.',
      ai: 'Automated deep 100% stock-level overlap detection.'
    }
  ];

  const steps = [
    { step: '01', title: 'Create Investor Profile', desc: 'Complete behavioral risk profile & goal timeline.' },
    { step: '02', title: 'Import Portfolio', desc: 'Upload statement or connect CAS for instant holdings sync.' },
    { step: '03', title: 'Analyze Market', desc: 'Engine evaluates overlap, factor risk, and regime status.' },
    { step: '04', title: 'Receive AI Recommendations', desc: 'Get 0–100 Fund Fit Scores with full mathematical proof.' },
    { step: '05', title: 'Monitor Portfolio', desc: 'Continuous health alerts and tax-efficient rebalancing.' }
  ];

  return (
    <div className="space-y-24 pb-20 bg-[#020817] text-slate-100 font-sans">
      
      {/* 1. HERO SECTION (SPLIT LAYOUT) */}
      <section className="relative z-10 pt-12 lg:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0F172A] border border-[#1E293B] text-xs font-semibold text-[#2563EB]">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <span>Enterprise Mutual Fund Intelligence Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Personalized Mutual Fund Intelligence for Smarter Investment Decisions
            </h1>

            {/* Subtitle */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              FundFit AI combines investor profiling, adaptive benchmarking, AI-powered portfolio analytics, market regime detection, and explainable recommendations to help investors make better financial decisions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/signup"
                className="px-5 py-3 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/20"
              >
                Start Free
              </Link>

              <Link
                to="/contact"
                className="px-5 py-3 rounded-lg bg-[#0F766E] hover:bg-teal-700 text-white font-semibold text-xs transition-all shadow-md shadow-teal-700/20"
              >
                Book Live Demo
              </Link>

              <button
                onClick={() => alert('Launching Product Tour Video...')}
                className="px-5 py-3 rounded-lg bg-[#0F172A] border border-[#1E293B] hover:bg-slate-800 text-slate-200 font-semibold text-xs transition-all flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Watch Product Tour</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#1E293B] text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>Trusted by Advisors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>AI Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>SEBI Compliance Ready</span>
              </div>
            </div>

          </div>

          {/* Right Side: Interactive Dashboard Preview (5 cols) */}
          <div className="lg:col-span-5">
            <div className="fin-card p-5 space-y-4 relative overflow-hidden border border-[#2563EB]/40">
              
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse"></span>
                  <span className="font-mono text-white font-semibold">Live Portfolio Health</span>
                </div>
                <span className="text-[11px] font-mono text-[#0F766E] font-bold">Regime: Bull Expansion</span>
              </div>

              {/* Grid Mini Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[#020817] border border-[#1E293B]">
                  <div className="text-[11px] text-slate-400">Fund Fit Score</div>
                  <div className="text-2xl font-black text-[#2563EB] font-mono">96.8 <span className="text-xs text-slate-500 font-normal">/ 100</span></div>
                  <div className="text-[10px] text-[#16A34A] font-medium">Optimal Match</div>
                </div>

                <div className="p-3 rounded-lg bg-[#020817] border border-[#1E293B]">
                  <div className="text-[11px] text-slate-400">Portfolio Health</div>
                  <div className="text-2xl font-black text-[#16A34A] font-mono">94%</div>
                  <div className="text-[10px] text-slate-400">Low Stock Overlap</div>
                </div>
              </div>

              {/* Goal Progress Bar */}
              <div className="p-3 rounded-lg bg-[#020817] border border-[#1E293B] space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Goal Progress (Retirement 2035)</span>
                  <span className="text-[#2563EB] font-mono">₹1.85 Cr / ₹2.50 Cr</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#0F766E] w-[74%] rounded-full" />
                </div>
              </div>

              {/* Risk Meter & AI Recommendations */}
              <div className="p-3 rounded-lg bg-[#020817] border border-[#1E293B] space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Downside VaR (99% Confidence)</span>
                  <span className="text-[#16A34A] font-bold">-3.2% (Protected)</span>
                </div>
                <div className="p-2.5 rounded bg-[#0F172A] border border-[#1E293B] text-[11px] text-slate-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
                  <span><strong>AI Rec:</strong> Rebalance ₹50,000 from Large Cap to Mid Cap Growth to optimize Sharpe ratio from 1.8 to 2.2.</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. SOCIAL PROOF (AMC & BANK LOGOS) */}
      <section className="border-y border-[#1E293B] py-8 bg-[#0F172A]/40">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Trusted by Leading AMCs, Financial Institutions & Wealth Advisory Networks
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center font-bold text-slate-300 text-sm">
            <span>HDFC Mutual Fund</span>
            <span>ICICI Prudential AMC</span>
            <span>SBI Mutual Fund</span>
            <span>Nippon India AMC</span>
            <span>Kotak Mahindra AMC</span>
          </div>
        </div>
      </section>

      {/* 3. KEY METRICS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div className="fin-card p-5 space-y-1">
            <div className="text-3xl font-black text-[#2563EB]">100K+</div>
            <div className="text-xs text-slate-400">Active Investors</div>
          </div>
          <div className="fin-card p-5 space-y-1">
            <div className="text-3xl font-black text-[#0F766E]">₹5000 Cr+</div>
            <div className="text-xs text-slate-400">Assets Analysed</div>
          </div>
          <div className="fin-card p-5 space-y-1">
            <div className="text-3xl font-black text-[#7C3AED]">25,000+</div>
            <div className="text-xs text-slate-400">Funds Evaluated</div>
          </div>
          <div className="fin-card p-5 space-y-1">
            <div className="text-3xl font-black text-[#16A34A]">98%</div>
            <div className="text-xs text-slate-400">Recommendation Accuracy</div>
          </div>
          <div className="fin-card p-5 space-y-1">
            <div className="text-3xl font-black text-[#2563EB]">99.9%</div>
            <div className="text-xs text-slate-400">Platform Availability</div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Comprehensive Capabilities</div>
          <h2 className="text-3xl font-extrabold text-white">Enterprise Mutual Fund Analytics Engine</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuresList.map((feat, idx) => (
            <div key={idx} className="fin-card fin-card-hover p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] font-bold text-xs">
                0{idx + 1}
              </div>
              <h3 className="text-sm font-bold text-white">{feat.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE PRODUCT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">Interactive Product Module Showcase</div>
          <h2 className="text-3xl font-extrabold text-white">Preview Enterprise Workspace Modules</h2>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(['dashboard', 'portfolio', 'funds', 'market', 'ai', 'reports'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setShowcaseTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                showcaseTab === tab ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/20' : 'bg-[#0F172A] border border-[#1E293B] text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Preview Box */}
        <div className="fin-card p-8 border-2 border-[#2563EB]/30 space-y-6">
          {showcaseTab === 'dashboard' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-[#2563EB]" />
                <span>Institutional Portfolio Dashboard</span>
              </h3>
              <p className="text-xs text-slate-400">Consolidated overview displaying net asset value, portfolio health score, VaR downside risk, and active market regimes.</p>
              <div className="p-4 rounded-lg bg-[#020817] border border-[#1E293B] font-mono text-xs text-emerald-400">
                ● Live Data Stream :: Total NAV ₹5,48,20,000 (+18.4% CAGR)
              </div>
            </div>
          )}

          {showcaseTab === 'portfolio' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#0F766E]" />
                <span>Deep Portfolio Holdings & Stock Overlap</span>
              </h3>
              <p className="text-xs text-slate-400">Deep stock-level analysis revealing unintentional single-stock concentration across multiple mutual fund schemes.</p>
              <div className="p-4 rounded-lg bg-[#020817] border border-[#1E293B] text-xs text-slate-300">
                Single Stock Concentration: Reliance Industries (12.4%), HDFC Bank (9.8%), Infosys (7.2%).
              </div>
            </div>
          )}

          {showcaseTab === 'funds' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#7C3AED]" />
                <span>25,000+ Fund Evaluation Matrix</span>
              </h3>
              <p className="text-xs text-slate-400">Side-by-side fund comparison matrix evaluating Sharpe Ratio, Alpha, Beta, Sortino, and Expense Ratio.</p>
            </div>
          )}

          {showcaseTab === 'market' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#16A34A]" />
                <span>Market Regime Intelligence</span>
              </h3>
              <p className="text-xs text-slate-400">AI-based regime detection identifying Bull Expansion, Stagflation, High Volatility, or Rate Hikes.</p>
            </div>
          )}

          {showcaseTab === 'ai' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-[#2563EB]" />
                <span>Explainable AI Factor Recommendations</span>
              </h3>
              <p className="text-xs text-slate-400">Transparent factor attribution explaining exact mathematical rationale behind rebalancing suggestions.</p>
            </div>
          )}

          {showcaseTab === 'reports' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#D97706]" />
                <span>White-Label Institutional Reporting</span>
              </h3>
              <p className="text-xs text-slate-400">Generate executive PDF portfolio audit reports formatted for wealth management client meetings.</p>
            </div>
          )}
        </div>
      </section>

      {/* 6. WHY FUNDFIT AI (COMPARISON) */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Comparative Advantage</div>
          <h2 className="text-3xl font-extrabold text-white">Traditional Analysis vs. FundFit AI</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {comparisons.map((comp, idx) => (
            <div key={idx} className="fin-card p-6 space-y-4">
              <div className="text-sm font-bold text-white border-b border-[#1E293B] pb-2">{comp.aspect}</div>
              
              <div className="space-y-1 text-xs">
                <div className="text-[#DC2626] font-semibold flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Traditional
                </div>
                <p className="text-slate-400">{comp.traditional}</p>
              </div>

              <div className="space-y-1 text-xs pt-2 border-t border-[#1E293B]">
                <div className="text-[#16A34A] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> FundFit AI
                </div>
                <p className="text-slate-200 font-medium">{comp.ai}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">Systematic Workflow</div>
          <h2 className="text-3xl font-extrabold text-white">How FundFit AI Operates</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((st) => (
            <div key={st.step} className="fin-card p-5 space-y-2 relative">
              <div className="text-2xl font-black text-[#2563EB] font-mono">{st.step}</div>
              <h3 className="text-sm font-bold text-white">{st.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. LIVE AI DEMO (FUND FIT CALCULATOR) */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="fin-card p-8 sm:p-12 space-y-8 border-2 border-[#2563EB]/40">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Live AI Sandbox</div>
            <h2 className="text-3xl font-extrabold text-white">Interactive Fund Fit Calculator</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Investor Age ({calcAge} Yrs)</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="70"
                  value={calcAge}
                  onChange={(e) => setCalcAge(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Risk Tolerance Score ({calcRisk}%)</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={calcRisk}
                  onChange={(e) => setCalcRisk(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0F766E]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Investment Horizon ({calcHorizon} Years)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={calcHorizon}
                  onChange={(e) => setCalcHorizon(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#7C3AED]"
                />
              </div>
            </div>

            {/* Output Display (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-[#020817] border border-[#1E293B] space-y-4 text-center">
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase">Calculated Fund Fit Score</div>
                <div className="text-5xl font-black text-[#2563EB] font-mono">{calculatedScore} <span className="text-xs text-slate-500 font-normal">/ 100</span></div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-[#0F172A]">
                  <div className="text-slate-400">Expected CAGR</div>
                  <div className="font-bold text-[#16A34A]">{expectedReturn}%</div>
                </div>
                <div className="p-2 rounded bg-[#0F172A]">
                  <div className="text-slate-400">Risk Profile</div>
                  <div className="font-bold text-[#2563EB]">{riskLevel}</div>
                </div>
              </div>

              <div className="p-3 rounded bg-[#0F172A] text-left text-xs text-slate-300 space-y-1">
                <span className="text-[#16A34A] font-bold">AI Rationale:</span> High alignment with multi-cap equity schemes with Sharpe ratios exceeding 2.1.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. MARKET INTELLIGENCE LIVE SECTION */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">Live Macro Feeds</div>
          <h2 className="text-3xl font-extrabold text-white">Market Intelligence & Benchmark Pulse</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs font-mono">
          <div className="fin-card p-4 space-y-1">
            <div className="text-slate-400">NIFTY 50</div>
            <div className="text-lg font-bold text-white">24,850.20</div>
            <div className="text-[#16A34A] font-semibold">+0.58%</div>
          </div>
          <div className="fin-card p-4 space-y-1">
            <div className="text-slate-400">SENSEX</div>
            <div className="text-lg font-bold text-white">81,450.60</div>
            <div className="text-[#16A34A] font-semibold">+0.52%</div>
          </div>
          <div className="fin-card p-4 space-y-1">
            <div className="text-slate-400">India VIX</div>
            <div className="text-lg font-bold text-white">14.25</div>
            <div className="text-[#2563EB] font-semibold">Normal Volatility</div>
          </div>
          <div className="fin-card p-4 space-y-1">
            <div className="text-slate-400">10Y Yield</div>
            <div className="text-lg font-bold text-white">7.08%</div>
            <div className="text-slate-300 font-semibold">Stable</div>
          </div>
          <div className="fin-card p-4 save-y-1">
            <div className="text-slate-400">CPI Inflation</div>
            <div className="text-lg font-bold text-white">4.80%</div>
            <div className="text-[#16A34A] font-semibold">Target Zone</div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Client Testimonials</div>
          <h2 className="text-3xl font-extrabold text-white">Proven Results for Advisors & Investors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="fin-card p-6 space-y-4">
            <p className="text-xs text-slate-300 italic">"FundFit AI reduced our client onboarding portfolio audit time from 4 hours to 3 minutes. The stock overlap detector alone saved our clients lakhs in redundant risk."</p>
            <div className="text-xs font-bold text-white">Rajesh Verma, Managing Director</div>
            <div className="text-[11px] text-[#2563EB]">Capital Wealth Advisors RIA</div>
          </div>
          <div className="fin-card p-6 space-y-4">
            <p className="text-xs text-slate-300 italic">"The explainable AI recommendation breakdown gives our compliance committee complete audit confidence. It's the Bloomberg of mutual fund intelligence."</p>
            <div className="text-xs font-bold text-white">Priya Sundaram, Chief Investment Officer</div>
            <div className="text-[11px] text-[#0F766E]">Apex Family Office</div>
          </div>
          <div className="fin-card p-6 space-y-4">
            <p className="text-xs text-slate-300 italic">"As an individual investor, having 10,000 Monte Carlo path forecasting for my children's education goal gives me total peace of mind."</p>
            <div className="text-xs font-bold text-white">Anand Mehta</div>
            <div className="text-[11px] text-[#16A34A]">Retail Investor</div>
          </div>
        </div>
      </section>

      {/* 11. PRICING PLANS */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Transparent Pricing</div>
          <h2 className="text-3xl font-extrabold text-white">Enterprise Plans Tailored to Your Scale</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="fin-card p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Free Plan</h3>
              <div className="text-4xl font-black text-white">₹0</div>
              <p className="text-xs text-slate-400">For retail investors tracking single portfolios.</p>
              <ul className="space-y-2 text-xs text-slate-300 pt-4 border-t border-[#1E293B]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> 1 Active Portfolio</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Basic Fit Score Rating</li>
              </ul>
            </div>
            <Link to="/signup" className="w-full py-2.5 text-center rounded-lg bg-[#0F172A] border border-[#1E293B] text-xs font-bold text-white">Start Free</Link>
          </div>

          <div className="fin-card p-8 space-y-6 flex flex-col justify-between border-2 border-[#2563EB] relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#2563EB] text-white font-bold text-[10px]">RECOMMENDED</span>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Professional</h3>
              <div className="text-4xl font-black text-white">₹2,999 <span className="text-xs text-slate-400 font-normal">/ mo</span></div>
              <p className="text-xs text-slate-400">For independent advisors & wealth planners.</p>
              <ul className="space-y-2 text-xs text-slate-300 pt-4 border-t border-[#1E293B]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Unlimited Client Portfolios</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> 10,000 Monte Carlo Paths</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Branded Client PDF Reports</li>
              </ul>
            </div>
            <Link to="/signup" className="w-full py-2.5 text-center rounded-lg bg-[#2563EB] text-xs font-bold text-white shadow-md shadow-blue-600/20">Upgrade to Pro</Link>
          </div>

          <div className="fin-card p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Enterprise</h3>
              <div className="text-4xl font-black text-white">Custom</div>
              <p className="text-xs text-slate-400">For banks, AMCs, and large RIA networks.</p>
              <ul className="space-y-2 text-xs text-slate-300 pt-4 border-t border-[#1E293B]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Isolated Database Instance</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Dedicated Quant Strategist</li>
              </ul>
            </div>
            <Link to="/contact" className="w-full py-2.5 text-center rounded-lg bg-[#0F766E] text-xs font-bold text-white">Contact Enterprise</Link>
          </div>
        </div>
      </section>

      {/* 12. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Knowledge Base</div>
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {[
            { q: 'How does the Fund Fit Score calculation work?', a: 'The Fund Fit Score uses investor profiling, downside VaR risk metrics, Sharpe ratio, and underlying stock overlap analysis to generate a transparent 0-100 score.' },
            { q: 'Is FundFit AI compliant with SEBI regulations?', a: 'FundFit AI provides mathematical decision-support software designed to align with institutional compliance standards.' },
            { q: 'Can I import mutual fund holdings via CAS statement?', a: 'Yes, FundFit AI supports instant CAS PDF uploads and API integration for portfolio sync.' },
            { q: 'How accurate is the 10,000-Path Monte Carlo simulation?', a: 'Our stochastic engine models interest rate shifts, inflation, and volatility shocks across a 99% confidence interval.' }
          ].map((item, idx) => (
            <div key={idx} className="fin-card overflow-hidden">
              <button
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-white"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${faqOpen === idx ? 'rotate-180 text-[#2563EB]' : ''}`} />
              </button>
              {faqOpen === idx && (
                <div className="px-5 pb-5 text-xs text-slate-400 border-t border-[#1E293B] pt-3 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 13. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="fin-card p-12 text-center space-y-6 border-2 border-[#2563EB]/40">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Transform Your Investment Strategy?</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">Join thousands of investors and financial advisors using FundFit AI for data-driven wealth decisions.</p>
          <div className="flex justify-center gap-4 pt-2">
            <Link to="/signup" className="px-6 py-3 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20">
              Start Free Trial
            </Link>
            <Link to="/contact" className="px-6 py-3 rounded-lg bg-[#0F766E] hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-md shadow-teal-700/20">
              Book Demo
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
