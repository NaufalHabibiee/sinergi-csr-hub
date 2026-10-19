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
  X
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
    <div className="min-h-screen bg-surface-bg text-ink-primary font-sans selection:bg-brand-mint selection:text-brand-primary">
      {/* 1. Top Announcement Bar */}
      <div className="bg-brand-dark text-emerald-100 px-4 py-2 text-xs border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-brand-emerald/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
              Platform Info
            </span>
            <span className="text-emerald-100/90 text-[11px] hidden sm:inline">
              Universa CSR Hub: Solusi Tata Kelola Digital Tanggung Jawab Sosial & Kesiapan PROPER KLHK
            </span>
            <span className="text-emerald-100/90 text-[11px] sm:hidden">
              Universa CSR Hub — Tata Kelola CSR Digital
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-emerald-300 font-semibold">Mode Prototipe MVP</span>
            <Link
              to="/dashboard"
              className="text-white hover:text-emerald-200 font-bold underline flex items-center gap-1"
            >
              Buka Dashboard <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-surface-card/95 backdrop-blur-md border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-emerald flex items-center justify-center text-white shadow-xs font-extrabold text-xl tracking-wider group-hover:scale-105 transition-transform">
              U
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-ink-primary leading-tight flex items-center gap-1.5">
                UNIVERSA
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-brand-mint text-brand-primary border border-emerald-200">
                  CSR HUB
                </span>
              </span>
              <span className="text-[11px] font-medium text-ink-muted tracking-wide">
                Social Governance & Impact Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-ink-secondary">
            <a href="#tentang" className="hover:text-brand-primary transition-colors">Tentang Kami</a>
            <a href="#pilar" className="hover:text-brand-primary transition-colors">Pilar Program CSR</a>
            <a href="#ekosistem" className="hover:text-brand-primary transition-colors">Alur Ekosistem</a>
            <a href="#mitra" className="hover:text-brand-primary transition-colors">Mitra & Funder</a>
            <a href="#dampak" className="hover:text-brand-primary transition-colors">Laporan Dampak</a>
          </nav>

          {/* Right Action: Button to Dashboard */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold shadow-card hover:shadow-elevated transition-all flex items-center gap-2 group"
            >
              <span>Masuk ke Dashboard</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-ink-muted hover:text-ink-primary hover:bg-surface-secondary cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-6 bg-surface-card border-b border-border-subtle space-y-3 text-xs font-bold">
            <a
              href="#tentang"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-ink-primary hover:text-brand-primary"
            >
              Tentang Kami
            </a>
            <a
              href="#pilar"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-ink-primary hover:text-brand-primary"
            >
              Pilar Program CSR
            </a>
            <a
              href="#ekosistem"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-ink-primary hover:text-brand-primary"
            >
              Alur Ekosistem
            </a>
            <a
              href="#mitra"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-ink-primary hover:text-brand-primary"
            >
              Mitra & Funder
            </a>
            <div className="pt-2 border-t border-border-subtle">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-primary text-white font-bold flex items-center justify-center gap-2"
              >
                Masuk ke Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 3. Hero Section (Inspirasi Econest: Bold, Human-Centered, Forest Theme) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-mint/40 via-surface-bg to-surface-bg pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint border border-emerald-200 text-brand-primary text-xs font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-brand-emerald" />
                <span>Tata Kelola Tanggung Jawab Sosial & Lingkungan (TJSL) Terintegrasi</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-ink-primary tracking-tight leading-[1.15]">
                Wujudkan Dampak Nyata dengan <span className="text-brand-primary underline decoration-brand-emerald decoration-wavy decoration-2">Transparansi Penuh</span>
              </h1>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-xl">
                Universa CSR Hub adalah jembatan digital yang mempertemukan perusahaan pemberi dana CSR, lembaga pelaksana sosial terverifikasi, dan masyarakat penerima manfaat. Kami memastikan alokasi dana tepat sasaran, termonitor per milestone, dan menghasilkan laporan dampak yang siap diaudit.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/dashboard"
                  className="px-6 py-3.5 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white text-xs sm:text-sm font-bold shadow-card hover:shadow-elevated transition-all flex items-center gap-2.5 group"
                >
                  <span>Buka Platform Dashboard</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>

                <a
                  href="#ekosistem"
                  className="px-6 py-3.5 rounded-2xl bg-surface-card hover:bg-surface-secondary text-ink-primary text-xs sm:text-sm font-bold border border-border-subtle shadow-xs transition-colors flex items-center gap-2"
                >
                  <span>Pelajari Alur Ekosistem</span>
                  <ChevronRight className="w-4 h-4 text-ink-muted" />
                </a>
              </div>

              {/* Social Proof Stats Mini Strip */}
              <div className="pt-6 border-t border-border-subtle/80 flex flex-wrap items-center gap-6 text-xs text-ink-muted">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                  </div>
                  <div>
                    <span className="font-extrabold text-ink-primary block leading-none">{funders.length} Korporasi & {partners.length} Mitra</span>
                    <span className="text-[11px] text-ink-muted">Telah berkolaborasi di platform</span>
                  </div>
                </div>

                <div className="h-8 w-px bg-border-subtle hidden sm:block"></div>

                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-ink-primary block leading-none">Kesiapan PROPER KLHK</span>
                    <span className="text-[11px] text-ink-muted">Audit-ready format</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Image Composition (Inspirasi Layout Foto Organik Econest) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative blob */}
                <div className="absolute -top-10 -left-10 w-72 h-72 bg-brand-emerald/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-brand-mint rounded-full blur-2xl pointer-events-none"></div>

                {/* Main Hero Card with High-Impact Photo */}
                <div className="relative rounded-3xl overflow-hidden border-4 border-surface-card shadow-elevated bg-surface-card">
                  <img
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80"
                    alt="Restorasi Mangrove dan Lingkungan"
                    className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-primary/80 backdrop-blur-xs self-start mb-1">
                      Pilar Konservasi Pesisir
                    </span>
                    <h3 className="font-bold text-lg leading-tight">
                      Penanaman 50.000 Mangrove Muara Gembong
                    </h3>
                    <p className="text-xs text-emerald-100/80 mt-1">
                      Kolaborasi PT Nusantara Energi Lestari & Yayasan Mangrove Lestari
                    </p>
                  </div>
                </div>

                {/* Floating Metric Card 1: Pengalaman & Verifikasi */}
                <div className="absolute -bottom-6 -left-6 bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-primary flex items-center justify-center font-extrabold text-base">
                    <TreePine className="w-5 h-5 text-brand-emerald" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-ink-primary">100% Terverifikasi</div>
                    <div className="text-[11px] text-ink-muted">Geotagging & Berita Acara</div>
                  </div>
                </div>

                {/* Floating Metric Card 2: Total Penyaluran */}
                <div className="absolute -top-6 -right-6 bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card hidden sm:flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-primary flex items-center justify-center font-extrabold text-base">
                    <CheckCircle2 className="w-5 h-5 text-brand-emerald" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-primary">{formatCompactIDR(totalDisbursed)}</div>
                    <div className="text-[11px] text-ink-muted">Tersalurkan Tepat Sasaran</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 4 Key Numbers Bar (Seperti di referensi: 98%, 565+, 36k, 100+) */}
      <section className="bg-surface-card border-y border-border-subtle py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
                98%
              </div>
              <div className="text-xs font-bold text-ink-primary">Tingkat Kepatuhan Program</div>
              <p className="text-[11px] text-ink-muted">Sesuai indikator keberhasilan ESG</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-brand-emerald tracking-tight">
                {formatCompactIDR(totalCommitted)}
              </div>
              <div className="text-xs font-bold text-ink-primary">Total Komitmen CSR</div>
              <p className="text-[11px] text-ink-muted">Alokasi anggaran resmi korporasi</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-ink-primary tracking-tight">
                {formatNumber(totalReached)}+
              </div>
              <div className="text-xs font-bold text-ink-primary">Penerima Manfaat Riil</div>
              <p className="text-[11px] text-ink-muted">Pelajar, nelayan, dan pelaku UMKM</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-blue-700 tracking-tight">
                100%
              </div>
              <div className="text-xs font-bold text-ink-primary">Bebas Manipulasi Ganda</div>
              <p className="text-[11px] text-ink-muted">Metodologi hitung transparan</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. About Us & Methodology Section ("Building Greener Future Together And Protect") */}
      <section id="tentang" className="py-20 lg:py-28 bg-surface-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Collage */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&auto=format&fit=crop&q=80"
                  alt="Relawan Komunitas Sosial"
                  className="rounded-3xl w-full h-48 sm:h-56 object-cover shadow-card"
                />
                <div className="p-4 rounded-3xl bg-brand-primary text-white text-center space-y-1 shadow-card">
                  <div className="text-2xl font-extrabold">5+ Sektor</div>
                  <div className="text-[11px] text-emerald-100 font-medium">Lingkungan, Edukasi, UMKM, Sehat, Air</div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 text-center space-y-1">
                  <div className="text-2xl font-extrabold text-amber-700">8 Lembaga</div>
                  <div className="text-[11px] font-semibold">Mitra Pelaksana Terverifikasi</div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&auto=format&fit=crop&q=80"
                  alt="Pelajar Penerima Beasiswa"
                  className="rounded-3xl w-full h-48 sm:h-56 object-cover shadow-card"
                />
              </div>
            </div>

            {/* Right Text Content with Tabs */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-brand-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4 text-brand-emerald" /> Tentang Universa CSR Hub
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-ink-primary tracking-tight leading-tight">
                  Membangun Ekosistem Filantropi & CSR yang Kredibel dan Berkelanjutan
                </h2>
              </div>

              {/* Interactive Tabs: Visi, Misi, Metode */}
              <div className="flex items-center gap-2 p-1 bg-surface-secondary rounded-xl border border-border-subtle w-fit text-xs font-bold">
                <button
                  onClick={() => setActiveTab('visi')}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'visi' ? 'bg-surface-card text-brand-primary shadow-xs' : 'text-ink-muted hover:text-ink-primary'
                  }`}
                >
                  Visi Platform
                </button>
                <button
                  onClick={() => setActiveTab('misi')}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'misi' ? 'bg-surface-card text-brand-primary shadow-xs' : 'text-ink-muted hover:text-ink-primary'
                  }`}
                >
                  Misi Tata Kelola
                </button>
                <button
                  onClick={() => setActiveTab('metode')}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'metode' ? 'bg-surface-card text-brand-primary shadow-xs' : 'text-ink-muted hover:text-ink-primary'
                  }`}
                >
                  Metode Verifikasi
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle shadow-xs text-xs sm:text-sm text-ink-secondary leading-relaxed min-h-[140px] flex items-center">
                {activeTab === 'visi' && (
                  <p>
                    Menjadi infrastruktur digital nomor satu di Indonesia yang mentransformasi dana CSR korporasi dari sekadar bantuan sporadis menjadi <strong>investasi sosial terukur</strong> yang dapat dipertanggungjawabkan kepada masyarakat, manajemen, dan pembuat regulasi.
                  </p>
                )}
                {activeTab === 'misi' && (
                  <p>
                    1. Mengeliminasi proposal fiktif melalui kurasi ketat legalitas mitra.<br />
                    2. Mengunci pencairan dana berdasarkan milestone dan bukti lapangan (BAST & geotag).<br />
                    3. Menyediakan format laporan terstandarisasi yang siap diajukan untuk evaluasi <strong>PROPER KLHK</strong>.
                  </p>
                )}
                {activeTab === 'metode' && (
                  <p>
                    Kami menerapkan pembagian tegas antara <strong>Penerima Manfaat Unik</strong> (melalui verifikasi NIB/KTP) dan <strong>Partisipasi Kegiatan</strong> (kehadiran acara tanam pohon/pelatihan), sehingga angka penerima manfaat tidak pernah digelembungkan atau dihitung ganda.
                  </p>
                )}
              </div>

              {/* Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-ink-primary">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                  <span>Verifikasi Legalitas & Rekam Jejak Lembaga</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                  <span>Monitoring Berbasis Bukti Nyata & Foto Lapangan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                  <span>Perlindungan Privasi Data Penerima Manfaat</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                  <span>Penyusunan Laporan Dampak & PROPER Siap Cetak</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold shadow-xs hover:bg-brand-dark transition-colors"
                >
                  Jelajahi Data Lengkap di Dashboard <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Services & 4 Core CSR Program Pillars ("We Offer Different Services For Helped You") */}
      <section id="pilar" className="py-20 lg:py-28 bg-brand-dark text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <TreePine className="w-4 h-4" /> Pilar Utama Program CSR
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Program Berkelanjutan yang Didukung Universa Hub
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100/70 max-w-md leading-relaxed">
              Program CSR difokuskan pada sektor bernilai jangka panjang yang memberi dampak nyata pada lingkungan, kecerdasan generasi muda, dan ekonomi warga.
            </p>
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
                <span className="absolute top-3 left-3 bg-brand-primary/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  No. 01 • Lingkungan
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
                <span className="absolute top-3 left-3 bg-brand-primary/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  No. 02 • Pendidikan
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
                <span className="absolute top-3 left-3 bg-brand-primary/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  No. 03 • Ekonomi UMKM
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
                <span className="absolute top-3 left-3 bg-brand-primary/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  No. 04 • Air & Sanitasi
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
