import React, { useState } from 'react';
import { BookOpen, Copy, Check } from 'lucide-react';

interface SermonsSectionProps {
  sermons?: unknown[];
  onAddSermon?: (newSermon: unknown) => void;
}

const VERSES: { text: string; ref: string }[] = [
  { text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.', ref: 'Jeremiah 29:11' },
  { text: 'I can do all things through Christ who strengthens me.', ref: 'Philippians 4:13' },
  { text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.', ref: 'Proverbs 3:5-6' },
  { text: 'The Lord is my shepherd; I shall not want.', ref: 'Psalm 23:1' },
  { text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', ref: 'John 3:16' },
  { text: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', ref: 'Joshua 1:9' },
  { text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.', ref: 'Psalm 34:18' },
  { text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.', ref: 'Philippians 4:6' },
  { text: 'He gives strength to the weary and increases the power of the weak.', ref: 'Isaiah 40:29' },
  { text: 'Therefore encourage one another and build each other up, just as in fact you are doing.', ref: '1 Thessalonians 5:11' }
];

const dayOfYear = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
};

const todayLabel = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
});

export const SermonsSection: React.FC<SermonsSectionProps> = () => {
  const [copied, setCopied] = useState(false);

  const indexToday = dayOfYear() % VERSES.length;
  const todayVerse = VERSES[indexToday];
  const moreVerses = [...VERSES.slice(indexToday + 1), ...VERSES.slice(0, indexToday)].slice(0, 3);

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
    <section id="verseSection" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 relative -top-80">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-white/5 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-400/30 inline-block">
            Daily Devotion
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-black dark:text-white">
            Verse of the Day
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-[#A1A1A1]">
            A daily reminder of God's faithfulness to keep close to your heart.
          </p>
        </div>
      </div>

      {/* Featured Verse */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl text-center space-y-6">
        <div className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
          {todayLabel}
        </div>
        <div className="flex flex-col items-center gap-5">
          <BookOpen className="w-8 h-8 text-indigo-400" />
          <blockquote className="max-w-2xl">
            <p className="text-xl sm:text-2xl md:text-3xl font-serif italic leading-relaxed text-gray-900 dark:text-[#F5F5F5]">
              "{todayVerse.text}"
            </p>
            <footer className="mt-4 text-sm sm:text-base font-bold text-indigo-500 dark:text-indigo-400">
              — {todayVerse.ref}
            </footer>
          </blockquote>
          <button
            onClick={copyVerse}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Verse'}</span>
          </button>
        </div>
      </div>

      {/* More verses */}
      <div className="space-y-6">
        <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-gray-700 dark:text-[#A1A1A1]">
          More from the Word
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {moreVerses.map((v, i) => (
            <div
              key={`${v.ref}-${i}`}
              className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-md dark:shadow-xl space-y-3"
            >
              <p className="text-sm italic leading-relaxed text-gray-700 dark:text-[#E8E8F0]">
                "{v.text}"
              </p>
              <p className="text-xs font-bold text-indigo-500 dark:text-indigo-400 text-right">
                — {v.ref}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};