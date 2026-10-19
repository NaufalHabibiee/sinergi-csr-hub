import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CSRStoreProvider } from './context/CSRStoreContext';
import { AppShell } from './components/layout/AppShell';
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

export const App: React.FC = () => {
  return (
    <CSRStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CSRStoreProvider>
  );
};

export default App;
