import React from 'react';
import { ChurchEvent } from '../types';
import { PageHero } from '../components/PageHero';
import { EventsSection } from '../components/EventsSection';

interface EventsPageProps {
  events: ChurchEvent[];
  loading?: boolean;
}

export const EventsPage: React.FC<EventsPageProps> = ({ events, loading }) => {
  return (
    <main>
      <PageHero
        eyebrow="Events & Gatherings"
        title={<>Worship, prayer, <span className="italic text-indigo-400">& community.</span></>}
        subtitle="From Sunday celebration to midweek prayer meetings — there's always a place for you."
      />
      <EventsSection events={events} loading={loading} />
    </main>
  );
};