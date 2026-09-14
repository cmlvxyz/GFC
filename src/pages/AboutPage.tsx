import React from 'react';
import { PageHero } from '../components/PageHero';
import { AboutSection } from '../components/AboutSection';

export const AboutPage: React.FC = () => {
  return (
    <main>
      <PageHero
        eyebrow="About GFC"
        title={<>A church family <span className="italic text-indigo-400">for everyone.</span></>}
        subtitle="Get to know who we are, what we believe, and how you can find your place to belong."
      />
      <AboutSection />
    </main>
  );
};