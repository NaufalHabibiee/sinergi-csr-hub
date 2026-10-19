import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toLowerCase();

  let bg = 'bg-slate-100 text-slate-600';
  let label = status;

  if (normalized === 'active' || normalized === 'verified (demo)' || normalized === 'published (demo)') {
    bg = 'bg-[#E8F6F0] text-[#176B4D]';
    label =
      normalized === 'active'
        ? 'Aktif'
        : normalized === 'verified (demo)'
        ? 'Terverifikasi'
        : 'Terbit';
  } else if (normalized === 'approved' || normalized === 'approved (demo)' || normalized === 'disbursed (demo)') {
    bg = 'bg-[#E6F4F1] text-teal-700';
    label =
      normalized === 'disbursed (demo)'
        ? 'Tersalurkan'
        : 'Disetujui';
  } else if (normalized === 'under_review' || normalized === 'pending review' || normalized === 'pending approval' || normalized === 'in review') {
    bg = 'bg-[#FEF5E7] text-amber-600';
    label = normalized === 'under_review' ? 'Dalam Proses' : 'Menunggu';
  } else if (normalized === 'draft') {
    bg = 'bg-slate-100 text-slate-600';
    label = 'Draf';
  } else if (normalized === 'submitted') {
    bg = 'bg-[#EBF5FF] text-sky-600';
    label = 'Baru Masuk';
  } else if (normalized === 'completed') {
    bg = 'bg-[#F0EEFF] text-indigo-600';
    label = 'Selesai';
  } else if (normalized === 'converted') {
    bg = 'bg-[#E8F6F0] text-[#176B4D]';
    label = 'Aktif / Dikonversi';
  } else if (normalized === 'rejected' || normalized === 'suspended' || normalized === 'cancelled') {
    bg = 'bg-rose-50 text-rose-600';
    label = normalized === 'rejected' ? 'Ditolak' : normalized === 'cancelled' ? 'Dibatalkan' : 'Ditangguhkan';
  } else if (normalized === 'needs update') {
    bg = 'bg-orange-50 text-orange-600';
    label = 'Perlu Revisi';
  }

  const sizeClasses =
    size === 'sm'
      ? 'px-2.5 py-1 text-[11px] font-semibold'
      : 'px-3 py-1 text-xs font-semibold';

  return (
    <span className={`inline-flex items-center justify-center rounded-lg transition-colors whitespace-nowrap ${bg} ${sizeClasses}`}>
      {label}
    </span>
  );
};
