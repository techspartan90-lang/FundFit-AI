import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { DashboardTopBar } from '../components/DashboardTopBar';
import { ToastContainer } from '../components/ui/ToastContainer';
import { GlobalSearchModal } from '../components/ui/GlobalSearchModal';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex selection:bg-indigo-500 selection:text-white font-sans">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopBar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
      <GlobalSearchModal />
    </div>
  );
};
