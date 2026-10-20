import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, LayoutDashboard, ArrowRight, Building2, Users, ShieldCheck, User } from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { UserRole } from '../../types/csr';

interface HeaderUserProfileProps {
  isDarkNavbar?: boolean;
  className?: string;
}

export const HeaderUserProfile: React.FC<HeaderUserProfileProps> = ({
  isDarkNavbar = false,
  className = ''
}) => {
  const { user, isAuthenticated, logout } = useCSRStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // If not logged in, render the standard "Masuk" link
  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className={`text-xs font-semibold transition-colors ${
          isDarkNavbar
            ? 'text-white/85 hover:text-white'
            : 'text-ink-secondary hover:text-ink-primary'
        } ${className}`}
      >
        Masuk
      </Link>
    );
  }

  const roleLabelMap: Record<UserRole, { title: string; badge: string; icon: any }> = {
    funder: { title: 'Funder Korporasi', badge: 'FUNDER', icon: Building2 },
    partner: { title: 'Mitra Pelaksana', badge: 'MITRA', icon: Users },
    viewer: { title: 'Auditor ESG', badge: 'AUDITOR', icon: ShieldCheck },
    manager: { title: 'Program Manager', badge: 'MANAGER', icon: User },
    admin: { title: 'Super Admin TJSL', badge: 'ADMIN', icon: ShieldCheck }
  };

  const roleInfo = roleLabelMap[user.role] || roleLabelMap.funder;
  const RoleIcon = roleInfo.icon;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className={`relative inline-block ${className}`} ref={menuRef}>
      {/* Trigger Button: User Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
          isDarkNavbar
            ? 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
            : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200'
        }`}
        aria-expanded={isOpen}
      >
        {/* Avatar Circle with Initial */}
        <div className="w-6 h-6 rounded-full bg-[#176B4D] text-[#D4F63D] flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
          {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
        </div>

        {/* Display Name */}
        <span className="truncate max-w-[110px]">
          {user.displayName.split(' ')[0]}
        </span>

        {/* Role Pill Badge */}
        <span
          className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
            isDarkNavbar
              ? 'bg-[#D4F63D]/20 text-[#D4F63D]'
              : 'bg-[#176B4D]/10 text-[#176B4D]'
          }`}
        >
          {roleInfo.badge}
        </span>

        {/* Chevron icon */}
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-64 sm:w-72 bg-white rounded-2xl shadow-[0_16px_40px_-8px_rgba(0,0,0,0.18)] border border-slate-200/90 p-3 text-slate-800 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* User Profile Card Header */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#176B4D] text-[#D4F63D] flex items-center justify-center text-sm font-black shrink-0 shadow-xs">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-900 truncate">
                {user.displayName}
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                {user.emailDemo}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-[#176B4D]">
                <RoleIcon className="w-3 h-3 text-[#176B4D] shrink-0" />
                <span className="truncate">{roleInfo.title}</span>
              </div>
            </div>
          </div>

          {/* Navigation Action Links */}
          <div className="mt-2 space-y-1">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-[#E8F6F0] hover:text-[#176B4D] transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-[#176B4D]" />
                <span>Buka Dashboard</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#176B4D]" />
            </Link>
          </div>

          {/* Divider */}
          <div className="my-1.5 border-t border-slate-100" />

          {/* Logout Action */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Keluar dari Akun (Logout)</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const HeaderUserProfileMobile: React.FC<{
  onClose?: () => void;
  isDarkTheme?: boolean;
}> = ({ onClose, isDarkTheme = false }) => {
  const { user, isAuthenticated, logout } = useCSRStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
        <Link
          to="/login"
          onClick={onClose}
          className={`w-full py-2 text-center text-xs font-medium ${
            isDarkTheme ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Masuk ke Akun
        </Link>
        <Link
          to="/dashboard"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-full bg-[#D4F63D] hover:bg-[#C2E82E] text-black font-bold flex items-center justify-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
          <span>Buka Dashboard</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-3 border-t border-white/10 space-y-2.5">
      {/* Logged in User Card */}
      <div className={`p-2.5 rounded-xl border flex items-center gap-3 ${
        isDarkTheme
          ? 'bg-white/5 border-white/10 text-white'
          : 'bg-slate-50 border-slate-200 text-slate-800'
      }`}>
        <div className="w-8 h-8 rounded-full bg-[#176B4D] text-[#D4F63D] flex items-center justify-center text-xs font-black shrink-0">
          {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold truncate">{user.displayName}</div>
          <div className="text-[10px] text-emerald-400 capitalize truncate font-medium">
            {user.role} &bull; {user.organizationName || 'SinergiCSR'}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-2">
        <Link
          to="/dashboard"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-full bg-[#D4F63D] hover:bg-[#C2E82E] text-black font-bold flex items-center justify-center gap-2 text-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
          <span>Buka Dashboard Utama</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-2 px-4 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar dari Akun (Logout)</span>
        </button>
      </div>
    </div>
  );
};
