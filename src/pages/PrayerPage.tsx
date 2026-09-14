import React from 'react';
import { PrayerRequest } from '../types';
import { PageHero } from '../components/PageHero';
import { PrayerFormSection } from '../components/PrayerFormSection';

interface PrayerPageProps {
  prayers: PrayerRequest[];
  onSubmitPrayer: (prayer: PrayerRequest) => void;
}

export const PrayerPage: React.FC<PrayerPageProps> = ({ prayers, onSubmitPrayer }) => {
  return (
    <main>
      <PageHero
        eyebrow="Prayer Request"
        title={<>Cast your cares on <span className="italic text-indigo-400">Him.</span></>}
        subtitle="Our prayer team is ready to pray with you. No request is too small or too big for our Lord."
      />
      <PrayerFormSection prayers={prayers} onSubmitPrayer={onSubmitPrayer} />
    </main>
  );
};