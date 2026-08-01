import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the Fund Fit Score calculation work?',
      a: 'The Fund Fit Score evaluates risk tolerance alignment, asset correlation, expense ratios, historical alpha, and downside VaR metrics to generate an explainable 0–100 suitability rating.'
    },
    {
      q: 'What is the speed and accuracy of the 10,000-Path Monte Carlo simulation?',
      a: 'Our WebGL & WebAssembly accelerated engine executes 10,000 stochastic economic projection paths in under 120 milliseconds.'
    },
    {
      q: 'How is client data protected and stored?',
      a: 'All data is stored in isolated 3NF relational PostgreSQL instances with AES-256 encryption at rest and TLS 1.3 in transit.'
    },
    {
      q: 'Can I export custom branded PDF reports for clients?',
      a: 'Yes, Professional and Enterprise plans allow complete white-label customization including logos, custom color schemes, and advisory notes.'
    },
    {
      q: 'Do you offer API access for custom web and mobile apps?',
      a: 'Yes, our RESTful and GraphQL APIs provide high-throughput endpoints for fit scoring, Monte Carlo projections, and portfolio risk decomposition.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-cyan-400 text-xs font-bold">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h1 className="text-4xl font-black text-white">Everything You Need to Know</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-6 text-left flex items-center justify-between font-bold text-white text-sm hover:text-cyan-400 transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === idx ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-6 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
