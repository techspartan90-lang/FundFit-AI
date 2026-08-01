import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { User, Mail, Shield, Building, CreditCard, CheckCircle2 } from 'lucide-react';
import SpecularButton from '../components/SpecularButton';

export const ProfilePage: React.FC = () => {
  const { user } = useAppStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Advisor & Investor Profile</h1>
        <p className="text-xs text-slate-400">Manage account credentials, firm affiliation, and active API subscriptions.</p>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-8">
        
        {/* Top Card */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-800 pb-8">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-cyan-400 shadow-xl"
          />
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-white">{user?.name}</h2>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <div className="flex items-center gap-2 pt-2 justify-center sm:justify-start">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                {user?.plan} Active
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-cyan-400 text-xs font-bold border border-indigo-500/30">
                Verified Advisor
              </span>
            </div>
          </div>
        </div>

        {/* Profile Info Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-500 font-bold uppercase">Affiliated Company / RIA</div>
            <div className="text-sm font-bold text-white">{user?.company || 'Quant Capital LLC'}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-500 font-bold uppercase">Account Identifier</div>
            <div className="text-sm font-mono text-cyan-400">{user?.id}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-500 font-bold uppercase">Security Role</div>
            <div className="text-sm font-bold text-white capitalize">{user?.role} Access</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-500 font-bold uppercase">Database Isolation</div>
            <div className="text-sm font-bold text-emerald-400">SOC-2 Isolated Instance</div>
          </div>
        </div>

      </div>
    </div>
  );
};
