import React, { useState, useMemo } from 'react';
import {
  Users,
  Plus,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Trophy
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { CSRAwardsModal } from '../awards/CSRAwardsModal';
import { Organization, ProgramCategory } from '../../types/csr';
import { formatCompactIDR, CATEGORY_LABELS } from '../../lib/formatters';

export const PartnersPage: React.FC = () => {
  const { partners, programs, createOrganization } = useCSRStore();

  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'programs'>('programs');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const [selectedPartner, setSelectedPartner] = useState<Organization | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAwardsOpen, setIsAwardsOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [subType, setSubType] = useState('Yayasan Sosial');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [selectedFocus] = useState<ProgramCategory[]>(['lingkungan']);

  const filteredPartners = useMemo(() => {
    const list = partners.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.subType.toLowerCase().includes(search.toLowerCase()) ||
        p.region.toLowerCase().includes(search.toLowerCase());
      const matchesRegion =
        regionFilter === 'all' || p.region.toLowerCase().includes(regionFilter.toLowerCase());
      return matchesSearch && matchesRegion;
    });

    return list.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      const countA = programs.filter((pr) => pr.partnerId === a.id).length;
      const countB = programs.filter((pr) => pr.partnerId === b.id).length;
      return countB - countA;
    });
  }, [partners, programs, search, regionFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredPartners.length / pageSize));
  const paginatedPartners = filteredPartners.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPartnerDisbursed = useMemo(
    () => programs.reduce((sum, p) => sum + p.disbursedAmount, 0),
    [programs]
  );

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createOrganization({
      name,
      type: 'partner',
      subType,
      description,
      region,
      focusAreas: selectedFocus,
      contactPerson: {
        name: contactName || 'Koordinator Program',
        emailDemo: contactEmail || 'info@lembaga.demo',
        phoneDemo: contactPhone || '+62 812-0000-0000'
      },
      verifiedDemo: true,
      verificationBadge: 'Verified (Demo)',
    });

    setIsFormOpen(false);
    setName('');
    setDescription('');
    setRegion('');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Mitra Pelaksana Lapangan
        </h1>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsAwardsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/90 font-bold text-xs transition-all cursor-pointer shadow-xs"
          >
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Galeri CSR Award</span>
          </button>

          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white font-semibold text-xs transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Registrasi Mitra Baru
          </button>
        </div>
      </div>

      {/* 2. 4 Soft Pastel Summary Cards with Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Mitra (Soft Mint) */}
        <div className="rounded-2xl bg-[#EBF6F1] p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500">Mitra Terdaftar</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {partners.length}
            </div>
            <div className="text-[11px] font-bold text-[#176B4D] mt-1">
              +16% <span className="font-normal text-slate-400">tahun ini</span>
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

        {/* Card 2: Terverifikasi (Soft Cream) */}
        <div className="rounded-2xl bg-[#FEF6E7] p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500">Terverifikasi</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              100%
            </div>
            <div className="text-[11px] font-bold text-[#D97706] mt-1">
              Audit <span className="font-normal text-slate-400">lengkap</span>
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

        {/* Card 3: Program Dikelola (Soft Teal) */}
        <div className="rounded-2xl bg-[#EBF7F5] p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500">Program Dikelola</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {programs.length}
            </div>
            <div className="text-[11px] font-bold text-[#0D9488] mt-1">
              +24% <span className="font-normal text-slate-400">aktif</span>
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

        {/* Card 4: Dana Dikelola (Soft Lavender) */}
        <div className="rounded-2xl bg-[#F3F1FA] p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500">Dana Tersalurkan</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              {formatCompactIDR(totalPartnerDisbursed)}
            </div>
            <div className="text-[11px] font-bold text-[#6366F1] mt-1">
              +18% <span className="font-normal text-slate-400">realisasi</span>
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
              placeholder="Cari mitra pelaksana..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/15 transition-all"
            />
          </div>

          {/* Region Filter Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50/90 rounded-xl text-xs text-slate-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={regionFilter}
              onChange={(e) => {
                setRegionFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Wilayah</option>
              <option value="Jawa">Pulau Jawa</option>
              <option value="Sumatera">Sumatera</option>
              <option value="Kalimantan">Kalimantan</option>
              <option value="Indonesia Timur">Sulawesi & Timur</option>
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
              onChange={(e) => setSortBy(e.target.value as 'name' | 'programs')}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="programs">Program Terbanyak</option>
              <option value="name">Nama Lembaga</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Data Display */}
      {filteredPartners.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Mitra tidak ditemukan"
          description="Tidak ada mitra pelaksana yang cocok dengan pencarian Anda."
          actionLabel="Reset Filter"
          onAction={() => {
            setSearch('');
            setRegionFilter('all');
          }}
        />
      ) : viewMode === 'table' ? (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-medium text-slate-400">
                  <th className="py-3.5 px-3 font-medium">Lembaga Mitra</th>
                  <th className="py-3.5 px-3 font-medium">Koordinator PIC</th>
                  <th className="py-3.5 px-3 font-medium">Wilayah Kerja</th>
                  <th className="py-3.5 px-3 font-medium">Program Aktif</th>
                  <th className="py-3.5 px-3 font-medium">Dana Dikelola</th>
                  <th className="py-3.5 px-3 font-medium">Status</th>
                  <th className="py-3.5 px-3 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {paginatedPartners.map((partner) => {
                  const partnerPrograms = programs.filter((p) => p.partnerId === partner.id);
                  const totalManaged = partnerPrograms.reduce((acc, p) => acc + p.disbursedAmount, 0);

                  return (
                    <tr
                      key={partner.id}
                      onClick={() => setSelectedPartner(partner)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#E8F6F0] text-[#176B4D] font-bold text-xs flex items-center justify-center shrink-0">
                            {partner.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 group-hover:text-[#176B4D] transition-colors">
                              {partner.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {partner.subType}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="font-medium text-slate-700">
                          {partner.contactPerson.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {partner.contactPerson.emailDemo}
                        </div>
                      </td>

                      <td className="py-4 px-3 text-slate-500">
                        {partner.region}
                      </td>

                      <td className="py-4 px-3 font-semibold text-slate-700">
                        {partnerPrograms.length} Program
                      </td>

                      <td className="py-4 px-3 font-bold text-slate-800">
                        {formatCompactIDR(totalManaged)}
                      </td>

                      <td className="py-4 px-3">
                        <StatusBadge status={partner.verificationBadge} />
                      </td>

                      <td className="py-4 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPartner(partner);
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
              {Math.min(currentPage * pageSize, filteredPartners.length)} dari{' '}
              {filteredPartners.length}
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
          {filteredPartners.map((partner) => {
            const partnerPrograms = programs.filter((p) => p.partnerId === partner.id);
            const totalManaged = partnerPrograms.reduce((acc, p) => acc + p.disbursedAmount, 0);

            return (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="rounded-2xl bg-slate-50/70 hover:bg-slate-50 p-5 transition-all cursor-pointer flex flex-col justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-[#E8F6F0] text-[#176B4D] font-bold text-xs flex items-center justify-center">
                      {partner.name.substring(0, 2).toUpperCase()}
                    </div>
                    <StatusBadge status={partner.verificationBadge} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#176B4D] transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {partner.subType} • {partner.region}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{partnerPrograms.length} Program</span>
                  <span className="font-bold text-slate-800">
                    {formatCompactIDR(totalManaged)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Detail Partner */}
      {selectedPartner && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedPartner(null)}
          title={selectedPartner.name}
          subtitle={`${selectedPartner.subType} • ${selectedPartner.region}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#EBF6F1]">
              <span className="font-bold text-[#176B4D]">
                Status Verifikasi Lapangan
              </span>
              <StatusBadge status={selectedPartner.verificationBadge} />
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">Profil & Rekam Jejak Lembaga</h4>
              <p className="p-3.5 bg-slate-50 rounded-xl leading-relaxed text-slate-600">
                {selectedPartner.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1.5">Fokus Sektor Keahlian</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedPartner.focusAreas.map((fa) => (
                  <span
                    key={fa}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]"
                  >
                    {CATEGORY_LABELS[fa].label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1.5">Inisiatif CSR yang Dikelola</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {programs
                  .filter((p) => p.partnerId === selectedPartner.id)
                  .map((p) => (
                    <div key={p.id} className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{p.title}</div>
                        <div className="text-[11px] text-slate-400">
                          Pagu: {formatCompactIDR(p.approvedBudget)} • Realisasi: {formatCompactIDR(p.disbursedAmount)}
                        </div>
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl space-y-1">
              <div className="font-bold text-slate-900">Kontak Koordinator (PIC)</div>
              <div className="text-slate-500">
                {selectedPartner.contactPerson.name} • {selectedPartner.contactPerson.emailDemo} • {selectedPartner.contactPerson.phoneDemo}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedPartner(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Add Partner */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Registrasi Mitra Pelaksana Baru"
        subtitle="Daftarkan lembaga sosial, yayasan, atau institusi pelaksana program CSR."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Nama Lembaga / Yayasan *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Yayasan Konservasi Bumi Biru"
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Bentuk Badan Hukum *</label>
              <select
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
              >
                <option value="Yayasan Sosial">Yayasan Sosial</option>
                <option value="Lembaga Konservasi">Lembaga Konservasi</option>
                <option value="Koperasi Masyarakat">Koperasi Masyarakat</option>
                <option value="Perkumpulan / Asosiasi">Perkumpulan / Asosiasi</option>
                <option value="Lembaga Pendidikan">Lembaga Pendidikan</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Wilayah Kerja *</label>
              <input
                type="text"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Contoh: Jawa Barat & Banten"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Deskripsi Profil & Pengalaman</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan spesialisasi tim lapangan dan portofolio kegiatan..."
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Nama PIC</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Dra. Siti Rahmawati"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Email Demo</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="siti@lembaga.demo"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">No. Kontak</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+62 812-..."
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
              Simpan Mitra
            </button>
          </div>
        </form>
      </Modal>

      {/* Point 5: CSR Awards & Hall of Fame Modal */}
      <CSRAwardsModal
        isOpen={isAwardsOpen}
        onClose={() => setIsAwardsOpen(false)}
      />
    </div>
  );
};
