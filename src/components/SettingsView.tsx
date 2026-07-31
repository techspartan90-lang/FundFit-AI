import React, { useState } from 'react';
import { 
  User, 
  CheckCircle2, 
  Link2
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="glass-card p-6 border-indigo-500/20 bg-gradient-to-r from-[#111726] via-[#1A1F36] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-indigo">System Settings</span>
              <span className="badge badge-emerald">Broker Integrations Active</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Profile, Security & Broker Connections
            </h1>
          </div>
        </div>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Settings successfully updated and saved!</span>
        </div>
      )}

      {/* Profile & Broker Integrations Form */}
      <form onSubmit={handleSave} className="glass-card p-6 border-indigo-500/20 space-y-6 text-xs">
        
        {/* User Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" />
            Investor Profile Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
              <input type="text" defaultValue="Aria Vance" className="input-field text-xs" />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Email Address</label>
              <input type="email" defaultValue="aria@fundfit.ai" className="input-field text-xs" />
            </div>
          </div>
        </div>

        {/* Connected Broker APIs */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Link2 className="w-4 h-4 text-emerald-400" />
            Connected Broker & CAS Sync APIs
          </h3>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">CAMS & KFintech CAS Sync</div>
                <div className="text-[10px] text-slate-400">Automated daily NAV & statement sync</div>
              </div>
              <span className="badge badge-emerald text-[10px] font-bold">Connected</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Zerodha Kite API</div>
                <div className="text-[10px] text-slate-400">Direct MF order execution API</div>
              </div>
              <span className="badge badge-emerald text-[10px] font-bold">Connected</span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button type="submit" className="btn-primary text-xs">
            Save Preferences
          </button>
        </div>

      </form>

    </div>
  );
};
