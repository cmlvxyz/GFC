import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { GiveModal } from './GiveModal';
import { GiveInfo } from '../types';

interface PublicLayoutProps {
  giveModalOpen: boolean;
  setGiveModalOpen: (show: boolean) => void;
  fontScaleClass?: string;
  giveInfo?: GiveInfo[];
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  giveModalOpen,
  setGiveModalOpen,
  fontScaleClass,
  giveInfo
}) => {
  return (
    <>
      <div className={`min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-600 selection:text-white ${fontScaleClass || ''}`}>
        <Header onOpenGiveModal={() => setGiveModalOpen(true)} />
        <Outlet />
        <Footer />
      </div>
      <GiveModal open={giveModalOpen} onClose={() => setGiveModalOpen(false)} giveInfo={giveInfo} />
    </>
  );
};