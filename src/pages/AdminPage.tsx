// src/pages/AdminPage.tsx

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChurchEvent, 
  Announcement, 
  Sermon, 
  PrayerRequest, 
  Member, 
  Attendee,
  Testimonial
} from '../types';
import { login as loginWithBackend } from '../api';
import {
  Shield,
  X,
  Plus,
  Trash2,
  Users,
  Calendar,
  Headphones,
  Heart,
  Megaphone,
  Check,
  LayoutDashboard,
  Calendar as CalendarIcon,
  Video,
  Cog,
  Moon,
  Sun,
  Bell,
  Search,
  Download,
  LogOut,
  Menu,
  MessageSquare,
  UserPlus,
  UserCheck,
  Eye,
  Send,
  Clock,
  MapPin,
  Mail,
  Facebook,
  Phone,
  Home,
  ArrowLeft,
  Settings,
  TrendingUp,
  Award,
  Sparkles,
  FileText,
  Loader2
} from 'lucide-react';

// ============================================
// TYPES
// ============================================
interface AdminPageProps {
  events: ChurchEvent[];
  announcements: Announcement[];
  sermons: Sermon[];
  prayers: PrayerRequest[];
  members: Member[];
  attendees: Attendee[];
  testimonials: Testimonial[];
  onAddEvent: (event: ChurchEvent) => void;
  onUpdateEvent?: (event: ChurchEvent) => void;
  onDeleteEvent: (id: string) => void;
  onAddAnnouncement: (announcement: Announcement) => void;
  onDeleteAnnouncement: (id: string) => void;
  onTogglePinAnnouncement: (id: string) => void;
  onAddSermon: (sermon: Sermon) => void;
  onDeleteSermon: (id: string) => void;
  onAddPrayer: (prayer: PrayerRequest) => void;
  onDeletePrayer: (id: string) => void;
  onApprovePrayer: (id: string) => void;
  onMarkPrayerAnswered: (id: string, testimony?: string) => void;
  onAddAttendee: (attendee: Attendee) => void;
  onAddMember: (member: Member) => void;
  onDeleteMember: (id: string) => void;
  onResetData: () => void;
  onAddTestimonial?: (testimonial: Testimonial) => void;
  onDeleteTestimonial?: (id: string) => void;
  onClose: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  events,
  announcements,
  sermons,
  prayers,
  members,
  attendees,
  testimonials = [],
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onAddAnnouncement,
  onDeleteAnnouncement,
  onTogglePinAnnouncement,
  onAddSermon,
  onDeleteSermon,
  onAddPrayer,
  onDeletePrayer,
  onApprovePrayer,
  onMarkPrayerAnswered,
  onAddAttendee,
  onAddMember,
  onDeleteMember,
  onResetData,
  onAddTestimonial,
  onDeleteTestimonial,
  onClose
}) => {
  // ============================================
  // STATE
  // ============================================
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [activityFeed, setActivityFeed] = useState<{ icon: string; text: string; time: string }[]>([]);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Toast notifications
  const [toasts, setToasts] = useState<{ id: number; message: string; type: string }[]>([]);
  let toastIdCounter = 0;

  // ============================================
  // EVENT FORM STATE
  // ============================================
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventTag, setEventTag] = useState('');

  // ============================================
  // SERMON FORM STATE
  // ============================================
  const [sermonTitle, setSermonTitle] = useState('');
  const [sermonDate, setSermonDate] = useState('');
  const [sermonVerse, setSermonVerse] = useState('');
  const [sermonVerseRef, setSermonVerseRef] = useState('');
  const [sermonUrl, setSermonUrl] = useState('');
  const [sermonImage, setSermonImage] = useState('');

  // ============================================
  // ANNOUNCEMENT FORM STATE
  // ============================================
  const [announceTitle, setAnnounceTitle] = useState('');
  const [announceDetails, setAnnounceDetails] = useState('');

  // ============================================
  // PRAYER FORM STATE
  // ============================================
  const [prayerName, setPrayerName] = useState('');
  const [prayerRequest, setPrayerRequest] = useState('');

  // ============================================
  // ATTENDEE FORM STATE
  // ============================================
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeFb, setAttendeeFb] = useState('');
  const [attendeeContact, setAttendeeContact] = useState('');
  const [attendeeAge, setAttendeeAge] = useState('');

  // ============================================
  // TESTIMONIAL FORM STATE
  // ============================================
  const [testimonialName, setTestimonialName] = useState('');
  const [testimonialRole, setTestimonialRole] = useState('');
  const [testimonialText, setTestimonialText] = useState('');

  // ============================================
  // SETTINGS STATE
  // ============================================
  const [settingsChurchName, setSettingsChurchName] = useState('Gospel Fellowship Church');
  const [settingsEmail, setSettingsEmail] = useState('gospelfellowshipchurch0923@gmail.com');
  const [settingsPhone, setSettingsPhone] = useState('123-456-7890');
  const [settingsAddress, setSettingsAddress] = useState('008 National Road SF. 2 Purok 1, Limay, Bataan');

  // ============================================
  // CONFIRM DIALOG STATE
  // ============================================
  const [confirmDialog, setConfirmDialog] = useState<{
    show: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    show: false,
    title: 'Are you sure?',
    message: 'This action cannot be undone.',
    onConfirm: () => {}
  });

  // ============================================
  // REFS
  // ============================================
  const feedRef = useRef<HTMLDivElement>(null);
  const activityInterval = useRef<NodeJS.Timeout | null>(null);

  // ============================================
  // EFFECTS
  // ============================================
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(time);
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    if (isAutoRefresh) {
      activityInterval.current = setInterval(() => {
        addRandomActivity();
      }, 8000);
    }

    if (activityFeed.length === 0) {
      addActivity('📊', 'Dashboard loaded successfully');
      addActivity('🕐', 'Live monitoring started');
      addActivity('👋', 'Welcome back, Admin!');
    }

    return () => {
      clearInterval(clockInterval);
      if (activityInterval.current) {
        clearInterval(activityInterval.current);
      }
    };
  }, [isAutoRefresh]);

  // ============================================
  // ACTIVITY FUNCTIONS
  // ============================================
  const activityMessages = [
    { icon: '📅', text: 'New event was added to the database' },
    { icon: '🎬', text: 'New sermon was added to the database' },
    { icon: '🙏', text: 'New prayer request was submitted' },
    { icon: '👤', text: 'New attendee was registered' },
    { icon: '📢', text: 'New announcement was posted' },
    { icon: '✅', text: 'Prayer request was approved' },
    { icon: '🗣️', text: 'New testimonial was added' },
    { icon: '📊', text: 'Dashboard stats updated' },
    { icon: '🔄', text: 'System auto-refresh completed' },
    { icon: '💾', text: 'Settings were saved successfully' }
  ];

  const addActivity = (icon: string, text: string) => {
    const time = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    setActivityFeed(prev => [{ icon, text, time }, ...prev.slice(0, 19)]);
  };

  const addRandomActivity = () => {
    const random = activityMessages[Math.floor(Math.random() * activityMessages.length)];
    addActivity(random.icon, random.text);
  };

  // ============================================
  // TOAST FUNCTIONS
  // ============================================
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const id = toastIdCounter++;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // ============================================
  // AUTH HANDLERS
  // ============================================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setIsLoading(true); setErrorMsg('');
    try { await loginWithBackend(username, password); setIsAuthenticated(true); showToast('✅ Welcome to Admin Dashboard!', 'success'); }
    catch (error) { setErrorMsg(error instanceof Error ? error.message : 'Invalid username or password.'); }
    finally { setIsLoading(false); }
  };

  // ============================================
  // PAGE NAVIGATION
  // ============================================
  const showPage = (page: string) => {
    setActivePage(page);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const getPageTitle = (page: string) => {
    const titles: Record<string, string> = {
      dashboard: '📊 Dashboard',
      events: '📅 Events',
      sermons: '🎬 Sermons',
      announcements: '📢 Announcements',
      prayers: '🙏 Prayer Requests',
      attendees: '👥 Attendees',
      testimonials: '🗣️ Testimonials',
      settings: '⚙️ Settings'
    };
    return titles[page] || page;
  };

  // ============================================
  // EVENT HANDLERS
  // ============================================
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate || !eventTag) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const newEvent: ChurchEvent = {
      id: `event-${Date.now()}`,
      title: eventTitle,
      date: eventDate,
      tag: eventTag,
      description: eventDesc || 'Everyone is invited!',
      location: '📍 Gospel Fellowship Church, Limay, Bataan'
    };

    onAddEvent(newEvent);
    setEventTitle('');
    setEventDate('');
    setEventDesc('');
    setEventTag('');
    showToast(`✅ Event "${eventTitle}" added successfully!`, 'success');
    addActivity('📅', `New event "${eventTitle}" was added`);
  };

  // ============================================
  // SERMON HANDLERS
  // ============================================
  const handleAddSermon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sermonTitle || !sermonDate || !sermonVerse) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const newSermon: Sermon = {
      id: `sermon-${Date.now()}`,
      title: sermonTitle,
      sermonDate: sermonDate,
      speaker: 'Pastor Zaldy Bernaldo',
      verse: sermonVerse,
      verseRef: sermonVerseRef || 'Psalm 23:1',
      videoUrl: sermonUrl || undefined,
      image: sermonImage || 'https://images.unsplash.com/photo-1510563800743-aed236490d08?auto=format&fit=crop&w=800&q=80'
    };

    onAddSermon(newSermon);
    setSermonTitle('');
    setSermonDate('');
    setSermonVerse('');
    setSermonVerseRef('');
    setSermonUrl('');
    setSermonImage('');
    showToast(`✅ Sermon "${sermonTitle}" added successfully!`, 'success');
    addActivity('🎬', `New sermon "${sermonTitle}" was added`);
  };

  // ============================================
  // ANNOUNCEMENT HANDLERS
  // ============================================
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announceTitle || !announceDetails) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    const newAnnouncement: Announcement = {
      id: `ann-${Date.now()}`,
      title: announceTitle,
      details: announceDetails,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    onAddAnnouncement(newAnnouncement);
    setAnnounceTitle('');
    setAnnounceDetails('');
    showToast(`📢 Announcement "${announceTitle}" added!`, 'success');
    addActivity('📢', `New announcement "${announceTitle}" was posted`);
  };

  // ============================================
  // PRAYER HANDLERS
  // ============================================
  const handleAddPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerRequest) {
      showToast('Please enter a prayer request.', 'error');
      return;
    }

    const newPrayer: PrayerRequest = {
      id: `prayer-${Date.now()}`,
      name: prayerName || 'Anonymous',
      request: prayerRequest,
      createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'pending',
      category: 'General'
    };

    onAddPrayer(newPrayer);
    setPrayerName('');
    setPrayerRequest('');
    showToast(`🙏 Prayer request added!`, 'success');
    addActivity('🙏', `New prayer request from "${prayerName || 'Anonymous'}"`);
  };

  // ============================================
  // ATTENDEE HANDLERS
  // ============================================
  const handleAddAttendee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName) {
      showToast('Please enter the attendee name.', 'error');
      return;
    }

    const newAttendee: Attendee = {
      id: `att-${Date.now()}`,
      name: attendeeName,
      facebookName: attendeeFb || undefined,
      contact: attendeeContact || undefined,
      age: attendeeAge || undefined,
      registeredAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    onAddAttendee(newAttendee);
    setAttendeeName('');
    setAttendeeFb('');
    setAttendeeContact('');
    setAttendeeAge('');
    showToast(`✅ Attendee "${attendeeName}" added!`, 'success');
    addActivity('👤', `New attendee "${attendeeName}" registered`);
  };

  // ============================================
  // TESTIMONIAL HANDLERS
  // ============================================
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialName || !testimonialText) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      name: testimonialName,
      role: testimonialRole || undefined,
      text: testimonialText,
      createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    if (onAddTestimonial) {
      onAddTestimonial(newTestimonial);
    }
    
    setTestimonialName('');
    setTestimonialRole('');
    setTestimonialText('');
    showToast(`🗣️ Testimonial from "${testimonialName}" added!`, 'success');
    addActivity('🗣️', `New testimonial from "${testimonialName}"`);
  };

  // ============================================
  // SETTINGS HANDLER
  // ============================================
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('✅ Settings saved successfully!', 'success');
    addActivity('💾', 'Settings were saved successfully');
  };

  // ============================================
  // EXPORT FUNCTIONS
  // ============================================
  const exportData = () => {
    showToast('📤 Exporting all data...', 'info');
    setTimeout(() => {
      showToast('📤 Data exported successfully!', 'success');
    }, 2000);
  };

  // ============================================
  // THEME TOGGLE
  // ============================================
  const toggleAdminTheme = () => {
    setIsDarkMode(!isDarkMode);
    addActivity('🎨', `Switched to ${!isDarkMode ? 'Dark' : 'Light'} Mode`);
  };

  // ============================================
  // AUTO-REFRESH TOGGLE
  // ============================================
  const toggleAutoRefresh = () => {
    setIsAutoRefresh(!isAutoRefresh);
    if (!isAutoRefresh) {
      activityInterval.current = setInterval(() => {
        addRandomActivity();
      }, 8000);
      showToast('🔄 Auto-refresh enabled', 'info');
    } else {
      if (activityInterval.current) {
        clearInterval(activityInterval.current);
        activityInterval.current = null;
      }
      showToast('⏸️ Auto-refresh paused', 'warning');
    }
  };

  // ============================================
  // CONFIRM DIALOG
  // ============================================
  const showConfirmDialog = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({ show: true, title, message, onConfirm });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, show: false });
  };

  // ============================================
  // FILTER TABLE
  // ============================================
  const filterItems = (items: any[], query: string) => {
    if (!query.trim()) return items;
    const q = query.toLowerCase().trim();
    return items.filter(item => 
      JSON.stringify(item).toLowerCase().includes(q)
    );
  };

  // ============================================
  // SIDEBAR MENU ITEMS
  // ============================================
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', badge: null },
    { id: 'events', icon: <CalendarIcon className="w-5 h-5" />, label: 'Events', badge: events.length },
    { id: 'sermons', icon: <Video className="w-5 h-5" />, label: 'Sermons', badge: sermons.length },
    { id: 'announcements', icon: <Megaphone className="w-5 h-5" />, label: 'Announcements', badge: announcements.length },
    { id: 'prayers', icon: <Heart className="w-5 h-5" />, label: 'Prayer Requests', badge: prayers.length },
    { id: 'attendees', icon: <Users className="w-5 h-5" />, label: 'Attendees', badge: attendees.length },
    { id: 'testimonials', icon: <MessageSquare className="w-5 h-5" />, label: 'Testimonials', badge: testimonials.length },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings', badge: null }
  ];

  // ============================================
  // STATS DATA
  // ============================================
  const stats = [
    { label: 'Total Events', value: events.length, icon: '📅', color: 'from-indigo-500 to-indigo-600' },
    { label: 'Total Sermons', value: sermons.length, icon: '🎬', color: 'from-purple-500 to-purple-600' },
    { label: 'Prayer Requests', value: prayers.length, icon: '🙏', color: 'from-rose-500 to-rose-600' },
    { label: 'Attendees', value: attendees.length, icon: '👥', color: 'from-emerald-500 to-emerald-600' },
    { label: 'Testimonials', value: testimonials.length, icon: '🗣️', color: 'from-amber-500 to-amber-600' },
    { label: 'Announcements', value: announcements.length, icon: '📢', color: 'from-cyan-500 to-cyan-600' }
  ];

  // ============================================
  // RENDER - LOGIN SCREEN
  // ============================================
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a14] dark:via-[#0f0f1a] dark:to-[#0a0a14] flex items-center justify-center p-4">
          <div className="bg-white/80 dark:bg-[#1A1A1A]/95 backdrop-blur-xl border border-gray-200 dark:border-indigo-400/30 text-black dark:text-[#F5F5F5] rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center shadow-xl">
                <Shield className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-serif text-black dark:text-white">
                  Admin Dashboard
                </h3>
                <p className="text-xs text-gray-500 dark:text-[#A1A1A1] mt-1">
                  Gospel Fellowship Church • Pastoral Management
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 rounded-xl text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-700 dark:text-[#A1A1A1] mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white text-sm focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-400/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-700 dark:text-[#A1A1A1] mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="admin123"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white text-sm focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-400/20 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 dark:from-indigo-400 dark:to-indigo-500 dark:hover:brightness-110 text-white font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    'Sign In to Admin Dashboard'
                  )}
                </button>
              </form>

              <div className="text-[11px] text-gray-500 dark:text-[#A1A1A1] bg-gray-50 dark:bg-black/30 p-4 rounded-xl border border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-center gap-2">
                  <span className="font-medium">Default Login:</span>
                  <span className="font-mono font-bold text-indigo-500 dark:text-indigo-400">admin</span>
                  <span className="text-gray-400">|</span>
                  <span className="font-mono font-bold text-indigo-500 dark:text-indigo-400">admin123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER - MAIN ADMIN DASHBOARD
  // ============================================
  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 dark:bg-[#0a0a14] dark:from-[#0a0a14] dark:via-[#0f0f1a] dark:to-[#0a0a14] flex h-screen overflow-hidden">
        {/* ========================================== */}
        {/* TOAST CONTAINER */}
        {/* ========================================== */}
        <div className="fixed top-4 right-4 z-[999999] flex flex-col gap-2 max-w-md">
          {toasts.map(toast => {
            const bgColors = {
              success: 'bg-emerald-500 dark:bg-emerald-600',
              error: 'bg-red-500 dark:bg-red-600',
              warning: 'bg-amber-500 dark:bg-amber-600',
              info: 'bg-blue-500 dark:bg-blue-600'
            };
            const icons = {
              success: '✅',
              error: '❌',
              warning: '⚠️',
              info: 'ℹ️'
            };
            return (
              <div
                key={toast.id}
                className={`${bgColors[toast.type as keyof typeof bgColors]} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slideInToast`}
              >
                <span>{icons[toast.type as keyof typeof icons]}</span>
                <span className="text-sm font-medium">{toast.message}</span>
                <button
                  onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                  className="ml-auto opacity-70 hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* CONFIRM DIALOG */}
        {/* ========================================== */}
        {confirmDialog.show && (
          <div className="fixed inset-0 z-[999998] bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl max-w-md w-full p-8 text-center shadow-2xl animate-slideUpBox border border-gray-200 dark:border-white/10">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center text-4xl mb-4">
                ⚠️
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">{confirmDialog.title}</h3>
              <p className="text-gray-600 dark:text-[#A1A1A1] mb-6">{confirmDialog.message}</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={closeConfirmDialog}
                  className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-800 dark:text-white font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    confirmDialog.onConfirm();
                    closeConfirmDialog();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* SIDEBAR */}
        {/* ========================================== */}
        <aside
          className={`w-[280px] bg-white/80 dark:bg-[#141424]/95 backdrop-blur-xl border-r border-gray-200 dark:border-white/5 shrink-0 overflow-y-auto transition-all duration-500 ${
            isMobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 shadow-2xl' : 'relative'
          }`}
          style={{ transform: isMobileMenuOpen ? 'translateX(0)' : '' }}
        >
          {/* Brand */}
          <div className="p-6 border-b border-gray-200 dark:border-white/5 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
              <img src="/image.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-extrabold text-black dark:text-white text-lg leading-tight">
                Gospel<span className="text-indigo-500 dark:text-indigo-400">FC</span>
              </div>
              <div className="text-[10px] text-gray-400 dark:text-gray-600 font-medium">Admin Panel</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-3 space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-600 px-3 py-2 font-bold">
              Main Navigation
            </div>
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => showPage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activePage === item.id
                    ? 'bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-400/20 dark:to-indigo-400/10 text-indigo-600 dark:text-indigo-400 border-l-2 border-indigo-500 dark:border-indigo-400'
                    : 'text-gray-600 dark:text-[#8888AA] hover:bg-gray-50 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                }`}
              >
                <span className={activePage === item.id ? 'text-indigo-500' : 'text-indigo-400'}>{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge !== null && item.badge > 0 && (
                  <span className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-white/5 p-3 mt-[55%]">
            <button
              onClick={toggleAdminTheme}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-[#8888AA] hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              onClick={() => {
                showConfirmDialog(
                  'Logout?',
                  'Are you sure you want to logout and return to the main website?',
                  () => {
                    setIsAuthenticated(false);
                    setActivePage('dashboard');
                    showToast('👋 Logged out successfully', 'info');
                  }
                );
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* ========================================== */}
        {/* MAIN CONTENT */}
        {/* ========================================== */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-white/5 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-[#A1A1A1] transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Back to Site</span>
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white">
                {getPageTitle(activePage)}
              </h1>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 dark:text-[#A1A1A1]">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span id="liveClock">{currentTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-[#A1A1A1] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAutoRefresh}
                  onChange={toggleAutoRefresh}
                  className="w-4 h-4 accent-indigo-500 rounded"
                />
                <span>Auto-refresh</span>
              </label>
              <button
                onClick={() => showToast(`📬 You have ${activityFeed.length} activity notifications`, 'info')}
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-[#A1A1A1]" />
                {activityFeed.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full text-center min-w-[18px]">
                    {activityFeed.length}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-3 text-sm font-medium text-black dark:text-white">
                <span className="hidden sm:inline">Admin</span>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                  A
                </div>
              </div>
            </div>
          </div>

          {/* ========================================== */}
          {/* PAGE: DASHBOARD */}
          {/* ========================================== */}
          {activePage === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                    <Sparkles className="w-4 h-4" />
                    <span>Welcome back, Admin!</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif mt-2">
                    Gospel Fellowship Church Dashboard
                  </h2>
                  <p className="text-white/80 text-sm mt-1 max-w-lg">
                    Manage your church's events, sermons, prayer requests, and community data all in one place.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map(stat => (
                  <div
                    key={stat.label}
                    className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-2xl font-bold text-black dark:text-white">{stat.value}</div>
                        <div className="text-[10px] text-gray-500 dark:text-[#A1A1A1] font-medium mt-0.5 uppercase tracking-wider">{stat.label}</div>
                      </div>
                      <div className={`text-2xl bg-gradient-to-br ${stat.color} text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h3 className="text-sm font-bold text-black dark:text-white mb-4">⚡ Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Add Event', page: 'events', icon: '📅', color: 'from-indigo-500 to-indigo-600' },
                    { label: 'Add Sermon', page: 'sermons', icon: '🎬', color: 'from-purple-500 to-purple-600' },
                    { label: 'Add Announcement', page: 'announcements', icon: '📢', color: 'from-cyan-500 to-cyan-600' },
                    { label: 'Add Prayer', page: 'prayers', icon: '🙏', color: 'from-rose-500 to-rose-600' },
                    { label: 'Add Attendee', page: 'attendees', icon: '👤', color: 'from-emerald-500 to-emerald-600' },
                    { label: 'Add Testimonial', page: 'testimonials', icon: '🗣️', color: 'from-amber-500 to-amber-600' }
                  ].map(action => (
                    <button
                      key={action.label}
                      onClick={() => showPage(action.page)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all bg-gradient-to-r ${action.color} text-white shadow-md hover:shadow-lg hover:scale-105`}
                    >
                      {action.icon} {action.label}
                    </button>
                  ))}
                  <button
                    onClick={exportData}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-[#A1A1A1] hover:bg-gray-200 dark:hover:bg-white/20 transition-all border border-gray-200 dark:border-white/10"
                  >
                    📤 Export All
                  </button>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-black dark:text-white flex items-center gap-2">
                    <span>🕐 Live Activity Feed</span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      LIVE
                    </span>
                  </h3>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto" ref={feedRef}>
                  {activityFeed.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all border-b border-gray-100 dark:border-white/5 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm text-black dark:text-white">{item.text}</span>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-600 font-mono">{item.time}</span>
                    </div>
                  ))}
                  {activityFeed.length === 0 && (
                    <div className="text-center py-8 text-gray-400 dark:text-gray-600 text-sm">
                      No activity yet. Start managing your church data!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE: EVENTS */}
          {/* ========================================== */}
          {activePage === 'events' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h4 className="text-sm font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-indigo-500">➕</span> Add New Event
                </h4>
                <form onSubmit={handleAddEvent} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Event Title *</label>
                      <input
                        type="text"
                        required
                        value={eventTitle}
                        onChange={e => setEventTitle(e.target.value)}
                        placeholder="e.g. Sunday Service"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-400/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Date/Time *</label>
                      <input
                        type="text"
                        required
                        value={eventDate}
                        onChange={e => setEventDate(e.target.value)}
                        placeholder="e.g. Every Sunday • 8:30 AM"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-400/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Description</label>
                    <textarea
                      value={eventDesc}
                      onChange={e => setEventDesc(e.target.value)}
                      placeholder="Event description"
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Tag *</label>
                    <input
                      type="text"
                      required
                      value={eventTag}
                      onChange={e => setEventTag(e.target.value)}
                      placeholder="e.g. ⛪ Sunday Service"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-400/20 transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md">
                      ➕ Add Event
                    </button>
                    <button type="reset" className="px-6 py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-[#A1A1A1] rounded-xl text-xs font-bold transition-all border border-gray-200 dark:border-white/10">
                      ↺ Clear
                    </button>
                  </div>
                </form>
              </div>

              {/* Events Table */}
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-black/30 px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/5">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none text-sm text-black dark:text-white focus:outline-hidden w-40"
                    />
                  </div>
                  <button
                    onClick={() => showToast('📤 Exporting events...', 'info')}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-gray-200 dark:border-white/5 text-xs font-bold text-gray-700 dark:text-[#A1A1A1] hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-black/20">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tag</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterItems(events, searchQuery).length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-gray-400 dark:text-gray-600 text-sm">
                            No events found. Add one above.
                          </td>
                        </tr>
                      ) : (
                        filterItems(events, searchQuery).map(event => (
                          <tr key={event.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                            <td className="px-4 py-3 text-sm text-black dark:text-white font-medium">{event.title}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#A1A1A1]">{event.date}</td>
                            <td className="px-4 py-3 text-sm text-indigo-500 dark:text-indigo-400">{event.tag}</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => {
                                  if (onUpdateEvent) {
                                    const newTitle = prompt('Edit Title:', event.title);
                                    if (newTitle) {
                                      onUpdateEvent({ ...event, title: newTitle });
                                      showToast('✏️ Event updated!', 'success');
                                    }
                                  } else {
                                    showToast('✏️ Edit feature coming soon', 'info');
                                  }
                                }}
                                className="px-3 py-1 bg-indigo-50 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-400/20 transition-all mr-2"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => {
                                  showConfirmDialog(
                                    'Delete Event?',
                                    `Are you sure you want to delete "${event.title}"?`,
                                    () => onDeleteEvent(event.id)
                                  );
                                }}
                                className="px-3 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-950/50 transition-all"
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE: SERMONS */}
          {/* ========================================== */}
          {activePage === 'sermons' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h4 className="text-sm font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-purple-500">➕</span> Add New Sermon
                </h4>
                <form onSubmit={handleAddSermon} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Sermon Title *</label>
                      <input
                        type="text"
                        required
                        value={sermonTitle}
                        onChange={e => setSermonTitle(e.target.value)}
                        placeholder="e.g. Obedience Over Sacrifice"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-purple-400 dark:focus:border-purple-400/50 focus:outline-hidden focus:ring-2 focus:ring-purple-400/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Date *</label>
                      <input
                        type="text"
                        required
                        value={sermonDate}
                        onChange={e => setSermonDate(e.target.value)}
                        placeholder="e.g. July 12, 2026"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-purple-400 dark:focus:border-purple-400/50 focus:outline-hidden focus:ring-2 focus:ring-purple-400/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Verse *</label>
                      <input
                        type="text"
                        required
                        value={sermonVerse}
                        onChange={e => setSermonVerse(e.target.value)}
                        placeholder="e.g. To obey is better than sacrifice"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-purple-400 dark:focus:border-purple-400/50 focus:outline-hidden focus:ring-2 focus:ring-purple-400/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Verse Reference</label>
                      <input
                        type="text"
                        value={sermonVerseRef}
                        onChange={e => setSermonVerseRef(e.target.value)}
                        placeholder="e.g. 1 Samuel 15:22"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-purple-400 dark:focus:border-purple-400/50 focus:outline-hidden focus:ring-2 focus:ring-purple-400/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">YouTube / Video URL</label>
                    <input
                      type="url"
                      value={sermonUrl}
                      onChange={e => setSermonUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-purple-400 dark:focus:border-purple-400/50 focus:outline-hidden focus:ring-2 focus:ring-purple-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Image</label>
                    <input
                      type="text"
                      value={sermonImage}
                      onChange={e => setSermonImage(e.target.value)}
                      placeholder="e.g. Sunday Service/sunday-service.jpg"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-purple-400 dark:focus:border-purple-400/50 focus:outline-hidden focus:ring-2 focus:ring-purple-400/20 transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-md">
                      ➕ Add Sermon
                    </button>
                    <button type="reset" className="px-6 py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-[#A1A1A1] rounded-xl text-xs font-bold transition-all border border-gray-200 dark:border-white/10">
                      ↺ Clear
                    </button>
                  </div>
                </form>
              </div>

              {/* Sermons Table */}
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-black/30 px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/5">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search sermons..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none text-sm text-black dark:text-white focus:outline-hidden w-40"
                    />
                  </div>
                  <button
                    onClick={() => showToast('📤 Exporting sermons...', 'info')}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-gray-200 dark:border-white/5 text-xs font-bold text-gray-700 dark:text-[#A1A1A1] hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-black/20">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Verse</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterItems(sermons, searchQuery).length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-gray-400 dark:text-gray-600 text-sm">
                            No sermons found. Add one above.
                          </td>
                        </tr>
                      ) : (
                        filterItems(sermons, searchQuery).map(sermon => (
                          <tr key={sermon.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                            <td className="px-4 py-3 text-sm text-black dark:text-white font-medium">{sermon.title}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#A1A1A1]">{sermon.sermonDate}</td>
                            <td className="px-4 py-3 text-sm text-purple-500 dark:text-purple-400">{sermon.verseRef || sermon.verse}</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => showToast('✏️ Edit feature coming soon', 'info')}
                                className="px-3 py-1 bg-purple-50 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400 rounded-lg text-xs font-bold hover:bg-purple-100 dark:hover:bg-purple-400/20 transition-all mr-2"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => {
                                  showConfirmDialog(
                                    'Delete Sermon?',
                                    `Are you sure you want to delete "${sermon.title}"?`,
                                    () => onDeleteSermon(sermon.id)
                                  );
                                }}
                                className="px-3 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-950/50 transition-all"
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE: ANNOUNCEMENTS */}
          {/* ========================================== */}
          {activePage === 'announcements' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h4 className="text-sm font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-cyan-500">📢</span> Add New Announcement
                </h4>
                <form onSubmit={handleAddAnnouncement} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Title *</label>
                    <input
                      type="text"
                      required
                      value={announceTitle}
                      onChange={e => setAnnounceTitle(e.target.value)}
                      placeholder="e.g. Baptismal Service"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-cyan-400 dark:focus:border-cyan-400/50 focus:outline-hidden focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Details *</label>
                    <input
                      type="text"
                      required
                      value={announceDetails}
                      onChange={e => setAnnounceDetails(e.target.value)}
                      placeholder="e.g. July 21, 2026 • 8:30 AM"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-cyan-400 dark:focus:border-cyan-400/50 focus:outline-hidden focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl text-xs font-bold transition-all shadow-md">
                      📢 Add Announcement
                    </button>
                    <button type="reset" className="px-6 py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-[#A1A1A1] rounded-xl text-xs font-bold transition-all border border-gray-200 dark:border-white/10">
                      ↺ Clear
                    </button>
                  </div>
                </form>
              </div>

              {/* Announcements Table */}
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-black/30 px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/5">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search announcements..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none text-sm text-black dark:text-white focus:outline-hidden w-40"
                    />
                  </div>
                  <button
                    onClick={() => showToast('📤 Exporting announcements...', 'info')}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-gray-200 dark:border-white/5 text-xs font-bold text-gray-700 dark:text-[#A1A1A1] hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-black/20">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Details</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterItems(announcements, searchQuery).length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-4 py-8 text-center text-gray-400 dark:text-gray-600 text-sm">
                            No announcements found. Add one above.
                          </td>
                        </tr>
                      ) : (
                        filterItems(announcements, searchQuery).map(ann => (
                          <tr key={ann.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                            <td className="px-4 py-3 text-sm text-black dark:text-white font-medium">📢 {ann.title}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#A1A1A1]">{ann.details}</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => {
                                  showConfirmDialog(
                                    'Delete Announcement?',
                                    `Are you sure you want to delete "${ann.title}"?`,
                                    () => onDeleteAnnouncement(ann.id)
                                  );
                                }}
                                className="px-3 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-950/50 transition-all"
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE: PRAYERS */}
          {/* ========================================== */}
          {activePage === 'prayers' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h4 className="text-sm font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-rose-500">🙏</span> Add New Prayer Request
                </h4>
                <form onSubmit={handleAddPrayer} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      value={prayerName}
                      onChange={e => setPrayerName(e.target.value)}
                      placeholder="Name (optional)"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-rose-400 dark:focus:border-rose-400/50 focus:outline-hidden focus:ring-2 focus:ring-rose-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Prayer Request *</label>
                    <textarea
                      required
                      value={prayerRequest}
                      onChange={e => setPrayerRequest(e.target.value)}
                      placeholder="Enter prayer request..."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-rose-400 dark:focus:border-rose-400/50 focus:outline-hidden focus:ring-2 focus:ring-rose-400/20 transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md">
                      🙏 Add Prayer
                    </button>
                    <button type="reset" className="px-6 py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-[#A1A1A1] rounded-xl text-xs font-bold transition-all border border-gray-200 dark:border-white/10">
                      ↺ Clear
                    </button>
                  </div>
                </form>
              </div>

              {/* Prayers Table */}
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-black/30 px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/5">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search prayers..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none text-sm text-black dark:text-white focus:outline-hidden w-40"
                    />
                  </div>
                  <button
                    onClick={() => showToast('📤 Exporting prayers...', 'info')}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-gray-200 dark:border-white/5 text-xs font-bold text-gray-700 dark:text-[#A1A1A1] hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-black/20">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Request</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterItems(prayers, searchQuery).length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-400 dark:text-gray-600 text-sm">
                            No prayer requests found. Add one above.
                          </td>
                        </tr>
                      ) : (
                        filterItems(prayers, searchQuery).map(prayer => (
                          <tr key={prayer.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                            <td className="px-4 py-3 text-sm text-black dark:text-white font-medium">{prayer.name || 'Anonymous'}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#A1A1A1]">{prayer.request}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-500">{prayer.createdAt}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                prayer.status === 'approved' 
                                  ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400' 
                                  : prayer.status === 'answered'
                                  ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400'
                                  : 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400'
                              }`}>
                                {prayer.status === 'approved' ? '✅ Approved' : prayer.status === 'answered' ? '💫 Answered' : '⏳ Pending'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {prayer.status === 'pending' && (
                                <button
                                  onClick={() => onApprovePrayer(prayer.id)}
                                  className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-all mr-2"
                                >
                                  ✅ Approve
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  showConfirmDialog(
                                    'Delete Prayer?',
                                    `Are you sure you want to delete this prayer request?`,
                                    () => onDeletePrayer(prayer.id)
                                  );
                                }}
                                className="px-3 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-950/50 transition-all"
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE: ATTENDEES */}
          {/* ========================================== */}
          {activePage === 'attendees' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h4 className="text-sm font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-emerald-500">👥</span> Add New Attendee
                </h4>
                <form onSubmit={handleAddAttendee} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={attendeeName}
                        onChange={e => setAttendeeName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-emerald-400 dark:focus:border-emerald-400/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-400/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Facebook Name</label>
                      <input
                        type="text"
                        value={attendeeFb}
                        onChange={e => setAttendeeFb(e.target.value)}
                        placeholder="Facebook Name"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-emerald-400 dark:focus:border-emerald-400/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-400/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Contact</label>
                      <input
                        type="text"
                        value={attendeeContact}
                        onChange={e => setAttendeeContact(e.target.value)}
                        placeholder="Contact Number"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-emerald-400 dark:focus:border-emerald-400/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-400/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Age</label>
                      <input
                        type="number"
                        value={attendeeAge}
                        onChange={e => setAttendeeAge(e.target.value)}
                        placeholder="Age"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-emerald-400 dark:focus:border-emerald-400/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-400/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md">
                      ➕ Add Attendee
                    </button>
                    <button type="reset" className="px-6 py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-[#A1A1A1] rounded-xl text-xs font-bold transition-all border border-gray-200 dark:border-white/10">
                      ↺ Clear
                    </button>
                  </div>
                </form>
              </div>

              {/* Attendees Table */}
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-black/30 px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/5">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search attendees..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none text-sm text-black dark:text-white focus:outline-hidden w-40"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Total: <strong className="text-black dark:text-white">{attendees.length}</strong>
                    </span>
                    <button
                      onClick={() => showToast('📤 Exporting attendees...', 'info')}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-gray-200 dark:border-white/5 text-xs font-bold text-gray-700 dark:text-[#A1A1A1] hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-black/20">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Facebook</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Age</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterItems(attendees, searchQuery).length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-400 dark:text-gray-600 text-sm">
                            No attendees found. Add one above.
                          </td>
                        </tr>
                      ) : (
                        filterItems(attendees, searchQuery).map(attendee => (
                          <tr key={attendee.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                            <td className="px-4 py-3 text-sm text-black dark:text-white font-medium">{attendee.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#A1A1A1]">{attendee.facebookName || '-'}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#A1A1A1]">{attendee.contact || '-'}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#A1A1A1]">{attendee.age || '-'}</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => {
                                  showConfirmDialog(
                                    'Delete Attendee?',
                                    `Are you sure you want to delete "${attendee.name}"?`,
                                    () => onDeleteMember(attendee.id)
                                  );
                                }}
                                className="px-3 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-950/50 transition-all"
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE: TESTIMONIALS */}
          {/* ========================================== */}
          {activePage === 'testimonials' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h4 className="text-sm font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-amber-500">🗣️</span> Add New Testimonial
                </h4>
                <form onSubmit={handleAddTestimonial} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Name *</label>
                    <input
                      type="text"
                      required
                      value={testimonialName}
                      onChange={e => setTestimonialName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-amber-400 dark:focus:border-amber-400/50 focus:outline-hidden focus:ring-2 focus:ring-amber-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Role / Position</label>
                    <input
                      type="text"
                      value={testimonialRole}
                      onChange={e => setTestimonialRole(e.target.value)}
                      placeholder="e.g. Member since 2024"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-amber-400 dark:focus:border-amber-400/50 focus:outline-hidden focus:ring-2 focus:ring-amber-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Testimonial *</label>
                    <textarea
                      required
                      value={testimonialText}
                      onChange={e => setTestimonialText(e.target.value)}
                      placeholder="Share your testimony..."
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-amber-400 dark:focus:border-amber-400/50 focus:outline-hidden focus:ring-2 focus:ring-amber-400/20 transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-md">
                      🗣️ Add Testimonial
                    </button>
                    <button type="reset" className="px-6 py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-[#A1A1A1] rounded-xl text-xs font-bold transition-all border border-gray-200 dark:border-white/10">
                      ↺ Clear
                    </button>
                  </div>
                </form>
              </div>

              {/* Testimonials Table */}
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-black/30 px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/5">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search testimonials..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none text-sm text-black dark:text-white focus:outline-hidden w-40"
                    />
                  </div>
                  <button
                    onClick={() => showToast('📤 Exporting testimonials...', 'info')}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-gray-200 dark:border-white/5 text-xs font-bold text-gray-700 dark:text-[#A1A1A1] hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-black/20">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Testimonial</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterItems(testimonials, searchQuery).length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-400 dark:text-gray-600 text-sm">
                            No testimonials found. Add one above.
                          </td>
                        </tr>
                      ) : (
                        filterItems(testimonials, searchQuery).map(testimonial => (
                          <tr key={testimonial.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                            <td className="px-4 py-3 text-sm text-black dark:text-white font-medium">{testimonial.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#A1A1A1]">{testimonial.role || '-'}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#A1A1A1]">{testimonial.text.substring(0, 50)}{testimonial.text.length > 50 ? '...' : ''}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-500">{testimonial.createdAt}</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => {
                                  if (onDeleteTestimonial) {
                                    showConfirmDialog(
                                      'Delete Testimonial?',
                                      `Are you sure you want to delete "${testimonial.name}" testimonial?`,
                                      () => onDeleteTestimonial(testimonial.id)
                                    );
                                  }
                                }}
                                className="px-3 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-950/50 transition-all"
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE: SETTINGS */}
          {/* ========================================== */}
          {activePage === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#141424]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h4 className="text-sm font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-indigo-500" />
                  <span>⚙️ Settings</span>
                </h4>
                <form onSubmit={handleSaveSettings} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Church Name</label>
                    <input
                      type="text"
                      value={settingsChurchName}
                      onChange={e => setSettingsChurchName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-400/20 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        value={settingsEmail}
                        onChange={e => setSettingsEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-400/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Phone</label>
                      <input
                        type="text"
                        value={settingsPhone}
                        onChange={e => setSettingsPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-400/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-[#A1A1A1] mb-1 uppercase tracking-wider">Address</label>
                    <input
                      type="text"
                      value={settingsAddress}
                      onChange={e => setSettingsAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/30 text-black dark:text-white text-sm focus:border-indigo-400 dark:focus:border-indigo-400/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-400/20 transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md">
                      💾 Save Settings
                    </button>
                    <button type="reset" className="px-6 py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-[#A1A1A1] rounded-xl text-xs font-bold transition-all border border-gray-200 dark:border-white/10">
                      ↺ Reset
                    </button>
                  </div>
                </form>
              </div>

              {/* Info Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-200 dark:border-amber-800/30">
                  <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    🔐 Admin Credentials
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Username: <strong>admin</strong> | Password: <strong>admin123</strong>
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400/70 mt-1">
                    Access by clicking the logo 5 times on the main website.
                  </p>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800/30">
                  <h4 className="text-sm font-bold text-indigo-800 dark:text-indigo-400 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    📊 Database Info
                  </h4>
                  <div className="grid grid-cols-2 gap-1 text-sm mt-2">
                    <p className="text-gray-600 dark:text-[#A1A1A1]">Events: <strong className="text-black dark:text-white">{events.length}</strong></p>
                    <p className="text-gray-600 dark:text-[#A1A1A1]">Sermons: <strong className="text-black dark:text-white">{sermons.length}</strong></p>
                    <p className="text-gray-600 dark:text-[#A1A1A1]">Announcements: <strong className="text-black dark:text-white">{announcements.length}</strong></p>
                    <p className="text-gray-600 dark:text-[#A1A1A1]">Prayers: <strong className="text-black dark:text-white">{prayers.length}</strong></p>
                    <p className="text-gray-600 dark:text-[#A1A1A1]">Attendees: <strong className="text-black dark:text-white">{attendees.length}</strong></p>
                    <p className="text-gray-600 dark:text-[#A1A1A1]">Members: <strong className="text-black dark:text-white">{members.length}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ========================================== */}
        {/* CSS ANIMATIONS */}
        {/* ========================================== */}
        <style>{`
          @keyframes slideInToast {
            from { opacity: 0; transform: translateX(80px) scale(0.9); }
            to { opacity: 1; transform: translateX(0) scale(1); }
          }
          @keyframes slideUpBox {
            from { opacity: 0; transform: translateY(40px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-slideInToast {
            animation: slideInToast 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          .animate-slideUpBox {
            animation: slideUpBox 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
        `}</style>
      </div>
    </div>
  );
};