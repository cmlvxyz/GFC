// src/types.ts

export interface DateEntry {
  date: string;
  photos: string[];
  verse?: string;
  verseRef?: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  tag: string;
  description: string;
  location?: string;
  defaultVerse?: string;
  defaultVerseRef?: string;
  image?: string;
  dateEntries?: DateEntry[];
}

export interface Sermon {
  id: string;
  title: string;
  sermonDate: string;
  speaker?: string;
  verse: string;
  verseRef?: string;
  videoUrl?: string;
  audioUrl?: string;
  audioDuration?: string;
  image?: string;
  description?: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  contact?: string;
  request: string;
  createdAt: string;
  status: 'approved' | 'pending' | 'answered';
  category?: string;
  prayerCount?: number;
  answeredTestimony?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  text: string;
  createdAt: string;
}

export interface Attendee {
  id: string;
  name: string;
  facebookName?: string;
  contact?: string;
  age?: string;
  registeredAt?: string;
}

export interface Announcement {
  id: string;
  title: string;
  details: string;
  date?: string;
  category?: 'General' | 'Urgent' | 'Youth' | 'Worship' | 'Outreach';
  image?: string;
  isPinned?: boolean;
}

export interface Member {
  id: string;
  fullName: string;
  role: 'Member' | 'Youth Leader' | 'Worship Team' | 'Usher / Greeter' | 'Media Ministry' | 'Deacon' | 'Associate Pastor' | 'Pastor' | 'New Visitor';
  ministry: string;
  contactNumber?: string;
  facebookName?: string;
  birthMonth: string;
  isBaptized: boolean;
  joinDate?: string;
  avatar?: string;
}

export interface Pastor {
  id: string;
  name: string;
  role: string;
  facebook: string;
  image: string;
}

export interface Ministry {
  id: string;
  icon: string;
  title: string;
  description: string;
  leader?: string;
  meetingTime?: string;
  location?: string;
  details?: string[];
  photo?: string;
}

export interface Song {
  name: string;
  link: string;
}

export type TextSizeLevel = 'normal' | 'large' | 'extralarge';