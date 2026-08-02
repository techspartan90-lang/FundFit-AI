'use client';

import React, { useState } from 'react';
import { Navbar, UserRole } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { AICopilotDrawer } from '../components/AICopilotDrawer';
import { CommandPaletteModal } from '../components/CommandPaletteModal';

import { InvestorDashboard } from '../components/RoleDashboards/InvestorDashboard';
import { AdvisorDashboard } from '../components/RoleDashboards/AdvisorDashboard';
import { AdminDashboard } from '../components/RoleDashboards/AdminDashboard';
import { ResearchAnalystDashboard } from '../components/RoleDashboards/ResearchAnalystDashboard';
import { PortfolioManagerDashboard } from '../components/RoleDashboards/PortfolioManagerDashboard';
import { ComplianceDashboard } from '../components/RoleDashboards/ComplianceDashboard';
import { OperationsDashboard } from '../components/RoleDashboards/OperationsDashboard';

export default function Home() {
  const [currentRole, setCurrentRole] = useState<UserRole>('investor');
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const renderDashboardView = () => {
    // Override if explicit portal selected
    if (currentView === 'advisor_portal') return <AdvisorDashboard />;
    if (currentView === 'research_portal') return <ResearchAnalystDashboard />;
    if (currentView === 'compliance_portal') return <ComplianceDashboard />;
    if (currentView === 'operations_portal') return <OperationsDashboard />;

    // Render based on active role
    switch (currentRole) {
      case 'advisor':
        return <AdvisorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'research':
        return <ResearchAnalystDashboard />;
      case 'portfolio_manager':
        return <PortfolioManagerDashboard />;
      case 'compliance':
        return <ComplianceDashboard />;
      case 'operations':
        return <OperationsDashboard />;
      case 'investor':
      default:
        return <InvestorDashboard onNavigate={(v) => setCurrentView(v)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans flex flex-col justify-between selection:bg-[#2563EB] selection:text-white antialiased">
      
      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={(role) => setCurrentRole(role)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleCopilot={() => setIsCopilotOpen(!isCopilotOpen)}
      />

      {/* Main Application Container */}
      <div className="flex flex-1 max-w-[1600px] w-full mx-auto relative">
        
        {/* Collapsible Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          userRole={currentRole}
        />

        {/* Main Workspace Body */}
        <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-x-hidden">
          {renderDashboardView()}
        </main>

      </div>

      {/* AI Copilot Drawer */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />

      {/* Ctrl + K Universal Command Palette */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(v) => setCurrentView(v)}
      />

    </div>
  );
}
