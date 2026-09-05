import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RefreshCw, 
  Trophy, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Filter
} from 'lucide-react';
import { UNIT_QUESTIONS } from '../data/questionsData';
import { UNITS_DATA } from '../data/bookData';
import { Question } from '../types';

interface QuizEngineProps {
  initialLessonId?: string;
  onToggleBookmark: (id: string, title: string, type: 'lesson' | 'question') => void;
  bookmarks: string[];
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  initialLessonId,
  onToggleBookmark,
  bookmarks,
}) => {
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<string>(initialLessonId || 'all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [textInput, setTextInput] = useState<string>('');
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Collect filtered questions
  const allQuestions: Question[] = React.useMemo(() => {
    if (selectedLessonFilter === 'all') {
      return Object.values(UNIT_QUESTIONS).flat();
    }
    return UNIT_QUESTIONS[selectedLessonFilter] || [];
  }, [selectedLessonFilter]);

  const currentQ = allQuestions[currentQuestionIndex];

  // Reset quiz state when filter changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowExplanation({});
    setTextInput('');
    setQuizFinished(false);
    setScore(0);
  }, [selectedLessonFilter]);

  // Handle MCQ Answer
  const handleSelectOption = (optionIndex: number) => {
    if (!currentQ) return;
    const isCorrect = optionIndex === currentQ.correctAnswer;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selected: optionIndex,
        isCorrect,
      },
    }));
    setShowExplanation((prev) => ({ ...prev, [currentQ.id]: true }));
  };

  // Handle True/False Answer
  const handleSelectTrueFalse = (val: boolean) => {
    if (!currentQ) return;
    const isCorrect = val === currentQ.correctAnswer;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selected: val,
        isCorrect,
      },
    }));
    setShowExplanation((prev) => ({ ...prev, [currentQ.id]: true }));
  };

  // Handle Text/Problem Answer
  const handleSubmitTextAnswer = () => {
    if (!currentQ || !textInput.trim()) return;
    const cleanInput = textInput.trim().toLowerCase();
    const correctStr = String(currentQ.correctAnswer).toLowerCase();
    const isCorrect = cleanInput === correctStr || cleanInput.includes(correctStr);

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selected: textInput.trim(),
        isCorrect,
      },
    }));
    setShowExplanation((prev) => ({ ...prev, [currentQ.id]: true }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTextInput('');
    } else {
      // Calculate final score
      let correctCount = 0;
      Object.values(userAnswers).forEach((ans: any) => {
        if (ans.isCorrect) correctCount++;
      });
      setScore(correctCount);
      setQuizFinished(true);

      if (correctCount / allQuestions.length >= 0.75) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setTextInput('');
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowExplanation({});
    setTextInput('');
    setQuizFinished(false);
    setScore(0);
  };

  if (allQuestions.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center space-y-4 shadow-sm">
        <BrainCircuit className="w-12 h-12 text-[#1D4ED8] mx-auto" />
        <h3 className="text-xl font-bold text-gray-900">لا توجد أسئلة متوفرة لهذا الفلتر</h3>
        <p className="text-sm text-gray-500">اختر درساً آخر من القائمة للبدء في حل الأسئلة</p>
      </div>
    );
  }

  // Finished Screen
  if (quizFinished) {
    const percentage = Math.round((score / allQuestions.length) * 100);
    return (
      <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-[#EFF6FF] text-[#1D4ED8] p-1 mx-auto flex items-center justify-center border border-blue-200 shadow-2xs">
          <Trophy className="w-10 h-10 text-[#1D4ED8]" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">
            {percentage >= 85 ? 'ممتاز يا بطل! 🌟' : percentage >= 60 ? 'أحسنت! أداء جيد جداً 👍' : 'فرصة جيدة للمراجعة والتحسن! 📚'}
          </h2>
          <p className="text-gray-600 text-sm">
            لقد أنهيت اختبار مادة <span className="text-[#1D4ED8] font-bold">البرمجة والذكاء الاصطناعي (#be7ery)</span> بنجاح.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 flex justify-around items-center">
          <div>
            <span className="text-xs text-gray-500 block font-medium">درجتك النهائية</span>
            <span className="text-3xl font-black text-[#1D4ED8] font-mono">
              {score} / {allQuestions.length}
            </span>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div>
            <span className="text-xs text-gray-500 block font-medium">النسبة المئوية</span>
            <span className="text-3xl font-black text-emerald-700 font-mono">
              {percentage}%
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={restartQuiz}
            className="px-6 py-3 bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold rounded-2xl shadow-sm hover:shadow transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            إعادة حل الأسئلة
          </button>
        </div>
      </div>
    );
  }

  const currentAnswer = userAnswers[currentQ?.id];
  const isAnswered = !!currentAnswer;

  return (
    <div className="space-y-6">
      {/* Top Filter and Info Bar */}
      <div className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <Filter className="w-4 h-4 text-[#1D4ED8] shrink-0" />
          <select
            value={selectedLessonFilter}
            onChange={(e) => setSelectedLessonFilter(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-xs md:text-sm font-bold text-gray-800 focus:outline-none focus:border-[#1D4ED8] focus:bg-white transition-colors"
          >
            <option value="all">جميع تدريبات المقرر (شامل الوحدات)</option>
            {UNITS_DATA.map((unit) =>
              unit.lessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {unit.number}: {lesson.title}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-[#1D4ED8] font-bold px-3.5 py-1.5 bg-blue-50 rounded-full border border-blue-100">
            السؤال {currentQuestionIndex + 1} من {allQuestions.length}
          </div>
          <button
            onClick={() => onToggleBookmark(currentQ.id, currentQ.questionText, 'question')}
            className={`p-2 rounded-xl border transition-colors ${
              bookmarks.includes(currentQ.id)
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-gray-50 text-gray-500 border-gray-200 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="حفظ السؤال للمراجعة لاحقاً"
          >
            {bookmarks.includes(currentQ.id) ? (
              <BookmarkCheck className="w-4 h-4 text-amber-600" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-[#1D4ED8] h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentQuestionIndex + 1) / allQuestions.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Question Card */}
      {currentQ && (
        <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          {/* Question Type Badge & Page */}
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 bg-blue-50 border border-blue-100 text-[#1D4ED8] rounded-full text-xs font-bold font-mono">
              {currentQ.type === 'mcq'
                ? 'اختر الإجابة الصحيحة'
                : currentQ.type === 'true_false'
                ? 'ضع علامة (✓) أو (✗)'
                : currentQ.type === 'scientific_term'
                ? 'اذكر المصطلح العلمي'
                : currentQ.type === 'problem_solving'
                ? 'حل المسألة والعمليات الحسابية'
                : 'أكمل مكان النقط'}
            </span>
            {currentQ.pageReference && (
              <span className="text-xs text-gray-500 font-mono">
                صـ {currentQ.pageReference} في مذكرات مستر بحيري
              </span>
            )}
          </div>

          {/* Question Text */}
          <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-relaxed flex items-start gap-2.5">
            <span className="w-1.5 h-6 bg-[#1D4ED8] rounded-full shrink-0 mt-0.5"></span>
            <span>{currentQ.questionText}</span>
          </h3>

          {/* Options: MCQ */}
          {currentQ.type === 'mcq' && currentQ.options && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = currentAnswer?.selected === optIdx;
                const isCorrectOpt = optIdx === currentQ.correctAnswer;
                
                let btnStyle = 'bg-gray-50/80 hover:bg-blue-50/50 hover:border-blue-300 border-gray-200 text-gray-800';
                if (isAnswered) {
                  if (isCorrectOpt) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                  } else if (isSelected && !currentAnswer.isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-800 font-bold';
                  } else {
                    btnStyle = 'bg-gray-50 opacity-40 border-gray-200 text-gray-400';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between text-xs md:text-sm ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-white border border-gray-200 font-mono text-xs flex items-center justify-center font-bold text-[#1D4ED8] shadow-2xs">
                        {['أ', 'ب', 'ج', 'د'][optIdx] || optIdx + 1}
                      </span>
                      <span>{option}</span>
                    </div>
                    {isAnswered && isCorrectOpt && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !currentAnswer.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Options: True / False */}
          {currentQ.type === 'true_false' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { label: 'العبارة صحيحة ( ✓ )', value: true },
                { label: 'العبارة خاطئة ( ✗ )', value: false },
              ].map((item) => {
                const isSelected = currentAnswer?.selected === item.value;
                const isCorrectVal = item.value === currentQ.correctAnswer;

                let btnStyle = 'bg-gray-50/80 hover:bg-blue-50/50 hover:border-blue-300 border-gray-200 text-gray-800';
                if (isAnswered) {
                  if (isCorrectVal) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                  } else if (isSelected && !currentAnswer.isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-800 font-bold';
                  } else {
                    btnStyle = 'bg-gray-50 opacity-40 border-gray-200 text-gray-400';
                  }
                }

                return (
                  <button
                    key={String(item.value)}
                    disabled={isAnswered}
                    onClick={() => handleSelectTrueFalse(item.value)}
                    className={`p-4 rounded-2xl border text-center font-bold transition-all flex items-center justify-center gap-3 text-sm md:text-base ${btnStyle}`}
                  >
                    {item.value ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    )}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Options: Scientific Term / Problem Solving */}
          {(currentQ.type === 'scientific_term' || currentQ.type === 'problem_solving' || currentQ.type === 'fill_blanks') && (
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  disabled={isAnswered}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitTextAnswer()}
                  placeholder="اكتب إجابتك هنا..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#1D4ED8] focus:bg-white transition-colors"
                />
                {!isAnswered && (
                  <button
                    onClick={handleSubmitTextAnswer}
                    className="px-6 py-3 bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold rounded-2xl text-xs md:text-sm transition-colors shadow-2xs"
                  >
                    تحقق من الإجابة
                  </button>
                )}
              </div>

              {/* Show options chips if available */}
              {currentQ.options && !isAnswered && (
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs text-gray-500 block font-bold">خيارات مقترحة:</span>
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTextInput(opt)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-xl border border-gray-200 transition-colors font-medium"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Explanation Drawer */}
          {showExplanation[currentQ.id] && (
            <div className="mt-4 p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1D4ED8] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#1D4ED8]" />
                  الشرح والتعليل النموذجي (إعداد #be7ery)
                </span>
                <span className="text-xs font-bold text-emerald-700">
                  الإجابة الصحيحة: {String(currentQ.correctAnswer === true ? 'صحيح ( ✓ )' : currentQ.correctAnswer === false ? 'خطأ ( ✗ )' : currentQ.correctAnswer)}
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 disabled:opacity-30 text-gray-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 border border-gray-200"
            >
              <ArrowRight className="w-4 h-4" />
              السؤال السابق
            </button>

            <button
              onClick={nextQuestion}
              className="px-6 py-2.5 bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold rounded-xl text-xs md:text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <span>{currentQuestionIndex === allQuestions.length - 1 ? 'إنهاء وحساب النتيجة' : 'السؤال التالي'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
