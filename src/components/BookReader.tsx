import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  Bookmark, 
  BookmarkCheck, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ListChecks, 
  CheckCircle2, 
  Lightbulb, 
  AlertTriangle, 
  HelpCircle,
  Share2,
  Printer,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { UNITS_DATA } from '../data/bookData';
import { Lesson, Unit } from '../types';
import { printDocument } from '../utils/printUtils';

interface BookReaderProps {
  onStartLessonQuiz: (lessonId: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string, title: string, type: 'lesson' | 'question') => void;
}

export const BookReader: React.FC<BookReaderProps> = ({
  onStartLessonQuiz,
  bookmarks,
  onToggleBookmark,
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>('unit-1');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('u1-l1');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'content' | 'summary' | 'mindmap' | 'terms'>('content');

  const currentUnit = UNITS_DATA.find((u) => u.id === selectedUnitId) || UNITS_DATA[0];
  const currentLesson = currentUnit.lessons.find((l) => l.id === selectedLessonId) || currentUnit.lessons[0];

  const isBookmarked = bookmarks.includes(currentLesson.id);

  // Text-To-Speech implementation
  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) {
      alert('عذراً، خاصية القراءة الصوتية غير مدعومة في متصفحك الحالي.');
      return;
    }

    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }

    const textToRead = `${currentLesson.title}. ${currentLesson.subtitle}. ${currentLesson.summary.join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.95;

    utterance.onend = () => setIsReadingAloud(false);
    utterance.onerror = () => setIsReadingAloud(false);

    setIsReadingAloud(true);
    window.speechSynthesis.speak(utterance);
  };

  const nextLesson = () => {
    const allLessons = UNITS_DATA.flatMap((u) => u.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex < allLessons.length - 1) {
      const next = allLessons[currentIndex + 1];
      setSelectedUnitId(next.unitId);
      setSelectedLessonId(next.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevLesson = () => {
    const allLessons = UNITS_DATA.flatMap((u) => u.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex > 0) {
      const prev = allLessons[currentIndex - 1];
      setSelectedUnitId(prev.unitId);
      setSelectedLessonId(prev.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrintLesson = () => {
    // Generate clean structured HTML for printing
    const sectionsHtml = currentLesson.sections
      .map(
        (sec) => `
      <div class="lesson-section">
        <div class="section-title">${sec.title}</div>
        ${sec.content.map((p) => `<p style="margin-bottom: 8px;">${p}</p>`).join('')}
        ${
          sec.subsections
            ? sec.subsections
                .map(
                  (sub) => `
            <div class="subsection">
              <h4>${sub.title}</h4>
              ${sub.explanation ? `<p>${sub.explanation}</p>` : ''}
              ${sub.example ? `<p style="color: #4b5563; font-size: 13px;"><strong>مثال:</strong> ${sub.example}</p>` : ''}
              ${
                sub.items
                  ? `<ul style="margin: 6px 0; padding-right: 20px;">
                      ${sub.items.map((it) => `<li>${it}</li>`).join('')}
                    </ul>`
                  : ''
              }
            </div>
          `
                )
                .join('')
            : ''
        }
        ${
          sec.highlightBox
            ? `
          <div class="box-tip">
            <strong>💡 ${sec.highlightBox.title}:</strong>
            <p style="margin: 4px 0 0 0;">${sec.highlightBox.text}</p>
          </div>
        `
            : ''
        }
      </div>
    `
      )
      .join('');

    const termsHtml =
      currentLesson.keyTerms && currentLesson.keyTerms.length > 0
        ? `
      <div style="margin-top: 24px; page-break-inside: avoid;">
        <div class="section-title">المصطلحات والمفاهيم الأساسية</div>
        <table class="terms-table">
          <thead>
            <tr>
              <th style="width: 25%;">المصطلح العربي</th>
              <th style="width: 25%;">المصطلح الإنجليزي</th>
              <th style="width: 50%;">التعريف المعتمد</th>
            </tr>
          </thead>
          <tbody>
            ${currentLesson.keyTerms
              .map(
                (t) => `
              <tr>
                <td style="font-weight: bold; color: #111827;">${t.arabic}</td>
                <td style="font-family: monospace; color: #1d4ed8;">${t.english}</td>
                <td>${t.definition}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `
        : '';

    const summaryHtml =
      currentLesson.summary && currentLesson.summary.length > 0
        ? `
      <div style="margin-top: 24px; page-break-inside: avoid;">
        <div class="section-title">ملخص أهم نقاط الدرس</div>
        <ul style="padding-right: 20px; line-height: 1.8;">
          ${currentLesson.summary.map((s) => `<li>${s}</li>`).join('')}
        </ul>
      </div>
    `
        : '';

    printDocument({
      title: currentLesson.title,
      subtitle: currentLesson.subtitle,
      unitTitle: currentUnit.title,
      author: 'إعداد ومراجعة: مستر بحيري (#Be7ery)',
      htmlContent: sectionsHtml + termsHtml + summaryHtml,
    });
  };

  const fontClass = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    xlarge: 'text-xl leading-[2.2]',
  }[fontSize];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Table of Contents Sidebar */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm sticky top-24">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#1D4ED8] ml-2 rounded-full"></span>
              فهرس المقرر والدروس
            </h3>
            <span className="text-xs px-2.5 py-0.5 bg-blue-50 text-[#1D4ED8] font-mono rounded-full font-bold border border-blue-100">
              12 درساً
            </span>
          </div>

          <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
            {UNITS_DATA.map((unit) => (
              <div key={unit.id} className="space-y-2">
                <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]"></span>
                  <span>{unit.number}: {unit.title}</span>
                </div>
                <div className="space-y-1.5 mr-2">
                  {unit.lessons.map((lesson) => {
                    const isSelected = lesson.id === currentLesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setSelectedUnitId(unit.id);
                          setSelectedLessonId(lesson.id);
                        }}
                        className={`w-full text-right p-3 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 text-xs ${
                          isSelected
                            ? 'bg-[#EFF6FF] border border-blue-200 text-[#1D4ED8] font-bold shadow-2xs'
                            : 'hover:bg-gray-50 text-gray-700 border border-transparent font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-6 h-6 rounded-lg font-mono text-xs flex items-center justify-center font-bold ${
                              isSelected
                                ? 'bg-[#1D4ED8] text-white shadow-2xs'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {lesson.number}
                          </span>
                          <span className="truncate max-w-[180px]">{lesson.title}</span>
                        </div>
                        {bookmarks.includes(lesson.id) && (
                          <BookmarkCheck className="w-4 h-4 text-amber-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Lesson Content Area */}
      <div className="lg:col-span-8 space-y-6">
        {/* Top Control Bar */}
        <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#1D4ED8] border border-blue-100 text-xs font-bold font-mono">
              {currentUnit.number} - الدرس {currentLesson.number}
            </span>
            <span className="text-xs text-gray-500 hidden sm:inline">
              مدة القراءة: {currentLesson.durationMinutes} دقيقة
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Read Aloud Button */}
            <button
              onClick={handleReadAloud}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isReadingAloud
                  ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
              }`}
              title="قراءة صوتية للدرس"
            >
              {isReadingAloud ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-[#1D4ED8]" />}
              <span className="hidden md:inline">{isReadingAloud ? 'إيقاف الصوت' : 'استمع للدرس'}</span>
            </button>

            {/* Font Size Adjuster */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${fontSize === 'normal' ? 'bg-white text-[#1D4ED8] shadow-2xs' : 'text-gray-500'}`}
                title="حجم خط عادي"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${fontSize === 'large' ? 'bg-white text-[#1D4ED8] shadow-2xs' : 'text-gray-500'}`}
                title="حجم خط كبير"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${fontSize === 'xlarge' ? 'bg-white text-[#1D4ED8] shadow-2xs' : 'text-gray-500'}`}
                title="حجم خط كبير جداً"
              >
                A++
              </button>
            </div>

            {/* Print / Export Button */}
            <button
              onClick={handlePrintLesson}
              className="p-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-[#1D4ED8] hover:border-blue-200 transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="طباعة مذكرة الدرس / حفظ كـ PDF"
            >
              <Printer className="w-4 h-4 text-[#1D4ED8]" />
              <span className="hidden sm:inline">طباعة الدرس</span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={() => onToggleBookmark(currentLesson.id, currentLesson.title, 'lesson')}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200'
              }`}
              title={isBookmarked ? 'محفوظ في الملاحظات' : 'حفظ الدرس'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Lesson Header Banner */}
        <div className="bg-gradient-to-br from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-6 md:p-8 shadow-sm space-y-4 relative overflow-hidden text-white">
          <div className="relative z-10 space-y-2">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-wider">
              {currentUnit.title}
            </div>
            <h1 className="text-2xl md:text-3xl font-black">
              {currentLesson.title}
            </h1>
            <p className="text-sm md:text-base text-blue-100 font-medium">
              {currentLesson.subtitle}
            </p>
          </div>

          {/* Tab Subnav */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-white/20">
            {[
              { id: 'content', label: 'الشرح الكامل والتفصيلي', icon: BookOpen },
              { id: 'summary', label: 'ملخص الدرس السريع', icon: ListChecks },
              { id: 'terms', label: 'المصطلحات والمفاهيم', icon: Lightbulb },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-[#1D4ED8] shadow-sm'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: FULL CONTENT */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {currentLesson.sections.map((section) => (
              <div
                key={section.id}
                className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6"
              >
                <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center">
                  <span className="w-1 h-6 bg-[#1D4ED8] ml-3 rounded-full"></span>
                  {section.title}
                </h2>

                <div className={`space-y-3.5 text-gray-700 ${fontClass}`}>
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Subsections & Tables */}
                {section.subsections && section.subsections.length > 0 && (
                  <div className="space-y-5 pt-2">
                    {section.subsections.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-gray-50 rounded-2xl p-5 border border-gray-200/80 space-y-3"
                      >
                        <h3 className="font-bold text-sm md:text-base text-gray-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#1D4ED8]"></span>
                          {sub.title}
                        </h3>

                        {sub.explanation && (
                          <p className={`text-gray-700 ${fontClass}`}>
                            {sub.explanation}
                          </p>
                        )}

                        {sub.items && (
                          <ul className="space-y-2 text-gray-700 pr-4 list-disc marker:text-[#1D4ED8] text-xs md:text-sm leading-relaxed">
                            {sub.items.map((item, iIdx) => (
                              <li key={iIdx}>{item}</li>
                            ))}
                          </ul>
                        )}

                        {sub.table && (
                          <div className="overflow-x-auto my-3 rounded-xl border border-gray-200 bg-white">
                            <table className="w-full text-xs md:text-sm text-right border-collapse">
                              <thead>
                                <tr className="bg-blue-50/80 text-[#1D4ED8] font-bold border-b border-gray-200">
                                  {sub.table.headers.map((header, hIdx) => (
                                    <th key={hIdx} className="py-3 px-4">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {sub.table.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-gray-50/80">
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="py-3 px-4 text-gray-800">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {sub.example && (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 font-medium">
                            <span className="font-bold ml-1 text-emerald-800">مثال تطبيقي:</span>
                            {sub.example}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Highlight Box */}
                {section.highlightBox && (
                  <div
                    className={`rounded-2xl p-4 border flex items-start gap-3 ${
                      section.highlightBox.type === 'warning'
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : section.highlightBox.type === 'tip'
                        ? 'bg-blue-50 border-blue-200 text-blue-900'
                        : 'bg-purple-50 border-purple-200 text-purple-900'
                    }`}
                  >
                    {section.highlightBox.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    ) : (
                      <Lightbulb className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-bold text-sm mb-1">{section.highlightBox.title}</h4>
                      <p className="text-xs md:text-sm leading-relaxed opacity-90">{section.highlightBox.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: LESSON SUMMARY */}
        {activeTab === 'summary' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center">
                <span className="w-1 h-6 bg-[#1D4ED8] ml-3 rounded-full"></span>
                ملخص الدرس والمفاهيم الجوهرية
              </h2>
              <span className="text-xs text-[#1D4ED8] font-mono font-bold bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                #be7ery Summary
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {currentLesson.summary.map((point, pIdx) => (
                <div
                  key={pIdx}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200/80 hover:border-blue-300 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-800 leading-relaxed font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: KEY TERMS */}
        {activeTab === 'terms' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center">
              <span className="w-1 h-6 bg-[#1D4ED8] ml-3 rounded-full"></span>
              قاموس مصطلحات الدرس
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLesson.keyTerms.map((term, tIdx) => (
                <div
                  key={tIdx}
                  className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-2 hover:border-blue-300 hover:shadow-2xs transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-gray-900">{term.arabic}</h3>
                    <span className="text-xs font-mono text-[#1D4ED8] font-bold bg-blue-50 px-2 py-0.5 rounded-md">{term.english}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{term.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation & Quiz Link */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handlePrintLesson}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-[#1D4ED8] rounded-2xl text-xs font-bold border border-gray-200 transition-colors"
              title="طباعة نسخة ورقية معتمدة أو حفظ كـ PDF"
            >
              <Printer className="w-4 h-4 text-[#1D4ED8]" />
              <span>طباعة المذكرة (PDF)</span>
            </button>
            <button
              onClick={prevLesson}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-2xl text-xs font-bold border border-gray-200 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
              الدرس السابق
            </button>
            <button
              onClick={nextLesson}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-2xl text-xs font-bold border border-gray-200 transition-colors"
            >
              الدرس التالي
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onStartLessonQuiz(currentLesson.id)}
            className="w-full md:w-auto px-6 py-3 bg-[#1D4ED8] hover:bg-blue-800 text-white rounded-2xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <ListChecks className="w-4 h-4" />
            <span>ابدأ تدريب واختبار هذا الدرس الآن</span>
          </button>
        </div>
      </div>
    </div>
  );
};
