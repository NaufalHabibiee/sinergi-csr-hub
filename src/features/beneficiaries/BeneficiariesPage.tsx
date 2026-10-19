import React, { useState, useMemo } from 'react';
import {
  HeartHandshake,
  Plus,
  Search,
  ShieldCheck,
  MapPin,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  ArrowUpDown,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { calculateBeneficiariesMetrics } from '../../lib/calculations';
import { formatNumber, formatDateID } from '../../lib/formatters';
import { BeneficiaryCountingMethod, BeneficiaryAggregate } from '../../types/csr';

export const BeneficiariesPage: React.FC = () => {
  const { beneficiaries, programs, createBeneficiaryAggregate } = useCSRStore();

  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'reached' | 'target' | 'region'>('reached');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<BeneficiaryAggregate | null>(null);

  // Form State
  const [programId, setProgramId] = useState(programs[0]?.id || '');
  const [region, setRegion] = useState('');
  const [province, setProvince] = useState('Jawa Barat');
  const [groupLabel, setGroupLabel] = useState('');
  const [targetCount, setTargetCount] = useState(500);
  const [reachedCount, setReachedCount] = useState(350);
  const [countingMethod, setCountingMethod] = useState<BeneficiaryCountingMethod>('unique_verified');
  const [notes, setNotes] = useState('');

  const metrics = calculateBeneficiariesMetrics(beneficiaries);

  const filteredBeneficiaries = useMemo(() => {
    const list = beneficiaries.filter((b) => {
      const matchesSearch =
        b.programTitle.toLowerCase().includes(search.toLowerCase()) ||
        b.region.toLowerCase().includes(search.toLowerCase()) ||
        b.groupLabel.toLowerCase().includes(search.toLowerCase());
      const matchesMethod = methodFilter === 'all' || b.countingMethod === methodFilter;
      return matchesSearch && matchesMethod;
    });

    return list.sort((a, b) => {
      if (sortBy === 'reached') return b.reachedCount - a.reachedCount;
      if (sortBy === 'target') return b.targetCount - a.targetCount;
      return a.region.localeCompare(b.region);
    });
  }, [beneficiaries, search, methodFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredBeneficiaries.length / pageSize));
  const paginatedBeneficiaries = filteredBeneficiaries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupLabel.trim() || !region.trim()) return;

    const prog = programs.find((p) => p.id === programId);

    createBeneficiaryAggregate({
      programId,
      programTitle: prog?.title || 'Program CSR Universa',
      region,
      province,
      groupLabel,
      targetCount: Number(targetCount),
      reachedCount: Number(reachedCount),
      countingMethod,
      notes: notes || 'Pencatatan capaian penerima manfaat agregat demo.'
    });

    setIsModalOpen(false);
    setGroupLabel('');
    setRegion('');
    setNotes('');
  };

  const getMethodBadge = (method: BeneficiaryCountingMethod) => {
    switch (method) {
      case 'unique_verified':
        return {
          label: 'Individu Unik',
          className: 'bg-[#E8F6F0] text-[#176B4D]'
        };
      case 'participation_event':
        return {
          label: 'Partisipasi Kegiatan',
          className: 'bg-[#FEF5E7] text-amber-700'
        };
      case 'household_estimate':
        return {
          label: 'Estimasi KK',
          className: 'bg-[#EBF7F5] text-teal-700'
        };
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Data Agregat Penerima Manfaat
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Capaian sasaran sosial transparan berbasis data agregat yang mengutamakan privasi dan bebas manipulasi penghitungan ganda.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#E8F6F0] text-[#176B4D] font-bold text-xs border border-[#176B4D]/15">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Metode IPB / ESG Compliance</span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white font-semibold text-xs transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Tambah Catatan Capaian
          </button>
        </div>
      </div>

      {/* 2. Privacy & Methodology Discreet Notice */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs text-slate-600">
        <ShieldCheck className="w-4 h-4 text-[#176B4D] shrink-0" />
        <span className="leading-relaxed">
          <strong className="text-slate-800">Privasi Terjaga:</strong> Universa CSR Hub tidak menyimpan identitas sensitif (NIK/KTP) pada tampilan publik. Seluruh data diverifikasi agregat dengan metodologi teruji untuk mencegah <em>double-counting</em>.
        </span>
      </div>

      {/* 3. 4 Soft Pastel Summary Cards with Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Individu Unik Terverifikasi (Soft Mint) */}
        <div
          onClick={() => {
            setMethodFilter(methodFilter === 'unique_verified' ? 'all' : 'unique_verified');
            setCurrentPage(1);
          }}
          className="rounded-2xl bg-[#EBF6F1] p-5 flex items-center justify-between cursor-pointer hover:brightness-98 transition-all"
        >
          <div>
            <div className="text-xs font-medium text-slate-500">Individu Unik</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {formatNumber(metrics.uniqueVerified)}
            </div>
            <div className="text-[11px] font-bold text-[#176B4D] mt-1">
              NIB / KTP <span className="font-normal text-slate-400">terverifikasi</span>
            </div>
          </div>
          <svg viewBox="0 0 80 36" className="w-20 h-9 overflow-visible shrink-0">
            <path
              d="M2,28 C16,24 26,14 40,18 C54,22 64,6 78,8"
              fill="none"
              stroke="#176B4D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Card 2: Partisipasi Kegiatan (Soft Cream) */}
        <div
          onClick={() => {
            setMethodFilter(methodFilter === 'participation_event' ? 'all' : 'participation_event');
            setCurrentPage(1);
          }}
          className="rounded-2xl bg-[#FEF6E7] p-5 flex items-center justify-between cursor-pointer hover:brightness-98 transition-all"
        >
          <div>
            <div className="text-xs font-medium text-slate-500">Partisipasi Acara</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {formatNumber(metrics.participationEvents)}
            </div>
            <div className="text-[11px] font-bold text-[#D97706] mt-1">
              Pelatihan <span className="font-normal text-slate-400">& kegiatan</span>
            </div>
          </div>
          <svg viewBox="0 0 80 36" className="w-20 h-9 overflow-visible shrink-0">
            <path
              d="M2,24 C18,16 30,26 46,14 C60,6 68,14 78,6"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Card 3: Estimasi Kepala Keluarga (Soft Teal) */}
        <div
          onClick={() => {
            setMethodFilter(methodFilter === 'household_estimate' ? 'all' : 'household_estimate');
            setCurrentPage(1);
          }}
          className="rounded-2xl bg-[#EBF7F5] p-5 flex items-center justify-between cursor-pointer hover:brightness-98 transition-all"
        >
          <div>
            <div className="text-xs font-medium text-slate-500">Estimasi Jiwa KK</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {formatNumber(metrics.householdEstimates)}
            </div>
            <div className="text-[11px] font-bold text-[#0D9488] mt-1">
              3.7 jiwa/KK <span className="font-normal text-slate-400">terkonversi</span>
            </div>
          </div>
          <svg viewBox="0 0 80 36" className="w-20 h-9 overflow-visible shrink-0">
            <path
              d="M2,30 C18,26 32,18 48,14 C62,10 70,12 78,4"
              fill="none"
              stroke="#14B8A6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Card 4: Total Capaian Riil (Soft Lavender) */}
        <div
          onClick={() => {
            setMethodFilter('all');
            setCurrentPage(1);
          }}
          className="rounded-2xl bg-[#F3F1FA] p-5 flex items-center justify-between cursor-pointer hover:brightness-98 transition-all"
        >
          <div>
            <div className="text-xs font-medium text-slate-500">Total Sasaran Riil</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {formatNumber(metrics.totalReached)}
            </div>
            <div className="text-[11px] font-bold text-[#6366F1] mt-1">
              {Math.round(metrics.reachPercent)}% <span className="font-normal text-slate-400">dari target</span>
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

      {/* 4. Minimalist Search, Filter & View Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari kelompok, wilayah, program..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/15 transition-all"
            />
          </div>

          {/* Methodology Filter Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50/90 rounded-xl text-xs text-slate-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={methodFilter}
              onChange={(e) => {
                setMethodFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Metodologi</option>
              <option value="unique_verified">Individu Unik Terverifikasi</option>
              <option value="participation_event">Partisipasi Acara / Pelatihan</option>
              <option value="household_estimate">Estimasi Kepala Keluarga (KK)</option>
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
              onChange={(e) => setSortBy(e.target.value as 'reached' | 'target' | 'region')}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="reached">Capaian Terbesar</option>
              <option value="target">Target Sasaran</option>
              <option value="region">Wilayah</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. Data Display */}
      {filteredBeneficiaries.length === 0 ? (
        <EmptyState
          icon={HeartHandshake}
          title="Data Capaian Tidak Ditemukan"
          description="Tidak ada catatan capaian penerima manfaat yang cocok dengan kriteria pencarian Anda."
          actionLabel="Reset Filter"
          onAction={() => {
            setSearch('');
            setMethodFilter('all');
          }}
        />
      ) : viewMode === 'table' ? (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-medium text-slate-400">
                  <th className="py-3.5 px-3 font-medium">Kelompok Sasaran</th>
                  <th className="py-3.5 px-3 font-medium">Program Terkait</th>
                  <th className="py-3.5 px-3 font-medium">Wilayah</th>
                  <th className="py-3.5 px-3 font-medium">Metodologi</th>
                  <th className="py-3.5 px-3 font-medium">Target</th>
                  <th className="py-3.5 px-3 font-medium">Capaian Riil</th>
                  <th className="py-3.5 px-3 font-medium">Progres</th>
                  <th className="py-3.5 px-3 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {paginatedBeneficiaries.map((b) => {
                  const pct = Math.min(100, Math.round((b.reachedCount / (b.targetCount || 1)) * 100));
                  const badge = getMethodBadge(b.countingMethod);

                  return (
                    <tr
                      key={b.id}
                      onClick={() => setSelectedBeneficiary(b)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-3 max-w-xs">
                        <div className="font-bold text-slate-800 group-hover:text-[#176B4D] transition-colors line-clamp-1">
                          {b.groupLabel}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {formatDateID(b.lastUpdated)}
                        </div>
                      </td>

                      <td className="py-4 px-3 text-slate-600 max-w-[200px] truncate">
                        {b.programTitle}
                      </td>

                      <td className="py-4 px-3 text-slate-500 whitespace-nowrap">
                        {b.region}, {b.province}
                      </td>

                      <td className="py-4 px-3 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-[11px] font-semibold ${badge.className}`}>
                          {badge.label}
                        </span>
                      </td>

                      <td className="py-4 px-3 text-slate-500 font-medium whitespace-nowrap">
                        {formatNumber(b.targetCount)} Jiwa
                      </td>

                      <td className="py-4 px-3 font-bold text-slate-800 whitespace-nowrap">
                        {formatNumber(b.reachedCount)} Jiwa
                      </td>

                      <td className="py-4 px-3 w-36">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-slate-700">{pct}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#176B4D] rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBeneficiary(b);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
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
              {Math.min(currentPage * pageSize, filteredBeneficiaries.length)} dari{' '}
              {filteredBeneficiaries.length}
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
      ) : (
        /* Clean Minimalist Grid Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBeneficiaries.map((b) => {
            const pct = Math.min(100, Math.round((b.reachedCount / (b.targetCount || 1)) * 100));
            const badge = getMethodBadge(b.countingMethod);

            return (
              <div
                key={b.id}
                onClick={() => setSelectedBeneficiary(b)}
                className="rounded-2xl bg-slate-50/70 hover:bg-slate-50 p-5 transition-all cursor-pointer flex flex-col justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-semibold text-slate-400">
                      📍 {b.region}, {b.province}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-semibold ${badge.className}`}>
                      {badge.label}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#176B4D] transition-colors line-clamp-1">
                    {b.groupLabel}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 truncate">
                    {b.programTitle}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-200/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Realisasi</span>
                    <span className="font-bold text-slate-800">
                      {formatNumber(b.reachedCount)} / {formatNumber(b.targetCount)} Jiwa
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#176B4D] rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Detail Beneficiary */}
      {selectedBeneficiary && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedBeneficiary(null)}
          title={selectedBeneficiary.groupLabel}
          subtitle={`📍 ${selectedBeneficiary.region}, ${selectedBeneficiary.province}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#EBF6F1]">
              <span className="font-bold text-[#176B4D]">Metodologi Penghitungan</span>
              <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${getMethodBadge(selectedBeneficiary.countingMethod).className}`}>
                {getMethodBadge(selectedBeneficiary.countingMethod).label}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">Inisiatif Program CSR Terkait:</h4>
              <p className="p-3.5 bg-slate-50 rounded-xl leading-relaxed text-slate-700 font-medium">
                {selectedBeneficiary.programTitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 text-[11px] block">Target Sasaran</span>
                <span className="text-lg font-extrabold text-slate-800 mt-0.5 block">
                  {formatNumber(selectedBeneficiary.targetCount)} Jiwa
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 text-[11px] block">Realisasi Capaian</span>
                <span className="text-lg font-extrabold text-[#176B4D] mt-0.5 block">
                  {formatNumber(selectedBeneficiary.reachedCount)} Jiwa
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">Catatan Metodologi & Instrumen Verifikasi:</h4>
              <p className="p-3.5 bg-slate-50 rounded-xl leading-relaxed text-slate-600">
                {selectedBeneficiary.notes}
              </p>
            </div>

            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-[#176B4D]" />
              <span>Status Verifikasi: Telah direkonsiliasi dan tervalidasi agregat.</span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedBeneficiary(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Add Beneficiary Aggregate */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Catat Capaian Penerima Manfaat Baru"
        subtitle="Tambahkan data agregat capaian penerima manfaat untuk program yang sedang berjalan."
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Pilih Program Terkait *</label>
            <select
              value={programId}
              onChange={(e) => setProgramId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20 cursor-pointer"
            >
              {programs.map((p) => (
                <option key={p.id} value={p.id}>{p.code} — {p.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Label / Kelompok Sasaran *</label>
            <input
              type="text"
              required
              value={groupLabel}
              onChange={(e) => setGroupLabel(e.target.value)}
              placeholder="Contoh: Nelayan Tradisional & Pembudidaya Kepiting Bakau"
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Kabupaten/Kota *</label>
              <input
                type="text"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Contoh: Muara Gembong"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Provinsi *</label>
              <input
                type="text"
                required
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Contoh: Jawa Barat"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Metode Hitung *</label>
              <select
                value={countingMethod}
                onChange={(e) => setCountingMethod(e.target.value as BeneficiaryCountingMethod)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20 cursor-pointer"
              >
                <option value="unique_verified">Individu Unik</option>
                <option value="participation_event">Partisipasi Acara</option>
                <option value="household_estimate">Estimasi KK</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Target Sasaran (Jiwa) *</label>
              <input
                type="number"
                value={targetCount}
                onChange={(e) => setTargetCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Capaian Riil (Jiwa) *</label>
              <input
                type="number"
                value={reachedCount}
                onChange={(e) => setReachedCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Penjelasan Metodologi & Sumber Data</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jelaskan instrumen verifikasi, misal: daftar presensi fisik atau buku KIA posyandu..."
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold bg-[#176B4D] text-white rounded-xl shadow-xs cursor-pointer hover:bg-[#0E4D36]"
            >
              Simpan Capaian
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
