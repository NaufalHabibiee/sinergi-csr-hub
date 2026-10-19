import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building2,
  Users,
  Wallet,
  CheckCircle2,
  AlertCircle,
  FileText,
  UploadCloud,
  TrendingUp,
  Share2,
  ExternalLink,
  ShieldCheck,
  Edit,
  Sparkles
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import {
  formatCompactIDR,
  formatIDR,
  formatDateID,
  formatNumber,
  CATEGORY_LABELS
} from '../../lib/formatters';

export const ProgramDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    programs,
    partners,
    funders,
    fundingRecords,
    beneficiaries,
    reports,
    activities,
    updateProgramProgress,
    addProgramEvidence
  } = useCSRStore();

  const program = programs.find((p) => p.id === id);

  const [activeTab, setActiveTab] = useState<'overview' | 'funding' | 'beneficiaries' | 'evidence' | 'reports' | 'activity'>('overview');

  // Modals
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [progressVal, setProgressVal] = useState(program?.progressPercent || 0);
  const [indicatorInputs, setIndicatorInputs] = useState<Record<string, number>>({});

  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [evidenceTitle, setEvidenceTitle] = useState('');
  const [evidenceCategory, setEvidenceCategory] = useState<any>('foto_kegiatan');

  if (!program) {
    return (
      <div className="p-12 text-center bg-surface-card rounded-2xl border border-border-subtle my-6">
        <h2 className="text-base font-bold text-ink-primary">Program Tidak Ditemukan</h2>
        <p className="text-xs text-ink-muted mt-1">ID program {id} tidak terdaftar pada sistem.</p>
        <button
          onClick={() => navigate('/dashboard/programs')}
          className="mt-4 px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          Kembali ke Daftar Program
        </button>
      </div>
    );
  }

  const partner = partners.find((p) => p.id === program.partnerId);
  const funder = funders.find((f) => f.id === program.funderId);
  const catInfo = CATEGORY_LABELS[program.category];

  const programFunding = fundingRecords.filter((r) => r.programId === program.id);
  const programBeneficiaries = beneficiaries.filter((b) => b.programId === program.id);
  const programReports = reports.filter((r) => r.scopeType === 'program' && r.scopeId === program.id);
  const programActivities = activities.filter((a) => a.entityType === 'Program' && a.entityId === program.id);

  const handleUpdateProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const indUpdates = Object.entries(indicatorInputs).map(([indId, cur]) => ({
      id: indId,
      current: cur
    }));
    updateProgramProgress(program.id, progressVal, indUpdates);
    setIsProgressModalOpen(false);
  };

  const handleUploadEvidenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceTitle.trim()) return;
    addProgramEvidence(program.id, {
      title: evidenceTitle,
      category: evidenceCategory,
      url: '#'
    });
    setEvidenceTitle('');
    setIsEvidenceModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/dashboard/programs')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Program
        </button>
      </div>

      {/* Hero Header Card */}
      <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-ink-muted">{program.code}</span>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${catInfo?.badgeBg || 'bg-gray-50'}`}>
              {catInfo?.label || program.category}
            </span>
            <StatusBadge status={program.status} />
            {program.sourceProposalId && (
              <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-semibold">
                Berasal dari Proposal Terverifikasi
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setProgressVal(program.progressPercent);
                const initialMap: Record<string, number> = {};
                program.indicators.forEach((ind) => (initialMap[ind.id] = ind.current));
                setIndicatorInputs(initialMap);
                setIsProgressModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Perbarui Progres & Indikator
            </button>
            <button
              onClick={() => setIsEvidenceModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-surface-secondary hover:bg-surface-muted text-ink-primary text-xs font-bold border border-border-subtle transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5 text-brand-primary" />
              Unggah Bukti
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-ink-primary leading-tight">
            {program.title}
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-1 leading-relaxed max-w-3xl">
            {program.summary}
          </p>
        </div>

        {/* Metadata Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border-subtle text-xs">
          <div>
            <span className="text-ink-muted text-[11px] block">Mitra Pelaksana:</span>
            <span className="font-bold text-ink-primary flex items-center gap-1 mt-0.5">
              <Users className="w-3.5 h-3.5 text-brand-emerald" /> {partner?.name || 'Mitra Sosial'}
            </span>
          </div>

          <div>
            <span className="text-ink-muted text-[11px] block">Corporate Funder:</span>
            <span className="font-bold text-ink-primary flex items-center gap-1 mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-brand-primary" /> {funder?.name || 'Corporate Funder'}
            </span>
          </div>

          <div>
            <span className="text-ink-muted text-[11px] block">Wilayah Kegiatan:</span>
            <span className="font-bold text-ink-primary flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-rose-600" /> {program.location}, {program.province}
            </span>
          </div>

          <div>
            <span className="text-ink-muted text-[11px] block">Periode Pelaksanaan:</span>
            <span className="font-bold text-ink-primary flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-sky-600" /> {formatDateID(program.startDate)} — {formatDateID(program.endDate)}
            </span>
          </div>
        </div>

        {/* Progress and Financial summary banner */}
        <div className="bg-surface-secondary/70 p-4 rounded-xl border border-border-subtle grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="text-[11px] text-ink-muted font-medium">Realisasi Dana / Alokasi</div>
            <div className="text-base font-extrabold text-ink-primary mt-0.5">
              {formatIDR(program.disbursedAmount)} <span className="text-xs font-normal text-ink-muted">/ {formatCompactIDR(program.approvedBudget)}</span>
            </div>
            <div className="text-[11px] text-brand-emerald font-semibold mt-0.5">
              {((program.disbursedAmount / (program.approvedBudget || 1)) * 100).toFixed(1)}% telah tersalurkan
            </div>
          </div>

          <div>
            <div className="text-[11px] text-ink-muted font-medium">Penerima Manfaat Sasaran</div>
            <div className="text-base font-extrabold text-ink-primary mt-0.5">
              {formatNumber(program.reachedBeneficiaries)} <span className="text-xs font-normal text-ink-muted">/ {formatNumber(program.targetBeneficiaries)} Jiwa</span>
            </div>
            <div className="text-[11px] text-purple-700 font-semibold mt-0.5">
              {((program.reachedBeneficiaries / (program.targetBeneficiaries || 1)) * 100).toFixed(0)}% capaian sasaran
            </div>
          </div>

          <div>
            <div className="text-[11px] text-ink-muted font-medium flex items-center justify-between">
              <span>Progres Fisik Kegiatan</span>
              <span className="text-brand-primary font-bold">{program.progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-surface-card rounded-full overflow-hidden border border-border-subtle mt-1.5">
              <div
                className="h-full bg-brand-emerald rounded-full transition-all"
                style={{ width: `${program.progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-ink-muted mt-1">Status: {program.status.toUpperCase()} (Demo)</div>
          </div>
        </div>
      </div>

      {/* 6 Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-border-subtle text-xs font-semibold overflow-x-auto no-scrollbar">
        {[
          { key: 'overview', label: 'Overview & Indikator' },
          { key: 'funding', label: `Funding (${programFunding.length})` },
          { key: 'beneficiaries', label: `Penerima Manfaat (${programBeneficiaries.length})` },
          { key: 'evidence', label: `Bukti Kegiatan (${program.evidenceList.length})` },
          { key: 'reports', label: `Laporan Dampak (${programReports.length})` },
          { key: 'activity', label: `Audit Log (${programActivities.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.key
                ? 'border-brand-primary text-brand-primary font-bold'
                : 'border-transparent text-ink-muted hover:text-ink-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview & Indikator */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Outcome & Impact Indicators */}
            <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-ink-primary">Indikator Kinerja & Dampak (KPI Program)</h3>
                  <p className="text-xs text-ink-muted mt-0.5">Target dan capaian riil yang dilaporkan mitra pelaksana</p>
                </div>
                <button
                  onClick={() => setIsProgressModalOpen(true)}
                  className="text-xs font-semibold text-brand-primary hover:underline cursor-pointer"
                >
                  Perbarui
                </button>
              </div>

              <div className="space-y-3">
                {program.indicators.map((ind) => {
                  const pct = Math.min(100, Math.round((ind.current / (ind.target || 1)) * 100));
                  return (
                    <div key={ind.id} className="p-3.5 rounded-xl bg-surface-secondary/70 border border-border-subtle">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-ink-primary">{ind.label}</span>
                        <span className="font-bold text-brand-primary">
                          {formatNumber(ind.current)} / {formatNumber(ind.target)} {ind.unit} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-surface-card rounded-full overflow-hidden border border-border-subtle">
                        <div
                          className="h-full bg-brand-emerald rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Program Objectives & Methodology */}
            <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card space-y-3 text-xs">
              <h3 className="font-bold text-sm text-ink-primary">Metodologi & Tata Kelola Pelaksanaan</h3>
              <p className="text-ink-secondary leading-relaxed">
                Program ini dijalankan mengacu pada prinsip Tanggung Jawab Sosial dan Lingkungan Perseroan (TJSL) terukur. Seluruh aktivitas dilakukan secara partisipatif bersama pemangku kepentingan lokal untuk menjamin keberlanjutan pasca program selesai.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-brand-mint/50 rounded-xl border border-emerald-200">
                  <div className="font-bold text-brand-primary">Kesesuaian SDGs / ESG</div>
                  <p className="text-[11px] text-ink-secondary mt-0.5">
                    Mendukung target emisi nol bersih, pemberdayaan ekonomi inklusif, dan perlindungan keanekaragaman hayati.
                  </p>
                </div>
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-200">
                  <div className="font-bold text-sky-800">Kesiapan Laporan PROPER</div>
                  <p className="text-[11px] text-ink-secondary mt-0.5">
                    Data geotagging dan berita acara diverifikasi untuk lampiran audit lingkungan formal KLHK.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar right: Partner & Funder profile preview */}
          <div className="space-y-6">
            <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card text-xs space-y-3">
              <h4 className="font-bold text-ink-primary">Mitra Pelaksana Terverifikasi</h4>
              {partner ? (
                <div className="space-y-2">
                  <div className="font-bold text-brand-primary text-sm">{partner.name}</div>
                  <p className="text-[11px] text-ink-muted leading-relaxed">{partner.description}</p>
                  <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px]">
                    <span className="text-ink-muted">Wilayah:</span>
                    <span className="font-semibold text-ink-primary">{partner.region}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-ink-muted">Status:</span>
                    <span className="font-semibold text-brand-emerald">{partner.verificationBadge}</span>
                  </div>
                </div>
              ) : (
                <p className="text-ink-muted">Data mitra tidak ditemukan.</p>
              )}
            </div>

            <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card text-xs space-y-3">
              <h4 className="font-bold text-ink-primary">Corporate Funder</h4>
              {funder ? (
                <div className="space-y-2">
                  <div className="font-bold text-brand-primary text-sm">{funder.name}</div>
                  <p className="text-[11px] text-ink-muted leading-relaxed">{funder.description}</p>
                  <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px]">
                    <span className="text-ink-muted">Tipe Perusahaan:</span>
                    <span className="font-semibold text-ink-primary">{funder.subType}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-ink-muted">PIC CSR:</span>
                    <span className="font-semibold text-ink-primary">{funder.contactPerson.name}</span>
                  </div>
                </div>
              ) : (
                <p className="text-ink-muted">Data funder tidak ditemukan.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Funding */}
      {activeTab === 'funding' && (
        <div className="space-y-4">
          <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
            <h3 className="font-bold text-sm text-ink-primary mb-1">Riwayat Alokasi & Distribusi Dana Program</h3>
            <p className="text-xs text-ink-muted mb-4">
              Semua pencatatan penyaluran dilakukan secara transparan per termin milestone dengan validasi simulasi.
            </p>

            {programFunding.length === 0 ? (
              <p className="text-xs text-ink-muted text-center py-8">Belum ada riwayat transaksi dana untuk program ini.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-secondary text-ink-muted font-semibold border-b border-border-subtle">
                    <tr>
                      <th className="py-2.5 px-3">No. Referensi</th>
                      <th className="py-2.5 px-3">Tipe Transaksi</th>
                      <th className="py-2.5 px-3">Tanggal</th>
                      <th className="py-2.5 px-3">Nominal</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Catatan / Bukti</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {programFunding.map((rec) => (
                      <tr key={rec.id} className="hover:bg-surface-secondary/40 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-brand-primary">{rec.referenceNo}</td>
                        <td className="py-3 px-3 font-semibold">{rec.recordType}</td>
                        <td className="py-3 px-3 text-ink-muted">{formatDateID(rec.date)}</td>
                        <td className="py-3 px-3 font-bold text-ink-primary">{formatIDR(rec.amount)}</td>
                        <td className="py-3 px-3"><StatusBadge status={rec.status} size="sm" /></td>
                        <td className="py-3 px-3 text-ink-muted max-w-xs truncate">{rec.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Beneficiaries */}
      {activeTab === 'beneficiaries' && (
        <div className="space-y-4">
          <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
            <h3 className="font-bold text-sm text-ink-primary mb-1">Penerima Manfaat Berbasis Agregat</h3>
            <p className="text-xs text-ink-muted mb-4">
              Menghormati privasi warga sasaran tanpa mengekspos NIK / identitas pribadi yang tidak diperlukan.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {programBeneficiaries.map((ben) => (
                <div key={ben.id} className="p-4 rounded-xl border border-border-subtle bg-surface-secondary/40 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink-primary">{ben.groupLabel}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold border border-purple-200">
                      {ben.countingMethod === 'unique_verified' ? 'Individu Unik' : ben.countingMethod === 'participation_event' ? 'Partisipasi Kegiatan' : 'Estimasi Kepala Keluarga'}
                    </span>
                  </div>
                  <div className="text-lg font-extrabold text-brand-primary">
                    {formatNumber(ben.reachedCount)} <span className="text-xs font-normal text-ink-muted">/ {formatNumber(ben.targetCount)} Jiwa</span>
                  </div>
                  <p className="text-[11px] text-ink-muted">{ben.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Evidence */}
      {activeTab === 'evidence' && (
        <div className="space-y-4">
          <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-ink-primary">Dokumen Bukti Pelaksanaan & Geotagging</h3>
                <p className="text-xs text-ink-muted mt-0.5">Berita acara, foto kegiatan, dan laporan serah terima fisik</p>
              </div>
              <button
                onClick={() => setIsEvidenceModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold transition-colors cursor-pointer"
              >
                + Tambah Bukti Baru
              </button>
            </div>

            {program.evidenceList.length === 0 ? (
              <p className="text-xs text-ink-muted text-center py-8">Belum ada bukti yang diunggah.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {program.evidenceList.map((evi) => (
                  <div key={evi.id} className="p-4 rounded-xl border border-border-subtle bg-surface-card hover:border-brand-emerald transition-all space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary px-2 py-0.5 rounded-md bg-brand-mint">
                        {evi.category.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-ink-muted">{formatDateID(evi.date)}</span>
                    </div>
                    <h5 className="font-bold text-ink-primary line-clamp-2">{evi.title}</h5>
                    <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] text-ink-muted">
                      <span>Oleh: {evi.uploadedBy}</span>
                      <span className="text-brand-emerald font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Terverifikasi Demo
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Reports */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
            <h3 className="font-bold text-sm text-ink-primary mb-1">Laporan Dampak Program</h3>
            <p className="text-xs text-ink-muted mb-4">Laporan evaluasi hasil dan output yang siap diekspor</p>

            {programReports.length === 0 ? (
              <p className="text-xs text-ink-muted text-center py-8">Belum ada laporan spesifik yang disusun untuk program ini.</p>
            ) : (
              <div className="space-y-3">
                {programReports.map((rep) => (
                  <div key={rep.id} className="p-4 rounded-xl border border-border-subtle bg-surface-secondary/40 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-brand-primary">{rep.reportCode}</span>
                        <StatusBadge status={rep.status} size="sm" />
                      </div>
                      <h4 className="font-bold text-sm text-ink-primary mt-1">{rep.title}</h4>
                      <p className="text-ink-muted text-[11px] mt-0.5 line-clamp-1">{rep.summary}</p>
                    </div>
                    <Link
                      to="/dashboard/reports"
                      className="px-3 py-1.5 rounded-xl bg-surface-card hover:bg-surface-muted text-ink-primary font-bold border border-border-subtle shrink-0"
                    >
                      Buka di Reports
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 6: Activity */}
      {activeTab === 'activity' && (
        <div className="space-y-4">
          <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
            <h3 className="font-bold text-sm text-ink-primary mb-1">Timeline Jejak Perubahan Program</h3>
            <p className="text-xs text-ink-muted mb-4">Audit log simulasi kegiatan dan pembaruan data program</p>

            <div className="space-y-3">
              {programActivities.length === 0 ? (
                <p className="text-xs text-ink-muted text-center py-8">Belum ada catatan aktivitas tercatat.</p>
              ) : (
                programActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3 text-xs p-3 rounded-xl bg-surface-secondary/40 border border-border-subtle">
                    <div className="w-2 h-2 rounded-full bg-brand-emerald mt-1.5 shrink-0" />
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink-primary">{act.actorName} ({act.action})</span>
                        <span className="text-[10px] text-ink-muted">{formatDateID(act.timestamp)}</span>
                      </div>
                      <p className="text-ink-secondary text-[11px]">{act.summary}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Update Progress */}
      <Modal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        title="Perbarui Progres & Indikator Program"
        subtitle="Simulasi pengisian pembaruan progres bulanan oleh mitra atau manajer CSR."
        maxWidth="md"
      >
        <form onSubmit={handleUpdateProgressSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-ink-primary mb-1">
              Progres Fisik Program (%): {progressVal}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progressVal}
              onChange={(e) => setProgressVal(Number(e.target.value))}
              className="w-full accent-brand-primary cursor-pointer"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-border-subtle">
            <span className="font-bold text-ink-primary block">Pembaruan Nilai Indikator Terkini:</span>
            {program.indicators.map((ind) => (
              <div key={ind.id} className="flex items-center justify-between gap-3">
                <span className="text-ink-secondary text-[11px] flex-1">{ind.label} ({ind.unit}):</span>
                <input
                  type="number"
                  defaultValue={ind.current}
                  onChange={(e) => {
                    setIndicatorInputs((prev) => ({
                      ...prev,
                      [ind.id]: Number(e.target.value)
                    }));
                  }}
                  className="w-24 px-2 py-1 bg-surface-card border border-border-subtle rounded-lg text-ink-primary text-xs focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setIsProgressModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-ink-muted hover:text-ink-primary cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold bg-brand-primary text-white rounded-xl shadow-xs cursor-pointer"
            >
              Simpan Progres
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Upload Evidence */}
      <Modal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        title="Unggah Bukti Kegiatan Lapangan"
        subtitle="Lampirkan dokumentasi foto kegiatan, berita acara, atau laporan keuangan."
        maxWidth="md"
      >
        <form onSubmit={handleUploadEvidenceSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-ink-primary mb-1">Judul / Keterangan Dokumen *</label>
            <input
              type="text"
              value={evidenceTitle}
              onChange={(e) => setEvidenceTitle(e.target.value)}
              placeholder="Contoh: Berita Acara Serah Terima Bibit Mangrove Tahap 2"
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Kategori Dokumen *</label>
            <select
              value={evidenceCategory}
              onChange={(e) => setEvidenceCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            >
              <option value="foto_kegiatan">Foto Kegiatan Lapangan</option>
              <option value="berita_acara">Berita Acara Serah Terima (BAST)</option>
              <option value="daftar_hadir">Daftar Presensi / Tanda Terima</option>
              <option value="laporan_keuangan">Laporan Pertanggungjawaban Keuangan</option>
              <option value="liputan_media">Liputan Media / Sertifikat</option>
            </select>
          </div>

          <div className="p-4 border-2 border-dashed border-border-medium rounded-xl text-center text-ink-muted">
            <UploadCloud className="w-8 h-8 mx-auto text-brand-primary mb-1" />
            <p className="font-semibold text-ink-primary">Simulasi Berkas Bukti Digital</p>
            <p className="text-[10px] mt-0.5">Metadata berkas akan dicatat dalam database audit demo.</p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setIsEvidenceModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-ink-muted hover:text-ink-primary cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold bg-brand-primary text-white rounded-xl shadow-xs cursor-pointer"
            >
              Simpan Bukti
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
