import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Wallet,
  Plus,
  Search,
  Filter,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Building2,
  Layers,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Download
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import {
  calculatePlatformFunding,
  calculateFunderFunding,
  calculateProgramFinancials
} from '../../lib/calculations';
import { formatCompactIDR, formatIDR, formatDateID } from '../../lib/formatters';
import { validateFundingInput } from '../../lib/validators';
import { exportToCSV } from '../../lib/csvExport';
import { FundingRecordType, FundingRecordStatus, FundingSourceType } from '../../types/csr';

export const FundingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { fundingRecords, funders, programs, createFundingRecord } = useCSRStore();

  const isCreateOpen = searchParams.get('action') === 'create';

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [funderFilter, setFunderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Form State
  const [recordType, setRecordType] = useState<FundingRecordType>('Allocation');
  const [funderId, setFunderId] = useState(funders[0]?.id || '');
  const [programId, setProgramId] = useState(programs[0]?.id || '');
  const [amount, setAmount] = useState<number>(250000000);
  const [sourceType, setSourceType] = useState<FundingSourceType>('CSR Korporat Tahunan');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const platformMetrics = calculatePlatformFunding(fundingRecords);

  // Selected Funder's available balance for allocation check
  const funderMetrics = useMemo(() => {
    return calculateFunderFunding(funderId, fundingRecords);
  }, [funderId, fundingRecords]);

  // Selected Program's financial status for distribution check
  const programFinancials = useMemo(() => {
    return calculateProgramFinancials(programId, fundingRecords);
  }, [programId, fundingRecords]);

  const filteredRecords = useMemo(() => {
    return fundingRecords.filter((r) => {
      const funderObj = funders.find((f) => f.id === r.funderId);
      const programObj = programs.find((p) => p.id === r.programId);

      const matchesSearch =
        r.referenceNo.toLowerCase().includes(search.toLowerCase()) ||
        r.notes.toLowerCase().includes(search.toLowerCase()) ||
        (funderObj?.name.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        (programObj?.title.toLowerCase().includes(search.toLowerCase()) ?? false);

      const matchesType = typeFilter === 'all' || r.recordType === typeFilter;
      const matchesFunder = funderFilter === 'all' || r.funderId === funderFilter;
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter;

      return matchesSearch && matchesType && matchesFunder && matchesStatus;
    });
  }, [fundingRecords, search, typeFilter, funderFilter, statusFilter, funders, programs]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateFundingInput({
      recordType,
      funderId,
      programId: recordType !== 'Commitment' ? programId : undefined,
      amount: Number(amount),
      date,
      notes,
      availableFunderBalance: recordType === 'Allocation' ? funderMetrics.availableBalance : undefined,
      remainingProgramAllocation: recordType === 'Distribution' ? programFinancials.remainingDisbursement : undefined
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    createFundingRecord({
      funderId,
      programId: recordType !== 'Commitment' ? programId : undefined,
      sourceType,
      recordType,
      amount: Number(amount),
      date,
      status: recordType === 'Distribution' ? 'Disbursed (Demo)' : 'Approved (Demo)',
      notes: notes || `Pencatatan ${recordType} ${sourceType}`
    });

    setSearchParams({});
    setNotes('');
    setFormErrors({});
  };

  const handleExportCSV = () => {
    const headers = ['No Referensi', 'Tipe Transaksi', 'Sumber Dana', 'Funder', 'Program Tujuan', 'Nominal (Rp)', 'Tanggal', 'Status', 'Catatan'];
    const rows = filteredRecords.map((r) => {
      const funderObj = funders.find((f) => f.id === r.funderId);
      const programObj = programs.find((p) => p.id === r.programId);
      return [
        r.referenceNo,
        r.recordType,
        r.sourceType,
        funderObj?.name || '-',
        programObj?.title || 'Umum',
        r.amount,
        r.date,
        r.status,
        r.notes
      ];
    });
    exportToCSV('Buku_Besar_CSR_Universa_2026', headers, rows);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-mint text-brand-primary">
              <Wallet className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-ink-primary">Buku Besar Funding & Penyaluran CSR</h1>
          </div>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            Pencatatan transparan seluruh siklus keuangan CSR: Komitmen Masuk → Alokasi Program → Distribusi Termin Lapangan dengan validasi batas saldo.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-secondary hover:bg-surface-muted text-ink-primary text-xs font-semibold border border-border-subtle transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-brand-primary" />
            Ekspor CSV
          </button>
          <button
            onClick={() => setSearchParams({ action: 'create' })}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Catat Transaksi Dana
          </button>
        </div>
      </div>

      {/* 4 Financial Balance Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card">
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <span>Total Komitmen CSR</span>
            <ArrowUpRight className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-ink-primary mt-2">
            {formatCompactIDR(platformMetrics.totalCommitted)}
          </div>
          <p className="text-[11px] text-ink-muted mt-0.5">Komitmen tertulis funder</p>
        </div>

        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card">
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <span>Total Teralokasi</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-brand-primary mt-2">
            {formatCompactIDR(platformMetrics.totalAllocated)}
          </div>
          <p className="text-[11px] text-ink-muted mt-0.5">Dialokasikan ke program</p>
        </div>

        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card">
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <span>Total Penyaluran Riil</span>
            <ArrowDownRight className="w-4 h-4 text-brand-emerald" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-brand-emerald mt-2">
            {formatCompactIDR(platformMetrics.totalDisbursed)}
          </div>
          <p className="text-[11px] text-ink-muted mt-0.5">Tersalurkan termin lapangan</p>
        </div>

        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card">
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <span>Saldo Bebas (Unallocated)</span>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-blue-700 mt-2">
            {formatCompactIDR(platformMetrics.availableUnallocatedBalance)}
          </div>
          <p className="text-[11px] text-ink-muted mt-0.5">Siap alokasi proposal baru</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative md:col-span-1">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari no referensi, catatan, funder..."
            className="w-full pl-9 pr-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
          />
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Tipe Transaksi</option>
            <option value="Commitment">Komitmen (Inflow)</option>
            <option value="Allocation">Alokasi Program</option>
            <option value="Distribution">Penyaluran / Distribusi</option>
          </select>
        </div>

        <div>
          <select
            value={funderFilter}
            onChange={(e) => setFunderFilter(e.target.value)}
            className="w-full px-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Funder</option>
            {funders.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="Approved (Demo)">Approved (Demo)</option>
            <option value="Disbursed (Demo)">Disbursed (Demo)</option>
            <option value="Pending Approval">Pending Approval</option>
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-surface-card rounded-2xl border border-border-subtle shadow-card overflow-hidden">
        {filteredRecords.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title="Tidak Ada Catatan Transaksi"
            description="Tidak ada data pencatatan dana yang cocok dengan filter yang dipilih."
            actionLabel="Reset Filter"
            onAction={() => {
              setSearch('');
              setTypeFilter('all');
              setFunderFilter('all');
              setStatusFilter('all');
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-secondary text-ink-muted font-semibold border-b border-border-subtle">
                <tr>
                  <th className="py-3 px-4">No. Referensi</th>
                  <th className="py-3 px-4">Tipe & Sumber</th>
                  <th className="py-3 px-4">Funder Korporat</th>
                  <th className="py-3 px-4">Program Tujuan</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Nominal (Rp)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredRecords.map((rec) => {
                  const funderObj = funders.find((f) => f.id === rec.funderId);
                  const programObj = programs.find((p) => p.id === rec.programId);

                  return (
                    <tr key={rec.id} className="hover:bg-surface-secondary/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-primary whitespace-nowrap">
                        {rec.referenceNo}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-ink-primary block">{rec.recordType}</span>
                        <span className="text-[10px] text-ink-muted">{rec.sourceType}</span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-ink-primary whitespace-nowrap">
                        {funderObj?.name || '-'}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate text-ink-secondary">
                        {programObj ? `${programObj.code} — ${programObj.title}` : <span className="text-ink-muted italic">Komitmen Umum</span>}
                      </td>
                      <td className="py-3.5 px-4 text-ink-muted whitespace-nowrap">
                        {formatDateID(rec.date)}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-ink-primary whitespace-nowrap">
                        {formatIDR(rec.amount)}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <StatusBadge status={rec.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-ink-muted max-w-xs truncate">
                        {rec.notes}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Add Funding Record */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setSearchParams({})}
        title="Catat Transaksi Dana CSR (Simulasi)"
        subtitle="Mencatat komitmen baru, alokasi program, atau pencairan termin distribusi lapangan."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink-primary mb-1">Tipe Transaksi *</label>
              <select
                value={recordType}
                onChange={(e) => {
                  setRecordType(e.target.value as FundingRecordType);
                  setFormErrors({});
                }}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              >
                <option value="Allocation">Alokasi ke Program</option>
                <option value="Distribution">Distribusi / Pencairan Termin</option>
                <option value="Commitment">Komitmen Baru (Inflow)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-ink-primary mb-1">Sumber Anggaran *</label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value as FundingSourceType)}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              >
                <option value="CSR Korporat Tahunan">CSR Korporat Tahunan</option>
                <option value="Hibah Khusus / Grant">Hibah Khusus / Grant</option>
                <option value="Konsorsium Multi-Funder">Konsorsium Multi-Funder</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Pilih Corporate Funder *</label>
            <select
              value={funderId}
              onChange={(e) => setFunderId(e.target.value)}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            >
              {funders.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
            {recordType === 'Allocation' && (
              <p className="text-[11px] text-ink-muted mt-1">
                Saldo komitmen bebas funder ini: <strong className="text-brand-primary">{formatIDR(funderMetrics.availableBalance)}</strong>
              </p>
            )}
          </div>

          {recordType !== 'Commitment' && (
            <div>
              <label className="block font-bold text-ink-primary mb-1">Program Sasaran *</label>
              <select
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>{p.code} — {p.title}</option>
                ))}
              </select>
              {recordType === 'Distribution' && (
                <p className="text-[11px] text-ink-muted mt-1">
                  Sisa dana teralokasi yang belum dicairkan pada program ini: <strong className="text-brand-emerald">{formatIDR(programFinancials.remainingDisbursement)}</strong>
                </p>
              )}
              {formErrors.programId && <p className="text-status-red text-[11px] mt-1">{formErrors.programId}</p>}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink-primary mb-1">Nominal Transaksi (Rp) *</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
              {formErrors.amount && <p className="text-status-red text-[11px] mt-1">{formErrors.amount}</p>}
            </div>

            <div>
              <label className="block font-bold text-ink-primary mb-1">Tanggal Transaksi *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Catatan / Keterangan Transaksi *</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Pencairan Termin 2 untuk pekerjaan fisik 50%"
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
            {formErrors.notes && <p className="text-status-red text-[11px] mt-1">{formErrors.notes}</p>}
          </div>

          <div className="p-3 bg-surface-secondary/70 rounded-xl border border-border-subtle text-[11px] text-ink-muted flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-brand-emerald shrink-0" />
            <span>Pencatatan ini berstatus simulasi demo tanpa pemindahan dana bank nyata.</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="px-4 py-2 font-semibold text-ink-muted hover:text-ink-primary cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold bg-brand-primary text-white rounded-xl shadow-xs cursor-pointer"
            >
              Simpan Transaksi (Demo)
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
