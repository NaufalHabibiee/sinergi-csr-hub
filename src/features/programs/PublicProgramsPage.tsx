import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowRight,
  ArrowLeft,
  Handshake,
  ExternalLink,
  BookOpen,
  MapPin,
  Calendar,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Building2,
  Users,
  Coins,
  ShieldCheck,
  TrendingUp,
  Tag,
  Menu,
  X
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { Program, ProgramCategory } from '../../types/csr';
import {
  formatCompactIDR,
  formatIDR,
  formatNumber,
  CATEGORY_LABELS
} from '../../lib/formatters';
import { ProjectBookingModal } from './ProjectBookingModal';
import { CSRMenuBookModal } from './CSRMenuBookModal';

export const PublicProgramsPage: React.FC = () => {
  const navigate = useNavigate();
  const { programs, funders, partners } = useCSRStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'budget_desc' | 'budget_asc' | 'progress_desc' | 'target_desc'>('budget_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Clean grid of 8 cards per page

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBookingProgram, setSelectedBookingProgram] = useState<Program | null>(null);
  const [isMenuBookOpen, setIsMenuBookOpen] = useState(false);

  // Distinct province list extracted from active programs
  const provinceList = useMemo(() => {
    const set = new Set<string>();
    programs.forEach((p) => {
      if (p.province) set.add(p.province);
    });
    return Array.from(set);
  }, [programs]);

  // Filtered & Sorted programs
  const filteredPrograms = useMemo(() => {
    return programs
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesProvince = selectedProvince === 'all' || p.province === selectedProvince;
        const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.code.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesProvince && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'budget_desc') return b.proposedBudget - a.proposedBudget;
        if (sortBy === 'budget_asc') return a.proposedBudget - b.proposedBudget;
        if (sortBy === 'progress_desc') return b.progressPercent - a.progressPercent;
        if (sortBy === 'target_desc') return b.targetBeneficiaries - a.targetBeneficiaries;
        return 0;
      });
  }, [programs, selectedCategory, selectedProvince, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPrograms.length / pageSize) || 1;
  const paginatedPrograms = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPrograms.slice(start, start + pageSize);
  }, [filteredPrograms, currentPage, pageSize]);

  // Summary Metrics
  const totalBudget = useMemo(() => {
    return programs.reduce((acc, p) => acc + p.proposedBudget, 0);
  }, [programs]);

  const totalBeneficiaries = useMemo(() => {
    return programs.reduce((acc, p) => acc + p.targetBeneficiaries, 0);
  }, [programs]);

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

            <div className="hidden xl:flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 border border-white/10">
              <span>Katalog Direktori Program</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-white/80">
            <Link to="/" className="hover:text-[#D4F63D] transition-colors">
              Beranda
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
            <button
              onClick={() => setIsMenuBookOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all cursor-pointer border border-white/10"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4F63D]" />
              <span>Buku Menu CSR</span>
            </button>

            <Link
              to="/auth"
              className="hidden sm:inline-flex text-xs font-medium text-white/80 hover:text-white px-2 py-1.5 transition-colors"
            >
              Masuk
            </Link>

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
              ← Kembali ke Beranda Utama
            </Link>
            <Link to="/#ekosistem" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D4F63D]">
              Alur Ekosistem
            </Link>
            <Link to="/#dampak" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D4F63D]">
              Dampak
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
            <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D4F63D]">
              Halaman Masuk
            </Link>
          </div>
        )}
      </header>

      {/* 2. Hero Header Banner */}
      <section className="relative text-white py-16 sm:py-20 overflow-hidden bg-[#0A120D]">
        {/* Thematic Background Photography & Cinematic Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_sinergi_farming_golden.jpg"
            alt="Lanskap Pertanian & Konservasi SinergiCSR"
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Dark gradient overlay for pristine contrast and theme harmony */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-[#05170f]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A120D] via-transparent to-black/70" />
          {/* Subtle ambient radial glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#D4F63D]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#D4F63D] text-xs font-bold border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#D4F63D]" />
              <span>DIREKTORI KATALOG RESMI PROGRAM CSR 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
              Portofolio Program Kemitraan <br className="hidden sm:inline" />
              <span className="text-[#D4F63D]">Pemberdayaan Berkelanjutan</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-2xl drop-shadow-xs">
              Eksplorasi seluruh inisiatif terkurasi siap didanai lintas pilar Lingkungan, Pendidikan, UMKM, Kesehatan, dan Infrastruktur Air. Siap audit PROPER KLHK dan terikat BAST transparan.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 text-xs">
            <div className="bg-white/10 hover:bg-white/15 p-4 sm:p-5 rounded-2xl border border-white/15 backdrop-blur-md transition-all shadow-lg">
              <span className="text-white/70 block text-[11px] font-medium">Total Program Aktif</span>
              <span className="text-xl sm:text-2xl font-black text-white mt-1 block">
                {programs.length} Inisiatif
              </span>
              <span className="text-[10px] text-emerald-300 font-medium">Bebas klaim fiktif</span>
            </div>

            <div className="bg-white/10 hover:bg-white/15 p-4 sm:p-5 rounded-2xl border border-white/15 backdrop-blur-md transition-all shadow-lg">
              <span className="text-white/70 block text-[11px] font-medium">Total Pagu Anggaran</span>
              <span className="text-xl sm:text-2xl font-black text-[#D4F63D] mt-1 block">
                {formatCompactIDR(totalBudget)}
              </span>
              <span className="text-[10px] text-emerald-300 font-medium">Alokasi terstandar RAB</span>
            </div>

            <div className="bg-white/10 hover:bg-white/15 p-4 sm:p-5 rounded-2xl border border-white/15 backdrop-blur-md transition-all shadow-lg">
              <span className="text-white/70 block text-[11px] font-medium">Target Penerima Manfaat</span>
              <span className="text-xl sm:text-2xl font-black text-white mt-1 block">
                {formatNumber(totalBeneficiaries)} Jiwa
              </span>
              <span className="text-[10px] text-emerald-300 font-medium">NIK/NIB terverifikasi</span>
            </div>

            <div className="bg-white/10 hover:bg-white/15 p-4 sm:p-5 rounded-2xl border border-white/15 backdrop-blur-md transition-all shadow-lg">
              <span className="text-white/70 block text-[11px] font-medium">Provinsi Terjangkau</span>
              <span className="text-xl sm:text-2xl font-black text-white mt-1 block">
                {provinceList.length} Wilayah
              </span>
              <span className="text-[10px] text-emerald-300 font-medium">Pesisir, Karst &amp; Gambut</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Search, Filter Toolbar & Program Catalog Grid */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Interactive Search & Filter Controls */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
          {/* Top Row: Search Input + Region + Sort */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari nama program, kabupaten, atau kata kunci..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#176B4D] transition-colors"
              />
            </div>

            {/* Region Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Wilayah:</span>
              <select
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full md:w-48 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#176B4D]"
              >
                <option value="all">Semua Provinsi</option>
                {provinceList.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full md:w-48 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#176B4D]"
              >
                <option value="budget_desc">Pagu Terbesar</option>
                <option value="budget_asc">Pagu Terkecil</option>
                <option value="progress_desc">Progres Realisasi Tertinggi</option>
                <option value="target_desc">Penerima Manfaat Terbanyak</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Sector Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'Semua Sektor' },
              { id: 'lingkungan', label: 'Konservasi Lingkungan' },
              { id: 'pendidikan', label: 'Pendidikan & Vokasi' },
              { id: 'ekonomi_umkm', label: 'Pengembangan UMKM' },
              { id: 'kesehatan', label: 'Kesehatan & Stunting' },
              { id: 'infrastruktur', label: 'Infrastruktur Air & Energi' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#176B4D] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div>
            Menampilkan <strong className="text-slate-900">{filteredPrograms.length}</strong> program kemitraan terverifikasi
            {selectedCategory !== 'all' && <span> pada kategori terpilih</span>}
          </div>
          <div>
            Halaman {currentPage} dari {totalPages}
          </div>
        </div>

        {/* Program Cards Grid */}
        {paginatedPrograms.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Tidak ada program yang sesuai</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Coba sesuaikan kata kunci pencarian atau ubah filter kategori/provinsi yang Anda pilih.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedProvince('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#176B4D] text-white text-xs font-bold hover:bg-[#0E4D36] transition-colors cursor-pointer"
            >
              Reset Seluruh Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedPrograms.map((prog) => {
              const catInfo = CATEGORY_LABELS[prog.category];
              const partner = partners.find((p) => p.id === prog.partnerId);

              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Program Thumbnail Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={prog.thumbnailUrl || '/images/volunteers_planting_saplings.jpg'}
                        alt={prog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-900 backdrop-blur-md shadow-xs">
                          {catInfo?.label || prog.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-xs">
                          {prog.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Bottom Image Overlay: Location */}
                      <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-bold flex items-center gap-1 drop-shadow-md">
                        <MapPin className="w-3.5 h-3.5 text-[#D4F63D] shrink-0" />
                        <span className="truncate">{prog.location}, {prog.province}</span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 space-y-3">
                      <div>
                        <div className="text-[10px] font-mono font-bold text-[#176B4D]">
                          {prog.code}
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-2 leading-snug group-hover:text-[#176B4D] transition-colors mt-0.5">
                          {prog.title}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {prog.summary}
                      </p>

                      {/* Financial & Beneficiary Strip */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                        <div className="bg-slate-50 p-2 rounded-xl">
                          <span className="text-[10px] text-slate-400 block font-medium">Pagu Anggaran</span>
                          <span className="font-extrabold text-[#176B4D] text-xs">
                            {formatCompactIDR(prog.proposedBudget)}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl">
                          <span className="text-[10px] text-slate-400 block font-medium">Target Sasaran</span>
                          <span className="font-extrabold text-slate-800 text-xs">
                            {formatNumber(prog.targetBeneficiaries)} Jiwa
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>Realisasi Fisik</span>
                          <span className="font-bold text-slate-800">{prog.progressPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#176B4D] rounded-full"
                            style={{ width: `${prog.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-5 pt-0 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBookingProgram(prog);
                        setIsBookingModalOpen(true);
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Handshake className="w-3.5 h-3.5 text-[#D4F63D]" />
                      <span>Booking &amp; LOI Minat</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/dashboard/programs/${prog.id}`)}
                      className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <span>Buka Detail Lengkap</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold disabled:opacity-40 transition-colors cursor-pointer"
            >
              Sebelumnya
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#176B4D] text-white shadow-xs'
                    : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold disabled:opacity-40 transition-colors cursor-pointer"
            >
              Selanjutnya
            </button>
          </div>
        )}
      </section>

      {/* 4. Footer */}
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
              <Link to="/#ekosistem" className="hover:text-[#D4F63D] transition-colors">Alur Ekosistem</Link>
              <Link to="/#dampak" className="hover:text-[#D4F63D] transition-colors">Dampak</Link>
              <Link to="/#mitra" className="hover:text-[#D4F63D] transition-colors">Mitra Funder</Link>
              <Link to="/dashboard" className="text-[#D4F63D] font-bold hover:underline">Dashboard Eksekutif</Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/60">
            <p>© 2026 SinergiCSR Indonesia. Katalog Sub Halaman Program Kemitraan.</p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4F63D]" />
              <span>Seluruh Program Terkunci Standar BAST &amp; PROPER KLHK</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProjectBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        program={selectedBookingProgram}
      />

      <CSRMenuBookModal
        isOpen={isMenuBookOpen}
        onClose={() => setIsMenuBookOpen(false)}
        onSelectProgramForBooking={(p) => {
          setSelectedBookingProgram(p);
          setIsBookingModalOpen(true);
        }}
      />
    </div>
  );
};
