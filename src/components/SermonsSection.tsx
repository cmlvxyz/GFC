import React, { useState } from 'react';
import { BookOpen, Copy, Check, CalendarDays } from 'lucide-react';
import { getTodayVerse, getMoreVerses, todayLabel } from '../utils/verseOfDay';

interface SermonsSectionProps {
  sermons?: unknown[];
  onAddSermon?: (newSermon: unknown) => void;
}

export const SermonsSection: React.FC<SermonsSectionProps> = () => {
  const [copied, setCopied] = useState(false);

  const todayVerse = getTodayVerse();
  const moreVerses = getMoreVerses(3);

  const copyVerse = async () => {
    try {
      await navigator.clipboard.writeText(`"${todayVerse.text}" — ${todayVerse.ref}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="verseSection" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* ============ HEADER ============ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-indigo-600">
            Daily Devotion
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#0f172a] tracking-tight leading-tight">
            Verse of the Day
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
            A daily reminder of God's faithfulness — a word from the Lord to keep
            close to your heart.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
          <CalendarDays className="w-4 h-4" />
          {todayLabel}
        </div>
      </div>

      {/* ============ FEATURED VERSE ============ */}
      <div className="bg-[#0f172a] rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/[0.03] pointer-events-none" />
        <div className="absolute -bottom-20 -left-16 w-72 h-72 rounded-full bg-indigo-500/[0.08] pointer-events-none" />

        <div className="relative mx-auto max-w-3xl space-y-7">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-center gap-4 text-indigo-400 text-4xl font-serif leading-none">
            <span className="h-px w-10 bg-indigo-400/50" />
            <span>&ldquo;</span>
            <span className="h-px w-10 bg-indigo-400/50" />
          </div>

          <blockquote>
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif italic leading-relaxed text-white/95">
              {todayVerse.text}
            </p>
          </blockquote>

          <p className="text-sm sm:text-base font-bold text-indigo-400 tracking-wide">
            — {todayVerse.ref}
          </p>

          <button
            onClick={copyVerse}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-all duration-300 active:scale-[0.98]"
          >
            {copied ? <Check className="w-4 h-4 text-indigo-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
            <span>{copied ? 'Copied!' : 'Copy Verse'}</span>
          </button>
        </div>
      </div>

      {/* ============ MORE FROM THE WORD ============ */}
      <div className="space-y-6 pt-2">
        <div className="flex items-end justify-between">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
            More from the Word
          </h3>
          <span className="text-xs text-slate-400">Reflect · Memorize · Share</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {moreVerses.map((v, i) => (
            <div
              key={`${v.ref}-${i}`}
              className="group bg-white rounded-2xl p-7 border border-slate-200 hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.25)]"
            >
              <div className="text-[11px] font-bold text-indigo-600 tracking-[0.3em] mb-4">
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="text-sm italic leading-relaxed text-slate-700">
                "{v.text}"
              </p>
              <p className="text-xs font-bold text-indigo-600 mt-4 text-right">
                — {v.ref}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};