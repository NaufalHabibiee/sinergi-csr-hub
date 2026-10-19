import React, { useState, useMemo } from 'react';
import {
  FileCheck2,
  Plus,
  Search,
  Users,
  Calendar,
  Eye,
  MapPin,
  Coins,
  LayoutGrid,
  List,
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProposalFormModal } from './ProposalFormModal';
import { ProposalReviewModal } from './ProposalReviewModal';
import { formatCompactIDR, formatDateID, formatNumber, CATEGORY_LABELS } from '../../lib/formatters';
import { Proposal, ProgramCategory } from '../../types/csr';

const PROPOSAL_COVER_IMAGES: Record<ProgramCategory, string> = {
  lingkungan: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&auto=format&fit=crop&q=80',
  pendidikan: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&auto=format&fit=crop&q=80',
  ekonomi_umkm: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=700&auto=format&fit=crop&q=80',
  kesehatan: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=700&auto=format&fit=crop&q=80',
  infrastruktur: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?w=700&auto=format&fit=crop&q=80',
  tanggap_bencana: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=700&auto=format&fit=crop&q=80',
  lainnya: '/images/hero-plantation.jpg',
};

export const ProposalsPage: React.FC = () => {
  const { proposals, partners } = useCSRStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [partnerFilter, setPartnerFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

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

  const totalProposedBudget = useMemo(
    () => proposals.reduce((sum, p) => sum + p.proposedBudget, 0),
    [proposals]
  );

  const pipelineTabs = [
    { key: 'all', label: 'Semua Proposal' },
    { key: 'submitted', label: 'Menunggu Kurasi' },
    { key: 'under_review', label: 'Dalam Peninjauan' },
    { key: 'approved', label: 'Disetujui' },
    { key: 'converted', label: 'Sudah Dikonversi' },
    { key: 'rejected', label: 'Ditolak' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Executive Header + Pipeline Summary Strip */}
      <div className="bg-surface-card rounded-3xl border border-border-subtle shadow-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#072418] text-[#FDE047] flex items-center justify-center shadow-sm shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#072418] tracking-tight">
                Pipeline & Kurasi Proposal
              </h1>
              <p className="text-xs text-ink-muted mt-0.5">
                Seleksi kelayakan anggaran, verifikasi mitra pengusul, dan konversi menjadi program CSR aktif.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            {/* View Switcher */}
            <div className="inline-flex items-center p-1 rounded-xl bg-surface-secondary border border-border-subtle">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#072418] shadow-2xs'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline pr-1">Kartu</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#072418] shadow-2xs'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline pr-1">Tabel</span>
              </button>
            </div>

            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-[#072418] hover:bg-[#176B4D] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#FDE047]" />
              <span>Usulan Baru</span>
            </button>
          </div>
        </div>

        {/* Interactive Pipeline Stage Pills */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border-subtle flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {pipelineTabs.map((tab) => {
              const count = statusCounts[tab.key] || 0;
              const isActive = statusFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#072418] text-white shadow-sm'
                      : 'bg-[#F8FAF8] text-ink-secondary hover:bg-surface-secondary border border-border-subtle/70'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.2 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-[#FDE047] text-[#072418]' : 'bg-white text-ink-muted border border-border-subtle'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs">
            <Coins className="w-4 h-4 text-[#176B4D]" />
            <span className="text-ink-secondary font-medium">Total Usulan RAB:</span>
            <span className="font-extrabold text-[#072418]">{formatCompactIDR(totalProposedBudget)}</span>
          </div>
        </div>
      </div>

      {/* 2. Search & Compact Filters */}
      <div className="bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="relative md:col-span-6">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul proposal, kode (PROP-...), atau lokasi..."
            className="w-full pl-9 pr-3 py-2 bg-surface-secondary/60 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 bg-surface-secondary/60 hover:bg-surface-secondary border border-border-subtle rounded-xl text-xs text-ink-primary font-medium focus:outline-none cursor-pointer"
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

        <div className="md:col-span-3">
          <select
            value={partnerFilter}
            onChange={(e) => setPartnerFilter(e.target.value)}
            className="w-full px-3 py-2 bg-surface-secondary/60 hover:bg-surface-secondary border border-border-subtle rounded-xl text-xs text-ink-primary font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Mitra Pengusul</option>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Proposals Content: Scannable Visual Grid OR Compact Table */}
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
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProposals.map((prop) => {
            const partner = partners.find((p) => p.id === prop.partnerId);
            const catInfo = CATEGORY_LABELS[prop.category];
            const coverImg = PROPOSAL_COVER_IMAGES[prop.category] || PROPOSAL_COVER_IMAGES.lingkungan;
            const needsAction = prop.status === 'submitted' || prop.status === 'under_review';

            return (
              <div
                key={prop.id}
                onClick={() => setSelectedProposalForReview(prop)}
                className={`bg-surface-card rounded-3xl border overflow-hidden hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                  needsAction
                    ? 'border-emerald-500/70 hover:border-[#176B4D]'
                    : 'border-border-subtle hover:border-[#176B4D]'
                }`}
              >
                {/* Top Cover Banner */}
                <div>
                  <div className="relative h-32 overflow-hidden bg-[#072418]">
                    <img
                      src={coverImg}
                      alt={prop.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#072418] via-black/30 to-black/25" />

                    {/* Top Row: Category + Status */}
                    <div className="absolute top-3 inset-x-3.5 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-[#FDE047] border border-white/15 text-[10px] font-extrabold tracking-wide">
                        {catInfo?.label || prop.category}
                      </span>
                      <StatusBadge status={prop.status} size="sm" />
                    </div>

                    {/* Bottom Row: Location + Date */}
                    <div className="absolute bottom-2.5 inset-x-3.5 flex items-center justify-between text-white text-[11px]">
                      <span className="inline-flex items-center gap-1 font-semibold truncate pr-2">
                        <MapPin className="w-3.5 h-3.5 text-[#FDE047] shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </span>
                      <span className="font-mono text-[10px] text-white/80 bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-xs shrink-0">
                        {prop.code}
                      </span>
                    </div>
                  </div>

                  {/* Proposer Chip + Clean Title (Zero Wall-of-Text!) */}
                  <div className="p-5 pb-3 space-y-3">
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-6 h-6 rounded-lg bg-[#072418] text-[#FDE047] font-black text-[10px] flex items-center justify-center shrink-0">
                          {partner?.code?.slice(0, 3) || 'MTR'}
                        </span>
                        <span className="font-bold text-ink-secondary truncate" title={partner?.name}>
                          {partner?.name || 'Mitra Sosial'}
                        </span>
                      </div>
                      <span className="text-[10px] text-ink-muted shrink-0 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDateID(prop.submittedAt)}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-[#072418] group-hover:text-[#176B4D] transition-colors line-clamp-2 leading-snug">
                      {prop.title}
                    </h3>
                  </div>
                </div>

                {/* Scannable 2-Box Metrics & Action Button */}
                <div className="px-5 pb-5 space-y-3">
                  <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-[#F8FAF8] border border-emerald-900/10">
                    <div>
                      <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider">
                        Usulan RAB
                      </div>
                      <div className="text-sm font-extrabold text-[#176B4D] mt-0.5">
                        {formatCompactIDR(prop.proposedBudget)}
                      </div>
                    </div>

                    <div className="text-right border-l border-border-subtle pl-2.5">
                      <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider">
                        Target Dampak
                      </div>
                      <div className="text-sm font-extrabold text-[#072418] mt-0.5">
                        {formatNumber(prop.targetBeneficiaries)} <span className="text-[10px] font-semibold">Jiwa</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProposalForReview(prop);
                    }}
                    className={`w-full py-2.5 px-4 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      needsAction
                        ? 'bg-[#072418] hover:bg-[#176B4D] text-[#FDE047] shadow-sm'
                        : 'bg-brand-mint hover:bg-[#072418] text-brand-primary hover:text-[#FDE047]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{needsAction ? 'Tinjau & Kurasi Sekarang' : 'Lihat Detail Evaluasi'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Compact Table View */
        <div className="bg-surface-card rounded-3xl border border-border-subtle shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAF8] border-b border-border-subtle text-[11px] font-extrabold text-ink-secondary uppercase tracking-wider">
                  <th className="py-3.5 px-4">Proposal & Lokasi</th>
                  <th className="py-3.5 px-4">Mitra Pengusul</th>
                  <th className="py-3.5 px-4">Sektor</th>
                  <th className="py-3.5 px-4">Usulan RAB</th>
                  <th className="py-3.5 px-4">Target</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredProposals.map((prop) => {
                  const partner = partners.find((p) => p.id === prop.partnerId);
                  const catInfo = CATEGORY_LABELS[prop.category];
                  return (
                    <tr
                      key={prop.id}
                      onClick={() => setSelectedProposalForReview(prop)}
                      className="hover:bg-surface-secondary/50 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-mono text-[10px] text-ink-muted">{prop.code} • {formatDateID(prop.submittedAt)}</div>
                        <div className="font-bold text-ink-primary line-clamp-1">{prop.title}</div>
                        <div className="text-[11px] text-ink-muted flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {prop.location}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-ink-primary">{partner?.name || 'Mitra Sosial'}</div>
                        <div className="text-[10px] text-ink-muted">{partner?.subType}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${catInfo?.badgeBg || 'bg-gray-50'}`}>
                          {catInfo?.label || prop.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-[#176B4D]">
                        {formatCompactIDR(prop.proposedBudget)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-ink-primary">
                        {formatNumber(prop.targetBeneficiaries)} Jiwa
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={prop.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProposalForReview(prop);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#072418] text-[#FDE047] font-bold text-xs hover:bg-[#176B4D] transition-colors cursor-pointer"
                        >
                          Kurasi
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
