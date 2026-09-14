import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Mail, MapPin, Phone, ArrowUp, Heart } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/events', label: 'Events & Schedule' },
  { path: '/verse', label: 'Verse of the Day' },
  { path: '/prayer', label: 'Prayer Request' },
  { path: '/contact', label: 'Contact & Location' }
];

const schedule = [
  { name: 'Sunday Worship', time: '8:30 AM' },
  { name: 'Prayer Meeting', time: '7:00 PM' },
  { name: 'Worship Night', time: '7:00 PM' },
  { name: 'Next Gen Youth', time: '7:00 PM' }
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f172a] text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-white/20 bg-white/10 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Gospel Fellowship Church Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-xl text-white tracking-tight">
                Gospel <span className="italic text-indigo-400">Fellowship</span> Church
              </h3>
            </div>

            <p className="text-sm leading-relaxed max-w-xs">
              A family of faith in Limay, Bataan — rooted in the Word, formed by
              worship, and sent in love.
            </p>

            <div className="inline-flex items-start gap-2 text-xs text-white/80 border border-white/15 rounded-2xl px-4 py-3">
              <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
              008 National Road SF. 2 Purok 1, Limay, Bataan
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.25em]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-indigo-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.25em]">
              Worship With Us
            </h4>
            <ul className="space-y-2.5 text-sm">
              {schedule.map(item => (
                <li key={item.name} className="flex items-center justify-between gap-4">
                  <span>{item.name}</span>
                  <span className="text-indigo-400 font-semibold whitespace-nowrap">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.25em]">
              Contact
            </h4>
            <div className="space-y-2.5 text-sm">
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                123-456-7890 / 0912-345-6789
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                gospelfellowshipchurch0923@gmail.com
              </p>
              <a
                href="https://www.facebook.com/profile.php?id=61590579395623"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 hover:text-indigo-400 transition-colors"
              >
                <Facebook className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Facebook Page</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Gospel Fellowship Church Limay, Bataan. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-indigo-400 fill-current" />
              Seniors & Mobile Data Friendly
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full border border-white/20 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 text-white transition-all shadow-lg"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};