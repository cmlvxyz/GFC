import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Heart, Headphones, Calendar, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

interface HomeSectionProps {
  onOpenPrayerModal: () => void;
  onOpenGiveModal: () => void;
  onOpenGetStarted: () => void;
  onNavigateToSermons: () => void;
  onNavigateToEvents: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onOpenPrayerModal,
  onOpenGiveModal,
  onOpenGetStarted,
  onNavigateToSermons,
  onNavigateToEvents
}) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [typedText, setTypedText] = useState('');
  const [isFirstLineComplete, setIsFirstLineComplete] = useState(false);
  const [secondLineText, setSecondLineText] = useState('');
  const [isSecondLineComplete, setIsSecondLineComplete] = useState(false);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const nextSunday = new Date();
      const daysUntilSunday = (7 - now.getDay()) % 7;
      
      nextSunday.setDate(now.getDate() + (daysUntilSunday === 0 && now.getHours() >= 12 ? 7 : daysUntilSunday));
      nextSunday.setHours(8, 30, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();
      if (diff > 0) {
        setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((diff / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((diff / 1000 / 60) % 60));
        setSeconds(Math.floor((diff / 1000) % 60));
      }
    };

    const setDays = (d: number) => setTimeLeft(prev => ({ ...prev, days: d }));
    const setHours = (h: number) => setTimeLeft(prev => ({ ...prev, hours: h }));
    const setMinutes = (m: number) => setTimeLeft(prev => ({ ...prev, minutes: m }));
    const setSeconds = (s: number) => setTimeLeft(prev => ({ ...prev, seconds: s }));

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  let timeoutId: NodeJS.Timeout;
  let intervalId: NodeJS.Timeout;

  const startTyping = () => {
    // Reset all states
    setTypedText('');
    setIsFirstLineComplete(false);
    setSecondLineText('');
    setIsSecondLineComplete(false);

    const fullText = 'Your Home in Faith,';
    let index = 0;
    
    intervalId = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(intervalId);
        setIsFirstLineComplete(true);
        
        // Start typing second line immediately
        const secondFullText = 'Hope and Love';
        let secondIndex = 0;
        const secondInterval = setInterval(() => {
          if (secondIndex <= secondFullText.length) {
            setSecondLineText(secondFullText.slice(0, secondIndex));
            secondIndex++;
          } else {
            clearInterval(secondInterval);
            setIsSecondLineComplete(true);
            
            // Wait 5 seconds then restart
            timeoutId = setTimeout(() => {
              startTyping();
            }, 5000);
          }
        }, 80);
      }
    }, 80);
  };

  // Start the typing effect
  startTyping();

  // Cleanup function
  return () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };
}, []);

  return (
    <section id="homeSection" className="pt-35 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Container */}
      <div className="relative rounded-3xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1600&q=80")'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0F0F0F] via-white/80 dark:via-[#0F0F0F]/80 to-transparent" />

        <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-20 text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-50/80 dark:bg-white/5 backdrop-blur-md border border-indigo-200 dark:border-indigo-400/40 text-indigo-600 dark:text-indigo-400 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase">
            <span>You are Welcome in Gospel Fellowship Church</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-black dark:text-white tracking-tight leading-tight min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]">
            <span className="text-black dark:text-white">
              {typedText.split(' ').map((word, index, array) => {
                // Check if the word is "Faith," (with comma)
                if (word.includes('Faith')) {
                  return (
                    <span key={index} className="text-indigo-500 dark:text-indigo-400 italic">
                      {word}{index < array.length - 1 ? ' ' : ''}
                    </span>
                  );
                }
                return word + (index < array.length - 1 ? ' ' : '');
              })}
            </span>
            {!isFirstLineComplete && <span className="animate-pulse text-indigo-500">|</span>}
            <br />
            <span className="text-black dark:text-white italic">
              {secondLineText.split(' ').map((word, index, array) => {
                // Check if the word is "Hope" or "Love"
                if (word === 'Hope' || word === 'Love') {
                  return (
                    <span key={index} className="text-indigo-500 dark:text-indigo-400">
                      {word}{index < array.length - 1 ? ' ' : ''}
                    </span>
                  );
                }
                return word + (index < array.length - 1 ? ' ' : '');
              })}
              {!isSecondLineComplete && isFirstLineComplete && <span className="animate-pulse text-indigo-500">|</span>}
            </span>
          </h1>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenPrayerModal}
              className="px-6 py-4 rounded-[45px] bg-white hover:border-[1px] hover:border-indigo-500 hover:bg-white dark:bg-indigo-400 dark:hover:brightness-110 text-indigo-500 font-extrabold text-sm sm:text-base shadow-xs transition-all transform active:scale-[0.98] flex items-center gap-2 min-h-[48px]"
            >
              <Heart className="w-5 h-5 fill-current text-white" />
              <span>Prayer Requests</span>
            </button>

            <button
              onClick={onNavigateToSermons}
              className="px-6 py-4 rounded-[45px] bg-gray-200/80 hover:bg-gray-300/80 dark:bg-white/10 dark:hover:bg-white/20 text-black dark:text-white font-bold text-sm sm:text-base border border-gray-300 dark:border-white/10 backdrop-blur-md transition-all flex items-center gap-2 min-h-[48px]"
            >
              <Headphones className="w-5 h-5 text-indigo-400" />
              <span>Sermon Audio</span>
            </button>

            <button
              onClick={onOpenGiveModal}
              className="px-6 py-4 rounded-[45px] bg-gray-200/60 hover:bg-gray-300/60 dark:bg-black/40 dark:hover:bg-black/60 text-black dark:text-white font-bold text-sm sm:text-base border border-gray-300 dark:border-indigo-400/30 transition-all flex items-center gap-2 min-h-[48px]"
            >
              <span>Give / Offering</span>
            </button>
          </div>
        </div>
      </div>

      {/* Countdown & Quick Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-[#1A1A1A] text-black dark:text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-indigo-200 dark:border-indigo-400/30 relative overflow-hidden flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400 font-bold text-sm sm:text-base italic font-serif">
              <Clock className="w-5 h-5 text-indigo-400" />
              <span>Next Worship Service</span>
            </div>
            <span className="bg-indigo-50 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-400/30">
              Sunday • 8:30 AM
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-black dark:text-white">Sunday Celebration & Praise Service</h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-[#A1A1A1] mt-1">
              Join us for our weekly worship, prayer, and study of God's Word.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="bg-gray-100 dark:bg-black/50 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-indigo-500 dark:text-indigo-400">{timeLeft.days}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-[#A1A1A1] uppercase tracking-widest font-semibold mt-1">Days</div>
            </div>
            <div className="bg-gray-100 dark:bg-black/50 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-indigo-500 dark:text-indigo-400">{timeLeft.hours}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-[#A1A1A1] uppercase tracking-widest font-semibold mt-1">Hours</div>
            </div>
            <div className="bg-gray-100 dark:bg-black/50 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-indigo-500 dark:text-indigo-400">{timeLeft.minutes}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-[#A1A1A1] uppercase tracking-widest font-semibold mt-1">Minutes</div>
            </div>
            <div className="bg-gray-100 dark:bg-black/50 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-indigo-500 dark:text-indigo-400">{timeLeft.seconds}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-[#A1A1A1] uppercase tracking-widest font-semibold mt-1">Seconds</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100/80 dark:bg-white/5 p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-white/10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-indigo-500 dark:text-indigo-400 italic flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span>Service Schedule</span>
            </h3>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5">
                <span className="font-semibold text-black dark:text-white">Sunday Service</span>
                <span className="font-bold text-indigo-500 dark:text-indigo-400">8:30 AM</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5">
                <span className="font-semibold text-black dark:text-white">Prayer Meeting</span>
                <span className="font-semibold text-gray-500 dark:text-[#A1A1A1]">Monday 7:00 PM</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5">
                <span className="font-semibold text-black dark:text-white">Worship Night</span>
                <span className="font-semibold text-gray-500 dark:text-[#A1A1A1]">Friday 7:00 PM</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5">
                <span className="font-semibold text-black dark:text-white">Next Gen Youth</span>
                <span className="font-semibold text-gray-500 dark:text-[#A1A1A1]">Sunday 7:00 PM</span>
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToEvents}
            className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/15 text-black dark:text-white rounded-xl text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-1.5 border border-gray-300 dark:border-white/10"
          >
            <span>View All Events</span>
            <ChevronRight className="w-4 h-4 text-indigo-400" />
          </button>
        </div>
      </div>
    </section>
  );
};