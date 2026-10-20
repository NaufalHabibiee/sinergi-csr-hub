import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
  User,
  ShieldCheck,
  Calendar,
  Sparkles,
  Printer,
  ExternalLink,
  ArrowRight,
  Handshake
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { useCSRStore } from '../../context/CSRStoreContext';
import { Program } from '../../types/csr';
import { formatCompactIDR, formatIDR, formatDateID, CATEGORY_LABELS } from '../../lib/formatters';

interface ProjectBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: Program | null;
  onSuccess?: () => void;
}

export const ProjectBookingModal: React.FC<ProjectBookingModalProps> = ({
  isOpen,
  onClose,
  program,
  onSuccess
}) => {
  const { funders, createFundingRecord } = useCSRStore();

  // Form states
  const [funderSelection, setFunderSelection] = useState<string>('fnd_001'); // default to first funder
  const [customCompanyName, setCustomCompanyName] = useState<string>('');
  const [picName, setPicName] = useState<string>('Budi Santoso, S.E.');
  const [picRole, setPicRole] = useState<string>('Manager CSR & Sustainability');
  const [picEmail, setPicEmail] = useState<string>('csr.relations@corp.demo');
  const [picPhone, setPicPhone] = useState<string>('+62 812-3456-7890');
  
  // Commitment amount & scheme
  const remainingBudget = program ? Math.max(program.proposedBudget - program.committedAmount, 50_000_000) : 100_000_000;
  const [commitmentAmount, setCommitmentAmount] = useState<number>(100_000_000);
  const [customAmountStr, setCustomAmountStr] = useState<string>('');
  const [fundingScheme, setFundingScheme] = useState<string>('termin_bertahap');
  const [targetQuarter, setTargetQuarter] = useState<string>('Q2 2026');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Result state
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    referenceNo: string;
    companyName: string;
    amount: number;
    programTitle: string;
    programCode: string;
    date: string;
    quarter: string;
    pic: string;
  } | null>(null);

  if (!program) return null;

  const catInfo = CATEGORY_LABELS[program.category];

  const handlePresetAmount = (amt: number) => {
    setCommitmentAmount(amt);
    setCustomAmountStr('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const num = parseInt(raw, 10) || 0;
    setCustomAmountStr(raw);
    setCommitmentAmount(num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedFunderObj = funders.find((f) => f.id === funderSelection);
    const companyDisplayName = funderSelection === 'custom' ? customCompanyName || 'PT Mitra Korporat Mandiri' : selectedFunderObj?.name || 'Corporate Funder';

    const finalAmount = commitmentAmount > 0 ? commitmentAmount : 100_000_000;
    const generatedRef = `LOI-2026-${program.code.replace('PRG-2026-', '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Save commitment into platform ledger
    createFundingRecord({
      funderId: funderSelection === 'custom' ? 'fnd_001' : funderSelection,
      programId: program.id,
      sourceType: 'CSR Korporat Tahunan',
      recordType: 'Commitment',
      amount: finalAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'Approved (Demo)',
      notes: `[Booking Proyek Resmi / LoI] Komitmen dari ${companyDisplayName} (PIC: ${picName} - ${picPhone}). Skema: ${fundingScheme}, Periode: ${targetQuarter}. Catatan: ${specialNotes || 'Tanpa catatan khusus'}. Ref: ${generatedRef}`
    });

    setSubmittedReceipt({
      referenceNo: generatedRef,
      companyName: companyDisplayName,
      amount: finalAmount,
      programTitle: program.title,
      programCode: program.code,
      date: new Date().toISOString().split('T')[0],
      quarter: targetQuarter,
      pic: `${picName} (${picRole})`
    });

    if (onSuccess) onSuccess();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetAndClose = () => {
    setSubmittedReceipt(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={submittedReceipt ? 'Letter of Intent (LoI) Terdaftar' : 'Booking & Nyatakan Minat Pendanaan Program'}
      subtitle={
        submittedReceipt
          ? 'Tanda terima registrasi komitmen kemitraan CSR resmi'
          : 'Pernyataan komitmen minat (Letter of Intent) pendanaan program prioritas'
      }
      maxWidth="2xl"
    >
      {submittedReceipt ? (
        /* SUCCESS RECEIPT / CERTIFICATE VIEW */
        <div className="space-y-6 text-left py-2">
          <div className="bg-emerald-50/90 border border-emerald-200/90 rounded-2xl p-6 text-center relative overflow-hidden">
            <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-600/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-full inline-block mb-2">
              Komitmen Kemitraan Terverifikasi
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Letter of Intent Berhasil Didaftarkan!
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
              Komitmen pendanaan CSR dari <strong className="text-slate-800">{submittedReceipt.companyName}</strong> telah berhasil dicatat pada buku besar SinergiCSR.
            </p>
          </div>

          {/* Official Letter Slip Card */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-xs space-y-4 font-sans text-xs text-slate-700">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">No. Registrasi Komitmen</span>
                <span className="font-mono text-sm font-bold text-[#176B4D]">{submittedReceipt.referenceNo}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Tanggal Penerbitan</span>
                <span className="font-semibold text-slate-800">{formatDateID(submittedReceipt.date)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Perusahaan Pendana (Funder):</span>
                <span className="font-bold text-slate-900 text-sm">{submittedReceipt.companyName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Narahubung PIC:</span>
                <span className="font-medium text-slate-800">{submittedReceipt.pic}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[10px] text-slate-400 font-medium block">Program yang Didanai:</span>
                <span className="font-bold text-slate-900 block leading-snug">{submittedReceipt.programTitle}</span>
                <span className="font-mono text-[11px] text-emerald-700 font-medium">({submittedReceipt.programCode})</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Nilai Komitmen Pagu:</span>
                <span className="text-base font-extrabold text-[#176B4D]">{formatIDR(submittedReceipt.amount)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Rencana Periode Realisasi:</span>
                <span className="font-semibold text-slate-800">{submittedReceipt.quarter}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Dokumen ini berlaku sebagai bukti awal *Letter of Intent* untuk penyusunan Perjanjian Kerja Sama (PKS) dan integrasi laporan PROPER KLHK.</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Cetak / Unduh Bukti LoI</span>
            </button>
            <button
              onClick={handleResetAndClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold cursor-pointer transition-colors shadow-sm shadow-[#176B4D]/20"
            >
              <span>Selesai &amp; Tutup</span>
            </button>
          </div>
        </div>
      ) : (
        /* INPUT FORM VIEW */
        <form onSubmit={handleSubmit} className="space-y-5 text-left py-1">
          {/* Program Information Pill Card */}
          <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                {program.code}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {catInfo?.label || program.category}
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 leading-snug">
              {program.title}
            </h4>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-slate-200/60">
              <span className="text-slate-500">
                Lokasi: <strong className="text-slate-700">{program.location}</strong>
              </span>
              <span className="text-slate-500">
                Total Kebutuhan: <strong className="text-[#176B4D]">{formatCompactIDR(program.proposedBudget)}</strong>
              </span>
            </div>
          </div>

          {/* 1. Pilih Perusahaan Pendana */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              1. Pilih / Masukkan Perusahaan Calon Funder
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {funders.slice(0, 4).map((f) => (
                <div
                  key={f.id}
                  onClick={() => setFunderSelection(f.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    funderSelection === f.id
                      ? 'border-[#176B4D] bg-[#EBF6F1] font-bold text-[#072418] shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Building2 className={`w-3.5 h-3.5 ${funderSelection === f.id ? 'text-[#176B4D]' : 'text-slate-400'}`} />
                    <span className="truncate">{f.name}</span>
                  </div>
                  {funderSelection === f.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#176B4D] shrink-0" />}
                </div>
              ))}
            </div>

            {/* Opsi Perusahaan Baru / Custom */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setFunderSelection('custom')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  funderSelection === 'custom'
                    ? 'border-[#176B4D] bg-[#EBF6F1] text-[#176B4D]'
                    : 'border-dashed border-slate-300 text-slate-600 hover:border-slate-400'
                }`}
              >
                + Masukkan Nama Perusahaan Korporasi Baru
              </button>

              {funderSelection === 'custom' && (
                <input
                  type="text"
                  required
                  value={customCompanyName}
                  onChange={(e) => setCustomCompanyName(e.target.value)}
                  placeholder="Contoh: PT Sumber Daya Berkelanjutan Tbk"
                  className="mt-2 w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D] bg-white"
                />
              )}
            </div>
          </div>

          {/* 2. Nilai Komitmen Anggaran */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800">
                2. Nilai Komitmen Pendanaan (Rupiah)
              </label>
              <span className="text-[11px] font-bold text-[#176B4D]">
                {formatIDR(commitmentAmount)}
              </span>
            </div>

            {/* Quick preset buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[50_000_000, 100_000_000, 250_000_000, program.proposedBudget].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePresetAmount(amt)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                    commitmentAmount === amt && !customAmountStr
                      ? 'border-[#176B4D] bg-[#176B4D] text-white shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {amt === program.proposedBudget ? 'Penuh: ' : ''}{formatCompactIDR(amt)}
                </button>
              ))}
            </div>

            {/* Custom input */}
            <div className="pt-1">
              <input
                type="text"
                value={customAmountStr}
                onChange={handleCustomAmountChange}
                placeholder="Atau masukkan nominal kustom (misal: 150000000)"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D] bg-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* 3. Skema Pendanaan & Jadwal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                3. Skema Pendanaan
              </label>
              <select
                value={fundingScheme}
                onChange={(e) => setFundingScheme(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#176B4D]"
              >
                <option value="termin_bertahap">Termin Bertahap Berbasis Bukti (3 Termin)</option>
                <option value="hibah_penuh">Hibah Komitmen Penuh di Awal (100%)</option>
                <option value="co_funding">Konsorsium / Co-Funding Bersama</option>
                <option value="bantuan_sarana">Dukungan Pengadaan Sarana Fisik</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                4. Rencana Jadwal Realisasi
              </label>
              <select
                value={targetQuarter}
                onChange={(e) => setTargetQuarter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#176B4D]"
              >
                <option value="Q1 2026">Kuartal I 2026 (Jan - Mar)</option>
                <option value="Q2 2026">Kuartal II 2026 (Apr - Jun)</option>
                <option value="Q3 2026">Kuartal III 2026 (Jul - Sep)</option>
                <option value="Q4 2026">Kuartal IV 2026 (Okt - Des)</option>
              </select>
            </div>
          </div>

          {/* 4. Data Narahubung PIC Korporasi */}
          <div className="space-y-2 pt-2 border-t border-slate-150">
            <label className="block text-xs font-bold text-slate-800">
              5. Data Narahubung (PIC) Komitmen CSR
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">Nama Lengkap PIC:</span>
                <input
                  type="text"
                  required
                  value={picName}
                  onChange={(e) => setPicName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">Jabatan:</span>
                <input
                  type="text"
                  required
                  value={picRole}
                  onChange={(e) => setPicRole(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">Email Resmi Korporasi:</span>
                <input
                  type="email"
                  required
                  value={picEmail}
                  onChange={(e) => setPicEmail(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">No. WhatsApp / Telp:</span>
                <input
                  type="text"
                  required
                  value={picPhone}
                  onChange={(e) => setPicPhone(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                />
              </div>
            </div>
          </div>

          {/* 5. Catatan Tambahan (Opsional) */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Catatan / Kriteria Khusus Perusahaan (Opsional)
            </label>
            <textarea
              rows={2}
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="Contoh: Menghendaki penyaluran fokus di ring-1 sekitar pabrik atau dokumentasi video serah terima."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D] resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-150">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold shadow-md shadow-[#176B4D]/25 transition-all cursor-pointer"
            >
              <Handshake className="w-4 h-4" />
              <span>Kirim Letter of Intent (Booking Proyek)</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
