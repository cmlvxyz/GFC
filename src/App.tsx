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

const CACHE_KEY = 'gfc_content_cache_v1';

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
