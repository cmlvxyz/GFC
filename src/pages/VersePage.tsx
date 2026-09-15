import React from 'react';
import { PageHero } from '../components/PageHero';
import { SermonsSection } from '../components/SermonsSection';
import { Verse } from '../types';

interface VersePageProps {
  verses?: Verse[];
}

export const VersePage: React.FC<VersePageProps> = ({ verses }) => {
  return (
    <main>
      <PageHero
        eyebrow="Daily Devotion"
        title={<>The Word for <span className="italic text-indigo-400">today.</span></>}
        subtitle="A daily reminder of God's faithfulness — a verse to reflect on, memorize, and share."
      />
      <SermonsSection verses={verses} />
    </main>
  );
};