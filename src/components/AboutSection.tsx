import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Pastor, Ministry, Song } from '../types';
import { DEFAULT_PASTORS, DEFAULT_MINISTRIES, DEFAULT_SONGS } from '../data/churchData';
import { Target, Compass, Heart, Music, ExternalLink, Sparkles, X } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);

  return (
    <section id="aboutSection" className="relative -top-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-white/5 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-400/30 inline-block">
          About Our Church
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-black dark:text-white">
          Gospel Fellowship Church
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-[#A1A1A1] leading-relaxed">
          A vibrant community in Limay, Bataan united in worship, service, and the proclamation of the Good News of our Lord Jesus.
        </p>
      </div>

      {/* Mission, Vision, Community Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mission */}
        <div className="bg-white dark:bg-[#1A1A1A] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/10 space-y-4 relative overflow-hidden shadow-xl hover:border-indigo-300 dark:hover:border-indigo-400/40 transition-all">
          <div className="w-15 h-15 rounded-2xl bg-white dark:bg-[#1A1A1A] text-indigo-400 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif text-black dark:text-white">Mission</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-[#A1A1A1] leading-relaxed">
            "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit 🙌☝️"
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white dark:bg-[#1A1A1A] p-6 sm:p-8 rounded-3xl border border-indigo-200 dark:border-indigo-400/40 space-y-4 relative overflow-hidden shadow-xl hover:border-indigo-400 dark:hover:border-indigo-400 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500 dark:bg-indigo-400 text-white flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif text-black dark:text-white">Vision</h3>
          <p className="text-xl font-serif italic text-indigo-500 dark:text-indigo-400">
            "Be Multiplied"
          </p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-[#A1A1A1] leading-relaxed">
            To grow and multiply true disciples of Christ who will be lights in every home and community.
          </p>
        </div>

        {/* Community */}
        <div className="bg-white dark:bg-[#1A1A1A] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/10 space-y-4 relative overflow-hidden shadow-xl hover:border-indigo-300 dark:hover:border-indigo-400/40 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500 dark:bg-indigo-400 text-white flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif text-black dark:text-white">Community</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-[#A1A1A1] leading-relaxed">
            To reflect the love of Jesus Christ by building strong relationships within our community, caring for one another, and welcoming all with open hearts.
          </p>
        </div>
      </div>

      {/* Ministries Grid */}
      <div className="space-y-6 relative -top-5">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-serif text-indigo-500 dark:text-indigo-400 italic">Our Ministries</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEFAULT_MINISTRIES.map(min => {
            // Map ministry id to Font Awesome icon
            const getIcon = () => {
              switch(min.id) {
                case 'children':
                  return <i className="fas fa-child text-2xl text-indigo-500 dark:text-indigo-400"></i>;
                case 'youth':
                  return <i className="fas fa-fire text-2xl text-indigo-500 dark:text-indigo-400"></i>;
                case 'worship':
                  return <i className="fas fa-music text-2xl text-indigo-500 dark:text-indigo-400"></i>;
                case 'ushering':
                  return <i className="fas fa-handshake text-2xl text-indigo-500 dark:text-indigo-400"></i>;
                case 'media':
                  return <i className="fas fa-video text-2xl text-indigo-500 dark:text-indigo-400"></i>;
                default:
                  return <i className="fas fa-pray text-2xl text-indigo-500 dark:text-indigo-400"></i>;
              }
            };

            return (
              <div
                key={min.id}
                onClick={() => setSelectedMinistry(min)}
                className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-400/50 hover:bg-indigo-50/50 dark:hover:bg-white/10 transition-all cursor-pointer shadow-md space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{getIcon()}</span>
                  <span className="text-xs font-bold text-indigo-400 dark:text-indigo-400 group-hover:underline flex items-center gap-1 uppercase tracking-wider">
                    Details ➔
                  </span>
                </div>
                <h4 className="font-serif text-black dark:text-white text-lg">{min.title}</h4>
                <p className="text-xs text-gray-600 dark:text-[#A1A1A1] leading-relaxed">{min.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaders & Pastors Section */}
      <div className="space-y-8 pt-4 relative -top-15">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 inline-block">
            Leadership Team
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
            <span>Our Pastors & Leaders</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {DEFAULT_PASTORS.map(pastor => (
            <div
              key={pastor.id}
              className="flex flex-col items-center text-center space-y-2 group"
            >
              {/* Circular Image - No Border/Ring */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md transition-all duration-300 group-hover:scale-105">
                <img
                  src={pastor.image}
                  alt={pastor.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Name */}
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-1">
                {pastor.name}
              </h4>

              {/* Role */}
              <p className="text-[11px] font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider -mt-0.5">
                {pastor.role}
              </p>

              {/* Facebook App Icon */}
              <a
                href={pastor.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 hover:scale-110 transition-all duration-200"
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

      {selectedMinistry && (
        <div className="fixed inset-0 z-50 bg-black/70 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A1A] text-black dark:text-[#F5F5F5] rounded-3xl max-w-lg w-full p-6 space-y-4 border border-gray-200 dark:border-white/10 shadow-2xl relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMinistry(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white rounded-full bg-gray-100 dark:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                <span>📌 Ministry</span>
              </span>
              <h3 className="text-xl font-bold font-serif text-black dark:text-white">{selectedMinistry.title}</h3>
              
              {selectedMinistry.leader && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#A1A1A1]">
                  <span className="font-semibold">👤 Overseer:</span>
                  <span>{selectedMinistry.leader}</span>
                </div>
              )}

              {selectedMinistry.meetingTime && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#A1A1A1]">
                  <span className="font-semibold">⏰ Meeting Time:</span>
                  <span>{selectedMinistry.meetingTime}</span>
                </div>
              )}

              {selectedMinistry.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#A1A1A1]">
                  <span className="font-semibold">📍 Location:</span>
                  <span>{selectedMinistry.location}</span>
                </div>
              )}

              <p className="text-sm text-gray-600 dark:text-[#A1A1A1] pt-2">{selectedMinistry.description}</p>
            </div>

            {/* Ministry Details List */}
            {selectedMinistry.details && selectedMinistry.details.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-white/10">
                <h4 className="text-xs font-bold text-indigo-500 dark:text-indigo-400 flex items-center gap-1">
                  <span>🎯 Ministry Focus:</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedMinistry.details.map((detail, i) => (
                    <div key={i} className="p-2 rounded-xl bg-gray-50 dark:bg-black/50 text-xs font-medium text-black dark:text-white border border-gray-200 dark:border-white/5">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Worship Lineup (Special for Worship Ministry) */}
            {selectedMinistry.id === 'worship' && (
              <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-white/10">
                <h4 className="text-xs font-bold text-indigo-500 dark:text-indigo-400 flex items-center gap-1">
                  <Music className="w-4 h-4" />
                  <span>🎵 Worship Lineup</span>
                </h4>
                <div className="space-y-1.5">
                  {DEFAULT_SONGS.map((song, i) => (
                    <a
                      key={i}
                      href={song.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-black/50 hover:bg-indigo-50 dark:hover:bg-white/10 text-xs font-medium text-black dark:text-white transition-all border border-gray-200 dark:border-white/5"
                    >
                      <span>🎵 {song.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => setSelectedMinistry(null)}
                className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white uppercase font-extrabold tracking-wider text-xs rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};