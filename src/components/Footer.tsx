import React from 'react';
import { Facebook, Mail, MapPin, Phone, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative -top-130 bg-none dark:bg-[#0A0A0A] text-gray-600 dark:text-[#A1A1A1] pt-16 pb-12 border-t border-none transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-400/20 border border-indigo-200 dark:border-indigo-400/40 flex items-center justify-center font-bold text-indigo-500 dark:text-indigo-400 text-lg overflow-hidden">
                <img 
                  src="/image.png" 
                  alt="Gospel Fellowship Church Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-serif text-black dark:text-white tracking-wide">
                Gospel <span className="text-indigo-500 dark:text-indigo-400">Fellowship</span> Church
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-[#A1A1A1] max-w-md leading-relaxed">
              "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit 🙌☝️"
            </p>

            <div className="text-xs text-indigo-500 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-[#1A1A1A] p-3 rounded-2xl border border-indigo-200 dark:border-white/10 inline-block">
              📍 008 National Road SF. 2 Purok 1, Limay, Bataan
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-black dark:text-white uppercase tracking-[0.2em]">Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#homeSection" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="#aboutSection" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#eventsSection" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Events & Schedule</a></li>
              <li><a href="#sermonsSection" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Sermon Audio</a></li>
              <li><a href="#prayerSection" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Prayer Request</a></li>
              <li><a href="#contactSection" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Contact & Location</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-black dark:text-white uppercase tracking-[0.2em]">Contact</h4>
            <div className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-[#A1A1A1]">
              <p className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-current text-gray-600 dark:text-[#A1A1A1]">
                  <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/>
                </svg>
                123-456-7890 / 0912-345-6789
              </p>
              <p className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-current text-gray-600 dark:text-[#A1A1A1]">
                  <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/>
                </svg>
                gospelfellowshipchurch0923@gmail.com
              </p>
              <a
                href="https://www.facebook.com/profile.php?id=61590579395623"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-black dark:text-white hover:underline pt-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-current">
                  <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z"/>
                </svg>
                <span>Facebook Page</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-[#A1A1A1]">
          <div>
            © {new Date().getFullYear()} Gospel Fellowship Church Limay, Bataan. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-500 dark:text-[#A1A1A1]">
              <Heart className="w-3.5 h-3.5 text-indigo-400 fill-current" />
              Seniors & Mobile Data Friendly
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-400 text-black dark:text-white transition-all shadow-lg"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};