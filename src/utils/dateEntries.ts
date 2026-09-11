// GFC/src/utils/dateEntries.ts

import { DateEntry } from '../types';

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