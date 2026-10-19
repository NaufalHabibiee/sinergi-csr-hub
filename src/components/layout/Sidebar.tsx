import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
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
  PanelLeftClose,
  PanelLeftOpen
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

  const pendingProposalsCount = proposals.filter(
    (p) => p.status === 'submitted' || p.status === 'under_review'
  ).length;
  const activeProgramsCount = programs.filter((p) => p.status === 'active').length;

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: Home, end: true },
    { to: '/dashboard/programs', label: 'Programs', icon: Layers, badge: activeProgramsCount },
    { to: '/dashboard/proposals', label: 'Proposals', icon: FileCheck2, badge: pendingProposalsCount },
    { to: '/dashboard/partners', label: 'Partners', icon: Users },
    { to: '/dashboard/funders', label: 'Funders', icon: Building2 },
    { to: '/dashboard/beneficiaries', label: 'Penerima Manfaat', icon: HeartHandshake },
    { to: '/dashboard/funding', label: 'Penyaluran Dana', icon: Wallet },
    { to: '/dashboard/reports', label: 'Laporan Dampak', icon: FileText },
    { to: '/dashboard/ecosystem', label: 'Ecosystem Map', icon: Network },
    { to: '/dashboard/activity', label: 'Activity Log', icon: History },
    { to: '/dashboard/settings', label: 'Pengaturan', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-100/90 select-none">
      {/* Top Brand Logo (Click to return to Home / Landing Page) */}
      <div
        className={`flex items-center h-20 shrink-0 ${
          collapsed ? 'justify-center px-2' : 'justify-between px-6'
        }`}
      >
        <NavLink
          to="/"
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 group focus:outline-none"
          title="Kembali ke Beranda"
        >
          {collapsed ? (
            <div className="w-11 h-11 rounded-2xl bg-[#E8F6F0] text-[#176B4D] flex items-center justify-center font-black text-lg tracking-wider shrink-0 group-hover:bg-[#176B4D] group-hover:text-white transition-all shadow-2xs">
              U
            </div>
          ) : (
            <div className="flex flex-col">
              <img
                src="/brand/logo-universa.png"
                alt="Universa"
                className="h-6 object-contain object-left group-hover:opacity-85 transition-opacity"
              />
              <span className="text-[10px] font-medium text-slate-400 tracking-wide mt-0.5">
                CSR Management
              </span>
            </div>
          )}
        </NavLink>
      </div>

      {/* Minimalist Navigation List */}
      <nav
        className={`flex-1 py-3 space-y-2 overflow-y-auto no-scrollbar ${
          collapsed ? 'px-3 flex flex-col items-center' : 'px-4'
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onCloseMobile}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                collapsed
                  ? `w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 relative group ${
                      isActive
                        ? 'bg-[#176B4D] text-white shadow-md shadow-[#176B4D]/25'
                        : 'bg-slate-50/90 text-slate-400 hover:bg-[#E8F6F0] hover:text-[#176B4D]'
                    }`
                  : `flex items-center gap-3.5 px-3 py-2 rounded-2xl text-xs font-medium transition-all duration-200 group relative ${
                      isActive
                        ? 'text-slate-900 font-bold bg-slate-50/70'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/60'
                    }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={
                      collapsed
                        ? 'flex items-center justify-center'
                        : `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                            isActive
                              ? 'bg-[#176B4D] text-white shadow-md shadow-[#176B4D]/25'
                              : 'bg-slate-50 text-slate-400 group-hover:bg-[#E8F6F0] group-hover:text-[#176B4D]'
                          }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {!collapsed && (
                    <span className="truncate flex-1 tracking-tight">{item.label}</span>
                  )}

                  {!collapsed && item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                        isActive
                          ? 'bg-[#E8F6F0] text-[#176B4D]'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {collapsed && item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Collapse / Expand Toggle */}
      <div
        className={`p-4 border-t border-slate-50 flex items-center ${
          collapsed ? 'justify-center' : 'justify-between px-5'
        }`}
      >
        {!collapsed && (
          <span className="text-[11px] font-medium text-slate-400">Mode Tampilan</span>
        )}
        <button
          onClick={onToggleCollapse}
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#E8F6F0] text-slate-400 hover:text-[#176B4D] hidden md:flex items-center justify-center transition-colors cursor-pointer"
          title={collapsed ? 'Perluas menu navigasi' : 'Mode ikon minimalis'}
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block sticky top-0 h-screen transition-all duration-300 ease-in-out shrink-0 z-30 ${
          collapsed ? 'w-20' : 'w-60'
        }`}
      >
        <div className="h-full w-full">{sidebarContent}</div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-64 max-w-[85vw] shadow-2xl z-50 h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
