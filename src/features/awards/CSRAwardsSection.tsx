import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Star,
  CheckCircle2,
  X,
  Sparkles,
  QrCode,
  Search,
  ArrowRight,
  TreePine,
  Printer
} from 'lucide-react';
import { formatCompactIDR, formatIDR } from '../../lib/formatters';

export interface AwardeeCompany {
  id: string;
  rank: number;
  name: string;
  ticker: string;
  logoText: string;
  badgeTier: 'platinum' | 'gold' | 'silver';
  tierLabel: string;
  totalDonation: number;
  programCount: number;
  beneficiariesCount: number;
  sroiScore: number;
  bastCompliance: string;
  featuredProject: string;
  certificateNumber: string;
  categoryAward: string;
  citation: string;
  dateAwarded: string;
}

export const SEED_AWARDEES_2025: AwardeeCompany[] = [
  {
    id: 'awd_01',
    rank: 1,
    name: 'PT Astra Agro Lestari Tbk',
    ticker: 'AALI',
    logoText: 'ASTRA',
    badgeTier: 'platinum',
    tierLabel: 'Mitra Platinum Utama',
    totalDonation: 1450000000,
    programCount: 3,
    beneficiariesCount: 4350,
    sroiScore: 3.82,
    bastCompliance: '100% Terverifikasi (3 BAST Lengkap)',
    featuredProject: 'Restorasi 50.000 Mangrove Muara Gembong & Gambut Pelalawan',
    certificateNumber: '091/PIAGAM-CSR/JABAR-HUB/XI/2025',
    categoryAward: 'The Most Impactful Coastal & Peatland Ecological Stewardship',
    citation: 'Atas dedikasi berkelanjutan dalam memulihkan ekosistem pesisir Muara Gembong dan konservasi lanskap gambut Kampar dengan pelibatan 100% kelompok nelayan dan Masyarakat Peduli Api.',
    dateAwarded: '18 November 2025'
  },
  {
    id: 'awd_02',
    rank: 2,
    name: 'PT Telkom Indonesia (Persero) Tbk',
    ticker: 'TLKM',
    logoText: 'TELKOM',
    badgeTier: 'platinum',
    tierLabel: 'Mitra Platinum Utama',
    totalDonation: 1100000000,
    programCount: 2,
    beneficiariesCount: 2850,
    sroiScore: 3.75,
    bastCompliance: '100% Terverifikasi (2 BAST Lengkap)',
    featuredProject: 'Vocational Tech Training & Inkubasi Digital Disabilitas',
    certificateNumber: '092/PIAGAM-CSR/JABAR-HUB/XI/2025',
    categoryAward: 'Pioneering Inclusive Digital Workforce Award',
    citation: 'Atas inovasi pembentukan hub pelatihan teknologi vokasi ramah disabilitas di Jakarta Barat & Tangerang yang meloloskan 85% lulusan ke sektor formal.',
    dateAwarded: '18 November 2025'
  },
  {
    id: 'awd_03',
    rank: 3,
    name: 'PT Bank Central Asia Tbk',
    ticker: 'BBCA',
    logoText: 'BCA',
    badgeTier: 'gold',
    tierLabel: 'Mitra Gold Berkelanjutan',
    totalDonation: 850000000,
    programCount: 2,
    beneficiariesCount: 3200,
    sroiScore: 3.65,
    bastCompliance: '100% Terverifikasi (2 BAST Lengkap)',
    featuredProject: 'Infrastruktur Pompa Surya Karst Gunungkidul & Beasiswa Vokasi',
    certificateNumber: '093/PIAGAM-CSR/JABAR-HUB/XI/2025',
    categoryAward: 'Best Clean Water & Community Education Synergy',
    citation: 'Atas keberhasilan instalasi pompa air bertenaga surya 5 kW di perbukitan karst Tepus dan beasiswa sertifikasi teknisi energi terbarukan.',
    dateAwarded: '18 November 2025'
  },
  {
    id: 'awd_04',
    rank: 4,
    name: 'PT Indofood Sukses Makmur Tbk',
    ticker: 'INDF',
    logoText: 'INDOFOOD',
    badgeTier: 'gold',
    tierLabel: 'Mitra Gold Berkelanjutan',
    totalDonation: 650000000,
    programCount: 1,
    beneficiariesCount: 1800,
    sroiScore: 3.70,
    bastCompliance: '100% Terverifikasi (1 BAST Lengkap)',
    featuredProject: 'Intervensi Gizi & Posyandu Terintegrasi Timor Tengah Selatan',
    certificateNumber: '094/PIAGAM-CSR/JABAR-HUB/XI/2025',
    categoryAward: 'Zero Stunting Vanguard Initiative',
    citation: 'Atas dedikasi menurunkan prevalensi stunting hingga 42% pada 12 desa pedalaman di Kabupaten Timor Tengah Selatan (NTT) melalui ketahanan pangan lokal.',
    dateAwarded: '18 November 2025'
  },
  {
    id: 'awd_05',
    rank: 5,
    name: 'PT Perusahaan Gas Negara Tbk',
    ticker: 'PGAS',
    logoText: 'PGN',
    badgeTier: 'silver',
    tierLabel: 'Mitra Silver Penggerak',
    totalDonation: 400000000,
    programCount: 2,
    beneficiariesCount: 1540,
    sroiScore: 3.45,
    bastCompliance: '100% Terverifikasi (2 BAST Lengkap)',
    featuredProject: 'Sentra Hilirisasi Olahan Laut & Peningkatan Kapasitas UMKM Tuban',
    certificateNumber: '095/PIAGAM-CSR/JABAR-HUB/XI/2025',
    categoryAward: 'SME Value-Chain Development Commendation',
    citation: 'Atas pembinaan klaster UMKM pengolahan hasil laut pesisir Tuban & Lamongan hingga mendapatkan sertifikasi higienis BPOM dan halal resmi.',
    dateAwarded: '18 November 2025'
  },
  {
    id: 'awd_06',
    rank: 6,
    name: 'PT Kalbe Farma Tbk',
    ticker: 'KLBF',
    logoText: 'KALBE',
    badgeTier: 'silver',
    tierLabel: 'Mitra Silver Penggerak',
    totalDonation: 350000000,
    programCount: 1,
    beneficiariesCount: 920,
    sroiScore: 3.52,
    bastCompliance: '100% Terverifikasi (1 BAST Lengkap)',
    featuredProject: 'Paket Sanitasi & Penguatan Nutrisi Balita Posyandu',
    certificateNumber: '096/PIAGAM-CSR/JABAR-HUB/XI/2025',
    categoryAward: 'Community Maternal Health Partnership',
    citation: 'Atas pengadaan alat antropometri berstandar Kemenkes dan distribusi suplemen mikronutrien bagi 12 posyandu pedesaan.',
    dateAwarded: '18 November 2025'
  }
];

export const CSRAwardsSection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026' | '2024'>('2025');
  const [selectedTier, setSelectedTier] = useState<'all' | 'platinum' | 'gold' | 'silver'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectingCompany, setInspectingCompany] = useState<AwardeeCompany | null>(null);
  const [activeCompanyId, setActiveCompanyId] = useState<string>(SEED_AWARDEES_2025[0].id);

  const filteredAwardees = SEED_AWARDEES_2025.filter((item) => {
    const matchesTier = selectedTier === 'all' || item.badgeTier === selectedTier;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryAward.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.featuredProject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const activeCompany =
    filteredAwardees.find((c) => c.id === activeCompanyId) ||
    filteredAwardees[0] ||
    SEED_AWARDEES_2025[0];

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <section id="award" className="scroll-mt-20 py-20 lg:py-28 bg-[#FBFDFB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F6F0] text-[#176B4D] text-xs font-bold border border-emerald-200/60">
              <Trophy className="w-3.5 h-3.5 text-[#176B4D]" />
              <span>Penganugerahan Tahunan Mitra Unggul TJSL / CSR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2518] tracking-tight leading-tight">
              Galeri CSR Award &amp; <span className="text-[#176B4D]">Hall of Fame</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              Apresiasi resmi kepatuhan tata kelola kemitraan kepada korporasi dengan realisasi donasi terverifikasi, rasio dampak SROI tertinggi, dan kepatuhan 100% Berita Acara Serah Terima (BAST).
            </p>
          </div>

          {/* Quick Metrics Bar (Clean, Unified Green/Slate Theme) */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">Total Dana Disalurkan:</span>
              <span className="font-extrabold text-[#176B4D] text-sm">Rp 4.80 Miliar</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">Penerima Manfaat:</span>
              <span className="font-extrabold text-slate-800 text-sm">14.660 Jiwa</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">Rata-rata SROI:</span>
              <span className="font-extrabold text-[#176B4D] text-sm">3.65x Return</span>
            </div>
          </div>
        </div>

        {/* Clean Unified Toolbar (Pill style, no bulky box) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
            {/* Year Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs font-bold">
              {(['2025', '2026', '2024'] as const).map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    selectedYear === year
                      ? 'bg-[#0B2518] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {year} {year === '2025' ? '★ Resmi' : ''}
                </button>
              ))}
            </div>

            {/* Tier Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs">
              {[
                { id: 'all', label: 'Semua Kategori' },
                { id: 'platinum', label: 'Platinum' },
                { id: 'gold', label: 'Gold' },
                { id: 'silver', label: 'Silver' }
              ].map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id as any)}
                  className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                    selectedTier === tier.id
                      ? 'bg-[#176B4D] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari korporasi atau kategori award..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#176B4D] transition-colors"
            />
          </div>
        </div>

        {/* 
          NEW CONCEPT: THE EXECUTIVE STAGE & RANKED LEADERBOARD
          Breaks away from "border kotak-kotak" monotony into a prestigious 
          Split Hall of Fame Showcase (Spotlight Stage + Ranked Feed)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Featured Spotlight Stage (5 cols) */}
          <div className="lg:col-span-5 flex">
            {activeCompany ? (
              <div className="w-full rounded-[2.5rem] bg-gradient-to-br from-[#072418] via-[#0B2518] to-[#12422e] text-white p-7 sm:p-9 shadow-2xl border border-emerald-800/40 relative overflow-hidden flex flex-col justify-between group">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4F63D]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  {/* Top Spotlight Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#D4F63D] text-xs font-bold border border-white/15">
                      <Trophy className="w-3.5 h-3.5 text-[#D4F63D]" />
                      <span>Peringkat #{activeCompany.rank} • {activeCompany.tierLabel}</span>
                    </div>

                    <span className="font-mono text-xs font-extrabold px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md text-emerald-200 border border-white/10">
                      {activeCompany.ticker}
                    </span>
                  </div>

                  {/* Company & Award Title */}
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                      {activeCompany.name}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4F63D]">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>{activeCompany.categoryAward}</span>
                    </div>
                  </div>

                  {/* Citation */}
                  <blockquote className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed italic border-l-2 border-[#D4F63D]/60 pl-3.5 py-0.5">
                    &ldquo;{activeCompany.citation}&rdquo;
                  </blockquote>

                  {/* Highlighted Project Card */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300/80 block">
                      Program Unggulan Tervalidasi
                    </span>
                    <div className="text-xs text-white font-medium flex items-center gap-2">
                      <TreePine className="w-4 h-4 text-[#D4F63D] shrink-0" />
                      <span className="line-clamp-2">{activeCompany.featuredProject}</span>
                    </div>
                  </div>

                  {/* Metrics Counters */}
                  <div className="grid grid-cols-3 gap-2.5 pt-2">
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                      <span className="text-[10px] text-emerald-200/70 block">Total Donasi</span>
                      <span className="text-base sm:text-lg font-black text-[#D4F63D]">
                        {formatCompactIDR(activeCompany.totalDonation)}
                      </span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                      <span className="text-[10px] text-emerald-200/70 block">Penerima</span>
                      <span className="text-base sm:text-lg font-black text-white">
                        {activeCompany.beneficiariesCount.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                      <span className="text-[10px] text-emerald-200/70 block">SROI Return</span>
                      <span className="text-base sm:text-lg font-black text-emerald-300">
                        {activeCompany.sroiScore}x
                      </span>
                    </div>
                  </div>

                  {/* BAST Compliance */}
                  <div className="flex items-center gap-2 text-xs text-emerald-200/80 pt-1">
                    <CheckCircle2 className="w-4 h-4 text-[#D4F63D] shrink-0" />
                    <span>{activeCompany.bastCompliance}</span>
                  </div>
                </div>

                {/* Bottom Action: Certificate View Button */}
                <div className="relative z-10 pt-6 mt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setInspectingCompany(activeCompany)}
                    className="w-full py-3.5 px-6 rounded-full bg-[#D4F63D] hover:bg-[#C2E82E] text-black font-extrabold text-xs transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-black" />
                    <span>Buka &amp; Unduh Piagam Penghargaan Resmi</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {/* RIGHT: Ranked Interactive Leaderboard Rows (7 cols) */}
          <div className="lg:col-span-7 space-y-3 flex flex-col justify-center">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-2 pb-1">
              <span>LEADERBOARD MITRA UNGGUL</span>
              <span>KLIK UNTUK SOROT DETAIL</span>
            </div>

            {filteredAwardees.map((item) => {
              const isSelected = activeCompany?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveCompanyId(item.id)}
                  className={`p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 relative ${
                    isSelected
                      ? 'bg-white shadow-xl ring-2 ring-[#176B4D] translate-x-1'
                      : 'bg-white/70 hover:bg-white hover:shadow-md border border-slate-200/60'
                  }`}
                >
                  {/* Left: Rank & Company Details */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Rank Circle */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                        item.rank === 1
                          ? 'bg-[#0B2518] text-[#D4F63D] ring-2 ring-emerald-500/30'
                          : item.rank === 2
                          ? 'bg-slate-800 text-white'
                          : item.rank === 3
                          ? 'bg-slate-700 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      #{item.rank}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-xs sm:text-sm text-[#0B2518] truncate group-hover:text-[#176B4D]">
                          {item.name}
                        </h4>
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 shrink-0">
                          {item.ticker}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-[#176B4D] shrink-0" />
                        <span className="truncate">{item.categoryAward}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Metrics & Tier Pill */}
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] text-slate-400 block font-medium">Realisasi</span>
                      <span className="font-extrabold text-xs sm:text-sm text-[#176B4D]">
                        {formatCompactIDR(item.totalDonation)}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                        item.badgeTier === 'platinum'
                          ? 'bg-[#E8F6F0] text-[#176B4D] border border-emerald-300/60'
                          : item.badgeTier === 'gold'
                          ? 'bg-slate-100 text-slate-700 border border-slate-200'
                          : 'bg-slate-50 text-slate-500'
                      }`}
                    >
                      {item.badgeTier === 'platinum' ? 'Platinum' : item.badgeTier === 'gold' ? 'Gold' : 'Silver'}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectingCompany(item);
                      }}
                      className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#176B4D] transition-colors cursor-pointer"
                      title="Lihat Piagam"
                    >
                      <Award className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SUB-MODAL: Digital Certificate Inspection & Printable View (Theme Unified) */}
      {inspectingCompany && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative border-2 border-emerald-600/30 my-auto text-slate-900">
            {/* Close Button */}
            <button
              onClick={() => setInspectingCompany(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Certificate Printable Sheet */}
            <div
              id="printable-certificate"
              className="space-y-6 text-center border-2 border-emerald-800/20 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#F4FAF7] via-white to-[#F4FAF7] relative"
            >
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#176B4D]" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#176B4D]" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#176B4D]" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#176B4D]" />

              {/* Header */}
              <div className="space-y-1">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#E8F6F0] text-[#176B4D] mb-2 border border-emerald-200/60">
                  <Trophy className="w-7 h-7 text-[#176B4D]" />
                </div>
                <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                  TIM FASILITASI CSR KEMITRAAN &amp; SINERGICSR INDONESIA
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#0B2518] tracking-tight">
                  PIAGAM PENGHARGAAN MITRA UTAMA
                </h1>
                <div className="font-mono text-xs text-[#176B4D] font-bold">
                  NOMOR: {inspectingCompany.certificateNumber}
                </div>
              </div>

              {/* Recipient */}
              <div className="py-2 space-y-1">
                <span className="text-xs text-slate-500 italic block">
                  Diberikan dengan apresiasi tertinggi kepada:
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#176B4D] tracking-wide uppercase">
                  {inspectingCompany.name}
                </h2>
                <div className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-[#E8F6F0] text-[#176B4D] border border-emerald-200">
                  {inspectingCompany.tierLabel} ({inspectingCompany.categoryAward})
                </div>
              </div>

              {/* Citation */}
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed italic">
                &ldquo;{inspectingCompany.citation}&rdquo;
              </p>

              {/* Proven Impact Badges */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 block font-medium">Total Realisasi</span>
                  <span className="font-extrabold text-[#176B4D]">
                    {formatCompactIDR(inspectingCompany.totalDonation)}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 block font-medium">Penerima Manfaat</span>
                  <span className="font-extrabold text-slate-800">
                    {inspectingCompany.beneficiariesCount.toLocaleString('id-ID')} Jiwa
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 block font-medium">Indeks SROI</span>
                  <span className="font-extrabold text-[#176B4D]">
                    {inspectingCompany.sroiScore}x Dampak
                  </span>
                </div>
              </div>

              {/* Signatures & QR Code */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white p-1 rounded-lg border border-slate-300 flex items-center justify-center shadow-2xs">
                    <QrCode className="w-12 h-12 text-[#0B2518]" />
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    <span className="font-bold text-[#0B2518] block">DIGITALLY VERIFIED</span>
                    <span>Tervalidasi di Ledger CSR</span>
                    <br />
                    <span>Tanggal: {inspectingCompany.dateAwarded}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800">
                    Dr. H. Ridwan Hermansyah, M.T.
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Ketua Sekretariat Tim Fasilitasi Kemitraan CSR
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-6 flex items-center justify-end gap-3 border-t border-slate-100 mt-4">
              <button
                type="button"
                onClick={() => setInspectingCompany(null)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={handlePrintCertificate}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Simpan PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
