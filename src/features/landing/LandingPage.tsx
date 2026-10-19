import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  HeartHandshake,
  Landmark,
  TreePine,
  GraduationCap,
  Store,
  Droplets,
  TrendingUp,
  FileText,
  Star,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Play,
  Award,
  Sprout,
  PhoneCall,
  Coins,
  MapPin,
  Check
} from 'lucide-react';
import { formatCompactIDR, formatNumber } from '../../lib/formatters';
import { useCSRStore } from '../../context/CSRStoreContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { funders, partners, programs, fundingRecords, beneficiaries } = useCSRStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'visi' | 'misi' | 'metode'>('visi');
  const [activeEcoStep, setActiveEcoStep] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCommitted = fundingRecords
    .filter(r => r.recordType === 'Commitment' && r.status === 'Approved (Demo)')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalDisbursed = fundingRecords
    .filter(r => r.recordType === 'Distribution' && r.status === 'Disbursed (Demo)')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalReached = beneficiaries.reduce((sum, b) => sum + b.reachedCount, 0);

  return (
    <div className="min-h-screen bg-surface-bg text-ink-primary font-sans selection:bg-[#F5CA44] selection:text-[#072418]">
      {/* Dynamic Header: Transparent initially over hero, smoothly transforms to floating pill capsule on scroll */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 sm:px-6 transition-all duration-500 ease-out">
        <div
          className={`w-full pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between rounded-full ${
            isScrolled
              ? 'max-w-6xl mt-3 py-2 px-6 bg-white/95 backdrop-blur-md shadow-elevated border border-black/5 text-ink-primary'
              : 'max-w-7xl mt-0 py-5 px-4 sm:px-6 bg-transparent border border-transparent shadow-none text-white'
          }`}
        >
          <div className="flex items-center justify-between gap-4 w-full">
            {/* Brand Logo with logo-universa.png */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/brand/logo-universa.png"
                alt="Universa"
                className={`transition-all duration-500 object-contain ${
                  isScrolled ? 'h-6 sm:h-7' : 'h-7 sm:h-8 drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]'
                }`}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-bold">
              <a
                href="#tentang"
                className={`transition-colors duration-300 py-1 ${
                  isScrolled
                    ? 'text-ink-secondary hover:text-brand-primary'
                    : 'text-white/95 hover:text-[#F5CA44] drop-shadow-xs'
                }`}
              >
                Tentang Kami
              </a>
              <a
                href="#pilar"
                className={`transition-colors duration-300 py-1 ${
                  isScrolled
                    ? 'text-ink-secondary hover:text-brand-primary'
                    : 'text-white/95 hover:text-[#F5CA44] drop-shadow-xs'
                }`}
              >
                Pilar Program CSR
              </a>
              <a
                href="#ekosistem"
                className={`transition-colors py-1 ${
                  isScrolled
                    ? 'text-ink-secondary hover:text-brand-primary'
                    : 'text-white/95 hover:text-[#F5CA44] drop-shadow-xs'
                }`}
              >
                Alur Ekosistem
              </a>
              <a
                href="#mitra"
                className={`transition-colors duration-300 py-1 ${
                  isScrolled
                    ? 'text-ink-secondary hover:text-brand-primary'
                    : 'text-white/95 hover:text-[#F5CA44] drop-shadow-xs'
                }`}
              >
                Mitra & Funder
              </a>
              <a
                href="#dampak"
                className={`transition-colors duration-300 py-1 ${
                  isScrolled
                    ? 'text-ink-secondary hover:text-brand-primary'
                    : 'text-white/95 hover:text-[#F5CA44] drop-shadow-xs'
                }`}
              >
                Laporan Dampak
              </a>
            </nav>

            {/* Right Action: Button to Dashboard */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/dashboard"
                className={`px-5 py-2.5 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all duration-500 flex items-center gap-2.5 group cursor-pointer ${
                  isScrolled
                    ? 'bg-[#176B4D] hover:bg-[#0E4F37] text-white shadow-emerald-900/10'
                    : 'bg-[#FDE047] hover:bg-[#FACC15] text-[#072418] shadow-black/20'
                }`}
              >
                <span>Masuk ke Dashboard</span>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300 ${
                    isScrolled ? 'bg-white/20' : 'bg-[#072418]'
                  }`}
                >
                  <ArrowRight
                    className={`w-3.5 h-3.5 ${isScrolled ? 'text-white' : 'text-[#FDE047]'}`}
                  />
                </div>
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors duration-300 cursor-pointer ${
                isScrolled
                  ? 'text-ink-primary hover:bg-surface-secondary'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile dropdown */}
          {mobileMenuOpen && (
            <div
              className={`lg:hidden mt-3 pt-3 pb-4 px-4 rounded-2xl border space-y-2 text-xs font-bold shadow-elevated ${
                isScrolled
                  ? 'bg-white text-ink-primary border-border-subtle'
                  : 'bg-[#0B0F0D]/95 backdrop-blur-md text-white border-white/15'
              }`}
            >
              <a
                href="#tentang"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#FDE047]"
              >
                Tentang Kami
              </a>
              <a
                href="#pilar"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#FDE047]"
              >
                Pilar Program CSR
              </a>
              <a
                href="#ekosistem"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#FDE047]"
              >
                Alur Ekosistem
              </a>
              <a
                href="#mitra"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#FDE047]"
              >
                Mitra & Funder
              </a>
              <div className="pt-2 border-t border-border-subtle/40">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-full bg-[#FDE047] text-[#072418] font-bold flex items-center justify-center gap-2"
                >
                  Masuk ke Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 3. Hero Section (Full Viewport Height, Pristine Natural Golden Sunlight, Professional Typography) */}
      <section className="relative overflow-hidden h-screen h-dvh min-h-[600px] flex items-center bg-[#0B0F0D]">
        {/* Full Photographic Background with Sunlit Nature - Zero Green Murky Tint */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_golden_hour_nature.jpg"
            alt="Konservasi Lingkungan Hidup Berkelanjutan"
            className="w-full h-full object-cover object-[70%_center] lg:object-[75%_center] scale-100 brightness-105 contrast-105"
          />
          {/* Clean neutral dark gradient on left side strictly for text legibility - NO green overlay */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[60%] bg-gradient-to-r from-black/85 via-black/45 to-transparent z-1 pointer-events-none" />
          {/* Subtle top shade for transparent navbar */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/60 to-transparent z-1 pointer-events-none" />
          {/* Subtle bottom shade for natural contrast */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/40 to-transparent z-1 pointer-events-none" />
        </div>

        {/* Hero Content Container: Elevated typography without the deleted pill badge */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full -translate-y-4 sm:-translate-y-6 lg:-translate-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Main Hero Typography - Professional, Executive & Human-Centered */}
            <div className="lg:col-span-8 space-y-5 sm:space-y-6">
              {/* Bold Executive Headline with Lighter Young Yellow Highlight */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Shape the World with <br className="hidden sm:inline" />
                <span className="text-[#FDE047] font-extrabold">Heart's Concept</span>
              </h1>

              {/* Editorial Subtitle */}
              <p className="text-sm sm:text-base text-gray-200/90 leading-relaxed max-w-xl font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                Platform orkestrasi Tanggung Jawab Sosial & Lingkungan (TJSL) terintegrasi. Menghubungkan alokasi korporasi dengan mitra pelaksana terverifikasi, penyaluran terkunci milestone, dan pelaporan siap audit PROPER KLHK.
              </p>

              {/* Action Buttons & Social Proof */}
              <div className="flex flex-wrap items-center gap-4 pt-2 sm:pt-3">
                <Link
                  to="/dashboard"
                  className="px-6 py-3.5 rounded-full bg-black/40 hover:bg-black/60 text-white text-xs sm:text-sm font-bold border border-white/25 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 group cursor-pointer"
                >
                  <span>Join Us Today</span>
                  <div className="w-7 h-7 rounded-full bg-[#FDE047] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4 text-[#072418]" />
                  </div>
                </Link>

                {/* Stacked Avatars + Beneficiaries Metric */}
                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-md">
                  <div className="flex -space-x-2.5">
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                  </div>
                  <div className="text-left">
                    <span className="font-extrabold text-white text-xs block leading-none drop-shadow-xs">12.600+ Jiwa</span>
                    <span className="text-[10px] text-[#FDE047] font-semibold drop-shadow-xs">Penerima Manfaat Riil</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Vertical Social & Pagination Accents */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <div className="flex flex-col items-center gap-4 text-white/50 text-xs">
                <span className="[writing-mode:vertical-lr] text-[10px] font-bold uppercase tracking-widest text-[#FDE047]">
                  Join Social
                </span>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="flex flex-col gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FDE047]"></span>
                  <span className="w-2 h-2 rounded-full bg-white/30"></span>
                  <span className="w-2 h-2 rounded-full bg-white/30"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 2: About Us & Methodology ("Building Greener Future Together And Protect") */}
      {/* Dirombak total dari layout kotak generik menjadi komposisi berlapis organik khas Econest */}
      <section id="tentang" className="py-20 lg:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Layered Image Composition (Bukan grid 4 kotak, melainkan kolase artistik) */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none pb-12 sm:pb-16 pr-4 sm:pr-8">
                {/* Background Dot Grid Pattern */}
                <div className="absolute bottom-4 left-0 w-36 h-36 opacity-30 pointer-events-none">
                  <svg width="100%" height="100%" fill="none">
                    <pattern id="dot-matrix" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                      <circle cx="3" cy="3" r="2" fill="#176B4D" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#dot-matrix)" />
                  </svg>
                </div>

                {/* Primary Photo: Relawan Lapangan Tersenyum */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white w-64 sm:w-80 h-80 sm:h-96 z-10">
                  <img
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=85"
                    alt="Relawan Komunitas Lingkungan"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlapping Warm Yellow Card: "29+ Years of experience" Style */}
                <div className="absolute top-2 right-2 sm:right-6 bg-[#F5CA44] p-4 sm:p-5 rounded-2xl shadow-xl border-2 border-white z-20 max-w-[170px] sm:max-w-[190px]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#072418] leading-none">100%</span>
                    <span className="text-xs font-black text-[#072418]">+</span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-[#072418] mt-1 leading-snug">
                    Akuntabel & Terverifikasi
                  </div>
                  <div className="text-[10px] text-[#072418]/70 mt-0.5 leading-tight">
                    Berita Acara & Geotagging
                  </div>
                </div>

                {/* Overlapping Dark Award Card: "2024 - We are the best award winner" Style */}
                <div className="absolute bottom-4 left-2 sm:-left-2 bg-[#072418] text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-[#F5CA44]/40 z-30 max-w-[210px] sm:max-w-[230px] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5CA44]/20 text-[#F5CA44] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[#F5CA44]" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-bold text-[#F5CA44] uppercase tracking-wider">Kesiapan PROPER</div>
                    <div className="text-xs font-black text-white leading-tight">Standar KLHK Siap Evaluasi</div>
                  </div>
                </div>

                {/* Secondary Arched Photo with Video Play Badge (Gaya Lengkung Organik Econest) */}
                <div className="absolute -bottom-8 right-0 sm:right-2 w-48 sm:w-56 h-60 sm:h-72 rounded-t-full rounded-b-3xl overflow-hidden border-4 border-white shadow-2xl z-20 group">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=85"
                    alt="Penerima Beasiswa & Komunitas Sosial"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Video Play Overlay */}
                  <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center p-3 text-center">
                    <div className="w-11 h-11 rounded-full bg-white text-[#072418] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer mb-1.5">
                      <Play className="w-4 h-4 text-[#176B4D] fill-current ml-0.5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#072418]/80 backdrop-blur-xs text-white text-[10px] font-bold">
                      Dokumentasi Nyata
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Editorial Storytelling Content */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B4D] mb-2">
                  <Sprout className="w-4 h-4 text-[#23966B]" />
                  <span>About Universa CSR Hub</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2A1E] tracking-tight leading-[1.12]">
                  Building Greener Future Together And Protect
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted font-medium mt-1">
                  Membangun ekosistem CSR korporasi yang transparan, terukur, dan berdampak jangka panjang bagi bumi dan masyarakat.
                </p>
              </div>

              {/* Sleek Pill Tab Switcher */}
              <div className="flex items-center gap-2 p-1.5 bg-[#EDF3EF] rounded-full w-fit text-xs font-bold">
                <button
                  onClick={() => setActiveTab('visi')}
                  className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                    activeTab === 'visi'
                      ? 'bg-[#176B4D] text-white shadow-xs font-extrabold'
                      : 'text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  Our Vision
                </button>
                <button
                  onClick={() => setActiveTab('misi')}
                  className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                    activeTab === 'misi'
                      ? 'bg-[#176B4D] text-white shadow-xs font-extrabold'
                      : 'text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  Our Mission
                </button>
                <button
                  onClick={() => setActiveTab('metode')}
                  className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                    activeTab === 'metode'
                      ? 'bg-[#176B4D] text-white shadow-xs font-extrabold'
                      : 'text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  Verification Method
                </button>
              </div>

              {/* Editorial Narrative Tab Card */}
              <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-[#E3EAE5] text-xs sm:text-sm text-ink-secondary leading-relaxed min-h-[90px] flex items-center shadow-2xs">
                {activeTab === 'visi' && (
                  <p>
                    Menjadi infrastruktur digital nomor satu di Indonesia yang mentransformasi dana CSR korporasi dari sekadar bantuan seremonial sporadis menjadi <strong>investasi sosial terukur</strong> dengan akuntabilitas per rupiah yang dapat dipertanggungjawabkan kepada publik, manajemen, dan regulator.
                  </p>
                )}
                {activeTab === 'misi' && (
                  <p>
                    1. Mengeliminasi proposal fiktif lewat kurasi ketat legalitas mitra.<br />
                    2. Mengunci pencairan dana bertahap berdasarkan milestone dan bukti Berita Acara (BAST).<br />
                    3. Menyediakan format pelaporan siap pakai untuk evaluasi <strong>PROPER KLHK</strong>.
                  </p>
                )}
                {activeTab === 'metode' && (
                  <p>
                    Menerapkan pemisahan tegas antara <strong>Penerima Manfaat Unik</strong> (melalui verifikasi NIB/KTP terenkripsi) dan <strong>Partisipasi Acara</strong>, menjamin tidak ada pembengkakan angka penerima manfaat.
                  </p>
                )}
              </div>

              {/* Three Structured Feature Rows (Bukan checklist kotak generik) */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-[#E3EAE5] hover:border-[#176B4D] transition-colors shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#176B4D] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-[#23966B]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B2A1E]">Penyaluran Bertahap Terkunci Berita Acara (BAST)</div>
                    <div className="text-[11px] text-ink-muted mt-0.5 leading-snug">
                      Dana dialokasikan bertahap hanya setelah milestone diverifikasi oleh operator platform.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-[#E3EAE5] hover:border-[#176B4D] transition-colors shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B2A1E]">Monitoring Geotagging & Bukti Foto Otentik</div>
                    <div className="text-[11px] text-ink-muted mt-0.5 leading-snug">
                      Setiap bibit mangrove dan bantuan UMKM memiliki dokumentasi berkoordinat presisi.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-[#E3EAE5] hover:border-[#176B4D] transition-colors shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B2A1E]">Format Laporan Kesiapan PROPER KLHK</div>
                    <div className="text-[11px] text-ink-muted mt-0.5 leading-snug">
                      Tersinkronisasi dengan kriteria penilaian lingkungan & sosial Kementerian LHK.
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action & Trustpilot-style Rating (Matching Econest Reference) */}
              <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-[#E3EAE5]">
                <Link
                  to="/dashboard"
                  className="px-6 py-3.5 rounded-full bg-[#F5CA44] hover:bg-[#F3C22B] text-[#072418] text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 group cursor-pointer"
                >
                  <span>Explore More</span>
                  <div className="w-6 h-6 rounded-full bg-[#072418] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-[#F5CA44]" />
                  </div>
                </Link>

                <div className="flex items-center gap-3">
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-current text-[#F5CA44]" />
                    <Star className="w-4 h-4 fill-current text-[#F5CA44]" />
                    <Star className="w-4 h-4 fill-current text-[#F5CA44]" />
                    <Star className="w-4 h-4 fill-current text-[#F5CA44]" />
                    <Star className="w-4 h-4 fill-current text-[#F5CA44]" />
                  </div>
                  <div className="text-xs">
                    <div className="font-black text-[#0B2A1E]">Trust Score 4.9/5.0</div>
                    <div className="text-[10px] text-ink-muted font-medium">Berdasarkan Audit Eksternal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4 Key Numbers Bar (Seperti di referensi Econest: 98%, 565+, 36k, 100+ dengan Icon Lingkaran) */}
      <section className="bg-white border-y border-[#E3EAE5] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1: 98% */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full border border-emerald-300 bg-emerald-50/70 flex items-center justify-center text-[#176B4D] shadow-2xs">
                <TrendingUp className="w-6 h-6 text-[#176B4D]" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#0B2A1E] tracking-tight">
                98%
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B2A1E]">Tingkat Kepatuhan Program</div>
                <div className="text-[11px] text-ink-muted mt-0.5">Sesuai Indikator ESG Terukur</div>
              </div>
            </div>

            {/* Stat 2: Total Komitmen */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full border border-amber-300 bg-amber-50/70 flex items-center justify-center text-amber-700 shadow-2xs">
                <Coins className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#176B4D] tracking-tight">
                {formatCompactIDR(totalCommitted)}
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B2A1E]">Komitmen Dana CSR</div>
                <div className="text-[11px] text-ink-muted mt-0.5">Alokasi Resmi Korporasi Mitra</div>
              </div>
            </div>

            {/* Stat 3: Penerima Manfaat */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full border border-emerald-300 bg-emerald-50/70 flex items-center justify-center text-[#176B4D] shadow-2xs">
                <Users className="w-6 h-6 text-[#176B4D]" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#0B2A1E] tracking-tight">
                {formatNumber(totalReached)}+
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B2A1E]">Penerima Manfaat Riil</div>
                <div className="text-[11px] text-ink-muted mt-0.5">Pelajar, Kelompok Tani & UMKM</div>
              </div>
            </div>

            {/* Stat 4: Bebas Manipulasi */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full border border-blue-300 bg-blue-50/70 flex items-center justify-center text-blue-700 shadow-2xs">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-blue-700 tracking-tight">
                100%
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B2A1E]">Bebas Manipulasi Ganda</div>
                <div className="text-[11px] text-ink-muted mt-0.5">Metodologi Hitung NIK/NIB Unik</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Services & 4 Core CSR Program Pillars ("We Offer Different Services For Helped You") */}
      <section id="pilar" className="pt-24 pb-20 lg:pb-28 bg-[#072418] text-white relative">
        {/* Top Torn Paper Transition from White Section */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none -translate-y-[98%]">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-8 sm:h-12 lg:h-14 text-[#072418] fill-current"
            preserveAspectRatio="none"
          >
            <path d="M0,60 L1440,60 L1440,32 C1380,18 1340,46 1280,24 C1220,2 1180,44 1120,22 C1060,-2 1010,42 960,24 C900,6 860,48 800,28 C740,6 700,44 640,20 C580,-4 530,50 480,28 C420,4 380,46 320,24 C260,2 210,48 160,30 C100,12 60,46 0,26 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[#F5CA44] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Sprout className="w-4 h-4 text-[#F5CA44]" /> What We Do • Pilar Program CSR
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                We Offer Different Services <br className="hidden sm:inline" />
                For Helped You
              </h2>
            </div>
            <div className="space-y-2 md:text-right">
              <p className="text-xs sm:text-sm text-emerald-100/70 max-w-md leading-relaxed">
                Advanced solutions, fast performance, and high quality CSR orchestration.
              </p>
              <Link
                to="/dashboard/programs"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#F5CA44] hover:text-amber-200 transition-colors"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Cards Grid with Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Lingkungan & Reboisasi */}
            <div className="bg-emerald-950/70 border border-emerald-800/60 rounded-3xl overflow-hidden hover:border-emerald-500 transition-all flex flex-col justify-between group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80"
                  alt="Reboisasi Mangrove"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#072418]/80 text-[#F5CA44] border border-[#F5CA44]/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  No - 01 • Lingkungan
                </span>
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                    Reboisasi & Perlindungan Pesisir
                  </h3>
                  <p className="text-xs text-emerald-100/70 mt-1 leading-relaxed">
                    Restorasi 50.000 bibit mangrove dan rehabilitasi gambut untuk menahan abrasi serta menurunkan emisi karbon.
                  </p>
                </div>
                <div className="pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-300 font-bold">
                  <span>3 Program Aktif</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 2: Pendidikan & Beasiswa */}
            <div className="bg-emerald-950/70 border border-emerald-800/60 rounded-3xl overflow-hidden hover:border-emerald-500 transition-all flex flex-col justify-between group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80"
                  alt="Beasiswa & Coding Camp"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#072418]/80 text-[#F5CA44] border border-[#F5CA44]/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  No - 02 • Pendidikan
                </span>
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                    Beasiswa Talenta & Coding Vokasi
                  </h3>
                  <p className="text-xs text-emerald-100/70 mt-1 leading-relaxed">
                    Bantuan biaya kuliah dan pelatihan intensif software engineering untuk pemuda prasejahtera dan disabilitas.
                  </p>
                </div>
                <div className="pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-300 font-bold">
                  <span>2 Program Aktif</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 3: Pemberdayaan UMKM */}
            <div className="bg-emerald-950/70 border border-emerald-800/60 rounded-3xl overflow-hidden hover:border-emerald-500 transition-all flex flex-col justify-between group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=600&auto=format&fit=crop&q=80"
                  alt="Pemberdayaan UMKM"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#072418]/80 text-[#F5CA44] border border-[#F5CA44]/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  No - 03 • Ekonomi UMKM
                </span>
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                    Inkubasi & Halal UMKM Kuliner
                  </h3>
                  <p className="text-xs text-emerald-100/70 mt-1 leading-relaxed">
                    Fasilitasi sertifikasi halal, standarisasi kemasan BPOM, dan digitalisasi pencatatan omzet bagi 250 usaha mikro.
                  </p>
                </div>
                <div className="pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-300 font-bold">
                  <span>2 Program Aktif</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 4: Infrastruktur Air Bersih & Kesehatan */}
            <div className="bg-emerald-950/70 border border-emerald-800/60 rounded-3xl overflow-hidden hover:border-emerald-500 transition-all flex flex-col justify-between group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186156a?w=600&auto=format&fit=crop&q=80"
                  alt="Infrastruktur Air Bersih"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#072418]/80 text-[#F5CA44] border border-[#F5CA44]/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  No - 04 • Air & Sanitasi
                </span>
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                    Pompa Tenaga Surya & Pipanisasi
                  </h3>
                  <p className="text-xs text-emerald-100/70 mt-1 leading-relaxed">
                    Penyediaan air minum higienis bebas emisi untuk 1.800 warga di desa karst langganan kekeringan Gunungkidul.
                  </p>
                </div>
                <div className="pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-300 font-bold">
                  <span>1 Program Aktif</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Ecosystem Interactive Flow Section ("Bagaimana Cara Kerja Universa CSR Hub?") */}
      <section id="ekosistem" className="py-24 lg:py-32 bg-[#F8FAF7] relative overflow-hidden">
        {/* Subtle decorative organic background accents */}
        <div className="absolute top-12 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 left-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Editorial Split Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-16">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[#176B4D] text-xs font-extrabold uppercase tracking-wider">
                <Sprout className="w-4 h-4 text-[#176B4D]" />
                <span>Siklus Tata Kelola 4 Pemangku Kepentingan</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#072418] tracking-tight leading-[1.12]">
                Bagaimana Cara Kerja <br className="hidden sm:inline" />
                <span className="text-[#176B4D]">Universa CSR Hub?</span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 max-w-md lg:text-right">
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Dari alokasi pendanaan awal hingga pelaporan formal ke regulator pemerintah, seluruh proses berjalan terpadu dalam satu alur hidup tanpa dokumen kertas yang tercecer.
              </p>
              <Link
                to="/dashboard/ecosystem"
                className="inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-[#072418] hover:bg-[#176B4D] text-white text-xs font-bold shadow-lg transition-all duration-300 group shrink-0"
              >
                <span>Buka Diagram Ekosistem Interaktif</span>
                <span className="w-7 h-7 rounded-full bg-[#FDE047] text-[#072418] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* Interactive Asymmetric Split Showcase: Left Visual Collage & Live Artifact + Right Connected Pipeline */}
          {(() => {
            const ecoSteps = [
              {
                step: '01',
                title: 'Komitmen & Alokasi Funder',
                actor: 'Corporate Funder',
                badge: 'Pencatatan Inflow Resmi',
                desc: 'Perusahaan menetapkan pilar sasaran TJSL dan mencatatkan alokasi komitmen dana tahunan secara transparan ke dalam buku besar.',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=85',
                imageCaption: 'Komite ESG & Direksi Korporasi menetapkan pagu anggaran tahunan.',
                liveMetricLabel: 'Total Komitmen Terkunci',
                liveMetricValue: formatCompactIDR(totalCommitted),
                liveSubtext: `${funders.length} Perusahaan Mitra Aktif`,
                highlights: [
                  'Penetapan Pagu per Pilar SDGs & PROPER',
                  'Kontrak Komitmen Tahunan Terverifikasi',
                  'Saldo Alokasi Real-Time & Anti-Overbudget'
                ],
                linkTo: '/dashboard/funding',
                linkLabel: 'Inspeksi Buku Besar Funding',
                icon: Coins
              },
              {
                step: '02',
                title: 'Kurasi & Verifikasi Proposal',
                actor: 'Mitra Pelaksana (NGO / Yayasan)',
                badge: 'Seleksi Bebas Fiktif',
                desc: 'Mitra mengajukan usulan kegiatan lapangan, dikurasi kelayakan RAB serta legalitasnya, lalu dikonversi otomatis menjadi Program aktif.',
                image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=85',
                imageCaption: 'Tim Kurator & Mitra Yayasan membedah kelayakan teknis program.',
                liveMetricLabel: 'Program Terkurasi Aktif',
                liveMetricValue: `${programs.length} Program`,
                liveSubtext: `${partners.length} Lembaga Pelaksana Terverifikasi`,
                highlights: [
                  'Due Diligence Legalitas & Rekam Jejak Mitra',
                  'Validasi Indikator Target Penerima Manfaat',
                  'Konversi 1-Klik dari Proposal ke Program'
                ],
                linkTo: '/dashboard/proposals',
                linkLabel: 'Lihat Pipeline Proposal',
                icon: HeartHandshake
              },
              {
                step: '03',
                title: 'Salur Bertahap per Milestone',
                actor: 'Validator & Tim Lapangan',
                badge: 'Audit Trail Transparan',
                desc: 'Penyaluran dana tidak dilepas sekaligus, melainkan dikunci per termin milestone dengan validasi sisa saldo dan Berita Acara (BAST).',
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&auto=format&fit=crop&q=85',
                imageCaption: 'Verifikasi fisik di titik lokasi sebelum pencairan termin berikutnya.',
                liveMetricLabel: 'Dana Tersalurkan via BAST',
                liveMetricValue: formatCompactIDR(totalDisbursed),
                liveSubtext: '100% Pencairan Terikat Bukti Fisik',
                highlights: [
                  'Kunci Pencairan Bertahap (Termin 1, 2, Final)',
                  'Wajib Unggah Bukti Foto Geotagging & BAST',
                  'Proteksi Otomatis dari Penyaluran Melebihi Pagu'
                ],
                linkTo: '/dashboard/programs',
                linkLabel: 'Cek Milestone Program',
                icon: ShieldCheck
              },
              {
                step: '04',
                title: 'Laporan Dampak & Kepatuhan PROPER',
                actor: 'Regulator KLHK & Publik',
                badge: 'Kepatuhan Pemerintah',
                desc: 'Seluruh jejak transaksi dan penerima manfaat unik dirangkum otomatis menjadi CSR Annual Report dan draf evaluasi PROPER KLHK.',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=85',
                imageCaption: 'Ringkasan audit eksekutif siap cetak untuk pelaporan regulator.',
                liveMetricLabel: 'Penerima Manfaat Terverifikasi',
                liveMetricValue: `${formatNumber(totalReached)}+ Jiwa`,
                liveSubtext: 'Bebas Klaim Ganda (NIK / NIB Unik)',
                highlights: [
                  'Ekspor Draf Evaluasi PROPER KLHK & SDGs',
                  'Metodologi Deduping Penerima Manfaat Riil',
                  'Rekam Jejak Siap Audit Eksternal Kapan Saja'
                ],
                linkTo: '/dashboard/reports',
                linkLabel: 'Buka Generator Laporan PROPER',
                icon: Award
              }
            ];

            const current = ecoSteps[activeEcoStep] || ecoSteps[0];
            const CurrentIcon = current.icon;

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
                {/* Left Column (5 cols): Dynamic Visual Collage & Live System Card */}
                <div className="lg:col-span-5 flex flex-col justify-between relative">
                  {/* Decorative Dot Pattern Behind Image */}
                  <div className="absolute -top-5 -left-5 w-32 h-32 opacity-35 pointer-events-none hidden sm:block">
                    <svg width="100%" height="100%" fill="none">
                      <pattern id="eco-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                        <circle cx="2.5" cy="2.5" r="2" fill="#176B4D" />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#eco-dots)" />
                    </svg>
                  </div>

                  {/* Main Layered Visual Frame */}
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-[#072418] h-full min-h-[460px] sm:min-h-[520px] flex flex-col justify-between group">
                    {/* Background Step Photo */}
                    <img
                      key={current.image}
                      src={current.image}
                      alt={current.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-all duration-700"
                    />
                    {/* Multi-stop dark gradient overlay for rich contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#072418] via-[#072418]/65 to-black/30" />

                    {/* Top Floating Bar inside Visual Frame */}
                    <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#FDE047] animate-pulse" />
                        Tahap {current.step} dari 04
                      </span>

                      <span className="px-3.5 py-1.5 rounded-full bg-[#FDE047] text-[#072418] text-[11px] font-extrabold tracking-wide shadow-md">
                        {current.actor}
                      </span>
                    </div>

                    {/* Bottom Live System Simulation Card inside Visual Frame */}
                    <div className="relative z-10 p-5 sm:p-6 mt-auto space-y-4">
                      {/* Live Metric Glass Box */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold">
                            {current.liveMetricLabel}
                          </div>
                          <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                            {current.liveMetricValue}
                          </div>
                          <div className="text-[11px] text-[#FDE047] font-semibold mt-0.5">
                            {current.liveSubtext}
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-[#FDE047] text-[#072418] flex items-center justify-center shrink-0 shadow-lg">
                          <CurrentIcon className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Verification Checklist */}
                      <div className="space-y-2 pt-1">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                          Standar Kendali Sistem:
                        </div>
                        {current.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-xs text-white/95 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#FDE047] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Direct Module Link Footer */}
                      <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-white/70 italic line-clamp-1">
                          {current.imageCaption}
                        </span>
                        <Link
                          to={current.linkTo}
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FDE047] hover:underline shrink-0"
                        >
                          <span>{current.linkLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (7 cols): Interactive Connected Workflow Cards */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4 relative">
                  {/* Vertical connecting line on desktop */}
                  <div className="hidden sm:block absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#176B4D] via-emerald-300 to-[#072418]/20 pointer-events-none" />

                  {ecoSteps.map((item, idx) => {
                    const StepIcon = item.icon;
                    const isActive = activeEcoStep === idx;

                    return (
                      <div
                        key={item.step}
                        onClick={() => setActiveEcoStep(idx)}
                        onMouseEnter={() => setActiveEcoStep(idx)}
                        className={`relative sm:pl-16 transition-all duration-300 cursor-pointer group`}
                      >
                        {/* Timeline Step Node Circle (Desktop) */}
                        <div
                          className={`hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl items-center justify-center font-black text-sm transition-all duration-300 z-10 border-2 ${
                            isActive
                              ? 'bg-[#072418] text-[#FDE047] border-[#FDE047] shadow-lg scale-105'
                              : 'bg-white text-ink-secondary border-border-subtle group-hover:border-[#176B4D] group-hover:text-[#176B4D]'
                          }`}
                        >
                          {item.step}
                        </div>

                        {/* Interactive Step Card */}
                        <div
                          className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 ${
                            isActive
                              ? 'bg-white border-[#176B4D] shadow-xl ring-2 ring-[#176B4D]/10 -translate-y-0.5'
                              : 'bg-white/80 hover:bg-white border-border-subtle/80 shadow-xs hover:shadow-md'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2.5">
                              {/* Mobile step badge */}
                              <span
                                className={`sm:hidden w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                                  isActive
                                    ? 'bg-[#072418] text-[#FDE047]'
                                    : 'bg-surface-secondary text-ink-secondary'
                                }`}
                              >
                                {item.step}
                              </span>
                              <span
                                className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                                  isActive
                                    ? 'bg-[#072418] text-[#FDE047] border-[#072418]'
                                    : 'bg-surface-secondary text-ink-secondary border-border-subtle'
                                }`}
                              >
                                {item.actor}
                              </span>
                              <span className="text-[11px] font-bold text-[#176B4D] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                                {item.badge}
                              </span>
                            </div>

                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                                isActive
                                  ? 'bg-emerald-50 text-[#176B4D]'
                                  : 'bg-surface-secondary/70 text-ink-muted group-hover:text-[#176B4D]'
                              }`}
                            >
                              <StepIcon className="w-4 h-4" />
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1 pr-2">
                              <h3
                                className={`font-extrabold text-base sm:text-lg transition-colors ${
                                  isActive ? 'text-[#072418]' : 'text-ink-primary group-hover:text-[#176B4D]'
                                }`}
                              >
                                {item.title}
                              </h3>
                              <p className="text-xs text-ink-secondary leading-relaxed">
                                {item.desc}
                              </p>
                            </div>

                            <Link
                              to={item.linkTo}
                              onClick={(e) => e.stopPropagation()}
                              className={`inline-flex items-center gap-1.5 text-xs font-extrabold shrink-0 px-3.5 py-2 rounded-xl transition-all ${
                                isActive
                                  ? 'bg-[#FDE047] text-[#072418] shadow-xs hover:bg-[#facc15]'
                                  : 'bg-surface-secondary text-ink-secondary hover:bg-emerald-50 hover:text-[#176B4D]'
                              }`}
                            >
                              <span>Buka Modul</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 8. Corporate Funders & Partners Brand Showcase */}
      <section id="mitra" className="py-16 bg-surface-card border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <span className="text-ink-muted text-xs font-bold uppercase tracking-wider block mb-1">
              Jejaring Kemitraan Strategis
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-ink-primary">
              Dipercaya oleh Perusahaan dan Lembaga Sosial Terkemuka
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
            {funders.map((funder) => (
              <div
                key={funder.id}
                className="p-4 rounded-2xl bg-surface-secondary/70 border border-border-subtle hover:border-brand-emerald transition-all text-center"
              >
                <div className="font-extrabold text-sm text-ink-primary">{funder.code}</div>
                <div className="text-[11px] text-ink-muted truncate mt-0.5">{funder.name}</div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-brand-mint text-brand-primary font-bold mt-2 inline-block">
                  Corporate Funder
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 & 10. Executive Pre-Footer Banner & Architectural Footer */}
      <footer className="bg-[#072418] text-white relative overflow-hidden pt-16 sm:pt-20 pb-10">
        {/* Ambient Decorative Background Accents */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#FDE047]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Integrated Executive CTA Card (Inspired by Econest Bottom Callout Banner) */}
          <div className="relative rounded-[2rem] bg-gradient-to-r from-[#114632] via-[#0D3828] to-[#092B1E] border border-emerald-700/60 p-7 sm:p-10 lg:p-12 shadow-2xl overflow-hidden mb-14 sm:mb-16">
            {/* Subtle dot pattern on right side */}
            <div className="absolute right-0 top-0 bottom-0 w-72 opacity-15 pointer-events-none">
              <svg width="100%" height="100%" fill="none">
                <pattern id="footer-cta-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="2" fill="#FDE047" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#footer-cta-dots)" />
              </svg>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-3 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#FDE047] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
                  <span>Akses Langsung ke Sistem Orkestrasi</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Siap Membangun Tata Kelola CSR yang <span className="text-[#FDE047]">Transparan & Terukur?</span>
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
                  Masuk ke dalam dashboard untuk menguji simulasi alokasi dana korporasi, meninjau proposal mitra, memvalidasi bukti geotagging BAST, dan mengekspor laporan PROPER KLHK.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-wrap lg:justify-end items-center gap-3.5">
                <Link
                  to="/dashboard"
                  className="pl-6 pr-2.5 py-2.5 rounded-full bg-[#FDE047] hover:bg-[#facc15] text-[#072418] text-xs sm:text-sm font-extrabold shadow-xl hover:scale-[1.02] transition-all flex items-center gap-3 group cursor-pointer"
                >
                  <span>Masuk ke Dashboard</span>
                  <span className="w-8 h-8 rounded-full bg-[#072418] text-[#FDE047] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>

                <Link
                  to="/dashboard/reports"
                  className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-bold transition-all"
                >
                  Lihat Draf PROPER
                </Link>
              </div>
            </div>
          </div>

          {/* Main 4-Column Architectural Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
            {/* Column 1 (4 cols): Clean Brand Logo (without CSR HUB pill) & Mission */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <Link
                  to="/"
                  className="inline-flex items-center bg-white px-4 py-2.5 rounded-2xl shadow-md hover:scale-[1.02] transition-transform"
                >
                  <img
                    src="/brand/logo-universa.png"
                    alt="Universa"
                    className="h-6 sm:h-7 object-contain"
                  />
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed max-w-sm">
                Infrastruktur digital orkestrasi program Tanggung Jawab Sosial dan Lingkungan Perseroan (TJSL) terintegrasi di Indonesia. Menjamin akuntabilitas dari pencatatan komitmen hingga bukti lapangan.
              </p>

              {/* Compliance & Framework Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FDE047]" />
                  UU PT No. 40/2007
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FDE047]" />
                  PROPER KLHK
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FDE047]" />
                  SDGs Bappenas
                </span>
              </div>
            </div>

            {/* Column 2 (2 cols): Eksplorasi Halaman */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-[#FDE047]" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Eksplorasi
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs text-emerald-100/75 font-medium">
                <li>
                  <a href="#tentang" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Tentang Kami</span>
                  </a>
                </li>
                <li>
                  <a href="#pilar" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Pilar Program CSR</span>
                  </a>
                </li>
                <li>
                  <a href="#ekosistem" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Alur Ekosistem</span>
                  </a>
                </li>
                <li>
                  <a href="#mitra" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Mitra & Funder</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 (3 cols): Modul Orkestrasi & Tata Kelola */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-[#FDE047]" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Modul Tata Kelola
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs text-emerald-100/75 font-medium">
                <li>
                  <Link to="/dashboard" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Dashboard Eksekutif Utama</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/programs" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Direktori & Milestone Program</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/proposals" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Pipeline Kurasi Proposal</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/funding" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Buku Besar Alokasi & Salur</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/reports" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Generator Laporan PROPER</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/ecosystem" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Diagram Alur Ekosistem</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 (3 cols): Live Status & Environment Card */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-[#FDE047]" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Status Lingkungan Sistem
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Sistem Berjalan Normal
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#FDE047]/20 text-[#FDE047]">
                    MVP Demo
                  </span>
                </div>

                <p className="text-[11px] text-emerald-100/70 leading-relaxed">
                  Seluruh data komitmen, pencairan milestone, dan penerima manfaat terhubung secara real-time di penyimpanan lokal peramban Anda.
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-200/80 font-medium">
                    {funders.length} Funder • {programs.length} Program
                  </span>
                  <Link
                    to="/dashboard/settings"
                    className="font-bold text-[#FDE047] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Reset Data</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Legal Bar */}
          <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/60">
            <p>© 2026 Universa. Seluruh hak cipta dilindungi.</p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FDE047]" />
                <span>Audit Trail Terkunci BAST</span>
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <Link
                to="/dashboard/settings"
                className="hover:text-[#FDE047] text-emerald-100/80 font-semibold transition-colors"
              >
                Pengaturan Demo & Reset
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
