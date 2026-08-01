import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { 
  Sparkles, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Globe, 
  ChevronDown,
  LayoutDashboard,
  Building2,
  ShieldCheck,
  Cpu,
  BookOpen,
  Code2
} from 'lucide-react';

export const HeaderNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN (US)');
  const { theme, toggleTheme, setSearchOpen } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Products', path: '/features' },
    { name: 'Solutions', path: '/services' },
    { name: 'AI Engine', path: '/analytics' },
    { name: 'Resources', path: '/blog' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Developers', path: '/services' },
    { name: 'Company', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const languages = ['EN (US)', 'EN (IN)', 'HI (Hindi)', 'DE (German)'];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#020817]/95 backdrop-blur-md border-b border-[#1E293B] shadow-lg' : 'bg-transparent border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-600/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white font-mono">
                FundFit <span className="text-[#2563EB]">AI</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-slate-300">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg bg-[#0F172A] border border-[#1E293B] hover:border-slate-600 text-slate-300 text-xs transition-all flex items-center gap-2"
              title="Search"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <kbd className="text-[10px] bg-slate-800 px-1 rounded font-mono text-slate-400">⌘K</kbd>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F172A] border border-[#1E293B] text-slate-300 text-xs font-semibold hover:border-slate-600 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedLang}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[#0F172A] border border-[#1E293B] rounded-lg shadow-xl py-1 text-xs text-slate-200 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[#0F172A] border border-[#1E293B] text-slate-300 hover:text-white transition-all"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
            </button>

            {/* Login */}
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-2 py-1 transition-colors"
            >
              Login
            </Link>

            {/* Start Free Button */}
            <Link
              to="/signup"
              className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/20"
            >
              Start Free
            </Link>

            {/* Dashboard Button */}
            <Link
              to="/dashboard"
              className="px-3.5 py-1.5 rounded-lg bg-[#0F766E] hover:bg-teal-700 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-teal-700/20"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0F172A] border border-[#1E293B] text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#020817] border-b border-[#1E293B] px-4 pt-3 pb-6 space-y-3"
          >
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#0F172A] border border-[#1E293B] text-slate-300 font-semibold"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-[#1E293B] flex flex-col gap-2">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-lg bg-[#0F766E] text-white font-bold text-xs"
              >
                Dashboard Console
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
