import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { SimulationBanner } from './SimulationBanner';

export const AppShell: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-surface-bg text-ink-primary">
      {/* Top Banner Warning for Prototype / Simulation */}
      <SimulationBanner />

      <div className="flex flex-1 w-full">
        {/* Navigation Sidebar */}
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar onOpenMobileSidebar={() => setMobileOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>

          {/* Simple Global Footer */}
          <footer className="py-6 px-4 border-t border-border-subtle bg-surface-card/50 text-center text-xs text-ink-muted no-print">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>© 2026 Universa CSR Hub — Social Governance & Impact Orchestration Platform</p>
              <p className="text-[11px]">
                Status Lingkungan: <span className="font-semibold text-brand-primary">Simulasi Prototype MVP</span>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
