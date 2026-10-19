import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  FileEdit, 
  ArrowRightCircle, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toLowerCase();

  let bg = 'bg-gray-100 text-gray-700 border-gray-200';
  let icon = <Clock className="w-3.5 h-3.5" />;
  let label = status;

  if (normalized === 'active' || normalized === 'verified (demo)' || normalized === 'published (demo)') {
    bg = 'bg-emerald-50 text-brand-primary border-emerald-200 font-semibold';
    icon = <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />;
    label = status === 'active' ? 'Aktif Berjalan' : status;
  } else if (normalized === 'approved' || normalized === 'approved (demo)' || normalized === 'disbursed (demo)') {
    bg = 'bg-teal-50 text-teal-800 border-teal-200 font-medium';
    icon = <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />;
    label = status === 'approved' ? 'Disetujui (Demo)' : status;
  } else if (normalized === 'under_review' || normalized === 'pending review' || normalized === 'pending approval' || normalized === 'in review') {
    bg = 'bg-amber-50 text-amber-800 border-amber-200 font-medium';
    icon = <Clock className="w-3.5 h-3.5 text-amber-600" />;
    label = normalized === 'under_review' ? 'Dalam Peninjauan' : status;
  } else if (normalized === 'draft') {
    bg = 'bg-slate-100 text-slate-700 border-slate-200 font-medium';
    icon = <FileEdit className="w-3.5 h-3.5 text-slate-500" />;
    label = 'Draf';
  } else if (normalized === 'submitted') {
    bg = 'bg-blue-50 text-blue-700 border-blue-200 font-medium';
    icon = <Sparkles className="w-3.5 h-3.5 text-blue-500" />;
    label = 'Diajukan';
  } else if (normalized === 'completed') {
    bg = 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold';
    icon = <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />;
    label = 'Selesai';
  } else if (normalized === 'converted') {
    bg = 'bg-purple-50 text-purple-700 border-purple-200 font-medium';
    icon = <ArrowRightCircle className="w-3.5 h-3.5 text-purple-600" />;
    label = 'Dikonversi ke Program';
  } else if (normalized === 'rejected' || normalized === 'suspended' || normalized === 'cancelled') {
    bg = 'bg-red-50 text-red-700 border-red-200 font-medium';
    icon = <XCircle className="w-3.5 h-3.5 text-red-600" />;
    label = normalized === 'rejected' ? 'Ditolak' : normalized === 'cancelled' ? 'Dibatalkan' : status;
  } else if (normalized === 'needs update') {
    bg = 'bg-orange-50 text-orange-700 border-orange-200 font-medium';
    icon = <AlertCircle className="w-3.5 h-3.5 text-orange-600" />;
    label = 'Perlu Pembaruan';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs gap-1' : 'px-2.5 py-1 text-xs gap-1.5';

  return (
    <span className={`inline-flex items-center rounded-full border shadow-xs transition-colors ${bg} ${sizeClasses}`}>
      {icon}
      <span>{label}</span>
    </span>
  );
};
