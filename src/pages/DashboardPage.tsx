import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  BrainCircuit, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Filter, 
  Download,
  Plus
} from 'lucide-react';
import SpecularButton from '../components/SpecularButton';
import { useAppStore } from '../store/useAppStore';

const revenueData = [
  { month: 'Jan', revenue: 65000, target: 60000 },
  { month: 'Feb', revenue: 78000, target: 70000 },
  { month: 'Mar', revenue: 92000, target: 80000 },
  { month: 'Apr', revenue: 88000, target: 85000 },
  { month: 'May', revenue: 110000, target: 95000 },
  { month: 'Jun', revenue: 135000, target: 110000 },
  { month: 'Jul', revenue: 148500, target: 125000 },
];

const allocationData = [
  { name: 'Large Cap Equity', value: 42, color: '#2563EB' },
  { name: 'Mid Cap Growth', value: 28, color: '#10B981' },
  { name: 'Global Tech', value: 18, color: '#F59E0B' },
  { name: 'Govt Securities', value: 12, color: '#8B5CF6' }
];

const transactions = [
  { id: 'TX-9021', fund: 'HDFC Flexi Cap Fund', type: 'Buy', amount: '$12,500', date: 'Today, 02:45 PM', status: 'Completed' },
  { id: 'TX-9022', fund: 'ICICI Prudential Bluechip', type: 'SIP', amount: '$2,500', date: 'Yesterday, 10:15 AM', status: 'Completed' },
  { id: 'TX-9023', fund: 'Parag Parikh Flexi Cap', type: 'Sell', amount: '$5,000', date: 'Jul 30, 2026', status: 'Completed' },
  { id: 'TX-9024', fund: 'SBI Small Cap Fund', type: 'SIP', amount: '$1,200', date: 'Jul 28, 2026', status: 'Pending' },
];

export const DashboardPage: React.FC = () => {
  const { addToast } = useAppStore();

  return (
    <div className="space-y-8">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Institutional Portfolio Console</h1>
          <p className="text-xs text-slate-400">Real-time stochastic risk modeling and AI Fit Score decomposition.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => addToast('info', 'Exporting PDF report...')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export Report</span>
          </button>

          <SpecularButton
            onClick={() => addToast('success', 'New portfolio rebalance simulated successfully!')}
            size="sm"
            radius={12}
            tint="#10b981"
            tintOpacity={0.2}
          >
            <Plus className="w-4 h-4" />
            <span>New Simulation</span>
          </SpecularButton>
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Portfolio Value</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">$1,482,900</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% YTD Growth</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Average Fit Score</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <BrainCircuit className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-cyan-400">94.2 <span className="text-xs text-slate-400 font-normal">/ 100</span></div>
          <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Optimal Risk Fit</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Simulations Executed</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">42,890</div>
          <div className="flex items-center gap-1 text-[11px] text-indigo-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+12.6% This Month</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>VaR Downside Risk</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-400">-3.8%</div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>99% Confidence Level</span>
          </div>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue / Portfolio Chart (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Portfolio Value Trajectory</h3>
              <p className="text-xs text-slate-400">Comparing actual performance vs Monte Carlo median target.</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Actual Growth
              </span>
              <span className="flex items-center gap-1.5 text-indigo-400">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span> Target Path
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#06B6D4" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="target" stroke="#6366F1" strokeWidth={2} strokeDasharray="4 4" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocation Donut Chart (1 col) */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">Asset Class Allocation</h3>
            <p className="text-xs text-slate-400">Current portfolio weight distribution.</p>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-white">4</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Sectors</span>
            </div>
          </div>

          <div className="space-y-2">
            {allocationData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Transactions Table */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Recent Portfolio Transactions</h3>
          <span className="text-xs text-cyan-400 font-semibold cursor-pointer hover:underline">View All History</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Fund Name</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 font-mono text-slate-400">{tx.id}</td>
                  <td className="py-3 font-bold text-white">{tx.fund}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      tx.type === 'Buy' ? 'bg-emerald-500/10 text-emerald-400' :
                      tx.type === 'Sell' ? 'bg-rose-500/10 text-rose-400' : 'bg-cyan-500/10 text-cyan-400'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-slate-200">{tx.amount}</td>
                  <td className="py-3 text-slate-400">{tx.date}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
