import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PropertySearchModule from './components/PropertySearchModule';
import DueDiligenceModule from './components/DueDiligenceModule';
import RiskAssessmentModule from './components/RiskAssessmentModule';
import ComparablePropertyModule from './components/ComparablePropertyModule';
import AuditModule from './components/AuditModule';
import ReportGeneratorModal from './components/ReportGeneratorModal';
import NotificationModule from './components/NotificationModule';
import AICopilotModule from './components/AICopilotModule';
import TitleDeedOCRModule from './components/TitleDeedOCRModule';
import SideBySideCompareModule from './components/SideBySideCompareModule';
import FinancialStressTestModule from './components/FinancialStressTestModule';
import AuthModal from './components/AuthModal';
import { MOCK_PROPERTIES, USER_ROLES } from './data/mockProperties';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProperty, setSelectedProperty] = useState(MOCK_PROPERTIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentRole, setCurrentRole] = useState(USER_ROLES[0]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userSession, setUserSession] = useState(null);

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Report Ready", message: "Due Diligence evaluation for 742 Evergreen Terrace completed.", time: "10 mins ago" },
    { id: 2, title: "Risk Flag", message: "FEMA Zone VE flood hazard detected for 450 Ocean Drive.", time: "1 hour ago" },
    { id: 3, title: "Lien Update", message: "$38,500 Mechanics lien filed for 100 Wall Street.", time: "3 hours ago" }
  ]);

  const handleAuthSuccess = (userData) => {
    setUserSession(userData);
    setCurrentRole(userData.role);
    setNotifications((prev) => [
      { id: Date.now(), title: "Account Verified", message: `Welcome ${userData.fullName}! Email OTP verified successfully.`, time: "Just now" },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Navbar & Role Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        unreadNotifications={notifications.length}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        userSession={userSession}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Active Role Indicator Banner */}
        <div className="mb-4 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Active Session:</span>
            <span className="text-cyan-400 font-bold">{currentRole.name} Mode</span>
            {userSession && (
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-semibold border border-emerald-800">
                Verified: {userSession.email}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 overflow-x-auto text-[10px] text-slate-400">
            {currentRole.permissions.map((perm, idx) => (
              <span key={idx} className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                ✓ {perm}
              </span>
            ))}
          </div>
        </div>

        {/* Tab 1: Dashboard */}
        {activeTab === 'dashboard' && (
          <Dashboard
            selectedProperty={selectedProperty}
            setSelectedProperty={setSelectedProperty}
            setActiveTab={setActiveTab}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {/* Tab 2: Property Search */}
        {activeTab === 'search' && (
          <PropertySearchModule
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProperty={(prop) => {
              setSelectedProperty(prop);
              setActiveTab('due-diligence');
            }}
            setActiveTab={setActiveTab}
          />
        )}

        {/* Tab 3: Due Diligence */}
        {activeTab === 'due-diligence' && (
          <DueDiligenceModule
            property={selectedProperty}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {/* Tab 4: Risk Assessment */}
        {activeTab === 'risk-assessment' && (
          <RiskAssessmentModule
            property={selectedProperty}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {/* Tab 5: Market Comps */}
        {activeTab === 'comparables' && (
          <ComparablePropertyModule property={selectedProperty} />
        )}

        {/* Tab 6: AI Copilot */}
        {activeTab === 'ai-copilot' && (
          <AICopilotModule property={selectedProperty} />
        )}

        {/* Tab 7: Deed OCR Scanner */}
        {activeTab === 'ocr-scanner' && (
          <TitleDeedOCRModule />
        )}

        {/* Tab 8: Dual Compare Matrix */}
        {activeTab === 'side-compare' && (
          <SideBySideCompareModule />
        )}

        {/* Tab 9: Stress Test Calculator */}
        {activeTab === 'stress-test' && (
          <FinancialStressTestModule property={selectedProperty} />
        )}

        {/* Tab 10: Audit Logs */}
        {activeTab === 'audit' && (
          <AuditModule />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Real Estate Due Diligence Agent Platform &copy; {new Date().getFullYear()}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Auth: Email OTP Verified</span>
            <span>•</span>
            <span>Security: JWT / OAuth2</span>
            <span>•</span>
            <span>DB: PostgreSQL / Redis</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal (Register / Login / OTP) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Report Generator Modal */}
      {isReportModalOpen && (
        <ReportGeneratorModal
          property={selectedProperty}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}

      {/* Notification Drawer Modal */}
      {isNotificationOpen && (
        <NotificationModule
          notifications={notifications}
          onClear={() => setNotifications([])}
          onClose={() => setIsNotificationOpen(false)}
        />
      )}

    </div>
  );
}
