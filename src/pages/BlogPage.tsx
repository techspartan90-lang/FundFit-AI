import React from 'react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const posts = [
    {
      id: '1',
      title: 'Deconstructing 10,000-Path Monte Carlo Simulations in Modern Portfolio Theory',
      excerpt: 'How stochastic modeling handles non-normal market distribution tails better than classical mean-variance framework.',
      cat: 'Quantitative Research',
      date: 'Jul 28, 2026',
      readTime: '6 min read',
      img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: '2',
      title: 'Explainable AI vs. Black Box Algorithms in Wealth Management Compliance',
      excerpt: 'Why regulatory bodies are demanding full factor attribution and mathematical transparency in automated advice.',
      cat: 'Compliance & AI',
      date: 'Jul 20, 2026',
      readTime: '8 min read',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: '3',
      title: 'Downside Value-at-Risk (VaR) Mitigation Strategies for Volatile Markets',
      excerpt: 'Implementing automated drift alerts and sector overlap filters to reduce portfolio drawdowns.',
      cat: 'Risk Analytics',
      date: 'Jul 12, 2026',
      readTime: '5 min read',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">Research & Technical Engineering</div>
        <h1 className="text-4xl font-black text-white">Quantitative Insights & Industry Papers</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden hover:border-cyan-500/40 transition-all flex flex-col justify-between group">
            <div>
              <img src={post.img} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-400 font-bold">{post.cat}</span>
                  <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</div>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">{post.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{post.excerpt}</p>
              </div>
            </div>
            <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-cyan-400">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
