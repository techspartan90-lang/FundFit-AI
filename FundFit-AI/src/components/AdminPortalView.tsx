import React from 'react';
import { ADMIN_AUDIT_LOGS } from '../data/mutualFundData';
import { 
  ShieldCheck, 
  Activity, 
  RefreshCw
} from 'lucide-react';

export const AdminPortalView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 border-purple-500/20 bg-gradient-to-r from-[#111726] via-[#1D1226] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-violet flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                System Administration & Governance
              </span>
              <span className="badge badge-indigo">Cluster ID: asia-south1-prod</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Enterprise Admin Portal
            </h1>
            <p className="text-slate-300 text-sm">
              Monitor AMFI master data synchronization, security audit logs, broker API keys, and RBAC permissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="btn-secondary text-xs">
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sync AMFI NAV Feed</span>
            </button>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="glass-card p-6 border-purple-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            Security & Data Audit Logs
          </h3>
          <span className="text-xs text-slate-400">Live System Event Stream</span>
        </div>

        <div className="space-y-2.5 text-xs">
          {ADMIN_AUDIT_LOGS.map((log) => (
            <div key={log.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{log.action}</span>
                  <span className="badge badge-indigo text-[10px]">{log.module}</span>
                </div>
                <div className="text-[11px] text-slate-400">{log.user} • {log.timestamp}</div>
              </div>

              <span className={`badge text-[11px] font-bold ${
                log.status === 'Success' ? 'badge-emerald' : 'badge-amber'
              }`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
