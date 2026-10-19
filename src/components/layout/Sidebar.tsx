import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  FileCheck2,
  Users,
  Building2,
  HeartHandshake,
  Wallet,
  FileText,
  History,
  Settings,
  Network,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Globe
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile
}) => {
  const { proposals, programs } = useCSRStore();

  const pendingProposalsCount = proposals.filter(p => p.status === 'submitted' || p.status === 'under_review').length;
  const activeProgramsCount = programs.filter(p => p.status === 'active').length;

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/dashboard/programs', label: 'Programs', icon: Layers, badge: activeProgramsCount },
    { to: '/dashboard/proposals', label: 'Proposals', icon: FileCheck2, badge: pendingProposalsCount, badgeColor: 'bg-amber-100 text-amber-800' },
    { to: '/dashboard/partners', label: 'Partners (Mitra)', icon: Users },
    { to: '/dashboard/funders', label: 'Funders (Corporate)', icon: Building2 },
    { to: '/dashboard/beneficiaries', label: 'Penerima Manfaat', icon: HeartHandshake },
    { to: '/dashboard/funding', label: 'Funding & Penyaluran', icon: Wallet },
    { to: '/dashboard/reports', label: 'Impact & Proper Reports', icon: FileText },
    { to: '/dashboard/ecosystem', label: 'Ecosystem Map', icon: Network, highlight: true },
    { to: '/dashboard/activity', label: 'Activity Log', icon: History },
    { to: '/dashboard/settings', label: 'Settings & Reset', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface-card border-r border-border-subtle">
      {/* Brand Logo & Wordmark */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-border-subtle shrink-0">
        <NavLink 
          to="/dashboard" 
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          {collapsed ? (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-emerald flex items-center justify-center text-white shadow-xs font-black text-lg tracking-wider shrink-0 group-hover:scale-105 transition-transform">
              U
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <img
                  src="/brand/logo-universa.png"
                  alt="Universa"
                  className="h-6 object-contain"
                />
              </div>
              <span className="text-[10px] font-medium text-ink-muted tracking-wide">
                CSR & Social Governance
              </span>
            </div>
          )}
        </NavLink>
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex p-1.5 rounded-lg text-ink-muted hover:text-ink-primary hover:bg-surface-secondary transition-colors cursor-pointer"
          title={collapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Switcher back to Public Website */}
      <div className="px-3 pt-3 pb-1 shrink-0">
        <NavLink
          to="/"
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-brand-primary bg-brand-mint/60 hover:bg-brand-mint border border-emerald-200/70 transition-all shadow-2xs group"
          title={collapsed ? 'Kembali ke Web Depan' : undefined}
        >
          <Globe className="w-4 h-4 text-brand-emerald shrink-0 group-hover:rotate-12 transition-transform" />
          {!collapsed && (
            <div className="flex items-center justify-between flex-1 truncate">
              <span>Ke Web Utama</span>
              <span className="text-[10px] text-brand-emerald font-semibold">Landing →</span>
            </div>
          )}
        </NavLink>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-xs'
                    : item.highlight
                    ? 'bg-brand-mint/60 text-brand-primary hover:bg-brand-mint border border-emerald-200/60'
                    : 'text-ink-secondary hover:bg-surface-secondary hover:text-ink-primary'
                }`
              }
              title={collapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : item.highlight ? 'text-brand-primary' : 'text-ink-muted'}`} />
                  {!collapsed && (
                    <span className="truncate flex-1 tracking-tight">{item.label}</span>
                  )}
                  {!collapsed && item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-surface-secondary text-ink-secondary')}`}>
                      {item.badge}
                    </span>
                  )}
                  {!collapsed && item.highlight && !isActive && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald"></span>
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Quick Info */}
      {!collapsed && (
        <div className="p-4 mx-3 mb-4 rounded-xl bg-surface-secondary/70 border border-border-subtle text-xs">
          <div className="flex items-center gap-2 text-brand-primary font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-emerald" />
            <span>Alur Ekosistem CSR</span>
          </div>
          <p className="text-[11px] text-ink-muted leading-relaxed">
            Corporate → CSR Hub → Mitra Pelaksana → Penerima Manfaat
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block sticky top-0 h-screen transition-all duration-300 ease-in-out shrink-0 z-30 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="h-full w-full">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Backdrop & Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-ink-primary/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-elevated z-50 h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
