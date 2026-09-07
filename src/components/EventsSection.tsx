import React, { useState, useRef } from 'react';
import { ChurchEvent, DateEntry } from '../types';
import { Calendar, MapPin, Plus, BookOpen, Clock, Tag, X, Image as ImageIcon, ChevronRight, ChevronLeft, Upload, FolderPlus, Trash2, Edit, Save } from 'lucide-react';

interface EventsSectionProps {
  events: ChurchEvent[];
  onAddEvent: (newEvent: ChurchEvent) => void;
  onUpdateEvent?: (updatedEvent: ChurchEvent) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events, onAddEvent, onUpdateEvent }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // New Event Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [tag, setTag] = useState('⛪ Worship');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('📍 Gospel Fellowship Church, Limay, Bataan');
  const [verse, setVerse] = useState('');
  const [verseRef, setVerseRef] = useState('');
  const [eventImage, setEventImage] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for adding new date album
  const [showAddDateModal, setShowAddDateModal] = useState(false);
  const [newDateTitle, setNewDateTitle] = useState('');
  const [newDateVerse, setNewDateVerse] = useState('');
  const [newDateVerseRef, setNewDateVerseRef] = useState('');
  const [newDatePhotos, setNewDatePhotos] = useState<string[]>([]);
  const [newDatePhotoPreviews, setNewDatePhotoPreviews] = useState<string[]>([]);
  const dateFileInputRef = useRef<HTMLInputElement>(null);

  // State for editing date album
  const [showEditDateModal, setShowEditDateModal] = useState(false);
  const [editingDateIndex, setEditingDateIndex] = useState<number>(0);
  const [editDateTitle, setEditDateTitle] = useState('');
  const [editDateVerse, setEditDateVerse] = useState('');
  const [editDateVerseRef, setEditDateVerseRef] = useState('');
  const [editDatePhotos, setEditDatePhotos] = useState<string[]>([]);
  const [editDatePhotoPreviews, setEditDatePhotoPreviews] = useState<string[]>([]);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // ============================================================
  // IMAGE UPLOAD HANDLERS - WITH PERMANENT STORAGE (Base64)
  // ============================================================
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setImagePreview(base64String);
      setEventImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleAddDatePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews: string[] = [];
    const newUrls: string[] = [];
    let processed = 0;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        newPreviews[index] = base64String;
        newUrls[index] = base64String;
        processed++;
        
        if (processed === files.length) {
          setNewDatePhotoPreviews(prev => [...prev, ...newPreviews]);
          setNewDatePhotos(prev => [...prev, ...newUrls]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    if (dateFileInputRef.current) {
      dateFileInputRef.current.value = '';
    }
  };

  const handleEditDatePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews: string[] = [];
    const newUrls: string[] = [];
    let processed = 0;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        newPreviews[index] = base64String;
        newUrls[index] = base64String;
        processed++;
        
        if (processed === files.length) {
          setEditDatePhotoPreviews(prev => [...prev, ...newPreviews]);
          setEditDatePhotos(prev => [...prev, ...newUrls]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    if (editFileInputRef.current) {
      editFileInputRef.current.value = '';
    }
  };

  const handleRemoveDatePhoto = (index: number) => {
    setNewDatePhotoPreviews(prev => prev.filter((_, i) => i !== index));
    setNewDatePhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveEditDatePhoto = (index: number) => {
    setEditDatePhotoPreviews(prev => prev.filter((_, i) => i !== index));
    setEditDatePhotos(prev => prev.filter((_, i) => i !== index));
  };

  // ============================================================
  // SAVE DATE ALBUM HANDLERS
  // ============================================================
  
  const handleSaveNewDateAlbum = () => {
    if (!selectedEvent || !newDateTitle.trim()) return;

    const newDateEntry: DateEntry = {
      date: newDateTitle.trim(),
      photos: newDatePhotos,
      verse: newDateVerse || undefined,
      verseRef: newDateVerseRef || undefined
    };

    const updatedEvent: ChurchEvent = {
      ...selectedEvent,
      dateEntries: [...(selectedEvent.dateEntries || []), newDateEntry]
    };

    if (onUpdateEvent) {
      onUpdateEvent(updatedEvent);
    }

    setSelectedEvent(updatedEvent);
    setSelectedDateIndex(updatedEvent.dateEntries!.length - 1);

    setNewDateTitle('');
    setNewDateVerse('');
    setNewDateVerseRef('');
    setNewDatePhotos([]);
    setNewDatePhotoPreviews([]);
    setShowAddDateModal(false);
  };

  const handleSaveEditDateAlbum = () => {
    if (!selectedEvent || !selectedEvent.dateEntries || !editDateTitle.trim()) return;

    const updatedEntries = [...selectedEvent.dateEntries];
    updatedEntries[editingDateIndex] = {
      date: editDateTitle.trim(),
      photos: editDatePhotos,
      verse: editDateVerse || undefined,
      verseRef: editDateVerseRef || undefined
    };

    const updatedEvent: ChurchEvent = {
      ...selectedEvent,
      dateEntries: updatedEntries
    };

    if (onUpdateEvent) {
      onUpdateEvent(updatedEvent);
    }

    setSelectedEvent(updatedEvent);
    setShowEditDateModal(false);
  };

  // ============================================================
  // DELETE HANDLERS
  // ============================================================
  
  const handleDeleteDateAlbum = (index: number) => {
    if (!selectedEvent || !selectedEvent.dateEntries) return;
    
    if (!confirm('Delete this date album and all its photos?')) return;

    const updatedEntries = selectedEvent.dateEntries.filter((_, i) => i !== index);
    const updatedEvent: ChurchEvent = {
      ...selectedEvent,
      dateEntries: updatedEntries
    };

    if (onUpdateEvent) {
      onUpdateEvent(updatedEvent);
    }

    setSelectedEvent(updatedEvent);
    if (selectedDateIndex >= updatedEntries.length) {
      setSelectedDateIndex(Math.max(0, updatedEntries.length - 1));
    }
  };

  const handleDeletePhotoFromDate = (dateIndex: number, photoIndex: number) => {
    if (!selectedEvent || !selectedEvent.dateEntries) return;

    const updatedEntries = [...selectedEvent.dateEntries];
    const updatedPhotos = updatedEntries[dateIndex].photos.filter((_, i) => i !== photoIndex);
    updatedEntries[dateIndex] = {
      ...updatedEntries[dateIndex],
      photos: updatedPhotos
    };

    const updatedEvent: ChurchEvent = {
      ...selectedEvent,
      dateEntries: updatedEntries
    };

    if (onUpdateEvent) {
      onUpdateEvent(updatedEvent);
    }

    setSelectedEvent(updatedEvent);
  };

  const handleOpenEditDateModal = (index: number) => {
    if (!selectedEvent || !selectedEvent.dateEntries) return;
    
    const entry = selectedEvent.dateEntries[index];
    setEditingDateIndex(index);
    setEditDateTitle(entry.date);
    setEditDateVerse(entry.verse || '');
    setEditDateVerseRef(entry.verseRef || '');
    setEditDatePhotos(entry.photos || []);
    setEditDatePhotoPreviews(entry.photos || []);
    setShowEditDateModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    const finalImage = eventImage || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80';

    const newEv: ChurchEvent = {
      id: Date.now().toString(),
      title,
      date,
      tag,
      description: description || 'Everyone is invited to come and worship with the whole family.',
      location,
      defaultVerse: verse || undefined,
      defaultVerseRef: verseRef || undefined,
      image: finalImage,
      dateEntries: []
    };

    onAddEvent(newEv);
    setShowAddModal(false);
    setTitle('');
    setDate('');
    setDescription('');
    setVerse('');
    setVerseRef('');
    setEventImage('');
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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

  const currentPhotos = selectedEvent?.dateEntries?.[selectedDateIndex]?.photos || [];
  const displayedPhotos = showAllPhotos ? currentPhotos : currentPhotos.slice(0, 6);

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

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 min-h-[44px]"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* EVENTS CARDS GRID - DITO NAGDI-DISPLAY ANG MGA EVENTS */}
      <div className="events-grid">
        {events.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white dark:bg-[#1A1A1A] rounded-3xl border border-gray-200 dark:border-white/10">
            <p className="text-gray-500 dark:text-[#A1A1A1]">No events yet. Click "Add New Event" to create one.</p>
          </div>
        ) : (
          events.map(ev => {
            const imageSrc = getImageSrc(ev);
            
            return (
              <div
                key={ev.id}
                onClick={() => {
                  setSelectedEvent(ev);
                  setSelectedDateIndex(0);
                  setShowAllPhotos(false);
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
                
                <button
                  onClick={() => setShowAddDateModal(true)}
                  className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>Add Date</span>
                </button>
              </div>
              
              {selectedEvent.dateEntries && selectedEvent.dateEntries.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {selectedEvent.dateEntries.map((entry, index) => (
                      <div
                        key={index}
                        className={`relative group flex flex-col items-center cursor-pointer gap-1.5 p-2 rounded-xl transition-all ${
                          selectedDateIndex === index
                            ? 'bg-indigo-500 dark:bg-indigo-400 border-2 border-indigo-500 dark:border-indigo-400 shadow-lg'
                            : 'bg-gray-100 dark:bg-[#0A0A14] border-2 border-transparent hover:border-indigo-300 dark:hover:border-indigo-400/50 hover:scale-105'
                        }`}
                      >
                        <div 
                          className="w-full"
                          onClick={() => {
                            setSelectedDateIndex(index);
                            setShowAllPhotos(false);
                          }}
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
                          <span className={`text-[11px] font-bold text-center block mt-1 ${
                            selectedDateIndex === index
                              ? 'text-white'
                              : 'text-black dark:text-[#E8E8F0]'
                          }`}>
                            {entry.date}
                          </span>
                          <span className={`text-[9px] block ${
                            selectedDateIndex === index
                              ? 'text-white/80'
                              : 'text-gray-400 dark:text-gray-500'
                          }`}>
                            {entry.photos?.length || 0} photos
                          </span>
                        </div>

                        <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditDateModal(index);
                            }}
                            className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-lg"
                            title="Edit this date album"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDateAlbum(index);
                            }}
                            className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-lg"
                            title="Delete this date album"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Selected Date Photos with Delete Button */}
                  {selectedEvent.dateEntries[selectedDateIndex] && (
                    <div className="mt-4">
                      {selectedEvent.dateEntries[selectedDateIndex].verse && (
                        <div className="bg-gray-50 dark:bg-[#0A0A14] p-4 rounded-xl border-l-4 border-indigo-400 dark:border-indigo-400/70 mb-4">
                          <p className="text-sm italic text-black dark:text-[#E8E8F0] leading-relaxed">
                            "{selectedEvent.dateEntries[selectedDateIndex].verse}"
                          </p>
                          {selectedEvent.dateEntries[selectedDateIndex].verseRef && (
                            <p className="text-right text-sm font-bold text-indigo-500 dark:text-indigo-400 mt-1">
                              — {selectedEvent.dateEntries[selectedDateIndex].verseRef}
                            </p>
                          )}
                        </div>
                      )}

                      {currentPhotos.length > 0 && (
                        <div>
                          <h5 className="text-xs font-bold text-gray-500 dark:text-[#8888AA] uppercase tracking-wider mb-2">
                            📸 Photos ({currentPhotos.length})
                          </h5>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {displayedPhotos.map((photo, idx) => (
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
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeletePhotoFromDate(selectedDateIndex, idx);
                                  }}
                                  className="absolute top-1 right-1 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Remove this photo"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>

                          {currentPhotos.length > 6 && (
                            <div className="text-center mt-3">
                              <button
                                onClick={() => setShowAllPhotos(!showAllPhotos)}
                                className="text-xs font-bold text-indigo-500 dark:text-indigo-400 hover:underline transition-all"
                              >
                                {showAllPhotos ? 'Show Less' : `View All ${currentPhotos.length} Photos`}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-6 bg-gray-50 dark:bg-[#0A0A14] rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-[#8888AA]">
                    No photo albums yet. Click <span className="text-indigo-500 font-bold">"Add Date"</span> to add a new date with photos.
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

      {/* ADD NEW DATE ALBUM MODAL */}
      {showAddDateModal && selectedEvent && (
        <div className="fixed inset-0 z-[60] bg-black/70 dark:bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-black dark:text-[#F5F5F5] rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddDateModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white rounded-full bg-gray-100 dark:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-serif text-indigo-500 dark:text-indigo-400 flex items-center gap-2">
                <FolderPlus className="w-5 h-5" />
                <span>Add New Date Album</span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-[#A1A1A1]">
                Add a new date with photos to "{selectedEvent.title}"
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                  Date Title *
                </label>
                <input
                  type="text"
                  required
                  value={newDateTitle}
                  onChange={e => setNewDateTitle(e.target.value)}
                  placeholder="e.g. August 25, 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Verse (Optional)
                  </label>
                  <input
                    type="text"
                    value={newDateVerse}
                    onChange={e => setNewDateVerse(e.target.value)}
                    placeholder="e.g. Pray without ceasing"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Reference
                  </label>
                  <input
                    type="text"
                    value={newDateVerseRef}
                    onChange={e => setNewDateVerseRef(e.target.value)}
                    placeholder="e.g. 1 Thess 5:17"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                  Upload Photos
                </label>
                
                {newDatePhotoPreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {newDatePhotoPreviews.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                        <img src={preview} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveDatePhoto(index)}
                          className="absolute top-1 right-1 p-0.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <label className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-center cursor-pointer transition-all flex items-center justify-center gap-2 min-h-[44px]">
                    <Upload className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      {newDatePhotoPreviews.length > 0 ? 'Add More Photos' : 'Click to Upload Photos'}
                    </span>
                    <input
                      type="file"
                      ref={dateFileInputRef}
                      accept="image/*"
                      multiple
                      onChange={handleAddDatePhotos}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                  You can select multiple photos at once.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDateModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveNewDateAlbum}
                  disabled={!newDateTitle.trim()}
                  className="px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white font-extrabold shadow-md uppercase tracking-wider text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Date Album
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT DATE ALBUM MODAL */}
      {showEditDateModal && selectedEvent && selectedEvent.dateEntries && (
        <div className="fixed inset-0 z-[60] bg-black/70 dark:bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-black dark:text-[#F5F5F5] rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowEditDateModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white rounded-full bg-gray-100 dark:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-serif text-indigo-500 dark:text-indigo-400 flex items-center gap-2">
                <Edit className="w-5 h-5" />
                <span>Edit Date Album</span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-[#A1A1A1]">
                Edit the date, verse, and photos for this album
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                  Date Title *
                </label>
                <input
                  type="text"
                  required
                  value={editDateTitle}
                  onChange={e => setEditDateTitle(e.target.value)}
                  placeholder="e.g. August 25, 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Verse (Optional)
                  </label>
                  <input
                    type="text"
                    value={editDateVerse}
                    onChange={e => setEditDateVerse(e.target.value)}
                    placeholder="e.g. Pray without ceasing"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Reference
                  </label>
                  <input
                    type="text"
                    value={editDateVerseRef}
                    onChange={e => setEditDateVerseRef(e.target.value)}
                    placeholder="e.g. 1 Thess 5:17"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                  Photos ({editDatePhotos.length})
                </label>
                
                {editDatePhotoPreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {editDatePhotoPreviews.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                        <img src={preview} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveEditDatePhoto(index)}
                          className="absolute top-1 right-1 p-0.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <label className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-center cursor-pointer transition-all flex items-center justify-center gap-2 min-h-[44px]">
                    <Upload className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Add More Photos
                    </span>
                    <input
                      type="file"
                      ref={editFileInputRef}
                      accept="image/*"
                      multiple
                      onChange={handleEditDatePhotos}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                  Add more photos to this album.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditDateModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEditDateAlbum}
                  disabled={!editDateTitle.trim()}
                  className="px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white font-extrabold shadow-md uppercase tracking-wider text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-3.5 h-3.5 inline mr-1" />
                  Save Changes
                </button>
              </div>
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

      {/* ADD NEW EVENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 dark:bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-black dark:text-[#F5F5F5] rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white rounded-full bg-gray-100 dark:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-serif text-indigo-500 dark:text-indigo-400">
                ➕ Add New Event
              </h3>
              <p className="text-xs text-gray-500 dark:text-[#A1A1A1]">
                Easily post a new church activity.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Youth Fellowship & Worship"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Date & Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    placeholder="e.g. Sunday • 8:30 AM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Category / Tag
                  </label>
                  <select
                    value={tag}
                    onChange={e => setTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  >
                    <option value="⛪ Worship">⛪ Worship</option>
                    <option value="🎵 Music">🎵 Music</option>
                    <option value="🙏 Prayer">🙏 Prayer</option>
                    <option value="📖 Word">📖 Word</option>
                    <option value="🌟 Youth">🌟 Youth</option>
                    <option value="🎉 Celebration">🎉 Celebration</option>
                  </select>
                </div>
              </div>

              {/* Event Cover Image Upload - With Base64 */}
              <div>
                <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                  Event Cover Image (Optional)
                </label>
                
                {imagePreview && (
                  <div className="mb-2 relative">
                    <div className="w-full h-32 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                      <img src={imagePreview} alt="Event preview" className="w-full h-full object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setEventImage('');
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <label className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-center cursor-pointer transition-all flex items-center justify-center gap-2 min-h-[44px]">
                    <Upload className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      {imagePreview ? 'Change Image' : 'Click to Upload Image'}
                    </span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {!imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80');
                        setEventImage('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80');
                      }}
                      className="px-3 py-2.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all"
                    >
                      Use Default
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                  Description / Details
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Brief explanation about the event..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Bible Verse (Optional)
                  </label>
                  <input
                    type="text"
                    value={verse}
                    onChange={e => setVerse(e.target.value)}
                    placeholder="e.g. I was glad..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Chapter / Reference
                  </label>
                  <input
                    type="text"
                    value={verseRef}
                    onChange={e => setVerseRef(e.target.value)}
                    placeholder="e.g. Psalm 122:1"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white font-extrabold shadow-md uppercase tracking-wider text-xs"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};