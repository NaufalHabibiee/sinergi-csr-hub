import React, { useState } from 'react';
import {
  Settings,
  UserCheck,
  RotateCcw,
  ShieldAlert,
  Bell,
  Globe,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { UserRole } from '../../types/csr';

export const SettingsPage: React.FC = () => {
  const { user, switchRole, resetDemoData } = useCSRStore();
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Preference toggles (demo state)
  const [emailNotif, setEmailNotif] = useState(true);
  const [approvalAlert, setApprovalAlert] = useState(true);
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [currencyCode, setCurrencyCode] = useState('IDR');

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-brand-mint text-brand-primary">
            <Settings className="w-5 h-5" />
          </span>
          <h1 className="text-xl font-bold text-ink-primary">Pengaturan & Konfigurasi Demo</h1>
        </div>
        <p className="text-xs text-ink-muted mt-1 max-w-2xl leading-relaxed">
          Kelola profil pengguna demo, preferensi notifikasi, batasan lingkungan prototipe, serta reset dataset awal.
        </p>
      </div>

      {/* Role Switcher Section */}
      <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card space-y-4">
        <div>
          <h2 className="text-sm font-bold text-ink-primary flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-brand-primary" />
            Pengaturan Peran Aktif (Simulasi RBAC)
          </h2>
          <p className="text-xs text-ink-muted mt-0.5">
            Pilih peran pengguna di bawah untuk menguji hak akses antarmuka dan batasan wewenang aksi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            { role: 'manager', label: 'CSR Manager / Operator', desc: 'Kelola program, seleksi proposal, catat distribusi, review laporan.' },
            { role: 'admin', label: 'Platform Admin', desc: 'Akses penuh seluruh data master, konfigurasi akun, dan audit log.' },
            { role: 'funder', label: 'Corporate Funder (PT NEL)', desc: 'Portofolio pendanaan perusahaan, histori komitmen, dan laporan dampak.' },
            { role: 'partner', label: 'Mitra Pelaksana (YMLI)', desc: 'Kirim proposal usulan kegiatan, perbarui progres lapangan, & unggah BAST.' },
            { role: 'viewer', label: 'Viewer / Auditor ESG', desc: 'Mode baca (read-only) untuk pemeriksaan independen transparansi data.' },
          ].map((r) => {
            const isActive = user.role === r.role;
            return (
              <div
                key={r.role}
                onClick={() => switchRole(r.role as UserRole)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isActive
                    ? 'border-brand-primary bg-brand-mint/50 ring-2 ring-brand-mint'
                    : 'border-border-subtle hover:bg-surface-secondary'
                }`}
              >
                <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${isActive ? 'bg-brand-emerald ring-2 ring-brand-mint' : 'bg-border-medium'}`} />
                <div>
                  <div className="font-bold text-ink-primary flex items-center gap-1.5">
                    {r.label}
                    {isActive && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-sm bg-brand-emerald text-white font-bold">
                        Aktif
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-ink-muted mt-0.5 leading-snug">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card space-y-4">
        <div>
          <h2 className="text-sm font-bold text-ink-primary flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-emerald" />
            Preferensi Lokalisasi & Notifikasi
          </h2>
          <p className="text-xs text-ink-muted mt-0.5">Pengaturan format mata uang, tanggal, dan simulasi pengingat.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-ink-primary mb-1">Mata Uang Acuan</label>
            <select
              value={currencyCode}
              onChange={(e) => setCurrencyCode(e.target.value)}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle rounded-xl text-ink-primary text-xs focus:outline-none"
            >
              <option value="IDR">Rupiah Indonesia (IDR - Rp)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink-primary mb-1">Format Tanggal</label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full px-3 py-2 bg-surface-card border border-border-subtle rounded-xl text-ink-primary text-xs focus:outline-none"
            >
              <option value="DD/MM/YYYY">Tanggal Standar Indonesia (19 Okt 2026)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border-subtle text-xs">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={(e) => setEmailNotif(e.target.checked)}
              className="rounded-sm accent-brand-primary"
            />
            <span className="text-ink-secondary">Tampilkan notifikasi dalam aplikasi saat ada proposal baru</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={approvalAlert}
              onChange={(e) => setApprovalAlert(e.target.checked)}
              className="rounded-sm accent-brand-primary"
            />
            <span className="text-ink-secondary">Tampilkan notifikasi konfirmasi pada setiap perubahan status persetujuan</span>
          </label>
        </div>
      </div>

      {/* Security & Prototype Boundaries Notice */}
      <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-card space-y-3 text-xs">
        <h2 className="text-sm font-bold text-ink-primary flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          Batasan Keamanan & Pernyataan Lingkungan MVP
        </h2>
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-ink-secondary leading-relaxed">
          <p>
            <strong>Peringatan Lingkungan Demo:</strong> Sistem ini menggunakan penyimpanan lokal (browser localStorage) untuk mempermudah evaluasi fitur dan demonstrasi pemangku kepentingan. Tidak ada API kunci rahasia atau kredensial perbankan yang disimpan di aplikasi.
          </p>
          <p>
            Untuk penerapan produksi berskala korporat, sistem ini dapat diintegrasikan dengan database terenkripsi (PostgreSQL), Single Sign-On (SSO) SAML/OAuth korporat, server-side RBAC, dan audit trail berbasis WORM (Write Once Read Many).
          </p>
        </div>
      </div>

      {/* Reset Demo Data Danger Zone */}
      <div className="bg-surface-card p-6 rounded-2xl border border-red-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-status-red flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset Data Demo ke Kondisi Awal
          </h2>
          <p className="text-xs text-ink-muted mt-0.5">
            Menghapus seluruh perubahan lokal dan mengembalikan data 5 Funder, 8 Mitra, 8 Program, proposal, dan transaksi pendanaan ke data seed asli.
          </p>
        </div>

        <button
          onClick={() => setIsResetConfirmOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-status-red hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
        >
          Reset Data Demo
        </button>
      </div>

      {/* Reset Confirm Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={resetDemoData}
        title="Konfirmasi Reset Data Demo"
        message="Apakah Anda yakin ingin mengembalikan seluruh data demo ke kondisi awal? Seluruh program, proposal baru, atau bukti yang Anda tambahkan selama sesi ini akan dihapus dari penyimpanan lokal."
        confirmLabel="Ya, Reset Sekarang"
        isDestructive={true}
      />
    </div>
  );
};
