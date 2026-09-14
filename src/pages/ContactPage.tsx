import React from 'react';
import { Attendee } from '../types';
import { PageHero } from '../components/PageHero';
import { ContactSection } from '../components/ContactSection';

interface ContactPageProps {
  onRegisterAttendee: (attendee: Attendee) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onRegisterAttendee }) => {
  return (
    <main>
      <PageHero
        eyebrow="Contact & Location"
        title={<>We'd love to <span className="italic text-indigo-400">welcome you.</span></>}
        subtitle="Reach out, get directions, or register your family for the next Sunday service."
      />
      <ContactSection onRegisterAttendee={onRegisterAttendee} />
    </main>
  );
};