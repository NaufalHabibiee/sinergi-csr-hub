import React, { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  Search,
  Download,
  Printer,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  SlidersHorizontal,
  LayoutGrid,
  List,
  FileCheck2,
  BookOpen
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { ImpactReport, ReportScopeType } from '../../types/csr';
import { formatDateID, formatCompactIDR, formatIDR } from '../../lib/formatters';
import { exportToCSV } from '../../lib/csvExport';
import { BASTGeneratorModal } from './BASTGeneratorModal';

export const ImpactReportsPage: React.FC = () => {
  const { reports, programs, createImpactReport, updateReportStatus } = useCSRStore();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedReportForPreview, setSelectedReportForPreview] = useState<ImpactReport | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isBastOpen, setIsBastOpen] = useState(false);

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

  // Flagship or featured report (e.g. PROPER or latest report)
  const flagshipReport = useMemo(() => {
    return (
      reports.find((r) => r.reportType === 'PROPER Kesiapan Lingkungan') ||
      reports[0] ||
      null
    );
  }, [reports]);

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

  const reportCategories = [
    { key: 'all', label: 'Semua Dokumen' },
    { key: 'PROPER Kesiapan Lingkungan', label: 'Kesiapan PROPER' },
    { key: 'Quarterly Impact Review', label: 'Review Triwulan' },
    { key: 'Program Final Evaluation', label: 'Evaluasi Akhir' },
    { key: 'CSR Annual Report', label: 'Annual Report' }
  ];

  const getReportTypeAccent = (type: string) => {
    switch (type) {
      case 'PROPER Kesiapan Lingkungan':
        return {
          pill: 'bg-[#E8F6F0] text-[#176B4D]',
          border: 'border-l-[#176B4D]'
        };
      case 'Quarterly Impact Review':
        return {
          pill: 'bg-sky-50 text-sky-700',
          border: 'border-l-sky-500'
        };
      case 'Program Final Evaluation':
        return {
          pill: 'bg-amber-50 text-amber-700',
          border: 'border-l-amber-500'
        };
      default:
        return {
          pill: 'bg-purple-50 text-purple-700',
          border: 'border-l-purple-500'
        };
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 space-y-7 animate-in fade-in duration-200">
      {/* 1. Header Editorial */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Laporan Dampak & Kesiapan PROPER
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Pusat konsolidasi pelaporan dampak sosial untuk Corporate Funder dan dokumen kesiapan audit kriteria PROPER Kementerian Lingkungan Hidup.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setIsBastOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#176B4D] border border-emerald-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-[#176B4D]" />
            <span>Generator BAST</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            title="Ekspor CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#176B4D]" />
            Ekspor CSV
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white font-semibold text-xs transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Susun Laporan Baru
          </button>
        </div>
      </div>

      {/* 2. Executive Flagship Dossier Spotlight (Distinct, Elegant Feature) */}
      {flagshipReport && (
        <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-r from-[#EBF6F1]/90 via-[#F5FAF8] to-slate-50 border border-[#176B4D]/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 no-print">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#176B4D] font-bold text-[11px] shadow-2xs border border-[#176B4D]/10">
                <Sparkles className="w-3.5 h-3.5 text-[#176B4D]" />
                Kesiapan PROPER KLHK
              </span>
              <span className="text-[11px] font-mono font-semibold text-slate-400">
                {flagshipReport.reportCode}
              </span>
              <StatusBadge status={flagshipReport.status} size="sm" />
            </div>

            <h2
              onClick={() => setSelectedReportForPreview(flagshipReport)}
              className="text-base sm:text-lg font-extrabold text-slate-900 hover:text-[#176B4D] transition-colors cursor-pointer leading-snug"
            >
              {flagshipReport.title}
            </h2>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {flagshipReport.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <strong className="text-slate-800">Serapan Dana:</strong>{' '}
                {formatCompactIDR(flagshipReport.budgetRealization.disbursed)} ({flagshipReport.budgetRealization.utilizationPercent}%)
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <strong className="text-slate-800">Periode:</strong>{' '}
                {formatDateID(flagshipReport.periodStart)} — {formatDateID(flagshipReport.periodEnd)}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <strong className="text-slate-800">Penyusun:</strong>{' '}
                {flagshipReport.author}
              </span>
            </div>
          </div>

          <div className="flex sm:flex-col items-center gap-2.5 shrink-0 self-stretch sm:self-auto justify-end">
            <button
              onClick={() => setSelectedReportForPreview(flagshipReport)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              Buka Laporan
            </button>
            <button
              onClick={() => {
                setSelectedReportForPreview(flagshipReport);
                setTimeout(() => window.print(), 300);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200/80 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              Cetak PDF
            </button>
          </div>
        </div>
      )}

      {/* 3. Category Filter Pills & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 no-print">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {reportCategories.map((cat) => {
            const isActive = typeFilter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setTypeFilter(cat.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#176B4D] text-white shadow-2xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & View Mode */}
        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kode atau judul..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/15 transition-all"
            />
          </div>

          <div className="inline-flex items-center p-1 bg-slate-50 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#176B4D] shadow-2xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Tampilan Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-[#176B4D] shadow-2xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Tampilan Daftar Arsip"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Document Collection Display */}
      {filteredReports.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Tidak Ada Laporan Ditemukan"
          description="Tidak ada dokumen laporan dampak yang cocok dengan kriteria pencarian atau kategori ini."
          actionLabel="Reset Kategori"
          onAction={() => {
            setSearch('');
            setTypeFilter('all');
          }}
        />
      ) : viewMode === 'grid' ? (
        /* Editorial Document Dossier Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 no-print">
          {filteredReports.map((rep) => {
            const accent = getReportTypeAccent(rep.reportType);

            return (
              <div
                key={rep.id}
                onClick={() => setSelectedReportForPreview(rep)}
                className={`rounded-2xl p-6 bg-slate-50/70 hover:bg-white border-l-4 ${accent.border} border border-slate-100/90 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all cursor-pointer flex flex-col justify-between gap-5 group`}
              >
                <div className="space-y-3">
                  {/* Top Metadata Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${accent.pill}`}>
                        {rep.reportType}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-slate-400">
                        {rep.reportCode}
                      </span>
                    </div>
                    <StatusBadge status={rep.status} size="sm" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#176B4D] transition-colors line-clamp-2 leading-snug">
                    {rep.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {rep.summary}
                  </p>

                  {/* Inline Stats Chips */}
                  <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-[11px]">Serapan:</span>
                      <strong className="text-slate-800">
                        {formatCompactIDR(rep.budgetRealization.disbursed)} ({rep.budgetRealization.utilizationPercent}%)
                      </strong>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-[11px]">Penyusun:</span>
                      <span className="font-medium text-slate-700 truncate max-w-[130px]">
                        {rep.author}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Row */}
                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    {formatDateID(rep.periodStart)} — {formatDateID(rep.periodEnd)}
                  </span>

                  <div className="flex items-center gap-2">
                    {rep.status === 'In Review' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateReportStatus(rep.id, 'Approved (Demo)');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#176B4D] hover:bg-[#0E4D36] text-white text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        Setujui
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReportForPreview(rep);
                      }}
                      className="px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200/70 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#176B4D]" />
                      Pratinjau
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Editorial Document List View */
        <div className="divide-y divide-slate-100 no-print">
          {filteredReports.map((rep) => {
            const accent = getReportTypeAccent(rep.reportType);

            return (
              <div
                key={rep.id}
                onClick={() => setSelectedReportForPreview(rep)}
                className="py-4 px-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 text-[#176B4D] group-hover:bg-[#176B4D] group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${accent.pill}`}>
                        {rep.reportType}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        {rep.reportCode}
                      </span>
                      <StatusBadge status={rep.status} size="sm" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-800 group-hover:text-[#176B4D] transition-colors line-clamp-1">
                      {rep.title}
                    </h3>
                    <div className="text-xs text-slate-400">
                      Disusun oleh <strong className="text-slate-600">{rep.author}</strong> • Periode: {formatDateID(rep.periodStart)} s/d {formatDateID(rep.periodEnd)} • Serapan: {formatCompactIDR(rep.budgetRealization.disbursed)} ({rep.budgetRealization.utilizationPercent}%)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedReportForPreview(rep);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200/80 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#176B4D]" />
                    Pratinjau
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Print-Friendly / Formal Preview Modal */}
      {selectedReportForPreview && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedReportForPreview(null)}
          title={`Dokumen Laporan: ${selectedReportForPreview.reportCode}`}
          subtitle={`${selectedReportForPreview.reportType} • SinergiCSR Platform`}
          maxWidth="4xl"
        >
          <div className="space-y-6 text-xs text-slate-800" id="printable-report">
            {/* Header Document */}
            <div className="border-b-2 border-[#176B4D] pb-4 flex items-start justify-between">
              <div>
                <div className="text-xl font-extrabold text-[#176B4D] tracking-tight">
                  SINERGICSR PLATFORM
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Social Impact Governance & ESG Reporting Verification
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Kode Dokumen: <strong>{selectedReportForPreview.reportCode}</strong> • Periode: {formatDateID(selectedReportForPreview.periodStart)} s/d {formatDateID(selectedReportForPreview.periodEnd)}
                </div>
              </div>

              <div className="text-right">
                <StatusBadge status={selectedReportForPreview.status} />
                <div className="text-[10px] text-slate-400 mt-1">
                  Tanggal Terbit: {formatDateID(selectedReportForPreview.createdAt)}
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                {selectedReportForPreview.title}
              </h2>
              <div className="text-xs text-[#176B4D] font-semibold mt-0.5">
                Klasifikasi: {selectedReportForPreview.reportType}
              </div>
            </div>

            {/* Executive Summary */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1.5">
                1. Ringkasan Eksekutif & Narasi Capaian
              </h4>
              <p className="p-4 bg-slate-50 rounded-2xl leading-relaxed text-slate-700">
                {selectedReportForPreview.summary}
              </p>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                <h5 className="font-bold text-xs text-[#176B4D] uppercase tracking-wider">
                  Output Metrik Kinerja Lapangan
                </h5>
                <div className="space-y-1.5">
                  {selectedReportForPreview.outputMetrics.map((m, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-slate-200/60 pb-1">
                      <span className="text-slate-600">{m.label}</span>
                      <span className="font-bold text-slate-900">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                <h5 className="font-bold text-xs text-[#0D9488] uppercase tracking-wider">
                  Outcome & Indikator Dampak Sosial
                </h5>
                <div className="space-y-1.5">
                  {selectedReportForPreview.outcomeMetrics.map((m, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-slate-200/60 pb-1">
                      <span className="text-slate-600">{m.label}</span>
                      <span className="font-bold text-slate-900">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Budget Realization */}
            <div className="p-4 bg-[#EBF6F1] rounded-2xl flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-slate-500 block">Realisasi Anggaran Disetujui:</span>
                <span className="text-sm font-extrabold text-[#176B4D]">
                  {formatIDR(selectedReportForPreview.budgetRealization.disbursed)}
                </span>
                <span className="text-xs text-slate-500"> dari alokasi {formatIDR(selectedReportForPreview.budgetRealization.allocated)}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 block">Tingkat Penyerapan:</span>
                <span className="text-sm font-extrabold text-[#176B4D]">
                  {selectedReportForPreview.budgetRealization.utilizationPercent}% Efektif
                </span>
              </div>
            </div>

            {/* Challenges & Mitigation */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                2. Evaluasi Tantangan Lapangan & Mitigasi
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                <div className="p-3.5 bg-slate-50 rounded-2xl">
                  <span className="font-bold text-slate-900 block mb-0.5">Tantangan:</span>
                  {selectedReportForPreview.challenges}
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl">
                  <span className="font-bold text-slate-900 block mb-0.5">Mitigasi & Solusi:</span>
                  {selectedReportForPreview.mitigationNotes}
                </div>
              </div>
            </div>

            {/* Signature Block for Formal Report */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 text-center text-xs">
              <div>
                <div className="text-slate-400 text-[11px]">Disusun Oleh:</div>
                <div className="font-bold text-slate-900 mt-6">{selectedReportForPreview.author}</div>
                <div className="text-[10px] text-slate-400">SinergiCSR Lead Kurator</div>
              </div>
              <div>
                <div className="text-slate-400 text-[11px]">Ditinjau & Disetujui (Demo):</div>
                <div className="font-bold text-slate-900 mt-6">Komite Tata Kelola CSR</div>
                <div className="text-[10px] text-slate-400">SinergiCSR Enterprise Platform</div>
              </div>
            </div>

            {/* Actions Bottom */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 no-print">
              <button
                onClick={() => setSelectedReportForPreview(null)}
                className="px-4 py-2 font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Tutup
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-[#176B4D] hover:bg-[#0E4D36] text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" /> Cetak / Simpan PDF
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* 6. Modal Create Report */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Susun Laporan Dampak CSR Baru"
        subtitle="Konsolidasi capaian program dan indikator untuk stakeholder korporat atau evaluasi PROPER."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Judul Laporan *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Laporan Evaluasi Semester I Program Restorasi Mangrove"
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Jenis Laporan *</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20 cursor-pointer"
              >
                <option value="CSR Annual Report">CSR Annual Report</option>
                <option value="Quarterly Impact Review">Quarterly Impact Review</option>
                <option value="Program Final Evaluation">Program Final Evaluation</option>
                <option value="PROPER Kesiapan Lingkungan">PROPER Kesiapan Lingkungan (Draf)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Cakupan Laporan *</label>
              <select
                value={scopeType}
                onChange={(e) => setScopeType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20 cursor-pointer"
              >
                <option value="program">Per Program Spesifik</option>
                <option value="all">Seluruh Portofolio</option>
              </select>
            </div>
          </div>

          {scopeType === 'program' && (
            <div>
              <label className="block font-bold text-slate-800 mb-1">Pilih Program Terkait *</label>
              <select
                value={scopeId}
                onChange={(e) => setScopeId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20 cursor-pointer"
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>{p.code} — {p.title}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-800 mb-1">Ringkasan Eksekutif & Narasi Dampak *</label>
            <textarea
              rows={3}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Deskripsikan pencapaian utama, output fisik, dan transformasi sosial yang dicapai..."
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Tantangan Lapangan</label>
            <input
              type="text"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="Contoh: Hambatan logistik cuaca maritim..."
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Solusi & Mitigasi</label>
            <input
              type="text"
              value={mitigationNotes}
              onChange={(e) => setMitigationNotes(e.target.value)}
              placeholder="Contoh: Penyesuaian jadwal tanam bersama BMKG..."
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#176B4D]/20"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold bg-[#176B4D] text-white rounded-xl shadow-xs cursor-pointer hover:bg-[#0E4D36]"
            >
              Simpan Draf Laporan (Demo)
            </button>
          </div>
        </form>
      </Modal>

      {/* Point 7: Standardized BAST Generator Modal */}
      <BASTGeneratorModal
        isOpen={isBastOpen}
        onClose={() => setIsBastOpen(false)}
      />
    </div>
  );
};
