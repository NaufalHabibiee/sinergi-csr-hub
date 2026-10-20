import React, { useState, useEffect, useMemo } from 'react';
import {
  FileCheck2,
  Printer,
  Download,
  Building2,
  Users,
  CheckCircle2,
  X,
  MapPin,
  Calendar,
  ShieldCheck,
  QrCode,
  FileText,
  Stamp,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { Program } from '../../types/csr';
import { formatIDR, formatCompactIDR } from '../../lib/formatters';

interface BASTGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProgramId?: string;
}

export const BASTGeneratorModal: React.FC<BASTGeneratorModalProps> = ({
  isOpen,
  onClose,
  preselectedProgramId
}) => {
  const { programs, funders, partners } = useCSRStore();

  const [selectedProgramId, setSelectedProgramId] = useState<string>(
    preselectedProgramId || programs[0]?.id || 'prg_001'
  );

  useEffect(() => {
    if (preselectedProgramId) {
      setSelectedProgramId(preselectedProgramId);
    }
  }, [preselectedProgramId]);

  const activeProgram = useMemo(() => {
    return programs.find((p) => p.id === selectedProgramId) || programs[0];
  }, [programs, selectedProgramId]);

  // Form states for BAST document customization
  const [bastNumber, setBastNumber] = useState('048/BAST-CSR/UNIV-HUB/X/2026');
  const [handoverDate, setHandoverDate] = useState('20 Oktober 2026');
  const [firstPartyCompany, setFirstPartyCompany] = useState('PT Astra Agro Lestari Tbk');
  const [firstPartySigner, setFirstPartySigner] = useState('Ir. Bambang Wicaksono, M.M.');
  const [firstPartyTitle, setFirstPartyTitle] = useState('Head of Corporate Social Responsibility');
  const [secondPartySigner, setSecondPartySigner] = useState('Ujang Sumarna, S.Pi.');
  const [secondPartyTitle, setSecondPartyTitle] = useState('Ketua Koperasi / Kelompok Tani Penerima');
  const [isSaved, setIsSaved] = useState(false);

  // Auto-sync first party from program funder if available
  useEffect(() => {
    if (activeProgram) {
      const funder = funders.find((f) => f.id === activeProgram.funderId);
      if (funder) {
        setFirstPartyCompany(funder.name);
      }
      const partner = partners.find((p) => p.id === activeProgram.partnerId);
      if (partner) {
        setSecondPartyTitle(`Ketua ${partner.name}`);
      }
    }
  }, [activeProgram, funders, partners]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToLedger = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 font-sans">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[94vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#0B2518] via-[#0E3D2A] to-[#176B4D] text-white p-6 sm:p-7 relative overflow-hidden flex-shrink-0">
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-[#D4F63D] text-xs font-bold border border-emerald-400/30">
                <FileCheck2 className="w-3.5 h-3.5 text-[#D4F63D]" />
                <span>Dokumen Legal Formal Audit PROPER &amp; BPK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Generator Berita Acara Serah Terima (BAST)
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Pembuat berkas BAST terstandarisasi pemerintah untuk serah terima fisik/infrastruktur program CSR dari korporasi donatur kepada pemerintah daerah &amp; kelompok penerima manfaat.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSaved && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/25 border border-emerald-400 text-xs text-white font-medium flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#D4F63D]" />
              <span>
                BAST berhasil dicatat dan dikunci pada Audit Ledger SinergiCSR. Status Dokumen: <strong>VERIFIED</strong>.
              </span>
            </div>
          )}
        </div>

        {/* Form Controls Strip */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-4 flex flex-wrap items-center justify-between gap-4 flex-shrink-0 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Pilih Program Objek BAST:
              </label>
              <select
                value={selectedProgramId}
                onChange={(e) => setSelectedProgramId(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#176B4D]"
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.code} - {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Nomor Surat BAST:
              </label>
              <input
                type="text"
                value={bastNumber}
                onChange={(e) => setBastNumber(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-800 w-56 focus:outline-none focus:border-[#176B4D]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveToLedger}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold transition-all cursor-pointer shadow-xs"
            >
              Simpan ke Ledger Audit
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white font-bold transition-all cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>

        {/* Scrollable Document Preview Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-100/60">
          {/* Printable BAST Sheet (Styled like physical letterhead paper) */}
          <div
            id="printable-bast-document"
            className="bg-white rounded-2xl max-w-4xl mx-auto p-8 sm:p-12 shadow-md border border-slate-200 text-slate-900 space-y-6"
          >
            {/* Kop Surat Resmi */}
            <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1 relative">
              <div className="text-xs font-bold tracking-widest text-[#176B4D] uppercase">
                TIM FASILITASI KEMITRAAN CSR DAERAH &amp; PLATFORM SINERGICSR
              </div>
              <h1 className="text-base sm:text-lg font-serif font-black tracking-wider text-slate-900 uppercase">
                BERITA ACARA SERAH TERIMA (BAST) HASIL PELAKSANAAN PROGRAM
              </h1>
              <div className="text-xs font-bold text-slate-700">
                TANGGUNG JAWAB SOSIAL DAN LINGKUNGAN PERUSAHAAN (TJSL / CSR)
              </div>
              <div className="font-mono text-xs text-slate-600 font-bold mt-1">
                NOMOR: {bastNumber}
              </div>
            </div>

            {/* Preamble */}
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              Pada hari ini, <strong>Selasa</strong> tanggal <strong>{handoverDate}</strong>, bertempat di lokasi pelaksanaan program, kami yang bertanda tangan di bawah ini:
            </p>

            {/* Para Pihak */}
            <div className="space-y-4 text-xs">
              {/* PIHAK PERTAMA */}
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-[#176B4D] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#176B4D] text-white text-[10px] inline-flex items-center justify-center">1</span>
                  <span>PIHAK PERTAMA (Funder / Perusahaan Pelaksana):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Nama Perusahaan:</span>
                    <input
                      type="text"
                      value={firstPartyCompany}
                      onChange={(e) => setFirstPartyCompany(e.target.value)}
                      className="font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-300 w-full focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Nama Penandatangan &amp; Jabatan:</span>
                    <input
                      type="text"
                      value={`${firstPartySigner} (${firstPartyTitle})`}
                      onChange={(e) => setFirstPartySigner(e.target.value)}
                      className="font-medium text-slate-800 bg-transparent border-b border-dashed border-slate-300 w-full focus:outline-none"
                    />
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 pl-6 pt-0.5">
                  Dalam hal ini bertindak untuk dan atas nama Perusahaan pemberi kontribusi Program TJSL/CSR.
                </div>
              </div>

              {/* PIHAK KEDUA */}
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-[#176B4D] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#176B4D] text-white text-[10px] inline-flex items-center justify-center">2</span>
                  <span>PIHAK KEDUA (Kelompok Penerima Manfaat / Lembaga Pengelola):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Nama Penandatangan:</span>
                    <input
                      type="text"
                      value={secondPartySigner}
                      onChange={(e) => setSecondPartySigner(e.target.value)}
                      className="font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-300 w-full focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Kapasitas Jabatan / Lembaga:</span>
                    <input
                      type="text"
                      value={secondPartyTitle}
                      onChange={(e) => setSecondPartyTitle(e.target.value)}
                      className="font-medium text-slate-800 bg-transparent border-b border-dashed border-slate-300 w-full focus:outline-none"
                    />
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 pl-6 pt-0.5">
                  Dalam hal ini bertindak mewakili kelompok masyarakat / komunitas penerima manfaat di wilayah program.
                </div>
              </div>
            </div>

            {/* Klausul Legal */}
            <div className="space-y-2 text-xs text-slate-700 leading-relaxed text-justify">
              <p>
                Kedua belah pihak secara bersama-sama menerangkan dan menyepakati ketentuan sebagai berikut:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>
                  <strong>PIHAK PERTAMA</strong> telah menyelesaikan seluruh pekerjaan fisik, instalasi sarana, pengadaan bahan, serta pendampingan kapasitas untuk program: <strong>&ldquo;{activeProgram.title}&rdquo;</strong> (Kode: {activeProgram.code}).
                </li>
                <li>
                  <strong>PIHAK KEDUA</strong> telah melakukan pemeriksaan bersama di lapangan, memvalidasi kuantitas maupun spesifikasi teknis barang/jasa, dan menyatakan menerima penyerahan tersebut dengan kondisi <strong>100% BAIK, LENGKAP, DAN BERFUNGSI</strong>.
                </li>
                <li>
                  Dengan ditandatanganinya Berita Acara ini, kepemilikan dan hak guna hasil pelaksanaan program secara resmi beralih kepada <strong>PIHAK KEDUA</strong> untuk dimanfaatkan seluas-luasnya bagi kesejahteraan masyarakat sekitar.
                </li>
                <li>
                  <strong>PIHAK KEDUA</strong> berkewajiban merawat, mengoperasikan, dan tidak memindahtangankan aset program kepada pihak manapun tanpa persetujuan tertulis.
                </li>
              </ol>
            </div>

            {/* Rincian Objek Serah Terima Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">No</th>
                    <th className="p-2.5">Rincian Komponen / Sarana Fisik</th>
                    <th className="p-2.5">Volume Output</th>
                    <th className="p-2.5 text-right">Nilai Realisasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  <tr>
                    <td className="p-2.5 font-bold">1</td>
                    <td className="p-2.5">
                      <div className="font-bold">{activeProgram.title}</div>
                      <div className="text-[11px] text-slate-500">{activeProgram.location}</div>
                    </td>
                    <td className="p-2.5 font-bold text-[#176B4D]">
                      {activeProgram.targetBeneficiaries.toLocaleString('id-ID')} Jiwa Manfaat
                    </td>
                    <td className="p-2.5 text-right font-bold">
                      {formatIDR(activeProgram.proposedBudget)}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">2</td>
                    <td className="p-2.5">
                      <div className="font-semibold">Pendampingan Lapangan &amp; Uji Kelayakan Teknis</div>
                      <div className="text-[11px] text-slate-500">Pelatihan SOP pemeliharaan mandiri masyarakat</div>
                    </td>
                    <td className="p-2.5">1 Paket Paripurna</td>
                    <td className="p-2.5 text-right font-medium text-slate-500">Termasuk</td>
                  </tr>
                </tbody>
                <tfoot className="bg-slate-50 font-bold border-t border-slate-200 text-slate-900">
                  <tr>
                    <td colSpan={3} className="p-2.5 text-right">TOTAL NILAI SERAH TERIMA FISIK:</td>
                    <td className="p-2.5 text-right text-[#176B4D] font-extrabold text-sm">
                      {formatIDR(activeProgram.proposedBudget)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Signatures Block with e-Meterai simulation */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center text-xs">
              {/* Pihak Pertama */}
              <div className="space-y-16 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">PIHAK PERTAMA</span>
                  <span className="font-bold text-slate-800">{firstPartyCompany}</span>
                </div>

                <div className="relative inline-block mx-auto">
                  {/* e-Meterai Badge */}
                  <div className="border border-emerald-600 bg-emerald-50 text-emerald-800 text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm inline-block mb-1">
                    e-METERAI Rp 10.000 SAH
                  </div>
                  <div className="font-bold underline text-slate-900">{firstPartySigner}</div>
                  <div className="text-[10px] text-slate-500">{firstPartyTitle}</div>
                </div>
              </div>

              {/* Pihak Kedua */}
              <div className="space-y-16 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">PIHAK KEDUA</span>
                  <span className="font-bold text-slate-800">{secondPartyTitle}</span>
                </div>

                <div className="relative inline-block mx-auto">
                  <div className="font-bold underline text-slate-900">{secondPartySigner}</div>
                  <div className="text-[10px] text-slate-500">Ketua Kelompok Penerima Manfaat</div>
                </div>
              </div>

              {/* Mengetahui / Saksi Tim Fasilitasi */}
              <div className="col-span-2 sm:col-span-1 space-y-16 flex flex-col justify-between pt-4 sm:pt-0">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">MENGETAHUI / SAKSI</span>
                  <span className="font-bold text-[#176B4D]">Tim Fasilitasi Kemitraan CSR</span>
                </div>

                <div className="space-y-1">
                  <div className="w-10 h-10 mx-auto bg-slate-50 p-1 rounded-md border border-slate-200 flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-slate-700" />
                  </div>
                  <div className="text-[9px] font-mono text-slate-500">
                    DIGITALLY VALIDATED
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Format BAST resmi sesuai Permen BUMN &amp; Pedoman Penilaian PROPER KLHK RI.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer"
          >
            Tutup Generator
          </button>
        </div>
      </div>
    </div>
  );
};
