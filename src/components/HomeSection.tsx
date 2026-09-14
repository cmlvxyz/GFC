import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, CalendarDays, ChevronDown } from 'lucide-react';

interface HomeSectionProps {
  onOpenGiveModal: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onOpenGiveModal }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [serviceOpen, setServiceOpen] = useState(false);

  useEffect(() => {
    const setDays = (d: number) => setTimeLeft(prev => ({ ...prev, days: d }));
    const setHours = (h: number) => setTimeLeft(prev => ({ ...prev, hours: h }));
    const setMinutes = (m: number) => setTimeLeft(prev => ({ ...prev, minutes: m }));
    const setSeconds = (s: number) => setTimeLeft(prev => ({ ...prev, seconds: s }));

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

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const schedule = [
    { name: 'Sunday Worship', time: '8:30 AM', day: 'Sunday' },
    { name: 'Prayer Meeting', time: '7:00 PM', day: 'Monday' },
    { name: 'Worship Night', time: '7:00 PM', day: 'Friday' },
    { name: 'Next Gen Youth', time: '7:00 PM', day: 'Sunday' }
  ];

  const countdownUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' }
  ];

  const directionsUrl =
    'https://www.google.com/maps/place/The+GOSPEL+FELLOWSHIP+CHURCH/@14.5704036,120.593831,17a,75y,37.02h,95.15t/data=!3m7!1e1!3m5!1sCDu7Ag3FdMxDoJ-Gn1eCHg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.151389058547025%26panoid%3DCDu7Ag3FdMxDoJ-Gn1eCHg%26yaw%3D37.019568306389516!7i16384!8i8192!4m6!3m5!1s0x33963c3c526760cd:0x94fbb15c37673676!8m2!3d14.5704469!4d120.5938904!16s%2Fg%2F11w2_p47g1';

  return (
    <section id="homeSection" className="relative">
      {/* ============ HERO ============ */}
      <div className="relative min-h-[90vh] flex items-center bg-[#0f1a2e]">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=2000&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover animate-kenburns"
          />
        </div>
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1a2e]/95 via-[#0f1a2e]/80 to-[#0f1a2e]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a2e] via-transparent to-[#0f1a2e]/40" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-60 sm:pb-48 text-center">
          <div className="max-w-3xl mx-auto space-y-7">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2.5 animate-fadeUp"
              style={{ animationDelay: '0.1s' }}
            >
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.05] animate-fadeUp"
              style={{ animationDelay: '0.25s' }}
            >
              Your home in faith,
              <br />
              <span className="italic text-indigo-400">hope and love.</span>
            </h1>

            {/* Primary CTAs */}
            <div
              className="flex flex-wrap items-center justify-center gap-2.5 pt-2 animate-fadeUp sm:gap-3.5"
              style={{ animationDelay: '0.55s' }}
            >
              <button
                onClick={() => navigate('/contact')}
                className="group inline-flex items-center gap-2 px-3.5 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm sm:px-7 sm:py-4 sm:gap-2.5 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-black/20"
              >
                Plan a Visit
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:w-4.5 sm:h-4.5" />
              </button>

              <button
                onClick={() => navigate('/events')}
                className="inline-flex items-center gap-2 px-3.5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm sm:px-7 sm:py-4 sm:gap-2.5 border border-white/25 backdrop-blur-sm transition-all duration-300 active:scale-[0.98]"
              >
                <CalendarDays className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                Upcoming Events
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="absolute bottom-5 left-0 right-0 z-10 px-4 sm:px-8 animate-fadeUp"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="relative flex flex-col items-center justify-center gap-3">
            {/* Service + Get Directions */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {/* Service dropdown */}
            <div className="group">
              <button
                type="button"
                onClick={() => setServiceOpen(prev => !prev)}
                className="inline-flex items-center gap-1.5 px-2.5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-[10px] sm:text-base sm:px-7 sm:py-4 sm:gap-2.5 border border-white/25 backdrop-blur-sm transition-all duration-300 active:scale-[0.98]"
              >
                Service
                <ChevronDown
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${serviceOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full mt-3 w-60 rounded-2xl border border-white/25 bg-[#0f172a]/90 p-1.5 backdrop-blur-xl shadow-2xl shadow-black/40 transition-all duration-200 ${
                  serviceOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto'
                }`}
              >
                <div className="px-3 pb-1 pt-2 text-left text-[9px] font-bold uppercase tracking-[0.25em] text-white/50">
                  Service Times
                </div>
                {schedule.map(item => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => navigate('/events')}
                    className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-left hover:bg-white/10 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-indigo-500/30 text-indigo-300 flex items-center justify-center text-[9px] font-bold uppercase">
                        {item.day.slice(0, 3)}
                      </span>
                      <span className="text-xs font-semibold text-white">{item.name}</span>
                    </span>
                    <span className="text-xs font-bold text-indigo-300">{item.time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Get Directions */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-2.5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] sm:text-base sm:px-7 sm:py-4 sm:gap-2.5 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-black/20"
            >
              Get Directions
              <ArrowRight className="w-3 h-3 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            </div>

            {/* Next Service countdown */}
            <div className="flex max-w-full items-center justify-center gap-x-2 px-2.5 py-2 sm:gap-x-4 sm:px-5 sm:py-3 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/25 px-3 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                Sunday · 8:30 AM
              </span>
              <span className="hidden sm:block h-4 w-px bg-white/20" />
              <span className="flex items-center justify-center gap-2 sm:gap-3 text-white tabular-nums">
                {countdownUnits.map(unit => (
                  <span key={unit.label} className="flex flex-col items-center leading-none gap-0.5 sm:flex-row sm:items-baseline sm:gap-1">
                    <span className="font-serif text-sm sm:text-xl font-semibold">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-[7px] uppercase tracking-widest text-white/50 sm:text-[10px]">
                      {unit.label}
                    </span>
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};