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
  Sparkles,
  FileText,
  Kanban,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProposalFormModal } from './ProposalFormModal';
import { ProposalReviewModal } from './ProposalReviewModal';
import { formatCompactIDR, formatDateID, formatNumber, CATEGORY_LABELS } from '../../lib/formatters';
import { Proposal } from '../../types/csr';

export const ProposalsPage: React.FC = () => {
  const { proposals, partners } = useCSRStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [partnerFilter, setPartnerFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'docket' | 'kanban' | 'table'>('docket');

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

  const pendingDecisionCount = useMemo(
    () => proposals.filter((p) => p.status === 'submitted' || p.status === 'under_review').length,
    [proposals]
  );

  const pipelineTabs = [
    { key: 'all', label: 'Semua Berkas' },
    { key: 'submitted', label: 'Menunggu Kurasi' },
    { key: 'under_review', label: 'Dalam Peninjauan' },
    { key: 'approved', label: 'Disetujui' },
    { key: 'converted', label: 'Sudah Dikonversi' },
    { key: 'rejected', label: 'Ditolak' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Executive Header + Pipeline Funnel Status */}
      <div className="bg-surface-card rounded-3xl border border-border-subtle shadow-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#072418] text-[#FDE047] flex items-center justify-center shadow-sm shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#072418] tracking-tight">
                  Meja Kurasi Proposal CSR
                </h1>
                {pendingDecisionCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-extrabold animate-pulse border border-amber-300">
                    {pendingDecisionCount} Menunggu Keputusan
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-muted mt-0.5">
                Evaluasi kelayakan dokumen, verifikasi anggaran RAB, dan kurasi dampak sosial sebelum konversi program.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            {/* View Switcher: Docket / Kanban / Table */}
            <div className="inline-flex items-center p-1 rounded-xl bg-surface-secondary border border-border-subtle">
              <button
                onClick={() => setViewMode('docket')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'docket'
                    ? 'bg-white text-[#072418] shadow-2xs'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
                title="Tampilan Berkas Dossier"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline pr-1">Dossier</span>
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'kanban'
                    ? 'bg-white text-[#072418] shadow-2xs'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
                title="Tampilan Kanban Pipeline"
              >
                <Kanban className="w-4 h-4" />
                <span className="hidden sm:inline pr-1">Pipeline Kanban</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#072418] shadow-2xs'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
                title="Tampilan Tabel Eksekutif"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline pr-1">Tabel</span>
              </button>
            </div>

            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#072418] hover:bg-[#176B4D] text-[#FDE047] text-xs font-extrabold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Usulkan Proposal Baru</span>
            </button>
          </div>
        </div>

        {/* Pipeline Stage Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-border-subtle">
          {pipelineTabs.map((tab) => {
            const count = statusCounts[tab.key] || 0;
            const isActive = statusFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#072418] text-[#FDE047] shadow-xs'
                    : 'bg-surface-secondary/70 hover:bg-surface-secondary text-ink-muted hover:text-ink-primary'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-surface-card text-ink-muted'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
          <div className="ml-auto hidden lg:flex items-center gap-1.5 text-xs text-ink-muted bg-surface-secondary/60 px-3 py-1.5 rounded-xl shrink-0">
            <span>Total Nilai Usulan:</span>
            <span className="font-extrabold text-[#176B4D] font-mono">{formatCompactIDR(totalProposedBudget)}</span>
          </div>
        </div>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="bg-surface-card p-3 rounded-2xl border border-border-subtle shadow-card grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nomor berkas, judul usulan, atau kabupaten..."
            className="w-full pl-9 pr-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
          />
        </div>

        <div className="md:col-span-4">
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
            <option value="all">Semua Lembaga Pengusul</option>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Proposals Content Views */}
      {filteredProposals.length === 0 ? (
        <EmptyState
          title="Tidak Ada Proposal Ditemukan"
          description="Tidak ada usulan proposal yang cocok dengan kriteria filter kurasi saat ini."
          actionLabel="Atur Ulang Filter"
          onAction={() => {
            setSearch('');
            setStatusFilter('all');
            setCategoryFilter('all');
            setPartnerFilter('all');
          }}
        />
      ) : viewMode === 'docket' ? (
        /* KONSEP BARU: Curator's Review Dossier (NO PHOTO COVERS - Distinct Executive Document Docket) */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProposals.map((prop) => {
            const partner = partners.find((p) => p.id === prop.partnerId);
            const catInfo = CATEGORY_LABELS[prop.category];
            const isPending = prop.status === 'submitted' || prop.status === 'under_review';
            const unitCost = prop.targetBeneficiaries > 0 ? Math.round(prop.proposedBudget / prop.targetBeneficiaries) : 0;

            const borderStatusColor =
              prop.status === 'submitted'
                ? 'border-l-amber-500 hover:border-l-amber-600'
                : prop.status === 'under_review'
                ? 'border-l-blue-600 hover:border-l-blue-700'
                : prop.status === 'approved' || prop.status === 'converted'
                ? 'border-l-emerald-600 hover:border-l-emerald-700'
                : 'border-l-rose-500 hover:border-l-rose-600';

            return (
              <div
                key={prop.id}
                onClick={() => setSelectedProposalForReview(prop)}
                className={`bg-white rounded-3xl border border-border-subtle border-l-4 ${borderStatusColor} p-5 hover:shadow-elevated transition-all duration-200 flex flex-col justify-between group cursor-pointer relative overflow-hidden`}
              >
                <div className="space-y-3.5">
                  {/* Top Docket Identification Strip */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-ink-secondary bg-surface-secondary px-2.5 py-1 rounded-lg border border-border-subtle">
                      <FileText className="w-3.5 h-3.5 text-[#176B4D]" />
                      <span>{prop.code}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${catInfo?.badgeBg || 'bg-gray-50'}`}>
                        {catInfo?.label || prop.category}
                      </span>
                      <StatusBadge status={prop.status} size="sm" />
                    </div>
                  </div>

                  {/* Proposal Headline & Proposer Info */}
                  <div>
                    <h3 className="font-extrabold text-base text-[#072418] group-hover:text-[#176B4D] transition-colors line-clamp-2 leading-snug">
                      {prop.title}
                    </h3>

                    {/* Proposer info chip */}
                    <div className="flex items-center justify-between text-xs text-ink-muted mt-2 pt-2 border-t border-border-subtle/80">
                      <div className="flex items-center gap-1.5 min-w-0 pr-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#176B4D] shrink-0" />
                        <span className="font-bold text-ink-secondary truncate" title={partner?.name}>
                          {partner?.name || 'Mitra Pelaksana'}
                        </span>
                      </div>
                      <span className="text-[11px] text-ink-muted flex items-center gap-1 shrink-0">
                        <MapPin className="w-3 h-3 text-ink-muted" /> {prop.province || prop.location}
                      </span>
                    </div>
                  </div>

                  {/* Financial & Impact Assessment Slate (3-Key Metrics) */}
                  <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-emerald-950/5 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block">
                          RAB Diajukan
                        </span>
                        <span className="text-base font-black text-[#176B4D]">
                          {formatCompactIDR(prop.proposedBudget)}
                        </span>
                        {unitCost > 0 && (
                          <span className="text-[10px] text-ink-muted block font-mono">
                            ≈ {formatCompactIDR(unitCost)}/jiwa
                          </span>
                        )}
                      </div>

                      <div className="border-l border-border-subtle/80 pl-2.5">
                        <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block">
                          Target Dampak
                        </span>
                        <span className="text-base font-black text-[#072418]">
                          {formatNumber(prop.targetBeneficiaries)} <span className="text-xs font-bold text-ink-muted">Jiwa</span>
                        </span>
                        <span className="text-[10px] text-ink-muted block font-mono">
                          Durasi {prop.estimatedDurationMonths} Bulan
                        </span>
                      </div>
                    </div>

                    {/* Readiness Checklist Micro-Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border-subtle/60 text-[10px]">
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> RAB Rinci
                      </span>
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Legalitas Valid
                      </span>
                      <span className="inline-flex items-center gap-1 text-ink-secondary bg-surface-secondary px-2 py-0.5 rounded-md font-medium">
                        KPI Terukur
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between gap-2">
                  <span className="text-[11px] text-ink-muted font-mono">
                    Diajukan: {formatDateID(prop.submittedAt)}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProposalForReview(prop);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                      isPending
                        ? 'bg-[#072418] hover:bg-[#176B4D] text-[#FDE047] shadow-2xs'
                        : 'bg-surface-secondary hover:bg-surface-muted text-ink-primary'
                    }`}
                  >
                    <span>{isPending ? 'Buka & Kurasi' : 'Detail Telaah'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : viewMode === 'kanban' ? (
        /* KONSEP BARU: Interactive Proposal Curation Kanban Board */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Kolom 1: Menunggu Kurasi */}
          <div className="bg-[#FAFBF9] rounded-3xl border border-amber-200/80 p-4 space-y-3.5 flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <h3 className="font-extrabold text-xs text-[#072418] uppercase tracking-wider">
                  1. Menunggu Kurasi
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {proposals.filter((p) => p.status === 'submitted').length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {proposals.filter((p) => p.status === 'submitted').length === 0 ? (
                <div className="p-6 text-center text-xs text-ink-muted border border-dashed border-amber-200 rounded-2xl">
                  Tidak ada berkas yang menunggu kurasi
                </div>
              ) : (
                proposals
                  .filter((p) => p.status === 'submitted')
                  .map((prop) => {
                    const partner = partners.find((p) => p.id === prop.partnerId);
                    return (
                      <div
                        key={prop.id}
                        onClick={() => setSelectedProposalForReview(prop)}
                        className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs hover:shadow-card hover:border-amber-400 transition-all cursor-pointer space-y-2.5 group"
                      >
                        <div className="flex items-center justify-between text-[10px] text-ink-muted">
                          <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                            {prop.code}
                          </span>
                          <span>{formatDateID(prop.submittedAt)}</span>
                        </div>
                        <h4 className="font-bold text-xs text-[#072418] group-hover:text-amber-800 transition-colors line-clamp-2">
                          {prop.title}
                        </h4>
                        <div className="text-[11px] text-ink-muted truncate">
                          {partner?.name || 'Mitra Pengusul'}
                        </div>
                        <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs">
                          <span className="font-extrabold text-[#176B4D]">
                            {formatCompactIDR(prop.proposedBudget)}
                          </span>
                          <span className="text-[10px] font-bold text-[#072418] bg-amber-100/80 px-2 py-0.5 rounded-md">
                            Tinjau ➔
                          </span>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>

          {/* Kolom 2: Dalam Peninjauan Teknis */}
          <div className="bg-[#FAFBF9] rounded-3xl border border-blue-200/80 p-4 space-y-3.5 flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-blue-200/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <h3 className="font-extrabold text-xs text-[#072418] uppercase tracking-wider">
                  2. Review Teknis & RAB
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {proposals.filter((p) => p.status === 'under_review').length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {proposals.filter((p) => p.status === 'under_review').length === 0 ? (
                <div className="p-6 text-center text-xs text-ink-muted border border-dashed border-blue-200 rounded-2xl">
                  Tidak ada proposal dalam proses review
                </div>
              ) : (
                proposals
                  .filter((p) => p.status === 'under_review')
                  .map((prop) => {
                    const partner = partners.find((p) => p.id === prop.partnerId);
                    return (
                      <div
                        key={prop.id}
                        onClick={() => setSelectedProposalForReview(prop)}
                        className="bg-white p-4 rounded-2xl border border-blue-200 shadow-2xs hover:shadow-card hover:border-blue-400 transition-all cursor-pointer space-y-2.5 group"
                      >
                        <div className="flex items-center justify-between text-[10px] text-ink-muted">
                          <span className="font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                            {prop.code}
                          </span>
                          <span>Review Berjalan</span>
                        </div>
                        <h4 className="font-bold text-xs text-[#072418] group-hover:text-blue-800 transition-colors line-clamp-2">
                          {prop.title}
                        </h4>
                        <div className="text-[11px] text-ink-muted truncate">
                          {partner?.name || 'Mitra Pengusul'}
                        </div>
                        <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs">
                          <span className="font-extrabold text-blue-700">
                            {formatCompactIDR(prop.proposedBudget)}
                          </span>
                          <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-md">
                            Lanjutkan ➔
                          </span>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>

          {/* Kolom 3: Disetujui & Siap Didanai */}
          <div className="bg-[#FAFBF9] rounded-3xl border border-emerald-200/80 p-4 space-y-3.5 flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-200/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-extrabold text-xs text-[#072418] uppercase tracking-wider">
                  3. Lolos & Disetujui
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {proposals.filter((p) => p.status === 'approved' || p.status === 'converted').length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {proposals.filter((p) => p.status === 'approved' || p.status === 'converted').length === 0 ? (
                <div className="p-6 text-center text-xs text-ink-muted border border-dashed border-emerald-200 rounded-2xl">
                  Belum ada proposal yang disetujui
                </div>
              ) : (
                proposals
                  .filter((p) => p.status === 'approved' || p.status === 'converted')
                  .map((prop) => {
                    const partner = partners.find((p) => p.id === prop.partnerId);
                    return (
                      <div
                        key={prop.id}
                        onClick={() => setSelectedProposalForReview(prop)}
                        className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs hover:shadow-card hover:border-emerald-400 transition-all cursor-pointer space-y-2.5 group"
                      >
                        <div className="flex items-center justify-between text-[10px] text-ink-muted">
                          <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {prop.code}
                          </span>
                          <span className="text-emerald-700 font-bold">Siap Didanai</span>
                        </div>
                        <h4 className="font-bold text-xs text-[#072418] group-hover:text-emerald-800 transition-colors line-clamp-2">
                          {prop.title}
                        </h4>
                        <div className="text-[11px] text-ink-muted truncate">
                          {partner?.name || 'Mitra Pengusul'}
                        </div>
                        <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs">
                          <span className="font-extrabold text-[#176B4D]">
                            {formatCompactIDR(prop.proposedBudget)}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                            Lihat PKS ➔
                          </span>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Tabel Eksekutif */
        <div className="bg-surface-card rounded-3xl border border-border-subtle shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAF8] border-b border-border-subtle text-[11px] font-extrabold text-ink-secondary uppercase tracking-wider">
                  <th className="py-3.5 px-4">Nomor & Berkas Usulan</th>
                  <th className="py-3.5 px-4">Lembaga Pengusul</th>
                  <th className="py-3.5 px-4">Sektor</th>
                  <th className="py-3.5 px-4">RAB Diajukan</th>
                  <th className="py-3.5 px-4">Target Dampak</th>
                  <th className="py-3.5 px-4">Status Kurasi</th>
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
                        <div className="font-bold text-[#072418] line-clamp-1">{prop.title}</div>
                        <div className="text-[11px] text-ink-muted flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-ink-muted" /> {prop.location}
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
