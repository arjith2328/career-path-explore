import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F5] flex text-[#111318]">
      {/* Desktop Navigation Sidebar */}
      <Sidebar />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        {/* Spacious Main Canvas */}
        <main className="flex-1 px-6 sm:px-12 lg:px-16 py-8 sm:py-12 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
