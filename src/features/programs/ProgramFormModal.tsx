import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { useCSRStore } from '../../context/CSRStoreContext';
import { ProgramCategory, ProgramStatus } from '../../types/csr';
import { validateProgramInput } from '../../lib/validators';

interface ProgramFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

export const ProgramFormModal: React.FC<ProgramFormModalProps> = ({
  isOpen,
  onClose,
  initialData
}) => {
  const { partners, funders, createProgram, updateProgram } = useCSRStore();

  const [title, setTitle] = useState(initialData?.title || '');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [category, setCategory] = useState<ProgramCategory>(initialData?.category || 'lingkungan');
  const [location, setLocation] = useState(initialData?.location || '');
  const [province, setProvince] = useState(initialData?.province || 'Jawa Barat');
  const [partnerId, setPartnerId] = useState(initialData?.partnerId || (partners[0]?.id || ''));
  const [funderId, setFunderId] = useState(initialData?.funderId || (funders[0]?.id || ''));
  const [proposedBudget, setProposedBudget] = useState(initialData?.proposedBudget || 500000000);
  const [targetBeneficiaries, setTargetBeneficiaries] = useState(initialData?.targetBeneficiaries || 500);
  const [startDate, setStartDate] = useState(initialData?.startDate || new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(initialData?.endDate || '2026-10-31');
  const [status, setStatus] = useState<ProgramStatus>(initialData?.status || 'active');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateProgramInput({
      title,
      summary,
      category,
      location,
      province,
      partnerId,
      funderId,
      proposedBudget: Number(proposedBudget),
      targetBeneficiaries: Number(targetBeneficiaries),
      startDate,
      endDate
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (initialData?.id) {
      updateProgram(initialData.id, {
        title,
        summary,
        category,
        location,
        province,
        partnerId,
        funderId,
        approvedBudget: Number(proposedBudget),
        targetBeneficiaries: Number(targetBeneficiaries),
        startDate,
        endDate,
        status
      });
    } else {
      createProgram({
        title,
        summary,
        category,
        location,
        province,
        partnerId,
        funderId,
        proposedBudget: Number(proposedBudget),
        approvedBudget: Number(proposedBudget),
        targetBeneficiaries: Number(targetBeneficiaries),
        reachedBeneficiaries: 0,
        startDate,
        endDate,
        status,
        indicators: [
          { label: 'Capaian Output Sasaran Utama', target: Number(targetBeneficiaries), unit: 'penerima' },
          { label: 'Evaluasi Manfaat Berkelanjutan', target: 100, unit: '%' }
        ]
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData?.id ? 'Edit Data Program CSR' : 'Tambah Program CSR Baru'}
      subtitle="Pastikan informasi relevan dengan prioritas TJSL/CSR dan komitmen anggaran."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-ink-primary mb-1">Nama Program *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Reboisasi 20.000 Mangrove Pesisir Utara"
            className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
          />
          {errors.title && <p className="text-status-red text-[11px] mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block font-bold text-ink-primary mb-1">Ringkasan & Tujuan Program *</label>
          <textarea
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Deskripsikan latar belakang, tujuan dampak sosial, dan kelompok sasaran..."
            className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
          />
          {errors.summary && <p className="text-status-red text-[11px] mt-1">{errors.summary}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-bold text-ink-primary mb-1">Kategori Sektor *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProgramCategory)}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            >
              <option value="lingkungan">Lingkungan & Reboisasi</option>
              <option value="pendidikan">Pendidikan & Beasiswa</option>
              <option value="ekonomi_umkm">Pemberdayaan UMKM</option>
              <option value="kesehatan">Kesehatan Masyarakat</option>
              <option value="infrastruktur">Infrastruktur & Air Bersih</option>
              <option value="tanggap_bencana">Tanggap Darurat Bencana</option>
              <option value="lainnya">Program Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Kabupaten / Kota *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Contoh: Muara Gembong, Bekasi"
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
            {errors.location && <p className="text-status-red text-[11px] mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Provinsi *</label>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              placeholder="Contoh: Jawa Barat"
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
            {errors.province && <p className="text-status-red text-[11px] mt-1">{errors.province}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-ink-primary mb-1">Mitra Pelaksana *</label>
            <select
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            >
              {partners.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.subType})</option>
              ))}
            </select>
            {errors.partnerId && <p className="text-status-red text-[11px] mt-1">{errors.partnerId}</p>}
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Corporate Funder *</label>
            <select
              value={funderId}
              onChange={(e) => setFunderId(e.target.value)}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            >
              {funders.map((f) => (
                <option key={f.id} value={f.id}>{f.name} ({f.subType})</option>
              ))}
            </select>
            {errors.funderId && <p className="text-status-red text-[11px] mt-1">{errors.funderId}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-ink-primary mb-1">Anggaran Disetujui (Rupiah) *</label>
            <input
              type="number"
              value={proposedBudget}
              onChange={(e) => setProposedBudget(Number(e.target.value))}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
            {errors.proposedBudget && <p className="text-status-red text-[11px] mt-1">{errors.proposedBudget}</p>}
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Target Penerima Manfaat (Jiwa/KK) *</label>
            <input
              type="number"
              value={targetBeneficiaries}
              onChange={(e) => setTargetBeneficiaries(Number(e.target.value))}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
            {errors.targetBeneficiaries && <p className="text-status-red text-[11px] mt-1">{errors.targetBeneficiaries}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-bold text-ink-primary mb-1">Tanggal Mulai *</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
            {errors.startDate && <p className="text-status-red text-[11px] mt-1">{errors.startDate}</p>}
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Tanggal Selesai *</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
            {errors.endDate && <p className="text-status-red text-[11px] mt-1">{errors.endDate}</p>}
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Status Program</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProgramStatus)}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            >
              <option value="draft">Draf</option>
              <option value="under_review">Dalam Peninjauan</option>
              <option value="approved">Disetujui (Demo)</option>
              <option value="active">Aktif Berjalan</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-ink-muted hover:text-ink-primary hover:bg-surface-secondary rounded-xl transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold bg-brand-primary hover:bg-brand-dark text-white rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            {initialData?.id ? 'Simpan Perubahan' : 'Buat Program'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
