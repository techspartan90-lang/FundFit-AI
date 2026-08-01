import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export const AppFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-cyan-400 to-emerald-400 p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                FUND FIT <span className="text-cyan-400">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Enterprise-grade wealth platform unifying explainable AI, 10,000-path Monte Carlo goal forecasting, and downside VaR portfolio analytics.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">Product</div>
            <ul className="space-y-2">
              <li><Link to="/features" className="hover:text-white transition-colors">AI Features</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Institutional Services</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
              <li><Link to="/analytics" className="hover:text-white transition-colors">Monte Carlo Engine</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Live Dashboard</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">Company</div>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Research Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Sales</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ & Support</Link></li>
            </ul>
          </div>

          {/* Compliance */}
          <div className="space-y-3">
            <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">Security</div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>ISO 27001 Certified</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Bank-grade 256-bit encryption & 3NF PostgreSQL architecture.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 FundFit AI Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Security Specs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
