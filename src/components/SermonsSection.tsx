import React, { useState } from 'react';
import { Sermon } from '../types';
import { AudioPlayer } from './AudioPlayer';
import { Headphones, Video, BookOpen, Plus, Calendar, User, Search, X, Music } from 'lucide-react';

interface SermonsSectionProps {
  sermons: Sermon[];
  onAddSermon: (newSermon: Sermon) => void;
}

export const SermonsSection: React.FC<SermonsSectionProps> = ({ sermons, onAddSermon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Add Sermon Form
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('Pastor Zaldy Bernaldo');
  const [sermonDate, setSermonDate] = useState('');
  const [verse, setVerse] = useState('');
  const [verseRef, setVerseRef] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');

  const filteredSermons = sermons.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.speaker?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.verse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !sermonDate || !verse) return;

    const newSermon: Sermon = {
      id: Date.now().toString(),
      title,
      sermonDate,
      speaker: speaker || 'Pastor Zaldy Bernaldo',
      verse,
      verseRef: verseRef || 'Psalm 23:1',
      audioUrl: audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      videoUrl,
      description: description || 'A message of hope and blessing for the household of faith.',
      image: 'https://images.unsplash.com/photo-1510563800743-aed236490d08?auto=format&fit=crop&w=800&q=80'
    };

    onAddSermon(newSermon);
    setShowAddModal(false);
    setTitle('');
    setSermonDate('');
    setVerse('');
    setVerseRef('');
    setAudioUrl('');
    setVideoUrl('');
    setDescription('');
  };

  return (
    <section id="sermonsSection" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 relative -top-80">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-white/5 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-400/30 inline-block">
            Message & Teaching of God's Word
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-black dark:text-white">
            Sermon Audio & Archives
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-[#A1A1A1]">
            Listen to sermon audio recordings or add new audio for those who missed the service.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Add Sermon Audio</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by title, speaker, or verse..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/50 text-xs sm:text-sm text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden shadow-sm"
        />
      </div>

      {/* Sermons List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSermons.map(sermon => (
          <div
            key={sermon.id}
            className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-white/5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-indigo-500 dark:text-indigo-400 font-bold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {sermon.sermonDate}
                  </span>
                  {sermon.speaker && (
                    <span className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-2.5 py-0.5 rounded-full text-gray-700 dark:text-[#A1A1A1]">
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      {sermon.speaker}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-black dark:text-white">
                  {sermon.title}
                </h3>

                {sermon.description && (
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-[#A1A1A1]">
                    {sermon.description}
                  </p>
                )}
              </div>

              {sermon.videoUrl && (
                <a
                  href={sermon.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 self-start lg:self-center transition-all shadow-md"
                >
                  <Video className="w-4 h-4" />
                  <span>Watch on YouTube</span>
                </a>
              )}
            </div>

            {/* Verse Callout */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-black/40 border border-indigo-200 dark:border-indigo-400/20 space-y-1">
              <div className="flex items-center gap-1 text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Scripture:</span>
              </div>
              <p className="text-xs sm:text-sm italic text-black dark:text-[#F5F5F5] font-medium">
                "{sermon.verse}"
              </p>
              {sermon.verseRef && (
                <p className="text-[11px] font-bold text-indigo-500 dark:text-indigo-400 text-right">
                  — {sermon.verseRef}
                </p>
              )}
            </div>

            {/* Integrated Audio Player Component */}
            <AudioPlayer
              audioUrl={sermon.audioUrl}
              title={sermon.title}
              speaker={sermon.speaker}
              date={sermon.sermonDate}
            />
          </div>
        ))}

        {filteredSermons.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-12 bg-white dark:bg-[#1A1A1A] rounded-3xl border border-gray-200 dark:border-white/10 space-y-2 shadow-md">
            <p className="text-sm font-bold text-gray-500 dark:text-[#A1A1A1]">
              No sermon audio found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Add New Sermon Audio Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 dark:bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-black dark:text-[#F5F5F5] rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white rounded-full bg-gray-100 dark:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-serif text-indigo-500 dark:text-indigo-400 flex items-center gap-2">
                <Headphones className="w-5 h-5 text-indigo-400" />
                <span>Add Sermon Audio</span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-[#A1A1A1]">
                Upload or provide an audio link for members to listen to.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                  Sermon Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Faith That Heals"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Speaker
                  </label>
                  <input
                    type="text"
                    value={speaker}
                    onChange={e => setSpeaker(e.target.value)}
                    placeholder="Pastor Zaldy Bernaldo"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Sermon Date
                  </label>
                  <input
                    type="text"
                    required
                    value={sermonDate}
                    onChange={e => setSermonDate(e.target.value)}
                    placeholder="e.g. August 9, 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                  Scripture / Verse
                </label>
                <input
                  type="text"
                  required
                  value={verse}
                  onChange={e => setVerse(e.target.value)}
                  placeholder="e.g. The Lord is my shepherd, I shall not want."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Verse Reference
                  </label>
                  <input
                    type="text"
                    value={verseRef}
                    onChange={e => setVerseRef(e.target.value)}
                    placeholder="Psalm 23:1"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Audio File URL / MP3 Link
                  </label>
                  <input
                    type="url"
                    value={audioUrl}
                    onChange={e => setAudioUrl(e.target.value)}
                    placeholder="https://...mp3"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                  Description / Summary
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Brief summary of the sermon..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                />
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
                  Save Sermon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};