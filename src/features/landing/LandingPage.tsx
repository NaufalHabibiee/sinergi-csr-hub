import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
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
  Check,
  Clock,
  BookOpen,
  Handshake,
  Compass,
  Send,
  Trophy,
  Scale,
  FileCheck2
} from 'lucide-react';
import { formatCompactIDR, formatNumber } from '../../lib/formatters';
import { useCSRStore } from '../../context/CSRStoreContext';
import { SEED_PROGRAMS } from '../../data/seedData';
import { CSRMenuBookModal } from '../programs/CSRMenuBookModal';
import { ProjectBookingModal } from '../programs/ProjectBookingModal';
import { CommunityAspirationModal } from '../programs/CommunityAspirationModal';
import { CSRAwardsSection } from '../awards/CSRAwardsSection';
import { CSRRegulationsSection } from '../legal/CSRRegulationsSection';
import { BASTGeneratorModal } from '../reports/BASTGeneratorModal';
import { Program } from '../../types/csr';

const heroMissions = [
  {
    title: 'Our Mission',
    description:
      'Memberdayakan petani lokal, komunitas pedesaan, dan mitra penggerak dengan ekosistem pelaporan dampak yang transparan, presisi, dan berkelanjutan.',
    link: '#tentang',
    linkText: 'Pelajari Selengkapnya'
  },
  {
    title: 'Dampak Terverifikasi',
    description:
      'Pelacakan milestone berbasis GPS dan verifikasi langsung di lapangan untuk memastikan setiap rupiah alokasi dana CSR tersalurkan tepat sasaran.',
    link: '#ekosistem',
    linkText: 'Alur Ekosistem'
  },
  {
    title: 'Standar ESG & PROPER',
    description:
      'Dokumentasi terstruktur dan pelaporan otomatis siap audit KLHK, memastikan kepatuhan regulasi dan transparansi pemangku kepentingan.',
    link: '#dampak',
    linkText: 'Laporan Dampak'
  }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { funders, partners, programs: storePrograms, fundingRecords, beneficiaries } = useCSRStore();
  const programs = useMemo(() => {
    return storePrograms.length >= SEED_PROGRAMS.length ? storePrograms : SEED_PROGRAMS;
  }, [storePrograms]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'visi' | 'misi' | 'metode'>('visi');
  const [activeEcoStep, setActiveEcoStep] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [missionIndex, setMissionIndex] = useState(0);
  const [isMenuBookOpen, setIsMenuBookOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBookingProgram, setSelectedBookingProgram] = useState<Program | null>(null);
  const [isAspirationModalOpen, setIsAspirationModalOpen] = useState(false);
  const [isBastModalOpen, setIsBastModalOpen] = useState(false);

  const handlePrevMission = () => {
    setMissionIndex((prev) => (prev === 0 ? heroMissions.length - 1 : prev - 1));
  };

  const handleNextMission = () => {
    setMissionIndex((prev) => (prev === heroMissions.length - 1 ? 0 : prev + 1));
  };

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
    <div className="min-h-screen bg-surface-bg text-ink-primary font-sans selection:bg-[#D4F63D] selection:text-black">
      {/* Dynamic Header: Transparent clean layout over hero, smooth frosted capsule on scroll */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 sm:px-6 transition-all duration-500 ease-out">
        <div
          className={`w-full pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between rounded-full ${
            isScrolled
              ? 'max-w-6xl mt-3 py-2 px-6 bg-white/95 backdrop-blur-md shadow-elevated border border-black/5 text-ink-primary'
              : 'max-w-7xl mt-0 py-6 px-4 sm:px-6 bg-transparent border border-transparent shadow-none text-white'
          }`}
        >
          <div className="flex items-center justify-between gap-6 w-full">
            {/* Left: Brand Logo & Support Contact */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center group">
                <img
                  src={isScrolled ? '/brand/sinergicsr-logo-horizontal.png' : '/brand/sinergicsr-logo-white.png'}
                  alt="SinergiCSR"
                  className={`transition-all duration-300 object-contain ${
                    isScrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-9 drop-shadow-sm'
                  }`}
                />
              </Link>

              {/* Minimalist Contact Info next to Brand */}
              <div
                className={`hidden xl:flex flex-col text-[11px] font-medium leading-snug pl-4 border-l transition-colors duration-300 ${
                  isScrolled ? 'border-border-subtle text-ink-tertiary' : 'border-white/20 text-white/70'
                }`}
              >
                <span>+62 812-3456-7890</span>
                <span>support@sinergicsr.id</span>
              </div>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-wide">
              <a
                href="#tentang"
                className={`transition-colors duration-200 py-1 ${
                  isScrolled
                    ? 'text-ink-secondary hover:text-brand-primary'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Beranda
              </a>
              <Link
                to="/programs"
                className={`transition-colors duration-200 py-1 ${
                  isScrolled
                    ? 'text-ink-secondary hover:text-brand-primary'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Program
              </Link>
              <a
                href="#ekosistem"
                className={`transition-colors duration-200 py-1 ${
                  isScrolled
                    ? 'text-ink-secondary hover:text-brand-primary'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Ekosistem
              </a>
              <a
                href="#dampak"
                className={`transition-colors duration-200 py-1 ${
                  isScrolled
                    ? 'text-ink-secondary hover:text-brand-primary'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Dampak
              </a>
              <a
                href="#mitra"
                className={`transition-colors duration-200 py-1 ${
                  isScrolled
                    ? 'text-ink-secondary hover:text-brand-primary'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Mitra
              </a>
            </nav>

            {/* Right: Masuk link + Vibrant Lime Pill Button */}
            <div className="hidden sm:flex items-center gap-5">
              <Link
                to="/login"
                className={`text-xs font-medium transition-colors ${
                  isScrolled
                    ? 'text-ink-secondary hover:text-ink-primary'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                Masuk
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs font-bold bg-[#D4F63D] hover:bg-[#C2E82E] text-black transition-all flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                <span>Dashboard</span>
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
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile dropdown */}
          {mobileMenuOpen && (
            <div
              className={`lg:hidden mt-3 pt-3 pb-4 px-4 rounded-2xl border space-y-2 text-xs font-medium shadow-elevated ${
                isScrolled
                  ? 'bg-white text-ink-primary border-border-subtle'
                  : 'bg-[#0B0F0D]/95 backdrop-blur-md text-white border-white/15'
              }`}
            >
              <a
                href="#tentang"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#D4F63D]"
              >
                Beranda
              </a>
              <Link
                to="/programs"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#D4F63D]"
              >
                Program
              </Link>
              <a
                href="#ekosistem"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#D4F63D]"
              >
                Ekosistem
              </a>
              <a
                href="#dampak"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#D4F63D]"
              >
                Dampak
              </a>
              <a
                href="#mitra"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#D4F63D]"
              >
                Mitra
              </a>
              <a
                href="#award"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#D4F63D]"
              >
                CSR Award
              </a>
              <a
                href="#regulasi"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#D4F63D]"
              >
                Regulasi
              </a>
              <div className="pt-2 border-t border-border-subtle/40 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 text-center text-xs font-medium text-white/80 hover:text-white"
                >
                  Masuk
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-full bg-[#D4F63D] text-black font-bold flex items-center justify-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                  <span>Buka Dashboard</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section: Clean, Minimalist, Matching Farmora Reference */}
      <section className="relative min-h-screen min-h-dvh flex flex-col justify-between overflow-hidden bg-[#0A120D]">
        {/* Full Photographic Background - Thematic Indonesian Agricultural Community */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_sinergi_farming_golden.jpg"
            alt="Petani dan Relawan Konservasi SinergiCSR"
            className="w-full h-full object-cover object-[center_35%] scale-100"
          />
          {/* Subtle top shade for pristine navbar contrast */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />
          {/* Bottom gradient overlay to make typography and frosted card stand out with maximum legibility */}
          <div className="absolute bottom-0 inset-x-0 h-[480px] sm:h-[520px] bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />
          {/* Subtle left side vignette */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[55%] bg-gradient-to-r from-black/45 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Spacer for top header */}
        <div className="h-24 sm:h-28" />

        {/* Bottom-anchored Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-16 lg:pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Left Column: Pill badge, Headline, Description, Lime CTA */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-5">
              {/* Frosted tag badge */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium tracking-wide">
                <span>Sustainable Impact &amp; ESG Tech</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal sm:font-medium tracking-tight text-white leading-[1.08] drop-shadow-md">
                Bringing Innovation to <br className="hidden sm:inline" />
                Your Impact Journey.
              </h1>

              {/* Subtitle / Paragraph */}
              <p className="text-xs sm:text-sm text-white/85 max-w-xl leading-relaxed font-normal drop-shadow-sm">
                Dari alokasi pendanaan terukur hingga verifikasi dampak di lapangan, kami menghubungkan korporasi, yayasan, dan komunitas untuk keberlanjutan masa depan.
              </p>

              {/* Lime Button with Black Arrow Badge */}
              <div className="pt-2">
                <Link
                  to="/dashboard"
                  className="bg-[#D4F63D] hover:bg-[#C2E82E] text-black font-semibold text-xs sm:text-sm pl-6 pr-2.5 py-2.5 rounded-full inline-flex items-center gap-4 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer active:scale-95"
                >
                  <span>Mulai Sekarang</span>
                  <div className="w-8 h-8 rounded-full bg-black text-[#D4F63D] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Column: Arrow Controls + Frosted Mission Glass Card */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-start lg:items-end space-y-3">
              {/* Arrow controls */}
              <div className="flex items-center gap-3 text-white/80 pr-1">
                <button
                  type="button"
                  onClick={handlePrevMission}
                  aria-label="Previous slide"
                  className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMission}
                  aria-label="Next slide"
                  className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Frosted Glass Card */}
              <div className="w-full max-w-sm sm:max-w-md bg-black/35 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/15 text-white shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/95 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4F63D]" />
                  <span>{heroMissions[missionIndex].title}</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed mb-4 min-h-[48px]">
                  {heroMissions[missionIndex].description}
                </p>
                <a
                  href={heroMissions[missionIndex].link}
                  className="text-xs font-semibold text-white hover:text-[#D4F63D] inline-flex items-center gap-1.5 transition-colors group"
                >
                  <span>{heroMissions[missionIndex].linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: About Us (Tentang Kami) - Clean, Elegant & Thematic */}
      <section id="tentang" className="scroll-mt-20 py-20 lg:py-28 bg-[#FBFDFB] relative overflow-hidden border-b border-slate-200/70">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
          {/* Eyebrow & Headline Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F6F0] text-[#176B4D] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#176B4D]" />
              <span>About Us • Tentang SinergiCSR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2518] tracking-tight leading-tight">
              Membangun Ekosistem Kemitraan Berkelanjutan yang <span className="text-[#176B4D]">Transparan &amp; Berdampak Nyata</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              SinergiCSR adalah platform orkestrasi dampak sosial dan tata kelola ESG pertama di Indonesia yang menghubungkan komitmen pendanaan korporasi dan BUMN dengan inisiatif pemberdayaan masyarakat yang terkurasi, berpayung hukum sah, serta terikat standar akuntabilitas BAST.
            </p>
          </div>

          {/* Two-Column Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Mission Narrative & 3 Core Value Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                <p>
                  Didirikan dengan semangat gotong royong dan kepatuhan regulasi, kami mengatasi tantangan klasik penyaluran CSR—mulai dari klaim fiktif, program tumpang-tindih (overlapping), hingga minimnya data pengukuran dampak jangka panjang.
                </p>
                <p>
                  Melalui sistem verifikasi multipihak (Pentahelix), setiap program yang terdaftar di SinergiCSR melalui uji kelayakan ketat, sinkronisasi dengan Buku Menu Prioritas Daerah, dan integrasi kriteria PROPER Kementerian LHK.
                </p>
              </div>

              {/* 3 Core Value Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5 text-[#176B4D]" />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#0B2518]">
                    Transparansi BAST
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Pencairan bertahap terkunci Berita Acara resmi demi kepastian audit dan syarat insentif pajak (tax deduction).
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center font-bold">
                    <Users className="w-5 h-5 text-[#176B4D]" />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#0B2518]">
                    Validasi NIK/NIB
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Identitas penerima manfaat terverifikasi tunggal, menjamin nol klaim ganda dan bebas data penerima fiktif.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center font-bold">
                    <Award className="w-5 h-5 text-[#176B4D]" />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#0B2518]">
                    Audit PROPER &amp; SDGs
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Metrik SROI dan sinkronisasi 17 target SDGs Bappenas siap diekspor untuk penilaian peringkat kepatuhan KLHK.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Brand Card with Live Stats & Imagery */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 group">
                <img
                  src="/images/volunteers_planting_field.jpg"
                  alt="Aktivitas Kolaborasi Komunitas SinergiCSR"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-103 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                {/* Floating Frosted Pill at Top */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4F63D]" />
                    <span>Orkestrator CSR Terstandarisasi</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-300 font-mono bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    EST. 2026
                  </span>
                </div>

                {/* Floating Metric Card at Bottom */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white space-y-2.5">
                  <div className="grid grid-cols-3 gap-2 text-center divide-x divide-white/15">
                    <div>
                      <span className="text-[10px] text-white/60 block">Inisiatif</span>
                      <span className="text-base sm:text-lg font-black text-[#D4F63D]">{programs.length} Program</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/60 block">Kepatuhan</span>
                      <span className="text-base sm:text-lg font-black text-white">100% BAST</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/60 block">Mitra Funder</span>
                      <span className="text-base sm:text-lg font-black text-emerald-300">{funders.length} Korporasi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: What We Offer & Core Solutions */}
      <section id="solusi" className="scroll-mt-20 py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Eyebrow & Title */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F6F0] text-[#176B4D] text-xs font-bold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5 text-[#176B4D]" />
              <span>What We Offer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2518] tracking-tight leading-tight">
              Solusi Cerdas untuk Tata Kelola CSR Modern
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              Seluruh kapabilitas yang Anda butuhkan untuk mengorkestrasi pendanaan sosial &amp; lingkungan secara presisi, transparan, dan berdampak.
            </p>
          </div>

          {/* 4 Clean Solution Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 sm:mt-16">
            {/* Card 1: Konservasi Lingkungan */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <TreePine className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-base text-[#0B2518] group-hover:text-[#176B4D] transition-colors">
                  Konservasi Lingkungan
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed mt-2.5">
                  Perencanaan reboisasi, restorasi mangrove pesisir, dan monitoring bibit dengan data geotagging real-time.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#176B4D]">
                <Link to="/dashboard/programs" className="inline-flex items-center gap-1.5 hover:underline">
                  <span>Lihat Program</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Kontrol Salur & BAST */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-base text-[#0B2518] group-hover:text-[#176B4D] transition-colors">
                  Kontrol Salur &amp; BAST
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed mt-2.5">
                  Penyaluran bertahap per termin milestone terkunci Berita Acara, mencegah overbudget dan kebocoran dana.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#176B4D]">
                <Link to="/dashboard/funding" className="inline-flex items-center gap-1.5 hover:underline">
                  <span>Inspeksi Buku Besar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Verifikasi Penerima Manfaat */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-base text-[#0B2518] group-hover:text-[#176B4D] transition-colors">
                  Verifikasi Penerima Manfaat
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed mt-2.5">
                  Validasi identitas NIK/NIB unik bebas klaim ganda, memisahkan partisipasi kegiatan dari data individu riil.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#176B4D]">
                <Link to="/dashboard/beneficiaries" className="inline-flex items-center gap-1.5 hover:underline">
                  <span>Data Penerima</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4: Evaluasi PROPER & SDGs */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-base text-[#0B2518] group-hover:text-[#176B4D] transition-colors">
                  Evaluasi PROPER &amp; SDGs
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed mt-2.5">
                  Otomasi pelaporan audit kepatuhan KLHK dan indikator SDGs Bappenas siap cetak dengan akurasi 100%.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#176B4D]">
                <Link to="/dashboard/reports" className="inline-flex items-center gap-1.5 hover:underline">
                  <span>Generator Laporan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Centered CTA Link */}
          <div className="text-center mt-10">
            <Link
              to="/dashboard/programs"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#176B4D] hover:text-[#0E4F37] transition-colors"
            >
              <span>Eksplorasi Seluruh Solusi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Dark Forest Green Stat Banner (Directly Matching Reference) */}
          <div className="mt-16 sm:mt-20 rounded-3xl bg-[#0D3825] text-white p-7 sm:p-10 shadow-xl border border-emerald-800/40">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center text-center">
              <div className="space-y-1 sm:space-y-2">
                <div className="w-10 h-10 rounded-full bg-white/10 mx-auto flex items-center justify-center text-[#D4F63D] mb-2">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  {formatNumber(totalReached)}+
                </div>
                <div className="text-xs text-emerald-100/75 font-medium">
                  Penerima Manfaat Riil
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2 border-l border-white/15">
                <div className="w-10 h-10 rounded-full bg-white/10 mx-auto flex items-center justify-center text-[#D4F63D] mb-2">
                  <Coins className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#D4F63D]">
                  {formatCompactIDR(totalCommitted)}
                </div>
                <div className="text-xs text-emerald-100/75 font-medium">
                  Total Komitmen Funder
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2 border-l border-white/15">
                <div className="w-10 h-10 rounded-full bg-white/10 mx-auto flex items-center justify-center text-[#D4F63D] mb-2">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  100%
                </div>
                <div className="text-xs text-emerald-100/75 font-medium">
                  Penyaluran Terverifikasi BAST
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2 border-l border-white/15">
                <div className="w-10 h-10 rounded-full bg-white/10 mx-auto flex items-center justify-center text-[#D4F63D] mb-2">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  {partners.length} Mitra
                </div>
                <div className="text-xs text-emerald-100/75 font-medium">
                  Lembaga Pelaksana Terakreditasi
                </div>
              </div>
            </div>
          </div>

          {/* Technology that Grows with You Showcase */}
          <div className="mt-20 lg:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left: Content & checklist */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-[#176B4D] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-[#176B4D]" /> SMART. SIMPLE. POWERFUL.
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2518] tracking-tight leading-[1.15]">
                  Teknologi yang bertumbuh bersama <span className="text-[#176B4D] italic">dampak Anda</span>
                </h2>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  SinergiCSR adalah partner orkestrasi TJSL Anda. Akses data lapangan real-time, milestone bergeotagging, dan pelaporan siap audit PROPER KLHK dalam satu platform terpadu.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#176B4D] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <p className="text-xs sm:text-sm text-ink-primary font-medium">
                    <strong>Pemantauan Lapangan Real-Time</strong> dengan titik koordinat GPS otentik.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#176B4D] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <p className="text-xs sm:text-sm text-ink-primary font-medium">
                    <strong>Pelaporan Otomatis SDGs &amp; PROPER</strong> terstandarisasi bebas manipulasi.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#176B4D] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <p className="text-xs sm:text-sm text-ink-primary font-medium">
                    <strong>Akses Kolaboratif Terpusat</strong> untuk Perusahaan Funder, Mitra Yayasan, dan Auditor.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/dashboard"
                  className="px-6 py-3 rounded-full bg-[#0E3D2A] hover:bg-[#176B4D] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Mulai Eksplorasi</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Modern Mockup Collage */}
            <div className="lg:col-span-7">
              <div className="relative p-4 sm:p-6 rounded-3xl bg-[#F4F8F5] border border-emerald-900/10">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  {/* Mobile Mockup Card (5 cols) */}
                  <div className="sm:col-span-5 bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="text-xs font-bold text-[#0B2518]">Halo, Evaluator 👋</div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 rounded-2xl bg-[#F8FAF8] border border-emerald-900/5">
                        <div className="text-[10px] text-ink-muted uppercase font-bold">Kesehatan Program</div>
                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-xl font-extrabold text-[#0B2518]">98%</span>
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-full">Sangat Baik</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#F8FAF8] border border-emerald-900/5">
                        <div className="text-[10px] text-ink-muted uppercase font-bold">Verifikasi Lapangan</div>
                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-xl font-extrabold text-[#176B4D]">100%</span>
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-full">Tervalidasi BAST</span>
                        </div>
                      </div>

                      <div className="pt-1">
                        <div className="text-[10px] font-bold text-ink-muted mb-1.5">Agenda Salur Berikutnya</div>
                        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-100 text-xs">
                          <Clock className="w-4 h-4 text-[#176B4D]" />
                          <div className="truncate">
                            <div className="font-bold text-[#0B2518] truncate">Termin II Reboisasi</div>
                            <div className="text-[10px] text-ink-muted">Target: 15.000 bibit</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Dashboard Card (7 cols) */}
                  <div className="sm:col-span-7 bg-white rounded-3xl p-5 shadow-xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs text-[#0B2518] flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#176B4D]" />
                        <span>Pemetaan Geotagging Program</span>
                      </div>
                      <span className="text-[10px] text-[#176B4D] font-bold bg-[#E8F6F0] px-2 py-0.5 rounded-full">Live GPS</span>
                    </div>

                    <div className="relative h-32 rounded-2xl overflow-hidden shadow-inner">
                      <img
                        src="/images/hero_sinergi_farming_golden.jpg"
                        alt="Live Geotagging"
                        className="w-full h-full object-cover object-[center_30%]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                        <span className="text-[10px] text-white font-semibold">
                          📍 Karangmulyo, Jawa Tengah (-7.532, 110.421)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 text-center">
                      <div className="p-2.5 rounded-xl bg-[#F8FAF8] border border-slate-100">
                        <div className="text-[10px] text-ink-muted">Penerima Manfaat</div>
                        <div className="text-base font-extrabold text-[#0B2518] mt-0.5">{formatNumber(totalReached)}</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#F8FAF8] border border-slate-100">
                        <div className="text-[10px] text-ink-muted">Status Evaluasi</div>
                        <div className="text-base font-extrabold text-[#176B4D] mt-0.5">Siap PROPER</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: Pilar Program CSR */}
      <section id="pilar" className="scroll-mt-20 py-20 lg:py-28 bg-[#FBFDFB] border-t border-slate-150/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[#176B4D] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Sprout className="w-4 h-4 text-[#176B4D]" /> Pilar &amp; Direktori Program CSR
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B2518] leading-tight">
                8 Program Unggulan Pemberdayaan Berkelanjutan
              </h2>
            </div>
            <div className="space-y-3 md:text-right">
              <p className="text-xs sm:text-sm text-ink-secondary max-w-md leading-relaxed">
                Inisiatif strategis yang terstruktur sesuai kriteria PROPER KLHK dan 17 Tujuan Pembangunan Berkelanjutan (SDGs).
              </p>
              <div className="flex flex-wrap items-center md:justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsMenuBookOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-[#176B4D] hover:bg-emerald-100 border border-emerald-200/90 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#176B4D]" />
                  <span>Buka Buku Menu Kemitraan (Menu Book)</span>
                </button>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B4D] hover:underline"
                >
                  <span>Sub Halaman Katalog Program</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Cards Grid with Photos - All 8 Programs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'prg_001',
                num: '01',
                category: 'Lingkungan',
                title: 'Restorasi 50.000 Mangrove & Pesisir',
                description: 'Restorasi 50.000 bibit mangrove dan rehabilitasi pesisir untuk menahan abrasi serta menurunkan emisi karbon.',
                image: '/images/volunteers_planting_saplings.jpg',
                location: 'Muara Gembong, Bekasi',
                metric: '1.200 Penerima',
                status: 'Aktif • 68%'
              },
              {
                id: 'prg_002',
                num: '02',
                category: 'Pendidikan',
                title: 'Beasiswa Talenta & Coding Vokasi',
                description: 'Bantuan biaya kuliah penuh dan pelatihan intensif software engineering untuk talenta prasejahtera.',
                image: '/images/program_beasiswa_vokasi.jpg',
                location: 'Semarang & Solo',
                metric: '150 Mahasiswa',
                status: 'Aktif • 60%'
              },
              {
                id: 'prg_003',
                num: '03',
                category: 'Ekonomi UMKM',
                title: 'Inkubasi & Halal UMKM Kuliner',
                description: 'Fasilitasi sertifikasi halal, standarisasi kemasan BPOM, dan digitalisasi pencatatan omzet bagi 250 usaha mikro.',
                image: '/images/program_umkm_culinary.jpg',
                location: 'Tuban & Lamongan',
                metric: '250 UMKM',
                status: 'Aktif • 55%'
              },
              {
                id: 'prg_004',
                num: '04',
                category: 'Kesehatan',
                title: 'Intervensi Stunting & Gizi Balita Pesisir',
                description: 'Pemberian PMT lokal berprotein tinggi, pelatihan kader posyandu, dan pemantauan antropometri 600 balita.',
                image: '/images/program_stunting_posyandu.jpg',
                location: 'Timor Tengah Selatan',
                metric: '600 Balita',
                status: 'Aktif • 50%'
              },
              {
                id: 'prg_005',
                num: '05',
                category: 'Infrastruktur',
                title: 'Pompa Tenaga Surya & Pipanisasi Karst',
                description: 'Penyediaan air minum higienis bebas emisi untuk 1.800 warga di desa karst langganan kekeringan.',
                image: '/images/program_water_solar.jpg',
                location: 'Gunungkidul, DIY',
                metric: '1.800 Warga',
                status: 'Aktif • 82%'
              },
              {
                id: 'prg_006',
                num: '06',
                category: 'Konservasi Gambut',
                title: 'Reboisasi 100 Ha Gambut & Patroli Api',
                description: 'Pemulihan vegetasi pohon endemik di zona karhutla dan patroli Masyarakat Peduli Api pencegahan kebakaran.',
                image: '/images/program_peatland_patrol.jpg',
                location: 'Pelalawan, Riau',
                metric: '800 Penerima',
                status: 'Aktif • 48%'
              },
              {
                id: 'prg_007',
                num: '07',
                category: 'Pendidikan Inklusif',
                title: 'Vokasi Kerja Inklusif Disabilitas',
                description: 'Pelatihan keahlian desain digital, administrasi data, dan penyaluran kerja inklusif bagi pemuda disabilitas.',
                image: '/images/program_vokasi_disabilitas.jpg',
                location: 'DKI Jakarta & Tangerang',
                metric: '80 Pemuda',
                status: 'Selesai • 100%'
              },
              {
                id: 'prg_008',
                num: '08',
                category: 'Ketahanan Pangan',
                title: 'Lumbung Pangan Mandiri & Bio-Kompos',
                description: 'Pelatihan pembuatan formulasi pupuk bio-organik dan lumbung bibit unggul untuk kedaulatan pangan desa.',
                image: '/images/program_lumbung_organik.jpg',
                location: 'Magelang, Jawa Tengah',
                metric: '400 Petani',
                status: 'Aktif • 35%'
              }
            ].map((prog) => (
              <Link
                key={prog.id}
                to={`/dashboard/programs/${prog.id}`}
                className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                    No - {prog.num} • {prog.category}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/95 text-[#0B2518] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-sm">
                    {prog.status}
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[#0B2518] group-hover:text-[#176B4D] transition-colors leading-snug line-clamp-2">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-ink-secondary mt-1.5 leading-relaxed line-clamp-3">
                      {prog.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const match = programs.find((p) => p.id === prog.id) || null;
                        setSelectedBookingProgram(match);
                        setIsBookingModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-[#176B4D] hover:bg-[#176B4D] hover:text-white border border-emerald-200/90 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                    >
                      <Handshake className="w-3.5 h-3.5" />
                      <span>Booking / Minat</span>
                    </button>
                    <span className="flex items-center gap-1 text-[#176B4D]">
                      <span>Detail</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Callout: Musrenbang CSR (Usulan Desa) & GIS Spatial Map */}
          <div className="mt-12 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 text-[#176B4D] border border-emerald-200 inline-block mb-1">
                Kanal Partisipasi Daerah &amp; Komunitas (Musrenbang CSR)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B2518] tracking-tight">
                Pemerintah Desa atau Warga Memiliki Kebutuhan Pembangunan?
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Daftarkan usulan kebutuhan sarana air bersih, perbaikan Rutilahu, pencegahan stunting, atau modal UMKM desa Anda agar dapat dikurasi oleh Bappeda dan dihubungkan ke Funder Korporat.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsAspirationModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold transition-all shadow-md shadow-[#176B4D]/25 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ajukan Kebutuhan Desa</span>
              </button>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4F63D] hover:bg-[#C2E82E] text-black text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <span>Buka Sub Halaman Katalog Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: Ekosistem Interaktif */}
      <section id="ekosistem" className="scroll-mt-20 py-20 lg:py-28 bg-white border-t border-slate-150/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-16">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[#176B4D] text-xs font-bold uppercase tracking-wider">
                <Sprout className="w-4 h-4 text-[#176B4D]" />
                <span>Siklus Tata Kelola Tertutup</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2518] tracking-tight leading-tight">
                Bagaimana Cara Kerja <span className="text-[#176B4D]">SinergiCSR?</span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 max-w-md lg:text-right">
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Dari alokasi pendanaan awal hingga pelaporan formal ke regulator pemerintah, seluruh proses berjalan terpadu dalam satu alur hidup tanpa dokumen tercecer.
              </p>
              <Link
                to="/dashboard/ecosystem"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0E3D2A] hover:bg-[#176B4D] text-white text-xs font-bold shadow-md transition-all shrink-0"
              >
                <span>Diagram Alur Interaktif</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {(() => {
            const ecoSteps = [
              {
                step: '01',
                title: 'Komitmen & Alokasi Funder',
                actor: 'Corporate Funder',
                badge: 'Pencatatan Inflow Resmi',
                desc: 'Perusahaan menetapkan pilar sasaran TJSL dan mencatatkan alokasi komitmen dana tahunan secara transparan ke dalam buku besar.',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=85',
                imageCaption: 'Komite ESG menetapkan pagu anggaran tahunan.',
                liveMetricLabel: 'Total Komitmen Terkunci',
                liveMetricValue: formatCompactIDR(totalCommitted),
                liveSubtext: `${funders.length} Perusahaan Mitra Aktif`,
                highlights: [
                  'Penetapan Pagu per Pilar SDGs & PROPER',
                  'Kontrak Komitmen Tahunan Terverifikasi',
                  'Saldo Alokasi Real-Time & Anti-Overbudget'
                ],
                linkTo: '/dashboard/funding',
                linkLabel: 'Inspeksi Buku Besar',
                icon: Coins
              },
              {
                step: '02',
                title: 'Kurasi & Verifikasi Proposal',
                actor: 'Mitra Pelaksana (NGO / Yayasan)',
                badge: 'Seleksi Bebas Fiktif',
                desc: 'Mitra mengajukan usulan kegiatan lapangan, dikurasi kelayakan RAB serta legalitasnya, lalu dikonversi otomatis menjadi Program aktif.',
                image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=85',
                imageCaption: 'Tim Kurator membedah kelayakan teknis program.',
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
                imageCaption: 'Verifikasi fisik di titik lokasi sebelum pencairan.',
                liveMetricLabel: 'Dana Tersalurkan via BAST',
                liveMetricValue: formatCompactIDR(totalDisbursed),
                liveSubtext: '100% Pencairan Terikat Bukti Fisik',
                highlights: [
                  'Kunci Pencairan Bertahap (Termin 1, 2, Final)',
                  'Wajib Unggah Bukti Foto Geotagging & BAST',
                  'Proteksi Otomatis dari Salur Melebihi Pagu'
                ],
                linkTo: '/dashboard/programs',
                linkLabel: 'Cek Milestone Program',
                icon: ShieldCheck
              },
              {
                step: '04',
                title: 'Laporan Dampak & PROPER',
                actor: 'Regulator KLHK & Publik',
                badge: 'Kepatuhan Pemerintah',
                desc: 'Seluruh jejak transaksi dan penerima manfaat unik dirangkum otomatis menjadi CSR Annual Report dan draf evaluasi PROPER KLHK.',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=85',
                imageCaption: 'Ringkasan audit eksekutif siap cetak untuk regulator.',
                liveMetricLabel: 'Penerima Manfaat Terverifikasi',
                liveMetricValue: `${formatNumber(totalReached)}+ Jiwa`,
                liveSubtext: 'Bebas Klaim Ganda (NIK/NIB Unik)',
                highlights: [
                  'Ekspor Draf Evaluasi PROPER KLHK & SDGs',
                  'Metodologi Deduping Penerima Manfaat Riil',
                  'Rekam Jejak Siap Audit Eksternal Kapan Saja'
                ],
                linkTo: '/dashboard/reports',
                linkLabel: 'Buka Generator Laporan',
                icon: Award
              }
            ];

            const current = ecoSteps[activeEcoStep] || ecoSteps[0];
            const CurrentIcon = current.icon;

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
                {/* Left Column: Visual Frame */}
                <div className="lg:col-span-5 flex flex-col justify-between relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-[#072418] h-full min-h-[460px] flex flex-col justify-between group">
                    <img
                      key={current.image}
                      src={current.image}
                      alt={current.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#072418] via-[#072418]/60 to-black/30" />

                    <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#D4F63D] animate-pulse" />
                        Tahap {current.step} dari 04
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#D4F63D] text-black text-[11px] font-bold">
                        {current.actor}
                      </span>
                    </div>

                    <div className="relative z-10 p-5 sm:p-6 mt-auto space-y-4">
                      <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold">
                            {current.liveMetricLabel}
                          </div>
                          <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                            {current.liveMetricValue}
                          </div>
                          <div className="text-[11px] text-[#D4F63D] font-semibold mt-0.5">
                            {current.liveSubtext}
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-[#D4F63D] text-black flex items-center justify-center shrink-0 shadow-lg">
                          <CurrentIcon className="w-6 h-6" />
                        </div>
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                          Standar Kendali:
                        </div>
                        {current.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-xs text-white/95 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#D4F63D] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-white/70 italic line-clamp-1">
                          {current.imageCaption}
                        </span>
                        <Link
                          to={current.linkTo}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4F63D] hover:underline shrink-0"
                        >
                          <span>{current.linkLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Steps Cards */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  {ecoSteps.map((item, idx) => {
                    const StepIcon = item.icon;
                    const isActive = activeEcoStep === idx;

                    return (
                      <div
                        key={item.step}
                        onClick={() => setActiveEcoStep(idx)}
                        className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'bg-[#F4F9F5] border-[#176B4D] shadow-md ring-1 ring-[#176B4D]/20'
                            : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                                isActive
                                  ? 'bg-[#176B4D] text-white'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {item.step}
                            </span>
                            <span className="text-xs font-bold text-[#0B2518]">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-semibold text-[#176B4D] bg-[#E8F6F0] px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          </div>
                          <StepIcon className={`w-4 h-4 ${isActive ? 'text-[#176B4D]' : 'text-slate-400'}`} />
                        </div>

                        <p className="text-xs text-ink-secondary leading-relaxed pl-9">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 7. Section: Laporan Dampak & Audit */}
      <section id="dampak" className="scroll-mt-20 py-20 lg:py-28 bg-[#FBFDFB] border-t border-slate-150/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F6F0] text-[#176B4D] text-xs font-bold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5 text-[#176B4D]" />
              <span>Dampak &amp; Kepatuhan Audit</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2518] tracking-tight leading-tight">
              Transparansi Nyata, Teruji Hingga Lapangan
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              Setiap data dampak dikurasi dengan metodologi identitas tunggal bebas duplikasi, siap untuk audit eksternal dan evaluasi PROPER.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#176B4D] bg-[#E8F6F0] px-2 py-0.5 rounded-full">
                  100% Anti-Duplikasi
                </span>
                <h3 className="font-bold text-base text-[#0B2518]">Validasi Identitas NIK/NIB</h3>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Memisahkan secara ketat antara individu penerima unik dan kehadiran acara, mencegah klaim ganda dan penggelembungan laporan.
                </p>
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#176B4D] bg-[#E8F6F0] px-2 py-0.5 rounded-full">
                    Geotagging Aktif
                  </span>
                  <h3 className="font-bold text-base text-[#0B2518]">Bukti Digital BAST &amp; GPS</h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Setiap pengeluaran dana termin terikat Berita Acara Serah Terima dengan dokumentasi foto dan titik koordinat asli di lokasi kegiatan.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBastModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B4D] hover:underline cursor-pointer"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Generator BAST Terstandar</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#176B4D] bg-[#E8F6F0] px-2 py-0.5 rounded-full">
                    Kriteria PROPER
                  </span>
                  <h3 className="font-bold text-base text-[#0B2518]">Laporan Siap Audit KLHK</h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Generator otomatis yang memetakan kegiatan ke indikator SDGs Bappenas dan format evaluasi PROPER Emas &amp; Hijau Kementerian LHK.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <a
                  href="#regulasi"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B4D] hover:underline cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Lihat Dasar Hukum &amp; Regulasi</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Trust Score Strip */}
          <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-[#0B2518]">Trust Score 4.9/5.0</span>
                <span className="text-ink-muted ml-2">• Kepatuhan Audit Eksternal Terverifikasi</span>
              </div>
            </div>

            <Link
              to="/dashboard/reports"
              className="text-xs font-bold text-[#176B4D] hover:underline inline-flex items-center gap-1.5"
            >
              <span>Buka Generator Laporan PROPER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Section: Mitra & Corporate Funders */}
      <section id="mitra" className="scroll-mt-20 py-16 lg:py-20 bg-white border-t border-slate-150/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <span className="text-[#176B4D] text-xs font-bold uppercase tracking-wider block mb-1">
              Jejaring Kemitraan Strategis
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B2518]">
              Dipercaya oleh Perusahaan dan Lembaga Sosial Terkemuka
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
            {funders.map((funder) => (
              <div
                key={funder.id}
                className="p-4 rounded-2xl bg-[#F8FAF8] border border-slate-200/80 hover:border-[#176B4D] transition-all text-center group"
              >
                <div className="font-bold text-sm text-[#0B2518] group-hover:text-[#176B4D] transition-colors">
                  {funder.code}
                </div>
                <div className="text-[11px] text-ink-muted truncate mt-0.5">{funder.name}</div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#E8F6F0] text-[#176B4D] font-bold mt-2 inline-block">
                  Corporate Funder
                </span>
              </div>
            ))}
          </div>

          {/* Annual CSR Award Hall of Fame Callout */}
          <div className="mt-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0E3D2A] via-[#176B4D] to-[#0B2518] text-white flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-lg border border-emerald-800/60 relative overflow-hidden">
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
                <Trophy className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Jawa Barat &amp; National CSR Award 2025/2026</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Galeri Penganugerahan &amp; Leaderboard Mitra Unggul
                </h4>
                <p className="text-xs text-emerald-100/80 max-w-xl">
                  Apresiasi resmi kategori Platinum, Gold, dan Silver bagi korporasi dengan kontribusi TJSL terbesar, sertifikat digital resmi, dan 100% kepatuhan audit BAST.
                </p>
              </div>
            </div>

            <a
              href="#award"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs shadow-md transition-all cursor-pointer shrink-0 relative z-10"
            >
              <Trophy className="w-4 h-4" />
              <span>Lihat Galeri CSR Award Di Bawah</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 9. Section: Galeri CSR Award & Leaderboard Mitra Unggul */}
      <CSRAwardsSection />

      {/* 10. Section: Pusat Regulasi & Dasar Hukum Kemitraan */}
      <CSRRegulationsSection />

      {/* 11. Executive Pre-Footer Banner & Architectural Footer */}
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
                    src="/brand/sinergicsr-logo-horizontal.png"
                    alt="SinergiCSR"
                    className="h-8 object-contain"
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
                  <Link to="/programs" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Sub Halaman Katalog Program</span>
                  </Link>
                </li>
                <li>
                  <a href="#mitra" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Mitra &amp; Funder</span>
                  </a>
                </li>
                <li>
                  <a href="#award" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Galeri CSR Award</span>
                  </a>
                </li>
                <li>
                  <a href="#regulasi" className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#FDE047] group-hover:translate-x-0.5 transition-all" />
                    <span>Dasar Hukum &amp; Regulasi</span>
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsBastModalOpen(true)}
                    className="hover:text-[#FDE047] transition-colors inline-flex items-center gap-1.5 group cursor-pointer text-left"
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>Generator BAST Resmi</span>
                  </button>
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
            <p>© 2026 SinergiCSR. Seluruh hak cipta dilindungi.</p>

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

      {/* CSR Menu Book (Buku Kemitraan) Modal */}
      <CSRMenuBookModal
        isOpen={isMenuBookOpen}
        onClose={() => setIsMenuBookOpen(false)}
        onSelectProgramForBooking={(prog) => {
          setSelectedBookingProgram(prog);
          setIsBookingModalOpen(true);
        }}
      />

      {/* Project Booking / Letter of Intent Modal */}
      <ProjectBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        program={selectedBookingProgram}
      />

      {/* Community Aspiration (Musrenbang CSR) Modal */}
      <CommunityAspirationModal
        isOpen={isAspirationModalOpen}
        onClose={() => setIsAspirationModalOpen(false)}
      />

      {/* Point 7: Standardized BAST Generator Modal */}
      <BASTGeneratorModal
        isOpen={isBastModalOpen}
        onClose={() => setIsBastModalOpen(false)}
      />
    </div>
  );
};
