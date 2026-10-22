import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './layouts/AppLayout';

// Pages
import { LandingPage } from './pages/Landing/LandingPage';
import { ResumeUploadPage } from './pages/ResumeUpload/ResumeUploadPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { CandidateDashboard } from './pages/Candidate/CandidateDashboard';
import { CandidateProfile } from './pages/Candidate/CandidateProfile';
import { CandidateRoadmapPage } from './pages/Candidate/CandidateRoadmapPage';
import { EmployerDashboard } from './pages/Employer/EmployerDashboard';
import { CandidatesPage } from './pages/Employer/CandidatesPage';
import { PositionsPage } from './pages/Employer/PositionsPage';
import { TalentAnalyticsPage } from './pages/Employer/TalentAnalyticsPage';
import { ReportsPage } from './pages/Employer/ReportsPage';
import { CareerExplorerPage } from './pages/Career/CareerExplorerPage';
import { CareerRoleDetailPage } from './pages/Career/CareerRoleDetailPage';
import { CareerPathPage } from './pages/Career/CareerPathPage';
import { SkillIntelligencePage } from './pages/Skills/SkillIntelligencePage';
import { JobMatchingPage } from './pages/Jobs/JobMatchingPage';
import { SettingsPage } from './pages/Settings/SettingsPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Resume Upload & Auth */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<ResumeUploadPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Authenticated Workspace Shell */}
          <Route element={<AppLayout />}>
            {/* Candidate Domain Routes */}
            <Route path="/candidate" element={<CandidateDashboard />} />
            <Route path="/candidate/profile" element={<CandidateProfile />} />
            <Route path="/candidate/skills" element={<SkillIntelligencePage />} />
            <Route path="/candidate/career" element={<CareerExplorerPage />} />
            <Route path="/candidate/career/:role" element={<CareerRoleDetailPage />} />
            <Route path="/candidate/path" element={<CareerPathPage />} />
            <Route path="/candidate/career-path" element={<CareerPathPage />} />
            <Route path="/candidate/roadmap" element={<CandidateRoadmapPage />} />
            <Route path="/candidate/opportunities" element={<JobMatchingPage />} />

            {/* Aliases for convenience */}
            <Route path="/candidate/dashboard" element={<Navigate to="/candidate" replace />} />
            <Route path="/career-explorer" element={<Navigate to="/candidate/career" replace />} />
            <Route path="/career-path" element={<Navigate to="/candidate/path" replace />} />
            <Route path="/skills" element={<Navigate to="/candidate/skills" replace />} />
            <Route path="/opportunities" element={<Navigate to="/candidate/opportunities" replace />} />
            <Route path="/jobs" element={<Navigate to="/candidate/opportunities" replace />} />

            {/* Employer Domain Routes */}
            <Route path="/employer" element={<EmployerDashboard />} />
            <Route path="/employer/candidates" element={<CandidatesPage />} />
            <Route path="/employer/positions" element={<PositionsPage />} />
            <Route path="/employer/skills" element={<SkillIntelligencePage />} />
            <Route path="/employer/analytics" element={<TalentAnalyticsPage />} />
            <Route path="/employer/reports" element={<ReportsPage />} />

            {/* Global Settings */}
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
