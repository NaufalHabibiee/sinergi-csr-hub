import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Medal,
  Star,
  CheckCircle2,
  Printer,
  X,
  Sparkles,
  Building2,
  ShieldCheck,
  QrCode,
  Search,
  Filter,
  ArrowRight
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
  tierColor: string;
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
    tierColor: 'from-amber-400 via-yellow-300 to-amber-500 text-amber-950',
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
    tierColor: 'from-amber-400 via-yellow-300 to-amber-500 text-amber-950',
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
    tierColor: 'from-yellow-200 via-amber-200 to-yellow-400 text-amber-900',
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
    tierColor: 'from-yellow-200 via-amber-200 to-yellow-400 text-amber-900',
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
    tierColor: 'from-slate-200 via-slate-300 to-slate-400 text-slate-800',
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
    tierColor: 'from-slate-200 via-slate-300 to-slate-400 text-slate-800',
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

  const filteredAwardees = SEED_AWARDEES_2025.filter((item) => {
    const matchesTier = selectedTier === 'all' || item.badgeTier === selectedTier;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryAward.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.featuredProject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <section id="award" className="scroll-mt-20 py-20 lg:py-28 bg-[#FBFDFB] border-t border-slate-150/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200/80">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Penganugerahan Tahunan Mitra Unggul TJSL / CSR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2518] tracking-tight leading-tight">
              Galeri CSR Award &amp; <span className="text-[#176B4D]">Hall of Fame</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              Penghargaan resmi kepada korporasi mitra dengan realisasi donasi terverifikasi tertinggi, pencapaian SROI tertinggi, dan 100% kepatuhan audit Berita Acara Serah Terima (BAST).
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">Total Dana Disalurkan:</span>
              <span className="font-extrabold text-[#176B4D] text-sm">Rp 4.80 Miliar</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">Penerima Manfaat:</span>
              <span className="font-extrabold text-slate-800 text-sm">14.660 Jiwa</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">Rata-rata SROI:</span>
              <span className="font-extrabold text-amber-700 text-sm">3.65x Return</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Toolbar Directly in Section */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Year Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              {(['2025', '2026', '2024'] as const).map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedYear === year
                      ? 'bg-[#176B4D] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {year} {year === '2025' ? '★ Resmi' : ''}
                </button>
              ))}
            </div>

            {/* Tier Filters */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              {[
                { id: 'all', label: 'Semua Kategori' },
                { id: 'platinum', label: 'Platinum (> Rp 1 M)' },
                { id: 'gold', label: 'Gold (Rp 500 Jt - 1 M)' },
                { id: 'silver', label: 'Silver (Rp 100 - 500 Jt)' }
              ].map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id as any)}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    selectedTier === tier.id
                      ? 'bg-amber-100 text-amber-900 font-bold'
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
              placeholder="Cari nama korporasi atau award..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#176B4D] focus:bg-white"
            />
          </div>
        </div>

        {/* Corporate Awardee Cards Grid Directly on Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAwardees.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-amber-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3.5">
                {/* Card Top: Rank & Ticker */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shadow-xs ${
                        item.rank === 1
                          ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white ring-2 ring-amber-200'
                          : item.rank === 2
                          ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white'
                          : item.rank === 3
                          ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      #{item.rank}
                    </div>
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.ticker}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${item.tierColor} shadow-2xs`}
                  >
                    {item.tierLabel}
                  </span>
                </div>

                {/* Company Name */}
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#176B4D] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <div className="text-xs font-bold text-[#176B4D] flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />
                    <span className="line-clamp-1">{item.categoryAward}</span>
                  </div>
                </div>

                {/* Citation */}
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed italic">
                  &ldquo;{item.citation}&rdquo;
                </p>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-medium">Realisasi Donasi:</span>
                    <span className="font-extrabold text-[#176B4D] text-xs sm:text-sm">
                      {formatCompactIDR(item.totalDonation)}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-medium">Indeks SROI:</span>
                    <span className="font-extrabold text-amber-800 text-xs sm:text-sm">
                      {item.sroiScore}x Nilai Dampak
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{item.bastCompliance}</span>
                </div>
              </div>

              {/* Action Button: View Certificate */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setInspectingCompany(item)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-[#176B4D] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Lihat &amp; Unduh Piagam Digital</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUB-MODAL: Digital Certificate Inspection & Printable View */}
      {inspectingCompany && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative border-4 border-amber-300/60 my-auto text-slate-900">
            {/* Close Button */}
            <button
              onClick={() => setInspectingCompany(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Certificate Printable Sheet */}
            <div id="printable-certificate" className="space-y-6 text-center border-2 border-amber-200/80 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30 relative">
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-500" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-500" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-500" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500" />

              {/* Header */}
              <div className="space-y-1">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-400/20 text-amber-600 mb-2">
                  <Trophy className="w-7 h-7" />
                </div>
                <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                  TIM FASILITASI CSR KEMITRAAN &amp; SINERGICSR INDONESIA
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#0B2518] tracking-tight">
                  PIAGAM PENGHARGAAN MITRA UTAMA
                </h1>
                <div className="font-mono text-xs text-amber-800 font-bold">
                  NOMOR: {inspectingCompany.certificateNumber}
                </div>
              </div>

              {/* Recipient */}
              <div className="py-2 space-y-1">
                <span className="text-xs text-slate-500 italic block">Diberikan dengan apresiasi tertinggi kepada:</span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#176B4D] tracking-wide uppercase">
                  {inspectingCompany.name}
                </h2>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  {inspectingCompany.tierLabel} ({inspectingCompany.categoryAward})
                </div>
              </div>

              {/* Citation */}
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed italic">
                &ldquo;{inspectingCompany.citation}&rdquo;
              </p>

              {/* Proven Impact Badges */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Total Realisasi</span>
                  <span className="font-bold text-[#176B4D]">{formatCompactIDR(inspectingCompany.totalDonation)}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Penerima Manfaat</span>
                  <span className="font-bold text-slate-800">{inspectingCompany.beneficiariesCount.toLocaleString('id-ID')} Jiwa</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Indeks SROI</span>
                  <span className="font-bold text-amber-700">{inspectingCompany.sroiScore}x Dampak</span>
                </div>
              </div>

              {/* Signatures & QR Code */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white p-1 rounded-lg border border-slate-300 flex items-center justify-center shadow-2xs">
                    <QrCode className="w-12 h-12 text-slate-800" />
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    <span className="font-bold text-slate-700 block">DIGITALLY VERIFIED</span>
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
                  <div className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tanda Tangan Elektronik Sah</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Piagam resmi ini dapat dicetak dan dilampirkan dalam Laporan Keberlanjutan Tahunan &amp; PROPER KLHK.
              </span>

              <button
                onClick={handlePrintCertificate}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak / Unduh PDF Piagam</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
