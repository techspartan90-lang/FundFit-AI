import React, { useState } from 'react';
import { 
  Download, 
  CheckCircle2
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const [downloadedReport, setDownloadedReport] = useState<string | null>(null);

  const reports = [
    { id: 'rep-1', name: 'Capital Gains Tax Statement (FY 2025-26)', desc: 'Detailed LTCG and STCG tax breakdown for income tax filing.', type: 'Tax Report' },
    { id: 'rep-2', name: 'Comprehensive Portfolio Risk & Health Audit', desc: 'Full XIRR breakdown, sector overlap analysis, and AMC risk rating.', type: 'Audit Report' },
    { id: 'rep-3', name: 'Goal Progress & SIP Projection Statement', desc: 'Target corpus probability simulation for Retirement & Home purchase.', type: 'Goal Report' },
    { id: 'rep-4', name: 'Annual CAS Consolidation Statement', desc: 'Consolidated Account Statement (CAS) synced from CAMS & KFintech.', type: 'CAS Statement' },
  ];

  const handleDownload = (name: string) => {
    setDownloadedReport(name);
    setTimeout(() => setDownloadedReport(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 border-indigo-500/20 bg-gradient-to-r from-[#111726] via-[#1A1F36] to-[#111726]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="badge badge-indigo">Financial Reports & Statements</span>
              <span className="badge badge-emerald">SEBI Compliant CAS</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Report Generator & Tax Statements
            </h1>
            <p className="text-slate-300 text-sm">
              Generate 1-click PDF, Excel, and CSV reports for tax filing, portfolio audits, and advisory reviews.
            </p>
          </div>
        </div>
      </div>

      {downloadedReport && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Successfully generated and downloaded <strong>{downloadedReport}</strong>!</span>
          </div>
        </div>
      )}

      {/* Reports Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((rep) => (
          <div key={rep.id} className="glass-card p-6 border-indigo-500/20 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="badge badge-violet text-[10px]">{rep.type}</span>
              <h3 className="text-lg font-bold text-white">{rep.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{rep.desc}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center gap-3 text-xs">
              <button onClick={() => handleDownload(rep.name)} className="btn-primary text-xs flex-1 justify-center">
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Statement</span>
              </button>

              <button onClick={() => handleDownload(rep.name)} className="btn-secondary text-xs">
                <span>Excel (.xlsx)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
