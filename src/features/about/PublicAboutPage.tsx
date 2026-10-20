import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  TreePine,
  ArrowRight,
  BookOpen,
  Menu,
  X,
  FileCheck2,
  Target,
  HeartHandshake,
  ExternalLink,
  ChevronRight,
  Coins,
  Globe2,
  Building2
} from 'lucide-react';
import { CSRMenuBookModal } from '../programs/CSRMenuBookModal';
import { HeaderUserProfile, HeaderUserProfileMobile } from '../../components/layout/HeaderUserProfile';
import { SEED_PROGRAMS, SEED_FUNDERS, SEED_PARTNERS } from '../../data/seedData';
import { formatCompactIDR, formatNumber } from '../../lib/formatters';

export const PublicAboutPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuBookOpen, setIsMenuBookOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBFDFB] text-slate-800 font-sans selection:bg-[#D4F63D] selection:text-black">
      {/* 1. Universal Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-black border-b border-white/10 text-white backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
              <img
                src="/brand/sinergicsr-logo-white.png"
                alt="SinergiCSR"
                className="h-8 sm:h-9 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-white/80">
            <Link to="/" className="hover:text-[#D4F63D] transition-colors">
              Beranda
            </Link>
            <Link to="/about" className="text-[#D4F63D] font-bold transition-colors">
              Tentang Kami
            </Link>
            <Link to="/programs" className="hover:text-[#D4F63D] transition-colors">
              Program
            </Link>
            <Link to="/#ekosistem" className="hover:text-[#D4F63D] transition-colors">
              Alur Ekosistem
            </Link>
            <Link to="/#dampak" className="hover:text-[#D4F63D] transition-colors">
              Dampak
            </Link>
            <Link to="/#mitra" className="hover:text-[#D4F63D] transition-colors">
              Mitra
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <HeaderUserProfile isDarkNavbar={true} />

            <Link
              to="/dashboard"
              className="px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs font-bold bg-[#D4F63D] hover:bg-[#C2E82E] text-black transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
              <span>Dashboard</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-b border-white/10 px-5 py-4 space-y-3 text-xs font-medium text-white/90 backdrop-blur-md">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D4F63D]">
              Beranda Utama
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-[#D4F63D] font-bold">
              Tentang Kami
            </Link>
            <Link to="/programs" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D4F63D]">
              Direktori Program
            </Link>
            <Link to="/#ekosistem" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D4F63D]">
              Alur Ekosistem
            </Link>
            <Link to="/#dampak" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D4F63D]">
              Dampak &amp; Audit
            </Link>
            <Link to="/#mitra" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D4F63D]">
              Mitra Funder
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsMenuBookOpen(true);
              }}
              className="w-full text-left py-1.5 hover:text-[#D4F63D] flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4F63D]" />
              <span>Buka Buku Menu CSR</span>
            </button>
            <HeaderUserProfileMobile
              onClose={() => setMobileMenuOpen(false)}
              isDarkTheme={true}
            />
          </div>
        )}
      </header>

      {/* 2. Hero Header Banner (Matching Reference Layout) */}
      <section className="relative text-white py-20 sm:py-28 overflow-hidden bg-[#0A120D]">
        {/* Background Photography with Emerald Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/forest_sunbeam_epic.jpg"
            alt="Lanskap Alam & Konservasi SinergiCSR"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A120D] via-black/60 to-black/75" />
          <div className="absolute inset-0 bg-emerald-950/40" />
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
            About Us
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm lg:text-base text-emerald-100/90 leading-relaxed max-w-2xl mx-auto drop-shadow-xs font-normal">
            Platform orkestrator tata kelola dampak sosial, pemberdayaan masyarakat, dan kepatuhan ESG pertama di Indonesia yang menghubungkan komitmen dunia usaha dengan kebutuhan riil masyarakat secara transparan, berbasis data, dan berlandaskan hukum.
          </p>

          {/* Breadcrumb Navigation (Matching Reference: Home >> About Us) */}
          <div className="pt-3 inline-flex items-center gap-2 text-xs font-semibold text-white/80">
            <Link to="/" className="hover:text-[#D4F63D] transition-colors">
              Home
            </Link>
            <span className="text-[#D4F63D]">&gt;&gt;</span>
            <span className="text-[#D4F63D] font-bold">About Us</span>
          </div>
        </div>
      </section>

      {/* 3. Section 1: Showcase Grid (Inspired by Reference: A Paradise Village + Photo Collage + Authentic Culture) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Block: About Headline, Narrative & 4 Stats Counters */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#176B4D] uppercase tracking-wider block">
                About SinergiCSR
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2518] tracking-tight leading-tight">
                Infrastruktur Kemitraan Berkelanjutan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Kami membangun standar baru tata kelola program tanggung jawab sosial perusahaan. Setiap inisiatif dirancang terbebas dari klaim fiktif, terukur secara sosial (SROI), dan terikat perjanjian resmi Berita Acara Serah Terima (BAST).
              </p>
            </div>

            {/* 4 Stats Grid (Matching 2x2 Counters in Reference) */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-black text-[#0B2518] block">
                  20+
                </span>
                <span className="text-xs text-slate-500 font-medium">Program Terkurasi</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-black text-[#176B4D] block">
                  100%
                </span>
                <span className="text-xs text-slate-500 font-medium">Kepatuhan BAST Sah</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-black text-[#0B2518] block">
                  Top 10
                </span>
                <span className="text-xs text-slate-500 font-medium">Hub Inovasi ESG</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-black text-[#176B4D] block">
                  7+
                </span>
                <span className="text-xs text-slate-500 font-medium">Provinsi Terjangkau</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Lihat Portofolio Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Center Block: Overlapping Multi-Photo Collage (Directly Matching Reference) */}
          <div className="lg:col-span-4 relative flex items-center justify-center py-6 lg:py-0">
            <div className="relative w-full max-w-sm space-y-3">
              {/* Top Photo */}
              <div className="w-3/4 rounded-2xl overflow-hidden shadow-md border border-slate-150 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <img
                  src="/images/sunlit_mangrove_drone.jpg"
                  alt="Restorasi Pesisir dan Mangrove"
                  className="w-full h-36 object-cover"
                />
              </div>

              {/* Main Center Photo with Badge */}
              <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border-2 border-white transform translate-x-4 sm:translate-x-6 hover:scale-102 transition-transform duration-300">
                <img
                  src="/images/volunteers_planting_field.jpg"
                  alt="Aktivitas Lapangan SinergiCSR"
                  className="w-full h-48 sm:h-52 object-cover"
                />
                {/* Green badge overlaid on photo matching reference ('Embrace the tradition') */}
                <div className="absolute bottom-3 right-3 bg-[#176B4D] text-white p-3 rounded-2xl shadow-lg flex items-center gap-2.5 backdrop-blur-xs">
                  <TreePine className="w-5 h-5 text-[#D4F63D] shrink-0" />
                  <div className="text-left">
                    <span className="text-[10px] font-bold block leading-tight text-white/90">Lestari &amp; Mandiri</span>
                    <span className="text-[9px] text-emerald-200 block">Sinergi Gotong Royong</span>
                  </div>
                </div>
              </div>

              {/* Bottom Photo */}
              <div className="w-4/5 rounded-2xl overflow-hidden shadow-md border border-slate-150 transform rotate-1 translate-x-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="/images/community_teamwork_hands.jpg"
                  alt="Pemberdayaan Komunitas Lokal"
                  className="w-full h-36 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Block: Authentic Impact Narrative & Bulleted Checklist (Matching Reference) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2518] tracking-tight leading-snug">
                Dampak Otentik Berakar pada Nilai Transparansi
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Platform kami memberikan kepastian kepatuhan hukum penuh bagi Dewan Direksi dan Komite Keberlanjutan perseroan. Seluruh alur program terverifikasi secara multi-pihak:
              </p>
            </div>

            {/* Bulleted Points with Custom Styled Marks */}
            <div className="space-y-3 pt-1 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span><strong>Bebas Klaim Fiktif</strong> dengan validasi identitas NIK/NIB unik di lapangan.</span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span><strong>Kepatuhan Audit PROPER KLHK</strong> memenuhi standar Kriteria Emas &amp; Hijau.</span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span><strong>Insentif Tax Deduction</strong> sah sesuai UU PT No. 40/2007 &amp; PP 47/2012.</span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span><strong>Nol Overlap dengan APBD</strong> diselaraskan langsung dengan Musrenbang Daerah.</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 italic">
              * Terverifikasi melalui audit Berita Acara Serah Terima (BAST) dan penilaian SROI berkala.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Panoramic Middle Banner (Matching Reference: Endless beauty, natural charm) */}
      <section className="relative py-24 sm:py-32 overflow-hidden text-white text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/lush_sunlit_forest_canopy.jpg"
            alt="Keasrian Lanskap Indonesia"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[#072418]/75 to-black/80" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
          <span className="text-xs uppercase font-bold tracking-widest text-[#D4F63D] block">
            Discover SinergiCSR
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
            Sinergi Nyata, Mengukir Jejak Keberlanjutan di Bumi Nusantara
          </h2>
          <p className="text-xs sm:text-sm text-white/85 max-w-2xl mx-auto leading-relaxed">
            Menyatukan energi korporasi multinasional, BUMN, lembaga swadaya masyarakat, dan kelompok tani dalam orkestrasi masa depan yang lestari dan berkeadilan.
          </p>

          <div className="pt-4">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 hover:border-[#D4F63D] bg-white/10 hover:bg-white/20 backdrop-blur-md text-white hover:text-[#D4F63D] text-xs font-bold transition-all shadow-lg"
            >
              <span>Eksplorasi Katalog Program</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Section 2: Why Choose Us (Matching Reference: Why Villagex / Perfect Destination with 4 Green Square Icons) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Overlapping Photos with Frosted Badges */}
          <div className="lg:col-span-6 relative">
            <div className="relative space-y-4">
              {/* Photo 1 */}
              <div className="w-5/6 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src="/images/program_water_solar.jpg"
                  alt="Infrastruktur Air Bersih Berdaya Surya"
                  className="w-full h-56 sm:h-64 object-cover"
                />
              </div>

              {/* Photo 2 (Overlapping) */}
              <div className="w-4/5 ml-auto -mt-20 sm:-mt-24 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/program_beasiswa_vokasi.jpg"
                  alt="Generasi Emas Vokasi"
                  className="w-full h-52 sm:h-60 object-cover"
                />
              </div>

              {/* Frosted Glass Badges (Matching 'Serenity' / 'Tranquility' in Reference) */}
              <div className="absolute top-1/2 left-2 -translate-y-1/2 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl max-w-[210px] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#176B4D]">
                  <ShieldCheck className="w-4 h-4 text-[#176B4D]" />
                  <span>Transparansi 100%</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Tiap rupiah dana tercatat dalam buku besar dan diverifikasi BAST resmi.
                </p>
              </div>

              <div className="absolute bottom-6 right-6 p-3.5 rounded-2xl bg-[#0B2518]/90 text-white backdrop-blur-md border border-white/20 shadow-xl max-w-[220px] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4F63D]">
                  <Sparkles className="w-4 h-4 text-[#D4F63D]" />
                  <span>Dampak Terukur</span>
                </div>
                <p className="text-[10px] text-white/80 leading-tight">
                  Evaluasi rasio pengembalian sosial (SROI) dan kepatuhan 17 pilar SDGs.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Why Choose Us + 4 Stacked Icon Items (Matching Reference) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#176B4D] uppercase tracking-wider block">
                Why SinergiCSR
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2518] tracking-tight leading-tight">
                Solusi Tepat untuk Tata Kelola Investasi Sosial Perusahaan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Kami menyediakan instrumen terintegrasi yang memudahkan Corporate Secretary, Divisi CSR, dan Yayasan dalam mengawal setiap fase siklus proyek kemitraan:
              </p>
            </div>

            {/* 4 Feature Items with Green Square Icons (Matching Reference) */}
            <div className="space-y-4 pt-2">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all border border-slate-150/70">
                <div className="w-12 h-12 rounded-xl bg-[#176B4D] text-white flex items-center justify-center shrink-0">
                  <Coins className="w-6 h-6 text-[#D4F63D]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0B2518]">
                    Alokasi Pagu Anggaran Terstandar RAB
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Struktur biaya kegiatan terstandar rasional, mencegah *overbudget*, dan siap diaudit kantor akuntan publik.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all border border-slate-150/70">
                <div className="w-12 h-12 rounded-xl bg-[#176B4D] text-white flex items-center justify-center shrink-0">
                  <FileCheck2 className="w-6 h-6 text-[#D4F63D]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0B2518]">
                    Penyaluran Bertahap Terkunci BAST
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Dana kemitraan dicairkan per termin milestone fisik yang diverifikasi Berita Acara Serah Terima sah secara hukum.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all border border-slate-150/70">
                <div className="w-12 h-12 rounded-xl bg-[#176B4D] text-white flex items-center justify-center shrink-0">
                  <Globe2 className="w-6 h-6 text-[#D4F63D]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0B2518]">
                    Sinkronisasi Buku Menu Daerah
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Program menjawab aspirasi riil Musrenbang pedesaan tanpa tumpang-tindih (zero overlap) dengan anggaran APBD.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all border border-slate-150/70">
                <div className="w-12 h-12 rounded-xl bg-[#176B4D] text-white flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-[#D4F63D]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0B2518]">
                    Audit PROPER KLHK &amp; Tax Deduction
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Otomasi pelaporan kepatuhan lingkungan hidup dan perlindungan hukum pemotongan pajak (tax cut hingga 5%).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section 3: Nilai Inti & Prinsip Tata Kelola (Core Values) */}
      <section className="py-20 lg:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#176B4D] uppercase tracking-wider block">
              Prinsip &amp; Nilai Dasar
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2518] tracking-tight">
              4 Pilar Filosofi SinergiCSR
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fondasi integritas yang mendasari setiap baris kode, validasi dokumen, dan pendampingan program di seluruh Nusantara.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#0B2518]">Integritas Radikal</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Keterbukaan data tanpa kompromi. Setiap rupiah komitmen dapat dilacak pergerakannya hingga serah terima fisik di komunitas.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#0B2518]">Keadilan Sosial</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fokus pemberdayaan menyasar masyarakat rentan, anak prasejahtera, penyandang disabilitas, dan daerah tertinggal 3T.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center font-bold">
                <TreePine className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#0B2518]">Kelestarian Ekologis</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Menjaga daya dukung bumi dengan perlindungan kawasan karst, restorasi hutan gambut, dan konservasi pesisir berkelanjutan.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center font-bold">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#0B2518]">Gotong Royong Modern</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Memadukan kearifan lokal Indonesia dengan teknologi platform mutakhir untuk efisiensi dan transparansi bersama.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Closing Call-to-Action Section */}
      <section className="py-20 bg-[#0B2518] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4F63D] text-xs font-bold border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-[#D4F63D]" />
            <span>KEMITRAAN CSR TRANSFORMATIF</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Mari Bergabung dalam Gerakan <br />
            <span className="text-[#D4F63D]">Sinergi Dampak Berkelanjutan</span>
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            Apakah korporasi Anda sedang mencari inisiatif yang kredibel, atau yayasan Anda memiliki program pemberdayaan berbobot? SinergiCSR siap mendampingi perjalanan dampak Anda.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/programs"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#D4F63D] hover:bg-[#C2E82E] text-black font-extrabold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Jelajahi 20 Program Terkurasi
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs transition-all cursor-pointer"
            >
              Akses Dashboard Eksekutif
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Footer (Black matching SinergiCSR sub-page standard) */}
      <footer className="bg-black text-white pt-14 pb-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            <Link to="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
              <img
                src="/brand/sinergicsr-logo-white.png"
                alt="SinergiCSR"
                className="h-8 object-contain"
              />
            </Link>

            <div className="flex flex-wrap items-center gap-6 text-xs text-white/70">
              <Link to="/" className="hover:text-[#D4F63D] transition-colors">Beranda</Link>
              <Link to="/about" className="text-[#D4F63D] font-bold">Tentang Kami</Link>
              <Link to="/programs" className="hover:text-[#D4F63D] transition-colors">Program</Link>
              <Link to="/#ekosistem" className="hover:text-[#D4F63D] transition-colors">Alur Ekosistem</Link>
              <Link to="/#dampak" className="hover:text-[#D4F63D] transition-colors">Dampak &amp; Audit</Link>
              <Link to="/#mitra" className="hover:text-[#D4F63D] transition-colors">Mitra Funder</Link>
              <Link to="/dashboard" className="text-[#D4F63D] font-bold hover:underline">Dashboard Eksekutif</Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <p>© 2026 SinergiCSR Indonesia. Sub Halaman Profil &amp; Filosofi Lembaga.</p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4F63D]" />
              <span>Berintegritas Sesuai Standar BAST &amp; PROPER KLHK</span>
            </div>
          </div>
        </div>
      </footer>

      {/* CSR Menu Book Modal */}
      <CSRMenuBookModal
        isOpen={isMenuBookOpen}
        onClose={() => setIsMenuBookOpen(false)}
        onSelectProgramForBooking={() => {}}
      />

      {/* Floating Action Button: Buku Menu CSR */}
      <aside aria-label="Akses Cepat Buku Menu CSR" className="fixed bottom-6 right-6 z-40 group">
        <button
          onClick={() => setIsMenuBookOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0B2518] hover:bg-[#176B4D] text-white shadow-2xl border border-[#D4F63D]/40 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title="Buka Buku Menu CSR & Pedoman Program"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4F63D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4F63D]"></span>
          </span>
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#D4F63D]/20 transition-colors">
            <BookOpen className="w-3.5 h-3.5 text-[#D4F63D]" />
          </div>
          <span className="text-xs font-bold tracking-wide">Buku Menu CSR</span>
        </button>
      </aside>
    </div>
  );
};
