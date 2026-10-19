export function formatIDR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactIDR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return 'Rp 0';
  if (Math.abs(amount) >= 1_000_000_000) {
    return `Rp ${(amount / 1_000_000_000).toFixed(1).replace(/\.0$/, '')} M`;
  }
  if (Math.abs(amount) >= 1_000_000) {
    return `Rp ${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')} Jt`;
  }
  if (Math.abs(amount) >= 1_000) {
    return `Rp ${(amount / 1_000).toFixed(0)} Rb`;
  }
  return formatIDR(amount);
}

export function formatDateID(dateString: string): string {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatDateTimeID(dateString: string): string {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatNumber(num: number): string {
  if (isNaN(num) || num === null || num === undefined) return '0';
  return new Intl.NumberFormat('id-ID').format(num);
}

export function formatPercent(percent: number): string {
  if (isNaN(percent) || percent === null || percent === undefined) return '0%';
  return `${Math.round(percent)}%`;
}

export const CATEGORY_LABELS: Record<string, { label: string; color: string; badgeBg: string }> = {
  pendidikan: { label: 'Pendidikan & Beasiswa', color: '#2563EB', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200' },
  lingkungan: { label: 'Lingkungan & Reboisasi', color: '#176B4D', badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  ekonomi_umkm: { label: 'Pemberdayaan UMKM', color: '#D97706', badgeBg: 'bg-amber-50 text-amber-800 border-amber-200' },
  kesehatan: { label: 'Kesehatan Masyarakat', color: '#E11D48', badgeBg: 'bg-rose-50 text-rose-700 border-rose-200' },
  infrastruktur: { label: 'Infrastruktur & Air Bersih', color: '#0284C7', badgeBg: 'bg-sky-50 text-sky-700 border-sky-200' },
  tanggap_bencana: { label: 'Tanggap Darurat Bencana', color: '#DC2626', badgeBg: 'bg-red-50 text-red-700 border-red-200' },
  lainnya: { label: 'Program Lainnya', color: '#6B7280', badgeBg: 'bg-gray-50 text-gray-700 border-gray-200' },
};
