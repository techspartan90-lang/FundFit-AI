import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderNavbar } from '../components/HeaderNavbar';
import { AppFooter } from '../components/AppFooter';
import { ToastContainer } from '../components/ui/ToastContainer';
import { GlobalSearchModal } from '../components/ui/GlobalSearchModal';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-x-hidden font-sans">
      <HeaderNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <AppFooter />
      <ToastContainer />
      <GlobalSearchModal />
    </div>
  );
};
