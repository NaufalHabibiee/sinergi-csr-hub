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
  FileText,
  Kanban,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  ArrowRight
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

  const pendingCount = useMemo(
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
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Ringkas & Tenang (Tanpa Border Berlapis) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-[#072418] tracking-tight">
              Kurasi Proposal Hibah CSR
            </h1>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/80">
                {pendingCount} Butuh Keputusan
              </span>
            )}
          </div>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            Daftar pengajuan inisiatif dari mitra pelaksana yang sedang melalui proses evaluasi kelayakan teknis, verifikasi RAB, dan uji dampak.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          {/* View Mode Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100">
            <button
              onClick={() => setViewMode('docket')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'docket'
                  ? 'bg-white text-[#072418] shadow-xs'
                  : 'text-ink-muted hover:text-ink-primary'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Berkas</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white text-[#072418] shadow-xs'
                  : 'text-ink-muted hover:text-ink-primary'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#072418] shadow-xs'
                  : 'text-ink-muted hover:text-ink-primary'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#072418] hover:bg-[#176B4D] text-[#FDE047] text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Usulkan Proposal</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Bar Rapi & Sederhana */}
      <div className="space-y-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {pipelineTabs.map((tab) => {
            const count = statusCounts[tab.key] || 0;
            const isActive = statusFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#072418] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Category Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kode proposal, judul kegiatan, atau wilayah sasaran..."
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#176B4D] transition-colors"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:border-[#176B4D] cursor-pointer"
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
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:border-[#176B4D] cursor-pointer"
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
      </div>

      {/* 3. Tampilan Konten Proposal (KONSEP DOCKET / DOSSIER FEED: RAPI, LEGA, TANPA BORDER BERLAPIS) */}
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
      ) : viewMode === 'docket' ? (
        /* Docket Cards (2 Kolom Lega, Bersih, Tipografi Jelas) */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProposals.map((prop) => {
            const partner = partners.find((p) => p.id === prop.partnerId);
            const catInfo = CATEGORY_LABELS[prop.category];
            const isPending = prop.status === 'submitted' || prop.status === 'under_review';

            return (
              <div
                key={prop.id}
                onClick={() => setSelectedProposalForReview(prop)}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:border-[#176B4D] hover:shadow-sm transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Top Baris: ID Berkas, Sektor, & Status */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {prop.code}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 text-[11px]">
                        {formatDateID(prop.submittedAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded">
                        {catInfo?.label || prop.category}
                      </span>
                      <StatusBadge status={prop.status} size="sm" />
                    </div>
                  </div>

                  {/* Judul & Pengusul */}
                  <div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#176B4D] transition-colors leading-snug">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <span className="font-semibold text-slate-700">{partner?.name || 'Mitra Pengusul'}</span>
                      <span>—</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" /> {prop.province || prop.location}
                      </span>
                    </p>
                  </div>

                  {/* Ringkasan Masalah (Singkat & Enak Dibaca) */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {prop.problemStatement}
                  </p>
                </div>

                {/* Bagian Bawah: Metrik 3 Kolom Bersih (TANPA KOTAK BERLAPIS) & Tombol Aksi */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-5 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                        Usulan RAB
                      </span>
                      <span className="text-sm font-extrabold text-[#176B4D]">
                        {formatCompactIDR(prop.proposedBudget)}
                      </span>
                    </div>

                    <div className="border-l border-slate-200 pl-4">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                        Target Dampak
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        {formatNumber(prop.targetBeneficiaries)} Jiwa
                      </span>
                    </div>

                    <div className="border-l border-slate-200 pl-4">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                        Durasi
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        {prop.estimatedDurationMonths} Bulan
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProposalForReview(prop);
                    }}
                    className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isPending
                        ? 'bg-[#072418] hover:bg-[#176B4D] text-[#FDE047]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{isPending ? 'Tinjau Proposal' : 'Lihat Detail'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : viewMode === 'kanban' ? (
        /* Kanban Pipeline View (Rapi & Minimalis) */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Kolom 1 */}
          <div className="bg-slate-50/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                1. Menunggu Kurasi
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {proposals.filter((p) => p.status === 'submitted').length}
              </span>
            </div>
            <div className="space-y-3">
              {proposals
                .filter((p) => p.status === 'submitted')
                .map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => setSelectedProposalForReview(prop)}
                    className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 shadow-2xs transition-all cursor-pointer space-y-2"
                  >
                    <div className="text-[10px] font-mono text-slate-400">{prop.code}</div>
                    <div className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                      {prop.title}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="font-extrabold text-[#176B4D]">{formatCompactIDR(prop.proposedBudget)}</span>
                      <span className="text-slate-500 text-[11px]">{formatNumber(prop.targetBeneficiaries)} Jiwa</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Kolom 2 */}
          <div className="bg-slate-50/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                2. Dalam Peninjauan
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {proposals.filter((p) => p.status === 'under_review').length}
              </span>
            </div>
            <div className="space-y-3">
              {proposals
                .filter((p) => p.status === 'under_review')
                .map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => setSelectedProposalForReview(prop)}
                    className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 shadow-2xs transition-all cursor-pointer space-y-2"
                  >
                    <div className="text-[10px] font-mono text-slate-400">{prop.code}</div>
                    <div className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                      {prop.title}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="font-extrabold text-blue-700">{formatCompactIDR(prop.proposedBudget)}</span>
                      <span className="text-slate-500 text-[11px]">{formatNumber(prop.targetBeneficiaries)} Jiwa</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Kolom 3 */}
          <div className="bg-slate-50/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                3. Disetujui
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {proposals.filter((p) => p.status === 'approved' || p.status === 'converted').length}
              </span>
            </div>
            <div className="space-y-3">
              {proposals
                .filter((p) => p.status === 'approved' || p.status === 'converted')
                .map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => setSelectedProposalForReview(prop)}
                    className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 shadow-2xs transition-all cursor-pointer space-y-2"
                  >
                    <div className="text-[10px] font-mono text-slate-400">{prop.code}</div>
                    <div className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                      {prop.title}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="font-extrabold text-[#176B4D]">{formatCompactIDR(prop.proposedBudget)}</span>
                      <span className="text-emerald-700 font-semibold text-[11px]">Siap Didanai</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        /* Tabel Eksekutif */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Kode & Judul Usulan</th>
                  <th className="py-3 px-4">Lembaga Pengusul</th>
                  <th className="py-3 px-4">Sektor</th>
                  <th className="py-3 px-4">Usulan RAB</th>
                  <th className="py-3 px-4">Target</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProposals.map((prop) => {
                  const partner = partners.find((p) => p.id === prop.partnerId);
                  const catInfo = CATEGORY_LABELS[prop.category];
                  return (
                    <tr
                      key={prop.id}
                      onClick={() => setSelectedProposalForReview(prop)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-mono text-[10px] text-slate-400">{prop.code} • {formatDateID(prop.submittedAt)}</div>
                        <div className="font-bold text-slate-800 line-clamp-1">{prop.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{prop.location}</div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {partner?.name || 'Mitra Sosial'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {catInfo?.label || prop.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#176B4D]">
                        {formatCompactIDR(prop.proposedBudget)}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
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
                          className="px-3 py-1.5 rounded-lg bg-[#072418] text-[#FDE047] font-bold text-xs hover:bg-[#176B4D] transition-colors cursor-pointer"
                        >
                          Tinjau
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
