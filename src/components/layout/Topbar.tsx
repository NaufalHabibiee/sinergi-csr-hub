import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  ShieldCheck,
  Command,
  ArrowRight,
  SlidersHorizontal,
  Clock,
  Layers,
  Building2,
  FileCheck2,
  FolderGit2
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
    proposals,
    partners,
    funders
  } = useCSRStore();

  const navigate = useNavigate();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const roleRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Keyboard shortcut '/' or 'Cmd+K' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) &&
        document.activeElement !== searchInputRef.current &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && searchFocused) {
        setSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchFocused]);

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

  const rolesList: { role: UserRole; title: string; desc: string; badge: string }[] = [
    {
      role: 'manager',
      title: 'CSR Manager / Hub Lead',
      desc: 'Kelola program, seleksi proposal, alokasi dana, dan verifikasi milestone',
      badge: 'MANAGER',
    },
    {
      role: 'admin',
      title: 'Platform Administrator',
      desc: 'Akses konfigurasi penuh, audit governance master, dan kelola peran',
      badge: 'ADMIN',
    },
    {
      role: 'funder',
      title: 'Corporate Funder (PT NEL)',
      desc: 'Portofolio pendanaan perusahaan, komitmen CSR, dan realisasi dampak',
      badge: 'FUNDER',
    },
    {
      role: 'partner',
      title: 'Mitra Pelaksana (YMLI)',
      desc: 'Pengajuan proposal baru, update progres kegiatan, dan laporan lapangan',
      badge: 'PARTNER',
    },
    {
      role: 'viewer',
      title: 'Auditor ESG / Publik',
      desc: 'Mode pantau transparansi data read-only untuk audit kepatuhan',
      badge: 'VIEWER',
    },
  ];

  // Quick comprehensive search across programs, proposals, partners, and funders
  const searchResults = useMemo(() => {
    const q = globalSearchQuery.trim().toLowerCase();
    if (!q) return [];

    const foundPrograms = programs
      .filter((p) => p.title.toLowerCase().includes(q) || p.code.toLowerCase().includes(q))
      .slice(0, 3)
      .map((p) => ({
        type: 'Program',
        icon: FolderGit2,
        title: p.title,
        subtitle: `${p.code} • ${p.location}`,
        link: `/dashboard/programs/${p.id}`,
        badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      }));

    const foundProposals = proposals
      .filter((p) => p.title.toLowerCase().includes(q) || p.code.toLowerCase().includes(q))
      .slice(0, 2)
      .map((p) => ({
        type: 'Proposal',
        icon: FileCheck2,
        title: p.title,
        subtitle: `${p.code} • ${p.category}`,
        link: `/dashboard/proposals`,
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      }));

    const foundPartners = partners
      .filter((p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q))
      .slice(0, 2)
      .map((p) => ({
        type: 'Mitra',
        icon: Building2,
        title: p.name,
        subtitle: `${p.code} • ${p.region}`,
        link: `/dashboard/partners`,
        badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
      }));

    const foundFunders = funders
      .filter((f) => f.name.toLowerCase().includes(q) || f.code.toLowerCase().includes(q))
      .slice(0, 2)
      .map((f) => ({
        type: 'Funder',
        icon: Building2,
        title: f.name,
        subtitle: `${f.code} • ${f.subType}`,
        link: `/dashboard/funders`,
        badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
      }));

    return [...foundPrograms, ...foundProposals, ...foundPartners, ...foundFunders];
  }, [globalSearchQuery, programs, proposals, partners, funders]);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-border-subtle/80 shadow-2xs no-print transition-all">
      <div className="flex items-center justify-between h-16 px-4 md:px-7 gap-3 sm:gap-6 max-w-7xl w-full mx-auto">
        {/* Left: Mobile Menu & Enhanced Spotlight Search */}
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-2 rounded-xl text-ink-muted hover:text-[#072418] hover:bg-surface-secondary transition-colors cursor-pointer"
            aria-label="Buka navigasi menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Spotlight Search Capsule */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#176B4D]">
              <Search className="w-4 h-4" />
            </div>

            <input
              ref={searchInputRef}
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Cari program, proposal, mitra, funder..."
              className="w-full pl-10 pr-20 py-2.5 bg-surface-secondary/60 hover:bg-surface-secondary/80 focus:bg-white border border-border-subtle focus:border-[#176B4D] focus:ring-2 focus:ring-[#176B4D]/15 rounded-2xl text-xs text-ink-primary placeholder:text-ink-muted/80 focus:outline-none transition-all duration-200 shadow-2xs"
            />

            {/* Clear Button or Keyboard Shortcut Badge */}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5 pointer-events-auto">
              {globalSearchQuery ? (
                <button
                  onClick={() => {
                    setGlobalSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-ink-secondary flex items-center justify-center text-[10px] font-bold cursor-pointer transition-colors"
                  title="Hapus pencarian"
                >
                  ✕
                </button>
              ) : (
                <div className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white border border-border-subtle text-[10px] font-mono text-ink-muted shadow-2xs">
                  <span>⌘</span>
                  <span>K</span>
                </div>
              )}
            </div>

            {/* Rich Autocomplete Spotlight Modal */}
            {searchFocused && searchResults.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-2 bg-white rounded-3xl border border-border-subtle shadow-elevated p-3 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseDown={(e) => e.preventDefault()}
              >
                <div className="flex items-center justify-between px-3 py-1.5 pb-2 text-[10px] font-extrabold text-ink-muted uppercase tracking-wider border-b border-border-subtle">
                  <span>Hasil Pencarian Cepat ({searchResults.length})</span>
                  <span className="text-[10px] font-mono text-ink-muted lowercase">tekan esc untuk tutup</span>
                </div>

                <div className="space-y-1 mt-1.5 max-h-80 overflow-y-auto">
                  {searchResults.map((res, i) => {
                    const IconComponent = res.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          navigate(res.link);
                          setSearchFocused(false);
                          setGlobalSearchQuery('');
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-2xl hover:bg-[#F8FAF9] flex items-center justify-between group transition-colors cursor-pointer border border-transparent hover:border-emerald-950/10"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <div className="w-8 h-8 rounded-xl bg-surface-secondary text-[#176B4D] flex items-center justify-center shrink-0 group-hover:bg-[#072418] group-hover:text-[#FDE047] transition-colors">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <div className="font-bold text-[#072418] group-hover:text-[#176B4D] transition-colors truncate">
                              {res.title}
                            </div>
                            <div className="text-[11px] text-ink-muted truncate">{res.subtitle}</div>
                          </div>
                        </div>

                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border shrink-0 ${res.badgeBg}`}>
                          {res.type}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center / Right: Live Status Badge, Period Filter, Notifications, Executive Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Live Governance Telemetry Indicator */}
          <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/80 text-[11px] font-bold text-emerald-900 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span>Governance WTP Aktif</span>
          </div>

          {/* Period Selector Capsule */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-2xl bg-surface-secondary/70 hover:bg-surface-secondary border border-border-subtle text-xs text-ink-secondary transition-all">
            <Calendar className="w-3.5 h-3.5 text-[#176B4D]" />
            <span className="text-ink-muted text-[11px] font-medium">Periode:</span>
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="bg-transparent font-bold text-[#072418] focus:outline-none cursor-pointer pr-1"
            >
              <option value="all">Semua Waktu</option>
              <option value="2026">Tahun 2026</option>
              <option value="2025">Tahun 2025</option>
              <option value="2026-Q1">2026 Q1 (Jan-Mar)</option>
            </select>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative w-10 h-10 rounded-2xl bg-surface-secondary/70 hover:bg-surface-secondary border border-border-subtle text-ink-secondary hover:text-[#072418] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              title="Notifikasi Sistem"
              aria-label="Pemberitahuan"
            >
              <Bell className="w-4 h-4 text-ink-secondary" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-3 w-80 md:w-96 rounded-3xl bg-white border border-border-subtle shadow-elevated p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-border-subtle">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-[#072418]">Notifikasi & Audit Alert</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                        {unreadCount} Baru
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] font-bold text-[#176B4D] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Tandai dibaca
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <p className="text-center py-6 text-xs text-ink-muted">Belum ada notifikasi baru.</p>
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
                        className={`p-3 rounded-2xl text-xs transition-colors cursor-pointer border ${
                          n.read
                            ? 'bg-white hover:bg-surface-secondary/70 border-border-subtle'
                            : 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className={`font-bold ${n.read ? 'text-ink-primary' : 'text-[#072418]'}`}>
                            {n.title}
                          </span>
                          <span className="text-[10px] text-ink-muted font-mono whitespace-nowrap">
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

          {/* Executive User Capsule / Role Switcher */}
          <div className="relative" ref={roleRef}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-surface-secondary/70 hover:bg-surface-secondary border border-border-subtle hover:border-[#176B4D]/40 transition-all cursor-pointer text-left shadow-2xs group"
              title="Ganti Sudut Pandang Peran (Demo RBAC)"
            >
              {/* Executive Monogram Avatar */}
              <div className="w-8 h-8 rounded-xl bg-[#072418] text-[#FDE047] font-black flex items-center justify-center text-xs shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                {user.displayName[0]}
              </div>

              <div className="hidden sm:flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-[#072418] leading-tight truncate max-w-[130px]">
                    {user.displayName}
                  </span>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {user.role}
                  </span>
                </div>
                <span className="text-[10px] text-ink-muted truncate max-w-[140px] mt-0.5">
                  {user.organizationName}
                </span>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-ink-muted shrink-0 group-hover:text-[#072418] transition-colors" />
            </button>

            {/* RBAC Role Switcher Dropdown */}
            {roleDropdownOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-92 rounded-3xl bg-white border border-border-subtle shadow-elevated p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-2.5 border-b border-border-subtle mb-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#072418]">
                    <UserCheck className="w-4 h-4 text-[#176B4D]" />
                    <span>Simulasi Hak Akses Pengguna (RBAC)</span>
                  </div>
                  <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                    Ganti peran di bawah untuk menguji sudut pandang otorisasi & hak akses di platform Universa.
                  </p>
                </div>

                <div className="space-y-1.5">
                  {rolesList.map((r) => {
                    const isActive = user.role === r.role;
                    return (
                      <button
                        key={r.role}
                        onClick={() => {
                          switchRole(r.role);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 cursor-pointer ${
                          isActive
                            ? 'bg-emerald-50/80 text-[#072418] border border-emerald-300 shadow-2xs'
                            : 'hover:bg-surface-secondary text-ink-primary border border-transparent'
                        }`}
                      >
                        <div
                          className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                            isActive ? 'bg-[#176B4D] ring-4 ring-emerald-100' : 'bg-gray-300'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-extrabold text-[#072418]">{r.title}</span>
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-white border border-border-subtle text-ink-secondary">
                              {r.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-ink-muted mt-0.5 leading-snug line-clamp-2">
                            {r.desc}
                          </p>
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
