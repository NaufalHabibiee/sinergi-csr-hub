import React, { useState, useMemo } from 'react';
import {
  Users,
  Plus,
  Search,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Layers,
  Wallet,
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { Organization, ProgramCategory } from '../../types/csr';
import { formatCompactIDR, CATEGORY_LABELS } from '../../lib/formatters';

export const PartnersPage: React.FC = () => {
  const { partners, programs, createOrganization, updateOrganization } = useCSRStore();

  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
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
      const matchesRegion = regionFilter === 'all' || p.region.toLowerCase().includes(regionFilter.toLowerCase());
      return matchesSearch && matchesRegion;
    });
  }, [partners, search, regionFilter]);

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
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-mint text-brand-primary">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-ink-primary">Direktori Mitra Pelaksana</h1>
          </div>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            Jejaring lembaga sosial, yayasan lingkungan, dan komunitas terverifikasi dengan rekam jejak pelaksanaan program sosial terukur.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Daftarkan Mitra Baru
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari lembaga sosial, spesialisasi, atau wilayah kerja..."
            className="w-full pl-9 pr-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
          />
        </div>

        <div>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="w-full px-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Wilayah</option>
            <option value="Jawa">Pulau Jawa</option>
            <option value="Sumatera">Sumatera & Riau</option>
            <option value="Kalimantan">Kalimantan</option>
            <option value="Nusa Tenggara">Nusa Tenggara & Maluku</option>
          </select>
        </div>
      </div>

      {/* Partners Grid */}
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPartners.map((partner) => {
            const partnerPrograms = programs.filter((p) => p.partnerId === partner.id);
            const totalDisbursed = partnerPrograms.reduce((sum, p) => sum + p.disbursedAmount, 0);

            return (
              <div
                key={partner.id}
                className="bg-surface-card rounded-2xl border border-border-subtle p-5 hover:border-brand-emerald hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider font-mono">
                        {partner.code} • {partner.subType}
                      </div>
                      <h3
                        onClick={() => setSelectedPartner(partner)}
                        className="font-bold text-base text-ink-primary group-hover:text-brand-primary transition-colors cursor-pointer mt-0.5"
                      >
                        {partner.name}
                      </h3>
                    </div>
                    <StatusBadge status={partner.verificationBadge} size="sm" />
                  </div>

                  <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                    {partner.description}
                  </p>

                  {/* Focus Areas Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {partner.focusAreas.map((cat) => {
                      const c = CATEGORY_LABELS[cat];
                      return (
                        <span key={cat} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${c?.badgeBg || 'bg-gray-50'}`}>
                          {c?.label || cat}
                        </span>
                      );
                    })}
                  </div>

                  {/* Contact & Region */}
                  <div className="space-y-1 text-xs text-ink-secondary pt-2 border-t border-border-subtle">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-ink-muted shrink-0" />
                      <span>{partner.region}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-ink-muted">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span>{partner.contactPerson.name} ({partner.contactPerson.emailDemo})</span>
                    </div>
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] text-ink-muted">Program Berjalan</div>
                    <div className="font-bold text-ink-primary">
                      {partnerPrograms.length} Program
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-ink-muted">Dana Tersalurkan</div>
                    <div className="font-bold text-brand-emerald">
                      {formatCompactIDR(totalDisbursed)}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPartner(partner)}
                    className="px-3 py-1.5 rounded-xl bg-surface-secondary hover:bg-surface-muted text-ink-primary font-bold text-xs transition-colors cursor-pointer"
                  >
                    Profil Lengkap
                  </button>
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
            <div className="flex items-center justify-between p-3 bg-brand-mint/50 border border-emerald-200 rounded-xl">
              <span className="font-semibold text-brand-primary flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                Verifikasi Due Diligence Universa (Demo)
              </span>
              <StatusBadge status={selectedPartner.verificationBadge} size="sm" />
            </div>

            <div>
              <h4 className="font-bold text-ink-primary mb-1">Profil Organisasi:</h4>
              <p className="p-3 bg-surface-secondary/60 rounded-xl border border-border-subtle leading-relaxed text-ink-secondary">
                {selectedPartner.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-ink-primary mb-1.5">Program yang Dikelola Saat Ini:</h4>
              <div className="space-y-2">
                {programs
                  .filter((p) => p.partnerId === selectedPartner.id)
                  .map((p) => (
                    <div key={p.id} className="p-2.5 rounded-xl border border-border-subtle bg-surface-card flex items-center justify-between">
                      <div>
                        <div className="font-bold text-ink-primary">{p.title}</div>
                        <div className="text-[11px] text-ink-muted">{p.code} • {p.location}</div>
                      </div>
                      <StatusBadge status={p.status} size="sm" />
                    </div>
                  ))}
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
              className="px-4 py-2 font-bold bg-brand-primary text-white rounded-xl shadow-xs cursor-pointer"
            >
              Simpan Mitra (Demo)
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
