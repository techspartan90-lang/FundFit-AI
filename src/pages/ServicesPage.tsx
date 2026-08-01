import React from 'react';
import { Layers, ShieldCheck, BarChart3, BrainCircuit, CheckCircle2, ArrowRight } from 'lucide-react';
import SpecularButton from '../components/SpecularButton';
import { useNavigate } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Institutional Wealth Analytics',
      desc: 'Real-time multi-asset portfolio monitoring, VaR risk decomposition, and asset class correlation analysis.',
      icon: BarChart3,
      badge: 'Enterprise'
    },
    {
      title: 'Monte Carlo Goal Engine API',
      desc: 'Embed 10,000-path stochastic goal simulation APIs directly into custom advisor platforms.',
      icon: BrainCircuit,
      badge: 'API Solution'
    },
    {
      title: 'Explainable Fit Scoring Service',
      desc: '0-100 proprietary suitability score generation tailored for regulatory compliance & client reporting.',
      icon: ShieldCheck,
      badge: 'Turnkey'
    },
    {
      title: 'Automated Portfolio Rebalancing',
      desc: 'Algorithmic drift notifications with tax-harvesting optimization and friction mitigation.',
      icon: Layers,
      badge: 'Automation'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-white">Institutional Services & API Solutions</h1>
        <p className="text-slate-400 text-base">
          Powering RIA networks, family offices, and wealthtech apps with next-generation quantitative modeling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((svc, idx) => {
          const Icon = svc.icon;
          return (
            <div key={idx} className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-cyan-400">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-bold">{svc.badge}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{svc.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{svc.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-3xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white">Need a Custom Enterprise Integration?</h3>
          <p className="text-xs text-slate-400">Our engineering team provides dedicated onboarding and SOC-2 data isolation.</p>
        </div>
        <SpecularButton onClick={() => navigate('/contact')} size="md" radius={12}>
          <span>Contact Solutions Team</span>
          <ArrowRight className="w-4 h-4" />
        </SpecularButton>
      </div>
    </div>
  );
};
