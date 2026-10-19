import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { useCSRStore } from '../../context/CSRStoreContext';
import { ProgramCategory } from '../../types/csr';
import { validateProposalInput } from '../../lib/validators';

interface ProposalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProposalFormModal: React.FC<ProposalFormModalProps> = ({ isOpen, onClose }) => {
  const { partners, createProposal } = useCSRStore();

  const [title, setTitle] = useState('');
  const [partnerId, setPartnerId] = useState(partners[0]?.id || '');
  const [category, setCategory] = useState<ProgramCategory>('lingkungan');
  const [location, setLocation] = useState('');
  const [province, setProvince] = useState('Jawa Barat');
  const [problemStatement, setProblemStatement] = useState('');
  const [proposedActivities, setProposedActivities] = useState('');
  const [proposedBudget, setProposedBudget] = useState(450000000);
  const [targetBeneficiaries, setTargetBeneficiaries] = useState(500);
  const [estimatedDurationMonths, setEstimatedDurationMonths] = useState(6);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateProposalInput({
      title,
      partnerId,
      category,
      location,
      province,
      problemStatement,
      proposedActivities,
      proposedBudget: Number(proposedBudget),
      targetBeneficiaries: Number(targetBeneficiaries),
      estimatedDurationMonths: Number(estimatedDurationMonths)
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    createProposal({
      partnerId,
      title,
      category,
      location,
      province,
      problemStatement,
      proposedActivities,
      proposedBudget: Number(proposedBudget),
      targetBeneficiaries: Number(targetBeneficiaries),
      estimatedDurationMonths: Number(estimatedDurationMonths),
      indicators: [
        { label: 'Target Sasaran Manfaat', target: Number(targetBeneficiaries), unit: 'penerima' },
        { label: 'Indikator Keberhasilan Output', target: 100, unit: '%' }
      ]
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pengajuan Proposal Program CSR"
      subtitle="Mitra pelaksana dapat mengajukan rancangan kegiatan sosial dan anggaran untuk dikurasi."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-ink-primary mb-1">Judul Usulan Program *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Program Sumur Pompa Surya Desa Langganan Kekeringan"
            className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
          />
          {errors.title && <p className="text-status-red text-[11px] mt-1">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-ink-primary mb-1">Mitra Pengusul *</label>
            <select
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            >
              {partners.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {errors.partnerId && <p className="text-status-red text-[11px] mt-1">{errors.partnerId}</p>}
          </div>

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
              <option value="tanggap_bencana">Tanggap Bencana</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-ink-primary mb-1">Lokasi Kabupaten/Kota *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Contoh: Kabupaten Gunungkidul"
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
              placeholder="Contoh: DI Yogyakarta"
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-ink-primary mb-1">Latar Belakang & Pernyataan Masalah *</label>
          <textarea
            rows={2}
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            placeholder="Jelaskan urgensi persoalan sosial atau lingkungan yang ingin diselesaikan..."
            className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
          />
          {errors.problemStatement && <p className="text-status-red text-[11px] mt-1">{errors.problemStatement}</p>}
        </div>

        <div>
          <label className="block font-bold text-ink-primary mb-1">Rencana Kegiatan & Solusi *</label>
          <textarea
            rows={2}
            value={proposedActivities}
            onChange={(e) => setProposedActivities(e.target.value)}
            placeholder="Rincian tahapan pelaksanaan dan metode kerja..."
            className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
          />
          {errors.proposedActivities && <p className="text-status-red text-[11px] mt-1">{errors.proposedActivities}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-bold text-ink-primary mb-1">Usulan Anggaran (Rp) *</label>
            <input
              type="number"
              value={proposedBudget}
              onChange={(e) => setProposedBudget(Number(e.target.value))}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
            {errors.proposedBudget && <p className="text-status-red text-[11px] mt-1">{errors.proposedBudget}</p>}
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Target Sasaran (Jiwa) *</label>
            <input
              type="number"
              value={targetBeneficiaries}
              onChange={(e) => setTargetBeneficiaries(Number(e.target.value))}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
            {errors.targetBeneficiaries && <p className="text-status-red text-[11px] mt-1">{errors.targetBeneficiaries}</p>}
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Estimasi Durasi (Bulan) *</label>
            <input
              type="number"
              value={estimatedDurationMonths}
              onChange={(e) => setEstimatedDurationMonths(Number(e.target.value))}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
            />
            {errors.estimatedDurationMonths && <p className="text-status-red text-[11px] mt-1">{errors.estimatedDurationMonths}</p>}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-ink-muted hover:text-ink-primary cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold bg-brand-primary hover:bg-brand-dark text-white rounded-xl shadow-xs cursor-pointer"
          >
            Kirim Proposal (Demo)
          </button>
        </div>
      </form>
    </Modal>
  );
};
