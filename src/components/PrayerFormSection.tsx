import React, { useState } from 'react';
import { PrayerRequest } from '../types';
import { Heart, Send, CheckCircle2, ShieldCheck, Sparkles, MessageSquare, Users, Eye } from 'lucide-react';

interface PrayerFormSectionProps {
  prayers: PrayerRequest[];
  onSubmitPrayer: (prayer: PrayerRequest) => void;
}

export const PrayerFormSection: React.FC<PrayerFormSectionProps> = ({ prayers, onSubmitPrayer }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('Health & Healing');
  const [request, setRequest] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;

    const newP: PrayerRequest = {
      id: Date.now().toString(),
      name: isAnonymous || !name.trim() ? 'Anonymous / A Brother or Sister' : name,
      contact: contact || undefined,
      request,
      createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'approved',
      category
    };

    onSubmitPrayer(newP);
    setIsSubmitted(true);
    setName('');
    setContact('');
    setRequest('');
    setIsAnonymous(false);
  };

  return (
    <section id="prayerSection" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 relative -top-100">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-white/5 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-400/30 inline-flex items-center gap-1.5">
          <Heart className="w-4 h-4 fill-current text-indigo-400" />
          <span>Prayer Request</span>
        </span>

        <h2 className="text-3xl sm:text-5xl font-serif text-black dark:text-white">
          Do You Have a Prayer Request?
        </h2>

        <p className="text-sm sm:text-base text-gray-600 dark:text-[#A1A1A1] max-w-2xl mx-auto leading-relaxed">
          The Gospel Fellowship Church Prayer Team is ready to pray with you. No request is too small or too big for our Lord.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl space-y-6">
        {isSubmitted ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-400/20 text-indigo-500 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-400/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-serif text-black dark:text-white">
              Your Prayer Request Has Been Recorded!
            </h3>

            <p className="text-sm sm:text-base text-gray-600 dark:text-[#A1A1A1] max-w-md mx-auto">
              Thank you! Your request has been added to the Prayer Wall and the entire pastorate and prayer team will pray for you.
            </p>

            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-black/50 border border-indigo-200 dark:border-indigo-400/30 text-xs sm:text-sm italic text-black dark:text-[#F5F5F5] max-w-lg mx-auto">
              "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
              <span className="block font-bold not-italic mt-1 text-right text-indigo-500 dark:text-indigo-400">— Philippians 4:6</span>
            </div>

            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all"
            >
              Submit Another Prayer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-indigo-50 dark:bg-white/5 p-4 rounded-2xl border border-indigo-200 dark:border-white/10 flex items-center gap-3 text-xs sm:text-sm text-black dark:text-[#F5F5F5]">
              <ShieldCheck className="w-6 h-6 text-indigo-400 flex-shrink-0" />
              <span>
                <strong className="text-indigo-500 dark:text-indigo-400">Safe & Easy to Use:</strong> You can provide your name or choose to remain confidential / anonymous.
              </span>
            </div>

            {/* Category Selector */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-700 dark:text-[#A1A1A1] mb-2">
                Select Prayer Category:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Health & Healing',
                  'Family & Home',
                  'Financial & Work',
                  'Protection & Guidance',
                  'Spiritual Growth',
                  'Thanksgiving & Praise'
                ].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between min-h-[44px] ${
                      category === cat
                        ? 'bg-indigo-500 dark:bg-indigo-400 text-white border-indigo-500 dark:border-indigo-400 shadow-lg'
                        : 'bg-gray-50 dark:bg-black/50 text-black dark:text-[#F5F5F5] border-gray-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-400/50'
                    }`}
                  >
                    <span>{cat}</span>
                    {category === cat && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Prayer Details Textarea */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-700 dark:text-[#A1A1A1] mb-2">
                Write Your Prayer Request Here *
              </label>
              <textarea
                rows={4}
                required
                value={request}
                onChange={e => setRequest(e.target.value)}
                placeholder="Example: Please pray for the health of my mother and for peace in our home..."
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-sm sm:text-base text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
              />
            </div>

            {/* Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-700 dark:text-[#A1A1A1] mb-1">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  disabled={isAnonymous}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-sm text-black dark:text-white disabled:opacity-30 focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-700 dark:text-[#A1A1A1] mb-1">
                  Contact No. / Facebook (Optional)
                </label>
                <input
                  type="text"
                  disabled={isAnonymous}
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  placeholder="e.g. 0912-345-6789"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-sm text-black dark:text-white disabled:opacity-30 focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Anonymous Switch */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymousCheck"
                checked={isAnonymous}
                onChange={e => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 accent-indigo-500 rounded cursor-pointer"
              />
              <label htmlFor="anonymousCheck" className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-[#A1A1A1] cursor-pointer">
                I prefer to remain Anonymous (Hide my name)
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white font-extrabold uppercase tracking-widest text-xs sm:text-sm rounded-xl shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 min-h-[52px]"
            >
              <Send className="w-5 h-5 text-white" />
              <span>Submit Prayer Request</span>
            </button>
          </form>
        )}
      </div>

      {/* Community Prayer Wall */}
      <div className="space-y-6 pt-1">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-serif text-black dark:text-white flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" />
            <span>Community Prayer Wall</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-[#A1A1A1]">
            Let us also pray for the requests of our brothers and sisters in faith.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prayers.map(p => (
            <div
              key={p.id}
              className="bg-white dark:bg-[#1A1A1A] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-indigo-500 dark:text-indigo-400">
                    🙏 {p.category || 'Prayer'}
                  </span>
                  <span className="text-gray-500 dark:text-[#A1A1A1]">{p.createdAt}</span>
                </div>
                <p className="text-xs sm:text-sm text-black dark:text-[#F5F5F5] italic font-medium leading-relaxed">
                  "{p.request}"
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs">
                <span className="font-bold text-gray-600 dark:text-[#A1A1A1]">
                  — {p.name}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  ✓ Being Prayed For
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};