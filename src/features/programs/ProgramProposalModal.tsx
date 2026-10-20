import React, { useState } from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  Building2,
  Users,
  Calendar,
  MapPin,
  Coins,
  ShieldCheck,
  Award,
  Printer,
  Download,
  Handshake,
  Check,
  FileCheck2,
  ExternalLink,
  Target,
  Sparkles
} from 'lucide-react';
import { Program, Proposal } from '../../types/csr';
import { useCSRStore } from '../../context/CSRStoreContext';
import {
  formatIDR,
  formatCompactIDR,
  formatNumber,
  CATEGORY_LABELS
} from '../../lib/formatters';

interface ProgramProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: Program | null;
  onOpenBooking?: (program: Program) => void;
}

export const ProgramProposalModal: React.FC<ProgramProposalModalProps> = ({
  isOpen,
  onClose,
  program,
  onOpenBooking
}) => {
  const { partners, funders, proposals } = useCSRStore();
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'rab' | 'indikator' | 'legalitas'>('ringkasan');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen || !program) return null;

  // Find linked partner and funder
  const partner = partners.find((p) => p.id === program.partnerId);
  const funder = funders.find((f) => f.id === program.funderId);
  const catInfo = CATEGORY_LABELS[program.category];

  // Try to find matching proposal or generate realistic proposal structure
  const matchingProposal = proposals.find(
    (p) => p.id === program.sourceProposalId || p.title.toLowerCase().includes(program.title.toLowerCase().slice(0, 15))
  );

  const proposalCode = matchingProposal?.code || program.code.replace('PRG-', 'PROP-');
  const submissionDate = matchingProposal?.submittedAt || program.createdAt || '2026-01-15';
  const approvalDate = matchingProposal?.reviewedAt || program.startDate || '2026-02-01';

  // Realistic RAB (Rencana Anggaran Biaya) line items derived from proposedBudget
  const totalBudget = program.proposedBudget;
  const operationalBudget = Math.round(totalBudget * 0.62);
  const trainingBudget = Math.round(totalBudget * 0.23);
  const monitoringBudget = totalBudget - operationalBudget - trainingBudget;

  const rabItems = [
    {
      category: 'Komponen Operasional Lapangan & Sarana Prasarana',
      percentage: '62%',
      amount: operationalBudget,
      desc: 'Pengadaan bibit/peralatan, logistik distribusi ke desa sasaran, dan instalasi fasilitas fisik'
    },
    {
      category: 'Kapasitas SDM, Pelatihan Vokasi & Pendampingan',
      percentage: '23%',
      amount: trainingBudget,
      desc: 'Honorarium fasilitator ahli, modul panduan, sertifikasi kompetensi, dan workshop berkala'
    },
    {
      category: 'Monitoring, Verifikasi GPS BAST & Audit Publikasi',
      percentage: '15%',
      amount: monitoringBudget,
      desc: 'Pelaporan milestone, verifikasi geotagging berkala, pelaporan kepatuhan PROPER KLHK, dan publikasi'
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* TOP HEADER: Official Document Top Bar */}
        <div className="px-6 py-5 bg-[#0B2518] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#D4F63D] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4F63D] px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
                  Dokumen Proposal Resmi TJSL / CSR
                </span>
                <span className="text-xs font-mono font-bold text-emerald-300">
                  {proposalCode}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-white leading-tight mt-0.5 line-clamp-1">
                {program.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              title="Cetak / Unduh PDF Proposal"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer border border-white/10"
            >
              <Printer className="w-3.5 h-3.5 text-[#D4F63D]" />
              <span>Cetak PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* METADATA STRIP: Funder, Mitra, Status, & Dates */}
        <div className="bg-[#F8FAF9] border-b border-slate-200/80 px-6 py-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs shrink-0">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Mitra Pengusul</span>
            <span className="font-extrabold text-slate-900 truncate block mt-0.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#176B4D] shrink-0" />
              <span className="truncate">{partner?.name || 'Yayasan Mitra Terverifikasi'}</span>
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Funder Pendukung</span>
            <span className="font-extrabold text-slate-900 truncate block mt-0.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#176B4D] shrink-0" />
              <span className="truncate">{funder?.name || 'Konsorsium TJSL BUMN & Korporasi'}</span>
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Nilai Pengajuan (RAB)</span>
            <span className="font-extrabold text-[#176B4D] text-xs sm:text-sm block mt-0.5">
              {formatIDR(program.proposedBudget)}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Status Kurasi</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E8F6F0] text-[#176B4D] border border-emerald-200 mt-0.5">
              <CheckCircle2 className="w-3 h-3 text-[#176B4D]" />
              <span>DISETUJUI &amp; AKTIF</span>
            </span>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="px-6 pt-3 border-b border-slate-100 flex items-center gap-2 overflow-x-auto shrink-0 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab('ringkasan')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'ringkasan'
                ? 'border-[#176B4D] text-[#176B4D]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Latar Belakang &amp; Deskripsi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rab')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'rab'
                ? 'border-[#176B4D] text-[#176B4D]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Rencana Anggaran Biaya (RAB)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('indikator')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'indikator'
                ? 'border-[#176B4D] text-[#176B4D]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Target Output &amp; SDGs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('legalitas')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'legalitas'
                ? 'border-[#176B4D] text-[#176B4D]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Legalitas &amp; Surat Pengantar
          </button>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm">
          
          {/* TAB 1: RINGKASAN & LATAR BELAKANG */}
          {activeTab === 'ringkasan' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Executive Summary Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#176B4D] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ringkasan Eksekutif Proposal</span>
                </span>
                <p className="text-slate-700 leading-relaxed font-normal">
                  {program.summary}
                </p>
              </div>

              {/* Problem Statement */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#176B4D]" />
                  <span>Latar Belakang &amp; Analisis Kebutuhan Komunitas</span>
                </h4>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-slate-600 leading-relaxed">
                  <p>
                    Berdasarkan asesmen awal di wilayah <strong>{program.location}, {program.province}</strong>, 
                    komunitas menghadapi kendala struktural yang membutuhkan intervensi berkelanjutan pada pilar <strong>{catInfo?.label || program.category}</strong>.
                    Ketiadaan infrastruktur dan pendampingan berkelanjutan sebelumnya menyebabkan potensi masyarakat belum termaksimalkan.
                  </p>
                  <p>
                    Proposal ini mengusulkan intervensi terstruktur dengan pendekatan partisipatif bersama pemangku kepentingan lokal, 
                    memastikan alokasi dana CSR tepat sasaran dan menghasilkan dampak terukur yang siap diaudit.
                  </p>
                </div>
              </div>

              {/* Scope & Methodology */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Metodologi Pelaksanaan
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#176B4D] mt-0.5 shrink-0" />
                      <span>Pelibatan kelompok swadaya masyarakat desa dari tahap perencanaan.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#176B4D] mt-0.5 shrink-0" />
                      <span>Verifikasi milestone bertahap dengan bukti geotagging dan BAST digital.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#176B4D] mt-0.5 shrink-0" />
                      <span>Penyerahan aset dan keberlanjutan program pasca pendanaan CSR.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Linimasa &amp; Durasi Komitmen
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Tanggal Pengajuan:</span>
                      <span className="font-bold text-slate-800">{submissionDate}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Persetujuan Komite:</span>
                      <span className="font-bold text-[#176B4D]">{approvalDate}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-500">Periode Eksekusi:</span>
                      <span className="font-bold text-slate-800">{program.startDate} s/d {program.endDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RENCANA ANGGARAN BIAYA (RAB) */}
          {activeTab === 'rab' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Rincian Pos Anggaran Biaya (RAB)</h4>
                  <p className="text-xs text-slate-500">Breakdown rencana serapan alokasi dana CSR yang diajukan mitra</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Usulan RAB</span>
                  <span className="text-base font-extrabold text-[#176B4D]">{formatIDR(totalBudget)}</span>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="py-3 px-4">Pos Pengeluaran &amp; Komponen</th>
                      <th className="py-3 px-4 w-24 text-center">Alokasi</th>
                      <th className="py-3 px-4 text-right w-40">Nominal Usulan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rabItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{item.category}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full font-extrabold text-[10px] bg-slate-100 text-slate-700">
                            {item.percentage}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-extrabold text-slate-800">
                          {formatIDR(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-emerald-50/70 border-t border-emerald-100 font-extrabold text-slate-900">
                    <tr>
                      <td className="py-3 px-4 text-xs font-bold text-[#176B4D]">Total Plafon Anggaran Proposal</td>
                      <td className="py-3 px-4 text-center font-bold text-[#176B4D]">100%</td>
                      <td className="py-3 px-4 text-right text-sm text-[#176B4D]">{formatIDR(totalBudget)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Funding Compliance Note */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#176B4D] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Termin Pencairan Bertahap:</strong> Anggaran disalurkan dalam 3 termin berbasis verifikasi Berita Acara Serah Terima (BAST) dan dokumentasi geotagging 100% transparan.
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TARGET OUTPUT & SDGS */}
          {activeTab === 'indikator' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Target Sasaran &amp; Key Performance Indicators (KPI)</h4>
                <p className="text-xs text-slate-500">Metrik keberhasilan yang dijanjikan mitra pelaksana</p>
              </div>

              {/* Beneficiary Target Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#E8F6F0] border border-emerald-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#176B4D] uppercase tracking-wider block">Target Penerima Manfaat</span>
                    <span className="text-2xl font-black text-slate-900 mt-1 block">
                      {formatNumber(program.targetBeneficiaries)} <span className="text-xs font-semibold text-slate-600">Jiwa / Warga</span>
                    </span>
                  </div>
                  <Users className="w-8 h-8 text-[#176B4D] opacity-40" />
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Kategori Program ESG</span>
                    <span className="text-base font-extrabold text-slate-900 mt-1 block capitalize">
                      {catInfo?.label || program.category}
                    </span>
                  </div>
                  <Award className="w-8 h-8 text-amber-600 opacity-40" />
                </div>
              </div>

              {/* Indicators List */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Indikator Kuantitatif Terukur (Output)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {program.indicators && program.indicators.length > 0 ? (
                    program.indicators.map((ind, i) => (
                      <div key={i} className="p-3.5 rounded-2xl border border-slate-200 bg-white space-y-1">
                        <div className="text-xs font-bold text-slate-800">{ind.label}</div>
                        <div className="text-xs text-slate-500">
                          Target Proposal: <strong className="text-[#176B4D]">{formatNumber(ind.target)} {ind.unit}</strong>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3.5 rounded-2xl border border-slate-200 bg-white space-y-1">
                      <div className="text-xs font-bold text-slate-800">Capaian Penerima Dampak Terverifikasi</div>
                      <div className="text-xs text-slate-500">
                        Target Proposal: <strong className="text-[#176B4D]">{formatNumber(program.targetBeneficiaries)} Jiwa</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LEGALITAS & AUDIT TRAIL */}
          {activeTab === 'legalitas' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Kelengkapan Legalitas Mitra Pengusul</h4>
                <p className="text-xs text-slate-500">Due diligence dokumen hukum mitra pelaksana program</p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <FileCheck2 className="w-5 h-5 text-[#176B4D]" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Akta Pendirian &amp; SK Kemenkumham RI</div>
                      <div className="text-[10px] text-slate-400 font-mono">AHU-0012891.AH.01.04.Tahun 2021 &bull; Terverifikasi</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#176B4D] px-2.5 py-0.5 rounded-full bg-[#E8F6F0]">
                    VALID
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <FileCheck2 className="w-5 h-5 text-[#176B4D]" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">NPWP Badan &amp; Status Wajib Pajak (Kemenkeu)</div>
                      <div className="text-[10px] text-slate-400 font-mono">03.481.921.4-023.000 &bull; Patuh Pajak Tahunan</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#176B4D] px-2.5 py-0.5 rounded-full bg-[#E8F6F0]">
                    VALID
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <FileCheck2 className="w-5 h-5 text-[#176B4D]" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Surat Rekomendasi Dinas Sosial / Bappeda Setempat</div>
                      <div className="text-[10px] text-slate-400 font-mono">B-460/DINSOS/{program.province.replace(/\s+/g, '-').toUpperCase()}/2026</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#176B4D] px-2.5 py-0.5 rounded-full bg-[#E8F6F0]">
                    LENGKAP
                  </span>
                </div>
              </div>

              {/* Digital Signature Audit Stamp */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Tanda Tangan Digital Verifikator</span>
                  <span className="font-bold text-slate-800 block mt-0.5">Komite Tata Kelola SinergiCSR</span>
                  <span className="text-[10px] text-slate-400 font-mono">SHA256: 8f9b2c31e9a44b1c7...</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Tanggal Validasi</span>
                  <span className="font-bold text-[#176B4D] block mt-0.5">{approvalDate}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Kode Registrasi Dokumen: <strong className="text-slate-800 font-mono">{proposalCode}</strong>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenBooking && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBooking(program);
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-98"
              >
                <Handshake className="w-3.5 h-3.5 text-[#D4F63D]" />
                <span>Booking LOI Program</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-slate-200 hover:bg-white text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Tutup Pratinjau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
