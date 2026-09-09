import React, { useState } from 'react';
import { ChurchEvent, DateEntry } from '../types';
import { MapPin, Clock, X } from 'lucide-react';

interface EventsSectionProps {
  events: ChurchEvent[];
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [datePhotoModal, setDatePhotoModal] = useState<DateEntry | null>(null);

  const getFallbackImage = (event: ChurchEvent): string => {
    const fallbacks: Record<string, string> = {
      '⛪ Worship': '/Sunday Service/sunday-service.jpg',
      '🎵 Music': '/Worship Night/worship-night.jpg',
      '🙏 Prayer': '/Prayer Meeting/prayer-meeting.jpg',
      '📖 Word': '/Bible Study/bible-study.jpg',
      '🌟 Youth': '/Next Gen/next-gen.jpg',
      '🎉 Celebration': '/Anniversary/3rd Year.jpg'
    };
    return fallbacks[event.tag] || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80';
  };

  const handleImageError = (eventId: string) => {
    setImageErrors(prev => ({ ...prev, [eventId]: true }));
  };

  const getImageSrc = (event: ChurchEvent): string => {
    if (imageErrors[event.id]) {
      return getFallbackImage(event);
    }
    return event.image || getFallbackImage(event);
  };

  return (
    <section id="eventsSection" className="relative -top-55 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-white/5 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-400/30 inline-block">
            Events & Gatherings
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-black dark:text-white">
            Church Events & Schedule
          </h2>
          <p className="text-sm text-gray-500 dark:text-[#A1A1A1]">
            {events.length} events available
          </p>
        </div>
      </div>

      {/* EVENTS CARDS GRID - DITO NAGDI-DISPLAY ANG MGA EVENTS */}
      <div className="events-grid">
        {events.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white dark:bg-[#1A1A1A] rounded-3xl border border-gray-200 dark:border-white/10">
            <p className="text-gray-500 dark:text-[#A1A1A1]">No events yet. Check back soon for upcoming gatherings and activities.</p>
          </div>
        ) : (
          events.map(ev => {
            const imageSrc = getImageSrc(ev);
            
            return (
              <div
                key={ev.id}
                onClick={() => {
                  setSelectedEvent(ev);
                }}
                className="event-card"
              >
                <div>
                  <div className="relative overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={ev.title}
                      loading="lazy"
                      onError={() => handleImageError(ev.id)}
                    />
                    <span className="event-tag absolute top-3 left-3">
                      {ev.tag}
                    </span>
                  </div>

                  <div className="event-card-content">
                    <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-bold mb-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{ev.date}</span>
                    </div>

                    <h3>{ev.title}</h3>
                    <p>{ev.description}</p>

                    {ev.location && (
                      <div className="event-location flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-indigo-400" />
                        <span>{ev.location}</span>
                      </div>
                    )}

                    {ev.dateEntries && ev.dateEntries.length > 0 && (
                      <div className="mt-2 text-xs text-indigo-500 dark:text-indigo-400 font-bold">
                        📸 {ev.dateEntries.length} photo album(s)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* EVENT DETAILS MODAL */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 dark:bg-black/50 backdrop-blur-xxs flex items-center justify-center p-4 animate-fadeIn cursor-pointer"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-white dark:bg-[#1A1A2E] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 sm:p-10 relative shadow-2xl border border-gray-100 dark:border-white/5 animate-slideUp [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-hide cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-6 text-3xl text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white transition-all hover:rotate-90 hover:scale-110 bg-transparent border-none cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>

            <div className="text-center mb-6">
              <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-white/5 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-400/30 inline-block mb-3">
                {selectedEvent.tag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-black dark:text-[#E8E8F0]">
                {selectedEvent.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-[#8888AA] mt-1">
                {selectedEvent.date}
              </p>
              {selectedEvent.location && (
                <p className="text-sm text-gray-500 dark:text-[#8888AA] flex items-center justify-center gap-1 mt-1">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  {selectedEvent.location}
                </p>
              )}
            </div>

            <p className="text-gray-700 dark:text-[#E8E8F0] leading-relaxed text-sm mb-4">
              {selectedEvent.description}
            </p>

            {/* PAST EVENTS / DATE ENTRIES SECTION */}
            <div className="my-5">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-2 mb-3">
                <h4 className="text-sm font-bold text-indigo-500 dark:text-indigo-400">
                  📅 Past Events & Photo Albums
                </h4>
              </div>
              
              {selectedEvent.dateEntries && selectedEvent.dateEntries.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {selectedEvent.dateEntries.map((entry, index) => (
                      <div
                        key={index}
                        onClick={() => setDatePhotoModal(entry)}
                        className="relative group flex flex-col items-center cursor-pointer gap-1.5 p-2 rounded-xl transition-all bg-gray-100 dark:bg-[#0A0A14] border-2 border-transparent hover:border-indigo-300 dark:hover:border-indigo-400/50 hover:scale-105"
                      >
                        {entry.photos && entry.photos.length > 0 ? (
                          <img
                            src={entry.photos[0]}
                            alt={entry.date}
                            className="w-full h-20 object-cover rounded-xl shadow-md"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-20 bg-gray-200 dark:bg-slate-700 rounded-xl flex items-center justify-center text-2xl">
                            📅
                          </div>
                        )}
                        <span className="text-[11px] font-bold text-center block mt-1 text-black dark:text-[#E8E8F0]">
                          {entry.date}
                        </span>
                        <span className="text-[9px] block text-gray-400 dark:text-gray-500">
                          {entry.photos?.length || 0} photos
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-6 bg-gray-50 dark:bg-[#0A0A14] rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-[#8888AA]">
                    No photo albums yet for this event.
                  </p>
                </div>
              )}
            </div>

            {selectedEvent.defaultVerse && !selectedEvent.dateEntries?.length && (
              <div className="bg-gray-50 dark:bg-[#0A0A14] p-5 rounded-xl border-l-4 border-indigo-400 dark:border-indigo-400/70 mt-4">
                <p className="text-sm italic text-black dark:text-[#E8E8F0] leading-relaxed">
                  "{selectedEvent.defaultVerse}"
                </p>
                {selectedEvent.defaultVerseRef && (
                  <p className="text-right text-sm font-bold text-indigo-500 dark:text-indigo-400 mt-1">
                    — {selectedEvent.defaultVerseRef}
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white font-bold rounded-full text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DATE PHOTOS MODAL */}
      {datePhotoModal && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 dark:bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setDatePhotoModal(null)}
        >
          <div
            className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-black dark:text-[#F5F5F5] rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDatePhotoModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white rounded-full bg-gray-100 dark:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-black dark:text-white">
                {selectedEvent?.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-[#8888AA] mt-1">
                {datePhotoModal.date}
              </p>
            </div>

            {datePhotoModal.verse && (
              <div className="bg-gray-50 dark:bg-[#0A0A14] p-4 rounded-xl border-l-4 border-indigo-400 dark:border-indigo-400/70">
                <p className="text-sm italic text-black dark:text-[#E8E8F0] leading-relaxed">
                  "{datePhotoModal.verse}"
                </p>
                {datePhotoModal.verseRef && (
                  <p className="text-right text-sm font-bold text-indigo-500 dark:text-indigo-400 mt-1">
                    — {datePhotoModal.verseRef}
                  </p>
                )}
              </div>
            )}

            {datePhotoModal.photos && datePhotoModal.photos.length > 0 ? (
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {datePhotoModal.photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all aspect-[4/3] cursor-pointer hover:scale-105"
                  >
                    <img
                      src={photo}
                      alt={`Event photo ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                      loading="lazy"
                      onClick={() => setSelectedPhoto(photo)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-[#0A0A14] rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-[#8888AA]">
                  No photos uploaded yet for this date.
                </p>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => setDatePhotoModal(null)}
                className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white font-bold rounded-full text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHOTO LIGHTBOX */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedPhoto(null)}
        >
          <img
            src={selectedPhoto}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhoto(null);
            }}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      )}

      </section>
  );
};