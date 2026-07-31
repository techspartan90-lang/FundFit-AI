import React from 'react';
import { ADVISOR_CLIENTS } from '../data/mutualFundData';
import { 
  Building2, 
  Users, 
  Plus
} from 'lucide-react';

export const AdvisorPortalView: React.FC = () => {
  const totalAumUnderManagement = ADVISOR_CLIENTS.reduce((acc, c) => acc + c.totalAUM, 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 border-emerald-500/20 bg-gradient-to-r from-[#111726] via-[#10241F] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-emerald flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                SEBI Registered Investment Advisor (RIA) Portal
              </span>
              <span className="badge badge-indigo">ARN-184920</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Wealth Advisor Client Management
            </h1>
            <p className="text-slate-300 text-sm">
              Manage client portfolios, automate white-labeled rebalancing proposals, and review AUM health.
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">Total Client AUM</div>
            <div className="text-2xl font-extrabold text-emerald-400">₹{(totalAumUnderManagement / 10000000).toFixed(2)} Crores</div>
          </div>
        </div>
      </div>

      {/* Clients Directory */}
      <div className="glass-card p-6 border-emerald-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            Client Directory ({ADVISOR_CLIENTS.length} Active Families)
          </h3>
          <button className="btn-emerald text-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Onboard New Client</span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {ADVISOR_CLIENTS.map((client) => (
            <div key={client.id} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-3 hover:border-emerald-500/30 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-sm text-white">{client.name}</div>
                  <div className="text-slate-400">{client.email} • {client.phone}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="badge badge-emerald text-[11px] font-bold">{client.fundFitScore}% Fit</span>
                  <span className={`badge text-[11px] font-bold ${
                    client.status === 'Healthy' ? 'badge-indigo' : 'badge-amber'
                  }`}>
                    {client.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Client AUM</span>
                  <span className="font-bold text-white">₹{(client.totalAUM / 100000).toFixed(2)} Lakhs</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Risk Profile</span>
                  <span className="font-semibold text-slate-200">{client.riskProfile}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Last Review</span>
                  <span className="font-semibold text-slate-300">{client.lastReviewDate}</span>
                </div>
                <div className="text-right">
                  <button className="btn-secondary text-[11px] py-1">Generate Proposal</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
