import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Layers,
  Plus,
  Search,
  ArrowUpDown,
  MapPin,
  Building2,
  Users,
  ExternalLink,
  Edit,
  FolderOpen,
  LayoutGrid,
  List,
  Coins,
  TrendingUp,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProgramFormModal } from './ProgramFormModal';
import { formatCompactIDR, formatNumber, CATEGORY_LABELS } from '../../lib/formatters';
import { ProgramCategory } from '../../types/csr';

const CATEGORY_COVER_IMAGES: Record<ProgramCategory, string> = {
  lingkungan: '/images/hero_option_people_planting.jpg',
  pendidikan: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&auto=format&fit=crop&q=80',
  ekonomi_umkm: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=700&auto=format&fit=crop&q=80',
  kesehatan: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=700&auto=format&fit=crop&q=80',
  infrastruktur: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?w=700&auto=format&fit=crop&q=80',
  tanggap_bencana: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=700&auto=format&fit=crop&q=80',
  lainnya: '/images/hero-plantation.jpg',
};

export const ProgramsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { programs, partners, funders } = useCSRStore();

  const isCreateOpen = searchParams.get('action') === 'create';
  const [editingProgram, setEditingProgram] = useState<any>(null);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [funderFilter, setFunderFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'budget' | 'progress' | 'title'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredPrograms = useMemo(() => {
    return programs
      .filter((p) => {
        const matchesSearch =
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.code.toLowerCase().includes(search.toLowerCase()) ||
          p.location.toLowerCase().includes(search.toLowerCase());
        const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
        const matchesFunder = funderFilter === 'all' || p.funderId === funderFilter;
        return matchesSearch && matchesCat && matchesStatus && matchesFunder;
      })
      .sort((a, b) => {
        if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'budget') return b.approvedBudget - a.approvedBudget;
        if (sortBy === 'progress') return b.progressPercent - a.progressPercent;
        return a.title.localeCompare(b.title);
      });
  }, [programs, search, categoryFilter, statusFilter, funderFilter, sortBy]);

  const stats = useMemo(() => {
    const activeCount = programs.filter((p) => p.status === 'active').length;
    const totalBudget = programs.reduce((s, p) => s + p.approvedBudget, 0);
    const totalDisbursed = programs.reduce((s, p) => s + p.disbursedAmount, 0);
    const totalReached = programs.reduce((s, p) => s + p.reachedBeneficiaries, 0);
    return { activeCount, totalBudget, totalDisbursed, totalReached };
  }, [programs]);

  const openCreateModal = () => {
    setSearchParams({ action: 'create' });
  };

  const closeModals = () => {
    setSearchParams({});
    setEditingProgram(null);
  };

  const categoryTabs = [
    { key: 'all', label: 'Semua Pilar' },
    { key: 'lingkungan', label: 'Lingkungan' },
    { key: 'pendidikan', label: 'Pendidikan' },
    { key: 'ekonomi_umkm', label: 'UMKM' },
    { key: 'infrastruktur', label: 'Air & Infrastruktur' },
    { key: 'kesehatan', label: 'Kesehatan' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Executive Header + Quick KPI Strip */}
      <div className="bg-surface-card rounded-3xl border border-border-subtle shadow-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#072418] text-white flex items-center justify-center shadow-sm shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#072418] tracking-tight">
                Direktori Program CSR
              </h1>
              <p className="text-xs text-ink-muted mt-0.5">
                Pantau progres, serapan anggaran, dan capaian penerima manfaat di seluruh program aktif.
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
                title="Tampilan Kartu Visual"
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
                title="Tampilan Tabel Ringkas"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline pr-1">Tabel</span>
              </button>
            </div>

            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-[#072418] hover:bg-[#176B4D] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Program Baru</span>
            </button>
          </div>
        </div>

        {/* 4 Compact KPI Summary Boxes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-border-subtle">
          <div className="p-3.5 rounded-2xl bg-[#F8FAF8] border border-emerald-900/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#176B4D] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-ink-muted font-medium">Program Aktif</div>
              <div className="text-base font-extrabold text-[#072418]">
                {stats.activeCount} <span className="text-xs font-normal text-ink-muted">/ {programs.length} Total</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FAF8] border border-emerald-900/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#176B4D] flex items-center justify-center shrink-0">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-ink-muted font-medium">Pagu Disetujui</div>
              <div className="text-base font-extrabold text-[#072418]">{formatCompactIDR(stats.totalBudget)}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FAF8] border border-emerald-900/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-ink-muted font-medium">Dana Tersalurkan</div>
              <div className="text-base font-extrabold text-[#176B4D]">{formatCompactIDR(stats.totalDisbursed)}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FAF8] border border-emerald-900/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-ink-muted font-medium">Penerima Manfaat</div>
              <div className="text-base font-extrabold text-[#072418]">{formatNumber(stats.totalReached)} Jiwa</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Clean Filter Bar: Category Pills + Search & Compact Dropdowns */}
      <div className="bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card space-y-3">
        {/* Category Pill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categoryTabs.map((tab) => {
            const isActive = categoryFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setCategoryFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#072418] text-white shadow-2xs'
                    : 'bg-surface-secondary/70 text-ink-secondary hover:bg-surface-secondary hover:text-ink-primary'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search + Funder + Status + Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 pt-2 border-t border-border-subtle">
          <div className="relative lg:col-span-5">
            <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama program, kode, atau kota..."
              className="w-full pl-9 pr-3 py-2 bg-surface-secondary/60 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
            />
          </div>

          <div className="lg:col-span-3">
            <select
              value={funderFilter}
              onChange={(e) => setFunderFilter(e.target.value)}
              className="w-full px-3 py-2 bg-surface-secondary/60 hover:bg-surface-secondary border border-border-subtle rounded-xl text-xs text-ink-primary font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Funder Korporasi</option>
              {funders.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.code} — {f.name}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-surface-secondary/60 hover:bg-surface-secondary border border-border-subtle rounded-xl text-xs text-ink-primary font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif Berjalan</option>
              <option value="under_review">Dalam Peninjauan</option>
              <option value="approved">Disetujui</option>
              <option value="completed">Selesai</option>
            </select>
          </div>

          <div className="lg:col-span-2 flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-ink-muted shrink-0 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-surface-secondary/60 hover:bg-surface-secondary border border-border-subtle rounded-xl text-xs text-ink-primary font-medium focus:outline-none cursor-pointer"
            >
              <option value="date">Urut: Terbaru</option>
              <option value="budget">Urut: Anggaran</option>
              <option value="progress">Urut: Progres</option>
              <option value="title">Urut: Nama A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Programs Content: Scannable Visual Grid OR Compact Table */}
      {filteredPrograms.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="Tidak Ada Program Ditemukan"
          description="Tidak ada data program yang cocok dengan filter saat ini."
          actionLabel="Reset Filter"
          onAction={() => {
            setSearch('');
            setCategoryFilter('all');
            setStatusFilter('all');
            setFunderFilter('all');
          }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredPrograms.map((p) => {
            const partner = partners.find((pr) => pr.id === p.partnerId);
            const funder = funders.find((fn) => fn.id === p.funderId);
            const catInfo = CATEGORY_LABELS[p.category];
            const coverImg = CATEGORY_COVER_IMAGES[p.category] || CATEGORY_COVER_IMAGES.lingkungan;

            return (
              <div
                key={p.id}
                onClick={() => navigate(`/dashboard/programs/${p.id}`)}
                className="bg-surface-card rounded-3xl border border-border-subtle overflow-hidden hover:border-[#176B4D] hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                {/* Visual Cover Header */}
                <div>
                  <div className="relative h-36 overflow-hidden bg-[#072418]">
                    <img
                      src={coverImg}
                      alt={p.title}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#072418] via-black/25 to-black/30" />

                    {/* Top Row on Cover: Category Badge + Status */}
                    <div className="absolute top-3 inset-x-3.5 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-white border border-white/15 text-[10px] font-extrabold tracking-wide">
                        {catInfo?.label || p.category}
                      </span>
                      <StatusBadge status={p.status} size="sm" />
                    </div>

                    {/* Bottom Row on Cover: Location + Code */}
                    <div className="absolute bottom-2.5 inset-x-3.5 flex items-center justify-between text-white text-[11px]">
                      <span className="inline-flex items-center gap-1 font-semibold truncate pr-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                        <span className="truncate">{p.location}</span>
                      </span>
                      <span className="font-mono text-[10px] text-white/75 bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-xs shrink-0">
                        {p.code}
                      </span>
                    </div>
                  </div>

                  {/* Concise Title & Stakeholder Chips (Zero Wall-of-Text!) */}
                  <div className="p-5 pb-3 space-y-3">
                    <h3 className="font-extrabold text-sm sm:text-base text-[#072418] group-hover:text-[#176B4D] transition-colors line-clamp-2 leading-snug">
                      {p.title}
                    </h3>

                    {/* Compact Funder -> Partner Chip Strip */}
                    <div className="flex items-center gap-2 text-[11px] bg-surface-secondary/70 p-2 rounded-xl border border-border-subtle/70">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <span className="w-5 h-5 rounded-md bg-[#072418] text-white font-black text-[9px] flex items-center justify-center shrink-0">
                          {funder?.code?.slice(0, 3) || 'FND'}
                        </span>
                        <span className="font-bold text-ink-primary truncate" title={funder?.name}>
                          {funder?.name || 'Funder'}
                        </span>
                      </div>

                      <ArrowRight className="w-3 h-3 text-ink-muted shrink-0" />

                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <span className="w-5 h-5 rounded-md bg-emerald-100 text-[#176B4D] font-black text-[9px] flex items-center justify-center shrink-0">
                          {partner?.code?.slice(0, 3) || 'MTR'}
                        </span>
                        <span className="font-semibold text-ink-secondary truncate" title={partner?.name}>
                          {partner?.name || 'Mitra'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scannable Metric Box & Footer */}
                <div className="px-5 pb-5 space-y-3">
                  <div className="p-3.5 rounded-2xl bg-[#F8FAF8] border border-emerald-900/10 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider">
                          Anggaran
                        </div>
                        <div className="font-extrabold text-[#072418] text-sm mt-0.5">
                          {formatCompactIDR(p.approvedBudget)}
                        </div>
                        <div className="text-[10px] text-ink-muted">
                          Cair: <span className="font-bold text-[#176B4D]">{formatCompactIDR(p.disbursedAmount)}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider">
                          Dampak Riil
                        </div>
                        <div className="font-extrabold text-[#176B4D] text-sm mt-0.5">
                          {formatNumber(p.reachedBeneficiaries)} <span className="text-[10px] font-semibold">Jiwa</span>
                        </div>
                        <div className="text-[10px] text-ink-muted">
                          Target: {formatNumber(p.targetBeneficiaries)}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                        <span className="text-ink-secondary">Progres Milestone</span>
                        <span className="text-[#176B4D] bg-emerald-100 px-1.5 py-0.2 rounded font-extrabold">
                          {p.progressPercent}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#176B4D] rounded-full transition-all"
                          style={{ width: `${p.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Action Bar */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProgram(p);
                      }}
                      className="px-2.5 py-1.5 text-[11px] font-semibold text-ink-muted hover:text-ink-primary hover:bg-surface-secondary rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-mint group-hover:bg-[#072418] text-brand-primary group-hover:text-white text-xs font-extrabold transition-colors">
                      <span>Buka Detail</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
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
                  <th className="py-3.5 px-4">Program & Lokasi</th>
                  <th className="py-3.5 px-4">Pilar</th>
                  <th className="py-3.5 px-4">Funder & Mitra</th>
                  <th className="py-3.5 px-4">Anggaran / Cair</th>
                  <th className="py-3.5 px-4">Progres</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredPrograms.map((p) => {
                  const partner = partners.find((pr) => pr.id === p.partnerId);
                  const funder = funders.find((fn) => fn.id === p.funderId);
                  const catInfo = CATEGORY_LABELS[p.category];
                  return (
                    <tr
                      key={p.id}
                      onClick={() => navigate(`/dashboard/programs/${p.id}`)}
                      className="hover:bg-surface-secondary/50 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-mono text-[10px] text-ink-muted">{p.code}</div>
                        <div className="font-bold text-ink-primary line-clamp-1">{p.title}</div>
                        <div className="text-[11px] text-ink-muted flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {p.location}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${catInfo?.badgeBg || 'bg-gray-50'}`}>
                          {catInfo?.label || p.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-ink-primary">{funder?.code}</div>
                        <div className="text-[11px] text-ink-muted truncate max-w-[160px]">{partner?.name}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-ink-primary">{formatCompactIDR(p.approvedBudget)}</div>
                        <div className="text-[11px] text-[#176B4D] font-semibold">{formatCompactIDR(p.disbursedAmount)}</div>
                      </td>
                      <td className="py-3.5 px-4 w-32">
                        <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                          <span>{p.progressPercent}%</span>
                          <span className="text-[10px] text-ink-muted">{formatNumber(p.reachedBeneficiaries)} jiwa</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#176B4D] rounded-full" style={{ width: `${p.progressPercent}%` }} />
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={p.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/dashboard/programs/${p.id}`);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-brand-mint text-brand-primary font-bold text-xs hover:bg-[#072418] hover:text-white transition-colors cursor-pointer"
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

      {/* Modals */}
      {(isCreateOpen || editingProgram) && (
        <ProgramFormModal
          isOpen={true}
          onClose={closeModals}
          initialData={editingProgram}
        />
      )}
    </div>
  );
};
