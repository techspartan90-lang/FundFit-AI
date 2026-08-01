import React, { useState } from 'react';
import { CheckCircle2, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import SpecularButton from '../components/SpecularButton';
import { useNavigate } from 'react-router-dom';

export const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter Investor',
      price: billingCycle === 'annual' ? '$29' : '$39',
      period: '/month',
      desc: 'Ideal for individual investors tracking personal fund portfolios.',
      features: [
        'Up to 3 Portfolios',
        '1,000 Monte Carlo Paths',
        'Basic Fund Fit Scoring',
        'Daily Market Digest',
        'Standard Email Support'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional Advisor',
      price: billingCycle === 'annual' ? '$89' : '$119',
      period: '/month',
      desc: 'Designed for independent financial advisors and RIA practices.',
      features: [
        'Unlimited Client Portfolios',
        '10,000 Monte Carlo Paths',
        'Explainable AI Factor Breakdown',
        'Custom PDF Report Generator',
        'Priority 24/7 Support',
        'API Data Integration'
      ],
      cta: 'Upgrade to Pro',
      popular: true
    },
    {
      name: 'Institutional Enterprise',
      price: 'Custom',
      period: '',
      desc: 'Dedicated infrastructure for asset management firms & banks.',
      features: [
        'Isolated SOC-2 Database',
        'Custom Risk Factor Models',
        'Unlimited API Rate Limits',
        'SLA Guarantee (99.99%)',
        'Dedicated Quant Strategist',
        'Single Sign-On (SAML/Okta)'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">Simple & Transparent Pricing</div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">Invest in Intelligent Analytics</h1>
        <p className="text-slate-400 text-sm">Choose the plan tailored to your portfolio size and client volume.</p>
        
        {/* Toggle */}
        <div className="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 mt-4">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${billingCycle === 'annual' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            Annual Billing <span className="text-[10px] text-emerald-400 font-bold ml-1">(Save 25%)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-3xl bg-slate-900/80 border flex flex-col justify-between space-y-6 relative ${
              plan.popular ? 'border-cyan-500/60 shadow-xl shadow-cyan-500/10' : 'border-slate-800'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-black text-[10px] uppercase">
                Most Popular Choice
              </span>
            )}

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{plan.desc}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-xs text-slate-400">{plan.period}</span>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-800">
                {plan.features.map((feat, fidx) => (
                  <div key={fidx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <SpecularButton
              onClick={() => navigate('/signup')}
              size="md"
              radius={14}
              tint={plan.popular ? '#10b981' : '#6366f1'}
              tintOpacity={0.2}
            >
              <span>{plan.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </SpecularButton>
          </div>
        ))}
      </div>

    </div>
  );
};
