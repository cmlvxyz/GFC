import type { AboutImage, AboutInfo, Announcement, Attendee, ChurchEvent, GiveInfo, Member, Ministry, Pastor, PrayerRequest, Sermon, SiteSetting, Song, Testimonial, Verse } from './types';

export type Collection = 'events' | 'sermons' | 'prayers' | 'attendees' | 'members' | 'announcements' | 'testimonials' | 'aboutImages' | 'ministries' | 'pastors' | 'songs' | 'aboutInfo' | 'verses' | 'giveInfo' | 'siteSettings';

export interface RemoteContent {
  initialized: boolean;
  events: ChurchEvent[];
  sermons: Sermon[];
  prayers: PrayerRequest[];
  attendees: Attendee[];
  members: Member[];
  announcements: Announcement[];
  testimonials: Testimonial[];
  aboutImages?: AboutImage[];
  ministries?: Ministry[];
  pastors?: Pastor[];
  songs?: Song[];
  aboutInfo?: AboutInfo[];
  verses?: Verse[];
  giveInfo?: GiveInfo[];
  siteSettings?: SiteSetting[];
}

// Production API: GFC public site -> GFC-Admin Railway service.
// VITE_API_URL can override this for local development or another deployment.
const API_URL = (
  import.meta.env.VITE_API_URL ||
  import.meta.env.API_URL ||
  'https://gfc-admin.up.railway.app'
).replace(/\/$/, '');

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(API_URL + '/api' + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {})
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((payload as { message?: string })?.message || ('Request failed with status ' + response.status));
  }
  return payload as T;
}

export function getContent(): Promise<RemoteContent> {
  return request('/content');
}

export function bootstrapContent(content: Record<string, unknown[]>): Promise<RemoteContent> {
  return request('/bootstrap', { method: 'POST', body: JSON.stringify(content) });
}

export function createRecord(collection: Collection, record: unknown): Promise<{ id: string }> {
  return request('/' + collection, { method: 'POST', body: JSON.stringify(record) });
}

export function updateRecord(collection: Collection, id: string, patch: unknown): Promise<unknown> {
  return request('/' + collection + '/' + encodeURIComponent(id), { method: 'PATCH', body: JSON.stringify(patch) });
}

export function deleteRecord(collection: Collection, id: string): Promise<void> {
  return request('/' + collection + '/' + encodeURIComponent(id), { method: 'DELETE' });
}

export function resetRemoteData(): Promise<void> {
  return request('/content', { method: 'DELETE' });
}

export interface StreamActivity {
  type: string;
  action: string;
}

export async function getActivityStream(onActivity: (activity: StreamActivity) => void): Promise<() => void> {
  const url = API_URL + '/api/activities/stream';
  const es = new EventSource(url);
  es.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      if (payload.type === 'activity' && payload.data) onActivity(payload.data as StreamActivity);
    } catch { /* ignore malformed messages */ }
  };
  es.onerror = () => { /* EventSource auto-reconnects */ };
  return () => es.close();
}