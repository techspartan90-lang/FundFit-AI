import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Settings, Bell, ShieldCheck, Database, Key } from 'lucide-react';
import SpecularButton from '../components/SpecularButton';

export const SettingsPage: React.FC = () => {
  const { addToast } = useAppStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Platform Preferences & Security Settings</h1>
        <p className="text-xs text-slate-400">Configure API keys, notification triggers, and Monte Carlo precision presets.</p>
      </div>

      <div className="space-y-6">
        
        {/* Notification Settings */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <span>Alert & Drift Triggers</span>
          </h3>

          <div className="space-y-3 text-xs text-slate-300">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
              <span>Send email alerts when portfolio drift exceeds 5% threshold</span>
              <input type="checkbox" defaultChecked className="rounded bg-slate-900 border-slate-800 text-cyan-400" />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
              <span>Notify when Monte Carlo VaR downside exceeds -5% in stress tests</span>
              <input type="checkbox" defaultChecked className="rounded bg-slate-900 border-slate-800 text-cyan-400" />
            </label>
          </div>
        </div>

        {/* API Key Management */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-400" />
            <span>API Token Management</span>
          </h3>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <div className="font-mono text-cyan-400">ff_live_891240192847192847</div>
              <div className="text-[11px] text-slate-500 mt-1">Full Read & Write Access (Created Jul 2026)</div>
            </div>
            <button
              onClick={() => addToast('info', 'API Key copied to clipboard')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-semibold text-slate-300 hover:text-white"
            >
              Copy Key
            </button>
          </div>
        </div>

        <SpecularButton
          onClick={() => addToast('success', 'Settings updated successfully')}
          size="md"
          radius={12}
          tint="#10b981"
          tintOpacity={0.25}
        >
          <span>Save Preferences</span>
        </SpecularButton>

      </div>
    </div>
  );
};
