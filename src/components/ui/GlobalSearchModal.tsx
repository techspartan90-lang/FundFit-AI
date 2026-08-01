import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { Search, X, Command, ArrowRight, ShieldCheck, Zap, LineChart, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setSearchOpen, searchQuery, setSearchQuery } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  const quickLinks = [
    { title: 'Interactive Dashboard', icon: LineChart, path: '/dashboard', cat: 'Navigation' },
    { title: 'Portfolio Analytics', icon: Zap, path: '/analytics', cat: 'Feature' },
    { title: 'Enterprise Pricing Plans', icon: ShieldCheck, path: '/pricing', cat: 'Billing' },
    { title: 'Platform FAQ & Docs', icon: FileText, path: '/faq', cat: 'Help' },
  ];

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header Input */}
          <div className="flex items-center px-4 border-b border-slate-800">
            <Search className="w-5 h-5 text-indigo-400 shrink-0" />
            <input
              type="text"
              placeholder="Search features, analytics, funds, documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-4 bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Quick Shortcuts
            </div>

            <div className="space-y-1">
              {quickLinks.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    navigate(item.path);
                    setSearchOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-indigo-600/10 hover:border-indigo-500/30 border border-transparent text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200 group-hover:text-white">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400">{item.cat}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-slate-950/50 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">⌘K</kbd>
              <span>to open</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">ESC</kbd>
              <span>to close</span>
            </div>
            <span>FundFit AI Search Engine</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
