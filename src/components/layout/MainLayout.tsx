import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';
export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F8F5] font-sans selection:bg-primary/20">
      <TopNav />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>);

}