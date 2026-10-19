import React, { useState, useMemo } from 'react';
import {
  Building2,
  Plus,
  Search,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  MapPin,
  Mail,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { Organization, ProgramCategory } from '../../types/csr';
import { calculateFunderFunding } from '../../lib/calculations';
import { formatCompactIDR, formatIDR, CATEGORY_LABELS } from '../../lib/formatters';

export const FundersPage: React.FC = () => {
  const { funders, programs, fundingRecords, createOrganization } = useCSRStore();

  const [search, setSearch] = useState('');
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
      return (
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.subType.toLowerCase().includes(search.toLowerCase()) ||
        f.region.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [funders, search]);

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
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-mint text-brand-primary">
              <Building2 className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-ink-primary">Direktori Corporate Funder</h1>
          </div>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            Perusahaan pemberi dana TJSL/CSR dengan alokasi anggaran terukur, pemantauan komitmen, dan saldo siap salur.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Tambah Corporate Funder
        </button>
      </div>

      {/* Search */}
      <div className="bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card">
        <div className="relative">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari perusahaan atau tipe industri (BUMN, Swasta, Perbankan)..."
            className="w-full pl-9 pr-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Funders Grid */}
      {filteredFunders.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="Funder Tidak Ditemukan"
          description="Tidak ada perusahaan yang cocok dengan pencarian Anda."
          actionLabel="Tampilkan Semua Funder"
          onAction={() => setSearch('')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFunders.map((funder) => {
            const metrics = calculateFunderFunding(funder.id, fundingRecords);
            const funderPrograms = programs.filter((p) => p.funderId === funder.id);

            return (
              <div
                key={funder.id}
                className="bg-surface-card rounded-2xl border border-border-subtle p-5 hover:border-brand-emerald hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider font-mono">
                        {funder.code} • {funder.subType}
                      </div>
                      <h3
                        onClick={() => setSelectedFunder(funder)}
                        className="font-bold text-base text-ink-primary group-hover:text-brand-primary transition-colors cursor-pointer mt-0.5"
                      >
                        {funder.name}
                      </h3>
                    </div>
                    <StatusBadge status={funder.verificationBadge} size="sm" />
                  </div>

                  <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                    {funder.description}
                  </p>

                  {/* Focus Areas Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {funder.focusAreas.map((cat) => {
                      const c = CATEGORY_LABELS[cat];
                      return (
                        <span key={cat} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${c?.badgeBg || 'bg-gray-50'}`}>
                          {c?.label || cat}
                        </span>
                      );
                    })}
                  </div>

                  <div className="space-y-1 text-xs text-ink-secondary pt-2 border-t border-border-subtle">
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="w-3.5 h-3.5 text-ink-muted shrink-0" />
                      <span>{funder.region}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-ink-muted">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span>{funder.contactPerson.name} ({funder.contactPerson.emailDemo})</span>
                    </div>
                  </div>
                </div>

                {/* 3 Financial Metrics Strip */}
                <div className="mt-4 pt-3 border-t border-border-subtle grid grid-cols-3 gap-2 text-center text-xs bg-surface-secondary/50 p-2.5 rounded-xl">
                  <div>
                    <span className="text-[10px] text-ink-muted block">Komitmen CSR</span>
                    <span className="font-extrabold text-brand-primary">
                      {formatCompactIDR(metrics.committed)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-muted block">Tersalurkan</span>
                    <span className="font-extrabold text-brand-emerald">
                      {formatCompactIDR(metrics.disbursed)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-muted block">Sisa Saldo Bebas</span>
                    <span className="font-extrabold text-blue-700">
                      {formatCompactIDR(metrics.availableBalance)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-2">
                  <span className="text-ink-muted font-medium">
                    Mendukung <strong>{funderPrograms.length} Program Aktif</strong>
                  </span>
                  <button
                    onClick={() => setSelectedFunder(funder)}
                    className="px-3 py-1.5 rounded-xl bg-surface-secondary hover:bg-surface-muted text-ink-primary font-bold transition-colors cursor-pointer"
                  >
                    Rincian Komitmen
                  </button>
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
              <h4 className="font-bold text-ink-primary mb-1">Profil Korporasi:</h4>
              <p className="p-3 bg-surface-secondary/60 rounded-xl border border-border-subtle leading-relaxed text-ink-secondary">
                {selectedFunder.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-ink-primary mb-1.5">Program yang Didanai:</h4>
              <div className="space-y-2">
                {programs
                  .filter((p) => p.funderId === selectedFunder.id)
                  .map((p) => (
                    <div key={p.id} className="p-2.5 rounded-xl border border-border-subtle bg-surface-card flex items-center justify-between">
                      <div>
                        <div className="font-bold text-ink-primary">{p.title}</div>
                        <div className="text-[11px] text-ink-muted">
                          Alokasi: {formatCompactIDR(p.approvedBudget)} • Realisasi: {formatCompactIDR(p.disbursedAmount)}
                        </div>
                      </div>
                      <StatusBadge status={p.status} size="sm" />
                    </div>
                  ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border-subtle flex justify-end">
              <button
                onClick={() => setSelectedFunder(null)}
                className="px-4 py-2 bg-surface-secondary hover:bg-surface-muted text-ink-primary font-semibold rounded-xl cursor-pointer"
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
            <label className="block font-bold text-ink-primary mb-1">Nama Perusahaan / Korporasi *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: PT Energi Surya Nusantara Tbk"
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink-primary mb-1">Bentuk Badan Usaha *</label>
              <select
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              >
                <option value="BUMN">BUMN</option>
                <option value="Swasta Nasional">Swasta Nasional</option>
                <option value="Perbankan & Keuangan">Perbankan & Keuangan</option>
                <option value="Multinasional">Multinasional</option>
                <option value="Yayasan Korporat">Yayasan Korporat</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-ink-primary mb-1">Wilayah Operasional</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Fokus & Kebijakan Tanggung Jawab Sosial</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan pilar keberlanjutan atau fokus CSR korporasi..."
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink-primary mb-1">Nama PIC CSR / TJSL</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Contoh: Dedi Mulyadi"
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-ink-primary mb-1">Email Demo PIC</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="dedi@perusahaan.demo"
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
              Simpan Funder (Demo)
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
