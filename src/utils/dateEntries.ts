// GFC/src/utils/dateEntries.ts

import { DateEntry, ChurchEvent } from '../types';

const isConcreteDate = (value: unknown): boolean => {
  const s = String(value ?? '').trim();

  if (!s) {
    return false;
  }

  if (/^every\b/i.test(s)) {
    return false;
  }

  if (/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/i.test(s)) {
    return false;
  }

  const parsed = new Date(s);

  return !Number.isNaN(parsed.getTime());
};

const isScheduleEntry = (value: unknown): boolean => {
  const s = String(value ?? '').trim();

  if (/^every\b/i.test(s)) {
    return true;
  }

  if (/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/i.test(s)) {
    return true;
  }

  return false;
};

/**
 * Anniversary-style events use YEAR albums ("1st Year
 * Anniversary") instead of calendar date albums. They are
 * detected either by an explicit albumType flag or by the
 * legacy anniversary event id.
 */
export const isYearAlbumEvent = (
  event?: ChurchEvent | null
): boolean => {
  if (event?.albumType === 'year') {
    return true;
  }

  return String(event?.id) === 'anniversary';
};

const ordinalOf = (value: unknown): number => {
  const match = String(value ?? '').trim().match(/^(\d+)/);

  return match
    ? parseInt(match[1], 10)
    : Number.MAX_SAFE_INTEGER;
};

const keyOf = (value: unknown): string =>
  String(value ?? '').trim().toLowerCase().replace(/\s+/g, '');

/**
 * Return only real calendar date albums (e.g. "August 30, 2026"),
 * excluding recurring schedules like "Every Monday 7:00 PM",
 * sorted from earliest to latest.
 */
export const getConcreteDateEntries = (
  entries?: DateEntry[] | null
): DateEntry[] =>
  (Array.isArray(entries) ? entries : [])
    .filter(entry => isConcreteDate(entry.date))
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );

/**
 * Return the albums that should be shown for an event:
 *
 * - Anniversary/year events: year albums like "1st Year
 *   Anniversary", sorted by year ordinal (1st, 2nd, 3rd...).
 * - All other events: concrete calendar dates, sorted ascending.
 *
 * The FIRST photo of each album acts as its cover/poster; it is
 * what gets shown before opening the album's full photo set.
 */
export const getAlbumEntries = (
  event?: ChurchEvent | null
): DateEntry[] => {
  const entries = Array.isArray(event?.dateEntries)
    ? event.dateEntries
    : [];

  if (isYearAlbumEvent(event)) {
    return entries
      .filter(entry => !isScheduleEntry(entry.date))
      .sort(
        (a, b) =>
          ordinalOf(a.date) - ordinalOf(b.date) ||
          keyOf(a.date).localeCompare(keyOf(b.date))
      );
  }

  return getConcreteDateEntries(entries);
};