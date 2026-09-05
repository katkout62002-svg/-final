import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Award, 
  FileText, 
  Play, 
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Printer
} from 'lucide-react';
import { OFFICIAL_EXAMS } from '../data/examsData';
import { Exam, Question } from '../types';
import { printDocument } from '../utils/printUtils';

export const ExamsHub: React.FC = () => {
  const [selectedExamId, setSelectedExamId] = useState<string>(OFFICIAL_EXAMS[0].id);
  const [examMode, setExamMode] = useState<'browse' | 'live' | 'result'>('browse');
  const [currentExamIndex, setCurrentExamIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState<number>(30 * 60);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);

  const currentExam = OFFICIAL_EXAMS.find((e) => e.id === selectedExamId) || OFFICIAL_EXAMS[0];

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      finishExam();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startLiveExam = (exam: Exam) => {
    setSelectedExamId(exam.id);
    setCurrentExamIndex(0);
    setUserAnswers({});
    setTimeLeft(exam.durationMinutes * 60);
    setTimerActive(true);
    setExamMode('live');
  };

  const handleSelectOption = (qId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionIndex,
    }));
  };

  const handleSelectTrueFalse = (qId: string, val: boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: val,
    }));
  };

  const finishExam = () => {
    setTimerActive(false);
    let correctCount = 0;
    currentExam.questions.forEach((q) => {
      const userAns = userAnswers[q.id];
      if (userAns !== undefined && userAns === q.correctAnswer) {
        correctCount++;
      }
    });
    setFinalScore(correctCount);
    setExamMode('result');

    if (correctCount / currentExam.questions.length >= 0.7) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  };

  const handlePrintExam = (withAnswers: boolean) => {
    const questionsHtml = currentExam.questions
      .map((q, idx) => {
        let optionsHtml = '';
        if (q.type === 'mcq' && q.options) {
          optionsHtml = `
            <div style="margin: 8px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              ${q.options
                .map((opt, oIdx) => {
                  const isCorrect = withAnswers && q.correctAnswer === oIdx;
                  return `
                    <div style="padding: 6px 12px; border-radius: 6px; border: 1px solid ${
                      isCorrect ? '#10b981' : '#e5e7eb'
                    }; background: ${isCorrect ? '#ecfdf5' : '#ffffff'}; font-size: 13px;">
                      <span style="font-weight: bold; margin-left: 6px;">(${['أ', 'ب', 'ج', 'د'][oIdx] || oIdx + 1})</span>
                      ${opt} ${isCorrect ? '<strong style="color: #059669;">✔ (الإجابة الصحيحة)</strong>' : ''}
                    </div>
                  `;
                })
                .join('')}
            </div>
          `;
        } else if (q.type === 'true_false') {
          optionsHtml = `
            <div style="margin: 8px 0; display: flex; gap: 20px; font-size: 13px;">
              <span style="padding: 4px 12px; border: 1px solid #e5e7eb; border-radius: 6px; background: ${
                withAnswers && q.correctAnswer === true ? '#ecfdf5; border-color: #10b981; font-weight: bold; color: #059669;' : '#ffffff;'
              }">
                ( ) صواب ${withAnswers && q.correctAnswer === true ? '✔' : ''}
              </span>
              <span style="padding: 4px 12px; border: 1px solid #e5e7eb; border-radius: 6px; background: ${
                withAnswers && q.correctAnswer === false ? '#ecfdf5; border-color: #10b981; font-weight: bold; color: #059669;' : '#ffffff;'
              }">
                ( ) خطأ ${withAnswers && q.correctAnswer === false ? '✔' : ''}
              </span>
            </div>
          `;
        }

        const explanationHtml =
          withAnswers && q.explanation
            ? `
          <div style="margin-top: 8px; padding: 8px 12px; background: #eff6ff; border-right: 3px solid #1d4ed8; font-size: 12px; color: #1e40af; border-radius: 4px;">
            <strong>💡 التفسير النموذجي لمستر بحيري:</strong> ${q.explanation}
            ${q.pageReference ? `<span style="display: block; margin-top: 4px; color: #6b7280;">(مرجع الكتاب: صـ ${q.pageReference})</span>` : ''}
          </div>
        `
            : '';

        return `
          <div style="margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px dashed #d1d5db; page-break-inside: avoid;">
            <div style="font-weight: bold; font-size: 14px; color: #111827; margin-bottom: 6px;">
              <span style="color: #1d4ed8;">س ${idx + 1}:</span> ${q.questionText}
            </div>
            ${optionsHtml}
            ${explanationHtml}
          </div>
        `;
      })
      .join('');

    const instructionsHtml = `
      <div style="margin-bottom: 20px; padding: 10px 14px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 13px;">
        <strong>تعليمات ورقة الامتحان:</strong>
        <span style="margin-right: 15px;">زمن الإجابة: ${currentExam.durationMinutes} دقيقة</span>
        <span style="margin-right: 15px;">عدد الأسئلة: ${currentExam.questions.length} أسئلة</span>
        <span style="margin-right: 15px;">النوع: ${withAnswers ? 'نموذج الإجابة المعتمد' : 'ورقة الأسئلة للحل والتدريب'}</span>
      </div>
    `;

    printDocument({
      title: currentExam.title,
      subtitle: `${currentExam.term} - ${currentExam.year} | ${currentExam.administration || 'إدارة تعليمية معتمدة'}`,
      unitTitle: withAnswers ? 'نموذج الإجابة الرسمي والمفصل' : 'ورقة امتحان تجريبي رسمي',
      author: 'إشراف ومراجعة: مستر بحيري (#Be7ery)',
      htmlContent: instructionsHtml + questionsHtml,
    });
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-6 md:p-8 shadow-sm text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold tracking-wide">
              <GraduationCap className="w-4 h-4" />
              امتحانات المحافظات الرسمية ونماذج الشهور
            </div>
            <h2 className="text-2xl md:text-3xl font-black">
              بنك امتحانات واختبارات المحافظات المحلولة
            </h2>
            <p className="text-xs md:text-sm text-blue-100">
              نماذج مطابقة لمواصفات وزارة التربية والتعليم وامتحانات إدارات القاهرة، الجيزة، الإسكندرية، الدقهلية والمحافظات.
            </p>
          </div>

          <div className="px-6 py-3 bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl text-center shadow-xs">
            <span className="text-xs text-blue-100 block font-mono">إجمالي النماذج</span>
            <span className="text-2xl font-black text-white font-mono">18 نموذجاً</span>
          </div>
        </div>
      </div>

      {/* MODE 1: BROWSE & MODEL SOLUTIONS */}
      {examMode === 'browse' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Exam Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm space-y-2">
              <h3 className="font-bold text-sm text-gray-900 px-2 py-1 flex items-center">
                <span className="w-1 h-4 bg-[#1D4ED8] ml-2 rounded-full"></span>
                اختر نموذج الامتحان:
              </h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {OFFICIAL_EXAMS.map((exam) => {
                  const isSelected = exam.id === selectedExamId;
                  return (
                    <button
                      key={exam.id}
                      onClick={() => setSelectedExamId(exam.id)}
                      className={`w-full text-right p-3.5 rounded-2xl border transition-all text-xs space-y-1.5 ${
                        isSelected
                          ? 'bg-[#EFF6FF] border-blue-200 text-[#1D4ED8] font-bold shadow-2xs'
                          : 'bg-gray-50/80 hover:bg-gray-100/80 border-gray-200 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold truncate max-w-[200px]">
                          {exam.title}
                        </span>
                        {exam.governorate && (
                          <span className="px-2 py-0.5 bg-blue-50 text-[10px] text-[#1D4ED8] rounded-md font-bold border border-blue-100">
                            {exam.governorate}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-[#1D4ED8]" /> {exam.durationMinutes} دقيقة
                        </span>
                        <span className="font-mono">{exam.questions.length} أسئلة</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Exam Details & Questions Preview */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-black text-gray-900">{currentExam.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 font-mono">
                    <span>{currentExam.term}</span>
                    <span>•</span>
                    <span>العام الدراسي {currentExam.year}</span>
                    {currentExam.administration && (
                      <>
                        <span>•</span>
                        <span className="text-[#1D4ED8] font-bold">{currentExam.administration}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handlePrintExam(false)}
                    className="px-4 py-2.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-[#1D4ED8] border border-gray-200 hover:border-blue-200 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-xs"
                    title="طباعة ورقة الامتحان خالية بدون إجابات للحل والتدريب الورقي"
                  >
                    <Printer className="w-4 h-4 text-[#1D4ED8]" />
                    <span>طباعة ورقة الأسئلة</span>
                  </button>
                  <button
                    onClick={() => handlePrintExam(true)}
                    className="px-4 py-2.5 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 border border-gray-200 hover:border-emerald-200 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-xs"
                    title="طباعة نموذج الإجابة الرسمي المعتمد مع الشرح"
                  >
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>طباعة نموذج الإجابة</span>
                  </button>
                  <button
                    onClick={() => startLiveExam(currentExam)}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-xs md:text-sm"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    بدء الامتحان بوقت محدد
                  </button>
                </div>
              </div>

              {/* Questions List with Solutions */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-gray-500 block">
                  الأسئلة ونموذج الإجابة المفصل لمستر بحيري:
                </span>

                {currentExam.questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-5 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1D4ED8] text-xs font-mono">
                        س {idx + 1}
                      </span>
                      {q.pageReference && (
                        <span className="text-[11px] text-gray-500 font-mono">
                          صـ {q.pageReference} في مذكرات مستر بحيري
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-bold text-gray-900 leading-relaxed">
                      {q.questionText}
                    </p>

                    {q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                              oIdx === q.correctAnswer
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                                : 'bg-white border-gray-200 text-gray-700'
                            }`}
                          >
                            <span className="w-5 h-5 rounded bg-gray-100 font-mono text-[11px] flex items-center justify-center font-bold text-[#1D4ED8]">
                              {['أ', 'ب', 'ج', 'د'][oIdx] || oIdx + 1}
                            </span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Solution Pill */}
                    <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[#1D4ED8]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>الإجابة النموذجية: {String(q.correctAnswer === true ? 'صحيح ( ✓ )' : q.correctAnswer === false ? 'خطأ ( ✗ )' : typeof q.correctAnswer === 'number' && q.options ? q.options[q.correctAnswer] : q.correctAnswer)}</span>
                      </div>
                      <p className="text-gray-700 text-[11px] leading-relaxed pr-4">
                        التعليل: {q.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: LIVE TIMED EXAM */}
      {examMode === 'live' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Top Bar with Live Timer */}
          <div className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 shadow-sm flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base">{currentExam.title}</h3>
              <span className="text-xs text-gray-500 font-mono">
                السؤال {currentExamIndex + 1} من {currentExam.questions.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`px-4 py-2 rounded-2xl font-mono text-sm md:text-base font-black flex items-center gap-2 border ${
                  timeLeft < 300
                    ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                    : 'bg-blue-50 text-[#1D4ED8] border-blue-100'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>

              <button
                onClick={finishExam}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold rounded-xl text-xs transition-colors"
              >
                تسليم الامتحان
              </button>
            </div>
          </div>

          {/* Current Question */}
          {(() => {
            const q = currentExam.questions[currentExamIndex];
            const userAns = userAnswers[q.id];

            return (
              <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 bg-blue-50 text-[#1D4ED8] border border-blue-100 rounded-full text-xs font-bold font-mono">
                    السؤال {currentExamIndex + 1}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-relaxed">
                  {q.questionText}
                </h3>

                {/* MCQ */}
                {q.type === 'mcq' && q.options && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(q.id, oIdx)}
                        className={`p-4 rounded-2xl border text-right transition-all flex items-center gap-3 text-xs md:text-sm ${
                          userAns === oIdx
                            ? 'bg-blue-50 border-[#1D4ED8] text-[#1D4ED8] font-bold shadow-2xs'
                            : 'bg-gray-50/80 hover:bg-gray-100 border-gray-200 text-gray-800'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-white border border-gray-200 font-mono text-xs flex items-center justify-center font-bold text-[#1D4ED8]">
                          {['أ', 'ب', 'ج', 'د'][oIdx] || oIdx + 1}
                        </span>
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* True / False */}
                {q.type === 'true_false' && (
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'صحيح ( ✓ )', value: true },
                      { label: 'خطأ ( ✗ )', value: false },
                    ].map((item) => (
                      <button
                        key={String(item.value)}
                        onClick={() => handleSelectTrueFalse(q.id, item.value)}
                        className={`p-4 rounded-2xl border text-center font-bold transition-all text-sm ${
                          userAns === item.value
                            ? 'bg-blue-50 border-[#1D4ED8] text-[#1D4ED8] font-bold shadow-2xs'
                            : 'bg-gray-50/80 hover:bg-gray-100 border-gray-200 text-gray-800'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Problem Solving */}
                {q.type === 'problem_solving' && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={userAns || ''}
                      onChange={(e) =>
                        setUserAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      placeholder="اكتب الناتج النهائي بالأرقام..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 font-mono focus:outline-none focus:border-[#1D4ED8] focus:bg-white transition-colors"
                    />
                  </div>
                )}

                {/* Question Navigator */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    disabled={currentExamIndex === 0}
                    onClick={() => setCurrentExamIndex((prev) => prev - 1)}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 disabled:opacity-30 text-gray-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    السابق
                  </button>

                  <div className="flex gap-1.5 overflow-x-auto max-w-[200px] p-1">
                    {currentExam.questions.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentExamIndex(idx)}
                        className={`w-7 h-7 rounded-lg font-mono text-xs font-bold transition-colors ${
                          idx === currentExamIndex
                            ? 'bg-[#1D4ED8] text-white shadow-2xs'
                            : userAnswers[currentExam.questions[idx].id] !== undefined
                            ? 'bg-blue-50 text-[#1D4ED8] border border-blue-200'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  {currentExamIndex < currentExam.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentExamIndex((prev) => prev + 1)}
                      className="px-5 py-2 bg-[#1D4ED8] hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-2xs"
                    >
                      التالي
                    </button>
                  ) : (
                    <button
                      onClick={finishExam}
                      className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-gray-950 rounded-xl text-xs font-black"
                    >
                      إنهاء
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* MODE 3: RESULT & CERTIFICATE */}
      {examMode === 'result' && (
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-3xl p-8 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 bg-blue-50 text-[#1D4ED8] border border-blue-200 rounded-3xl p-1 mx-auto flex items-center justify-center shadow-2xs">
            <Award className="w-10 h-10 text-[#1D4ED8]" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-gray-900">نتيجة الامتحان الرسمي</h3>
            <p className="text-sm text-gray-500 mt-1">{currentExam.title}</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 flex justify-around items-center">
            <div>
              <span className="text-xs text-gray-500 block font-bold">الدرجة المكتسبة</span>
              <span className="text-3xl font-black text-[#1D4ED8] font-mono">
                {finalScore} / {currentExam.questions.length}
              </span>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div>
              <span className="text-xs text-gray-500 block font-bold">التقدير</span>
              <span className="text-2xl font-black text-emerald-700">
                {finalScore / currentExam.questions.length >= 0.85
                  ? 'ممتاز 🏆'
                  : finalScore / currentExam.questions.length >= 0.65
                  ? 'جيد جداً ⭐'
                  : 'يحتاج مراجعة 📖'}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setExamMode('browse')}
              className="px-6 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
            >
              عرض نموذج الإجابة والملاحظات
            </button>
            <button
              onClick={() => startLiveExam(currentExam)}
              className="px-6 py-2.5 bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition-colors shadow-2xs"
            >
              إعادة الامتحان
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
