// GFC/src/components/Header.tsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  onOpenGiveModal: () => void;
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/events', label: 'Events' },
  { path: '/verse', label: 'Verse' },
  { path: '/prayer', label: 'Prayer' },
  { path: '/contact', label: 'Contact' }
];

export const Header: React.FC<HeaderProps> = ({ onOpenGiveModal }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobile = () => setMobileMenuOpen(false);

  const linkBase = 'relative text-base font-medium tracking-wide py-1 transition-colors duration-300';
  const linkColor = (isActive: boolean) => isActive ? 'text-indigo-400' : 'text-white/80 hover:text-white';

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center relative top-10 justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Brand & Logo */}
        <Link
          to="/"
          onClick={closeMobile}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-1 ring-white/25 shadow-md bg-white/90 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <img
              src="/logo.png"
              alt="Gospel Fellowship Church Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="font-serif tracking-tight text-white text-xl sm:text-4xl lg:text-3xl leading-tight whitespace-nowrap"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Gospel <span className="text-indigo-400">Fellowship</span> Church
          </span>
        </Link>

        {/* Desktop Navigation - right side */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`group ${linkBase} ${linkColor(isActive)}`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-current transition-all duration-300 ease-out ${
                    isActive ? 'w-0' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}

          {/* Give - part of the navbar */}
          <button
            onClick={onOpenGiveModal}
            className="group relative flex items-center gap-1.5 text-base font-bold text-indigo-400 hover:text-white py-1 transition-colors duration-300"
          >
            <Heart className="w-4 h-4" />
            Give
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current group-hover:w-full transition-all duration-300" />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white border border-white/20 transition-all duration-300"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Menu Panel */}
        <div
          className={`lg:hidden absolute top-full right-4 sm:right-6 z-50 origin-top-right transition-all duration-300 ${
            mobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="-mt-2 w-35 rounded-2xl bg-[#0f172a]/90 backdrop-blur-xl border border-white/25 shadow-2xl shadow-black/40 p-1.5">
            <nav className="flex flex-col">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMobile}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                      isActive
                        ? 'text-indigo-400 bg-white/10 font-semibold'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                  </Link>
                );
              })}
              <div className="my-1 h-px bg-white/10" />
              <button
                onClick={() => {
                  closeMobile();
                  onOpenGiveModal();
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-bold text-indigo-400 transition-colors hover:bg-white/10"
              >
                <Heart className="w-3.5 h-3.5" />
                Give
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};