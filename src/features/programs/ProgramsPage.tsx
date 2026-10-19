import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProgramFormModal } from './ProgramFormModal';
import { formatCompactIDR, formatDateID, formatNumber, CATEGORY_LABELS } from '../../lib/formatters';

export const ProgramsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { programs, partners, funders } = useCSRStore();

  const isCreateOpen = searchParams.get('action') === 'create';
  const [editingProgram, setEditingProgram] = useState<any>(null);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'budget' | 'progress'>('newest');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const stats = useMemo(() => {
    const activeCount = programs.filter((p) => p.status === 'active').length;
    const reviewCount = programs.filter((p) => p.status === 'draft' || p.status === 'under_review').length;
    const completedCount = programs.filter((p) => p.status === 'completed').length;
    const totalCount = programs.length;
    return { activeCount, reviewCount, completedCount, totalCount };
  }, [programs]);

  const filteredPrograms = useMemo(() => {
    return programs
      .filter((p) => {
        const matchesSearch =
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.code.toLowerCase().includes(search.toLowerCase()) ||
          p.location.toLowerCase().includes(search.toLowerCase());
        const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
        return matchesSearch && matchesCat && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'budget') return b.approvedBudget - a.approvedBudget;
        if (sortBy === 'progress') return b.progressPercent - a.progressPercent;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [programs, search, categoryFilter, statusFilter, sortBy]);

  const openCreateModal = () => setSearchParams({ action: 'create' });
  const closeCreateModal = () => {
    searchParams.delete('action');
    setSearchParams(searchParams);
  };

  return (
    <div className="animate-in fade-in duration-200">
      {/* Main Minimalist White Container (Matches Reference Screen 2 "Gestion des commandes") */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 space-y-6">
        {/* 1. Top Header & Primary Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Manajemen Program CSR
          </h1>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-semibold transition-all shadow-sm shadow-[#176B4D]/20 cursor-pointer self-start sm:self-auto"
          >
            <span>Program Baru</span>
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Row of 4 Tinted Pastel KPI Cards with Subtle Sparkline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Soft Mint/Green */}
          <div
            onClick={() => setStatusFilter('all')}
            className={`rounded-2xl p-4 bg-[#EBF6F1] cursor-pointer transition-all flex items-center justify-between ${
              statusFilter === 'all' ? 'ring-2 ring-[#176B4D]/30' : 'hover:opacity-90'
            }`}
          >
            <div>
              <span className="text-xs font-semibold text-[#176B4D] block">Semua Program</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-[#072418]">{stats.totalCount}</span>
                <span className="text-[10px] font-bold text-emerald-600">▲ 12%</span>
                <span className="text-[10px] text-slate-400">vs kwartal lalu</span>
              </div>
            </div>
            <svg viewBox="0 0 70 30" className="w-16 h-8 overflow-visible shrink-0">
              <path
                d="M0,24 Q18,10 35,18 T70,8"
                fill="none"
                stroke="#176B4D"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Card 2: Soft Amber/Cream */}
          <div
            onClick={() => setStatusFilter('under_review')}
            className={`rounded-2xl p-4 bg-[#FEF6E7] cursor-pointer transition-all flex items-center justify-between ${
              statusFilter === 'under_review' ? 'ring-2 ring-amber-400/50' : 'hover:opacity-90'
            }`}
          >
            <div>
              <span className="text-xs font-semibold text-amber-700 block">Dalam Evaluasi</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-amber-600">{stats.reviewCount}</span>
                <span className="text-[10px] font-bold text-amber-600">▲ 2%</span>
                <span className="text-[10px] text-slate-400">vs bulan lalu</span>
              </div>
            </div>
            <svg viewBox="0 0 70 30" className="w-16 h-8 overflow-visible shrink-0">
              <path
                d="M0,20 Q20,26 40,14 T70,12"
                fill="none"
                stroke="#D97706"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Card 3: Soft Emerald/Teal */}
          <div
            onClick={() => setStatusFilter('active')}
            className={`rounded-2xl p-4 bg-[#EBF7F5] cursor-pointer transition-all flex items-center justify-between ${
              statusFilter === 'active' ? 'ring-2 ring-teal-500/30' : 'hover:opacity-90'
            }`}
          >
            <div>
              <span className="text-xs font-semibold text-teal-800 block">Sedang Berjalan</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-slate-900">{stats.activeCount}</span>
                <span className="text-[10px] font-bold text-emerald-600">▲ 5%</span>
                <span className="text-[10px] text-slate-400">vs bulan lalu</span>
              </div>
            </div>
            <svg viewBox="0 0 70 30" className="w-16 h-8 overflow-visible shrink-0">
              <path
                d="M0,25 Q22,12 45,16 T70,6"
                fill="none"
                stroke="#0D9488"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Card 4: Soft Slate/Lavender */}
          <div
            onClick={() => setStatusFilter('completed')}
            className={`rounded-2xl p-4 bg-[#F3F1FA] cursor-pointer transition-all flex items-center justify-between ${
              statusFilter === 'completed' ? 'ring-2 ring-indigo-400/30' : 'hover:opacity-90'
            }`}
          >
            <div>
              <span className="text-xs font-semibold text-indigo-900 block">Tuntas / Selesai</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-indigo-950">{stats.completedCount}</span>
                <span className="text-[10px] font-bold text-emerald-600">▲ 1%</span>
                <span className="text-[10px] text-slate-400">vs bulan lalu</span>
              </div>
            </div>
            <svg viewBox="0 0 70 30" className="w-16 h-8 overflow-visible shrink-0">
              <path
                d="M0,22 Q20,16 42,10 T70,14"
                fill="none"
                stroke="#6366F1"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* 3. Minimalist Search, Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5 flex-1">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari program CSR..."
                className="w-full pl-9 pr-8 py-2 bg-slate-50/90 hover:bg-slate-100/70 focus:bg-white border border-transparent focus:border-slate-200 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-300 absolute right-3 top-2.5 pointer-events-none" />
            </div>

            {/* Category Filter Button Pill */}
            <div className="relative inline-flex items-center">
              <Filter className="w-3.5 h-3.5 text-slate-500 absolute left-3 pointer-events-none" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none bg-slate-50/90 hover:bg-slate-100/80 rounded-xl pl-8 pr-7 py-2 text-xs font-medium text-slate-600 focus:outline-none cursor-pointer"
              >
                <option value="all">Semua Sektor</option>
                <option value="lingkungan">Lingkungan</option>
                <option value="pendidikan">Pendidikan</option>
                <option value="ekonomi_umkm">Ekonomi UMKM</option>
                <option value="kesehatan">Kesehatan</option>
                <option value="infrastruktur">Infrastruktur</option>
                <option value="tanggap_bencana">Tanggap Bencana</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Right: View Switcher & Sort By */}
          <div className="flex items-center gap-2.5 self-end md:self-auto">
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-50">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#176B4D] shadow-2xs'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Tampilan Tabel Minimalis"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#176B4D] shadow-2xs'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Tampilan Kartu Minimalis"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative inline-flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-slate-50/90 hover:bg-slate-100/80 rounded-xl pl-3.5 pr-8 py-2 text-xs font-medium text-slate-600 focus:outline-none cursor-pointer"
              >
                <option value="newest">Urutkan tanggal</option>
                <option value="budget">Nilai Anggaran</option>
                <option value="progress">Progres Capaian</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 4. Minimalist Data Table or Clean Cards */}
        {filteredPrograms.length === 0 ? (
          <EmptyState
            title="Program Tidak Ditemukan"
            description="Tidak ada program CSR yang sesuai dengan kata kunci atau filter."
            actionLabel="Reset Filter"
            onAction={() => {
              setSearch('');
              setCategoryFilter('all');
              setStatusFilter('all');
            }}
          />
        ) : viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-medium text-slate-400">
                  <th className="py-3 px-3 font-medium">Kode Program</th>
                  <th className="py-3 px-3 font-medium">Mitra Pelaksana</th>
                  <th className="py-3 px-3 font-medium">Nama Program CSR</th>
                  <th className="py-3 px-3 font-medium">Anggaran</th>
                  <th className="py-3 px-3 font-medium">Mulai</th>
                  <th className="py-3 px-3 font-medium">Funder Korporat</th>
                  <th className="py-3 px-3 font-medium">Status</th>
                  <th className="py-3 px-2 text-right font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPrograms.map((p) => {
                  const partner = partners.find((pr) => pr.id === p.partnerId);
                  const funder = funders.find((fn) => fn.id === p.funderId);
                  return (
                    <tr
                      key={p.id}
                      onClick={() => navigate(`/dashboard/programs/${p.id}`)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                        {p.code}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 max-w-[160px] truncate">
                        {partner?.name || 'Mitra Pelaksana'}
                      </td>
                      <td className="py-3.5 px-3 font-medium text-slate-700 max-w-[240px] truncate group-hover:text-[#176B4D] transition-colors">
                        {p.title}
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                        {formatCompactIDR(p.approvedBudget)}
                      </td>
                      <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                        {formatDateID(p.startDate)}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 max-w-[160px] truncate">
                        {funder?.name || 'Corporate Funder'}
                      </td>
                      <td className="py-3.5 px-3">
                        <StatusBadge status={p.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProgram(p);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Edit Program"
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
        ) : (
          /* Minimalist Card Grid Option */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrograms.map((p) => {
              const partner = partners.find((pr) => pr.id === p.partnerId);
              const catInfo = CATEGORY_LABELS[p.category];
              return (
                <div
                  key={p.id}
                  onClick={() => navigate(`/dashboard/programs/${p.id}`)}
                  className="rounded-2xl p-5 bg-slate-50/50 hover:bg-white border border-slate-100 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-400">{p.code}</span>
                      <StatusBadge status={p.status} size="sm" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-800 line-clamp-2 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">{partner?.name}</p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{catInfo?.label}</span>
                      <span className="font-bold text-slate-800">{formatCompactIDR(p.approvedBudget)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#176B4D] rounded-full"
                        style={{ width: `${p.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 5. Minimalist Bottom Pagination Bar (Matches Reference Screen 2) */}
        <div className="flex items-center justify-end gap-3 pt-2 text-xs text-slate-400">
          <span>
            1-{filteredPrograms.length} dari {programs.length}
          </span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-50 text-slate-400 cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#176B4D] text-white font-semibold flex items-center justify-center shadow-2xs cursor-pointer">
              1
            </button>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-50 text-slate-600 font-medium flex items-center justify-center cursor-pointer">
              2
            </button>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-50 text-slate-400 cursor-pointer">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProgramFormModal isOpen={isCreateOpen} onClose={closeCreateModal} />
      {editingProgram && (
        <ProgramFormModal
          isOpen={true}
          onClose={() => setEditingProgram(null)}
          initialData={editingProgram}
        />
      )}
    </div>
  );
};
