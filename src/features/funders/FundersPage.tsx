import React, { useState, useMemo } from 'react';
import {
  Building2,
  Plus,
  Search,
  Wallet,
  ArrowRight,
  Layers,
  MapPin,
  Mail,
  ShieldCheck,
  Coins,
  LayoutGrid,
  List,
  CheckCircle2,
  Award
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { Organization, ProgramCategory } from '../../types/csr';
import { calculateFunderFunding, calculatePlatformFunding } from '../../lib/calculations';
import { formatCompactIDR, formatIDR, CATEGORY_LABELS } from '../../lib/formatters';

export const FundersPage: React.FC = () => {
  const { funders, programs, fundingRecords, createOrganization } = useCSRStore();

  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
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
    return funders.filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.subType.toLowerCase().includes(search.toLowerCase()) ||
        f.region.toLowerCase().includes(search.toLowerCase());
      const matchesSector =
        sectorFilter === 'all' || f.subType.toLowerCase().includes(sectorFilter.toLowerCase());
      return matchesSearch && matchesSector;
    });
  }, [funders, search, sectorFilter]);

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

  const sectorTabs = [
    { key: 'all', label: 'Semua Korporasi' },
    { key: 'BUMN', label: 'BUMN' },
    { key: 'Swasta', label: 'Swasta Tbk' },
    { key: 'Perbankan', label: 'Perbankan & Finansial' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Tenang & Rapi */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-[#072418] tracking-tight">
              Portofolio Corporate Funder & Treasury CSR
            </h1>
            <span className="text-xs text-slate-500 font-medium">
              {funders.length} Korporasi Terdaftar
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            Pemantauan komitmen alokasi anggaran TJSL/CSR perusahaan mitra, kepatuhan PROPER, dan perbendaharaan saldo siap salur.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          {/* View Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#072418] shadow-xs'
                  : 'text-ink-muted hover:text-ink-primary'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Portofolio</span>
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
              <span>Buku Besar</span>
            </button>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#072418] hover:bg-[#176B4D] text-[#FDE047] text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Corporate Funder</span>
          </button>
        </div>
      </div>

      {/* 2. Ringkasan Finansial Treasury 4-Angka (Bersih, Rapi, Tanpa Kotak Tebal) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white rounded-2xl border border-slate-200/80">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
            Total Pagu Komitmen
          </span>
          <span className="text-lg font-black text-slate-900 mt-0.5 block">
            {formatCompactIDR(platformFunding.totalCommitted)}
          </span>
          <span className="text-[11px] text-slate-500">Anggaran TJSL Resmi</span>
        </div>

        <div className="border-l border-slate-100 pl-4">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
            Dana Tersalurkan
          </span>
          <span className="text-lg font-black text-[#176B4D] mt-0.5 block">
            {formatCompactIDR(platformFunding.totalDisbursed)}
          </span>
          <span className="text-[11px] text-emerald-700 font-medium">
            {platformFunding.totalCommitted > 0
              ? `${Math.round((platformFunding.totalDisbursed / platformFunding.totalCommitted) * 100)}% Serapan Lapangan`
              : '0% Serapan'}
          </span>
        </div>

        <div className="border-l border-slate-100 pl-4">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
            Saldo Siap Salur
          </span>
          <span className="text-lg font-black text-slate-800 mt-0.5 block">
            {formatCompactIDR(platformFunding.availableUnallocatedBalance)}
          </span>
          <span className="text-[11px] text-slate-500">Likuiditas Bebas</span>
        </div>

        <div className="border-l border-slate-100 pl-4">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
            Status Audit
          </span>
          <span className="text-lg font-black text-slate-900 mt-0.5 block">
            100% WTP
          </span>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> PROPER Compliant
          </span>
        </div>
      </div>

      {/* 3. Filter Sektor & Pencarian */}
      <div className="space-y-3">
        {/* Sektor Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {sectorTabs.map((tab) => {
            const isActive = sectorFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSectorFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#072418] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama korporasi, kode emiten, tipe industri, atau domisili kantor pusat..."
            className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#176B4D] transition-colors"
          />
        </div>
      </div>

      {/* 4. Tampilan Konten Funder (KONSEP CORPORATE TREASURY: BERSIH, LEGA, FOKUS FINANSIAL, TANPA BORDER BERLAPIS) */}
      {filteredFunders.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="Funder Tidak Ditemukan"
          description="Tidak ada perusahaan yang cocok dengan pencarian Anda."
          actionLabel="Tampilkan Semua Funder"
          onAction={() => {
            setSearch('');
            setSectorFilter('all');
          }}
        />
      ) : viewMode === 'grid' ? (
        /* Corporate Cards (2 Kolom Bersih, Fokus Anggaran & Portofolio) */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredFunders.map((funder) => {
            const metrics = calculateFunderFunding(funder.id, fundingRecords);
            const funderPrograms = programs.filter((p) => p.funderId === funder.id);

            const disbursedPct = metrics.committed > 0 ? Math.round((metrics.disbursed / metrics.committed) * 100) : 0;
            const allocatedPct = metrics.committed > 0 ? Math.round((metrics.allocated / metrics.committed) * 100) : 0;
            const availablePct = Math.max(0, 100 - allocatedPct);

            return (
              <div
                key={funder.id}
                onClick={() => setSelectedFunder(funder)}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:border-[#176B4D] hover:shadow-sm transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Top Baris: Kode, Nama Perusahaan, & Rating PROPER */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                        <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded">
                          {funder.code}
                        </span>
                        <span>•</span>
                        <span>{funder.subType}</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-[#176B4D] transition-colors truncate mt-1">
                        {funder.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" /> {funder.region}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold shrink-0">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>PROPER Hijau</span>
                    </div>
                  </div>

                  {/* Deskripsi Kebijakan TJSL Singkat */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {funder.description}
                  </p>

                  {/* Bilah Alokasi Perbendaharaan Segmen Bersih */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Realisasi Pagu Anggaran</span>
                      <span className="font-mono font-bold text-[#176B4D]">{disbursedPct}% Tersalurkan</span>
                    </div>

                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${disbursedPct}%` }}
                        className="bg-[#176B4D] h-full"
                        title={`Terserap: ${disbursedPct}%`}
                      />
                      <div
                        style={{ width: `${Math.max(0, allocatedPct - disbursedPct)}%` }}
                        className="bg-amber-400 h-full"
                        title={`Dialokasikan: ${allocatedPct - disbursedPct}%`}
                      />
                      <div
                        style={{ width: `${availablePct}%` }}
                        className="bg-slate-200 h-full"
                        title={`Saldo Bebas: ${availablePct}%`}
                      />
                    </div>

                    {/* Angka Finansial 3 Kolom Bersih (TANPA KOTAK BERLAPIS) */}
                    <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                          Pagu Komitmen
                        </span>
                        <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                          {formatCompactIDR(metrics.committed)}
                        </span>
                      </div>

                      <div className="border-l border-slate-200 pl-3">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                          Tersalurkan
                        </span>
                        <span className="text-sm font-extrabold text-[#176B4D] mt-0.5 block">
                          {formatCompactIDR(metrics.disbursed)}
                        </span>
                      </div>

                      <div className="border-l border-slate-200 pl-3">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                          Saldo Bebas
                        </span>
                        <span className="text-sm font-bold text-slate-700 mt-0.5 block">
                          {formatCompactIDR(metrics.availableBalance)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Program yang Didanai (Inline List) */}
                  <div className="pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 font-medium">Inisiatif Didanai: </span>
                    <span className="text-slate-800 font-semibold">
                      {funderPrograms.length > 0
                        ? funderPrograms.map((p) => p.title).join(', ')
                        : 'Belum ada program aktif'}
                    </span>
                  </div>
                </div>

                {/* Bagian Bawah: PIC & Tombol Rincian */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 truncate min-w-0 pr-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{funder.contactPerson.name} ({funder.contactPerson.emailDemo})</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFunder(funder);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 group-hover:bg-[#072418] text-slate-700 group-hover:text-[#FDE047] font-bold transition-colors cursor-pointer shrink-0"
                  >
                    <span>Buku Besar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Tabel Buku Besar TJSL Korporasi */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Nama Perusahaan</th>
                  <th className="py-3 px-4">Bentuk Korporasi</th>
                  <th className="py-3 px-4">Pagu Komitmen</th>
                  <th className="py-3 px-4">Tersalurkan</th>
                  <th className="py-3 px-4">Saldo Bebas</th>
                  <th className="py-3 px-4">Program Aktif</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredFunders.map((funder) => {
                  const metrics = calculateFunderFunding(funder.id, fundingRecords);
                  const funderPrograms = programs.filter((p) => p.funderId === funder.id);
                  return (
                    <tr
                      key={funder.id}
                      onClick={() => setSelectedFunder(funder)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {funder.name}
                        <div className="text-[10px] text-slate-400 font-normal">{funder.region}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {funder.subType}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {formatCompactIDR(metrics.committed)}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-[#176B4D]">
                        {formatCompactIDR(metrics.disbursed)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-700">
                        {formatCompactIDR(metrics.availableBalance)}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {funderPrograms.length} Inisiatif
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={funder.verificationBadge} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFunder(funder);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#072418] text-[#FDE047] font-bold text-xs hover:bg-[#176B4D] transition-colors cursor-pointer"
                        >
                          Rincian
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
              <h4 className="font-bold text-slate-900 mb-1">Profil Korporasi & Kebijakan TJSL:</h4>
              <p className="p-3 bg-slate-50 rounded-xl leading-relaxed text-slate-700">
                {selectedFunder.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1.5">Inisiatif Program yang Didanai:</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {programs
                  .filter((p) => p.funderId === selectedFunder.id)
                  .map((p) => (
                    <div key={p.id} className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{p.title}</div>
                        <div className="text-[11px] text-slate-500">
                          Alokasi: {formatCompactIDR(p.approvedBudget)} • Realisasi Serapan: {formatCompactIDR(p.disbursedAmount)}
                        </div>
                      </div>
                      <StatusBadge status={p.status} size="sm" />
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <div className="font-bold text-slate-900">Kontak Pejabat CSR (PIC):</div>
              <div className="text-slate-600">
                {selectedFunder.contactPerson.name} • {selectedFunder.contactPerson.emailDemo} • {selectedFunder.contactPerson.phoneDemo}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedFunder(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl cursor-pointer"
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
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#176B4D]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Bentuk Badan Usaha *</label>
              <select
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#176B4D]"
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
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#176B4D]"
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
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#176B4D]"
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
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#176B4D]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Email Demo PIC</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="dedi@perusahaan.demo"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#176B4D]"
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
              className="px-4 py-2 font-bold bg-[#072418] text-[#FDE047] rounded-xl shadow-xs cursor-pointer hover:bg-[#176B4D]"
            >
              Simpan Funder
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
