// GFC/src/components/Header.tsx

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { TextSizeLevel } from '../types';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  textSize: TextSizeLevel;
  setTextSize: (level: TextSizeLevel) => void;
  onOpenPrayerModal: () => void;
  onOpenGiveModal: () => void;
  onOpenGetStarted: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  setIsDarkMode,
  textSize,
  setTextSize,
  onOpenPrayerModal,
  onOpenGiveModal,
  onOpenGetStarted,
  activeSection,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#homeSection', label: 'Home', id: 'homeSection' },
    { href: '#aboutSection', label: 'About', id: 'aboutSection' },
    { href: '#eventsSection', label: 'Events', id: 'eventsSection' },
    { href: '#sermonsSection', label: 'Sermons', id: 'sermonsSection' },
    { href: '#prayerSection', label: 'Prayer', id: 'prayerSection' },
    { href: '#contactSection', label: 'Contact', id: 'contactSection' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavigate(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[1200px] rounded-full relative border border-indigo-400 ${
        isDarkMode ? 'border-white/10' : 'border-indigo-400'
      } ${
        isScrolled
          ? `py-2 px-4 sm:py-3 sm:px-8 ${isDarkMode ? 'bg-black/80 border-white/15' : 'bg-white/95 border-indigo-400'}`
          : `py-2 px-4 sm:py-3 sm:px-8 ${isDarkMode ? 'bg-white/5' : 'bg-white/80'}`
      }`}
      role="banner"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-shrink-0">
            <div className="w-9 h-9 sm:w-15 sm:h-15 rounded-full overflow-hidden border border-indigo-300 dark:border-indigo-400/50 shadow-md bg-indigo-50 dark:bg-black/60 flex items-center justify-center">
              <img 
                src="/image.png" 
                alt="Gospel Fellowship Church Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <a
            href="#homeSection"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('homeSection');
              document.getElementById('homeSection')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col group"
          >
            <span className="text-xs sm:text-2xl font-serif tracking-tight whitespace-nowrap text-black dark:text-white">
              Gospel <span className="text-indigo-500 dark:text-indigo-400">Fellowship</span> Church
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 p-1.5 px-6 rounded-full border border-none">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative text-sm font-medium py-1 transition-colors duration-300 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'text-gray-600 dark:text-[#A1A1A1] hover:text-indigo-500 dark:hover:text-indigo-400'
                }`}
              >
                {link.label}
                
                {/* Animated Underline - Active only */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 ease-out ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="hidden sm:flex px-3 py-1.5 bg-gray-100 dark:bg-white/10 rounded-full items-center gap-2 border border-gray-200 dark:border-white/10 min-h-[38px]"
            aria-label="Toggle dark mode"
          >
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-black dark:text-indigo-400">
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-indigo-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
          </button>

          {/* Mobile Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex sm:hidden p-2.5 bg-gray-100 dark:bg-white/10 rounded-full border border-gray-200 dark:border-white/10 min-h-[38px] min-w-[38px] items-center justify-center"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-indigo-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-indigo-500 dark:bg-indigo-400 text-white min-h-[38px] min-w-[38px] flex items-center justify-center font-bold"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 lg:hidden bg-white dark:bg-black/95 space-y-3 p-4 rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl z-50">
          <nav className="flex flex-col gap-2">
            {navLinks.map(link => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(e, link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold border-l-4 border-indigo-500 dark:border-indigo-400'
                      : 'text-black dark:text-[#F5F5F5] hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className={`text-xs ${isActive ? 'text-indigo-500' : 'text-indigo-400'}`}>➔</span>
                </a>
              );
            })}
          </nav>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 dark:border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPrayerModal();
              }}
              className="px-3 py-2.5 bg-indigo-500 dark:bg-indigo-400 text-white rounded-xl text-xs font-bold text-center"
            >
              🙏 Prayer Request
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGiveModal();
              }}
              className="px-3 py-2.5 bg-gray-100 dark:bg-white/10 text-black dark:text-white rounded-xl text-xs font-bold text-center border border-gray-200 dark:border-white/10"
            >
              💝 Give / Offering
            </button>
          </div>
        </div>
      )}
    </header>
  );
};