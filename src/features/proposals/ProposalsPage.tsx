import React, { useState, useMemo } from 'react';
import {
  FileCheck2,
  Plus,
  Search,
  Filter,
  Users,
  Calendar,
  Building2,
  ArrowRight,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProposalFormModal } from './ProposalFormModal';
import { ProposalReviewModal } from './ProposalReviewModal';
import { formatCompactIDR, formatDateID, formatNumber, CATEGORY_LABELS } from '../../lib/formatters';
import { Proposal, ProposalStatus } from '../../types/csr';

export const ProposalsPage: React.FC = () => {
  const { proposals, partners, user } = useCSRStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [partnerFilter, setPartnerFilter] = useState<string>('all');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProposalForReview, setSelectedProposalForReview] = useState<Proposal | null>(null);

  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.code.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesPartner = partnerFilter === 'all' || p.partnerId === partnerFilter;
      return matchesSearch && matchesStatus && matchesCategory && matchesPartner;
    });
  }, [proposals, search, statusFilter, categoryFilter, partnerFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: proposals.length };
    proposals.forEach((p) => {
      counts[p.status] = (counts[p.status] || 0) + 1;
    });
    return counts;
  }, [proposals]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-mint text-brand-primary">
              <FileCheck2 className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-ink-primary">Pipeline & Kurasi Proposal Mitra</h1>
          </div>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            Alur evaluasi usulan program dari lembaga sosial mitra: Draft → Submitted → Under Review → Approved / Rejected → Converted to Program.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Kirim Usulan Proposal Baru
        </button>
      </div>

      {/* Status Pipeline Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
        {[
          { key: 'all', label: 'Semua Proposal' },
          { key: 'submitted', label: 'Menunggu Kurasi' },
          { key: 'under_review', label: 'Dalam Peninjauan' },
          { key: 'approved', label: 'Disetujui (Demo)' },
          { key: 'converted', label: 'Dikonversi ke Program' },
          { key: 'rejected', label: 'Ditolak' },
        ].map((tab) => {
          const count = statusCounts[tab.key] || 0;
          const isActive = statusFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-brand-primary text-white shadow-xs font-bold'
                  : 'bg-surface-card text-ink-secondary hover:bg-surface-secondary border border-border-subtle'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-surface-secondary text-ink-muted'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Secondary Filter */}
      <div className="bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative md:col-span-1">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari proposal atau lokasi..."
            className="w-full pl-9 pr-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
          />
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Sektor Program</option>
            <option value="lingkungan">Lingkungan & Reboisasi</option>
            <option value="pendidikan">Pendidikan & Beasiswa</option>
            <option value="ekonomi_umkm">Pemberdayaan UMKM</option>
            <option value="kesehatan">Kesehatan Masyarakat</option>
            <option value="infrastruktur">Infrastruktur & Air Bersih</option>
            <option value="tanggap_bencana">Tanggap Bencana</option>
          </select>
        </div>

        <div>
          <select
            value={partnerFilter}
            onChange={(e) => setPartnerFilter(e.target.value)}
            className="w-full px-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Mitra Pengusul</option>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Proposals List */}
      {filteredProposals.length === 0 ? (
        <EmptyState
          title="Tidak Ada Proposal Ditemukan"
          description="Tidak ada usulan proposal yang cocok dengan kriteria filter saat ini."
          actionLabel="Atur Ulang Filter"
          onAction={() => {
            setSearch('');
            setStatusFilter('all');
            setCategoryFilter('all');
            setPartnerFilter('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProposals.map((prop) => {
            const partner = partners.find((p) => p.id === prop.partnerId);
            const catInfo = CATEGORY_LABELS[prop.category];

            return (
              <div
                key={prop.id}
                className="bg-surface-card rounded-2xl border border-border-subtle p-5 hover:border-brand-emerald hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-ink-muted">{prop.code}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${catInfo?.badgeBg || 'bg-gray-50'}`}>
                        {catInfo?.label || prop.category}
                      </span>
                    </div>
                    <StatusBadge status={prop.status} size="sm" />
                  </div>

                  <h3
                    onClick={() => setSelectedProposalForReview(prop)}
                    className="font-bold text-sm text-ink-primary group-hover:text-brand-primary transition-colors cursor-pointer line-clamp-2"
                  >
                    {prop.title}
                  </h3>

                  <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                    {prop.problemStatement}
                  </p>

                  <div className="space-y-1 text-xs text-ink-secondary pt-2 border-t border-border-subtle">
                    <div className="flex items-center gap-2 truncate">
                      <Users className="w-3.5 h-3.5 text-brand-emerald shrink-0" />
                      <span className="truncate">Pengusul: {partner?.name || 'Mitra Sosial'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-ink-muted">
                      <span>📍 {prop.location}, {prop.province}</span>
                      <span>📅 Diajukan: {formatDateID(prop.submittedAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Footer metrics & Review button */}
                <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] text-ink-muted">Rencana Anggaran</div>
                    <div className="text-xs font-extrabold text-brand-primary">
                      {formatCompactIDR(prop.proposedBudget)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-ink-muted">Target Sasaran</div>
                    <div className="text-xs font-bold text-ink-primary">
                      {formatNumber(prop.targetBeneficiaries)} Jiwa
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProposalForReview(prop)}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-mint hover:bg-brand-mintHover text-brand-primary font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Tinjau & Kurasi
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <ProposalFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <ProposalReviewModal
        proposal={selectedProposalForReview}
        isOpen={!!selectedProposalForReview}
        onClose={() => setSelectedProposalForReview(null)}
      />
    </div>
  );
};
