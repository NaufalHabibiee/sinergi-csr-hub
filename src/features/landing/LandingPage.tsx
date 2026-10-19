import React, { useState } from 'react';
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

  const totalCommitted = fundingRecords
    .filter(r => r.recordType === 'Commitment' && r.status === 'Approved (Demo)')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalDisbursed = fundingRecords
    .filter(r => r.recordType === 'Distribution' && r.status === 'Disbursed (Demo)')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalReached = beneficiaries.reduce((sum, b) => sum + b.reachedCount, 0);

  return (
    <div className="min-h-screen bg-surface-bg text-ink-primary font-sans selection:bg-[#F5CA44] selection:text-[#072418]">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#072418] text-emerald-200 px-4 py-2 text-xs border-b border-emerald-900/60 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F5CA44]/20 text-[#F5CA44] font-bold text-[10px] uppercase tracking-wider">
              <Sprout className="w-3 h-3 text-[#F5CA44]" /> CSR Movement
            </span>
            <span className="text-emerald-100/90 hidden sm:inline">
              Universa CSR Hub: Solusi Tata Kelola Digital Tanggung Jawab Sosial & Kesiapan PROPER KLHK
            </span>
            <span className="text-emerald-100/90 sm:hidden">
              Universa CSR Hub — Tata Kelola CSR Digital
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-300/80 font-medium hidden md:inline">Mode Prototipe MVP</span>
            <Link
              to="/dashboard"
              className="text-[#F5CA44] hover:text-amber-200 font-bold underline flex items-center gap-1 transition-colors"
            >
              Masuk Dashboard <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Over Hero) */}
      <header className="relative z-30 bg-[#072418]/85 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-[#F5CA44] flex items-center justify-center text-[#072418] shadow-sm font-black text-xl tracking-wider group-hover:scale-105 transition-transform">
              U
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white leading-tight flex items-center gap-1.5">
                UNIVERSA
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#F5CA44]/20 text-[#F5CA44] border border-[#F5CA44]/30">
                  CSR HUB
                </span>
              </span>
              <span className="text-[11px] font-medium text-emerald-200/70 tracking-wide">
                Social Governance & Impact Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-emerald-100/80">
            <a href="#tentang" className="hover:text-[#F5CA44] transition-colors">Tentang Kami</a>
            <a href="#pilar" className="hover:text-[#F5CA44] transition-colors">Pilar Program CSR</a>
            <a href="#ekosistem" className="hover:text-[#F5CA44] transition-colors">Alur Ekosistem</a>
            <a href="#mitra" className="hover:text-[#F5CA44] transition-colors">Mitra & Funder</a>
            <a href="#dampak" className="hover:text-[#F5CA44] transition-colors">Laporan Dampak</a>
          </nav>

          {/* Right Action: Contact info + Warm Gold Pill Button */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-2.5 text-xs text-emerald-100/70 border-r border-white/10 pr-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#F5CA44]">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] text-emerald-300/80">Konsultasi CSR:</div>
                <div className="font-bold text-white text-[11px]">+62 21 555-0129</div>
              </div>
            </div>

            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-full bg-[#F5CA44] hover:bg-[#F3C22B] text-[#072418] text-xs font-black shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 group cursor-pointer"
            >
              <span>Explore More</span>
              <div className="w-6 h-6 rounded-full bg-[#072418] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-[#F5CA44]" />
              </div>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-6 bg-[#072418] border-b border-white/10 space-y-3 text-xs font-bold text-white">
            <a
              href="#tentang"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-emerald-100 hover:text-[#F5CA44]"
            >
              Tentang Kami
            </a>
            <a
              href="#pilar"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-emerald-100 hover:text-[#F5CA44]"
            >
              Pilar Program CSR
            </a>
            <a
              href="#ekosistem"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-emerald-100 hover:text-[#F5CA44]"
            >
              Alur Ekosistem
            </a>
            <a
              href="#mitra"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-emerald-100 hover:text-[#F5CA44]"
            >
              Mitra & Funder
            </a>
            <div className="pt-2 border-t border-white/10">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-full bg-[#F5CA44] text-[#072418] font-black flex items-center justify-center gap-2"
              >
                Masuk ke Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 3. Hero Section (Inspirasi Persis Econest: Full Photographic Cover, Warm Tone, Dual-Color Font, Torn Edge) */}
      <section className="relative overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center bg-[#072418]">
        {/* Full Photographic Background with People & Nature */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=2000&auto=format&fit=crop&q=85"
            alt="Relawan Konservasi dan Lingkungan Sosial"
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-10000"
          />
          {/* Multi-stop Left Dark Vignette Gradient so Text Stands Out */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#051A11] via-[#072418]/85 to-[#072418]/30 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#072418] via-transparent to-[#072418]/50" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Main Hero Typography */}
            <div className="lg:col-span-8 space-y-6">
              {/* Top Leaf Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#F5CA44] text-xs font-bold shadow-sm">
                <Sprout className="w-4 h-4 text-[#F5CA44]" />
                <span>Let's Save the Environment & Society</span>
              </div>

              {/* Bold Headline (Econest Style: White + Golden Yellow) */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-sm">
                Shape the World with <br className="hidden sm:inline" />
                <span className="text-[#F5CA44]">Heart's Concept</span>
              </h1>

              {/* Editorial Subtitle */}
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl font-normal drop-shadow-xs">
                Platform orkestrasi Tanggung Jawab Sosial & Lingkungan (TJSL) terintegrasi. Menghubungkan alokasi korporasi dengan mitra pelaksana terverifikasi, penyaluran terkunci milestone, dan pelaporan siap audit PROPER KLHK.
              </p>

              {/* Action Buttons & Social Proof */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  to="/dashboard"
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black border border-white/20 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 group cursor-pointer"
                >
                  <span>Join Us Today</span>
                  <div className="w-7 h-7 rounded-full bg-[#F5CA44] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4 text-[#072418]" />
                  </div>
                </Link>

                {/* Stacked Avatars + Beneficiaries Metric */}
                <div className="flex items-center gap-3 bg-[#072418]/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-md">
                  <div className="flex -space-x-2.5">
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                  </div>
                  <div className="text-left">
                    <span className="font-extrabold text-white text-xs block leading-none">12.600+ Jiwa</span>
                    <span className="text-[10px] text-[#F5CA44] font-medium">Penerima Manfaat Riil</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Vertical Social & Pagination Accents */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <div className="flex flex-col items-center gap-4 text-white/50 text-xs">
                <span className="[writing-mode:vertical-lr] text-[10px] font-bold uppercase tracking-widest text-[#F5CA44]">
                  Join Social
                </span>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="flex flex-col gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F5CA44]"></span>
                  <span className="w-2 h-2 rounded-full bg-white/30"></span>
                  <span className="w-2 h-2 rounded-full bg-white/30"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jagged Torn Paper / Painterly Edge Mask at bottom of Hero */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <svg
            viewBox="0 0 1440 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10 sm:h-14 lg:h-16 text-white fill-current"
            preserveAspectRatio="none"
          >
            <path d="M0,70 L1440,70 L1440,28 C1380,44 1340,14 1280,36 C1220,58 1180,16 1120,38 C1060,62 1010,18 960,36 C900,54 860,12 800,32 C740,54 700,16 640,40 C580,64 530,10 480,32 C420,56 380,14 320,36 C260,58 210,12 160,30 C100,48 60,14 0,34 Z" />
          </svg>
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
      <section id="ekosistem" className="py-20 lg:py-28 bg-surface-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-14">
          <span className="text-brand-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-mint border border-emerald-200 inline-block">
            Siklus Tata Kelola 4 Pemangku Kepentingan
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-ink-primary tracking-tight">
            Bagaimana Cara Kerja Universa CSR Hub?
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted max-w-2xl mx-auto leading-relaxed">
            Dari alokasi pendanaan awal hingga pelaporan formal ke regulator pemerintah, seluruh proses berjalan terpadu tanpa dokumen kertas yang tercecer.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-surface-card p-6 rounded-3xl border border-border-subtle shadow-card text-left space-y-3 relative group hover:border-brand-emerald transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-brand-primary flex items-center justify-center font-extrabold text-lg">
                1
              </div>
              <h3 className="font-bold text-base text-ink-primary">1. Komitmen Funder</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Corporate Funder menetapkan pilar sasaran CSR dan mencatatkan alokasi komitmen dana tahunan.
              </p>
              <div className="text-[11px] text-brand-primary font-bold pt-2 border-t border-border-subtle">
                Pencatatan Inflow Resmi
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-card p-6 rounded-3xl border border-border-subtle shadow-card text-left space-y-3 relative group hover:border-brand-emerald transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-extrabold text-lg">
                2
              </div>
              <h3 className="font-bold text-base text-ink-primary">2. Kurasi Proposal</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Mitra mengajukan usulan kegiatan, dikurasi kelayakan anggarannya, dan dikonversi ke Program aktif.
              </p>
              <div className="text-[11px] text-teal-700 font-bold pt-2 border-t border-border-subtle">
                Seleksi Bebas Fiktif
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-card p-6 rounded-3xl border border-border-subtle shadow-card text-left space-y-3 relative group hover:border-brand-emerald transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-lg">
                3
              </div>
              <h3 className="font-bold text-base text-ink-primary">3. Salur per Milestone</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Penyaluran bertahap dikunci dengan validasi sisa saldo dan bukti Berita Acara Serah Terima (BAST).
              </p>
              <div className="text-[11px] text-amber-700 font-bold pt-2 border-t border-border-subtle">
                Audit Trail Transparan
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-surface-card p-6 rounded-3xl border border-border-subtle shadow-card text-left space-y-3 relative group hover:border-brand-emerald transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-extrabold text-lg">
                4
              </div>
              <h3 className="font-bold text-base text-ink-primary">4. Laporan Dampak</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Sistem menghasilkan CSR Annual Report untuk korporasi dan format draf evaluasi PROPER KLHK.
              </p>
              <div className="text-[11px] text-blue-700 font-bold pt-2 border-t border-border-subtle">
                Kepatuhan Pemerintah
              </div>
            </div>
          </div>

          {/* Quick link button to ecosystem map in dashboard */}
          <div className="mt-10 text-center">
            <Link
              to="/dashboard/ecosystem"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-card hover:bg-surface-secondary text-brand-primary border border-emerald-300 font-bold text-xs shadow-2xs transition-colors"
            >
              Buka Diagram Ekosistem Interaktif di Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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

      {/* 9. Big Bottom CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-brand-primary via-emerald-900 to-brand-dark text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold backdrop-blur-xs border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            Akses Langsung ke Sistem
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Siap Membangun Tata Kelola CSR yang Transparan & Terukur?
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            Masuk ke dalam dashboard Universa CSR Hub untuk menguji simulasi alokasi dana, meninjau proposal mitra, memvalidasi bukti geotagging, dan mengekspor laporan kepatuhan PROPER.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-4 rounded-2xl bg-white text-brand-primary hover:bg-emerald-50 text-xs sm:text-sm font-extrabold shadow-elevated hover:scale-105 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Masuk ke Dashboard Universa CSR Hub</span>
              <ArrowRight className="w-4 h-4 text-brand-emerald group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-surface-card border-t border-border-subtle py-12 text-xs text-ink-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="space-y-2 max-w-sm">
              <div className="flex items-center gap-2 font-extrabold text-base text-ink-primary">
                <div className="w-7 h-7 rounded-lg bg-brand-primary text-white flex items-center justify-center text-xs font-bold">
                  U
                </div>
                UNIVERSA CSR HUB
              </div>
              <p className="text-[11px] leading-relaxed">
                Infrastruktur digital orkestrasi program Tanggung Jawab Sosial dan Lingkungan Perseroan (TJSL) terintegrasi di Indonesia.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-[11px]">
              <div>
                <span className="font-bold text-ink-primary block mb-2">Akses Cepat</span>
                <ul className="space-y-1.5">
                  <li><Link to="/dashboard" className="hover:text-brand-primary">Dashboard Utama</Link></li>
                  <li><Link to="/dashboard/programs" className="hover:text-brand-primary">Direktori Program</Link></li>
                  <li><Link to="/dashboard/proposals" className="hover:text-brand-primary">Pipeline Proposal</Link></li>
                </ul>
              </div>

              <div>
                <span className="font-bold text-ink-primary block mb-2">Tata Kelola</span>
                <ul className="space-y-1.5">
                  <li><Link to="/dashboard/funding" className="hover:text-brand-primary">Buku Besar Funding</Link></li>
                  <li><Link to="/dashboard/reports" className="hover:text-brand-primary">Laporan PROPER</Link></li>
                  <li><Link to="/dashboard/ecosystem" className="hover:text-brand-primary">Ecosystem Map</Link></li>
                </ul>
              </div>

              <div>
                <span className="font-bold text-ink-primary block mb-2">Lingkungan</span>
                <p className="text-ink-muted leading-snug">
                  Mode Prototipe MVP.<br />Data transaksi adalah simulasi demo internal.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <p>© 2026 Universa CSR Hub. Seluruh hak cipta dilindungi.</p>
            <div className="flex items-center gap-4">
              <span>Standard Kepatuhan UU PT No. 40/2007</span>
              <span>•</span>
              <Link to="/dashboard/settings" className="hover:underline text-brand-primary font-semibold">
                Pengaturan Demo & Reset
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
