import React, { useState } from 'react';
import { Search, X, BookOpen, HelpCircle, ArrowLeft } from 'lucide-react';
import { UNITS_DATA } from '../data/bookData';
import { UNIT_QUESTIONS } from '../data/questionsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
  onSelectQuestion: (questionId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  onSelectQuestion,
}) => {
  const [query, setQuery] = useState<string>('');

  if (!isOpen) return null;

  // Search lessons
  const matchedLessons = query.trim()
    ? UNITS_DATA.flatMap((u) => u.lessons).filter(
        (l) =>
          l.title.toLowerCase().includes(query.toLowerCase()) ||
          l.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          l.sections.some((s) => s.title.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  // Search questions
  const allQuestions = Object.values(UNIT_QUESTIONS).flat();
  const matchedQuestions = query.trim()
    ? allQuestions.filter((q) =>
        q.questionText.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden space-y-4">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#1D4ED8] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في جميع الفصول والمقرر، المصطلحات، والأسئلة..."
            className="flex-1 bg-transparent text-sm md:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {matchedLessons.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#1D4ED8] px-2">الدروس المطابقة:</span>
              {matchedLessons.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    onSelectLesson(l.id);
                    onClose();
                  }}
                  className="w-full text-right p-3 rounded-2xl bg-gray-50 hover:bg-blue-50/50 border border-gray-200 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-[#1D4ED8]" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#1D4ED8]">
                        {l.title}
                      </h4>
                      <p className="text-xs text-gray-500">{l.subtitle}</p>
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-[#1D4ED8]" />
                </button>
              ))}
            </div>
          )}

          {matchedQuestions.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-600 px-2">الأسئلة والتدريبات المطابقة:</span>
              {matchedQuestions.slice(0, 8).map((q) => (
                <button
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(q.id);
                    onClose();
                  }}
                  className="w-full text-right p-3 rounded-2xl bg-gray-50 hover:bg-amber-50/50 border border-gray-200 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-amber-500" />
                    <p className="font-medium text-xs text-gray-700 line-clamp-1">
                      {q.questionText}
                    </p>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-amber-600" />
                </button>
              ))}
            </div>
          )}

          {query.trim() && matchedLessons.length === 0 && matchedQuestions.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-xs">
              لم يتم العثور على نتائج لـ "{query}"
            </div>
          )}

          {!query.trim() && (
            <div className="text-center py-8 text-gray-400 text-xs">
              اكتب كلمة للبحث الفوري في الدروس، القوانين والأسئلة
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
