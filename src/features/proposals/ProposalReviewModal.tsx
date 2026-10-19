import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { useCSRStore } from '../../context/CSRStoreContext';
import { Proposal } from '../../types/csr';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { formatCompactIDR, formatIDR, formatDateID, formatNumber, CATEGORY_LABELS } from '../../lib/formatters';
import { CheckCircle2, XCircle, ArrowRightCircle, Sparkles, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProposalReviewModalProps {
  proposal: Proposal | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProposalReviewModal: React.FC<ProposalReviewModalProps> = ({
  proposal,
  isOpen,
  onClose
}) => {
  const navigate = useNavigate();
  const { partners, funders, reviewProposal, convertProposalToProgram } = useCSRStore();

  const [notes, setNotes] = useState(proposal?.reviewNotes || '');
  const [selectedFunderId, setSelectedFunderId] = useState(funders[0]?.id || '');
  const [approvedBudget, setApprovedBudget] = useState(proposal?.proposedBudget || 0);
  const [showConvertSection, setShowConvertSection] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!proposal) return null;

  const partner = partners.find((p) => p.id === proposal.partnerId);
  const catInfo = CATEGORY_LABELS[proposal.category];

  const handleApprove = () => {
    reviewProposal(proposal.id, 'approved', notes || 'Proposal disetujui untuk penjajakan pendanaan korporat.');
    setShowConvertSection(true);
  };

  const handleReject = () => {
    if (!notes.trim()) {
      setErrorMsg('Catatan penolakan wajib diisi untuk memberikan umpan balik kepada mitra.');
      return;
    }
    reviewProposal(proposal.id, 'rejected', notes);
    onClose();
  };

  const handleConvert = () => {
    const createdProg = convertProposalToProgram(proposal.id, selectedFunderId, approvedBudget);
    if (createdProg) {
      onClose();
      navigate(`/dashboard/programs/${createdProg.id}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Kurasi Proposal: ${proposal.code}`}
      subtitle="Evaluasi kelayakan program, keselarasan ESG, dan rencana alokasi anggaran."
      maxWidth="2xl"
    >
      <div className="space-y-4 text-xs">
        {/* Top Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-surface-secondary/70 rounded-xl border border-border-subtle">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${catInfo?.badgeBg || 'bg-gray-50'}`}>
              {catInfo?.label || proposal.category}
            </span>
            <span className="text-ink-muted">Diajukan: {formatDateID(proposal.submittedAt)}</span>
          </div>
          <StatusBadge status={proposal.status} />
        </div>

        <div>
          <h3 className="font-extrabold text-base text-ink-primary leading-tight">
            {proposal.title}
          </h3>
          <p className="text-ink-muted text-xs mt-0.5">
            Pengusul: <strong className="text-ink-primary">{partner?.name || 'Mitra Sosial'}</strong> ({partner?.region})
          </p>
        </div>

        {/* Financial & Scope metrics */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-surface-card rounded-xl border border-border-subtle text-center">
          <div>
            <div className="text-[10px] text-ink-muted">Usulan Anggaran</div>
            <div className="text-sm font-extrabold text-brand-primary mt-0.5">
              {formatCompactIDR(proposal.proposedBudget)}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-ink-muted">Target Penerima</div>
            <div className="text-sm font-extrabold text-ink-primary mt-0.5">
              {formatNumber(proposal.targetBeneficiaries)} Jiwa
            </div>
          </div>
          <div>
            <div className="text-[10px] text-ink-muted">Estimasi Durasi</div>
            <div className="text-sm font-extrabold text-ink-primary mt-0.5">
              {proposal.estimatedDurationMonths} Bulan
            </div>
          </div>
        </div>

        {/* Problem & Activities */}
        <div className="space-y-3">
          <div>
            <h4 className="font-bold text-ink-primary mb-1">Latar Belakang & Masalah:</h4>
            <p className="p-3 bg-surface-secondary/50 rounded-xl border border-border-subtle text-ink-secondary leading-relaxed">
              {proposal.problemStatement}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-ink-primary mb-1">Rencana Solusi & Kegiatan:</h4>
            <p className="p-3 bg-surface-secondary/50 rounded-xl border border-border-subtle text-ink-secondary leading-relaxed">
              {proposal.proposedActivities}
            </p>
          </div>
        </div>

        {/* Review Notes Section */}
        <div className="pt-3 border-t border-border-subtle space-y-2">
          <label className="block font-bold text-ink-primary">
            Catatan Kurator / Reviewer Universa:
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              setErrorMsg('');
            }}
            placeholder="Tuliskan catatan kelayakan, rekomendasi revisi, atau alasan persetujuan..."
            className="w-full px-3 py-2 bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-ink-primary text-xs focus:outline-none"
          />
          {errorMsg && <p className="text-status-red text-[11px] font-semibold">{errorMsg}</p>}
        </div>

        {/* Convert to Program Section (if approved or converted) */}
        {(proposal.status === 'approved' || showConvertSection) && proposal.status !== 'converted' && (
          <div className="p-4 bg-brand-mint/60 border border-emerald-300 rounded-2xl space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-brand-primary font-bold">
              <Sparkles className="w-4 h-4 text-brand-emerald" />
              <span>Konversi Proposal Menjadi Program CSR Aktif</span>
            </div>
            <p className="text-[11px] text-ink-secondary leading-relaxed">
              Pilih Corporate Funder yang berkomitmen mendanai program ini dan tetapkan anggaran yang disetujui.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-ink-primary mb-1">Pilih Funder Korporat:</label>
                <select
                  value={selectedFunderId}
                  onChange={(e) => setSelectedFunderId(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-card border border-border-subtle rounded-xl text-ink-primary text-xs focus:outline-none"
                >
                  {funders.map((f) => (
                    <option key={f.id} value={f.id}>{f.name} ({f.subType})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-ink-primary mb-1">Anggaran Disetujui (Rp):</label>
                <input
                  type="number"
                  value={approvedBudget}
                  onChange={(e) => setApprovedBudget(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-surface-card border border-border-subtle rounded-xl text-ink-primary text-xs focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleConvert}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <ArrowRightCircle className="w-4 h-4" />
              Eksekusi Konversi ke Program Baru (Demo)
            </button>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-ink-muted hover:text-ink-primary cursor-pointer"
          >
            Tutup
          </button>

          {proposal.status !== 'converted' && (
            <div className="flex items-center gap-2">
              {proposal.status !== 'rejected' && (
                <button
                  type="button"
                  onClick={handleReject}
                  className="px-4 py-2 text-xs font-bold text-status-red hover:bg-red-50 rounded-xl border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Tolak Proposal
                </button>
              )}
              {proposal.status !== 'approved' && (
                <button
                  type="button"
                  onClick={handleApprove}
                  className="px-4 py-2 text-xs font-bold bg-brand-emerald hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Setujui Proposal (Demo)
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
