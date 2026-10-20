import React, { useState } from 'react';
import {
  Building2,
  Cpu,
  Users,
  HeartHandshake,
  Landmark,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  FileText,
  DollarSign,
  Info,
  Sparkles,
  ShieldCheck,
  MapPin,
  GitFork,
  Trophy,
  Scale,
  FileCheck2
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { formatCompactIDR, formatNumber } from '../../lib/formatters';
import { calculatePlatformFunding, calculateBeneficiariesMetrics } from '../../lib/calculations';
import { ProjectBookingModal } from '../programs/ProjectBookingModal';
import { CSRAwardsModal } from '../awards/CSRAwardsModal';
import { CSRRegulationsModal } from '../legal/CSRRegulationsModal';
import { BASTGeneratorModal } from '../reports/BASTGeneratorModal';
import { Program } from '../../types/csr';

export const EcosystemMap: React.FC = () => {
  const { funders, partners, programs, fundingRecords, beneficiaries, reports } = useCSRStore();
  const [activeFlow, setActiveFlow] = useState<'all' | 'funding' | 'reporting'>('all');
  const [selectedNode, setSelectedNode] = useState<'funder' | 'hub' | 'mitra' | 'beneficiaries' | 'gov' | null>(null);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBookingProgram, setSelectedBookingProgram] = useState<Program | null>(null);
  const [isAwardsOpen, setIsAwardsOpen] = useState(false);
  const [isRegulationsOpen, setIsRegulationsOpen] = useState(false);
  const [isBastOpen, setIsBastOpen] = useState(false);

  const fundingMetrics = calculatePlatformFunding(fundingRecords);
  const benMetrics = calculateBeneficiariesMetrics(beneficiaries);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-[#176B4D]">
              <Sparkles className="w-4 h-4" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">Peta Alur Ekosistem SinergiCSR</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Visualisasi interaktif aliran tata kelola: Funder Korporat ⇄ SinergiCSR ⇄ Mitra Pelaksana ⇄ Penerima Manfaat, dilengkapi pelaporan dampak ke Funder dan draf laporan formal ke Pemerintah (KLHK/PROPER).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsAwardsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/90 text-xs font-bold transition-all cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>CSR Award</span>
          </button>
          <button
            type="button"
            onClick={() => setIsRegulationsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-slate-500" />
            <span>Dasar Hukum</span>
          </button>
          <button
            type="button"
            onClick={() => setIsBastOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#176B4D] border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-[#176B4D]" />
            <span>Generator BAST</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Filter Flow Mode Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card">
          <div className="text-xs text-ink-muted">
            <span className="font-bold text-ink-primary">Filter Alur Operasional:</span> Pilih jalur transaksi untuk menyorot aliran dana atau laporan.
          </div>
              <button
                onClick={() => setActiveFlow('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeFlow === 'all' ? 'bg-surface-card text-brand-primary shadow-xs font-bold' : 'text-ink-muted hover:text-ink-primary'
                }`}
              >
                Semua Alur
              </button>
              <button
                onClick={() => setActiveFlow('funding')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeFlow === 'funding' ? 'bg-brand-primary text-white shadow-xs font-bold' : 'text-ink-muted hover:text-ink-primary'
                }`}
              >
                Aliran Dana
              </button>
              <button
                onClick={() => setActiveFlow('reporting')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeFlow === 'reporting' ? 'bg-brand-emerald text-white shadow-xs font-bold' : 'text-ink-muted hover:text-ink-primary'
                }`}
              >
                Alur Bukti &amp; Pelaporan
              </button>
            </div>
          </div>

      {/* Interactive Diagram Canvas */}
      <div className="bg-surface-card p-6 md:p-10 rounded-2xl border border-border-subtle shadow-card relative overflow-hidden">
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium pb-6 mb-6 border-b border-border-subtle text-ink-secondary">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
            <span>Aliran Komitmen & Pendanaan CSR</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-emerald"></div>
            <span>Aliran Distribusi & Bukti Pelaksanaan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Laporan Dampak & Draf Proper Report</span>
          </div>
        </div>

        {/* Ecosystem Nodes Grid */}
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Top: GOV / Pemerintah */}
          <div className="flex justify-center">
            <div
              onClick={() => setSelectedNode('gov')}
              className={`w-72 p-4 rounded-2xl border transition-all text-center cursor-pointer group hover:shadow-elevated ${
                selectedNode === 'gov' ? 'border-sky-500 bg-sky-50/50 ring-2 ring-sky-200' : 'border-border-subtle bg-surface-bg hover:border-sky-300'
              }`}
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-ink-primary">Pemerintah & Regulator</h3>
              <p className="text-[11px] text-ink-muted mt-0.5">KLHK (Kriteria PROPER) & Pemda</p>
              <div className="mt-2 text-[10px] bg-sky-100/70 text-sky-800 px-2 py-0.5 rounded-full font-semibold inline-block">
                Penerima Draf Proper Report (Simulasi)
              </div>
            </div>
          </div>

          {/* Upward Report Arrow */}
          {(activeFlow === 'all' || activeFlow === 'reporting') && (
            <div className="flex flex-col items-center justify-center -my-6 text-amber-600 animate-pulse">
              <span className="text-[10px] font-bold bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full mb-1">
                ↑ Proper Report / Formal Report (Simulasi)
              </span>
              <div className="w-0.5 h-8 bg-amber-400"></div>
            </div>
          )}

          {/* Middle Row: Mitra ⇄ UNIVERSA CSR HUB ⇄ Beneficiaries */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left: Mitra Pelaksana */}
            <div
              onClick={() => setSelectedNode('mitra')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-elevated ${
                selectedNode === 'mitra' ? 'border-brand-emerald bg-emerald-50/40 ring-2 ring-emerald-200' : 'border-border-subtle bg-surface-bg hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-brand-emerald flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-ink-primary">Mitra Pelaksana</h3>
                  <p className="text-[11px] text-ink-muted">NGO, Yayasan Sosial, Komunitas</p>
                </div>
              </div>
              <p className="text-xs text-ink-secondary leading-snug">
                Mengajukan proposal, menerima distribusi bertahap, melaksanakan kegiatan lapangan, & mengirim bukti laporan.
              </p>
              <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-xs font-semibold">
                <span className="text-ink-muted">Mitra Terverifikasi:</span>
                <span className="text-brand-primary">{partners.length} Lembaga</span>
              </div>
            </div>

            {/* Center: UNIVERSA CSR HUB */}
            <div
              onClick={() => setSelectedNode('hub')}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer text-center group hover:shadow-elevated relative overflow-hidden ${
                selectedNode === 'hub'
                  ? 'border-brand-primary bg-brand-mint/40 ring-4 ring-brand-mint'
                  : 'border-brand-primary bg-gradient-to-b from-brand-mint/30 to-surface-card hover:border-brand-emerald'
              }`}
            >
              <div className="absolute top-2 right-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald"></span>
                </span>
              </div>
              <div className="w-12 h-12 mx-auto rounded-2xl bg-brand-primary text-white flex items-center justify-center mb-3 shadow-card group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-bold text-brand-primary uppercase tracking-wider mb-0.5">
                Pusat Tata Kelola
              </div>
              <h2 className="text-lg font-extrabold text-ink-primary tracking-tight">UNIVERSA CSR HUB</h2>
              <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                Pencocokan kebutuhan, verifikasi legalitas mitra, monitoring milestone, pelaporan terintegrasi, & audit trail.
              </p>
              <div className="mt-4 pt-3 border-t border-emerald-200/60 grid grid-cols-2 gap-2 text-left">
                <div className="bg-surface-card/80 p-2 rounded-xl border border-border-subtle">
                  <div className="text-[10px] text-ink-muted">Program Aktif</div>
                  <div className="text-sm font-bold text-brand-primary">{programs.filter(p => p.status === 'active').length} Program</div>
                </div>
                <div className="bg-surface-card/80 p-2 rounded-xl border border-border-subtle">
                  <div className="text-[10px] text-ink-muted">Tersalurkan</div>
                  <div className="text-sm font-bold text-brand-emerald">{formatCompactIDR(fundingMetrics.totalDisbursed)}</div>
                </div>
              </div>
            </div>

            {/* Right: Penerima Manfaat */}
            <div
              onClick={() => setSelectedNode('beneficiaries')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-elevated ${
                selectedNode === 'beneficiaries' ? 'border-purple-400 bg-purple-50/40 ring-2 ring-purple-200' : 'border-border-subtle bg-surface-bg hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-ink-primary">Penerima Manfaat</h3>
                  <p className="text-[11px] text-ink-muted">Masyarakat, Pelajar, Nelayan</p>
                </div>
              </div>
              <p className="text-xs text-ink-secondary leading-snug">
                Menerima beasiswa, fasilitas air bersih, bibit mangrove, pelatihan vokasi, & peningkatan pendapatan mandiri.
              </p>
              <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-xs font-semibold">
                <span className="text-ink-muted">Capaian Agregat:</span>
                <span className="text-purple-700">{formatNumber(benMetrics.totalReached)} Jiwa</span>
              </div>
            </div>
          </div>

          {/* Downward / Upward Flow Indicator */}
          <div className="flex justify-center -my-4">
            <div className="flex items-center gap-6 text-xs font-bold">
              {(activeFlow === 'all' || activeFlow === 'funding') && (
                <span className="bg-emerald-50 text-brand-primary border border-emerald-200 px-3 py-1 rounded-full shadow-2xs flex items-center gap-1.5">
                  <ArrowDown className="w-3.5 h-3.5 text-brand-emerald" />
                  Alokasi & Komitmen Dana CSR Korporat
                </span>
              )}
              {(activeFlow === 'all' || activeFlow === 'reporting') && (
                <span className="bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full shadow-2xs flex items-center gap-1.5">
                  <ArrowUp className="w-3.5 h-3.5 text-amber-600" />
                  Konsolidasi CSR Report ke Funder
                </span>
              )}
            </div>
          </div>

          {/* Bottom: Funder (Corporate) */}
          <div className="flex justify-center">
            <div
              onClick={() => setSelectedNode('funder')}
              className={`w-full max-w-md p-5 rounded-2xl border transition-all text-center cursor-pointer group hover:shadow-elevated ${
                selectedNode === 'funder' ? 'border-brand-primary bg-emerald-50/40 ring-2 ring-emerald-200' : 'border-border-subtle bg-surface-bg hover:border-emerald-300'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-brand-primary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-ink-primary">Funder — Perusahaan (Corporate)</h3>
              <p className="text-xs text-ink-muted mt-0.5">
                BUMN Energi, Swasta Telekomunikasi, Perbankan, Mineral & Agroindustri
              </p>
              <p className="text-xs text-ink-secondary mt-2 max-w-sm mx-auto leading-relaxed">
                Menyediakan alokasi anggaran TJSL tahunan, menetapkan prioritas dampak, dan memantau return of social impact melalui dashboard terintegrasi.
              </p>
              <div className="mt-4 pt-3 border-t border-border-subtle grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-ink-muted block text-[11px]">Total Komitmen CSR:</span>
                  <span className="font-extrabold text-brand-primary text-sm">
                    {formatCompactIDR(fundingMetrics.totalCommitted)}
                  </span>
                </div>
                <div>
                  <span className="text-ink-muted block text-[11px]">Jumlah Funder Aktif:</span>
                  <span className="font-extrabold text-ink-primary text-sm">
                    {funders.length} Korporasi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Node Details Drawer / Popover */}
        {selectedNode && (
          <div className="mt-8 p-5 rounded-2xl bg-surface-secondary border border-border-subtle text-xs animate-in fade-in duration-200">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-sm text-ink-primary flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                  Detail Peran Ekosistem: {selectedNode.toUpperCase()}
                </h4>
                <p className="text-ink-muted text-[11px] mt-0.5">
                  Bagian penting dari tata kelola tanggung jawab sosial terintegrasi.
                </p>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-ink-muted hover:text-ink-primary font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 text-ink-secondary leading-relaxed">
              {selectedNode === 'funder' && (
                <p>
                  Perusahaan penyedia dana CSR dapat meninjau proposal mitra terverifikasi, memantau realisasi pencairan termin dana, serta mengunduh laporan dampak ESG triwulan dan tahunan tanpa risiko manipulasi data manual.
                </p>
              )}
              {selectedNode === 'hub' && (
                <p>
                  SinergiCSR bertindak sebagai orkestrator netral yang memastikan due diligence legalitas mitra, kelayakan anggaran proposal, verifikasi bukti pelaksanaan di lapangan, serta konsolidasi laporan dampak terstandarisasi.
                </p>
              )}
              {selectedNode === 'mitra' && (
                <p>
                  Mitra sosial dan lembaga pelaksana menerima penyaluran dana sesuai milestone yang disepakati, mengunggah bukti tanda terima/berita acara/foto geotagging secara berkala, dan membangun reputasi kinerja sosial yang kredibel.
                </p>
              )}
              {selectedNode === 'beneficiaries' && (
                <p>
                  Masyarakat penerima manfaat didata secara agregat untuk melindungi privasi data pribadi. Dampak sosial diukur melalui peningkatan taraf hidup, kelestarian ekosistem lingkungan, dan kemandirian ekonomi.
                </p>
              )}
              {selectedNode === 'gov' && (
                <p>
                  Laporan formal disiapkan sebagai template draf siap uji untuk kepatuhan regulasi (seperti kriteria penyerapan TJSL Hijau pada PROPER KLHK). Laporan ini tetap berstatus simulasi demo internal sebelum diverifikasi resmi.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Project Booking / Letter of Intent Modal */}
      <ProjectBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        program={selectedBookingProgram}
      />

      {/* Point 5: CSR Awards & Hall of Fame Modal */}
      <CSRAwardsModal
        isOpen={isAwardsOpen}
        onClose={() => setIsAwardsOpen(false)}
      />

      {/* Point 6: CSR Legal Regulations & Basis Modal */}
      <CSRRegulationsModal
        isOpen={isRegulationsOpen}
        onClose={() => setIsRegulationsOpen(false)}
      />

      {/* Point 7: Standardized BAST Generator Modal */}
      <BASTGeneratorModal
        isOpen={isBastOpen}
        onClose={() => setIsBastOpen(false)}
      />
    </div>
  );
};
