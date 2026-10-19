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
  ExternalLink,
  Coins,
  TrendingUp,
  LayoutGrid,
  List,
  CheckCircle2,
  BadgeCheck,
  Award,
  ChevronRight,
  FileSpreadsheet,
  PieChart,
  Briefcase
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
    { key: 'BUMN', label: 'BUMN & Energi' },
    { key: 'Swasta', label: 'Swasta Tbk' },
    { key: 'Perbankan', label: 'Perbankan & Finansial' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Executive Header + Corporate ESG Treasury Banner */}
      <div className="bg-surface-card rounded-3xl border border-border-subtle shadow-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#072418] text-[#FDE047] flex items-center justify-center shadow-sm shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#072418] tracking-tight">
                  Perbendaharaan & Portofolio Corporate Funder
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold border border-emerald-300">
                  {funders.length} Korporasi Terdaftar
                </span>
              </div>
              <p className="text-xs text-ink-muted mt-0.5">
                Monitoring komitmen anggaran TJSL/CSR perusahaan mitra, kepatuhan PROPER, dan alokasi saldo siap salur.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            {/* View Switcher: Portofolio Treasury / Buku Besar Tabel */}
            <div className="inline-flex items-center p-1 rounded-xl bg-surface-secondary border border-border-subtle">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#072418] shadow-2xs'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
                title="Tampilan Portofolio Treasury"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline pr-1">Portofolio</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#072418] shadow-2xs'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
                title="Tampilan Buku Besar Tabel"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline pr-1">Buku Besar</span>
              </button>
            </div>

            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#072418] hover:bg-[#176B4D] text-[#FDE047] text-xs font-extrabold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Corporate Funder</span>
            </button>
          </div>
        </div>

        {/* 4-Stat Corporate Treasury KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-border-subtle">
          <div className="p-3.5 bg-surface-secondary/50 rounded-2xl border border-border-subtle">
            <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block">
              Total Komitmen Pagu
            </span>
            <span className="text-lg font-black text-[#072418] mt-0.5 block">
              {formatCompactIDR(platformFunding.totalCommitted)}
            </span>
            <span className="text-[10px] text-ink-muted font-medium">Bujet CSR Resmi Disahkan</span>
          </div>

          <div className="p-3.5 bg-surface-secondary/50 rounded-2xl border border-border-subtle">
            <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block">
              Dana Terserap
            </span>
            <span className="text-lg font-black text-[#176B4D] mt-0.5 block">
              {formatCompactIDR(platformFunding.totalDisbursed)}
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold">
              {platformFunding.totalCommitted > 0
                ? `${Math.round((platformFunding.totalDisbursed / platformFunding.totalCommitted) * 100)}% Tersalurkan Lapangan`
                : '0% Serapan'}
            </span>
          </div>

          <div className="p-3.5 bg-surface-secondary/50 rounded-2xl border border-border-subtle">
            <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block">
              Likuiditas Saldo Bebas
            </span>
            <span className="text-lg font-black text-blue-700 mt-0.5 block">
              {formatCompactIDR(platformFunding.availableUnallocatedBalance)}
            </span>
            <span className="text-[10px] text-blue-800 font-medium">Siap Dialokasikan ke Program</span>
          </div>

          <div className="p-3.5 bg-surface-secondary/50 rounded-2xl border border-border-subtle">
            <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block">
              Kepatuhan ESG / PROPER
            </span>
            <span className="text-lg font-black text-[#072418] mt-0.5 block">
              100% WTP
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Audit Keuangan Bersih
            </span>
          </div>
        </div>

        {/* Sector Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-border-subtle">
          {sectorTabs.map((tab) => {
            const isActive = sectorFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSectorFilter(tab.key)}
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
            placeholder="Cari nama perusahaan, kode bursa, sektor industri (BUMN, Swasta, Perbankan), atau domisili..."
            className="w-full pl-9 pr-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* 3. Corporate Funder Content Views */}
      {filteredFunders.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="Funder Tidak Ditemukan"
          description="Tidak ada perusahaan atau korporasi yang cocok dengan pencarian Anda."
          actionLabel="Tampilkan Semua Funder"
          onAction={() => {
            setSearch('');
            setSectorFilter('all');
          }}
        />
      ) : viewMode === 'grid' ? (
        /* KONSEP BARU: Corporate ESG Treasury Portfolio Cards (DISTINCT Carbon/Deep Forest Enterprise Styling) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                className="bg-white rounded-3xl border border-border-subtle hover:border-[#176B4D] hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group cursor-pointer overflow-hidden"
              >
                <div>
                  {/* Enterprise Dark Forest Header Banner */}
                  <div className="bg-gradient-to-r from-[#072418] via-[#0b3323] to-[#072418] text-white p-5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-black bg-white/15 px-2 py-0.5 rounded text-[#FDE047] border border-white/20">
                          {funder.code}
                        </span>
                        <span className="text-[11px] font-extrabold text-white/90 uppercase tracking-wider">
                          {funder.subType}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-300">
                        <Award className="w-3 h-3 text-[#FDE047]" />
                        <span>PROPER Hijau / Emas</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-black text-lg text-white group-hover:text-[#FDE047] transition-colors tracking-tight">
                        {funder.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-white/70 mt-1">
                        <MapPin className="w-3 h-3 text-[#FDE047] shrink-0" />
                        <span className="truncate">{funder.region}</span>
                      </div>
                    </div>
                  </div>

                  {/* Treasury Utilization Bar & Financial Stats */}
                  <div className="p-5 space-y-4">
                    {/* Visual Segmented Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-ink-secondary">Pemanfaatan Saldo TJSL</span>
                        <span className="font-mono text-ink-muted">{disbursedPct}% Tersalurkan</span>
                      </div>
                      
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                        <div
                          style={{ width: `${disbursedPct}%` }}
                          className="bg-[#176B4D] h-full"
                          title={`Tersalurkan: ${disbursedPct}%`}
                        />
                        <div
                          style={{ width: `${Math.max(0, allocatedPct - disbursedPct)}%` }}
                          className="bg-amber-400 h-full"
                          title="Teralokasi Program"
                        />
                        <div
                          style={{ width: `${availablePct}%` }}
                          className="bg-blue-200 h-full"
                          title={`Saldo Bebas: ${availablePct}%`}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-ink-muted pt-0.5">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#176B4D]" /> Terserap
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-amber-400" /> Dialokasikan
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-300" /> Saldo Siap Salur
                        </span>
                      </div>
                    </div>

                    {/* 3-Column Financial Breakdown */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F8FAF9] border border-emerald-950/5 text-center">
                      <div>
                        <span className="text-[10px] text-ink-muted block font-medium">Komitmen Pagu</span>
                        <span className="font-black text-sm text-[#072418] mt-0.5 block">
                          {formatCompactIDR(metrics.committed)}
                        </span>
                      </div>

                      <div className="border-x border-border-subtle px-1">
                        <span className="text-[10px] text-ink-muted block font-medium">Tersalurkan</span>
                        <span className="font-black text-sm text-[#176B4D] mt-0.5 block">
                          {formatCompactIDR(metrics.disbursed)}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-ink-muted block font-medium">Saldo Bebas</span>
                        <span className="font-black text-sm text-blue-700 mt-0.5 block">
                          {formatCompactIDR(metrics.availableBalance)}
                        </span>
                      </div>
                    </div>

                    {/* Connected Programs Showcase */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-ink-secondary">Inisiatif Program Didanai:</span>
                        <span className="font-bold text-[#176B4D] text-[10px]">
                          {funderPrograms.length} Inisiatif Aktif
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {funderPrograms.length === 0 ? (
                          <span className="text-[11px] text-ink-muted italic">Belum ada inisiatif yang terhubung</span>
                        ) : (
                          funderPrograms.map((p) => (
                            <span
                              key={p.id}
                              className="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-surface-secondary text-[#072418] border border-border-subtle truncate max-w-[200px]"
                            >
                              {p.title}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corporate PIC & Bottom Actions */}
                <div className="p-5 pt-3 border-t border-border-subtle flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 pr-2 text-xs">
                    <Mail className="w-3.5 h-3.5 text-ink-muted shrink-0" />
                    <span className="font-semibold text-ink-secondary truncate">
                      {funder.contactPerson.name} ({funder.contactPerson.emailDemo})
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFunder(funder);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#072418] hover:bg-[#176B4D] text-[#FDE047] font-bold text-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Rincian Buku Besar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Tabel Buku Besar TJSL Korporasi */
        <div className="bg-surface-card rounded-3xl border border-border-subtle shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAF8] border-b border-border-subtle text-[11px] font-extrabold text-ink-secondary uppercase tracking-wider">
                  <th className="py-3.5 px-4">Korporasi Funder</th>
                  <th className="py-3.5 px-4">Tipe Industri</th>
                  <th className="py-3.5 px-4">Komitmen Pagu</th>
                  <th className="py-3.5 px-4">Tersalurkan</th>
                  <th className="py-3.5 px-4">Saldo Bebas</th>
                  <th className="py-3.5 px-4">Program Aktif</th>
                  <th className="py-3.5 px-4">Status Verifikasi</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredFunders.map((funder) => {
                  const metrics = calculateFunderFunding(funder.id, fundingRecords);
                  const funderPrograms = programs.filter((p) => p.funderId === funder.id);
                  return (
                    <tr
                      key={funder.id}
                      onClick={() => setSelectedFunder(funder)}
                      className="hover:bg-surface-secondary/50 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-xl bg-[#072418] text-[#FDE047] font-black text-[10px] flex items-center justify-center shrink-0">
                            {funder.code}
                          </span>
                          <div>
                            <div className="font-bold text-[#072418]">{funder.name}</div>
                            <div className="text-[10px] text-ink-muted">{funder.region}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-ink-secondary">
                        {funder.subType}
                      </td>
                      <td className="py-3.5 px-4 font-black text-[#072418]">
                        {formatCompactIDR(metrics.committed)}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-[#176B4D]">
                        {formatCompactIDR(metrics.disbursed)}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-blue-700">
                        {formatCompactIDR(metrics.availableBalance)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-ink-primary">
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
                          className="px-3 py-1.5 rounded-xl bg-[#072418] text-[#FDE047] font-bold text-xs hover:bg-[#176B4D] transition-colors cursor-pointer"
                        >
                          Buku Besar
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
              <h4 className="font-bold text-ink-primary mb-1">Profil Korporasi & Kebijakan TJSL:</h4>
              <p className="p-3 bg-surface-secondary/60 rounded-xl border border-border-subtle leading-relaxed text-ink-secondary">
                {selectedFunder.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-ink-primary mb-1.5">Inisiatif Program yang Didanai:</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {programs
                  .filter((p) => p.funderId === selectedFunder.id)
                  .map((p) => (
                    <div key={p.id} className="p-2.5 rounded-xl border border-border-subtle bg-surface-card flex items-center justify-between">
                      <div>
                        <div className="font-bold text-ink-primary">{p.title}</div>
                        <div className="text-[11px] text-ink-muted">
                          Alokasi: {formatCompactIDR(p.approvedBudget)} • Realisasi Serapan: {formatCompactIDR(p.disbursedAmount)}
                        </div>
                      </div>
                      <StatusBadge status={p.status} size="sm" />
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-3 bg-surface-secondary/40 rounded-xl border border-border-subtle space-y-1">
              <div className="font-bold text-ink-primary">Kontak Pejabat CSR (PIC):</div>
              <div className="text-ink-secondary">
                {selectedFunder.contactPerson.name} • {selectedFunder.contactPerson.emailDemo} • {selectedFunder.contactPerson.phoneDemo}
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
              className="px-4 py-2 font-bold bg-[#072418] text-[#FDE047] rounded-xl shadow-xs cursor-pointer hover:bg-[#176B4D]"
            >
              Simpan Funder (Demo)
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
