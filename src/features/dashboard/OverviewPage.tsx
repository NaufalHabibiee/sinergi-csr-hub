import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  Layers,
  Users,
  FileCheck2,
  CheckCircle2,
  Star,
  ChevronDown
} from 'lucide-react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { useCSRStore } from '../../context/CSRStoreContext';
import {
  calculatePlatformFunding,
  calculateBeneficiariesMetrics,
  calculateReportingCompletionRate
} from '../../lib/calculations';
import { formatCompactIDR, formatNumber, CATEGORY_LABELS } from '../../lib/formatters';

export const OverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    programs,
    proposals,
    fundingRecords,
    beneficiaries,
    reports,
    periodFilter,
    setPeriodFilter
  } = useCSRStore();

  const [chartRange, setChartRange] = useState('7m');

  const fundingMetrics = calculatePlatformFunding(fundingRecords);
  const benMetrics = calculateBeneficiariesMetrics(beneficiaries);
  const reportingRate = calculateReportingCompletionRate(programs, reports);

  const activePrograms = programs.filter((p) => p.status === 'active');
  const reviewNeededCount = proposals.filter(
    (p) => p.status === 'submitted' || p.status === 'under_review'
  ).length;

  // Clean bar chart data matching the 7-column rhythm of the reference
  const evolutionData = [
    { label: 'JAN', nilai: 850 },
    { label: 'FEB', nilai: 1200 },
    { label: 'MAR', nilai: 1180 },
    { label: 'APR', nilai: 1550 },
    { label: 'MEI', nilai: 1050 },
    { label: 'JUN', nilai: 1480 },
    { label: 'JUL', nilai: 1680 },
  ];

  // Category distribution for Donut Chart
  const totalAllocatedAll = programs.reduce((s, p) => s + p.allocatedAmount, 0) || 1;
  const categoryTotals: Record<string, number> = {};
  programs.forEach((p) => {
    categoryTotals[p.category] = (categoryTotals[p.category] || 0) + p.allocatedAmount;
  });

  const sectorColors = ['#176B4D', '#34A87A', '#F59E0B', '#6EE7B7', '#0D9488'];
  const categoryPieData = Object.entries(categoryTotals)
    .map(([cat, val], idx) => ({
      name: CATEGORY_LABELS[cat]?.label.split(' ')[0] || cat,
      fullName: CATEGORY_LABELS[cat]?.label || cat,
      value: val,
      percent: Math.round((val / totalAllocatedAll) * 100),
      color: sectorColors[idx % sectorColors.length],
    }))
    .slice(0, 4);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Minimalist Greeting Header & Period Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Halo, {user.displayName.split(' ')[0]} !</span>
            <span>👋</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Berikut ringkasan performa dan dampak program CSR hari ini.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <div className="relative inline-flex items-center">
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="appearance-none bg-white border border-slate-100 hover:border-slate-200 rounded-2xl pl-4 pr-9 py-2 text-xs font-semibold text-slate-700 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Waktu</option>
              <option value="2026">Tahun 2026</option>
              <option value="2025">Tahun 2025</option>
              <option value="2026-Q1">Triwulan 1</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 2. Row 1: 4 Sparkline KPI Cards (1 Primary Hero Card + 3 Minimalist White Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Hero Primary Green Card */}
        <div
          onClick={() => navigate('/dashboard/funding')}
          className="bg-gradient-to-br from-[#176B4D] to-[#0E4D36] text-white rounded-3xl p-5 shadow-lg shadow-[#176B4D]/20 flex flex-col justify-between cursor-pointer hover:translate-y-[-2px] transition-all"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-100/90">Total Komitmen CSR</span>
              <div className="w-8 h-8 rounded-full bg-white text-[#176B4D] flex items-center justify-center font-extrabold text-xs shadow-xs">
                Rp
              </div>
            </div>
            <div className="text-2xl font-extrabold tracking-tight mt-2">
              {formatCompactIDR(fundingMetrics.totalCommitted)}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-[11px]">
              <span className="font-bold text-emerald-200">▲ 12,5 %</span>
            </div>
            <span className="text-[10px] text-emerald-100/70 block mt-0.5">
              vs periode sebelumnya
            </span>
          </div>

          {/* Smooth Sparkline Wave SVG */}
          <svg viewBox="0 0 200 45" className="w-full h-11 mt-3 overflow-visible">
            <defs>
              <linearGradient id="sparkHero" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,38 Q25,24 45,30 T90,18 T140,12 T200,35 L200,45 L0,45 Z"
              fill="url(#sparkHero)"
            />
            <path
              d="M0,38 Q25,24 45,30 T90,18 T140,12 T200,35"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Card 2: Realisasi Penyaluran */}
        <div
          onClick={() => navigate('/dashboard/funding')}
          className="bg-white rounded-3xl p-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 flex flex-col justify-between cursor-pointer hover:translate-y-[-2px] transition-all"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">Realisasi Penyaluran</span>
              <div className="w-8 h-8 rounded-xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {formatCompactIDR(fundingMetrics.totalDisbursed)}
              </span>
              <span className="text-[11px] font-bold text-emerald-600">▲ 8,4 %</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">
              vs periode sebelumnya
            </span>
          </div>

          <svg viewBox="0 0 200 45" className="w-full h-11 mt-3 overflow-visible">
            <defs>
              <linearGradient id="sparkCard2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#176B4D" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#176B4D" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,36 Q30,22 60,28 T115,15 T160,22 T200,38 L200,45 L0,45 Z"
              fill="url(#sparkCard2)"
            />
            <path
              d="M0,36 Q30,22 60,28 T115,15 T160,22 T200,38"
              fill="none"
              stroke="#176B4D"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Card 3: Penerima Manfaat */}
        <div
          onClick={() => navigate('/dashboard/beneficiaries')}
          className="bg-white rounded-3xl p-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 flex flex-col justify-between cursor-pointer hover:translate-y-[-2px] transition-all"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">Penerima Manfaat</span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {formatNumber(benMetrics.totalReached)}
              </span>
              <span className="text-[11px] font-bold text-emerald-600">▲ 16,7 %</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">
              vs periode sebelumnya
            </span>
          </div>

          <svg viewBox="0 0 200 45" className="w-full h-11 mt-3 overflow-visible">
            <defs>
              <linearGradient id="sparkCard3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0D9488" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0D9488" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,38 Q35,28 70,32 T125,14 T165,24 T200,36 L200,45 L0,45 Z"
              fill="url(#sparkCard3)"
            />
            <path
              d="M0,38 Q35,28 70,32 T125,14 T165,24 T200,36"
              fill="none"
              stroke="#0D9488"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Card 4: Program CSR Aktif */}
        <div
          onClick={() => navigate('/dashboard/programs')}
          className="bg-white rounded-3xl p-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 flex flex-col justify-between cursor-pointer hover:translate-y-[-2px] transition-all"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">Program CSR Aktif</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {activePrograms.length} Program
              </span>
              <span className="text-[11px] font-bold text-emerald-600">▲ 5,5 %</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">
              dari {programs.length} total inisiatif
            </span>
          </div>

          <svg viewBox="0 0 200 45" className="w-full h-11 mt-3 overflow-visible">
            <defs>
              <linearGradient id="sparkCard4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,38 Q40,26 85,20 T145,14 T200,34 L200,45 L0,45 Z"
              fill="url(#sparkCard4)"
            />
            <path
              d="M0,38 Q40,26 85,20 T145,14 T200,34"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* 3. Row 2: 2 Clean Charts Side-by-Side (Bar Evolution + Donut Sector Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Chart (7 cols): Evolusi Penyaluran Dana */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-sm text-slate-800">
              Evolusi Penyaluran Dana CSR
            </h3>
            <div className="relative inline-flex items-center">
              <select
                value={chartRange}
                onChange={(e) => setChartRange(e.target.value)}
                className="appearance-none bg-slate-50 hover:bg-slate-100/80 rounded-xl pl-3 pr-7 py-1.5 text-[11px] font-semibold text-slate-600 focus:outline-none cursor-pointer"
              >
                <option value="7m">7 bulan terakhir</option>
                <option value="6m">6 bulan terakhir</option>
                <option value="1y">1 tahun penuh</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evolutionData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                  dy={6}
                />
                <YAxis
                  tickFormatter={(v) => `${v} Jt`}
                  tick={{ fontSize: 10, fill: '#94A3B8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#F8FAF9' }}
                  formatter={(val: any) => [`Rp ${val} Juta`, 'Penyaluran']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #F1F5F9',
                    boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                    fontSize: '12px',
                  }}
                />
                <Bar
                  dataKey="nilai"
                  fill="#176B4D"
                  radius={[8, 8, 8, 8]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart (5 cols): Distribusi Sektor Program */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 flex flex-col justify-between">
          <h3 className="font-bold text-sm text-slate-800 mb-4">
            Distribusi Sektor Program
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-auto">
            {/* Donut Chart */}
            <div className="w-44 h-44 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={76}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [formatCompactIDR(Number(val)), 'Alokasi']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #F1F5F9',
                      boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Clean Right Legend with Percentages */}
            <div className="flex-1 w-full space-y-3.5">
              {categoryPieData.map((c, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="text-slate-600 font-medium truncate" title={c.fullName}>
                      {c.name}
                    </span>
                  </div>
                  <span className="font-bold text-slate-800 shrink-0">{c.percent} %</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Row 3: 3 Horizontal Mini Metric Cards (Matches Bottom Row of Reference Screen 1) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Mini Card 1 */}
        <div
          onClick={() => navigate('/dashboard/proposals')}
          className="bg-white rounded-3xl p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 flex items-center gap-4 cursor-pointer hover:translate-y-[-2px] transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#176B4D] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#176B4D]/20">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">
              Proposal Dalam Proses
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-extrabold text-slate-900">
                {reviewNeededCount}
              </span>
              <span className="text-[11px] font-bold text-emerald-600">▲ 2</span>
              <span className="text-[10px] text-slate-400">vs minggu lalu</span>
            </div>
          </div>
        </div>

        {/* Mini Card 2 */}
        <div
          onClick={() => navigate('/dashboard/reports')}
          className="bg-white rounded-3xl p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 flex items-center gap-4 cursor-pointer hover:translate-y-[-2px] transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#34A87A] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#34A87A]/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">
              Tingkat Pelaporan Mitra
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-extrabold text-slate-900">
                {reportingRate} %
              </span>
              <span className="text-[11px] font-bold text-emerald-600">▲ 6 %</span>
              <span className="text-[10px] text-slate-400">vs bulan lalu</span>
            </div>
          </div>
        </div>

        {/* Mini Card 3 */}
        <div
          onClick={() => navigate('/dashboard/partners')}
          className="bg-white rounded-3xl p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border border-slate-100/80 flex items-center gap-4 cursor-pointer hover:translate-y-[-2px] transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-400/20">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">
              Indeks Kepuasan & Audit
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-extrabold text-slate-900">
                4,9/5
              </span>
              <span className="text-[11px] font-bold text-emerald-600">▲ 0,2</span>
              <span className="text-[10px] text-slate-400">vs periode lalu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
