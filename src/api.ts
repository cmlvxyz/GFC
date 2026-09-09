import type { Announcement, Attendee, ChurchEvent, Member, PrayerRequest, Sermon, Testimonial } from './types';

export type Collection = 'events' | 'sermons' | 'prayers' | 'attendees' | 'members' | 'announcements' | 'testimonials';
export interface RemoteContent { initialized: boolean; events: ChurchEvent[]; sermons: Sermon[]; prayers: PrayerRequest[]; attendees: Attendee[]; members: Member[]; announcements: Announcement[]; testimonials: Testimonial[]; }
const API_URL = (import.meta.env.API_URL || import.meta.env.VITE_API_URL || 'https://gfc-admin-rosy.vercel.app').replace(/\/$/, '');

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('gfc_admin_token');
  const response = await fetch(API_URL + '/api' + path, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}), ...(options.headers || {}) } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || 'Request failed with status ' + response.status);
  return payload as T;
}
export function getContent(): Promise<RemoteContent> { return request<RemoteContent>('/content'); }
export function bootstrapContent(content: Omit<RemoteContent, 'initialized'>): Promise<RemoteContent> { return request<RemoteContent>('/bootstrap', { method: 'POST', body: JSON.stringify(content) }); }
export function createRecord(collection: Collection, record: unknown): Promise<unknown> { return request('/' + collection, { method: 'POST', body: JSON.stringify(record) }); }
export function updateRecord(collection: Collection, id: string, record: unknown): Promise<unknown> { return request('/' + collection + '/' + encodeURIComponent(id), { method: 'PATCH', body: JSON.stringify(record) }); }
export function deleteRecord(collection: Collection, id: string): Promise<void> { return request<void>('/' + collection + '/' + encodeURIComponent(id), { method: 'DELETE' }); }
export function resetRemoteData(): Promise<void> { return request<void>('/content', { method: 'DELETE' }); }
export async function login(username: string, password: string): Promise<void> { const result = await request<{ token: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }); localStorage.setItem('gfc_admin_token', result.token); }
