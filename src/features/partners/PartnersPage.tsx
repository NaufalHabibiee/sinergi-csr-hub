import React, { useState, useMemo } from 'react';
import {
  Users,
  Plus,
  Search,
  MapPin,
  Mail,
  ShieldCheck,
  LayoutGrid,
  List,
  Building,
  ArrowRight,
  UserCheck,
  Phone
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { Organization, ProgramCategory } from '../../types/csr';
import { formatCompactIDR, CATEGORY_LABELS } from '../../lib/formatters';

export const PartnersPage: React.FC = () => {
  const { partners, programs, createOrganization } = useCSRStore();

  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedPartner, setSelectedPartner] = useState<Organization | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [subType, setSubType] = useState('Yayasan Sosial');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [selectedFocus, setSelectedFocus] = useState<ProgramCategory[]>(['lingkungan']);

  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.subType.toLowerCase().includes(search.toLowerCase()) ||
        p.region.toLowerCase().includes(search.toLowerCase());
      const matchesRegion =
        regionFilter === 'all' || p.region.toLowerCase().includes(regionFilter.toLowerCase());
      return matchesSearch && matchesRegion;
    });
  }, [partners, search, regionFilter]);

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

  const regionTabs = [
    { key: 'all', label: 'Semua Wilayah' },
    { key: 'Jawa', label: 'Pulau Jawa' },
    { key: 'Sumatera', label: 'Sumatera' },
    { key: 'Kalimantan', label: 'Kalimantan' },
    { key: 'Indonesia Timur', label: 'Sulawesi & Timur' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Tenang & Rapi */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-[#072418] tracking-tight">
              Direktori Mitra Pelaksana Lapangan
            </h1>
            <span className="text-xs text-slate-500 font-medium">
              {partners.length} Lembaga Terverifikasi
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            Jaringan yayasan sosial, lembaga konservasi, dan organisasi komunitas lokal dengan kapabilitas operasional dan legalitas terverifikasi.
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
              <span>Kartu Profil</span>
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
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#072418] hover:bg-[#176B4D] text-[#FDE047] text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Registrasi Mitra</span>
          </button>
        </div>
      </div>

      {/* 2. Filter & Pencarian Sederhana */}
      <div className="space-y-3">
        {/* Wilayah Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {regionTabs.map((tab) => {
            const isActive = regionFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setRegionFilter(tab.key)}
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
            placeholder="Cari nama yayasan, jenis badan hukum, wilayah operasional, atau nama kontak..."
            className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#176B4D] transition-colors"
          />
        </div>
      </div>

      {/* 3. Tampilan Konten Mitra (KONSEP INSTITUTIONAL DIRECTORY: RAPI, TENANG, HUMANIS, TANPA BORDER BERLAPIS) */}
      {filteredPartners.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Mitra Tidak Ditemukan"
          description="Tidak ada lembaga pelaksana yang cocok dengan pencarian Anda."
          actionLabel="Tampilkan Semua Mitra"
          onAction={() => {
            setSearch('');
            setRegionFilter('all');
          }}
        />
      ) : viewMode === 'grid' ? (
        /* Institutional Cards (2 Kolom Bersih & Berwibawa) */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredPartners.map((partner) => {
            const partnerPrograms = programs.filter((p) => p.partnerId === partner.id);
            const totalDisbursed = partnerPrograms.reduce((sum, p) => sum + p.disbursedAmount, 0);

            return (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:border-[#176B4D] hover:shadow-sm transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3.5">
                  {/* Top Baris: Logo Inisial + Nama Organisasi + Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-slate-900 text-[#FDE047] font-black text-sm flex items-center justify-center shrink-0">
                        {partner.code}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-[#176B4D] transition-colors truncate">
                          {partner.name}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span>{partner.subType}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" /> {partner.region}
                          </span>
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={partner.verificationBadge} size="sm" />
                  </div>

                  {/* Deskripsi Rekam Jejak (Enak Dibaca, Bersahaja) */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {partner.description}
                  </p>

                  {/* Sektor Fokus (Pills Lembut, Tanpa Border Tebal) */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {partner.focusAreas.map((cat) => {
                      const c = CATEGORY_LABELS[cat];
                      return (
                        <span
                          key={cat}
                          className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700"
                        >
                          {c?.label || cat}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Bagian Bawah: Baris Metrik Bersih & PIC */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                        Program Aktif
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        {partnerPrograms.length} Inisiatif
                      </span>
                    </div>

                    <div className="border-l border-slate-200 pl-4">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                        Dana Tersalurkan
                      </span>
                      <span className="text-sm font-extrabold text-[#176B4D]">
                        {formatCompactIDR(totalDisbursed)}
                      </span>
                    </div>

                    <div className="border-l border-slate-200 pl-4 hidden sm:block">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                        Koordinator
                      </span>
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px] block">
                        {partner.contactPerson.name}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPartner(partner);
                    }}
                    className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 group-hover:bg-[#072418] text-slate-700 group-hover:text-[#FDE047] text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <span>Profil Mitra</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Tabel Direktori */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Nama Lembaga</th>
                  <th className="py-3 px-4">Bentuk Badan Hukum</th>
                  <th className="py-3 px-4">Wilayah Kerja</th>
                  <th className="py-3 px-4">Program Aktif</th>
                  <th className="py-3 px-4">Dana Terkelola</th>
                  <th className="py-3 px-4">Koordinator</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPartners.map((partner) => {
                  const partnerPrograms = programs.filter((p) => p.partnerId === partner.id);
                  const totalDisbursed = partnerPrograms.reduce((sum, p) => sum + p.disbursedAmount, 0);
                  return (
                    <tr
                      key={partner.id}
                      onClick={() => setSelectedPartner(partner)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {partner.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {partner.subType}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {partner.region}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {partnerPrograms.length}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-[#176B4D]">
                        {formatCompactIDR(totalDisbursed)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {partner.contactPerson.name}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={partner.verificationBadge} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPartner(partner);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#072418] text-[#FDE047] font-bold text-xs hover:bg-[#176B4D] transition-colors cursor-pointer"
                        >
                          Detail
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
            <div className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl">
              <span className="font-bold text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Legalitas & Verifikasi Lapangan Teruji
              </span>
              <StatusBadge status={selectedPartner.verificationBadge} size="sm" />
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">Profil & Rekam Jejak Lembaga:</h4>
              <p className="p-3 bg-slate-50 rounded-xl leading-relaxed text-slate-700">
                {selectedPartner.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1.5">Inisiatif CSR yang Dikelola:</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {programs
                  .filter((p) => p.partnerId === selectedPartner.id)
                  .map((p) => (
                    <div key={p.id} className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{p.title}</div>
                        <div className="text-[11px] text-slate-500">
                          Pagu: {formatCompactIDR(p.approvedBudget)} • Realisasi: {formatCompactIDR(p.disbursedAmount)}
                        </div>
                      </div>
                      <StatusBadge status={p.status} size="sm" />
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <div className="font-bold text-slate-900">Kontak Personel Lapangan (PIC):</div>
              <div className="text-slate-600">
                {selectedPartner.contactPerson.name} • {selectedPartner.contactPerson.emailDemo} • {selectedPartner.contactPerson.phoneDemo}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedPartner(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl cursor-pointer"
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
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#176B4D]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Bentuk Badan Hukum *</label>
              <select
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#176B4D]"
              >
                <option value="Yayasan Sosial">Yayasan Sosial</option>
                <option value="Lembaga Konservasi">Lembaga Konservasi</option>
                <option value="Koperasi Masyarakat">Koperasi Masyarakat</option>
                <option value="Perkumpulan / Asosiasi">Perkumpulan / Asosiasi</option>
                <option value="Lembaga Pendidikan">Lembaga Pendidikan</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Wilayah Kerja / Posko *</label>
              <input
                type="text"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Contoh: Jawa Barat & Banten"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#176B4D]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Deskripsi Singkat Profil & Pengalaman</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan spesialisasi tim lapangan dan portofolio kegiatan..."
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#176B4D]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Nama PIC Koordinator</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Dra. Siti Rahmawati"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#176B4D]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Email Demo</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="siti@lembaga.demo"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#176B4D]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">No. Kontak / HP</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+62 812-..."
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
              Simpan Mitra
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
