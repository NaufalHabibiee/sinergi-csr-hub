import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Layers,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MapPin,
  Building2,
  Users,
  Calendar,
  ExternalLink,
  Edit,
  FolderOpen
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProgramFormModal } from './ProgramFormModal';
import { formatCompactIDR, formatDateID, formatNumber, CATEGORY_LABELS } from '../../lib/formatters';
import { ProgramCategory, ProgramStatus } from '../../types/csr';

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
  const [partnerFilter, setPartnerFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'budget' | 'progress' | 'title'>('date');

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
        const matchesPartner = partnerFilter === 'all' || p.partnerId === partnerFilter;
        return matchesSearch && matchesCat && matchesStatus && matchesFunder && matchesPartner;
      })
      .sort((a, b) => {
        if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'budget') return b.approvedBudget - a.approvedBudget;
        if (sortBy === 'progress') return b.progressPercent - a.progressPercent;
        return a.title.localeCompare(b.title);
      });
  }, [programs, search, categoryFilter, statusFilter, funderFilter, partnerFilter, sortBy]);

  const openCreateModal = () => {
    setSearchParams({ action: 'create' });
  };

  const closeModals = () => {
    setSearchParams({});
    setEditingProgram(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-mint text-brand-primary">
              <Layers className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-ink-primary">Direktori Program CSR</h1>
          </div>
          <p className="text-xs text-ink-muted mt-1">
            Daftar seluruh program tanggung jawab sosial, pilar lingkungan, beasiswa, dan pemberdayaan masyarakat.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Tambah Program Baru
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari program, kode (PRG-...), atau lokasi..."
              className="w-full pl-9 pr-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
            />
          </div>

          {/* Sektor Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Sektor / Kategori</option>
              <option value="lingkungan">Lingkungan & Reboisasi</option>
              <option value="pendidikan">Pendidikan & Beasiswa</option>
              <option value="ekonomi_umkm">Pemberdayaan UMKM</option>
              <option value="kesehatan">Kesehatan Masyarakat</option>
              <option value="infrastruktur">Infrastruktur & Air Bersih</option>
              <option value="tanggap_bencana">Tanggap Bencana</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif Berjalan</option>
              <option value="under_review">Dalam Peninjauan</option>
              <option value="approved">Disetujui (Demo)</option>
              <option value="completed">Selesai</option>
              <option value="draft">Draf</option>
            </select>
          </div>
        </div>

        {/* Secondary filters row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border-subtle text-xs text-ink-muted">
          <div className="flex flex-wrap items-center gap-3">
            {/* Funder Filter */}
            <div className="flex items-center gap-1.5">
              <span>Funder:</span>
              <select
                value={funderFilter}
                onChange={(e) => setFunderFilter(e.target.value)}
                className="bg-surface-secondary px-2 py-1 rounded-lg border border-border-subtle text-ink-primary font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">Semua Funder</option>
                {funders.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            {/* Partner Filter */}
            <div className="flex items-center gap-1.5">
              <span>Mitra:</span>
              <select
                value={partnerFilter}
                onChange={(e) => setPartnerFilter(e.target.value)}
                className="bg-surface-secondary px-2 py-1 rounded-lg border border-border-subtle text-ink-primary font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">Semua Mitra</option>
                {partners.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-ink-muted" />
            <span>Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-surface-secondary px-2 py-1 rounded-lg border border-border-subtle text-ink-primary font-medium focus:outline-none cursor-pointer"
            >
              <option value="date">Terbaru</option>
              <option value="budget">Anggaran Terbesar</option>
              <option value="progress">Progres Tertinggi</option>
              <option value="title">Nama (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Program Cards / Table */}
      {filteredPrograms.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="Tidak Ada Program Ditemukan"
          description="Tidak ada data program yang cocok dengan kata kunci pencarian atau filter yang dipilih. Coba atur ulang filter Anda."
          actionLabel="Reset Filter"
          onAction={() => {
            setSearch('');
            setCategoryFilter('all');
            setStatusFilter('all');
            setFunderFilter('all');
            setPartnerFilter('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPrograms.map((p) => {
            const partner = partners.find(pr => pr.id === p.partnerId);
            const funder = funders.find(fn => fn.id === p.funderId);
            const catInfo = CATEGORY_LABELS[p.category];

            return (
              <div
                key={p.id}
                className="bg-surface-card rounded-2xl border border-border-subtle p-5 hover:border-brand-emerald hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-ink-muted">{p.code}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${catInfo?.badgeBg || 'bg-gray-50'}`}>
                        {catInfo?.label || p.category}
                      </span>
                    </div>
                    <StatusBadge status={p.status} size="sm" />
                  </div>

                  <h3
                    onClick={() => navigate(`/programs/${p.id}`)}
                    className="font-bold text-sm text-ink-primary group-hover:text-brand-primary transition-colors cursor-pointer line-clamp-2"
                  >
                    {p.title}
                  </h3>

                  <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                    {p.summary}
                  </p>

                  <div className="space-y-1 text-xs text-ink-secondary pt-2 border-t border-border-subtle">
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="w-3.5 h-3.5 text-ink-muted shrink-0" />
                      <span className="truncate">{p.location}, {p.province}</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      <Users className="w-3.5 h-3.5 text-brand-emerald shrink-0" />
                      <span className="truncate">Mitra: {partner?.name || 'Mitra Universa'}</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      <Building2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                      <span className="truncate">Funder: {funder?.name || 'Corporate Funder'}</span>
                    </div>
                  </div>
                </div>

                {/* Financials & Progress Bar */}
                <div className="mt-4 pt-3 border-t border-border-subtle space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-ink-muted">Anggaran / Realisasi</div>
                      <div className="font-bold text-ink-primary">
                        {formatCompactIDR(p.approvedBudget)} <span className="font-normal text-ink-muted text-[11px]">/ {formatCompactIDR(p.disbursedAmount)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-ink-muted">Penerima Manfaat</div>
                      <div className="font-bold text-brand-primary">
                        {formatNumber(p.reachedBeneficiaries)} <span className="font-normal text-ink-muted text-[11px]">/ {formatNumber(p.targetBeneficiaries)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-ink-muted mb-1">
                      <span>Progres Kegiatan</span>
                      <span className="text-brand-primary font-bold">{p.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden border border-border-subtle">
                      <div
                        className="h-full bg-brand-emerald rounded-full transition-all"
                        style={{ width: `${p.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => setEditingProgram(p)}
                      className="p-1.5 text-xs text-ink-muted hover:text-ink-primary hover:bg-surface-secondary rounded-lg transition-colors cursor-pointer"
                      title="Edit Program"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/programs/${p.id}`)}
                      className="px-3 py-1.5 text-xs font-bold text-brand-primary bg-brand-mint hover:bg-brand-mint/80 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      Buka Detail <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
