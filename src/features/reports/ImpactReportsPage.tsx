import React, { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Printer,
  Eye,
  CheckCircle2,
  Clock,
  Building2,
  ShieldAlert,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { ImpactReport, ReportStatus, ReportScopeType } from '../../types/csr';
import { formatDateID, formatCompactIDR, formatIDR } from '../../lib/formatters';
import { exportToCSV } from '../../lib/csvExport';

export const ImpactReportsPage: React.FC = () => {
  const { reports, programs, funders, createImpactReport, updateReportStatus } = useCSRStore();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedReportForPreview, setSelectedReportForPreview] = useState<ImpactReport | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [reportType, setReportType] = useState<ImpactReport['reportType']>('CSR Annual Report');
  const [scopeType, setScopeType] = useState<ReportScopeType>('program');
  const [scopeId, setScopeId] = useState(programs[0]?.id || '');
  const [summary, setSummary] = useState('');
  const [challenges, setChallenges] = useState('');
  const [mitigationNotes, setMitigationNotes] = useState('');

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchesSearch =
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.reportCode.toLowerCase().includes(search.toLowerCase()) ||
        r.summary.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'all' || r.reportType === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [reports, search, typeFilter]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    createImpactReport({
      title,
      reportType,
      scopeType,
      scopeId: scopeType === 'program' ? scopeId : undefined,
      periodStart: '2026-01-01',
      periodEnd: '2026-06-30',
      summary,
      outputMetrics: [
        { label: 'Capaian Output Sasaran', value: '85% Target Lapangan' },
        { label: 'Dokumen Verifikasi BAST', value: 'Lengkap Terlampir' }
      ],
      outcomeMetrics: [
        { label: 'Dampak Perubahan Sosial/Ekologi', value: 'Peningkatan Kemandirian Terpantau' }
      ],
      budgetRealization: {
        allocated: 500000000,
        disbursed: 400000000,
        utilizationPercent: 80
      },
      challenges: challenges || 'Tantangan operasional cuaca di lokasi kegiatan.',
      mitigationNotes: mitigationNotes || 'Koordinasi intensif bersama aparatur desa dan dinas terkait.',
      status: 'In Review'
    });

    setIsCreateOpen(false);
    setTitle('');
    setSummary('');
  };

  const handleExportCSV = () => {
    const headers = ['Kode Laporan', 'Judul Laporan', 'Tipe Laporan', 'Periode', 'Status', 'Penyusun', 'Ringkasan'];
    const rows = filteredReports.map((r) => [
      r.reportCode,
      r.title,
      r.reportType,
      `${r.periodStart} s/d ${r.periodEnd}`,
      r.status,
      r.author,
      r.summary
    ]);
    exportToCSV('Laporan_Dampak_CSR_Universa', headers, rows);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-mint text-brand-primary">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-ink-primary">Laporan Dampak CSR & Kesiapan PROPER</h1>
          </div>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            Pusat konsolidasi pelaporan dampak sosial untuk Corporate Funder serta draf dokumen kesiapan audit kriteria PROPER (Program Penilaian Peringkat Kinerja Perusahaan) Kementerian Lingkungan Hidup.
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
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Susun Laporan Baru
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card grid grid-cols-1 md:grid-cols-3 gap-3 no-print">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari kode laporan, judul, atau ringkasan dampak..."
            className="w-full pl-9 pr-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
          />
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Tipe Laporan</option>
            <option value="CSR Annual Report">CSR Annual Report</option>
            <option value="Quarterly Impact Review">Quarterly Impact Review</option>
            <option value="Program Final Evaluation">Program Final Evaluation</option>
            <option value="PROPER Kesiapan Lingkungan">PROPER Kesiapan Lingkungan (Draf)</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Tidak Ada Laporan Ditemukan"
          description="Tidak ada dokumen laporan dampak yang cocok dengan filter saat ini."
          actionLabel="Reset Filter"
          onAction={() => {
            setSearch('');
            setTypeFilter('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 no-print">
          {filteredReports.map((rep) => {
            const isProper = rep.reportType === 'PROPER Kesiapan Lingkungan';

            return (
              <div
                key={rep.id}
                className={`bg-surface-card rounded-2xl border p-5 hover:shadow-card transition-all flex flex-col justify-between group ${
                  isProper ? 'border-sky-300 bg-gradient-to-br from-sky-50/20 to-surface-card' : 'border-border-subtle hover:border-brand-emerald'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-ink-muted">{rep.reportCode}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-mint text-brand-primary border border-emerald-200">
                        {rep.reportType}
                      </span>
                    </div>
                    <StatusBadge status={rep.status} size="sm" />
                  </div>

                  <h3
                    onClick={() => setSelectedReportForPreview(rep)}
                    className="font-bold text-base text-ink-primary group-hover:text-brand-primary transition-colors cursor-pointer line-clamp-2"
                  >
                    {rep.title}
                  </h3>

                  <p className="text-xs text-ink-muted line-clamp-3 leading-relaxed">
                    {rep.summary}
                  </p>

                  {/* Highlights Pill */}
                  <div className="p-3 bg-surface-secondary/60 rounded-xl border border-border-subtle grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-ink-muted block">Realisasi Anggaran:</span>
                      <span className="font-bold text-ink-primary">
                        {formatCompactIDR(rep.budgetRealization.disbursed)} ({rep.budgetRealization.utilizationPercent}%)
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ink-muted block">Penyusun Dokumen:</span>
                      <span className="font-bold text-ink-primary truncate block">
                        {rep.author}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                  <span className="text-[11px] text-ink-muted">
                    Periode: {formatDateID(rep.periodStart)} — {formatDateID(rep.periodEnd)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedReportForPreview(rep)}
                      className="px-3 py-1.5 rounded-xl bg-surface-secondary hover:bg-surface-muted text-ink-primary font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Pratinjau
                    </button>
                    {rep.status === 'In Review' && (
                      <button
                        onClick={() => updateReportStatus(rep.id, 'Approved (Demo)')}
                        className="px-3 py-1.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold transition-colors cursor-pointer"
                      >
                        Setujui (Demo)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Print-Friendly / Formal Preview Modal */}
      {selectedReportForPreview && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedReportForPreview(null)}
          title={`Dokumen Laporan: ${selectedReportForPreview.reportCode}`}
          subtitle={`${selectedReportForPreview.reportType} • Universa CSR Hub`}
          maxWidth="4xl"
        >
          <div className="space-y-6 text-xs text-ink-primary" id="printable-report">
            {/* Header Document */}
            <div className="border-b-2 border-brand-primary pb-4 flex items-start justify-between">
              <div>
                <div className="text-xl font-extrabold text-brand-primary tracking-tight">
                  UNIVERSA CSR HUB
                </div>
                <div className="text-xs font-semibold text-ink-muted">
                  Social Impact Governance & ESG Reporting Verification
                </div>
                <div className="text-[11px] text-ink-muted mt-1">
                  Kode Dokumen: <strong>{selectedReportForPreview.reportCode}</strong> • Periode: {formatDateID(selectedReportForPreview.periodStart)} s/d {formatDateID(selectedReportForPreview.periodEnd)}
                </div>
              </div>

              <div className="text-right">
                <StatusBadge status={selectedReportForPreview.status} />
                <div className="text-[10px] text-ink-muted mt-1">
                  Tanggal Terbit: {formatDateID(selectedReportForPreview.createdAt)}
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-lg font-bold text-ink-primary leading-tight">
                {selectedReportForPreview.title}
              </h2>
              <div className="text-xs text-brand-primary font-semibold mt-0.5">
                Klasifikasi: {selectedReportForPreview.reportType}
              </div>
            </div>

            {/* Executive Summary */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-ink-muted mb-1.5">
                1. Ringkasan Eksekutif & Narasi Capaian
              </h4>
              <p className="p-4 bg-surface-secondary/50 rounded-xl border border-border-subtle leading-relaxed text-ink-secondary">
                {selectedReportForPreview.summary}
              </p>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-surface-card rounded-xl border border-border-subtle space-y-2">
                <h5 className="font-bold text-xs text-brand-primary uppercase tracking-wider">
                  Output Metrik Kinerja Lapangan
                </h5>
                <div className="space-y-1.5">
                  {selectedReportForPreview.outputMetrics.map((m, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-border-subtle/50 pb-1">
                      <span className="text-ink-secondary">{m.label}</span>
                      <span className="font-bold text-ink-primary">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-surface-card rounded-xl border border-border-subtle space-y-2">
                <h5 className="font-bold text-xs text-brand-emerald uppercase tracking-wider">
                  Outcome & Indikator Dampak Sosial
                </h5>
                <div className="space-y-1.5">
                  {selectedReportForPreview.outcomeMetrics.map((m, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-border-subtle/50 pb-1">
                      <span className="text-ink-secondary">{m.label}</span>
                      <span className="font-bold text-ink-primary">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Budget Realization */}
            <div className="p-4 bg-brand-mint/40 rounded-xl border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-ink-muted block">Realisasi Anggaran Disetujui:</span>
                <span className="text-sm font-extrabold text-brand-primary">
                  {formatIDR(selectedReportForPreview.budgetRealization.disbursed)}
                </span>
                <span className="text-xs text-ink-muted"> dari alokasi {formatIDR(selectedReportForPreview.budgetRealization.allocated)}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-ink-muted block">Tingkat Penyerapan:</span>
                <span className="text-sm font-extrabold text-brand-emerald">
                  {selectedReportForPreview.budgetRealization.utilizationPercent}% Efektif
                </span>
              </div>
            </div>

            {/* Challenges & Mitigation */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-ink-muted">
                2. Evaluasi Tantangan Lapangan & Mitigasi
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-ink-secondary">
                <div className="p-3 bg-surface-secondary/50 rounded-xl border border-border-subtle">
                  <span className="font-bold text-ink-primary block mb-0.5">Tantangan:</span>
                  {selectedReportForPreview.challenges}
                </div>
                <div className="p-3 bg-surface-secondary/50 rounded-xl border border-border-subtle">
                  <span className="font-bold text-ink-primary block mb-0.5">Mitigasi & Solusi:</span>
                  {selectedReportForPreview.mitigationNotes}
                </div>
              </div>
            </div>

            {/* Signature Block for Formal Report */}
            <div className="pt-8 border-t border-border-subtle grid grid-cols-2 text-center text-xs">
              <div>
                <div className="text-ink-muted text-[11px]">Disusun Oleh:</div>
                <div className="font-bold text-ink-primary mt-8">{selectedReportForPreview.author}</div>
                <div className="text-[10px] text-ink-muted">Universa Lead Kurator</div>
              </div>
              <div>
                <div className="text-ink-muted text-[11px]">Ditinjau & Disetujui (Demo):</div>
                <div className="font-bold text-ink-primary mt-8">Komite Tata Kelola CSR</div>
                <div className="text-[10px] text-ink-muted">Universa CSR Hub Platform</div>
              </div>
            </div>

            {/* Actions Bottom */}
            <div className="flex items-center justify-between pt-4 border-t border-border-subtle no-print">
              <button
                onClick={() => setSelectedReportForPreview(null)}
                className="px-4 py-2 font-semibold text-ink-muted hover:text-ink-primary cursor-pointer"
              >
                Tutup
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-dark text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" /> Cetak / Simpan PDF
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Create Report */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Susun Laporan Dampak CSR Baru"
        subtitle="Konsolidasi capaian program dan indikator untuk stakeholder korporat atau evaluasi PROPER."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-ink-primary mb-1">Judul Laporan *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Laporan Evaluasi Semester I Program Restorasi Mangrove"
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink-primary mb-1">Jenis Laporan *</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              >
                <option value="CSR Annual Report">CSR Annual Report</option>
                <option value="Quarterly Impact Review">Quarterly Impact Review</option>
                <option value="Program Final Evaluation">Program Final Evaluation</option>
                <option value="PROPER Kesiapan Lingkungan">PROPER Kesiapan Lingkungan (Draf)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-ink-primary mb-1">Cakupan Laporan *</label>
              <select
                value={scopeType}
                onChange={(e) => setScopeType(e.target.value as any)}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              >
                <option value="program">Per Program Spesifik</option>
                <option value="all">Seluruh Portofolio</option>
              </select>
            </div>
          </div>

          {scopeType === 'program' && (
            <div>
              <label className="block font-bold text-ink-primary mb-1">Pilih Program Terkait *</label>
              <select
                value={scopeId}
                onChange={(e) => setScopeId(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>{p.code} — {p.title}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block font-bold text-ink-primary mb-1">Ringkasan Eksekutif & Narasi Dampak *</label>
            <textarea
              rows={3}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Deskripsikan pencapaian utama, output fisik, dan transformasi sosial yang dicapai..."
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Tantangan Lapangan</label>
            <input
              type="text"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="Contoh: Hambatan logistik cuaca maritim..."
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Solusi & Mitigasi</label>
            <input
              type="text"
              value={mitigationNotes}
              onChange={(e) => setMitigationNotes(e.target.value)}
              placeholder="Contoh: Penyesuaian jadwal tanam bersama BMKG..."
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 font-semibold text-ink-muted hover:text-ink-primary cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold bg-brand-primary text-white rounded-xl shadow-xs cursor-pointer"
            >
              Simpan Draf Laporan (Demo)
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
