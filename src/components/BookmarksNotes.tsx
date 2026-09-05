import React, { useState } from 'react';
import { Bookmark, Trash2, Plus, FileText, CheckCircle, BookOpen, Sparkles } from 'lucide-react';
import { StudyNote } from '../types';

interface BookmarksNotesProps {
  bookmarks: string[];
  notes: StudyNote[];
  onAddNote: (note: Omit<StudyNote, 'id' | 'createdAt'>) => void;
  onDeleteNote: (id: string) => void;
  onRemoveBookmark: (id: string) => void;
  onNavigateToLesson: (lessonId: string) => void;
}

export const BookmarksNotes: React.FC<BookmarksNotesProps> = ({
  bookmarks,
  notes,
  onAddNote,
  onDeleteNote,
  onRemoveBookmark,
  onNavigateToLesson,
}) => {
  const [newNoteTitle, setNewNoteTitle] = useState<string>('');
  const [newNoteContent, setNewNoteContent] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'notes' | 'bookmarks'>('notes');

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    onAddNote({
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
    });

    setNewNoteTitle('');
    setNewNoteContent('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-6 md:p-8 shadow-sm text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            دفتر الملاحظات والمحفوظات الشخصية
          </div>
          <h2 className="text-2xl md:text-3xl font-black">
            دفتر الملاحظات والمحفوظات (#be7ery)
          </h2>
          <p className="text-xs md:text-sm text-blue-100 mt-1">
            سجل ملاحظاتك الخاصة وراجع العناصر التي قمت بحفظها أثناء دراسة فصول وموضوعات المقرر.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'notes'
                ? 'bg-white text-[#1D4ED8] shadow-xs'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            ملاحظاتي ({notes.length})
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-white text-[#1D4ED8] shadow-xs'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            المحفوظات ({bookmarks.length})
          </button>
        </div>
      </div>

      {/* Tab: Notes */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Add Note Form */}
          <div className="lg:col-span-5 space-y-4">
            <form
              onSubmit={handleCreateNote}
              className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4"
            >
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#1D4ED8]" />
                إضافة ملاحظة أو فكرة استذكار
              </h3>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  عنوان الملاحظة:
                </label>
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="مثال: مكمل الآحاد والاثنين وطريقة التحويل..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-xs md:text-sm text-gray-900 focus:outline-none focus:border-[#1D4ED8] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  محتوى الملاحظة:
                </label>
                <textarea
                  rows={4}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="اكتب التلخيص أو الملاحظات التي تود تذكرها قبل الامتحان..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs md:text-sm text-gray-900 focus:outline-none focus:border-[#1D4ED8] focus:bg-white transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold rounded-2xl text-xs md:text-sm shadow-xs hover:shadow transition-all"
              >
                حفظ الملاحظة الآن
              </button>
            </form>
          </div>

          {/* Notes List */}
          <div className="lg:col-span-7 space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-3 relative group"
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-bold text-base text-gray-900">{note.title}</h4>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="p-1.5 bg-gray-50 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-gray-200 transition-colors"
                    title="حذف الملاحظة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
                <div className="text-[10px] text-gray-400 font-mono">
                  {new Date(note.createdAt).toLocaleDateString('ar-EG', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}

            {notes.length === 0 && (
              <div className="text-center py-12 bg-white border border-gray-200 rounded-3xl space-y-2">
                <FileText className="w-8 h-8 text-gray-400 mx-auto" />
                <h4 className="font-bold text-gray-900">لا توجد ملاحظات مسجلة بعد</h4>
                <p className="text-xs text-gray-500">استخدم النموذج لإضافة ملخصاتك وقوانين المادة</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarks.map((bId) => (
              <div
                key={bId}
                className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1D4ED8]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{bId}</h4>
                    <span className="text-xs text-gray-500">عنصر محفوظ للمراجعة</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRemoveBookmark(bId)}
                    className="p-2 bg-gray-50 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-gray-200 transition-colors"
                    title="إزالة من المحفوظات"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {bookmarks.length === 0 && (
            <div className="text-center py-12 bg-white border border-gray-200 rounded-3xl space-y-2">
              <Bookmark className="w-8 h-8 text-gray-400 mx-auto" />
              <h4 className="font-bold text-gray-900">لم تقم بحفظ أي دروس أو أسئلة بعد</h4>
              <p className="text-xs text-gray-500">
                اضغط على أيقونة الإشارة المرجعية أثناء تصفح الدروس والأسئلة لحفظها هنا
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
