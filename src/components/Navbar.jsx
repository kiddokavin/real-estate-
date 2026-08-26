import React from 'react';
import {
  Building2,
  Search,
  LayoutDashboard,
  FileCheck2,
  ShieldAlert,
  BarChart3,
  Bell,
  FileSpreadsheet,
  History,
  Sparkles,
  ScanText,
  GitCompare,
  Calculator
} from 'lucide-react';
import RoleSwitcher from './RoleSwitcher';

export default function Navbar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  currentRole,
  setCurrentRole,
  unreadNotifications,
  onOpenNotifications,
  onOpenReportModal
}) {
  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'search', label: 'Property Search', icon: Search },
    { id: 'due-diligence', label: 'Due Diligence', icon: FileCheck2 },
    { id: 'risk-assessment', label: 'Risk Assessment', icon: ShieldAlert },
    { id: 'comparables', label: 'Market Comps', icon: BarChart3 },
    { id: 'ai-copilot', label: 'AI Copilot', icon: Sparkles },
    { id: 'ocr-scanner', label: 'Deed OCR Scanner', icon: ScanText },
    { id: 'side-compare', label: 'Dual Compare Matrix', icon: GitCompare },
    { id: 'stress-test', label: 'Stress Test Calculator', icon: Calculator },
    { id: 'audit', label: 'Audit Logs', icon: History }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5 font-outfit">
                DUE DILIGENCE <span className="text-cyan-400 font-normal text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">AGENT AI</span>
              </span>
              <span className="text-[11px] text-slate-400 block -mt-0.5">Automated Real Estate Evaluation</span>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search address, APN, or property owner..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'search') setActiveTab('search');
                }}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReportModal}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export Report
            </button>

            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {unreadNotifications}
                </span>
              )}
            </button>

            <RoleSwitcher currentRole={currentRole} onRoleChange={setCurrentRole} />
          </div>

        </div>

        {/* Navigation Bar */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-900">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
