import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BookReader } from './components/BookReader';
import { QuizEngine } from './components/QuizEngine';
import { ExamsHub } from './components/ExamsHub';
import { CSLab } from './components/CSLab';
import { Glossary } from './components/Glossary';
import { BookmarksNotes } from './components/BookmarksNotes';
import { SearchModal } from './components/SearchModal';
import { VisitCounterModal } from './components/VisitCounterModal';
import { VisitorProfileModal } from './components/VisitorProfileModal';
import { AdminVisitorLogModal } from './components/AdminVisitorLogModal';
import { InstallApkModal } from './components/InstallApkModal';
import { AuthorBadge } from './components/AuthorBadge';
import { Be7eryLogo } from './components/Be7eryLogo';
import { StudyNote } from './types';
import { 
  Sparkles, 
  Code2, 
  Heart, 
  Award, 
  ShieldCheck, 
  Activity, 
  Globe2, 
  Smartphone, 
  Database,
  RefreshCw,
  Laptop,
  GraduationCap,
  UserPlus,
  Download
} from 'lucide-react';
import { 
  recordAppVisit, 
  subscribeToGlobalStats, 
  subscribeToDeviceStats, 
  getOrCreateDeviceId,
  DeviceVisitRecord, 
  GlobalVisitStats 
} from './services/visitTracker';

export function App() {
  const [activeView, setActiveView] = useState<'reader' | 'quiz' | 'exams' | 'lab' | 'glossary' | 'bookmarks'>('reader');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAdminLogModalOpen, setIsAdminLogModalOpen] = useState<boolean>(false);
  const [isInstallApkOpen, setIsInstallApkOpen] = useState<boolean>(false);
  const [selectedLessonForQuiz, setSelectedLessonForQuiz] = useState<string | undefined>(undefined);

  // Firestore Visit Counters State
  const [globalStats, setGlobalStats] = useState<GlobalVisitStats | null>(null);
  const [deviceStats, setDeviceStats] = useState<DeviceVisitRecord | null>(null);
  const [isStatsLoading, setIsStatsLoading] = useState<boolean>(false);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);

  // Local Storage for Bookmarks & Notes
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('be7ery_bookmarks');
      return saved ? JSON.parse(saved) : ['u1-l1', 'u2-l1'];
    } catch {
      return ['u1-l1', 'u2-l1'];
    }
  });

  const [notes, setNotes] = useState<StudyNote[]>(() => {
    try {
      const saved = localStorage.getItem('be7ery_notes');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'note-1',
              title: 'قانون حساب حجم الصور الرقمية',
              content: 'الحجم بالبت = العرض × الارتفاع × عمق اللون.\nثم نقسم على 8 للتحويل إلى بايت، ثم نقسم على 1000 أو 1024 للحصول على KB ثم MB.',
              createdAt: new Date().toISOString(),
            },
            {
              id: 'note-2',
              title: 'الفرق بين مكمل الآحاد ومكمل الاثنين',
              content: 'مكمل الآحاد: عكس كل بت (0 تصبح 1 و 1 تصبح 0).\nمكمل الاثنين: إضافة 1 إلى مكمل الآحاد.',
              createdAt: new Date().toISOString(),
            },
          ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('be7ery_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('be7ery_notes', JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  }, [notes]);

  // Keyboard shortcut Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Firebase Firestore Device Visit Tracking & Real-Time Listeners
  useEffect(() => {
    const deviceId = getOrCreateDeviceId();
    setIsStatsLoading(true);

    // Record this session's visit
    recordAppVisit()
      .then(({ deviceStats }) => {
        setDeviceStats(deviceStats);
        setIsDbConnected(true);
      })
      .catch((err) => {
        console.warn('Visit sync error:', err);
      })
      .finally(() => {
        setIsStatsLoading(false);
      });

    // Real-time subscription to global aggregated stats
    const unsubGlobal = subscribeToGlobalStats(
      (stats) => {
        setGlobalStats(stats);
        setIsDbConnected(true);
      },
      (err) => {
        console.warn('Global stats sync issue:', err);
      }
    );

    // Real-time subscription to this device's stats
    const unsubDevice = subscribeToDeviceStats(
      deviceId,
      (stats) => {
        setDeviceStats(stats);
      },
      (err) => {
        console.warn('Device stats sync issue:', err);
      }
    );

    return () => {
      unsubGlobal();
      unsubDevice();
    };
  }, []);

  const handleManualRefreshStats = async () => {
    setIsStatsLoading(true);
    try {
      const res = await recordAppVisit();
      setDeviceStats(res.deviceStats);
      setIsDbConnected(true);
    } catch (err) {
      console.warn('Manual stats refresh error:', err);
    } finally {
      setIsStatsLoading(false);
    }
  };

  const handleToggleBookmark = (id: string, _title: string, _type: 'lesson' | 'question') => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleAddNote = (newNote: Omit<StudyNote, 'id' | 'createdAt'>) => {
    const note: StudyNote = {
      ...newNote,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [note, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleStartLessonQuiz = (lessonId: string) => {
    setSelectedLessonForQuiz(lessonId);
    setActiveView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex flex-col selection:bg-[#1D4ED8] selection:text-white" dir="rtl">
      {/* Navbar */}
      <Navbar
        activeView={activeView}
        onSelectView={(v) => {
          if (v === 'quiz') setSelectedLessonForQuiz(undefined);
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        bookmarksCount={bookmarks.length}
        totalVisits={globalStats?.totalVisits}
        deviceVisitCount={deviceStats?.visitCount}
        registeredStudentName={deviceStats?.fullName}
        onOpenVisitCounter={() => setIsVisitModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenAdminLog={() => setIsAdminLogModalOpen(true)}
        onOpenInstallApk={() => setIsInstallApkOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Author Hero Card on Reader view */}
        {activeView === 'reader' && (
          <AuthorBadge onOpenInstallApk={() => setIsInstallApkOpen(true)} />
        )}

        {/* Dynamic Views */}
        {activeView === 'reader' && (
          <BookReader
            onStartLessonQuiz={handleStartLessonQuiz}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeView === 'quiz' && (
          <QuizEngine
            initialLessonId={selectedLessonForQuiz}
            onToggleBookmark={handleToggleBookmark}
            bookmarks={bookmarks}
          />
        )}

        {activeView === 'exams' && <ExamsHub />}

        {activeView === 'lab' && <CSLab />}

        {activeView === 'glossary' && <Glossary />}

        {activeView === 'bookmarks' && (
          <BookmarksNotes
            bookmarks={bookmarks}
            notes={notes}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            onRemoveBookmark={(id) => setBookmarks((prev) => prev.filter((b) => b !== id))}
            onNavigateToLesson={(lId) => {
              setActiveView('reader');
            }}
          />
        )}
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={(lessonId) => {
          setActiveView('reader');
        }}
        onSelectQuestion={(questionId) => {
          setActiveView('quiz');
        }}
        onSelectExam={(_examId) => {
          setActiveView('exams');
        }}
      />

      {/* Cloud Visit Counter & Device Analytics Modal */}
      <VisitCounterModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        globalStats={globalStats}
        deviceStats={deviceStats}
        isConnected={isDbConnected}
        isLoading={isStatsLoading}
        onRefresh={handleManualRefreshStats}
        onOpenRegisterProfile={() => {
          setIsVisitModalOpen(false);
          setIsProfileModalOpen(true);
        }}
        onOpenAdminLog={() => {
          setIsVisitModalOpen(false);
          setIsAdminLogModalOpen(true);
        }}
      />

      {/* Student / Visitor Profile Registration Modal */}
      <VisitorProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentDeviceRecord={deviceStats}
        onProfileSaved={(updated) => {
          setDeviceStats(updated);
          setIsDbConnected(true);
        }}
      />

      {/* Admin Visitor Log & Student Roster Modal (Password Protected) */}
      <AdminVisitorLogModal
        isOpen={isAdminLogModalOpen}
        onClose={() => setIsAdminLogModalOpen(false)}
        totalVisitsCount={globalStats?.totalVisits}
      />

      {/* APK / Mobile Application Install Modal */}
      <InstallApkModal
        isOpen={isInstallApkOpen}
        onClose={() => setIsInstallApkOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Live Device & Visits Counter Bar */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white border border-blue-100/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-[#1D4ED8] text-white rounded-2xl shadow-sm">
                <Database className="w-5 h-5" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-gray-900">
                    الزيارات
                  </h4>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isDbConnected 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isDbConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    {isDbConnected ? 'محدّث لحظياً' : 'جاري التحديث'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {deviceStats?.fullName 
                    ? `مرحباً بك يا ${deviceStats.fullName} • مدرسة ${deviceStats.schoolName || ''}`
                    : 'إحصائيات دقيقة لعدد الزيارات ومعدل استخدام المنصة'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 w-full md:w-auto">
              {/* Stat 1: Total Visits */}
              <div className="px-3.5 py-2 bg-white rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#1D4ED8]" />
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block font-bold">إجمالي الزيارات</span>
                  <span className="text-xs font-black text-gray-900 font-mono">
                    {(globalStats?.totalVisits || 1).toLocaleString('ar-EG')}
                  </span>
                </div>
              </div>

              {/* Stat 2: Unique Devices */}
              <div className="px-3.5 py-2 bg-white rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-purple-600" />
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block font-bold">الأجهزة الفريدة</span>
                  <span className="text-xs font-black text-gray-900 font-mono">
                    {(globalStats?.uniqueDevices || 1).toLocaleString('ar-EG')}
                  </span>
                </div>
              </div>

              {/* Stat 3: Registered Students */}
              <div className="px-3.5 py-2 bg-white rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block font-bold">الطلاب المسجلين</span>
                  <span className="text-xs font-black text-gray-900 font-mono">
                    {((globalStats?.registeredStudentsCount || (deviceStats?.fullName ? 1 : 0))).toLocaleString('ar-EG')}
                  </span>
                </div>
              </div>

              {/* Stat 4: This device visits */}
              <div className="px-3.5 py-2 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-2xs flex items-center gap-2">
                <Laptop className="w-4 h-4 text-emerald-700" />
                <div className="text-right">
                  <span className="text-[10px] text-emerald-700 block font-bold">زيارات جهازك</span>
                  <span className="text-xs font-black text-emerald-950 font-mono">
                    {(deviceStats?.visitCount || 1).toLocaleString('ar-EG')}
                  </span>
                </div>
              </div>

              {/* Register Profile button */}
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="تسجيل أو تعديل بيانات الطالب والمدرسة"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{deviceStats?.fullName ? 'تعديل بياناتك' : 'تسجيل بيانات الطالب'}</span>
              </button>

              {/* General Visit Counter Details button */}
              <button
                onClick={() => setIsVisitModalOpen(true)}
                className="px-3.5 py-2 bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold rounded-2xl text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="عرض تفاصيل عداد الزيارات وهذا الجهاز"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>عداد الزيارات</span>
              </button>

              {/* Protected Teacher / Admin Visitor Log Button */}
              <button
                onClick={() => setIsAdminLogModalOpen(true)}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer border border-slate-700"
                title="سجل الطلاب والزوار المحمي بكلمة مرور (خاص بالمعلم)"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>لوحة المعلم 🔒</span>
              </button>

              {/* Install APK Android Button */}
              <button
                onClick={() => setIsInstallApkOpen(true)}
                className="px-3.5 py-2 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 hover:from-blue-800 hover:to-indigo-700 text-white font-bold rounded-2xl text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer border border-blue-400/40"
                title="تثبيت التطبيق على هواتف الأندرويد أو توليد ملف APK"
              >
                <Download className="w-3.5 h-3.5 text-blue-200" />
                <span>تطبيق APK</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Teacher Photo & Logo Signature Card */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right">
              {/* Teacher Photo */}
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md border-2 border-blue-500/20 ring-4 ring-blue-50 bg-slate-900 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="/teacher_be7ery.jpg"
                    alt="مستر بحيري - خبير البرمجة والذكاء الاصطناعي"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute -bottom-1 -left-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs" title="حساب معتمد"></span>
              </div>

              {/* Logo & Teacher Information */}
              <div className="flex flex-col items-center sm:items-start gap-2">
                <div className="flex items-center gap-3">
                  <div className="bg-white px-3 py-1.5 rounded-2xl border border-gray-200 shadow-xs">
                    <Be7eryLogo size="md" showSignature={false} />
                  </div>
                  <span className="text-xs font-bold text-[#1D4ED8] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl font-mono">
                    #Be7ery
                  </span>
                </div>
                <h4 className="text-base font-bold text-gray-900">
                  مستر بحيري | مادة البرمجة والذكاء الاصطناعي
                </h4>
                <p className="text-xs text-gray-500 max-w-md text-center sm:text-right leading-relaxed">
                  الصف الأول الثانوي (2026/2027) • المذكرات الشاملة والتطبيقات التفاعلية وبنك الأسئلة المعتمد.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 flex items-center gap-1.5 text-[#1D4ED8] font-bold">
                <Code2 className="w-3.5 h-3.5" /> منصة #be7ery
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-100 flex items-center gap-1.5 text-amber-800 font-bold">
                <Award className="w-3.5 h-3.5" /> وزارة التربية والتعليم
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-1.5 text-emerald-800 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> محتوى معتمد وموثق
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 font-mono text-center sm:text-right">
            <span>جميع الحقوق محفوظة © 2026 - إعداد وتقديم مستر بحيري (#be7ery)</span>
            <span className="text-[11px] text-gray-400">البرمجة والذكاء الاصطناعي - 1 ثانوي</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
