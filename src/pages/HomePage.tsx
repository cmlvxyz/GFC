import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChurchEvent, Announcement, SiteSetting } from '../types';
import {
  Users, CalendarDays, BookOpen, Heart, ArrowRight, ArrowUpRight,
  MapPin, Clock, Megaphone
} from 'lucide-react';
import { HomeSection } from '../components/HomeSection';
import { getTodayVerse } from '../utils/verseOfDay';

interface HomePageProps {
  events: ChurchEvent[];
  announcements: Announcement[];
  loading?: boolean;
  siteSettings?: SiteSetting[];
  onOpenGiveModal: () => void;
}

const journeyTiles = [
  {
    to: '/about',
    icon: <Users className="w-6 h-6" />,
    title: 'Who We Are',
    text: 'Our mission, vision, ministries and leaders.',
    cta: 'About GFC'
  },
  {
    to: '/events',
    icon: <CalendarDays className="w-6 h-6" />,
    title: 'Events & Schedule',
    text: 'Weekly services and photo albums from gatherings.',
    cta: 'See Events'
  },
  {
    to: '/verse',
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Verse of the Day',
    text: 'A daily word from the Lord to keep close.',
    cta: 'Read Today'
  },
  {
    to: '/prayer',
    icon: <Heart className="w-6 h-6" />,
    title: 'Prayer Requests',
    text: 'Share a request with our prayer team.',
    cta: 'Pray With Us'
  }
];

const eventPhoto = (ev: ChurchEvent): string =>
  ev.image || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=900&q=80';

export const HomePage: React.FC<HomePageProps> = ({ events, announcements, loading, siteSettings = [], onOpenGiveModal }) => {
  const todayVerse = getTodayVerse();
  const featured = events.filter(ev => ev.date).slice(0, 3);
  const visibleAnnouncements = announcements.slice(0, 3);

  const marqueeRef = useRef<HTMLDivElement>(null);

  const pauseMarquee = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = 'paused';
    }
  };

  const resumeMarquee = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = 'running';
    }
  };

  const settingText = (key: string, fallback: string) => {
    const s = siteSettings.find(x => x.key === key);
    return s?.value || fallback;
  };

  return (
    <main>
      <HomeSection onOpenGiveModal={onOpenGiveModal} siteSettings={siteSettings} />

      {/* ============ WELCOME MARQUEE ============ */}
      <section className="bg-white overflow-hidden">
        <div
          className="py-16 sm:py-20 overflow-hidden whitespace-nowrap"
          onMouseEnter={pauseMarquee}
          onMouseLeave={resumeMarquee}
        >
          <div
            ref={marqueeRef}
            className="flex w-max animate-marquee-left items-center"
          >
            {[0, 4].map(group => (
              <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1}>

                {/* SOLID VERSION */}
                <img
                  src="/solid.png"
                  alt="Welcome to Gospel Fellowship Church"
                  className="shrink-0 h-20 sm:h-28 lg:h-32 w-auto px-10 sm:px-16"
                />

                {/* OUTLINE VERSION */}
                <img
                  src="/outline.png"
                  alt=""
                  aria-hidden="true"
                  className="shrink-0 h-20 sm:h-28 lg:h-32 w-auto px-10 sm:px-16"
                />

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ JOURNEY TILES ============ */}
      <section className="bg-slate-50">
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {journeyTiles.map(tile => (
            <Link
              key={tile.to}
              to={tile.to}
              className="group bg-white rounded-2xl border border-slate-200 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_-28px_rgba(15,23,42,0.28)] hover:border-indigo-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0f172a] text-indigo-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {tile.icon}
              </div>
              <h3 className="mt-5 font-serif text-xl text-[#0f172a]">{tile.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{tile.text}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600">
                {tile.cta}
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
        </div>
      </section>

      {/* ============ VERSE OF THE DAY BAND ============ */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="bg-[#0f172a] rounded-3xl px-8 py-14 sm:px-14 relative overflow-hidden text-center">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/[0.03] pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-indigo-500/[0.07] pointer-events-none" />

          <div className="relative mx-auto max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-indigo-400">
              <BookOpen className="w-4 h-4" />
              Verse of the Day
            </span>
            <p className="font-serif text-2xl sm:text-3xl italic leading-relaxed text-white/95">
              "{todayVerse.text}"
            </p>
            <p className="text-sm font-bold text-indigo-400 tracking-wide">— {todayVerse.ref}</p>
            <Link
              to="/verse"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all duration-300"
            >
              Read More from the Word
              <ArrowUpRight className="w-4 h-4 text-indigo-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FEATURED EVENTS ============ */}
      <section className="bg-white">
        {/* Header — may padding */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-indigo-600">
                Gatherings
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#0f172a] tracking-tight">
                Upcoming events
              </h2>
            </div>
            <Link
              to="/events"
              className="group inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              View All Events
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Grid — FULL WIDTH, walang padding, walang gap */}
        <div className="w-full grid grid-cols-3 gap-0">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative aspect-[3/4] bg-slate-200 animate-pulse" />
            ))
          ) : featured.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-slate-500">No upcoming events yet. Check back soon.</p>
            </div>
          ) : (
            featured.map(ev => (
              <Link
                key={ev.id}
                to="/events"
                className="group relative aspect-[3/4] overflow-hidden block"
              >
                {/* Background image */}
                <img
                  src={eventPhoto(ev)}
                  alt={ev.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12">
                  {/* Tag sa itaas-kanan */}
                  <div className="flex justify-end">
                    <span className="bg-white/95 backdrop-blur px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0f172a] shadow-sm">
                      {ev.tag}
                    </span>
                  </div>

                  {/* Title sa gitna */}
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                      {ev.title}
                    </h3>
                  </div>

                  {/* Learn More sa ibaba */}
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-2 text-white font-bold text-sm sm:text-base lg:text-lg group-hover:gap-3 transition-all duration-300">
                      See more
                      <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* ============ ANNOUNCEMENTS ============ */}
      {visibleAnnouncements.length > 0 && (
        <section className="bg-slate-50">
          <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-indigo-600">
                <Megaphone className="w-4 h-4" />
                Announcements
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#0f172a] tracking-tight">
                What's new at GFC
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {visibleAnnouncements.map(a => (
              <div
                key={a.id}
                className="bg-white rounded-2xl border border-slate-200 p-7 space-y-3 transition-colors duration-300 hover:border-indigo-300"
              >
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-indigo-600">
                  {a.category || 'Announcement'}
                  {a.isPinned && <span className="text-indigo-600">· Pinned</span>}
                </div>
                <h3 className="font-serif text-lg text-[#0f172a]">{a.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{a.details}</p>
                {a.date && <p className="text-xs text-slate-400 pt-1">{a.date}</p>}
              </div>
            ))}
          </div>
          </div>
        </section>
      )}

      {/* ============ PRAYER CTA BAND ============ */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="rounded-3xl overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1800&q=80"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1a2e]/95 via-[#0f1a2e]/85 to-[#0f1a2e]/70" />

          <div className="relative z-10 px-8 py-16 sm:px-14 sm:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-indigo-400">
                <Heart className="w-4 h-4 fill-current" />
                We're praying with you
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight leading-tight">
                {settingText('prayerTitle1', 'Facing a burden?')} <span className="italic text-indigo-400">{settingText('prayerTitle2', 'Tell us.')}</span>
              </h2>
              <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                {settingText('prayerText', 'Share a prayer request with our church family. No request is too small or too big for the Lord.')}
              </p>
            </div>
            <Link
              to="/prayer"
              className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm sm:text-base transition-all duration-300 active:scale-[0.98] shadow-lg shadow-black/20 shrink-0"
            >
              Submit a Prayer Request
              <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ VISIT TEASER ============ */}
      <section className="bg-indigo-50/40">
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#0f172a] text-indigo-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#0f172a]">Where to find us</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              {settingText('visitAddress', '008 National Road SF. 2 Purok 1, Limay, Bataan. Come as you are — we can\'t wait to meet you.')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Get Directions & Register
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-[#0f172a] rounded-2xl p-8 space-y-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-400 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl">Bless the church</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {settingText('giveBlurb', 'Your tithes and offerings help us continue sharing the Gospel in Limay and beyond.')}
            </p>
            <button
              onClick={onOpenGiveModal}
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-white transition-colors"
            >
              Give Tithes & Offering
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
};