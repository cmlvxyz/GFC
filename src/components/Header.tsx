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

  const linkBase = 'relative text-sm font-medium tracking-wide py-1 transition-colors duration-300';
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
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-1 ring-white/25 shadow-md bg-white/90 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <img
              src="/logo.png"
              alt="Gospel Fellowship Church Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="font-serif tracking-tight text-white text-4xl lg:text-4xl leading-tight whitespace-nowrap"
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
            className="group relative flex items-center gap-1.5 text-sm font-bold text-indigo-400 hover:text-white py-1 transition-colors duration-300"
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
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden absolute top-full inset-x-0 origin-top transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="mx-3 mt-2 mb-4 rounded-2xl bg-[#0f172a] shadow-[0_24px_60px_-12px_rgba(15,23,42,0.5)] border border-white/10 overflow-hidden">
          <nav className="flex flex-col">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobile}
                  className={`flex items-center justify-between px-5 py-4 text-base font-medium border-b border-white/10 last:border-b-0 transition-colors ${
                    isActive
                      ? 'text-indigo-400 bg-white/5 font-semibold'
                      : 'text-white/80 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  <span className={`text-xs ${isActive ? 'text-indigo-400' : 'text-white/30'}`}>→</span>
                </Link>
              );
            })}
            <button
              onClick={() => {
                closeMobile();
                onOpenGiveModal();
              }}
              className="flex items-center gap-2 px-5 py-4 text-base font-bold text-indigo-400 border-b border-white/10 transition-colors hover:bg-white/5"
            >
              <Heart className="w-4 h-4" />
              Give
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};