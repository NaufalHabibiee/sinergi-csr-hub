import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Building2,
  Users,
  Handshake,
  CheckCircle2,
  ExternalLink,
  Filter,
  Layers,
  Sparkles,
  Info,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { Program, ProgramCategory } from '../../types/csr';
import { formatCompactIDR, formatIDR, CATEGORY_LABELS } from '../../lib/formatters';

interface GISProjectMapProps {
  onSelectBooking?: (program: Program) => void;
}

// Coordinate positions mapped onto SVG canvas (viewBox 0 0 1000 480)
const GIS_PROJECT_COORDINATES: Record<
  string,
  {
    x: number; // percentage X
    y: number; // percentage Y
    city: string;
    island: string;
    color: string;
    badgeBg: string;
    image: string;
  }
> = {
  prg_001: {
    x: 28.5,
    y: 64.0,
    city: 'Muara Gembong, Bekasi',
    island: 'Jawa',
    color: '#059669',
    badgeBg: 'bg-emerald-500',
    image: '/images/volunteers_planting_saplings.jpg'
  },
  prg_002: {
    x: 35.5,
    y: 67.5,
    city: 'Semarang & Solo',
    island: 'Jawa',
    color: '#2563EB',
    badgeBg: 'bg-blue-500',
    image: '/images/program_beasiswa_vokasi.jpg'
  },
  prg_003: {
    x: 41.5,
    y: 68.0,
    city: 'Tuban & Lamongan',
    island: 'Jawa',
    color: '#D97706',
    badgeBg: 'bg-amber-500',
    image: '/images/program_umkm_culinary.jpg'
  },
  prg_004: {
    x: 64.0,
    y: 77.0,
    city: 'Timor Tengah Selatan',
    island: 'Nusa Tenggara',
    color: '#E11D48',
    badgeBg: 'bg-rose-500',
    image: '/images/program_stunting_posyandu.jpg'
  },
  prg_005: {
    x: 34.5,
    y: 71.5,
    city: 'Tepus, Gunungkidul',
    island: 'Jawa',
    color: '#0891B2',
    badgeBg: 'bg-cyan-500',
    image: '/images/program_water_solar.jpg'
  },
  prg_006: {
    x: 19.5,
    y: 38.0,
    city: 'Pelalawan',
    island: 'Sumatera',
    color: '#15803D',
    badgeBg: 'bg-green-600',
    image: '/images/program_peatland_patrol.jpg'
  },
  prg_007: {
    x: 26.5,
    y: 63.5,
    city: 'Jakarta Barat & Tangerang',
    island: 'Jawa',
    color: '#4F46E5',
    badgeBg: 'bg-indigo-500',
    image: '/images/program_vokasi_disabilitas.jpg'
  },
  prg_008: {
    x: 33.5,
    y: 68.5,
    city: 'Magelang',
    island: 'Jawa',
    color: '#16A34A',
    badgeBg: 'bg-green-500',
    image: '/images/program_lumbung_organik.jpg'
  }
};

export const GISProjectMap: React.FC<GISProjectMapProps> = ({ onSelectBooking }) => {
  const navigate = useNavigate();
  const { programs } = useCSRStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('prg_001');

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      if (selectedCategory === 'all') return true;
      return p.category === selectedCategory;
    });
  }, [programs, selectedCategory]);

  const activeProgram = useMemo(() => {
    return programs.find((p) => p.id === selectedProgramId) || programs[0];
  }, [programs, selectedProgramId]);

  const activeGeo = activeProgram ? GIS_PROJECT_COORDINATES[activeProgram.id] : null;

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header & Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/90 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#176B4D] uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-[#176B4D]" />
            <span>Sistem Informasi Geospasial CSR (GIS Portal)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Peta Sebaran Spasial Proyek CSR se-Indonesia
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Menampilkan titik koordinat dan persebaran 8 inisiatif keberlanjutan prioritas di wilayah Jawa Barat, Jawa Tengah, Jawa Timur, DI Yogyakarta, Sumatera, dan Nusa Tenggara Timur.
          </p>
        </div>

        {/* Sector Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 self-start lg:self-auto">
          {[
            { id: 'all', label: 'Semua Sektor' },
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
                  : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive Map Container + Selected Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center: Interactive SVG Vector Map Canvas (8 Cols) */}
        <div className="lg:col-span-8 bg-[#092216] border border-emerald-950/60 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[440px] text-white">
          {/* Subtle Map Gridlines & Ambient Glow */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#D4F63D]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Map Top Metadata Bar */}
          <div className="relative z-10 flex items-center justify-between text-xs border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4F63D] animate-ping" />
              <span className="font-mono text-emerald-300 font-bold text-[11px]">
                LIVE COORDINATES • {filteredPrograms.length} TITIK AKTIF
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px] text-emerald-200/70 font-mono">
              <span>LAT: 0°45&apos;S - 10°20&apos;S</span>
              <span>LONG: 98°E - 124°E</span>
            </div>
          </div>

          {/* Vector Map Surface */}
          <div className="relative z-10 my-4 py-4 w-full h-[320px] sm:h-[360px] flex items-center justify-center">
            {/* SVG Base Silhouettes for Indonesia */}
            <svg
              viewBox="0 0 1000 480"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
            >
              <defs>
                <linearGradient id="islandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14532D" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#0B3822" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Maritime Coordinates Lines */}
              <line x1="100" y1="240" x2="900" y2="240" stroke="#10B981" strokeOpacity="0.1" strokeDasharray="4 4" />
              <line x1="450" y1="60" x2="450" y2="420" stroke="#10B981" strokeOpacity="0.1" strokeDasharray="4 4" />

              {/* Sumatera Island Silhouette */}
              <path
                d="M 120 160 Q 150 110 200 90 Q 230 110 260 180 Q 280 260 300 320 Q 270 340 230 300 Q 180 230 140 180 Z"
                fill="url(#islandGrad)"
                stroke="#10B981"
                strokeWidth="1.2"
                strokeOpacity="0.35"
              />

              {/* Jawa & Madura Islands Silhouette */}
              <path
                d="M 260 325 Q 320 320 400 330 Q 470 345 520 355 Q 530 375 490 380 Q 420 375 350 370 Q 280 365 255 345 Z"
                fill="url(#islandGrad)"
                stroke="#10B981"
                strokeWidth="1.2"
                strokeOpacity="0.4"
              />

              {/* Kalimantan Island Silhouette */}
              <path
                d="M 330 160 Q 400 130 460 150 Q 490 200 470 270 Q 430 300 380 290 Q 320 270 320 210 Z"
                fill="url(#islandGrad)"
                stroke="#10B981"
                strokeWidth="1.2"
                strokeOpacity="0.25"
              />

              {/* Sulawesi Island Silhouette */}
              <path
                d="M 520 190 Q 560 150 580 180 Q 590 220 560 250 Q 570 300 550 330 Q 530 310 540 270 Q 510 240 515 210 Z"
                fill="url(#islandGrad)"
                stroke="#10B981"
                strokeWidth="1.2"
                strokeOpacity="0.25"
              />

              {/* Bali, Lombok, Sumbawa, Flores, Timor Islands Silhouette */}
              <path
                d="M 535 365 Q 560 368 590 372 Q 620 378 680 385 Q 710 395 720 405 Q 670 410 610 398 Q 550 385 530 375 Z"
                fill="url(#islandGrad)"
                stroke="#10B981"
                strokeWidth="1.2"
                strokeOpacity="0.4"
              />

              {/* Papua Island Silhouette */}
              <path
                d="M 740 240 Q 820 220 890 240 Q 920 300 890 360 Q 840 370 780 340 Q 750 300 730 260 Z"
                fill="url(#islandGrad)"
                stroke="#10B981"
                strokeWidth="1.2"
                strokeOpacity="0.2"
              />
            </svg>

            {/* Interactive Pins Placed on Coordinates */}
            {filteredPrograms.map((prog) => {
              const geo = GIS_PROJECT_COORDINATES[prog.id];
              if (!geo) return null;
              const isSelected = selectedProgramId === prog.id;

              return (
                <div
                  key={prog.id}
                  onClick={() => setSelectedProgramId(prog.id)}
                  style={{ left: `${geo.x}%`, top: `${geo.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  {/* Ping Animation on Active/Selected */}
                  <span
                    className={`absolute -inset-2 rounded-full opacity-60 animate-ping ${
                      isSelected ? 'bg-[#D4F63D]' : 'bg-emerald-400 group-hover:block hidden'
                    }`}
                  />

                  {/* Marker Pin Icon */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${
                      isSelected
                        ? 'bg-[#D4F63D] text-[#072418] scale-125 ring-4 ring-[#D4F63D]/30'
                        : 'bg-white text-slate-900 group-hover:scale-110'
                    }`}
                  >
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>

                  {/* Floating Micro-Badge */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 -top-7 px-2 py-0.5 rounded-md whitespace-nowrap text-[9px] font-bold shadow-md transition-all ${
                      isSelected
                        ? 'bg-[#D4F63D] text-[#072418] opacity-100 scale-100'
                        : 'bg-slate-900/90 text-white opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100'
                    }`}
                  >
                    {geo.city}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Footer Regional Statistics */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 text-emerald-200">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                6 Provinsi Terjangkau
              </span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="hidden sm:inline">Pesisir, Karst, Gambut, Kota</span>
            </div>

            <span className="text-[11px] text-emerald-200/80 font-mono">
              Klik pin lokasi untuk memeriksa rincian program
            </span>
          </div>
        </div>

        {/* Right: Selected Program Inspection Card (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/90 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Inspeksi Titik Proyek Terpilih
              </span>
              <span className="font-mono text-xs font-bold text-[#176B4D]">
                {activeProgram.code}
              </span>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {activeProgram.status.toUpperCase()}
            </span>
          </div>

          {/* Program Photo */}
          <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100">
            <img
              src={activeGeo?.image || '/images/volunteers_planting_saplings.jpg'}
              alt={activeProgram.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2.5 left-2.5 bg-black/60 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md">
              {activeGeo?.island || 'Jawa'} • {activeGeo?.city}
            </span>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-base text-slate-900 leading-snug">
              {activeProgram.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
              {activeProgram.summary}
            </p>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl">
              <span className="text-[10px] text-slate-400 font-medium block">Pagu Anggaran:</span>
              <span className="font-extrabold text-[#176B4D] text-sm">
                {formatCompactIDR(activeProgram.proposedBudget)}
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl">
              <span className="text-[10px] text-slate-400 font-medium block">Target Manfaat:</span>
              <span className="font-extrabold text-slate-800 text-sm">
                {activeProgram.targetBeneficiaries.toLocaleString('id-ID')} Jiwa
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Progres Realisasi Lapangan</span>
              <span className="font-bold text-slate-800">{activeProgram.progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#176B4D] rounded-full"
                style={{ width: `${activeProgram.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            {onSelectBooking && (
              <button
                type="button"
                onClick={() => onSelectBooking(activeProgram)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold transition-all shadow-sm shadow-[#176B4D]/20 cursor-pointer"
              >
                <Handshake className="w-4 h-4" />
                <span>Booking &amp; Nyatakan Minat Pendanaan</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => navigate(`/dashboard/programs/${activeProgram.id}`)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
            >
              <span>Buka Dokumen Detail Program</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
