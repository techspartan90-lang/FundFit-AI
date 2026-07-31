import React, { useState } from 'react';
import type { StartupProfile } from '../data/mockData';
import { 
  Calculator, 
  TrendingUp, 
  PieChart, 
  Sliders
} from 'lucide-react';

interface FinancialSimulatorProps {
  startup: StartupProfile;
}

export const FinancialSimulator: React.FC<FinancialSimulatorProps> = ({ startup }) => {
  // Valuation calculator states
  const [arr, setArr] = useState<number>(startup.arr);
  const [growthRate, setGrowthRate] = useState<number>(startup.momGrowth);
  const [arrMultiple, setArrMultiple] = useState<number>(20); // 20x forward ARR

  // Dilution states
  const [preMoneyVal, setPreMoneyVal] = useState<number>(startup.valPreMoney);
  const [investmentAmt, setInvestmentAmt] = useState<number>(startup.targetRaise);

  // Runway states
  const [currentCash, setCurrentCash] = useState<number>(500000);
  const [monthlyBurn, setMonthlyBurn] = useState<number>(startup.burnRateMonthly);

  // Calculated values
  const annualizedGrowth = Math.pow(1 + growthRate / 100, 12) - 1;
  const forwardArr = arr * (1 + annualizedGrowth * 0.5); // estimated forward ARR
  const estimatedValuation = Math.round(forwardArr * arrMultiple);

  // Dilution calculations
  const postMoneyVal = preMoneyVal + investmentAmt;
  const investorEquity = Math.round((investmentAmt / postMoneyVal) * 1000) / 10; // e.g. 20.0%
  const founderEquity = Math.round((100 - investorEquity) * 10) / 10;

  // Runway calculation
  const calculatedRunway = Math.round((currentCash / Math.max(monthlyBurn, 1)) * 10) / 10;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 border-violet-500/20 bg-gradient-to-r from-[#111726] via-[#1F172B] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-violet flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5" />
                Financial AI Engine Active
              </span>
              <span className="badge badge-indigo">Pre-Money Anchor: ${(preMoneyVal / 1000000).toFixed(1)}M</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Valuation Benchmark & Cap Table Simulator
            </h1>
            <p className="text-slate-300 text-sm">
              Model Seed & Series A pre/post-money equity dilution, ARR multiple valuations, and runway health.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-slate-400">Modeled Valuation</div>
              <div className="text-2xl font-extrabold text-violet-400">
                ${(estimatedValuation / 1000000).toFixed(2)}M
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Box 1: AI ARR Multiple Valuation Calculator */}
        <div className="glass-card p-6 space-y-6 border-indigo-500/20">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white">Forward ARR Valuation Engine</h2>
            </div>
            <span className="badge badge-indigo text-[10px]">Benchmark AI Model</span>
          </div>

          <div className="space-y-4 text-xs">
            
            {/* ARR Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Current ARR ($)</span>
                <span className="text-indigo-400 font-extrabold">${(arr / 1000).toFixed(0)}k</span>
              </div>
              <input
                type="range"
                min={100000}
                max={2000000}
                step={25000}
                value={arr}
                onChange={(e) => setArr(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* MoM Growth Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">MoM Revenue Growth (%)</span>
                <span className="text-emerald-400 font-extrabold">+{growthRate}% MoM</span>
              </div>
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* ARR Multiple Selector */}
            <div className="space-y-2">
              <span className="text-slate-300 font-semibold block">Market Revenue Multiple (Seed AI/SaaS)</span>
              <div className="grid grid-cols-4 gap-2">
                {[15, 20, 25, 30].map((mult) => (
                  <button
                    key={mult}
                    onClick={() => setArrMultiple(mult)}
                    className={`py-2 rounded-lg font-bold border transition-all ${
                      arrMultiple === mult
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/20'
                        : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {mult}x ARR
                  </button>
                ))}
              </div>
            </div>

            {/* Output Result Box */}
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2 mt-4">
              <div className="text-[11px] font-semibold text-slate-400 uppercase">Estimated Fair Valuation</div>
              <div className="text-2xl font-extrabold text-white">
                ${(estimatedValuation / 1000000).toFixed(2)}M <span className="text-xs text-slate-400 font-normal">Pre-Money</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Based on pace to ${(forwardArr / 1000).toFixed(0)}k forward ARR at a {arrMultiple}x Seed multiple.
              </p>
            </div>

          </div>
        </div>

        {/* Box 2: Cap Table & Dilution Modeler */}
        <div className="glass-card p-6 space-y-6 border-violet-500/20">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                <PieChart className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white">Cap Table & Dilution Modeler</h2>
            </div>
            <span className="badge badge-violet text-[10px]">Round Equity Split</span>
          </div>

          <div className="space-y-4 text-xs">
            
            {/* Pre-money slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Pre-Money Valuation</span>
                <span className="text-violet-400 font-extrabold">${(preMoneyVal / 1000000).toFixed(2)}M</span>
              </div>
              <input
                type="range"
                min={3000000}
                max={25000000}
                step={500000}
                value={preMoneyVal}
                onChange={(e) => setPreMoneyVal(Number(e.target.value))}
                className="w-full accent-violet-500 cursor-pointer"
              />
            </div>

            {/* Round raise amount slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">New Capital Raised</span>
                <span className="text-emerald-400 font-extrabold">${(investmentAmt / 1000000).toFixed(2)}M</span>
              </div>
              <input
                type="range"
                min={500000}
                max={8000000}
                step={250000}
                value={investmentAmt}
                onChange={(e) => setInvestmentAmt(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Post money summary */}
            <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5 flex items-center justify-between font-bold">
              <span className="text-slate-400">Post-Money Valuation:</span>
              <span className="text-white text-sm">${(postMoneyVal / 1000000).toFixed(2)}M</span>
            </div>

            {/* Visual Equity Split Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between font-semibold text-xs">
                <span className="text-indigo-400">Founders / Existing: {founderEquity}%</span>
                <span className="text-emerald-400">New Investor Ownership: {investorEquity}%</span>
              </div>

              <div className="w-full h-4 bg-slate-800 rounded-full flex overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-l-full transition-all duration-300"
                  style={{ width: `${founderEquity}%` }}
                ></div>
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-r-full transition-all duration-300"
                  style={{ width: `${investorEquity}%` }}
                ></div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-[11px]">
              <span className="font-bold block">Dilution Recommendation:</span>
              Standard Seed round dilution is 15% - 25%. Your target dilution of {investorEquity}% is within healthy institutional founder parameters.
            </div>

          </div>
        </div>

      </div>

      {/* Runway & Burn Rate Simulator */}
      <div className="glass-card p-6 border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Runway & Cash Depletion Simulator</h2>
          </div>
          <span className={`badge ${calculatedRunway >= 12 ? 'badge-emerald' : 'badge-rose'}`}>
            {calculatedRunway >= 12 ? 'Healthy Runway' : 'Fundraising Critical'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Bank Cash Balance</span>
              <span className="text-white font-bold">${(currentCash / 1000).toFixed(0)}k</span>
            </div>
            <input
              type="range"
              min={100000}
              max={3000000}
              step={50000}
              value={currentCash}
              onChange={(e) => setCurrentCash(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Monthly Net Burn Rate</span>
              <span className="text-amber-400 font-bold">${(monthlyBurn / 1000).toFixed(0)}k/mo</span>
            </div>
            <input
              type="range"
              min={10000}
              max={150000}
              step={5000}
              value={monthlyBurn}
              onChange={(e) => setMonthlyBurn(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Simulated Runway</div>
              <div className="text-2xl font-extrabold text-white mt-0.5">{calculatedRunway} Months</div>
            </div>
            <div className="p-3 rounded-full bg-amber-500/10 text-amber-400 font-bold">
              ~{(calculatedRunway / 12).toFixed(1)} yrs
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
