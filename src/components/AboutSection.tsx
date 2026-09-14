import React, { useState } from 'react';
import {
  Users, Target, Compass, Heart, Music, ExternalLink, X, ArrowRight,
  ArrowUpRight, Flame, Video, Handshake, Baby, Sparkles, Clock
} from 'lucide-react';
import { Ministry } from '../types';
import { DEFAULT_PASTORS, DEFAULT_MINISTRIES, DEFAULT_SONGS } from '../data/churchData';

const MINISTRY_ICONS: Record<string, React.ReactNode> = {
  children: <Baby className="w-5 h-5" />,
  youth: <Flame className="w-5 h-5" />,
  worship: <Music className="w-5 h-5" />,
  ushering: <Handshake className="w-5 h-5" />,
  media: <Video className="w-5 h-5" />,
  prayer: <Heart className="w-5 h-5" />
};

const stats = [
  { value: '8:30 AM', label: 'Sunday Worship' },
  { value: '6+', label: 'Active Ministries' },
  { value: '7 Days', label: 'A Week of Prayer' }
];

export const AboutSection: React.FC = () => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);

  const scrollToMinistries = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('ministriesBlock')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="aboutSection" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* ============ WELCOME / INTRO - Editorial split ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-7 space-y-5">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-indigo-600">
            About GFC
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#0f172a] tracking-tight leading-[1.08]">
            We're a family of faith in{' '}
            <span className="italic">Limay, Bataan.</span>
          </h2>
        </div>
        <div className="lg:col-span-5 space-y-6">
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Gospel Fellowship Church is a vibrant community united in worship,
            prayer, and the proclamation of the Good News of Jesus. Whether you're
            just exploring faith or looking for a church to call home, there is a
            place for you here.
          </p>
          <div className="grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 pt-6">
            {stats.map(stat => (
              <div key={stat.label} className="px-4 first:pl-0">
                <div className="font-serif text-xl sm:text-2xl font-semibold text-[#0f172a]">
                  {stat.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ MISSION / VISION - Editorial split with image ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Image */}
        <div className="relative">
          <div className="absolute -inset-3 border border-indigo-600/30 rounded-2xl rotate-[-1deg] pointer-events-none" />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1511829182315-40cc56b3a15d?auto=format&fit=crop&w=1400&q=80"
              alt="Gospel Fellowship Church congregation"
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          {/* Floating service card */}
          <div className="absolute -bottom-6 left-6 sm:left-10 bg-[#0f172a] text-white rounded-2xl px-6 py-4 shadow-xl flex items-center gap-3">
            <Clock className="w-5 h-5 text-indigo-400" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">
                Sunday Celebration
              </div>
              <div className="font-serif text-lg">Every Sunday · 8:30 AM</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-9 pt-8 lg:pt-0">
          <div className="space-y-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-indigo-600">
              Our Mission & Vision
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#0f172a] tracking-tight leading-tight">
              Rooted in the Word, formed by worship, <span className="italic">sent in love.</span>
            </h3>
          </div>

          {/* Mission */}
          <div className="flex gap-5">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-[#0f172a] text-indigo-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Mission</h4>
              <p className="font-serif text-lg italic text-slate-700 leading-relaxed">
                "Go therefore and make disciples of all nations, baptizing them in the
                name of the Father and of the Son and of the Holy Spirit."
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="flex gap-5">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-[#0f172a] text-indigo-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Vision</h4>
              <p className="font-serif text-xl italic text-[#0f172a]">Be Multiplied.</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                To grow and multiply true disciples of Christ who are lights in every
                home and community.
              </p>
            </div>
          </div>

          {/* Community */}
          <div className="flex gap-5">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-[#0f172a] text-indigo-400 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Community</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                We reflect the love of Jesus by building strong relationships, caring
                for one another, and welcoming all with open hearts.
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#ministriesBlock"
            onClick={scrollToMinistries}
            className="group inline-flex items-center gap-2.5 pt-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Explore Our Ministries
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* ============ MINISTRIES ============ */}
      <div id="ministriesBlock" className="scroll-mt-28 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-indigo-600">
            Ministries & Community
          </span>
          <h3 className="text-3xl sm:text-4xl font-serif text-[#0f172a] tracking-tight">
            Find your place to serve
          </h3>
          <p className="text-sm sm:text-base text-slate-600">
            Every ministry exists to grow disciples, build community, and share the
            love of Christ beyond our walls.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEFAULT_MINISTRIES.map(min => (
            <div
              key={min.id}
              onClick={() => setSelectedMinistry(min)}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-7 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.25)]"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#0f172a] text-indigo-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  {MINISTRY_ICONS[min.id] || <Sparkles className="w-5 h-5" />}
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300 transition-all duration-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h4 className="mt-6 font-serif text-xl text-[#0f172a]">{min.title}</h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{min.description}</p>
              <div className="mt-5 text-xs font-bold text-indigo-600 uppercase tracking-widest">
                Details
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ LEADERS ============ */}
      <div className="space-y-10 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-indigo-600">
              Leadership
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#0f172a] tracking-tight flex items-center gap-3">
              <Users className="w-7 h-7 text-indigo-600" />
              Our pastors & leaders
            </h3>
          </div>
          <p className="text-sm text-slate-500 max-w-xs">
            A team committed to shepherding, worship, and serving the church with joy.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
          {DEFAULT_PASTORS.map(pastor => (
            <div
              key={pastor.id}
              className="flex flex-col items-center text-center space-y-2.5 group"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-30 md:h-30 rounded-full overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
                <img
                  src={pastor.image}
                  alt={pastor.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm sm:text-base text-[#0f172a]">
                  {pastor.name}
                </h4>
                <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-widest">
                  {pastor.role}
                </p>
              </div>
              <a
                href={pastor.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 hover:scale-110 transition-all duration-200 opacity-70 group-hover:opacity-100"
                title="Facebook Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-full h-full fill-current text-[#1877F2]"
                  aria-hidden="true"
                >
                  <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ============ MINISTRY MODAL ============ */}
      {selectedMinistry && (
        <div className="fixed inset-0 z-50 bg-[#0f172a]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-7 space-y-5 shadow-2xl relative max-h-[85vh] overflow-y-auto animate-slideUp">
            <button
              onClick={() => setSelectedMinistry(null)}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-[#0f172a] text-indigo-400 flex items-center justify-center">
              {MINISTRY_ICONS[selectedMinistry.id] || <Sparkles className="w-5 h-5" />}
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-600">
                Ministry
              </span>
              <h3 className="text-2xl font-serif text-[#0f172a]">
                {selectedMinistry.title}
              </h3>
            </div>

            {(selectedMinistry.leader || selectedMinistry.meetingTime || selectedMinistry.location) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedMinistry.leader && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">Overseer</div>
                    <div className="mt-1 text-xs font-semibold text-[#0f172a] leading-snug">{selectedMinistry.leader}</div>
                  </div>
                )}
                {selectedMinistry.meetingTime && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">Meets</div>
                    <div className="mt-1 text-xs font-semibold text-[#0f172a] leading-snug">{selectedMinistry.meetingTime}</div>
                  </div>
                )}
                {selectedMinistry.location && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">Where</div>
                    <div className="mt-1 text-xs font-semibold text-[#0f172a] leading-snug">{selectedMinistry.location}</div>
                  </div>
                )}
              </div>
            )}

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedMinistry.description}
            </p>

            {selectedMinistry.details && selectedMinistry.details.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-3">
                  Ministry Focus
                </h4>
                <ul className="space-y-2">
                  {selectedMinistry.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                      {detail.replace(/^[^\w\s]*\s*/, '')}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedMinistry.id === 'worship' && (
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-3 flex items-center gap-2">
                  <Music className="w-3.5 h-3.5 text-indigo-600" />
                  Worship Lineup
                </h4>
                <div className="space-y-2">
                  {DEFAULT_SONGS.map((song, i) => (
                    <a
                      key={i}
                      href={song.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-sm font-medium text-[#0f172a] transition-colors border border-slate-100"
                    >
                      {song.name}
                      <ExternalLink className="w-4 h-4 text-indigo-500" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedMinistry(null)}
              className="w-full py-3 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};