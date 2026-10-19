import React, { useState, useMemo } from 'react';
import {
  History,
  Search,
  Filter,
  Layers,
  FileCheck2,
  Wallet,
  Users,
  Building2,
  FileText,
  Settings,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { formatDateTimeID } from '../../lib/formatters';
import { EmptyState } from '../../components/ui/EmptyState';

export const ActivityLogPage: React.FC = () => {
  const { activities } = useCSRStore();

  const [search, setSearch] = useState('');
  const [entityFilter, setEntityFilter] = useState('all');

  const filteredActivities = useMemo(() => {
    return activities.filter((a) => {
      const matchesSearch =
        a.summary.toLowerCase().includes(search.toLowerCase()) ||
        a.actorName.toLowerCase().includes(search.toLowerCase()) ||
        a.action.toLowerCase().includes(search.toLowerCase());
      const matchesEntity = entityFilter === 'all' || a.entityType === entityFilter;
      return matchesSearch && matchesEntity;
    });
  }, [activities, search, entityFilter]);

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'Program':
        return <Layers className="w-4 h-4 text-brand-primary" />;
      case 'Proposal':
        return <FileCheck2 className="w-4 h-4 text-amber-600" />;
      case 'Funding':
        return <Wallet className="w-4 h-4 text-emerald-600" />;
      case 'Partner':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'Funder':
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case 'Report':
        return <FileText className="w-4 h-4 text-teal-600" />;
      default:
        return <Settings className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-mint text-brand-primary">
              <History className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-ink-primary">Audit Log & Jejak Aktivitas</h1>
          </div>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            Catatan kronologis perubahan data, persetujuan program, kurasi proposal, dan transaksi pendanaan untuk menjamin akuntabilitas seluruh pemangku kepentingan.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari aktor, aksi, atau ringkasan perubahan..."
            className="w-full pl-9 pr-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
          />
        </div>

        <div>
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="w-full px-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Tipe Entitas</option>
            <option value="Program">Program CSR</option>
            <option value="Proposal">Proposal</option>
            <option value="Funding">Funding & Penyaluran</option>
            <option value="Report">Laporan Dampak</option>
            <option value="Partner">Mitra</option>
            <option value="Funder">Funder</option>
          </select>
        </div>
      </div>

      {/* Timeline List */}
      <div className="bg-surface-card rounded-2xl border border-border-subtle shadow-card p-6">
        {filteredActivities.length === 0 ? (
          <EmptyState
            icon={History}
            title="Tidak Ada Aktivitas Ditemukan"
            description="Tidak ada catatan audit log yang cocok dengan filter pencarian."
            actionLabel="Reset Filter"
            onAction={() => {
              setSearch('');
              setEntityFilter('all');
            }}
          />
        ) : (
          <div className="relative pl-6 border-l-2 border-border-subtle space-y-6">
            {filteredActivities.map((act) => (
              <div key={act.id} className="relative group">
                {/* Node dot */}
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-surface-card border-2 border-brand-emerald flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
                </div>

                <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border-subtle hover:border-brand-emerald transition-all space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-surface-card border border-border-subtle">
                        {getEntityIcon(act.entityType)}
                      </div>
                      <span className="font-bold text-ink-primary">{act.actorName}</span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-md bg-brand-mint text-brand-primary">
                        {act.actorRole}
                      </span>
                      <span className="text-ink-muted">• {act.action}</span>
                    </div>

                    <div className="text-[11px] text-ink-muted flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDateTimeID(act.timestamp)}
                    </div>
                  </div>

                  <p className="text-xs text-ink-secondary leading-relaxed pl-7">
                    {act.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
