import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Check,
  CheckCheck,
  ChevronDown,
  UserCheck,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { UserRole } from '../../types/csr';
import { formatDateTimeID } from '../../lib/formatters';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  onOpenMobileSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileSidebar }) => {
  const {
    user,
    switchRole,
    periodFilter,
    setPeriodFilter,
    globalSearchQuery,
    setGlobalSearchQuery,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    programs,
    proposals
  } = useCSRStore();

  const navigate = useNavigate();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const roleRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current && (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rolesList: { role: UserRole; title: string; desc: string }[] = [
    { role: 'manager', title: 'CSR Manager / Universa Operator', desc: 'Kelola program, seleksi proposal, pencairan dana, review laporan' },
    { role: 'admin', title: 'Platform Admin', desc: 'Akses penuh seluruh konfigurasi, master data, dan log aktivitas' },
    { role: 'funder', title: 'Corporate Funder (PT NEL)', desc: 'Portofolio pendanaan perusahaan, komitmen CSR, laporan dampak' },
    { role: 'partner', title: 'Mitra Pelaksana (YMLI)', desc: 'Profil lembaga, kirim proposal, update progres & bukti lapangan' },
    { role: 'viewer', title: 'Viewer / Auditor ESG', desc: 'Mode read-only penuh untuk audit dan pemantauan transparansi' },
  ];

  // Quick search results
  const searchResults = globalSearchQuery.trim()
    ? [
        ...programs
          .filter(p => p.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || p.code.toLowerCase().includes(globalSearchQuery.toLowerCase()))
          .slice(0, 3)
          .map(p => ({ type: 'Program', title: p.title, subtitle: `${p.code} • ${p.location}`, link: `/dashboard/programs/${p.id}` })),
        ...proposals
          .filter(p => p.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || p.code.toLowerCase().includes(globalSearchQuery.toLowerCase()))
          .slice(0, 2)
          .map(p => ({ type: 'Proposal', title: p.title, subtitle: `${p.code} • ${p.category}`, link: `/dashboard/proposals` })),
      ]
    : [];

  return (
    <header className="sticky top-0 z-20 bg-surface-card/90 backdrop-blur-md border-b border-border-subtle no-print">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 gap-4">
        {/* Left: Mobile Menu & Global Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-2 rounded-xl text-ink-muted hover:text-ink-primary hover:bg-surface-secondary transition-colors cursor-pointer"
            aria-label="Buka menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Input */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-muted">
              <Search className="w-4 h-4" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Cari program, proposal, mitra, funder... (tekan '/' untuk cari)"
              className="w-full pl-9 pr-10 py-2 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface-card border border-border-subtle focus:border-brand-primary rounded-xl text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none transition-all shadow-xs"
            />
            {globalSearchQuery && (
              <button
                onClick={() => setGlobalSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-muted hover:text-ink-primary text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            )}

            {/* Quick Search Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div 
                className="absolute left-0 right-0 top-full mt-2 bg-surface-card rounded-2xl border border-border-subtle shadow-elevated p-2 z-50 text-xs"
                onMouseDown={(e) => e.preventDefault()}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                  Hasil Pencarian Cepat
                </div>
                {searchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      navigate(res.link);
                      setSearchFocused(false);
                      setGlobalSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-secondary flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-ink-primary group-hover:text-brand-primary">
                        {res.title}
                      </div>
                      <div className="text-[11px] text-ink-muted">{res.subtitle}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-mint text-brand-primary font-bold">
                      {res.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Action Controls: Period, Notifications, Role Switcher */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Period Selector */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-secondary/80 border border-border-subtle text-xs text-ink-secondary">
            <Calendar className="w-3.5 h-3.5 text-brand-primary" />
            <span className="text-ink-muted text-[11px]">Periode:</span>
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="bg-transparent font-semibold text-ink-primary focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Waktu</option>
              <option value="2026">Tahun 2026</option>
              <option value="2025">Tahun 2025</option>
              <option value="2026-Q1">2026 Triwulan 1</option>
            </select>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-xl text-ink-secondary hover:text-ink-primary hover:bg-surface-secondary transition-colors cursor-pointer"
              title="Notifikasi"
              aria-label="Pemberitahuan"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-status-red ring-2 ring-surface-card" />
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 md:w-96 rounded-2xl bg-surface-card border border-border-subtle shadow-elevated p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-border-subtle">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-ink-primary">Notifikasi In-App</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-mint text-brand-primary">
                        {unreadCount} baru
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] font-semibold text-brand-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Tandai semua dibaca
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto space-y-1.5">
                  {notifications.length === 0 ? (
                    <p className="text-center py-6 text-xs text-ink-muted">Belum ada notifikasi.</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.linkTo) {
                            navigate(n.linkTo);
                            setNotifDropdownOpen(false);
                          }
                        }}
                        className={`p-2.5 rounded-xl text-xs transition-colors cursor-pointer ${
                          n.read ? 'bg-surface-card hover:bg-surface-secondary' : 'bg-brand-mint/40 hover:bg-brand-mint/60 border border-emerald-100'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className={`font-semibold ${n.read ? 'text-ink-primary' : 'text-brand-primary'}`}>
                            {n.title}
                          </span>
                          <span className="text-[10px] text-ink-muted whitespace-nowrap">
                            {formatDateTimeID(n.createdAt)}
                          </span>
                        </div>
                        <p className="text-ink-secondary text-[11px] mt-1 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher Pill & Dropdown */}
          <div className="relative" ref={roleRef}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-surface-secondary hover:bg-surface-muted/70 border border-border-subtle transition-all cursor-pointer text-left"
              title="Ganti Sudut Pandang Peran (Role Demo)"
            >
              <div className="w-7 h-7 rounded-lg bg-brand-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
                {user.displayName[0]}
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold text-ink-primary leading-tight flex items-center gap-1">
                  {user.displayName}
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-sm bg-brand-mint text-brand-primary font-bold border border-emerald-200">
                    {user.role}
                  </span>
                </span>
                <span className="text-[10px] text-ink-muted truncate max-w-[130px]">
                  {user.organizationName}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-ink-muted shrink-0" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-84 rounded-2xl bg-surface-card border border-border-subtle shadow-elevated p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-3 py-2 border-b border-border-subtle mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-ink-primary">
                    <UserCheck className="w-4 h-4 text-brand-primary" />
                    <span>Ubah Peran Pengguna (Demo RBAC)</span>
                  </div>
                  <p className="text-[11px] text-ink-muted mt-0.5">
                    Pilih peran untuk menguji hak akses dan batasan antarmuka.
                  </p>
                </div>

                <div className="space-y-1">
                  {rolesList.map((r) => {
                    const isActive = user.role === r.role;
                    return (
                      <button
                        key={r.role}
                        onClick={() => {
                          switchRole(r.role);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                          isActive
                            ? 'bg-brand-mint text-brand-primary border border-emerald-200 font-semibold'
                            : 'hover:bg-surface-secondary text-ink-primary'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${isActive ? 'bg-brand-emerald ring-2 ring-brand-mint' : 'bg-border-medium'}`} />
                        <div>
                          <div className="text-xs font-bold">{r.title}</div>
                          <div className="text-[10px] text-ink-muted font-normal mt-0.5 leading-snug">
                            {r.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
