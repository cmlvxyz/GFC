// src/App.tsx

import React, { useState, useEffect } from 'react';
import { ChurchEvent, Sermon, PrayerRequest, Attendee, TextSizeLevel, Member, Announcement, Testimonial } from './types';
import {
  DEFAULT_EVENTS,
  DEFAULT_SERMONS,
  DEFAULT_PRAYERS,
  DEFAULT_ATTENDEES,
  DEFAULT_ANNOUNCEMENTS
} from './data/churchData';

import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { EventsSection } from './components/EventsSection';
import { SermonsSection } from './components/SermonsSection';
import { PrayerFormSection } from './components/PrayerFormSection';
import { ContactSection } from './components/ContactSection';
import { AdminPage } from './pages/AdminPage';
import { Footer } from './components/Footer';

export default function App() {
  // Theme & Accessibility State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('gospelfc_darkmode');
    return saved ? JSON.parse(saved) : true;
  });

  const [textSize, setTextSize] = useState<TextSizeLevel>(() => {
    const saved = localStorage.getItem('gospelfc_textsize');
    return (saved as TextSizeLevel) || 'normal';
  });

  // Data State
  const [events, setEvents] = useState<ChurchEvent[]>(DEFAULT_EVENTS);
  const [sermons, setSermons] = useState<Sermon[]>(DEFAULT_SERMONS);
  const [prayers, setPrayers] = useState<PrayerRequest[]>(DEFAULT_PRAYERS);
  const [attendees, setAttendees] = useState<Attendee[]>(DEFAULT_ATTENDEES);
  const [members, setMembers] = useState<Member[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>(DEFAULT_ANNOUNCEMENTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Modals & Active Section
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [giveModalOpen, setGiveModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('homeSection');

  // ============================================
  // INTERSECTION OBSERVER - Auto-detect active section on scroll
  // ============================================
  useEffect(() => {
    const sectionIds = ['homeSection', 'aboutSection', 'eventsSection', 'sermonsSection', 'prayerSection', 'contactSection'];
    
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          root: null,
          rootMargin: '-20% 0px -20% 0px', // Trigger when section is in the middle of viewport
          threshold: 0.2,
        }
      );

      observer.observe(element);
      return observer;
    });

    // Cleanup
    return () => {
      observers.forEach((observer) => {
        if (observer) {
          observer.disconnect();
        }
      });
    };
  }, []);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('gospelfc_events');
    if (savedEvents) {
      try { setEvents(JSON.parse(savedEvents)); } catch (e) {}
    }

    const savedSermons = localStorage.getItem('gospelfc_sermons');
    if (savedSermons) {
      try { setSermons(JSON.parse(savedSermons)); } catch (e) {}
    }

    const savedPrayers = localStorage.getItem('gospelfc_prayers');
    if (savedPrayers) {
      try { setPrayers(JSON.parse(savedPrayers)); } catch (e) {}
    }

    const savedAttendees = localStorage.getItem('gospelfc_attendees');
    if (savedAttendees) {
      try { setAttendees(JSON.parse(savedAttendees)); } catch (e) {}
    }

    const savedMembers = localStorage.getItem('gospelfc_members');
    if (savedMembers) {
      try { setMembers(JSON.parse(savedMembers)); } catch (e) {}
    }

    const savedAnnouncements = localStorage.getItem('gospelfc_announcements');
    if (savedAnnouncements) {
      try { setAnnouncements(JSON.parse(savedAnnouncements)); } catch (e) {}
    }

    const savedTestimonials = localStorage.getItem('gospelfc_testimonials');
    if (savedTestimonials) {
      try { setTestimonials(JSON.parse(savedTestimonials)); } catch (e) {}
    }
  }, []);

  // Dark Mode Sync
  useEffect(() => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    if (isDarkMode) {
      htmlElement.classList.add('dark');
      bodyElement.classList.add('dark');
      bodyElement.style.backgroundColor = '#0F0F0F';
      bodyElement.style.color = '#F5F5F5';
    } else {
      htmlElement.classList.remove('dark');
      bodyElement.classList.remove('dark');
      bodyElement.style.backgroundColor = '#ffffff';
      bodyElement.style.color = '#1a1a2e';
    }
    
    localStorage.setItem('gospelfc_darkmode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Text Size Persist
  useEffect(() => {
    localStorage.setItem('gospelfc_textsize', textSize);
  }, [textSize]);

  // Save State Changes
  useEffect(() => { localStorage.setItem('gospelfc_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('gospelfc_sermons', JSON.stringify(sermons)); }, [sermons]);
  useEffect(() => { localStorage.setItem('gospelfc_prayers', JSON.stringify(prayers)); }, [prayers]);
  useEffect(() => { localStorage.setItem('gospelfc_attendees', JSON.stringify(attendees)); }, [attendees]);
  useEffect(() => { localStorage.setItem('gospelfc_members', JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem('gospelfc_announcements', JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem('gospelfc_testimonials', JSON.stringify(testimonials)); }, [testimonials]);

  // Event Handlers
  const handleAddEvent = (newEvent: ChurchEvent) => setEvents(prev => [newEvent, ...prev]);
  const handleUpdateEvent = (updatedEvent: ChurchEvent) => setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  const handleDeleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));

  const handleAddSermon = (newSermon: Sermon) => setSermons(prev => [newSermon, ...prev]);
  const handleDeleteSermon = (id: string) => setSermons(prev => prev.filter(s => s.id !== id));

  const handleAddPrayer = (newPrayer: PrayerRequest) => setPrayers(prev => [newPrayer, ...prev]);
  const handleDeletePrayer = (id: string) => setPrayers(prev => prev.filter(p => p.id !== id));
  const handleApprovePrayer = (id: string) => setPrayers(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p));
  const handleMarkPrayerAnswered = (id: string, testimony?: string) => setPrayers(prev => prev.map(p => p.id === id ? { ...p, status: 'answered', answeredTestimony: testimony } : p));

  const handleAddAttendee = (newAttendee: Attendee) => setAttendees(prev => [newAttendee, ...prev]);
  const handleRegisterAttendee = (newAttendee: Attendee) => setAttendees(prev => [newAttendee, ...prev]);

  const handleAddTestimonial = (newTestimonial: Testimonial) => setTestimonials(prev => [newTestimonial, ...prev]);
  const handleDeleteTestimonial = (id: string) => setTestimonials(prev => prev.filter(t => t.id !== id));

  const handleAddAnnouncement = (newAnn: Announcement) => setAnnouncements(prev => [newAnn, ...prev]);
  const handleDeleteAnnouncement = (id: string) => setAnnouncements(prev => prev.filter(a => a.id !== id));
  const handleTogglePinAnnouncement = (id: string) => setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, isPinned: !a.isPinned } : a));

  const handleAddMember = (newMember: Member) => setMembers(prev => [newMember, ...prev]);
  const handleDeleteMember = (id: string) => setMembers(prev => prev.filter(m => m.id !== id));

  // Reset Data
  const handleResetData = () => {
    localStorage.removeItem('gospelfc_events');
    localStorage.removeItem('gospelfc_sermons');
    localStorage.removeItem('gospelfc_prayers');
    localStorage.removeItem('gospelfc_attendees');
    localStorage.removeItem('gospelfc_members');
    localStorage.removeItem('gospelfc_announcements');
    localStorage.removeItem('gospelfc_testimonials');
    localStorage.removeItem('gospelfc_darkmode');
    setEvents(DEFAULT_EVENTS);
    setSermons(DEFAULT_SERMONS);
    setPrayers(DEFAULT_PRAYERS);
    setAttendees(DEFAULT_ATTENDEES);
    setMembers([]);
    setAnnouncements(DEFAULT_ANNOUNCEMENTS);
    setTestimonials([]);
    window.location.reload();
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fontScaleClass =
    textSize === 'extralarge'
      ? 'text-[118%] leading-relaxed tracking-wide'
      : textSize === 'large'
      ? 'text-[108%] leading-relaxed'
      : 'text-[100%]';

  // ============================================
  // RENDER - Admin Page
  // ============================================
  if (showAdminPage) {
    return (
      <AdminPage
        events={events}
        announcements={announcements}
        sermons={sermons}
        prayers={prayers}
        members={members}
        attendees={attendees}
        testimonials={testimonials}
        onAddEvent={handleAddEvent}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
        onAddAnnouncement={handleAddAnnouncement}
        onDeleteAnnouncement={handleDeleteAnnouncement}
        onTogglePinAnnouncement={handleTogglePinAnnouncement}
        onAddSermon={handleAddSermon}
        onDeleteSermon={handleDeleteSermon}
        onAddPrayer={handleAddPrayer}
        onDeletePrayer={handleDeletePrayer}
        onApprovePrayer={handleApprovePrayer}
        onMarkPrayerAnswered={handleMarkPrayerAnswered}
        onAddAttendee={handleAddAttendee}
        onAddMember={handleAddMember}
        onDeleteMember={handleDeleteMember}
        onResetData={handleResetData}
        onAddTestimonial={handleAddTestimonial}
        onDeleteTestimonial={handleDeleteTestimonial}
        onClose={() => setShowAdminPage(false)}
      />
    );
  }

  // ============================================
  // RENDER - Main Website
  // ============================================
  return (
    <div className={`min-h-screen bg-white dark:bg-[#0F0F0F] text-slate-900 dark:text-[#F5F5F5] font-sans selection:bg-[#D4AF37] selection:text-black ${fontScaleClass}`}>
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        textSize={textSize}
        setTextSize={setTextSize}
        onOpenAdmin={() => setShowAdminPage(true)}
        onOpenPrayerModal={() => scrollToSection('prayerSection')}
        onOpenGiveModal={() => setGiveModalOpen(true)}
        onOpenGetStarted={() => scrollToSection('aboutSection')}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main className="space-y-8">
        <HomeSection
          onOpenPrayerModal={() => scrollToSection('prayerSection')}
          onOpenGiveModal={() => setGiveModalOpen(true)}
          onOpenGetStarted={() => scrollToSection('aboutSection')}
          onNavigateToSermons={() => scrollToSection('sermonsSection')}
          onNavigateToEvents={() => scrollToSection('eventsSection')}
        />

        <AboutSection />

        <EventsSection
          events={events}
          onAddEvent={handleAddEvent}
        />

        <SermonsSection
          sermons={sermons}
          onAddSermon={handleAddSermon}
        />

        <PrayerFormSection
          prayers={prayers}
          onSubmitPrayer={handleAddPrayer}
        />

        <ContactSection
          onRegisterAttendee={handleRegisterAttendee}
          showGiveModal={giveModalOpen}
          setShowGiveModal={setGiveModalOpen}
        />
      </main>

      <Footer />
    </div>
  );
}