import React, { useState, useMemo } from 'react';
import {
  Building2,
  Plus,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { Organization } from '../../types/csr';
import { calculateFunderFunding, calculatePlatformFunding } from '../../lib/calculations';
import { formatCompactIDR } from '../../lib/formatters';

export const FundersPage: React.FC = () => {
  const { funders, programs, fundingRecords, createOrganization } = useCSRStore();

  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'committed' | 'name'>('committed');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const [selectedFunder, setSelectedFunder] = useState<Organization | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [subType, setSubType] = useState('BUMN');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('DKI Jakarta / Nasional');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const filteredFunders = useMemo(() => {
    const list = funders.filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.subType.toLowerCase().includes(search.toLowerCase()) ||
        f.region.toLowerCase().includes(search.toLowerCase());
      const matchesSector =
        sectorFilter === 'all' || f.subType.toLowerCase().includes(sectorFilter.toLowerCase());
      return matchesSearch && matchesSector;
    });

    return list.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      const metricsA = calculateFunderFunding(a.id, fundingRecords);
      const metricsB = calculateFunderFunding(b.id, fundingRecords);
      return metricsB.committed - metricsA.committed;
    });
  }, [funders, fundingRecords, search, sectorFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredFunders.length / pageSize));
  const paginatedFunders = filteredFunders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const platformFunding = useMemo(
    () => calculatePlatformFunding(fundingRecords),
    [fundingRecords]
  );

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createOrganization({
      name,
      type: 'funder',
      subType,
      description,
      region,
      focusAreas: ['lingkungan', 'pendidikan'],
      contactPerson: {
        name: contactName || 'Direktur CSR',
        emailDemo: contactEmail || 'csr@perusahaan.demo',
        phoneDemo: '+62 811-0000-0000'
      },
      verifiedDemo: true,
      verificationBadge: 'Verified (Demo)',
    });

    setIsFormOpen(false);
    setName('');
    setDescription('');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Corporate Funder CSR
        </h1>

        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white font-semibold text-xs transition-all cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Tambah Funder Baru
        </button>
      </div>

      {/* 2. 4 Soft Pastel Summary Cards with Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Komitmen (Soft Mint) */}
        <div className="rounded-2xl bg-[#EBF6F1] p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500">Komitmen CSR</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              {formatCompactIDR(platformFunding.totalCommitted)}
            </div>
            <div className="text-[11px] font-bold text-[#176B4D] mt-1">
              {funders.length} <span className="font-normal text-slate-400">korporasi</span>
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

        {/* Card 2: Dialokasikan (Soft Cream) */}
        <div className="rounded-2xl bg-[#FEF6E7] p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500">Dialokasikan</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              {formatCompactIDR(platformFunding.totalAllocated)}
            </div>
            <div className="text-[11px] font-bold text-[#D97706] mt-1">
              +18% <span className="font-normal text-slate-400">ke program</span>
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

        {/* Card 3: Tersalurkan (Soft Teal) */}
        <div className="rounded-2xl bg-[#EBF7F5] p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500">Tersalurkan</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              {formatCompactIDR(platformFunding.totalDisbursed)}
            </div>
            <div className="text-[11px] font-bold text-[#0D9488] mt-1">
              {Math.round((platformFunding.totalDisbursed / (platformFunding.totalCommitted || 1)) * 100)}% <span className="font-normal text-slate-400">serapan</span>
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

        {/* Card 4: Saldo Bebas (Soft Lavender) */}
        <div className="rounded-2xl bg-[#F3F1FA] p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500">Saldo Tersedia</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              {formatCompactIDR(platformFunding.availableUnallocatedBalance)}
            </div>
            <div className="text-[11px] font-bold text-[#6366F1] mt-1">
              Siap <span className="font-normal text-slate-400">dialokasikan</span>
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
              placeholder="Cari korporasi funder..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/15 transition-all"
            />
          </div>

          {/* Sector Filter Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50/90 rounded-xl text-xs text-slate-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sectorFilter}
              onChange={(e) => {
                setSectorFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Korporasi</option>
              <option value="BUMN">BUMN</option>
              <option value="Swasta">Swasta Nasional</option>
              <option value="Perbankan">Perbankan & Finansial</option>
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
              onChange={(e) => setSortBy(e.target.value as 'committed' | 'name')}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="committed">Komitmen Terbesar</option>
              <option value="name">Nama Korporasi</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Data Display */}
      {filteredFunders.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="Corporate Funder tidak ditemukan"
          description="Tidak ada korporasi funder yang cocok dengan kriteria pencarian Anda."
          actionLabel="Reset Filter"
          onAction={() => {
            setSearch('');
            setSectorFilter('all');
          }}
        />
      ) : viewMode === 'table' ? (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-medium text-slate-400">
                  <th className="py-3.5 px-3 font-medium">Korporasi Funder</th>
                  <th className="py-3.5 px-3 font-medium">Pejabat CSR (PIC)</th>
                  <th className="py-3.5 px-3 font-medium">Komitmen</th>
                  <th className="py-3.5 px-3 font-medium">Tersalurkan</th>
                  <th className="py-3.5 px-3 font-medium">Saldo Tersedia</th>
                  <th className="py-3.5 px-3 font-medium">Status</th>
                  <th className="py-3.5 px-3 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {paginatedFunders.map((funder) => {
                  const metrics = calculateFunderFunding(funder.id, fundingRecords);
                  const funderPrograms = programs.filter((p) => p.funderId === funder.id);

                  return (
                    <tr
                      key={funder.id}
                      onClick={() => setSelectedFunder(funder)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#E8F6F0] text-[#176B4D] font-bold text-xs flex items-center justify-center shrink-0">
                            {funder.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 group-hover:text-[#176B4D] transition-colors">
                              {funder.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {funder.subType} • {funderPrograms.length} Program
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="font-medium text-slate-700">
                          {funder.contactPerson.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {funder.contactPerson.emailDemo}
                        </div>
                      </td>

                      <td className="py-4 px-3 font-bold text-slate-800">
                        {formatCompactIDR(metrics.committed)}
                      </td>

                      <td className="py-4 px-3 font-semibold text-[#176B4D]">
                        {formatCompactIDR(metrics.disbursed)}
                      </td>

                      <td className="py-4 px-3 font-medium text-slate-600">
                        {formatCompactIDR(metrics.availableBalance)}
                      </td>

                      <td className="py-4 px-3">
                        <StatusBadge status={funder.verificationBadge} />
                      </td>

                      <td className="py-4 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFunder(funder);
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
              {Math.min(currentPage * pageSize, filteredFunders.length)} dari{' '}
              {filteredFunders.length}
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
          {filteredFunders.map((funder) => {
            const metrics = calculateFunderFunding(funder.id, fundingRecords);
            return (
              <div
                key={funder.id}
                onClick={() => setSelectedFunder(funder)}
                className="rounded-2xl bg-slate-50/70 hover:bg-slate-50 p-5 transition-all cursor-pointer flex flex-col justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-[#E8F6F0] text-[#176B4D] font-bold text-xs flex items-center justify-center">
                      {funder.name.substring(0, 2).toUpperCase()}
                    </div>
                    <StatusBadge status={funder.verificationBadge} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#176B4D] transition-colors">
                    {funder.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {funder.subType} • {funder.region}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Komitmen CSR</span>
                  <span className="font-bold text-slate-800">
                    {formatCompactIDR(metrics.committed)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Detail Funder */}
      {selectedFunder && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedFunder(null)}
          title={selectedFunder.name}
          subtitle={`${selectedFunder.subType} • ${selectedFunder.region}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Profil Korporasi & Kebijakan TJSL</h4>
              <p className="p-3.5 bg-slate-50 rounded-xl leading-relaxed text-slate-600">
                {selectedFunder.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1.5">Inisiatif Program yang Didanai</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {programs
                  .filter((p) => p.funderId === selectedFunder.id)
                  .map((p) => (
                    <div key={p.id} className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{p.title}</div>
                        <div className="text-[11px] text-slate-400">
                          Alokasi: {formatCompactIDR(p.approvedBudget)} • Realisasi: {formatCompactIDR(p.disbursedAmount)}
                        </div>
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl space-y-1">
              <div className="font-bold text-slate-900">Kontak Pejabat CSR (PIC)</div>
              <div className="text-slate-500">
                {selectedFunder.contactPerson.name} • {selectedFunder.contactPerson.emailDemo} • {selectedFunder.contactPerson.phoneDemo}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedFunder(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Add Funder */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Tambah Corporate Funder Baru"
        subtitle="Registrasi perusahaan penyedia dana komitmen CSR ke dalam sistem."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Nama Perusahaan / Korporasi *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: PT Energi Surya Nusantara Tbk"
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Bentuk Badan Usaha *</label>
              <select
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
              >
                <option value="BUMN">BUMN</option>
                <option value="Swasta Nasional">Swasta Nasional</option>
                <option value="Perbankan & Keuangan">Perbankan & Keuangan</option>
                <option value="Multinasional">Multinasional</option>
                <option value="Yayasan Korporat">Yayasan Korporat</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Wilayah Operasional</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Fokus & Kebijakan Tanggung Jawab Sosial</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan pilar keberlanjutan atau fokus CSR korporasi..."
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Nama PIC CSR / TJSL</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Contoh: Dedi Mulyadi"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Email Demo PIC</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="dedi@perusahaan.demo"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold bg-[#176B4D] text-white rounded-xl shadow-xs cursor-pointer hover:bg-[#0E4D36]"
            >
              Simpan Funder
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
