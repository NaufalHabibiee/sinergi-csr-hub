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
  ArrowRight,
  Maximize2,
  ZoomIn,
  Navigation,
  Globe2
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { Program, ProgramCategory } from '../../types/csr';
import { formatCompactIDR, formatIDR, CATEGORY_LABELS } from '../../lib/formatters';

interface GISProjectMapProps {
  onSelectBooking?: (program: Program) => void;
}

interface ProjectGeoMeta {
  svgX: number;
  svgY: number;
  city: string;
  province: string;
  island: string;
  gps: string;
  elevation: string;
  color: string;
  badgeBg: string;
  image: string;
}

// Precise SVG Coordinates based on 1000 x 480 Indonesian projection
const GIS_PROJECT_COORDINATES: Record<string, ProjectGeoMeta> = {
  prg_001: {
    svgX: 308,
    svgY: 342,
    city: 'Muara Gembong, Bekasi',
    province: 'Jawa Barat',
    island: 'Jawa',
    gps: '5°55\'12"S 107°00\'34"E',
    elevation: '2 mdpl (Pesisir Pantai)',
    color: '#059669',
    badgeBg: 'bg-emerald-500',
    image: '/images/volunteers_planting_saplings.jpg'
  },
  prg_002: {
    svgX: 378,
    svgY: 352,
    city: 'Semarang & Solo',
    province: 'Jawa Tengah',
    island: 'Jawa',
    gps: '6°59\'36"S 110°25\'12"E',
    elevation: '85 mdpl (Sentra Vokasi)',
    color: '#2563EB',
    badgeBg: 'bg-blue-500',
    image: '/images/program_beasiswa_vokasi.jpg'
  },
  prg_003: {
    svgX: 422,
    svgY: 354,
    city: 'Tuban & Lamongan',
    province: 'Jawa Timur',
    island: 'Jawa',
    gps: '6°53\'44"S 112°03\'20"E',
    elevation: '18 mdpl (Sentra Pesisir & UMKM)',
    color: '#D97706',
    badgeBg: 'bg-amber-500',
    image: '/images/program_umkm_culinary.jpg'
  },
  prg_004: {
    svgX: 700,
    svgY: 406,
    city: 'Timor Tengah Selatan (Soe)',
    province: 'Nusa Tenggara Timur',
    island: 'Nusa Tenggara',
    gps: '9°51\'30"S 124°16\'40"E',
    elevation: '830 mdpl (Dataran Tinggi Timor)',
    color: '#E11D48',
    badgeBg: 'bg-rose-500',
    image: '/images/program_stunting_posyandu.jpg'
  },
  prg_005: {
    svgX: 372,
    svgY: 376,
    city: 'Tepus, Gunungkidul',
    province: 'DI Yogyakarta',
    island: 'Jawa',
    gps: '8°08\'15"S 110°38\'50"E',
    elevation: '210 mdpl (Kawasan Karst Pegunungan Sewu)',
    color: '#0891B2',
    badgeBg: 'bg-cyan-500',
    image: '/images/program_water_solar.jpg'
  },
  prg_006: {
    svgX: 182,
    svgY: 206,
    city: 'Teluk Meranti & Langgam, Pelalawan',
    province: 'Riau',
    island: 'Sumatera',
    gps: '0°19\'40"N 101°52\'18"E',
    elevation: '12 mdpl (Lansekap Gambut Kampar)',
    color: '#15803D',
    badgeBg: 'bg-green-600',
    image: '/images/program_peatland_patrol.jpg'
  },
  prg_007: {
    svgX: 295,
    svgY: 346,
    city: 'Kalideres & Tangerang',
    province: 'DKI Jakarta & Banten',
    island: 'Jawa',
    gps: '6°10\'15"S 106°43\'28"E',
    elevation: '15 mdpl (Sentra Industri Kreatif)',
    color: '#4F46E5',
    badgeBg: 'bg-indigo-500',
    image: '/images/program_vokasi_disabilitas.jpg'
  },
  prg_008: {
    svgX: 360,
    svgY: 365,
    city: 'Sawangan & Borobudur, Magelang',
    province: 'Jawa Tengah',
    island: 'Jawa',
    gps: '7°33\'40"S 110°13\'05"E',
    elevation: '360 mdpl (Lembah Vulkanik Merapi-Sumbing)',
    color: '#16A34A',
    badgeBg: 'bg-green-500',
    image: '/images/program_lumbung_organik.jpg'
  }
};

type ViewZoomRegion = 'all' | 'jawa' | 'sumatera' | 'timor';

const REGION_VIEWBOXES: Record<ViewZoomRegion, string> = {
  all: '0 0 1000 480',
  jawa: '260 315 260 95',
  sumatera: '50 65 250 295',
  timor: '625 365 130 75'
};

export const GISProjectMap: React.FC<GISProjectMapProps> = ({ onSelectBooking }) => {
  const navigate = useNavigate();
  const { programs } = useCSRStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('prg_001');
  const [activeRegion, setActiveRegion] = useState<ViewZoomRegion>('all');
  const [hoveredProgramId, setHoveredProgramId] = useState<string | null>(null);

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

  // Auto switch zoom if program belongs to a specific region when clicked from list
  const handleSelectProgram = (progId: string) => {
    setSelectedProgramId(progId);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header & Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/90 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#176B4D] uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-[#176B4D]" />
            <span>Sistem Informasi Geospasial CSR (GIS Portal Nasional)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Peta Sebaran Spasial Proyek CSR se-Indonesia
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Menampilkan titik koordinat presisi dan sebaran 8 inisiatif keberlanjutan prioritas di wilayah Sumatera (Riau), koridor Jawa (Jabar, Jateng, Jatim, DIY, Banten), dan Kepulauan Nusa Tenggara Timur.
          </p>
        </div>

        {/* Zoom Scope Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200/60 text-xs">
            <button
              onClick={() => setActiveRegion('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeRegion === 'all'
                  ? 'bg-white text-[#176B4D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nasional (Semua)
            </button>
            <button
              onClick={() => setActiveRegion('jawa')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeRegion === 'jawa'
                  ? 'bg-white text-[#176B4D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fokus Jawa (6 Proyek)
            </button>
            <button
              onClick={() => setActiveRegion('sumatera')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeRegion === 'sumatera'
                  ? 'bg-white text-[#176B4D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sumatera / Riau
            </button>
            <button
              onClick={() => setActiveRegion('timor')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeRegion === 'timor'
                  ? 'bg-white text-[#176B4D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nusa Tenggara (TTS)
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Map Container + Selected Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center: Interactive SVG Vector Map Canvas (8 Cols) */}
        <div className="lg:col-span-8 bg-[#061B11] border border-emerald-950/80 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px] text-white select-none">
          {/* Subtle Cartographic Grid & Glowing Radiance */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#D4F63D]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Map Top Metadata Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4F63D] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4F63D]" />
              </span>
              <span className="font-mono text-emerald-300 font-bold text-[11px] tracking-wide">
                INDONESIAN ARCHIPELAGO GIS • {filteredPrograms.length} TITIK AKTIF TERVERIFIKASI
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Category Pills inside Map */}
              <div className="hidden md:flex items-center gap-1 bg-black/40 p-1 rounded-xl backdrop-blur-md border border-white/10 text-[10px]">
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'lingkungan', label: 'Lingkungan' },
                  { id: 'pendidikan', label: 'Pendidikan' },
                  { id: 'ekonomi_umkm', label: 'UMKM' },
                  { id: 'kesehatan', label: 'Kesehatan' },
                  { id: 'infrastruktur', label: 'Infrastruktur' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2 py-0.5 rounded-lg font-medium transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#10B981] text-black font-bold'
                        : 'text-emerald-200/70 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setActiveRegion('all')}
                title="Reset Zoom ke Nasional"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Realistic Vector Map Canvas */}
          <div className="relative z-10 my-2 py-2 w-full h-[340px] sm:h-[400px] flex items-center justify-center">
            <svg
              viewBox={REGION_VIEWBOXES[activeRegion]}
              className="w-full h-full object-contain transition-all duration-700 ease-in-out filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
            >
              <defs>
                {/* Island Land Gradient: Emerald to deep forest */}
                <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E6B47" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#145235" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#0B3822" stopOpacity="0.98" />
                </linearGradient>

                {/* Highlight Island Gradient */}
                <linearGradient id="highlightLandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#15803D" stopOpacity="0.98" />
                </linearGradient>

                {/* Ocean Ambient Filter */}
                <radialGradient id="oceanGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0D3825" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#061B11" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ocean Glow Backdrop */}
              <rect x="0" y="0" width="1000" height="480" fill="url(#oceanGlow)" />

              {/* Geographic Longitude / Latitude Reference Lines */}
              <g stroke="#10B981" strokeOpacity="0.12" strokeDasharray="3 4">
                {/* Equator (0°) */}
                <line x1="20" y1="195" x2="980" y2="195" />
                {/* Latitude 5°S */}
                <line x1="20" y1="310" x2="980" y2="310" />
                {/* Latitude 10°S */}
                <line x1="20" y1="425" x2="980" y2="425" />

                {/* Longitudes: 100°E, 110°E, 120°E, 130°E, 140°E */}
                <line x1="175" y1="30" x2="175" y2="460" />
                <line x1="375" y1="30" x2="375" y2="460" />
                <line x1="565" y1="30" x2="565" y2="460" />
                <line x1="755" y1="30" x2="755" y2="460" />
                <line x1="945" y1="30" x2="945" y2="460" />
              </g>

              {/* Coordinate Labels */}
              <g fill="#10B981" fillOpacity="0.35" fontSize="8" fontFamily="monospace">
                <text x="25" y="191">0° KATULISTIWA</text>
                <text x="25" y="306">5° LS</text>
                <text x="25" y="421">10° LS</text>
                <text x="178" y="45" textAnchor="middle">100° BT</text>
                <text x="378" y="45" textAnchor="middle">110° BT</text>
                <text x="568" y="45" textAnchor="middle">120° BT</text>
                <text x="758" y="45" textAnchor="middle">130° BT</text>
                <text x="948" y="45" textAnchor="middle">140° BT</text>
              </g>

              {/* ==================================================================== */}
              {/* ACCURATE INDONESIAN ISLANDS CARTOGRAPHY VECTOR PATHS                   */}
              {/* ==================================================================== */}

              {/* 1. SUMATERA (Accurate diagonal coastline NW-SE) */}
              <g className="island-group hover:opacity-95 transition-opacity">
                {/* Main Sumatra Island */}
                <path
                  d="M 64 78
                     C 70 76, 85 92, 100 108
                     C 118 122, 132 135, 148 152
                     C 162 166, 178 185, 192 208
                     C 204 225, 218 248, 230 270
                     C 242 292, 258 315, 272 342
                     C 270 348, 260 348, 252 342
                     C 242 334, 225 305, 212 285
                     C 195 260, 180 240, 160 215
                     C 142 192, 122 170, 105 145
                     C 88 122, 70 98, 62 84
                     Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                {/* Kepulauan Nias & Mentawai */}
                <ellipse cx="106" cy="198" rx="6" ry="14" transform="rotate(-35 106 198)" fill="url(#landGradient)" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.4" />
                <ellipse cx="146" cy="255" rx="5" ry="18" transform="rotate(-38 146 255)" fill="url(#landGradient)" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.4" />
                <ellipse cx="166" cy="285" rx="4" ry="12" transform="rotate(-40 166 285)" fill="url(#landGradient)" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.4" />

                {/* Bangka & Belitung */}
                <path
                  d="M 252 270 C 258 266, 266 272, 264 285 C 262 296, 255 302, 248 296 C 244 288, 246 275, 252 270 Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="0.8"
                  strokeOpacity="0.5"
                />
                <circle cx="288" cy="294" r="8" fill="url(#landGradient)" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.5" />

                {/* Batam & Bintan */}
                <circle cx="198" cy="182" r="5" fill="url(#landGradient)" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.5" />
                <circle cx="208" cy="184" r="6" fill="url(#landGradient)" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.5" />

                <text x="135" y="145" fill="#34D399" fillOpacity="0.25" fontSize="13" fontWeight="bold" letterSpacing="3">SUMATERA</text>
              </g>

              {/* 2. JAWA & MADURA (Slender horizontal island, accurate bays, Blambangan & Madura) */}
              <g className="island-group hover:opacity-95 transition-opacity">
                {/* Main Java Island */}
                <path
                  d="M 274 350
                     C 280 345, 292 344, 305 342
                     C 320 341, 335 344, 350 346
                     C 365 348, 375 350, 385 342
                     C 392 336, 400 338, 408 346
                     C 420 350, 435 352, 450 356
                     C 468 360, 485 365, 498 375
                     C 498 382, 488 385, 475 382
                     C 455 378, 435 378, 415 376
                     C 395 375, 370 376, 350 372
                     C 330 368, 310 364, 292 360
                     C 280 358, 272 355, 274 350
                     Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="1.4"
                  strokeOpacity="0.75"
                />

                {/* Pulau Madura */}
                <path
                  d="M 445 346 C 458 344, 475 344, 488 347 C 488 352, 470 353, 452 351 C 445 350, 442 348, 445 346 Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="0.9"
                  strokeOpacity="0.6"
                />

                <text x="350" y="396" fill="#34D399" fillOpacity="0.3" fontSize="12" fontWeight="bold" letterSpacing="4">PULAU JAWA</text>
              </g>

              {/* 3. BALI & NUSA TENGGARA (Chain of islands extending east) */}
              <g className="island-group hover:opacity-95 transition-opacity">
                {/* Bali */}
                <path
                  d="M 504 376 C 510 372, 520 373, 522 378 C 522 384, 514 386, 508 384 C 504 382, 502 378, 504 376 Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />
                {/* Lombok */}
                <path
                  d="M 530 374 C 538 372, 545 375, 546 381 C 545 386, 536 387, 530 383 C 528 380, 528 376, 530 374 Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="0.9"
                  strokeOpacity="0.6"
                />
                {/* Sumbawa */}
                <path
                  d="M 552 374 C 564 372, 575 378, 585 374 C 596 374, 604 378, 602 384 C 592 386, 578 384, 568 386 C 558 384, 550 380, 552 374 Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="0.9"
                  strokeOpacity="0.6"
                />
                {/* Flores */}
                <path
                  d="M 612 373 C 625 371, 645 372, 665 371 C 672 373, 672 378, 662 379 C 642 380, 625 380, 614 378 C 610 376, 610 374, 612 373 Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="0.9"
                  strokeOpacity="0.6"
                />
                {/* Sumba */}
                <path
                  d="M 610 398 C 622 396, 634 399, 638 406 C 636 412, 622 413, 612 408 C 608 404, 608 400, 610 398 Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="0.9"
                  strokeOpacity="0.6"
                />
                {/* Timor (NTT & Timor Leste) */}
                <path
                  d="M 680 408
                     C 692 400, 712 394, 730 388
                     C 736 392, 734 400, 722 408
                     C 708 416, 692 418, 680 415
                     C 676 412, 676 410, 680 408 Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="1.2"
                  strokeOpacity="0.7"
                />

                <text x="560" y="415" fill="#34D399" fillOpacity="0.25" fontSize="10" fontWeight="bold" letterSpacing="2">NUSA TENGGARA</text>
              </g>

              {/* 4. KALIMANTAN (Massive landmass, accurate capes & deltas) */}
              <g className="island-group hover:opacity-95 transition-opacity">
                <path
                  d="M 350 195
                     C 365 175, 395 155, 435 152
                     C 460 152, 478 162, 480 180
                     C 482 195, 492 208, 485 225
                     C 475 240, 468 255, 465 272
                     C 460 288, 448 310, 432 312
                     C 415 314, 390 316, 375 305
                     C 358 290, 350 268, 345 245
                     C 342 225, 345 208, 350 195
                     Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="1.2"
                  strokeOpacity="0.55"
                />
                <text x="390" y="240" fill="#34D399" fillOpacity="0.25" fontSize="13" fontWeight="bold" letterSpacing="3">KALIMANTAN</text>
              </g>

              {/* 5. SULAWESI (Iconic 4-armed K-shape) */}
              <g className="island-group hover:opacity-95 transition-opacity">
                {/* 4-armed shape */}
                <path
                  d="M 505 210
                     C 508 185, 525 168, 550 162
                     C 568 158, 582 148, 588 145
                     C 588 152, 574 165, 560 172
                     C 542 180, 528 198, 524 218
                     C 535 220, 552 222, 570 228
                     C 572 235, 560 238, 545 238
                     C 530 238, 525 248, 526 260
                     C 535 264, 550 270, 558 280
                     C 555 295, 548 315, 548 322
                     C 540 322, 532 300, 525 284
                     C 518 270, 514 265, 510 265
                     C 506 280, 502 302, 500 318
                     C 495 318, 495 300, 500 275
                     C 504 250, 502 230, 505 210
                     Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="1.2"
                  strokeOpacity="0.55"
                />
                <text x="532" y="215" fill="#34D399" fillOpacity="0.25" fontSize="11" fontWeight="bold" letterSpacing="2">SULAWESI</text>
              </g>

              {/* 6. MALUKU & MALUKU UTARA */}
              <g className="island-group hover:opacity-95 transition-opacity">
                {/* Halmahera */}
                <path
                  d="M 640 152 C 648 148, 655 158, 650 168 C 658 172, 658 182, 650 188 C 644 186, 638 174, 640 168 C 634 162, 635 154, 640 152 Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="0.8"
                  strokeOpacity="0.5"
                />
                {/* Seram & Buru */}
                <ellipse cx="624" cy="265" rx="12" ry="7" fill="url(#landGradient)" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.5" />
                <path d="M 650 260 C 670 258, 690 262, 700 266 C 695 272, 672 270, 650 266 Z" fill="url(#landGradient)" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.5" />

                <text x="640" y="240" fill="#34D399" fillOpacity="0.2" fontSize="9" fontWeight="bold" letterSpacing="2">MALUKU</text>
              </g>

              {/* 7. PAPUA (Bird's Head / Vogelkop to PNG Border) */}
              <g className="island-group hover:opacity-95 transition-opacity">
                <path
                  d="M 748 218
                     C 755 208, 775 202, 785 208
                     C 778 220, 772 230, 765 240
                     C 752 250, 755 262, 765 264
                     C 778 266, 792 258, 805 240
                     C 820 230, 850 230, 885 235
                     C 915 240, 915 280, 915 360
                     C 890 358, 870 348, 850 332
                     C 830 315, 810 295, 798 280
                     C 788 270, 770 270, 760 255
                     C 745 245, 742 228, 748 218
                     Z"
                  fill="url(#landGradient)"
                  stroke="#34D399"
                  strokeWidth="1.2"
                  strokeOpacity="0.55"
                />
                <text x="820" y="280" fill="#34D399" fillOpacity="0.25" fontSize="14" fontWeight="bold" letterSpacing="4">PAPUA</text>
              </g>

              {/* ==================================================================== */}
              {/* INTERACTIVE GEOGRAPHIC PROJECT PINS (SVG Overlays with Pulse & Tooltip) */}
              {/* ==================================================================== */}
              {filteredPrograms.map((prog) => {
                const geo = GIS_PROJECT_COORDINATES[prog.id];
                if (!geo) return null;
                const isSelected = selectedProgramId === prog.id;
                const isHovered = hoveredProgramId === prog.id;

                return (
                  <g
                    key={prog.id}
                    className="cursor-pointer transition-transform duration-300"
                    onClick={() => handleSelectProgram(prog.id)}
                    onMouseEnter={() => setHoveredProgramId(prog.id)}
                    onMouseLeave={() => setHoveredProgramId(null)}
                  >
                    {/* Glowing Aura Ring on Selected / Hovered */}
                    {isSelected && (
                      <circle
                        cx={geo.svgX}
                        cy={geo.svgY}
                        r="24"
                        fill="#D4F63D"
                        fillOpacity="0.2"
                        className="animate-pulse"
                      />
                    )}

                    {/* Radio wave ping ring */}
                    <circle
                      cx={geo.svgX}
                      cy={geo.svgY}
                      r={isSelected ? "14" : "10"}
                      fill="none"
                      stroke={isSelected ? "#D4F63D" : geo.color}
                      strokeWidth={isSelected ? "2" : "1"}
                      strokeOpacity={isSelected ? "0.8" : "0.5"}
                      className={isSelected ? "animate-ping" : ""}
                      style={{ transformOrigin: `${geo.svgX}px ${geo.svgY}px` }}
                    />

                    {/* Anchor Pin Base Dot */}
                    <circle
                      cx={geo.svgX}
                      cy={geo.svgY}
                      r="4"
                      fill="#FFFFFF"
                      stroke={geo.color}
                      strokeWidth="2"
                    />

                    {/* Elevated Map Marker Icon */}
                    <g transform={`translate(${geo.svgX - 12}, ${geo.svgY - 28})`}>
                      <path
                        d="M 12 0 C 5.37 0 0 5.37 0 12 C 0 18.5 8 26 12 28 C 16 26 24 18.5 24 12 C 24 5.37 18.63 0 12 0 Z"
                        fill={isSelected ? "#D4F63D" : "#FFFFFF"}
                        stroke={isSelected ? "#0B2518" : geo.color}
                        strokeWidth="1.5"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
                      />
                      <circle
                        cx="12"
                        cy="11"
                        r="4"
                        fill={isSelected ? "#0B2518" : geo.color}
                      />
                    </g>

                    {/* Mini City & Category Tag Pill */}
                    {(isSelected || isHovered || activeRegion !== 'all') && (
                      <g transform={`translate(${geo.svgX}, ${geo.svgY - 34})`}>
                        <rect
                          x={-(geo.city.length * 3.4 + 14)}
                          y="-14"
                          width={(geo.city.length * 6.8 + 28)}
                          height="18"
                          rx="9"
                          fill={isSelected ? "#D4F63D" : "#092216"}
                          stroke={isSelected ? "#0B2518" : "#10B981"}
                          strokeWidth="1"
                          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))"
                        />
                        <text
                          x="0"
                          y="-2"
                          textAnchor="middle"
                          fill={isSelected ? "#072418" : "#FFFFFF"}
                          fontSize="8.5"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {geo.city}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Footer Regional Information Bar */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-emerald-200">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4F63D]" />
                8 Titik Proyek Strategis
              </span>
              <span className="text-white/20">•</span>
              <span className="text-emerald-300 font-mono text-[11px]">
                {activeGeo?.island}: {activeGeo?.province} ({activeGeo?.gps})
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-emerald-200/90 font-mono">
              <Navigation className="w-3.5 h-3.5 text-[#D4F63D]" />
              <span>Klik pin pada peta untuk mengunci inspeksi</span>
            </div>
          </div>
        </div>

        {/* Right: Selected Program Detailed Inspection Card (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/90 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Inspeksi Titik Geografis Terpilih
              </span>
              <span className="font-mono text-xs font-bold text-[#176B4D]">
                {activeProgram.code}
              </span>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {activeProgram.status.toUpperCase()}
            </span>
          </div>

          {/* Program Photo with GPS Overlay */}
          <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 shadow-inner group">
            <img
              src={activeGeo?.image || '/images/volunteers_planting_saplings.jpg'}
              alt={activeProgram.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute top-2.5 left-2.5 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#D4F63D]" />
              <span>{activeGeo?.province}</span>
            </div>

            <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white text-[11px] font-mono leading-tight bg-black/50 p-2 rounded-xl backdrop-blur-md border border-white/10">
              <div className="text-[#D4F63D] font-bold truncate">{activeGeo?.city}</div>
              <div className="text-white/80 text-[10px] truncate">{activeGeo?.gps} • {activeGeo?.elevation}</div>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
              {CATEGORY_LABELS[activeProgram.category]?.label || activeProgram.category}
            </div>
            <h3 className="font-bold text-base text-slate-900 leading-snug">
              {activeProgram.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
              {activeProgram.summary}
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">Pagu Anggaran:</span>
              <span className="font-extrabold text-[#176B4D] text-sm">
                {formatCompactIDR(activeProgram.proposedBudget)}
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">Target Penerima:</span>
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
                className="h-full bg-[#176B4D] rounded-full transition-all duration-500"
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
                <Handshake className="w-4 h-4 text-[#D4F63D]" />
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
