import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { CSRStoreProvider, useCSRStore } from './context/CSRStoreContext';
import { AppShell } from './components/layout/AppShell';
import { LandingPage } from './features/landing/LandingPage';
import { OverviewPage } from './features/dashboard/OverviewPage';
import { EcosystemMap } from './features/dashboard/EcosystemMap';
import { ProgramsPage } from './features/programs/ProgramsPage';
import { ProgramDetailPage } from './features/programs/ProgramDetailPage';
import { ProposalsPage } from './features/proposals/ProposalsPage';
import { PartnersPage } from './features/partners/PartnersPage';
import { FundersPage } from './features/funders/FundersPage';
import { BeneficiariesPage } from './features/beneficiaries/BeneficiariesPage';
import { FundingPage } from './features/funding/FundingPage';
import { ImpactReportsPage } from './features/reports/ImpactReportsPage';
import { ActivityLogPage } from './features/activity/ActivityLogPage';
import { SettingsPage } from './features/settings/SettingsPage';
import { AuthPage } from './features/auth/AuthPage';
import { PublicProgramsPage } from './features/programs/PublicProgramsPage';
import { PublicAboutPage } from './features/about/PublicAboutPage';

const ProgramIdRedirect: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={`/dashboard/programs/${id}`} replace />;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useCSRStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <CSRStoreProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Introduction & Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<PublicAboutPage />} />
          <Route path="/login" element={<AuthPage defaultMode="login" />} />
          <Route path="/signup" element={<AuthPage defaultMode="signup" />} />
          <Route path="/auth" element={<Navigate to="/login" replace />} />

          {/* Platform Management Dashboard (Protected by AuthGuard) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<OverviewPage />} />
            <Route path="ecosystem" element={<EcosystemMap />} />
            <Route path="programs" element={<ProgramsPage />} />
            <Route path="programs/:id" element={<ProgramDetailPage />} />
            <Route path="proposals" element={<ProposalsPage />} />
            <Route path="partners" element={<PartnersPage />} />
            <Route path="funders" element={<FundersPage />} />
            <Route path="beneficiaries" element={<BeneficiariesPage />} />
            <Route path="funding" element={<FundingPage />} />
            <Route path="reports" element={<ImpactReportsPage />} />
            <Route path="activity" element={<ActivityLogPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Compatibility Redirects */}
          <Route path="/ecosystem" element={<Navigate to="/dashboard/ecosystem" replace />} />
          {/* Public Sub-Page for Programs Catalog */}
          <Route path="/programs" element={<PublicProgramsPage />} />
          <Route path="/programs/:id" element={<ProgramIdRedirect />} />
          <Route path="/proposals" element={<Navigate to="/dashboard/proposals" replace />} />
          <Route path="/partners" element={<Navigate to="/dashboard/partners" replace />} />
          <Route path="/funders" element={<Navigate to="/dashboard/funders" replace />} />
          <Route path="/beneficiaries" element={<Navigate to="/dashboard/beneficiaries" replace />} />
          <Route path="/funding" element={<Navigate to="/dashboard/funding" replace />} />
          <Route path="/reports" element={<Navigate to="/dashboard/reports" replace />} />
          <Route path="/activity" element={<Navigate to="/dashboard/activity" replace />} />
          <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CSRStoreProvider>
  );
};

export default App;
