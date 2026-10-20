import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Menu,
  Search,
  Bell,
  CheckCheck,
  ChevronDown,
  UserCheck,
  FolderGit2,
  FileCheck2,
  Building2,
  SlidersHorizontal,
  LogOut
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
    logout,
    switchRole,
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
        badgeBg: 'bg-[#E8F6F0] text-[#176B4D]',
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
        badgeBg: 'bg-[#FEF5E7] text-amber-700',
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
        badgeBg: 'bg-sky-50 text-sky-700',
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
        badgeBg: 'bg-indigo-50 text-indigo-700',
      }));

    return [...foundPrograms, ...foundProposals, ...foundPartners, ...foundFunders];
  }, [globalSearchQuery, programs, proposals, partners, funders]);

  return (
    <header className="sticky top-0 z-20 bg-[#F8FAF9]/90 backdrop-blur-md no-print">
      <div className="flex items-center justify-between h-20 px-4 sm:px-8 max-w-7xl w-full mx-auto gap-4">
        {/* Left: Mobile Menu & Minimalist Soft Search Pill */}
        <div className="flex items-center gap-3 flex-1 max-w-2xl lg:max-w-3xl">
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-2.5 rounded-2xl bg-white text-slate-500 hover:text-slate-900 shadow-2xs transition-colors cursor-pointer"
            aria-label="Buka navigasi menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>

            <input
              ref={searchInputRef}
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Cari program, proposal, mitra, funder..."
              className="w-full pl-11 pr-14 py-2.5 bg-white hover:bg-white focus:bg-white border border-slate-100 focus:border-[#176B4D]/30 rounded-full text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none transition-all shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)]"
            />

            {globalSearchQuery ? (
              <button
                onClick={() => {
                  setGlobalSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                ✕
              </button>
            ) : (
              <div className="hidden sm:flex absolute inset-y-0 right-0 pr-3.5 items-center pointer-events-none">
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-200/60">
                  ⌘K
                </span>
              </div>
            )}

            {/* Quick Search Results */}
            {searchFocused && searchResults.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-2 bg-white rounded-3xl shadow-[0_12px_36px_-4px_rgba(0,0,0,0.08)] border border-slate-100 p-2.5 z-50 text-xs animate-in fade-in duration-150"
                onMouseDown={(e) => e.preventDefault()}
              >
                <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Hasil Pencarian
                </div>
                <div className="space-y-1 mt-1 max-h-72 overflow-y-auto">
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
                        className="w-full text-left px-3 py-2 rounded-2xl hover:bg-slate-50 flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#176B4D] flex items-center justify-center shrink-0 group-hover:bg-[#176B4D] group-hover:text-white transition-colors">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <div className="font-semibold text-slate-800 truncate">{res.title}</div>
                            <div className="text-[11px] text-slate-400 truncate">{res.subtitle}</div>
                          </div>
                        </div>
                        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-lg shrink-0 ${res.badgeBg}`}>
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

        {/* Right: Minimalist Circular Controls & Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative w-10 h-10 rounded-full bg-white hover:bg-[#E8F6F0] text-slate-500 hover:text-[#176B4D] flex items-center justify-center transition-colors cursor-pointer shadow-[0_2px_10px_-2px_rgba(0,0,0,0.04)] border border-slate-100/80"
              title="Notifikasi"
              aria-label="Pemberitahuan"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl bg-white border border-slate-100 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.08)] p-4 z-50 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">Notifikasi</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F6F0] text-[#176B4D]">
                        {unreadCount} baru
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] font-semibold text-[#176B4D] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Tandai dibaca
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto space-y-1.5">
                  {notifications.length === 0 ? (
                    <p className="text-center py-6 text-xs text-slate-400">Belum ada notifikasi.</p>
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
                        className={`p-3 rounded-2xl text-xs transition-colors cursor-pointer ${
                          n.read ? 'bg-white hover:bg-slate-50' : 'bg-[#E8F6F0]/40 hover:bg-[#E8F6F0]/70'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-slate-800">{n.title}</span>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">
                            {formatDateTimeID(n.createdAt)}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Minimalist User Avatar & Role Switcher */}
          <div className="relative" ref={roleRef}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full bg-white hover:bg-slate-50/80 border border-slate-100/80 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.04)] transition-all cursor-pointer group"
              title="Ubah Peran Pengguna"
            >
              <div className="w-8 h-8 rounded-full bg-[#176B4D] text-white font-bold flex items-center justify-center text-xs shrink-0">
                {user.displayName[0]}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 leading-none">
                  {user.displayName.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-400 font-medium mt-0.5 capitalize">
                  {user.role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-3xl bg-white border border-slate-100 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.08)] p-3 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-2 border-b border-slate-100 mb-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <UserCheck className="w-4 h-4 text-[#176B4D]" />
                    <span>Pilih Peran Akses (RBAC)</span>
                  </div>
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
                        className={`w-full text-left p-2.5 rounded-2xl transition-all flex items-start gap-2.5 cursor-pointer ${
                          isActive
                            ? 'bg-[#E8F6F0] text-[#176B4D]'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                            isActive ? 'bg-[#176B4D]' : 'bg-slate-300'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">{r.title}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-500">
                              {r.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                            {r.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Logout Button */}
                <div className="pt-2 mt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setRoleDropdownOpen(false);
                      navigate('/login');
                    }}
                    className="w-full text-left p-2.5 rounded-2xl transition-all flex items-center gap-2.5 text-rose-600 hover:bg-rose-50 text-xs font-bold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Keluar dari Akun (Logout)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
