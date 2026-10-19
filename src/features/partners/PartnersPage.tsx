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
  Layers,
  Coins,
  CheckCircle2,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { Organization, ProgramCategory } from '../../types/csr';
import { formatCompactIDR, CATEGORY_LABELS } from '../../lib/formatters';

const PARTNER_COVER_IMAGES: Record<ProgramCategory, string> = {
  lingkungan: '/images/hero_volunteer_forest.jpg',
  pendidikan: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&auto=format&fit=crop&q=80',
  ekonomi_umkm: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=700&auto=format&fit=crop&q=80',
  kesehatan: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=700&auto=format&fit=crop&q=80',
  infrastruktur: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?w=700&auto=format&fit=crop&q=80',
  tanggap_bencana: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=700&auto=format&fit=crop&q=80',
  lainnya: '/images/hero-plantation.jpg',
};

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
    { key: 'Sumatera', label: 'Sumatera & Riau' },
    { key: 'Kalimantan', label: 'Kalimantan' },
    { key: 'Nusa Tenggara', label: 'Nusa Tenggara' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Executive Header + Network Summary KPIs */}
      <div className="bg-surface-card rounded-3xl border border-border-subtle shadow-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#072418] text-[#FDE047] flex items-center justify-center shadow-sm shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#072418] tracking-tight">
                Direktori Mitra Pelaksana
              </h1>
              <p className="text-xs text-ink-muted mt-0.5">
                Jejaring yayasan, lembaga konservasi, dan komunitas terverifikasi pelaksana program di lapangan.
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
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-[#072418] hover:bg-[#176B4D] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#FDE047]" />
              <span>Daftarkan Mitra</span>
            </button>
          </div>
        </div>

        {/* 3 Compact Network KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border-subtle">
          <div className="p-3.5 rounded-2xl bg-[#F8FAF8] border border-emerald-900/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#176B4D] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-ink-muted font-medium">Mitra Terverifikasi</div>
              <div className="text-base font-extrabold text-[#072418]">{partners.length} Lembaga</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FAF8] border border-emerald-900/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FDE047]/35 text-[#072418] flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-ink-muted font-medium">Program Dikelola</div>
              <div className="text-base font-extrabold text-[#072418]">{programs.length} Program</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FAF8] border border-emerald-900/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-ink-muted font-medium">Total Dana Tersalurkan</div>
              <div className="text-base font-extrabold text-[#176B4D]">{formatCompactIDR(totalPartnerDisbursed)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter Bar: Region Pills + Search */}
      <div className="bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {regionTabs.map((tab) => {
            const isActive = regionFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setRegionFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#072418] text-[#FDE047] shadow-2xs'
                    : 'bg-surface-secondary/70 text-ink-secondary hover:bg-surface-secondary hover:text-ink-primary'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama yayasan, kode, atau wilayah..."
            className="w-full pl-9 pr-3 py-2 bg-surface-secondary/60 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* 3. Partners Content: Visual Profile Cards OR Compact Table */}
      {filteredPartners.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Mitra Tidak Ditemukan"
          description="Tidak ada organisasi mitra yang cocok dengan kata kunci pencarian Anda."
          actionLabel="Tampilkan Semua Mitra"
          onAction={() => {
            setSearch('');
            setRegionFilter('all');
          }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredPartners.map((partner) => {
            const partnerPrograms = programs.filter((p) => p.partnerId === partner.id);
            const totalDisbursed = partnerPrograms.reduce((sum, p) => sum + p.disbursedAmount, 0);
            const primaryCat = partner.focusAreas[0] || 'lingkungan';
            const coverImg = PARTNER_COVER_IMAGES[primaryCat] || PARTNER_COVER_IMAGES.lingkungan;

            return (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="bg-surface-card rounded-3xl border border-border-subtle overflow-hidden hover:border-[#176B4D] hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Visual Banner Header */}
                  <div className="relative h-28 overflow-hidden bg-[#072418]">
                    <img
                      src={coverImg}
                      alt={partner.name}
                      className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#072418] via-black/30 to-black/20" />

                    {/* Top Row: Entity Type + Verified Badge */}
                    <div className="absolute top-3 inset-x-3.5 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/55 backdrop-blur-md text-white/90 border border-white/15 text-[10px] font-bold">
                        {partner.subType}
                      </span>
                      <StatusBadge status={partner.verificationBadge} size="sm" />
                    </div>

                    {/* Region at Bottom Right */}
                    <div className="absolute bottom-2.5 right-3.5 text-white text-[11px] font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#FDE047] shrink-0" />
                      <span className="truncate max-w-[180px]">{partner.region}</span>
                    </div>
                  </div>

                  {/* Overlapping Monogram Avatar + Clean Identity (Zero Wall-of-Text!) */}
                  <div className="px-5 pt-0 pb-3 relative">
                    <div className="-mt-7 mb-3 flex items-end justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-[#072418] text-[#FDE047] font-black text-base flex items-center justify-center border-4 border-white shadow-md">
                        {partner.code}
                      </div>
                    </div>

                    <h3 className="font-extrabold text-base text-[#072418] group-hover:text-[#176B4D] transition-colors line-clamp-1">
                      {partner.name}
                    </h3>

                    {/* Focus Sector Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {partner.focusAreas.map((cat) => {
                        const c = CATEGORY_LABELS[cat];
                        return (
                          <span
                            key={cat}
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                              c?.badgeBg || 'bg-gray-50'
                            }`}
                          >
                            {c?.label || cat}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Scannable 2-Column Performance Box & Action Footer */}
                <div className="px-5 pb-5 space-y-3">
                  <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-[#F8FAF8] border border-emerald-900/10">
                    <div>
                      <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider">
                        Program Aktif
                      </div>
                      <div className="text-sm font-extrabold text-[#072418] mt-0.5">
                        {partnerPrograms.length} Program
                      </div>
                    </div>

                    <div className="text-right border-l border-border-subtle pl-2.5">
                      <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider">
                        Dana Dikelola
                      </div>
                      <div className="text-sm font-extrabold text-[#176B4D] mt-0.5">
                        {formatCompactIDR(totalDisbursed)}
                      </div>
                    </div>
                  </div>

                  {/* PIC Chip & Action Button */}
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <div className="flex items-center gap-1.5 text-[11px] text-ink-secondary truncate">
                      <UserCheck className="w-3.5 h-3.5 text-[#176B4D] shrink-0" />
                      <span className="truncate font-semibold">{partner.contactPerson.name}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPartner(partner);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-mint group-hover:bg-[#072418] text-brand-primary group-hover:text-[#FDE047] font-extrabold text-xs transition-colors shrink-0 cursor-pointer"
                    >
                      <span>Profil Lengkap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
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
                  <th className="py-3.5 px-4">Mitra Pelaksana</th>
                  <th className="py-3.5 px-4">Wilayah Kerja</th>
                  <th className="py-3.5 px-4">Fokus Sektor</th>
                  <th className="py-3.5 px-4">Program</th>
                  <th className="py-3.5 px-4">Dana Dikelola</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredPartners.map((partner) => {
                  const partnerPrograms = programs.filter((p) => p.partnerId === partner.id);
                  const totalDisbursed = partnerPrograms.reduce((sum, p) => sum + p.disbursedAmount, 0);
                  return (
                    <tr
                      key={partner.id}
                      onClick={() => setSelectedPartner(partner)}
                      className="hover:bg-surface-secondary/50 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-xl bg-[#072418] text-[#FDE047] font-black text-[10px] flex items-center justify-center shrink-0">
                            {partner.code}
                          </span>
                          <div>
                            <div className="font-bold text-ink-primary">{partner.name}</div>
                            <div className="text-[10px] text-ink-muted">{partner.subType}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-ink-secondary">
                        {partner.region}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {partner.focusAreas.map((cat) => {
                            const c = CATEGORY_LABELS[cat];
                            return (
                              <span key={cat} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${c?.badgeBg || 'bg-gray-50'}`}>
                                {c?.label || cat}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-ink-primary">
                        {partnerPrograms.length} Program
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-[#176B4D]">
                        {formatCompactIDR(totalDisbursed)}
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
                          className="px-3 py-1.5 rounded-xl bg-brand-mint text-brand-primary font-bold text-xs hover:bg-[#072418] hover:text-[#FDE047] transition-colors cursor-pointer"
                        >
                          Profil
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
            <div className="flex items-center justify-between p-3.5 bg-brand-mint/50 border border-emerald-200 rounded-2xl">
              <span className="font-bold text-brand-primary flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                Verifikasi Due Diligence Universa (Demo)
              </span>
              <StatusBadge status={selectedPartner.verificationBadge} size="sm" />
            </div>

            <div>
              <h4 className="font-bold text-ink-primary mb-1.5">Profil & Kapasitas Lembaga:</h4>
              <p className="p-3.5 bg-surface-secondary/60 rounded-2xl border border-border-subtle leading-relaxed text-ink-secondary">
                {selectedPartner.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#F8FAF8] border border-border-subtle">
              <div>
                <div className="text-[10px] font-bold uppercase text-ink-muted">Koordinator PIC</div>
                <div className="font-bold text-ink-primary mt-0.5">{selectedPartner.contactPerson.name}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-ink-muted">Kontak Resmi</div>
                <div className="font-medium text-ink-secondary mt-0.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#176B4D]" />
                  <span>{selectedPartner.contactPerson.emailDemo}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-ink-primary mb-2">Program yang Dikelola Saat Ini:</h4>
              <div className="space-y-2">
                {programs
                  .filter((p) => p.partnerId === selectedPartner.id)
                  .map((p) => (
                    <div key={p.id} className="p-3 rounded-2xl border border-border-subtle bg-surface-card flex items-center justify-between">
                      <div>
                        <div className="font-bold text-ink-primary">{p.title}</div>
                        <div className="text-[11px] text-ink-muted mt-0.5">
                          {p.code} • {p.location} • Anggaran: {formatCompactIDR(p.approvedBudget)}
                        </div>
                      </div>
                      <StatusBadge status={p.status} size="sm" />
                    </div>
                  ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border-subtle flex justify-end">
              <button
                onClick={() => setSelectedPartner(null)}
                className="px-4 py-2 bg-[#072418] text-[#FDE047] font-bold rounded-xl cursor-pointer"
              >
                Tutup Profil
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Add Partner */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Daftarkan Mitra Pelaksana Baru"
        subtitle="Registrasi organisasi penggerak program CSR terverifikasi."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-ink-primary mb-1">Nama Organisasi / Lembaga *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Yayasan Terumbu Laut Nusantara"
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink-primary mb-1">Jenis Entitas *</label>
              <select
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              >
                <option value="Yayasan Sosial">Yayasan Sosial</option>
                <option value="Lembaga Konservasi Lingkungan">Lembaga Konservasi Lingkungan</option>
                <option value="Komunitas Pemberdayaan UMKM">Komunitas Pemberdayaan UMKM</option>
                <option value="Lembaga Kesehatan Masyarakat">Lembaga Kesehatan Masyarakat</option>
                <option value="Infrastruktur Komunitas">Infrastruktur Komunitas</option>
                <option value="Relawan Tanggap Darurat">Relawan Tanggap Darurat</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-ink-primary mb-1">Wilayah Operasional *</label>
              <input
                type="text"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Contoh: Jawa Timur & Bali"
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Deskripsi Singkat Visi & Kapasitas</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan rekam jejak, keahlian tim, dan legalitas lembaga..."
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink-primary mb-1">Nama PIC Koordinator</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Contoh: Rina Wahyuni"
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-ink-primary mb-1">Email Demo PIC</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="rina@lembaga.demo"
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 font-semibold text-ink-muted hover:text-ink-primary cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold bg-[#072418] text-[#FDE047] rounded-xl shadow-xs cursor-pointer"
            >
              Simpan Mitra (Demo)
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
