import React, { useState, useMemo } from 'react';
import {
  FileCheck2,
  Plus,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Kanban,
  Building2,
  MapPin,
  Users,
  Send,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Compass
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProposalFormModal } from './ProposalFormModal';
import { ProposalReviewModal } from './ProposalReviewModal';
import { CommunityAspirationModal } from '../programs/CommunityAspirationModal';
import { formatCompactIDR, formatIDR, formatDateID, CATEGORY_LABELS } from '../../lib/formatters';
import { Proposal, CommunityAspiration } from '../../types/csr';

export const ProposalsPage: React.FC = () => {
  const { proposals, partners, aspirations, updateAspirationStatus } = useCSRStore();
  const [activeTab, setActiveTab] = useState<'proposals' | 'aspirations'>('proposals');
  const [isAspirationModalOpen, setIsAspirationModalOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'budget'>('date');
  const [viewMode, setViewMode] = useState<'table' | 'kanban' | 'grid'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProposalForReview, setSelectedProposalForReview] = useState<Proposal | null>(null);

  const filteredProposals = useMemo(() => {
    const list = proposals.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.code.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });

    return list.sort((a, b) => {
      if (sortBy === 'budget') return b.proposedBudget - a.proposedBudget;
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    });
  }, [proposals, search, statusFilter, categoryFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProposals.length / pageSize));
  const paginatedProposals = filteredProposals.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const submittedCount = proposals.filter((p) => p.status === 'submitted').length;
  const reviewCount = proposals.filter((p) => p.status === 'under_review').length;
  const approvedCount = proposals.filter((p) => p.status === 'approved' || p.status === 'converted').length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 space-y-6 animate-in fade-in duration-200">
      {/* 1. Header & Tab Switcher Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {activeTab === 'proposals' ? 'Proposal Kemitraan CSR' : 'Kanal Aspirasi Kebutuhan Desa (Musrenbang CSR)'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeTab === 'proposals'
              ? 'Kurasi usulan program kemitraan dari Lembaga & Yayasan Pelaksana (NGO)'
              : 'Daftar usulan kebutuhan pembangunan daerah langsung dari Pemerintah Desa & Komunitas'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center p-1 bg-slate-100/90 rounded-2xl">
            <button
              onClick={() => setActiveTab('proposals')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'proposals'
                  ? 'bg-white text-[#176B4D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Proposal Mitra ({proposals.length})
            </button>
            <button
              onClick={() => setActiveTab('aspirations')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'aspirations'
                  ? 'bg-white text-[#176B4D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Aspirasi Desa ({aspirations.length})
            </button>
          </div>

          {activeTab === 'proposals' ? (
            <button
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white font-semibold text-xs transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Ajukan Proposal Baru</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAspirationModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white font-semibold text-xs transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Ajukan Kebutuhan Desa</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'aspirations' ? (
        /* Aspirations Community View */
        <div className="space-y-6">
          {/* Aspirations KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-amber-50/90 border border-amber-200/80 p-5">
              <span className="text-xs font-semibold text-amber-800 block">Menunggu Telaah</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-amber-950">
                  {aspirations.filter(a => a.status === 'menunggu_telaah').length}
                </span>
                <span className="text-[10px] text-amber-700">Usulan Desa</span>
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50/90 border border-blue-200/80 p-5">
              <span className="text-xs font-semibold text-blue-800 block">Terverifikasi Bappeda</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-blue-950">
                  {aspirations.filter(a => a.status === 'diverifikasi').length}
                </span>
                <span className="text-[10px] text-blue-700">Siap Fasilitasi</span>
              </div>
            </div>

            <div className="rounded-2xl bg-[#EBF6F1] border border-emerald-200/80 p-5">
              <span className="text-xs font-semibold text-[#176B4D] block">Masuk Buku Menu Kemitraan</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-[#072418]">
                  {aspirations.filter(a => a.status === 'masuk_buku_menu').length}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">Siap Didanai Funder</span>
              </div>
            </div>

            <div className="rounded-2xl bg-purple-50/90 border border-purple-200/80 p-5">
              <span className="text-xs font-semibold text-purple-800 block">Didukung Funder (Didanai)</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-purple-950">
                  {aspirations.filter(a => a.status === 'didukung_funder').length}
                </span>
                <span className="text-[10px] text-purple-700 font-bold">Terdanai Penuh</span>
              </div>
            </div>
          </div>

          {/* Aspirations Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-150 text-[11px] font-semibold text-slate-400">
                  <th className="py-3 px-3">Tiket &amp; Pengusul</th>
                  <th className="py-3 px-3">Desa / Wilayah</th>
                  <th className="py-3 px-3">Judul Usulan Kebutuhan</th>
                  <th className="py-3 px-3">Estimasi Biaya</th>
                  <th className="py-3 px-3">Sasaran</th>
                  <th className="py-3 px-3">Tingkat Urgensi</th>
                  <th className="py-3 px-3">Status Telaah</th>
                  <th className="py-3 px-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {aspirations.map((asp) => (
                  <tr key={asp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3">
                      <span className="font-mono font-bold text-slate-900 block">{asp.ticketCode}</span>
                      <span className="text-[11px] text-slate-500">{asp.applicantName} ({asp.applicantRole})</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-slate-800 block">{asp.village}</span>
                      <span className="text-[11px] text-slate-400">{asp.district}, {asp.regency}</span>
                    </td>
                    <td className="py-3.5 px-3 max-w-[260px]">
                      <span className="font-bold text-slate-800 block leading-snug">{asp.title}</span>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{asp.problemDescription}</span>
                    </td>
                    <td className="py-3.5 px-3 font-extrabold text-[#176B4D] whitespace-nowrap">
                      {formatCompactIDR(asp.estimatedBudget)}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                      {asp.estimatedBeneficiaries.toLocaleString('id-ID')} Warga
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          asp.urgencyLevel === 'sangat_mendesak'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : asp.urgencyLevel === 'tinggi'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {asp.urgencyLevel === 'sangat_mendesak'
                          ? 'Sangat Mendesak'
                          : asp.urgencyLevel === 'tinggi'
                          ? 'Tinggi'
                          : 'Sedang'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          asp.status === 'masuk_buku_menu'
                            ? 'bg-emerald-100 text-emerald-800'
                            : asp.status === 'didukung_funder'
                            ? 'bg-purple-100 text-purple-800'
                            : asp.status === 'diverifikasi'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {asp.status === 'masuk_buku_menu'
                          ? 'Masuk Buku Menu'
                          : asp.status === 'didukung_funder'
                          ? 'Didukung Funder'
                          : asp.status === 'diverifikasi'
                          ? 'Diverifikasi Bappeda'
                          : 'Menunggu Telaah'}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right whitespace-nowrap">
                      {asp.status === 'menunggu_telaah' && (
                        <button
                          onClick={() => updateAspirationStatus(asp.id, 'diverifikasi')}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-[11px] font-bold cursor-pointer transition-colors"
                        >
                          Verifikasi
                        </button>
                      )}
                      {asp.status === 'diverifikasi' && (
                        <button
                          onClick={() => updateAspirationStatus(asp.id, 'masuk_buku_menu')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#176B4D] hover:bg-emerald-100 text-[11px] font-bold cursor-pointer transition-colors"
                        >
                          + Buku Menu
                        </button>
                      )}
                      {asp.status === 'masuk_buku_menu' && (
                        <span className="text-[10px] text-emerald-600 font-semibold">Terkurasi</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">

      {/* 2. 4 Soft Pastel Status Summary Cards with Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Baru Masuk (Soft Mint) */}
        <div
          onClick={() => {
            setStatusFilter(statusFilter === 'submitted' ? 'all' : 'submitted');
            setCurrentPage(1);
          }}
          className="rounded-2xl bg-[#EBF6F1] p-5 flex items-center justify-between cursor-pointer hover:brightness-98 transition-all"
        >
          <div>
            <div className="text-xs font-medium text-slate-500">Baru Masuk</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {submittedCount}
            </div>
            <div className="text-[11px] font-bold text-[#176B4D] mt-1">
              +15% <span className="font-normal text-slate-400">bulan ini</span>
            </div>
          </div>
          <svg viewBox="0 0 80 36" className="w-20 h-9 overflow-visible shrink-0">
            <path
              d="M2,28 C16,26 24,14 38,18 C52,22 64,6 78,10"
              fill="none"
              stroke="#176B4D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Card 2: Dalam Proses (Soft Cream) */}
        <div
          onClick={() => {
            setStatusFilter(statusFilter === 'under_review' ? 'all' : 'under_review');
            setCurrentPage(1);
          }}
          className="rounded-2xl bg-[#FEF6E7] p-5 flex items-center justify-between cursor-pointer hover:brightness-98 transition-all"
        >
          <div>
            <div className="text-xs font-medium text-slate-500">Dalam Tinjauan</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {reviewCount}
            </div>
            <div className="text-[11px] font-bold text-[#D97706] mt-1">
              +10% <span className="font-normal text-slate-400">aktif</span>
            </div>
          </div>
          <svg viewBox="0 0 80 36" className="w-20 h-9 overflow-visible shrink-0">
            <path
              d="M2,24 C18,16 30,28 46,16 C60,8 68,14 78,6"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Card 3: Disetujui / Dikonversi (Soft Teal) */}
        <div
          onClick={() => {
            setStatusFilter(statusFilter === 'approved' ? 'all' : 'approved');
            setCurrentPage(1);
          }}
          className="rounded-2xl bg-[#EBF7F5] p-5 flex items-center justify-between cursor-pointer hover:brightness-98 transition-all"
        >
          <div>
            <div className="text-xs font-medium text-slate-500">Disetujui</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {approvedCount}
            </div>
            <div className="text-[11px] font-bold text-[#0D9488] mt-1">
              +22% <span className="font-normal text-slate-400">lolos</span>
            </div>
          </div>
          <svg viewBox="0 0 80 36" className="w-20 h-9 overflow-visible shrink-0">
            <path
              d="M2,30 C18,24 32,20 48,14 C62,10 70,12 78,4"
              fill="none"
              stroke="#14B8A6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Card 4: Total Berkas (Soft Lavender) */}
        <div
          onClick={() => {
            setStatusFilter('all');
            setCurrentPage(1);
          }}
          className="rounded-2xl bg-[#F3F1FA] p-5 flex items-center justify-between cursor-pointer hover:brightness-98 transition-all"
        >
          <div>
            <div className="text-xs font-medium text-slate-500">Total Usulan</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {proposals.length}
            </div>
            <div className="text-[11px] font-bold text-[#6366F1] mt-1">
              100% <span className="font-normal text-slate-400">terdata</span>
            </div>
          </div>
          <svg viewBox="0 0 80 36" className="w-20 h-9 overflow-visible shrink-0">
            <path
              d="M2,26 C18,28 28,12 44,18 C58,22 68,8 78,10"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* 3. Minimalist Search, Filter & Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari proposal..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/15 transition-all"
            />
          </div>

          {/* Status Filter Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50/90 rounded-xl text-xs text-slate-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Status</option>
              <option value="submitted">Baru Masuk</option>
              <option value="under_review">Dalam Tinjauan</option>
              <option value="approved">Disetujui</option>
              <option value="converted">Dikonversi</option>
              <option value="rejected">Ditolak</option>
            </select>
          </div>

          {/* Category Filter Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50/90 rounded-xl text-xs text-slate-600">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Sektor</option>
              {Object.entries(CATEGORY_LABELS).map(([key, cat]) => (
                <option key={key} value={key}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: View Mode + Sort */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="inline-flex items-center p-1 bg-slate-50 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#176B4D] shadow-2xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Tampilan Tabel"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white text-[#176B4D] shadow-2xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Tampilan Papan"
            >
              <Kanban className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#176B4D] shadow-2xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Tampilan Kartu"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50/90 rounded-xl text-xs text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'budget')}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="date">Tanggal Pengajuan</option>
              <option value="budget">Nilai RAB</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Data Display */}
      {filteredProposals.length === 0 ? (
        <EmptyState
          icon={FileCheck2}
          title="Proposal tidak ditemukan"
          description="Tidak ada usulan proposal yang cocok dengan pencarian atau filter Anda."
          actionLabel="Reset Filter"
          onAction={() => {
            setSearch('');
            setStatusFilter('all');
            setCategoryFilter('all');
          }}
        />
      ) : viewMode === 'table' ? (
        /* Clean Borderless Minimalist Table */
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-medium text-slate-400">
                  <th className="py-3.5 px-3 font-medium">Usulan Proposal</th>
                  <th className="py-3.5 px-3 font-medium">Mitra Pengusul</th>
                  <th className="py-3.5 px-3 font-medium">Lokasi Target</th>
                  <th className="py-3.5 px-3 font-medium">Tgl Masuk</th>
                  <th className="py-3.5 px-3 font-medium">Usulan RAB</th>
                  <th className="py-3.5 px-3 font-medium">Status</th>
                  <th className="py-3.5 px-3 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {paginatedProposals.map((proposal) => {
                  const partner = partners.find((pt) => pt.id === proposal.partnerId);

                  return (
                    <tr
                      key={proposal.id}
                      onClick={() => setSelectedProposalForReview(proposal)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-3 max-w-xs">
                        <div className="font-bold text-slate-800 group-hover:text-[#176B4D] transition-colors line-clamp-1">
                          {proposal.title}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {proposal.code} • {CATEGORY_LABELS[proposal.category].label}
                        </div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#E8F6F0] text-[#176B4D] font-bold text-[10px] flex items-center justify-center shrink-0">
                            {partner?.name.substring(0, 2).toUpperCase() || 'MP'}
                          </div>
                          <span className="font-medium text-slate-700 line-clamp-1">
                            {partner?.name || '-'}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-3 text-slate-500">
                        {proposal.location}
                      </td>

                      <td className="py-4 px-3 text-slate-500">
                        {formatDateID(proposal.submittedAt)}
                      </td>

                      <td className="py-4 px-3 font-bold text-slate-800">
                        {formatCompactIDR(proposal.proposedBudget)}
                      </td>

                      <td className="py-4 px-3">
                        <StatusBadge status={proposal.status} />
                      </td>

                      <td className="py-4 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProposalForReview(proposal);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Evaluasi Proposal"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Minimalist Pagination Bar */}
          <div className="flex items-center justify-between pt-5 border-t border-slate-100 text-xs text-slate-400">
            <div>
              {(currentPage - 1) * pageSize + 1}-
              {Math.min(currentPage * pageSize, filteredProposals.length)} dari{' '}
              {filteredProposals.length}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === page
                      ? 'bg-[#176B4D] text-white shadow-2xs'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : viewMode === 'kanban' ? (
        /* Clean Minimalist Kanban */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { key: 'submitted', title: 'Baru Masuk', bg: 'bg-[#EBF6F1]/50' },
            { key: 'under_review', title: 'Dalam Tinjauan', bg: 'bg-[#FEF6E7]/60' },
            { key: 'approved', title: 'Disetujui', bg: 'bg-[#EBF7F5]/60' },
            { key: 'converted', title: 'Dikonversi', bg: 'bg-[#F3F1FA]/60' },
          ].map((col) => {
            const colProposals = filteredProposals.filter((p) => p.status === col.key);
            return (
              <div key={col.key} className={`rounded-2xl p-4 ${col.bg} space-y-3`}>
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-700">{col.title}</span>
                  <span className="text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md">
                    {colProposals.length}
                  </span>
                </div>
                <div className="space-y-2.5">
                  {colProposals.map((proposal) => {
                    const partner = partners.find((pt) => pt.id === proposal.partnerId);
                    return (
                      <div
                        key={proposal.id}
                        onClick={() => setSelectedProposalForReview(proposal)}
                        className="bg-white rounded-xl p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-2"
                      >
                        <div className="text-[10px] font-semibold text-slate-400">
                          {proposal.code} • {CATEGORY_LABELS[proposal.category].label}
                        </div>
                        <div className="text-xs font-bold text-slate-800 line-clamp-2">
                          {proposal.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {partner?.name}
                        </div>
                        <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                          <span className="text-xs font-bold text-[#176B4D]">
                            {formatCompactIDR(proposal.proposedBudget)}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {formatDateID(proposal.submittedAt)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Clean Minimalist Grid Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProposals.map((proposal) => {
            const partner = partners.find((pt) => pt.id === proposal.partnerId);
            return (
              <div
                key={proposal.id}
                onClick={() => setSelectedProposalForReview(proposal)}
                className="rounded-2xl bg-slate-50/70 hover:bg-slate-50 p-5 transition-all cursor-pointer flex flex-col justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-semibold text-slate-400">
                      {proposal.code}
                    </span>
                    <StatusBadge status={proposal.status} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#176B4D] transition-colors line-clamp-2">
                    {proposal.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {partner?.name} • {proposal.location}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Usulan RAB</span>
                  <span className="font-bold text-slate-800">
                    {formatCompactIDR(proposal.proposedBudget)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
      )}

      {/* Modals */}
      <ProposalFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <ProposalReviewModal
        isOpen={!!selectedProposalForReview}
        onClose={() => setSelectedProposalForReview(null)}
        proposal={selectedProposalForReview}
      />

      {/* Community Aspiration (Musrenbang CSR) Modal */}
      <CommunityAspirationModal
        isOpen={isAspirationModalOpen}
        onClose={() => setIsAspirationModalOpen(false)}
      />
    </div>
  );
};
