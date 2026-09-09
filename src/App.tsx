// GFC/src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChurchEvent, Sermon, PrayerRequest, Attendee, TextSizeLevel, Member, Announcement, Testimonial } from './types';
import {
  DEFAULT_EVENTS,
  DEFAULT_SERMONS,
  DEFAULT_PRAYERS,
  DEFAULT_ATTENDEES,
  DEFAULT_ANNOUNCEMENTS,
  DEFAULT_TESTIMONIALS
} from './data/churchData';

import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { EventsSection } from './components/EventsSection';
import { SermonsSection } from './components/SermonsSection';
import { PrayerFormSection } from './components/PrayerFormSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { UploadPage } from './pages/UploadPage';
import { bootstrapContent, createRecord, deleteRecord, getContent, resetRemoteData, updateRecord } from './api';

// Get API URL from environment or use localhost as fallback
const API_URL = (import.meta.env.API_URL || import.meta.env.VITE_API_URL || 'https://gfc-admin-rosy.vercel.app').replace(/\/$/, '');

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
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);

  const defaultContent = {
    events: DEFAULT_EVENTS, 
    sermons: DEFAULT_SERMONS, 
    prayers: DEFAULT_PRAYERS, 
    attendees: DEFAULT_ATTENDEES,
    members: [], 
    announcements: DEFAULT_ANNOUNCEMENTS, 
    testimonials: DEFAULT_TESTIMONIALS
  };

  // Modals & Active Section
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
          rootMargin: '-20% 0px -20% 0px',
          threshold: 0.2,
        }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => {
        if (observer) {
          observer.disconnect();
        }
      });
    };
  }, []);

  // ============================================
  // LOAD DATA FROM BACKEND
  // ============================================
  useEffect(() => {
    let cancelled = false;
    const loadRemoteContent = async () => {
      try {
        const remote = await getContent();
        if (cancelled) return;
        
        console.log('Remote content loaded:', remote);
        console.log('Remote events count:', remote.events?.length || 0);
        
        if (!remote.initialized || !remote.events || remote.events.length === 0) {
          console.log('No remote events found, using DEFAULT_EVENTS');
          setEvents(DEFAULT_EVENTS);
          setSermons(DEFAULT_SERMONS);
          setPrayers(DEFAULT_PRAYERS);
          setAttendees(DEFAULT_ATTENDEES);
          setMembers([]);
          setAnnouncements(DEFAULT_ANNOUNCEMENTS);
          setTestimonials(DEFAULT_TESTIMONIALS);
          
          try {
            await bootstrapContent(defaultContent);
            console.log('Bootstrapped default data to backend');
          } catch (bootstrapError) {
            console.error('Failed to bootstrap data:', bootstrapError);
          }
          return;
        }
        
        console.log('Using remote events:', remote.events.length);
        setEvents(remote.events.length > 0 ? remote.events : DEFAULT_EVENTS);
        setSermons(remote.sermons.length > 0 ? remote.sermons : DEFAULT_SERMONS);
        setPrayers(remote.prayers.length > 0 ? remote.prayers : DEFAULT_PRAYERS);
        setAttendees(remote.attendees.length > 0 ? remote.attendees : DEFAULT_ATTENDEES);
        setMembers(remote.members || []);
        setAnnouncements(remote.announcements.length > 0 ? remote.announcements : DEFAULT_ANNOUNCEMENTS);
        setTestimonials(remote.testimonials.length > 0 ? remote.testimonials : DEFAULT_TESTIMONIALS);
        
      } catch (error) {
        console.error('GFC-DATA backend unavailable; using local defaults.', error);
        setEvents(DEFAULT_EVENTS);
        setSermons(DEFAULT_SERMONS);
        setPrayers(DEFAULT_PRAYERS);
        setAttendees(DEFAULT_ATTENDEES);
        setMembers([]);
        setAnnouncements(DEFAULT_ANNOUNCEMENTS);
        setTestimonials(DEFAULT_TESTIMONIALS);
      }
    };
    
    void loadRemoteContent();
    return () => { cancelled = true; };
  }, []);

  // ============================================
  // DARK MODE SYNC
  // ============================================
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

  // ============================================
  // TEXT SIZE PERSIST
  // ============================================
  useEffect(() => {
    localStorage.setItem('gospelfc_textsize', textSize);
  }, [textSize]);

  // ============================================
  // EVENT HANDLERS
  // ============================================
  const saveRemote = (operation: Promise<unknown>) => { 
    operation.catch(error => console.error('Failed to sync with GFC-DATA.', error)); 
  };
  
  const handleDeleteEvent = (id: string) => { 
    setEvents(prev => prev.filter(e => e.id !== id)); 
    saveRemote(deleteRecord('events', id)); 
  };
  
  const handleAddSermon = (newSermon: Sermon) => { 
    setSermons(prev => [newSermon, ...prev]); 
    saveRemote(createRecord('sermons', newSermon)); 
  };
  
  const handleDeleteSermon = (id: string) => { 
    setSermons(prev => prev.filter(s => s.id !== id)); 
    saveRemote(deleteRecord('sermons', id)); 
  };
  
  const handleAddPrayer = (newPrayer: PrayerRequest) => { 
    setPrayers(prev => [newPrayer, ...prev]); 
    saveRemote(createRecord('prayers', newPrayer)); 
  };
  
  const handleDeletePrayer = (id: string) => { 
    setPrayers(prev => prev.filter(p => p.id !== id)); 
    saveRemote(deleteRecord('prayers', id)); 
  };
  
  const handleApprovePrayer = (id: string) => { 
    setPrayers(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p)); 
    saveRemote(updateRecord('prayers', id, { status: 'approved' })); 
  };
  
  const handleMarkPrayerAnswered = (id: string, testimony?: string) => { 
    setPrayers(prev => prev.map(p => p.id === id ? { ...p, status: 'answered', answeredTestimony: testimony } : p)); 
    saveRemote(updateRecord('prayers', id, { status: 'answered', answeredTestimony: testimony })); 
  };
  
  const handleAddAttendee = (newAttendee: Attendee) => { 
    setAttendees(prev => [newAttendee, ...prev]); 
    saveRemote(createRecord('attendees', newAttendee)); 
  };
  
  const handleRegisterAttendee = (newAttendee: Attendee) => { 
    setAttendees(prev => [newAttendee, ...prev]); 
    saveRemote(createRecord('attendees', newAttendee)); 
  };
  
  const handleAddAnnouncement = (newAnnouncement: Announcement) => { 
    setAnnouncements(prev => [newAnnouncement, ...prev]); 
    saveRemote(createRecord('announcements', newAnnouncement)); 
  };
  
  const handleDeleteAnnouncement = (id: string) => { 
    setAnnouncements(prev => prev.filter(a => a.id !== id)); 
    saveRemote(deleteRecord('announcements', id)); 
  };
  
  const handleTogglePinAnnouncement = (id: string) => { 
    const nextIsPinned = !announcements.find(a => a.id === id)?.isPinned; 
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, isPinned: nextIsPinned } : a)); 
    saveRemote(updateRecord('announcements', id, { isPinned: nextIsPinned })); 
  };
  
  const handleAddMember = (newMember: Member) => { 
    setMembers(prev => [newMember, ...prev]); 
    saveRemote(createRecord('members', newMember)); 
  };
  
  const handleDeleteMember = (id: string) => { 
    setMembers(prev => prev.filter(m => m.id !== id)); 
    saveRemote(deleteRecord('members', id)); 
  };
  
  const handleAddTestimonial = (newTestimonial: Testimonial) => { 
    setTestimonials(prev => [newTestimonial, ...prev]); 
    saveRemote(createRecord('testimonials', newTestimonial)); 
  };
  
  const handleDeleteTestimonial = (id: string) => { 
    setTestimonials(prev => prev.filter(t => t.id !== id)); 
    saveRemote(deleteRecord('testimonials', id)); 
  };
  
  const handleResetData = () => {
    void resetRemoteData().catch(error => console.error('Failed to reset remote data.', error));
    localStorage.removeItem('gospelfc_darkmode');
    setEvents(DEFAULT_EVENTS);
    setSermons(DEFAULT_SERMONS);
    setPrayers(DEFAULT_PRAYERS);
    setAttendees(DEFAULT_ATTENDEES);
    setMembers([]);
    setAnnouncements(DEFAULT_ANNOUNCEMENTS);
    setTestimonials(DEFAULT_TESTIMONIALS);
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
  // RENDER - Main Website with Routes
  // ============================================
  return (
    <BrowserRouter>
      <Routes>
        {/* Upload Route - No Header/Footer, Simple Upload Page */}
        <Route
          path="/upload"
          element={<UploadPage apiUrl={API_URL} />}
        />
        
        {/* Main Website Routes - Lahat ng ibang route */}
        <Route
          path="/*"
          element={
            <div className={`min-h-screen bg-white dark:bg-[#0F0F0F] text-slate-900 dark:text-[#F5F5F5] font-sans selection:bg-[#D4AF37] selection:text-black ${fontScaleClass}`}>
              <Header
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                textSize={textSize}
                setTextSize={setTextSize}
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
          }
        />
      </Routes>
    </BrowserRouter>
  );
}