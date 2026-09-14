// GFC/src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChurchEvent, Sermon, PrayerRequest, Attendee, TextSizeLevel, Member, Announcement, Testimonial } from './types';
import {
  DEFAULT_EVENTS,
  DEFAULT_SERMONS,
  DEFAULT_PRAYERS,
  DEFAULT_ATTENDEES,
  DEFAULT_ANNOUNCEMENTS,
  DEFAULT_TESTIMONIALS
} from './data/churchData';

import { PublicLayout } from './components/PublicLayout';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EventsPage } from './pages/EventsPage';
import { VersePage } from './pages/VersePage';
import { PrayerPage } from './pages/PrayerPage';
import { ContactPage } from './pages/ContactPage';
import { UploadPage } from './pages/UploadPage';
import { bootstrapContent, createRecord, deleteRecord, getActivityStream, getContent, resetRemoteData, updateRecord } from './api';

// Keep the public app pointed at the Railway admin API in production.
// VITE_API_URL can override this when running locally or using another API.
const API_URL = (
  import.meta.env.VITE_API_URL ||
  import.meta.env.API_URL ||
  'https://gfc-admin.up.railway.app'
).replace(/\/$/, '');

interface CachedContent {
  events: ChurchEvent[];
  sermons: Sermon[];
  prayers: PrayerRequest[];
  attendees: Attendee[];
  members: Member[];
  announcements: Announcement[];
  testimonials: Testimonial[];
}

const CACHE_KEY = 'gfc_content_cache_v2';

function loadCachedContent(): CachedContent | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedContent;
    if (!parsed || !Array.isArray(parsed.events) || parsed.events.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveCachedContent(content: CachedContent): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(content));
  } catch {
    // Ignore storage failures (private mode, quota, etc.)
  }
}

// Instant first paint on refresh: reuse the last-good data from cache so
// events appear immediately in the stable server order (no loading flash).
const initialCache = loadCachedContent();

export default function App() {
  // Accessibility State
  const [textSize, setTextSize] = useState<TextSizeLevel>(() => {
    const saved = localStorage.getItem('gospelfc_textsize');
    return (saved as TextSizeLevel) || 'normal';
  });

  // Data State
  const [events, setEvents] = useState<ChurchEvent[]>(initialCache?.events?.length ? initialCache.events : DEFAULT_EVENTS);
  const [sermons, setSermons] = useState<Sermon[]>(initialCache?.sermons?.length ? initialCache.sermons : DEFAULT_SERMONS);
  const [prayers, setPrayers] = useState<PrayerRequest[]>(initialCache?.prayers?.length ? initialCache.prayers : DEFAULT_PRAYERS);
  const [attendees, setAttendees] = useState<Attendee[]>(initialCache?.attendees?.length ? initialCache.attendees : DEFAULT_ATTENDEES);
  const [members, setMembers] = useState<Member[]>(initialCache?.members || []);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialCache?.announcements?.length ? initialCache.announcements : DEFAULT_ANNOUNCEMENTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialCache?.testimonials?.length ? initialCache.testimonials : DEFAULT_TESTIMONIALS);

  /*
   * True once we have something to render (cached data on refresh, or the
   * first remote fetch settles). While false we show a loading state so the
   * event cards render exactly once in the stable server order.
   */
  const [dataHydrated, setDataHydrated] = useState(!!initialCache);

  const defaultContent = {
    events: DEFAULT_EVENTS, 
    sermons: DEFAULT_SERMONS, 
    prayers: DEFAULT_PRAYERS, 
    attendees: DEFAULT_ATTENDEES,
    members: [], 
    announcements: DEFAULT_ANNOUNCEMENTS, 
    testimonials: DEFAULT_TESTIMONIALS
  };

  // Give modal (available on every public page)
  const [giveModalOpen, setGiveModalOpen] = useState(false);

  // ============================================
  // LOAD DATA FROM BACKEND + AUTO-REFRESH
  // Polls the backend so admin uploads/deletes appear
  // automatically - no manual refresh needed.
  // ============================================
  useEffect(() => {
    let cancelled = false;
    let hydrated = false;
    let bootstrapped = false;

    const applyDefaults = () => {
      setEvents(DEFAULT_EVENTS);
      setSermons(DEFAULT_SERMONS);
      setPrayers(DEFAULT_PRAYERS);
      setAttendees(DEFAULT_ATTENDEES);
      setMembers([]);
      setAnnouncements(DEFAULT_ANNOUNCEMENTS);
      setTestimonials(DEFAULT_TESTIMONIALS);
    };

    const refreshFromRemote = async () => {
      try {
        const remote = await getContent();
        if (cancelled) return;

        hydrated = true;

        if (!remote.initialized || !remote.events || remote.events.length === 0) {
          console.log('No remote events found, using DEFAULT_EVENTS');
          applyDefaults();

          if (!bootstrapped) {
            bootstrapped = true;
            try {
              await bootstrapContent(defaultContent);
              console.log('Bootstrapped default data to backend');
            } catch (bootstrapError) {
              console.error('Failed to bootstrap data:', bootstrapError);
            }
          }
          return;
        }

        // Keep the same array order as the backend so the cards
        // always render in the same position after refresh.
        const effective: CachedContent = {
          events: remote.events.length > 0 ? remote.events : DEFAULT_EVENTS,
          sermons: remote.sermons.length > 0 ? remote.sermons : DEFAULT_SERMONS,
          prayers: remote.prayers.length > 0 ? remote.prayers : DEFAULT_PRAYERS,
          attendees: remote.attendees.length > 0 ? remote.attendees : DEFAULT_ATTENDEES,
          members: remote.members || [],
          announcements: remote.announcements.length > 0 ? remote.announcements : DEFAULT_ANNOUNCEMENTS,
          testimonials: remote.testimonials.length > 0 ? remote.testimonials : DEFAULT_TESTIMONIALS
        };

        setEvents(effective.events);
        setSermons(effective.sermons);
        setPrayers(effective.prayers);
        setAttendees(effective.attendees);
        setMembers(effective.members);
        setAnnouncements(effective.announcements);
        setTestimonials(effective.testimonials);

        // Remember the last good data so the next refresh paints instantly.
        saveCachedContent(effective);

      } catch (error) {
        console.error('GFC-DATA backend unavailable; using local defaults.', error);
        // Only fall back to defaults if we never got real data,
        // otherwise keep showing the last good data.
        if (!cancelled && !hydrated) applyDefaults();
      } finally {
        if (!cancelled) setDataHydrated(true);
      }
    };

    void refreshFromRemote();

    // Live updates: the backend pushes a notification instantly whenever
    // the admin uploads/deletes photos or events, so no waiting.
    let closeStream: (() => void) | undefined;
    void getActivityStream(activity => {
      if (cancelled) return;
      if (activity.type === 'allPhotos' || activity.type === 'events') {
        if (['photo', 'created', 'updated', 'deleted'].includes(activity.action)) {
          void refreshFromRemote();
        }
      }
    }).then(close => { if (cancelled) close(); else closeStream = close; });

    // Safety-net poll in case the live stream is temporarily down.
    const poll = setInterval(refreshFromRemote, 10000);

    return () => {
      cancelled = true;
      closeStream?.();
      clearInterval(poll);
    };
  }, []);

  // ============================================
  // THEME - Light only
  // ============================================
  useEffect(() => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    htmlElement.classList.remove('dark');
    bodyElement.classList.remove('dark');
    bodyElement.style.backgroundColor = '#ffffff';
    bodyElement.style.color = '#1a1a2e';
  }, []);

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
      <ScrollToTop />
      <Routes>
        {/* Upload Route - No Header/Footer, Simple Upload Page */}
        <Route
          path="/upload"
          element={<UploadPage apiUrl={API_URL} />}
        />

        {/* Public Website Routes - each navbar item is its own page */}
        <Route
          element={
            <PublicLayout
              giveModalOpen={giveModalOpen}
              setGiveModalOpen={setGiveModalOpen}
              fontScaleClass={fontScaleClass}
            />
          }
        >
          <Route
            path="/"
            element={
              <HomePage
                events={events}
                announcements={announcements}
                loading={!dataHydrated}
                onOpenGiveModal={() => setGiveModalOpen(true)}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/events"
            element={<EventsPage events={events} loading={!dataHydrated} />}
          />
          <Route path="/verse" element={<VersePage />} />
          <Route
            path="/prayer"
            element={<PrayerPage prayers={prayers} onSubmitPrayer={handleAddPrayer} />}
          />
          <Route
            path="/contact"
            element={<ContactPage onRegisterAttendee={handleRegisterAttendee} />}
          />

          {/* Fallback: unknown paths go home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}