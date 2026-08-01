import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users, Globe, BrainCircuit, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const team = [
    { name: 'Dr. Sarah Jenkins', role: 'Chief AI Scientist', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80' },
    { name: 'Marcus Vance', role: 'Head of Quantitative Engine', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80' },
    { name: 'Elena Rostova', role: 'VP of Product Experience', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-cyan-400 text-xs font-bold">
          <BrainCircuit className="w-4 h-4" />
          <span>Our Vision & Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">Democratizing Explainable AI Wealth Management</h1>
        <p className="text-slate-400 text-base leading-relaxed">
          FundFit AI was founded by quantitative researchers and software architects committed to replacing black-box algorithms with transparent, risk-adjusted portfolio intelligence.
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <div className="text-3xl font-extrabold text-cyan-400 mb-1">$14.2B+</div>
          <div className="text-xs text-slate-400 font-medium">Assets Analyzed Daily</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <div className="text-3xl font-extrabold text-emerald-400 mb-1">10,000</div>
          <div className="text-xs text-slate-400 font-medium">Monte Carlo Paths / Run</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <div className="text-3xl font-extrabold text-indigo-400 mb-1">99.4%</div>
          <div className="text-xs text-slate-400 font-medium">Model Confidence Metric</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <div className="text-3xl font-extrabold text-amber-400 mb-1">ISO 27001</div>
          <div className="text-xs text-slate-400 font-medium">Security Compliant</div>
        </div>
      </div>

      {/* Leadership */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white text-center">Engineers & Quantitative Researchers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-indigo-500/40" />
              <h3 className="text-base font-bold text-white">{member.name}</h3>
              <div className="text-xs text-cyan-400 font-medium">{member.role}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
