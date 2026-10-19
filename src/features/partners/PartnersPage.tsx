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
  UserCheck,
  Award,
  Globe,
  Building,
  ExternalLink,
  ChevronRight,
  BadgeCheck,
  Briefcase
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
    { key: 'Sumatera', label: 'Sumatera & Riau' },
    { key: 'Kalimantan', label: 'Kalimantan' },
    { key: 'Indonesia Timur', label: 'Sulawesi & Timur' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Executive Header + Network Summary Ribbon */}
      <div className="bg-surface-card rounded-3xl border border-border-subtle shadow-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#072418] text-[#FDE047] flex items-center justify-center shadow-sm shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#072418] tracking-tight">
                  Jaringan Mitra Pelaksana Lapangan
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold border border-emerald-300">
                  {partners.length} Lembaga Terakreditasi
                </span>
              </div>
              <p className="text-xs text-ink-muted mt-0.5">
                Direktori yayasan, NGO, dan lembaga komunitas berlegalitas resmi dengan rekam jejak eksekusi terverifikasi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            {/* View Switcher: Paspor Kartu / Tabel */}
            <div className="inline-flex items-center p-1 rounded-xl bg-surface-secondary border border-border-subtle">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#072418] shadow-2xs'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
                title="Tampilan Paspor Kredensial"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline pr-1">Paspor Mitra</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#072418] shadow-2xs'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
                title="Tampilan Tabel Direktori"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline pr-1">Tabel</span>
              </button>
            </div>

            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#072418] hover:bg-[#176B4D] text-[#FDE047] text-xs font-extrabold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Registrasi Mitra Baru</span>
            </button>
          </div>
        </div>

        {/* 4-Stat Network KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-border-subtle">
          <div className="p-3 bg-surface-secondary/50 rounded-2xl border border-border-subtle">
            <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block">
              Mitra Terverifikasi
            </span>
            <span className="text-lg font-black text-[#072418] mt-0.5 block">
              {partners.length} Organisasi
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <BadgeCheck className="w-3 h-3" /> Due Diligence Lolos
            </span>
          </div>

          <div className="p-3 bg-surface-secondary/50 rounded-2xl border border-border-subtle">
            <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block">
              Program Dikelola
            </span>
            <span className="text-lg font-black text-[#072418] mt-0.5 block">
              {programs.length} Inisiatif
            </span>
            <span className="text-[10px] text-ink-muted">Lintas 6 Pilar Keberlanjutan</span>
          </div>

          <div className="p-3 bg-surface-secondary/50 rounded-2xl border border-border-subtle">
            <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block">
              Dana Disalurkan
            </span>
            <span className="text-lg font-black text-[#176B4D] mt-0.5 block">
              {formatCompactIDR(totalPartnerDisbursed)}
            </span>
            <span className="text-[10px] text-ink-muted">Akuntabel & Terverifikasi</span>
          </div>

          <div className="p-3 bg-surface-secondary/50 rounded-2xl border border-border-subtle">
            <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block">
              Tingkat Kepatuhan Audit
            </span>
            <span className="text-lg font-black text-[#072418] mt-0.5 block">
              99.2%
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Laporan Tepat Waktu
            </span>
          </div>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-border-subtle">
          {regionTabs.map((tab) => {
            const isActive = regionFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setRegionFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#072418] text-[#FDE047] shadow-xs'
                    : 'bg-surface-secondary/70 hover:bg-surface-secondary text-ink-muted hover:text-ink-primary'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="bg-surface-card p-3 rounded-2xl border border-border-subtle shadow-card">
        <div className="relative">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama lembaga, bentuk yayasan, kota/provinsi, atau kontak koordinator..."
            className="w-full pl-9 pr-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* 3. Partners Content Views */}
      {filteredPartners.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Mitra Tidak Ditemukan"
          description="Tidak ada lembaga pelaksana yang cocok dengan kriteria pencarian Anda."
          actionLabel="Tampilkan Semua Mitra"
          onAction={() => {
            setSearch('');
            setRegionFilter('all');
          }}
        />
      ) : viewMode === 'grid' ? (
        /* KONSEP BARU: Partner Credential Passport Cards (NO PHOTO COVERS - Distinguished Institutional Seal) */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredPartners.map((partner) => {
            const partnerPrograms = programs.filter((p) => p.partnerId === partner.id);
            const totalDisbursed = partnerPrograms.reduce((sum, p) => sum + p.disbursedAmount, 0);

            return (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="bg-white rounded-3xl border border-border-subtle p-5 hover:border-[#176B4D] hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
              >
                <div className="space-y-4">
                  {/* Top: Embossed Crest + Tier Accreditation & Verification */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Organization Crest / Monogram Seal */}
                      <div className="w-13 h-13 rounded-2xl bg-[#072418] text-[#FDE047] font-black text-sm flex items-center justify-center shadow-md shrink-0 border border-emerald-900/40">
                        {partner.code}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                          <Award className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>Tier 1 • Akreditasi A</span>
                        </div>
                        <h3 className="font-extrabold text-base text-[#072418] group-hover:text-[#176B4D] transition-colors line-clamp-1 leading-snug mt-0.5">
                          {partner.name}
                        </h3>
                        <div className="text-[11px] text-ink-muted flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-ink-muted" />
                          <span className="truncate">{partner.subType}</span>
                        </div>
                      </div>
                    </div>

                    <StatusBadge status={partner.verificationBadge} size="sm" />
                  </div>

                  {/* Coverage Territory & HQ */}
                  <div className="flex items-center gap-1.5 text-xs text-ink-secondary bg-surface-secondary/60 px-3 py-1.5 rounded-xl">
                    <MapPin className="w-3.5 h-3.5 text-[#176B4D] shrink-0" />
                    <span className="font-semibold truncate">{partner.region}</span>
                  </div>

                  {/* Focus Areas Expertise Badges */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block">
                      Pilar Keahlian Lapangan:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
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

                  {/* Clean 3-Track Record Gauges (No heavy box containers) */}
                  <div className="pt-3 border-t border-border-subtle grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-ink-muted block font-medium">Program Aktif</span>
                      <span className="font-black text-sm text-[#072418] mt-0.5 block">
                        {partnerPrograms.length} Inisiatif
                      </span>
                    </div>

                    <div className="border-x border-border-subtle px-1">
                      <span className="text-[10px] text-ink-muted block font-medium">Dana Dikelola</span>
                      <span className="font-black text-sm text-[#176B4D] mt-0.5 block">
                        {formatCompactIDR(totalDisbursed)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-ink-muted block font-medium">Audit Mutu</span>
                      <span className="font-black text-sm text-emerald-700 mt-0.5 block">
                        98.5%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ground Coordinator & Action CTA */}
                <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded-full bg-brand-mint text-brand-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                      {partner.contactPerson.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="truncate">
                      <div className="text-[11px] font-bold text-ink-primary truncate">
                        {partner.contactPerson.name}
                      </div>
                      <div className="text-[10px] text-ink-muted">Koordinator Lapangan</div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPartner(partner);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-surface-secondary group-hover:bg-[#072418] text-ink-primary group-hover:text-[#FDE047] font-extrabold text-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Paspor</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Tabel Direktori */
        <div className="bg-surface-card rounded-3xl border border-border-subtle shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAF8] border-b border-border-subtle text-[11px] font-extrabold text-ink-secondary uppercase tracking-wider">
                  <th className="py-3.5 px-4">Lembaga & Legalitas</th>
                  <th className="py-3.5 px-4">Wilayah Operasional</th>
                  <th className="py-3.5 px-4">Fokus Sektor</th>
                  <th className="py-3.5 px-4">Program</th>
                  <th className="py-3.5 px-4">Dana Tersalurkan</th>
                  <th className="py-3.5 px-4">Status Akreditasi</th>
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
                            <div className="font-bold text-[#072418]">{partner.name}</div>
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
                        {partnerPrograms.length} Inisiatif
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
                          className="px-3 py-1.5 rounded-xl bg-[#072418] text-[#FDE047] font-bold text-xs hover:bg-[#176B4D] transition-colors cursor-pointer"
                        >
                          Paspor
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
              <h4 className="font-bold text-ink-primary mb-1">Profil & Rekam Jejak Lapangan:</h4>
              <p className="p-3 bg-surface-secondary/60 rounded-xl border border-border-subtle leading-relaxed text-ink-secondary">
                {selectedPartner.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-ink-primary mb-1.5">Program CSR yang Sedang Dikelola:</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {programs
                  .filter((p) => p.partnerId === selectedPartner.id)
                  .map((p) => (
                    <div key={p.id} className="p-2.5 rounded-xl border border-border-subtle bg-surface-card flex items-center justify-between">
                      <div>
                        <div className="font-bold text-ink-primary">{p.title}</div>
                        <div className="text-[11px] text-ink-muted">
                          Pagu: {formatCompactIDR(p.approvedBudget)} • Serapan: {formatCompactIDR(p.disbursedAmount)}
                        </div>
                      </div>
                      <StatusBadge status={p.status} size="sm" />
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-3 bg-surface-secondary/40 rounded-xl border border-border-subtle space-y-1">
              <div className="font-bold text-ink-primary">Kontak Personel Lapangan (PIC):</div>
              <div className="text-ink-secondary">
                {selectedPartner.contactPerson.name} • {selectedPartner.contactPerson.emailDemo} • {selectedPartner.contactPerson.phoneDemo}
              </div>
            </div>

            <div className="pt-3 border-t border-border-subtle flex justify-end">
              <button
                onClick={() => setSelectedPartner(null)}
                className="px-4 py-2 bg-surface-secondary hover:bg-surface-muted text-ink-primary font-semibold rounded-xl cursor-pointer"
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
            <label className="block font-bold text-ink-primary mb-1">Nama Lembaga / Yayasan *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Yayasan Konservasi Bumi Biru"
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink-primary mb-1">Bentuk Badan Hukum *</label>
              <select
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              >
                <option value="Yayasan Sosial">Yayasan Sosial</option>
                <option value="Lembaga Konservasi">Lembaga Konservasi</option>
                <option value="Koperasi Masyarakat">Koperasi Masyarakat</option>
                <option value="Perkumpulan / Asosiasi">Perkumpulan / Asosiasi</option>
                <option value="Lembaga Pendidikan">Lembaga Pendidikan</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-ink-primary mb-1">Wilayah Kerja / Posko *</label>
              <input
                type="text"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Contoh: Jawa Barat & Banten"
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Deskripsi Singkat Profil & Pengalaman</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan spesialisasi tim lapangan dan portofolio kegiatan..."
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-ink-primary mb-1">Nama PIC Koordinator</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Dra. Siti Rahmawati"
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-ink-primary mb-1">Email Demo</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="siti@lembaga.demo"
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-ink-primary mb-1">No. Kontak / HP</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+62 812-..."
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
              className="px-4 py-2 font-bold bg-[#072418] text-[#FDE047] rounded-xl shadow-xs cursor-pointer hover:bg-[#176B4D]"
            >
              Simpan Mitra (Demo)
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
