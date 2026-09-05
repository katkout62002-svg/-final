import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BookReader } from './components/BookReader';
import { QuizEngine } from './components/QuizEngine';
import { ExamsHub } from './components/ExamsHub';
import { CSLab } from './components/CSLab';
import { Glossary } from './components/Glossary';
import { BookmarksNotes } from './components/BookmarksNotes';
import { SearchModal } from './components/SearchModal';
import { AuthorBadge } from './components/AuthorBadge';
import { Be7eryLogo } from './components/Be7eryLogo';
import { StudyNote } from './types';
import { Sparkles, Code2, Heart, Award, ShieldCheck } from 'lucide-react';

export function App() {
  const [activeView, setActiveView] = useState<'reader' | 'quiz' | 'exams' | 'lab' | 'glossary' | 'bookmarks'>('reader');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedLessonForQuiz, setSelectedLessonForQuiz] = useState<string | undefined>(undefined);

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
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Author Hero Card on Reader view */}
        {activeView === 'reader' && <AuthorBadge />}

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
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="bg-gray-50 p-2 rounded-2xl border border-gray-100">
                <Be7eryLogo size="md" showSignature={false} />
              </div>
              <p className="text-xs text-gray-500 max-w-md text-center md:text-right">
                المنصة التفاعلية لمادة البرمجة والذكاء الاصطناعي للصف الأول الثانوي (2025/2026).
              </p>
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

          <div className="pt-6 border-t border-gray-100 text-center text-xs text-gray-400 font-mono">
            جميع الحقوق محفوظة © 2026 - البرمجة والذكاء الاصطناعي (#be7ery)
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
