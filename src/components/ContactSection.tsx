import React, { useState } from 'react';
import { Attendee } from '../types';
import { MapPin, Phone, Mail, Facebook, Heart, Check, UserCheck, Send, ExternalLink, X } from 'lucide-react';

interface ContactSectionProps {
  onRegisterAttendee: (attendee: Attendee) => void;
  showGiveModal: boolean;
  setShowGiveModal: (show: boolean) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onRegisterAttendee,
  showGiveModal,
  setShowGiveModal
}) => {
  const [name, setName] = useState('');
  const [facebookName, setFacebookName] = useState('');
  const [contact, setContact] = useState('');
  const [age, setAge] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAtt: Attendee = {
      id: Date.now().toString(),
      name,
      facebookName: facebookName || undefined,
      contact: contact || undefined,
      age: age || undefined,
      registeredAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    onRegisterAttendee(newAtt);
    setRegistered(true);
    setName('');
    setFacebookName('');
    setContact('');
    setAge('');
  };

  return (
    <section id="contactSection" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 relative -top-125">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-white/5 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-400/30 inline-block">
          Contact & Location
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-black dark:text-white">
          Visit Us in Limay, Bataan
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-[#A1A1A1]">
          We are ready to welcome you and your whole family to our next gathering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative -top-6">
        {/* Contact Info & Street View */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-black dark:text-white">
              Church Information
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-black/40 border border-indigo-200 dark:border-white/5">
                <MapPin className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-black dark:text-white uppercase tracking-wider text-xs">Address</div>
                  <div className="text-gray-600 dark:text-[#A1A1A1] mt-0.5">008 National Road SF. 2 Purok 1, Limay, Bataan</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-black/40 border border-indigo-200 dark:border-white/5">
                <Phone className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-black dark:text-white uppercase tracking-wider text-xs">Phone / Hotline</div>
                  <div className="text-gray-600 dark:text-[#A1A1A1] mt-0.5">123-456-7890 / 0912-345-6789</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-black/40 border border-indigo-200 dark:border-white/5">
                <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-black dark:text-white uppercase tracking-wider text-xs">Email Address</div>
                  <div className="text-gray-600 dark:text-[#A1A1A1] mt-0.5">gospelfellowshipchurch0923@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-black/40 border border-indigo-200 dark:border-white/5">
                <Facebook className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-black dark:text-white uppercase tracking-wider text-xs">Official Facebook Page</div>
                  <a
                    href="https://www.facebook.com/profile.php?id=61590579395623"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1 mt-0.5"
                  >
                    <span>Gospel Fellowship Church Facebook</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Street View */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-black h-48 sm:h-56 relative flex items-center justify-center shadow-inner">
            <iframe
              title="Gospel Fellowship Church - Street View"
              src="https://www.google.com/maps/embed?pb=!4v1700000000000!6m8!1m7!1sd-ADBDVXjIVos9E3RA53DQ!2m2!1d14.5704896!2d120.5938422!3f142.57!4f0!5f0"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Attendance Registration Card */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1">
              <UserCheck className="w-4 h-4 text-indigo-400" />
              <span>Sunday Service Registration</span>
            </span>
            <h3 className="text-2xl font-serif text-black dark:text-white">
              Register Your Attendance
            </h3>
            <p className="text-xs text-gray-600 dark:text-[#A1A1A1]">
              Register your name and family for the upcoming Sunday service.
            </p>
          </div>

          {registered ? (
            <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-black/40 border border-indigo-200 dark:border-indigo-400/30 text-center space-y-3">
              <div className="w-12 h-12 bg-indigo-500 dark:bg-indigo-400 text-white rounded-full flex items-center justify-center mx-auto font-extrabold text-xl">
                ✓
              </div>
              <h4 className="font-serif text-black dark:text-white text-xl">
                Thank You for Registering!
              </h4>
              <p className="text-xs text-gray-600 dark:text-[#A1A1A1]">
                We look forward to seeing you at Gospel Fellowship Church this Sunday, 8:30 AM!
              </p>
              <button
                onClick={() => setRegistered(false)}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white uppercase tracking-wider font-extrabold rounded-xl text-xs transition-all"
              >
                Register Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Juan Dela Cruz"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                  Facebook Account Name (Optional)
                </label>
                <input
                  type="text"
                  value={facebookName}
                  onChange={e => setFacebookName(e.target.value)}
                  placeholder="For announcements and follow-ups"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Contact No.
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={e => setContact(e.target.value)}
                    placeholder="0912-345-6789"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-[#A1A1A1] uppercase tracking-wider mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    placeholder="e.g. 35"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Confirm Attendance</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Give / Offering Modal */}
      {showGiveModal && (
        <div className="fixed inset-0 z-50 bg-black/70 dark:bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-black dark:text-[#F5F5F5] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowGiveModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white rounded-full bg-gray-100 dark:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-400/20 border border-indigo-200 dark:border-indigo-400/30 text-indigo-500 dark:text-indigo-400 flex items-center justify-center mx-auto text-2xl">
                💝
              </div>
              <h3 className="text-xl font-serif text-black dark:text-white">
                Give Your Tithes & Offering
              </h3>
              <p className="text-xs text-gray-600 dark:text-[#A1A1A1]">
                "Each of you should give what you have decided in your heart to give..." (2 Corinthians 9:7)
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-black/50 border border-indigo-200 dark:border-white/10 space-y-1">
                <div className="font-extrabold text-indigo-500 dark:text-indigo-400">📱 GCash Account</div>
                <div className="text-black dark:text-white font-mono font-bold text-base">0912-345-6789</div>
                <div className="text-gray-600 dark:text-[#A1A1A1]">Account Name: Gospel Fellowship Church / Pastor Zaldy B.</div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-black/50 border border-indigo-200 dark:border-white/10 space-y-1">
                <div className="font-extrabold text-indigo-500 dark:text-indigo-400">🏛️ Bank Transfer / BDO</div>
                <div className="text-black dark:text-white font-mono font-bold text-base">0012-3456-7890</div>
                <div className="text-gray-600 dark:text-[#A1A1A1]">Gospel Fellowship Church Limay</div>
              </div>
            </div>

            <button
              onClick={() => setShowGiveModal(false)}
              className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white uppercase font-extrabold tracking-wider text-xs rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};