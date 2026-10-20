import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Download,
  Printer,
  Search,
  Filter,
  CheckCircle2,
  Building2,
  MapPin,
  Users,
  Handshake,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Layers
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { useCSRStore } from '../../context/CSRStoreContext';
import { Program } from '../../types/csr';
import { formatCompactIDR, formatIDR, formatDateID, CATEGORY_LABELS } from '../../lib/formatters';

interface CSRMenuBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgramForBooking: (program: Program) => void;
}

// Curated OPD / Regional Government Proposal Codes
const OPD_PROPOSAL_SOURCES: Record<string, { code: string; agency: string; priority: string }> = {
  prg_001: {
    code: 'USULAN-DLH-2026-01',
    agency: 'Dinas Lingkungan Hidup & Kehutanan',
    priority: 'Prioritas Mitigasi Abrasi Pesisir'
  },
  prg_002: {
    code: 'USULAN-DISDIK-2026-02',
    agency: 'Dinas Pendidikan & Kebudayaan',
    priority: 'Prioritas Talenta Digital Prasejahtera'
  },
  prg_003: {
    code: 'USULAN-DISKOP-2026-03',
    agency: 'Dinas Koperasi & Usaha Mikro (UMKM)',
    priority: 'Prioritas Sertifikasi Halal Pantura'
  },
  prg_004: {
    code: 'USULAN-DINKES-2026-04',
    agency: 'Dinas Kesehatan & Pengendalian Penduduk',
    priority: 'Prioritas Nasional Pengentasan Stunting'
  },
  prg_005: {
    code: 'USULAN-DPUPR-2026-05',
    agency: 'Dinas PUPR & Perumahan Kawasan Permukiman',
    priority: 'Prioritas Krisis Air Bersih Daerah Karst'
  },
  prg_006: {
    code: 'USULAN-KPH-2026-06',
    agency: 'Balai Konservasi Hutan & Lahan Gambut',
    priority: 'Prioritas Pencegahan Karhutla Terpadu'
  },
  prg_007: {
    code: 'USULAN-DINSOS-2026-07',
    agency: 'Dinas Sosial & Ketenagakerjaan',
    priority: 'Prioritas Lapangan Kerja Inklusif Disabilitas'
  },
  prg_008: {
    code: 'USULAN-DISTAN-2026-08',
    agency: 'Dinas Pertanian & Ketahanan Pangan',
    priority: 'Prioritas Kedaulatan Pupuk Organik Komunitas'
  }
};

export const CSRMenuBookModal: React.FC<CSRMenuBookModalProps> = ({
  isOpen,
  onClose,
  onSelectProgramForBooking
}) => {
  const { programs } = useCSRStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [programs, selectedCategory, searchQuery]);

  const totalBudgetNeeded = useMemo(() => {
    return programs.reduce((acc, p) => acc + p.proposedBudget, 0);
  }, [programs]);

  const totalBeneficiaries = useMemo(() => {
    return programs.reduce((acc, p) => acc + p.targetBeneficiaries, 0);
  }, [programs]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Buku Menu Kemitraan CSR 2026 (Partnership Menu Book)"
      subtitle="Katalog Usulan Paket Proyek Pembangunan Daerah Terkurasi & Siap Didanai"
      maxWidth="4xl"
    >
      <div className="space-y-6 text-left py-2 font-sans">
        {/* 1. Executive Banner / Header Document */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0B2518] via-[#0E3D2A] to-[#176B4D] text-white p-6 sm:p-7 shadow-lg overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-white/15 text-[#D4F63D] border border-white/20 backdrop-blur-md">
                Edisi Resmi 2026 • Kurasi Prioritas SinergiCSR
              </span>
              <span className="text-xs text-white/70">
                Penyelarasan RPJMD &amp; PROPER KLHK
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                Daftar Paket Program Siap Kemitraan (Menu Book)
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1.5 max-w-2xl leading-relaxed">
                Katalog resmi program pembangunan sosial dan lingkungan hasil penelaahan Bappeda dan dinas teknis, dirancang untuk mempermudah korporasi mengalokasikan anggaran CSR/TJSL secara tepat sasaran, akuntabel, dan bebas duplikasi.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/15 text-xs">
              <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                <span className="text-[10px] text-emerald-200 block">Total Paket Proyek:</span>
                <span className="text-base font-extrabold text-white">{programs.length} Program</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                <span className="text-[10px] text-emerald-200 block">Pagu Anggaran Dibutuhkan:</span>
                <span className="text-base font-extrabold text-[#D4F63D]">{formatCompactIDR(totalBudgetNeeded)}</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                <span className="text-[10px] text-emerald-200 block">Target Sasaran Warga:</span>
                <span className="text-base font-extrabold text-white">{totalBeneficiaries.toLocaleString('id-ID')} Jiwa</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                <span className="text-[10px] text-emerald-200 block">Kesiapan Audit:</span>
                <span className="text-base font-extrabold text-white">PROPER &amp; SDGs</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Filter & Search Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari program, wilayah, dinas..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D] bg-slate-50/70"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Semua Paket' },
              { id: 'lingkungan', label: 'Lingkungan' },
              { id: 'pendidikan', label: 'Pendidikan' },
              { id: 'ekonomi_umkm', label: 'UMKM' },
              { id: 'kesehatan', label: 'Kesehatan' },
              { id: 'infrastruktur', label: 'Infrastruktur' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#176B4D] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Catalog List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {filteredPrograms.map((prog, idx) => {
            const opdInfo = OPD_PROPOSAL_SOURCES[prog.id] || {
              code: `USULAN-OPD-2026-0${idx + 1}`,
              agency: 'Dinas Teknis Pembina Wilayah',
              priority: 'Prioritas Pembangunan Berkelanjutan'
            };
            const catInfo = CATEGORY_LABELS[prog.category];
            const remaining = Math.max(prog.proposedBudget - prog.committedAmount, 0);

            return (
              <div
                key={prog.id}
                className="bg-white border border-slate-200 hover:border-[#176B4D]/50 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all space-y-3.5"
              >
                {/* Top strip: OPD origin & Priority badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {opdInfo.code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700">
                      {opdInfo.agency}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {opdInfo.priority}
                  </span>
                </div>

                {/* Main Program Title & Info */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {prog.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {prog.location}, {prog.province}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        Target: {prog.targetBeneficiaries.toLocaleString('id-ID')} Penerima
                      </span>
                      <span className="font-semibold text-emerald-700">
                        {catInfo?.label || prog.category}
                      </span>
                    </div>
                  </div>

                  {/* Budget & Action Box */}
                  <div className="bg-slate-50/90 border border-slate-150 rounded-xl p-3.5 flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 min-w-[200px]">
                    <div className="text-left lg:text-right">
                      <span className="text-[10px] text-slate-400 font-medium block">Pagu Kebutuhan Dana:</span>
                      <span className="text-base font-extrabold text-[#176B4D]">
                        {formatCompactIDR(prog.proposedBudget)}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                        {prog.committedAmount > 0
                          ? `Terserap: ${formatCompactIDR(prog.committedAmount)}`
                          : 'Terbuka 100%'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectProgramForBooking(prog);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Handshake className="w-3.5 h-3.5" />
                      <span>Booking / Nyatakan Minat</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Footer Legal & Print Option */}
        <div className="pt-4 border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Seluruh paket proyek dalam buku menu ini telah lolos verifikasi kelayakan teknis dan siap MoU.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Cetak / Unduh Format Buku Menu</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
