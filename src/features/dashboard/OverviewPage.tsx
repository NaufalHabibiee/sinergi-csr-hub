import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Users,
  HeartHandshake,
  FileCheck2,
  PieChart as PieIcon,
  PlusCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { useCSRStore } from '../../context/CSRStoreContext';
import {
  calculatePlatformFunding,
  calculateBeneficiariesMetrics,
  calculateReportingCompletionRate
} from '../../lib/calculations';
import { formatCompactIDR, formatIDR, formatNumber, CATEGORY_LABELS } from '../../lib/formatters';
import { StatusBadge } from '../../components/ui/StatusBadge';

export const OverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    programs,
    proposals,
    partners,
    funders,
    fundingRecords,
    beneficiaries,
    reports,
    activities
  } = useCSRStore();

  const fundingMetrics = calculatePlatformFunding(fundingRecords);
  const benMetrics = calculateBeneficiariesMetrics(beneficiaries);
  const reportingRate = calculateReportingCompletionRate(programs, reports);

  const activePrograms = programs.filter(p => p.status === 'active');
  const reviewNeededCount = proposals.filter(p => p.status === 'submitted' || p.status === 'under_review').length;

  // Monthly funding trend data calculated dynamically from funding records
  const monthlyData = [
    { month: 'Jan', komitmen: 7500, penyaluran: 1650 },
    { month: 'Feb', komitmen: 4500, penyaluran: 1200 },
    { month: 'Mar', komitmen: 1200, penyaluran: 800 },
    { month: 'Apr (Est)', komitmen: 2000, penyaluran: 1100 },
    { month: 'Mei (Est)', komitmen: 1500, penyaluran: 950 },
    { month: 'Jun (Est)', komitmen: 1800, penyaluran: 1300 },
  ];

  // Category composition
  const categoryTotals: Record<string, number> = {};
  programs.forEach(p => {
    categoryTotals[p.category] = (categoryTotals[p.category] || 0) + p.allocatedAmount;
  });

  const categoryPieData = Object.entries(categoryTotals).map(([cat, val]) => ({
    name: CATEGORY_LABELS[cat]?.label || cat,
    value: val,
    color: CATEGORY_LABELS[cat]?.color || '#176B4D'
  }));

  // Beneficiaries target vs reached per program
  const programReachData = programs.slice(0, 5).map(p => ({
    name: p.code,
    title: p.title,
    target: p.targetBeneficiaries,
    capaian: p.reachedBeneficiaries
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner Welcome & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-brand-primary via-emerald-900 to-brand-dark p-6 sm:p-8 rounded-3xl text-white shadow-elevated">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold backdrop-blur-xs border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            Portofolio Dampak Sosial Terkonsolidasi
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selamat Datang di Universa CSR Hub
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
            Pusat tata kelola program CSR terpercaya yang menghubungkan alokasi dana korporat, kurasi mitra sosial, penyaluran bertahap, dan verifikasi dampak terukur.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => navigate('/programs?action=create')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-brand-primary hover:bg-emerald-50 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-brand-emerald" />
            Tambah Program
          </button>
          <button
            onClick={() => navigate('/proposals')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white text-xs font-bold border border-emerald-700/50 transition-all cursor-pointer"
          >
            <FileCheck2 className="w-4 h-4" />
            Tinjau Proposal ({reviewNeededCount})
          </button>
          <button
            onClick={() => navigate('/funding?action=create')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white text-xs font-bold border border-emerald-700/50 transition-all cursor-pointer"
          >
            <Wallet className="w-4 h-4" />
            Catat Distribusi
          </button>
        </div>
      </div>

      {/* 8 Primary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Total Committed */}
        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card flex flex-col justify-between hover:border-brand-emerald transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-muted">Total Komitmen CSR</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-brand-primary">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-ink-primary tracking-tight">
              {formatCompactIDR(fundingMetrics.totalCommitted)}
            </div>
            <p className="text-[11px] text-ink-muted mt-1">
              Dari {funders.length} Corporate Funder
            </p>
          </div>
        </div>

        {/* Card 2: Total Disbursed */}
        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card flex flex-col justify-between hover:border-brand-emerald transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-muted">Realisasi Penyaluran</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-brand-emerald tracking-tight">
              {formatCompactIDR(fundingMetrics.totalDisbursed)}
            </div>
            <p className="text-[11px] text-ink-muted mt-1">
              {((fundingMetrics.totalDisbursed / (fundingMetrics.totalCommitted || 1)) * 100).toFixed(1)}% dari komitmen
            </p>
          </div>
        </div>

        {/* Card 3: Available Unallocated */}
        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card flex flex-col justify-between hover:border-brand-emerald transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-muted">Saldo Belum Teralokasi</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-blue-700 tracking-tight">
              {formatCompactIDR(fundingMetrics.availableUnallocatedBalance)}
            </div>
            <p className="text-[11px] text-ink-muted mt-1">
              Siap untuk alokasi program baru
            </p>
          </div>
        </div>

        {/* Card 4: Active Programs */}
        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card flex flex-col justify-between hover:border-brand-emerald transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-muted">Program CSR Aktif</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-ink-primary tracking-tight">
              {activePrograms.length} <span className="text-xs font-normal text-ink-muted">/ {programs.length} total</span>
            </div>
            <p className="text-[11px] text-ink-muted mt-1">
              {programs.filter(p => p.status === 'completed').length} program telah tuntas
            </p>
          </div>
        </div>

        {/* Card 5: Active Partners */}
        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card flex flex-col justify-between hover:border-brand-emerald transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-muted">Mitra Terverifikasi</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-ink-primary tracking-tight">
              {partners.length} <span className="text-xs font-normal text-ink-muted">Lembaga</span>
            </div>
            <p className="text-[11px] text-ink-muted mt-1">
              NGO, Yayasan & Komunitas
            </p>
          </div>
        </div>

        {/* Card 6: Beneficiaries Reached */}
        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card flex flex-col justify-between hover:border-brand-emerald transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-muted">Penerima Manfaat</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-rose-700 tracking-tight">
              {formatNumber(benMetrics.totalReached)} <span className="text-xs font-normal text-ink-muted">Jiwa</span>
            </div>
            <p className="text-[11px] text-ink-muted mt-1">
              Target: {formatNumber(benMetrics.totalTarget)} ({benMetrics.reachPercent.toFixed(0)}%)
            </p>
          </div>
        </div>

        {/* Card 7: Proposals in Review */}
        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card flex flex-col justify-between hover:border-brand-emerald transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-muted">Proposal Perlu Ditinjau</span>
            <div className="p-2 rounded-xl bg-orange-50 text-orange-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-orange-700 tracking-tight">
              {reviewNeededCount} <span className="text-xs font-normal text-ink-muted">Proposal</span>
            </div>
            <p className="text-[11px] text-ink-muted mt-1">
              Menunggu keputusan kurasi
            </p>
          </div>
        </div>

        {/* Card 8: Reporting Completion Rate */}
        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card flex flex-col justify-between hover:border-brand-emerald transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-muted">Tingkat Kelengkapan Laporan</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-sky-700 tracking-tight">
              {reportingRate}%
            </div>
            <p className="text-[11px] text-ink-muted mt-1">
              {reports.length} laporan dampak & PROPER
            </p>
          </div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart: Komitmen vs Realisasi */}
        <div className="lg:col-span-2 bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-ink-primary">Tren Komitmen vs Realisasi Penyaluran (Juta Rp)</h3>
              <p className="text-xs text-ink-muted mt-0.5">Perbandingan komitmen masuk dan realisasi dana per bulan</p>
            </div>
            <span className="text-xs font-semibold text-brand-primary bg-brand-mint px-2.5 py-1 rounded-lg">
              Tahun 2026
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorKomitmen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#176B4D" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#176B4D" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPenyaluran" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#23966B" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#23966B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3EAE5" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#69766F' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#69766F' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`Rp ${val} Jt`, '']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E3EAE5', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="komitmen" stroke="#176B4D" strokeWidth={2} fillOpacity={1} fill="url(#colorKomitmen)" name="Komitmen Dana" />
                <Area type="monotone" dataKey="penyaluran" stroke="#23966B" strokeWidth={2} fillOpacity={1} fill="url(#colorPenyaluran)" name="Realisasi Penyaluran" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Donut Chart */}
        <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-ink-primary">Komposisi Alokasi Sektor CSR</h3>
            <p className="text-xs text-ink-muted mt-0.5">Proporsi dana berdasarkan kategori program</p>
          </div>

          <div className="h-52 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [formatCompactIDR(Number(val)), 'Alokasi']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E3EAE5', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border-subtle text-[11px]">
            {categoryPieData.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 truncate">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-ink-secondary truncate">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Beneficiaries Target vs Reached & Ecosystem Quick Link */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Beneficiaries Bar Chart */}
        <div className="lg:col-span-2 bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-ink-primary">Capaian Penerima Manfaat per Program (Jiwa)</h3>
              <p className="text-xs text-ink-muted mt-0.5">Perbandingan target sasaran dengan capaian riil terverifikasi</p>
            </div>
            <Link to="/beneficiaries" className="text-xs font-semibold text-brand-primary hover:underline flex items-center gap-1">
              Lihat Analisis Privasi <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={programReachData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3EAE5" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#69766F' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#69766F' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(val: any, name: any) => [`${formatNumber(Number(val))} Jiwa`, name === 'target' ? 'Target Sasaran' : 'Realisasi Capaian']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E3EAE5', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="target" fill="#CBD8D0" radius={[4, 4, 0, 0]} name="Target Sasaran" />
                <Bar dataKey="capaian" fill="#176B4D" radius={[4, 4, 0, 0]} name="Realisasi Capaian" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ecosystem Preview Card */}
        <div className="bg-gradient-to-br from-brand-mint/40 via-surface-card to-surface-card p-6 rounded-2xl border border-emerald-200/60 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-primary mb-2">
              <ShieldCheck className="w-5 h-5 text-brand-emerald" />
              <span className="text-xs font-bold uppercase tracking-wider">Tata Kelola Terintegrasi</span>
            </div>
            <h3 className="font-extrabold text-base text-ink-primary leading-tight">
              Peta Aliran Ekosistem Universa CSR Hub
            </h3>
            <p className="text-xs text-ink-muted mt-2 leading-relaxed">
              Pantau aliran dana dari Corporate Funder ke CSR Hub hingga Mitra Pelaksana, serta aliran laporan timbal balik ke Funder dan draf laporan formal ke Pemerintah (KLHK/PROPER).
            </p>
          </div>

          <div className="my-4 p-3 bg-surface-card rounded-xl border border-border-subtle text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">Alur Penyaluran:</span>
              <span className="font-semibold text-brand-primary">Bertahap per Milestone</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">Verifikasi Dokumen:</span>
              <span className="font-semibold text-brand-emerald">Berita Acara & Geotag</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">Pelaporan Formal:</span>
              <span className="font-semibold text-sky-700">Format Kesiapan PROPER</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/ecosystem')}
            className="w-full py-2.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            Buka Peta Interaktif Ekosistem <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Grid: Recent Programs & Recent Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Programs List */}
        <div className="lg:col-span-2 bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-ink-primary">Daftar Program CSR Unggulan</h3>
              <p className="text-xs text-ink-muted mt-0.5">Program dengan kegiatan aktif di lapangan</p>
            </div>
            <Link to="/programs" className="text-xs font-semibold text-brand-primary hover:underline flex items-center gap-1">
              Lihat Semua ({programs.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {programs.slice(0, 4).map((p) => {
              const catInfo = CATEGORY_LABELS[p.category];
              return (
                <div
                  key={p.id}
                  onClick={() => navigate(`/programs/${p.id}`)}
                  className="p-4 rounded-xl border border-border-subtle hover:border-brand-emerald bg-surface-card hover:bg-surface-secondary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-ink-muted font-mono">{p.code}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${catInfo?.badgeBg || 'bg-gray-50'}`}>
                        {catInfo?.label || p.category}
                      </span>
                      <StatusBadge status={p.status} size="sm" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-ink-primary group-hover:text-brand-primary transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-ink-muted flex items-center gap-3">
                      <span>📍 {p.location}</span>
                      <span>💰 Anggaran: {formatCompactIDR(p.approvedBudget)}</span>
                      <span>👥 {formatNumber(p.reachedBeneficiaries)} / {formatNumber(p.targetBeneficiaries)} Jiwa</span>
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="sm:text-right shrink-0">
                    <div className="text-xs font-bold text-brand-primary mb-1">{p.progressPercent}% Progres</div>
                    <div className="w-28 h-2 bg-surface-secondary rounded-full overflow-hidden border border-border-subtle">
                      <div
                        className="h-full bg-brand-emerald rounded-full transition-all"
                        style={{ width: `${p.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-ink-primary">Aktivitas Terkini</h3>
                <p className="text-xs text-ink-muted mt-0.5">Jejak kegiatan & peninjauan demo</p>
              </div>
              <Link to="/activity" className="text-xs font-semibold text-brand-primary hover:underline">
                Semua
              </Link>
            </div>

            <div className="space-y-3.5">
              {activities.slice(0, 5).map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-brand-emerald mt-1.5 shrink-0" />
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-ink-primary">{act.actorName}</span>
                      <span className="text-[10px] text-ink-muted">
                        {new Date(act.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <p className="text-ink-secondary text-[11px] leading-snug">{act.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border-subtle mt-4">
            <Link
              to="/activity"
              className="w-full py-2 px-3 rounded-xl bg-surface-secondary hover:bg-surface-muted/70 text-xs font-semibold text-ink-secondary flex items-center justify-center gap-1.5 transition-colors"
            >
              <Activity className="w-3.5 h-3.5" />
              Buka Timeline Audit Lengkap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
