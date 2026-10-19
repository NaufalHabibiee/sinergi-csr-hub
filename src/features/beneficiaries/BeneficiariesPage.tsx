import React, { useState, useMemo } from 'react';
import {
  HeartHandshake,
  Plus,
  Search,
  ShieldCheck,
  Info,
  MapPin,
  Layers,
  PieChart as PieIcon,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { calculateBeneficiariesMetrics } from '../../lib/calculations';
import { formatNumber, formatDateID } from '../../lib/formatters';
import { BeneficiaryCountingMethod } from '../../types/csr';

export const BeneficiariesPage: React.FC = () => {
  const { beneficiaries, programs, createBeneficiaryAggregate } = useCSRStore();

  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [programId, setProgramId] = useState(programs[0]?.id || '');
  const [region, setRegion] = useState('');
  const [province, setProvince] = useState('Jawa Barat');
  const [groupLabel, setGroupLabel] = useState('');
  const [targetCount, setTargetCount] = useState(500);
  const [reachedCount, setReachedCount] = useState(350);
  const [countingMethod, setCountingMethod] = useState<BeneficiaryCountingMethod>('unique_verified');
  const [notes, setNotes] = useState('');

  const metrics = calculateBeneficiariesMetrics(beneficiaries);

  const filteredBeneficiaries = useMemo(() => {
    return beneficiaries.filter((b) => {
      const matchesSearch =
        b.programTitle.toLowerCase().includes(search.toLowerCase()) ||
        b.region.toLowerCase().includes(search.toLowerCase()) ||
        b.groupLabel.toLowerCase().includes(search.toLowerCase());
      const matchesMethod = methodFilter === 'all' || b.countingMethod === methodFilter;
      return matchesSearch && matchesMethod;
    });
  }, [beneficiaries, search, methodFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupLabel.trim() || !region.trim()) return;

    const prog = programs.find((p) => p.id === programId);

    createBeneficiaryAggregate({
      programId,
      programTitle: prog?.title || 'Program CSR Universa',
      region,
      province,
      groupLabel,
      targetCount: Number(targetCount),
      reachedCount: Number(reachedCount),
      countingMethod,
      notes: notes || 'Pencatatan capaian penerima manfaat agregat demo.'
    });

    setIsModalOpen(false);
    setGroupLabel('');
    setRegion('');
    setNotes('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-mint text-brand-primary">
              <HeartHandshake className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-ink-primary">Data Agregat Penerima Manfaat</h1>
          </div>
          <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
            Pengelolaan capaian sasaran sosial berbasis data agregat yang mengutamakan privasi warga, bebas manipulasi penghitungan ganda (double-counting), dan transparan dalam metodologi.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Tambah Catatan Capaian
        </button>
      </div>

      {/* Privacy & Methodology Notice */}
      <div className="p-4 bg-surface-card border border-border-subtle rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-700 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-ink-primary">Kebijakan Privasi & Pencegahan Double Counting</h4>
            <p className="text-ink-muted text-[11px] mt-0.5 leading-relaxed max-w-2xl">
              Sesuai standar etika data sosial, Universa CSR Hub tidak menyimpan identitas pribadi sensitif (NIK, riwayat medis personal) pada tampilan umum. Data dihitung menggunakan metodologi yang transparan (Unik Terverifikasi vs. Partisipasi Kegiatan).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-[11px]">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-brand-primary font-bold border border-emerald-200">
            Metode IPB / ESG Compliance
          </span>
        </div>
      </div>

      {/* Methodology Breakdown KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Method 1: Unique Verified */}
        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-muted">Individu Unik Terverifikasi</span>
            <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald"></span>
          </div>
          <div className="text-2xl font-extrabold text-ink-primary mt-2">
            {formatNumber(metrics.uniqueVerified)} <span className="text-xs font-normal text-ink-muted">Jiwa</span>
          </div>
          <p className="text-[11px] text-ink-muted mt-1 leading-snug">
            Terverifikasi NIB/KTP oleh perguruan tinggi atau dinas terkait (beasiswa, PMT stunting, inkubasi UMKM).
          </p>
        </div>

        {/* Method 2: Participation Event */}
        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-muted">Partisipasi Acara & Pelatihan</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          </div>
          <div className="text-2xl font-extrabold text-ink-primary mt-2">
            {formatNumber(metrics.participationEvents)} <span className="text-xs font-normal text-ink-muted">Partisipasi</span>
          </div>
          <p className="text-[11px] text-ink-muted mt-1 leading-snug">
            Peserta kerja bakti reboisasi mangrove, patroli karhutla, dan workshop petani organik.
          </p>
        </div>

        {/* Method 3: Household Estimates */}
        <div className="bg-surface-card p-5 rounded-2xl border border-border-subtle shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-muted">Estimasi Kepala Keluarga (KK)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          </div>
          <div className="text-2xl font-extrabold text-ink-primary mt-2">
            {formatNumber(metrics.householdEstimates)} <span className="text-xs font-normal text-ink-muted">Jiwa (Terkonversi)</span>
          </div>
          <p className="text-[11px] text-ink-muted mt-1 leading-snug">
            Penerima pipa sambungan air bersih dikalikan rata-rata 3.7 jiwa per Kepala Keluarga.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-surface-card p-4 rounded-2xl border border-border-subtle shadow-card grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari program sasaran, wilayah, atau kelompok warga..."
            className="w-full pl-9 pr-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all"
          />
        </div>

        <div>
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="w-full px-3 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Metodologi Hitung</option>
            <option value="unique_verified">Individu Unik Terverifikasi</option>
            <option value="participation_event">Partisipasi Acara / Pelatihan</option>
            <option value="household_estimate">Estimasi Kepala Keluarga (KK)</option>
          </select>
        </div>
      </div>

      {/* Aggregate Cards List */}
      {filteredBeneficiaries.length === 0 ? (
        <EmptyState
          icon={HeartHandshake}
          title="Data Capaian Tidak Ditemukan"
          description="Tidak ada catatan capaian penerima manfaat yang cocok dengan filter saat ini."
          actionLabel="Tampilkan Semua Data"
          onAction={() => {
            setSearch('');
            setMethodFilter('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBeneficiaries.map((b) => {
            const pct = Math.min(100, Math.round((b.reachedCount / (b.targetCount || 1)) * 100));
            return (
              <div
                key={b.id}
                className="bg-surface-card rounded-2xl border border-border-subtle p-5 hover:border-brand-emerald hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                        📍 {b.region}, {b.province}
                      </div>
                      <h3 className="font-bold text-sm text-ink-primary mt-0.5">
                        {b.groupLabel}
                      </h3>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        b.countingMethod === 'unique_verified'
                          ? 'bg-emerald-50 text-brand-primary border-emerald-200'
                          : b.countingMethod === 'participation_event'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {b.countingMethod === 'unique_verified'
                        ? 'Individu Unik'
                        : b.countingMethod === 'participation_event'
                        ? 'Partisipasi Kegiatan'
                        : 'Estimasi Kepala Keluarga'}
                    </span>
                  </div>

                  <div className="text-xs text-brand-primary font-medium flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-brand-emerald shrink-0" />
                    <span className="truncate">{b.programTitle}</span>
                  </div>

                  <p className="text-xs text-ink-muted leading-relaxed">
                    {b.notes}
                  </p>
                </div>

                {/* Progress & Numbers */}
                <div className="mt-4 pt-3 border-t border-border-subtle space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink-muted font-medium">Realisasi / Target Sasaran</span>
                    <span className="font-extrabold text-ink-primary">
                      {formatNumber(b.reachedCount)} / {formatNumber(b.targetCount)} Jiwa ({pct}%)
                    </span>
                  </div>

                  <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden border border-border-subtle">
                    <div
                      className="h-full bg-brand-emerald rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-ink-muted pt-1">
                    <span>Terakhir Diperbarui: {formatDateID(b.lastUpdated)}</span>
                    <span className="text-brand-emerald font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Rekonsiliasi Selesai (Demo)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Add Beneficiary Aggregate */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Catat Capaian Penerima Manfaat Baru"
        subtitle="Tambahkan data agregat capaian penerima manfaat untuk program yang sedang berjalan."
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-ink-primary mb-1">Pilih Program Terkait *</label>
            <select
              value={programId}
              onChange={(e) => setProgramId(e.target.value)}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            >
              {programs.map((p) => (
                <option key={p.id} value={p.id}>{p.code} — {p.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Label / Kelompok Sasaran *</label>
            <input
              type="text"
              required
              value={groupLabel}
              onChange={(e) => setGroupLabel(e.target.value)}
              placeholder="Contoh: Nelayan Tradisional & Pembudidaya Kepiting Bakau"
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink-primary mb-1">Kabupaten/Kota *</label>
              <input
                type="text"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Contoh: Muara Gembong"
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-ink-primary mb-1">Provinsi *</label>
              <input
                type="text"
                required
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Contoh: Jawa Barat"
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-ink-primary mb-1">Metode Hitung *</label>
              <select
                value={countingMethod}
                onChange={(e) => setCountingMethod(e.target.value as BeneficiaryCountingMethod)}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              >
                <option value="unique_verified">Individu Unik</option>
                <option value="participation_event">Partisipasi Acara</option>
                <option value="household_estimate">Estimasi KK</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-ink-primary mb-1">Target Sasaran *</label>
              <input
                type="number"
                value={targetCount}
                onChange={(e) => setTargetCount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-ink-primary mb-1">Capaian Riil *</label>
              <input
                type="number"
                value={reachedCount}
                onChange={(e) => setReachedCount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Penjelasan Metodologi & Sumber Data</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jelaskan instrumen verifikasi, misal: daftar presensi fisik atau buku KIA posyandu..."
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 font-semibold text-ink-muted hover:text-ink-primary cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold bg-brand-primary text-white rounded-xl shadow-xs cursor-pointer"
            >
              Simpan Capaian (Demo)
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
