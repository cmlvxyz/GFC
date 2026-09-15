import React from 'react';
import { PageHero } from '../components/PageHero';
import { AboutSection } from '../components/AboutSection';
import type { AboutImage, AboutInfo, Ministry, Pastor, Song } from '../types';

interface AboutPageProps {
  aboutImages: AboutImage[];
  ministries: Ministry[];
  pastors: Pastor[];
  songs: Song[];
  aboutInfo: AboutInfo[];
}

export const AboutPage: React.FC<AboutPageProps> = ({ aboutImages, ministries, pastors, songs, aboutInfo }) => {
  return (
    <main>
      <PageHero
        eyebrow="About GFC"
        title={<>A church family <span className="italic text-indigo-400">for everyone.</span></>}
        subtitle="Get to know who we are, what we believe, and how you can find your place to belong."
      />
      <AboutSection aboutImages={aboutImages} ministries={ministries} pastors={pastors} songs={songs} aboutInfo={aboutInfo} />
    </main>
  );
};