import React, { useState } from 'react';
import { Info, X, ShieldAlert } from 'lucide-react';

export const SimulationBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-emerald-950 text-white px-4 py-2 text-xs border-b border-emerald-900 no-print transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-brand-emerald/30 border border-brand-emerald/50 px-2 py-0.5 rounded-full text-[11px] font-semibold text-emerald-300 uppercase tracking-wider shrink-0">
            <ShieldAlert className="w-3 h-3 text-emerald-300" />
            Mode Simulasi / Demo
          </span>
          <p className="text-emerald-100/90 hidden sm:inline">
            Seluruh transaksi komitmen, alokasi, pencairan dana, approval proposal, dan draf laporan formal pada sistem ini adalah <strong>data simulasi prototipe</strong> untuk evaluasi MVP. Tidak ada pemindahan dana nyata.
          </p>
          <p className="text-emerald-100/90 sm:hidden">
            Mode Prototipe MVP — Data pendanaan & persetujuan adalah simulasi.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-emerald-400 hover:text-white p-1 rounded-md transition-colors shrink-0 cursor-pointer"
          aria-label="Tutup pemberitahuan simulasi"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
