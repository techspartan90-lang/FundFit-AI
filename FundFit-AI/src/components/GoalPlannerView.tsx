import React, { useState } from 'react';
import type { FinancialGoal } from '../data/mutualFundData';
import { USER_GOALS } from '../data/mutualFundData';
import { 
  Target, 
  Sparkles, 
  Plus
} from 'lucide-react';

export const GoalPlannerView: React.FC = () => {
  const [goals, setGoals] = useState<FinancialGoal[]>(USER_GOALS);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('goal-1');

  const selectedGoal = goals.find(g => g.id === selectedGoalId) || goals[0];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 border-amber-500/20 bg-gradient-to-r from-[#111726] via-[#241F10] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-amber flex items-center gap-1">
                <Target className="w-3.5 h-3.5" />
                Adaptive Goal AI
              </span>
              <span className="badge badge-emerald">3 Active Goals Tracked</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Financial Goal Planning Engine
            </h1>
            <p className="text-slate-300 text-sm">
              Simulate target corpus probabilities for Retirement, Real Estate, Education, and Emergency reserves.
            </p>
          </div>

          <button className="btn-primary text-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Financial Goal</span>
          </button>
        </div>
      </div>

      {/* Goals Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const isSelected = goal.id === selectedGoalId;

          return (
            <div
              key={goal.id}
              onClick={() => setSelectedGoalId(goal.id)}
              className={`glass-card p-6 cursor-pointer transition-all border flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-amber-950/30 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'hover:border-white/20 border-white/5'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="badge badge-amber text-[10px]">{goal.category}</span>
                  <span className="text-xs font-bold text-emerald-400">{goal.completionProbability}% Assured</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{goal.name}</h3>
                  <div className="text-xs text-slate-400">Target Year: {goal.targetYear}</div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Target: ₹{(goal.targetAmount / 100000).toFixed(0)} Lakhs</span>
                    <span className="font-bold text-white">Current: ₹{(goal.currentAmount / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-emerald-400 h-2 rounded-full"
                      style={{ width: `${Math.min((goal.currentAmount / goal.targetAmount) * 100 * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase block">AI Optimization Strategy:</span>
                <p className="line-clamp-2">{goal.aiSuggestion}</p>
              </div>

            </div>
          );
        })}
      </div>

      {/* Goal Detail Simulator Box */}
      <div className="glass-card p-6 border-amber-500/20 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <span className="badge badge-emerald text-[10px]">Active Simulation</span>
            <h2 className="text-xl font-bold text-white mt-1">{selectedGoal.name}</h2>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">Probability of Success</div>
            <div className="text-2xl font-extrabold text-emerald-400">{selectedGoal.completionProbability}%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>Target Corpus Needed</span>
                <span className="text-white font-extrabold">₹{(selectedGoal.targetAmount / 100000).toFixed(0)} Lakhs</span>
              </div>
              <input
                type="range"
                min={1000000}
                max={100000000}
                step={1000000}
                value={selectedGoal.targetAmount}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setGoals(prev => prev.map(g => g.id === selectedGoal.id ? { ...g, targetAmount: val } : g));
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>Current Monthly SIP Allocation</span>
                <span className="text-emerald-400 font-extrabold">₹{selectedGoal.currentMonthlySIP.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                type="range"
                min={5000}
                max={100000}
                step={2500}
                value={selectedGoal.currentMonthlySIP}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setGoals(prev => prev.map(g => g.id === selectedGoal.id ? { ...g, currentMonthlySIP: val } : g));
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="badge badge-indigo text-[10px] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI SIP Recommendation
              </span>
              <h4 className="text-sm font-bold text-white">Recommended Allocation Strategy</h4>
              <p className="text-slate-200 leading-relaxed text-xs">
                To guarantee 98% probability of achieving ₹{(selectedGoal.targetAmount / 100000).toFixed(0)} Lakhs by year {selectedGoal.targetYear}, split your monthly SIP into 60% Flexi Cap and 40% Large & Midcap schemes.
              </p>
            </div>

            <button className="btn-primary text-xs w-full justify-center">
              Apply Recommended SIP Rebalance
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
