import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  HelpCircle, 
  ArrowLeft, 
  ExternalLink, 
  Globe, 
  Sparkles, 
  Code2, 
  GraduationCap, 
  FileText,
  Lightbulb,
  Cpu,
  ShieldCheck,
  Compass,
  Bookmark
} from 'lucide-react';
import { UNITS_DATA, GLOSSARY_DATA } from '../data/bookData';
import { UNIT_QUESTIONS } from '../data/questionsData';
import { OFFICIAL_EXAMS } from '../data/examsData';
import { KNOWLEDGE_TOPICS, KnowledgeTopic } from '../data/knowledgeBaseData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
  onSelectQuestion: (questionId: string) => void;
  onSelectExam?: (examId: string) => void;
}

type FilterTab = 'all' | 'lessons' | 'terms' | 'questions' | 'knowledge' | 'web';

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  onSelectQuestion,
  onSelectExam,
}) => {
  const [query, setQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedTopic, setSelectedTopic] = useState<KnowledgeTopic | null>(null);

  // Suggested curriculum search terms
  const QUICK_SEARCH_SUGGESTIONS = [
    'لغة بايثون',
    'الذكاء الاصطناعي',
    'تعلم الآلة',
    'بوابات منطقية',
    'النظام الثنائي',
    'الأمن السيبراني',
    'الهندسة الاجتماعية',
    'معمارية الحاسوب CPU'
  ];

  // External search providers
  const searchInWeb = (provider: 'google' | 'ekb' | 'wikipedia' | 'python' | 'scholar', customQuery?: string) => {
    const q = customQuery || query || 'حاسب آلي وذكاء اصطناعي أولى ثانوي مستر بحيري';
    let url = '';

    switch (provider) {
      case 'google':
        url = `https://www.google.com/search?q=${encodeURIComponent(q + ' منهج أولى ثانوي مصر')}`;
        break;
      case 'ekb':
        url = `https://www.ekb.eg/ar/search?q=${encodeURIComponent(q)}`;
        break;
      case 'wikipedia':
        url = `https://ar.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(q)}`;
        break;
      case 'python':
        url = `https://docs.python.org/3/search.html?q=${encodeURIComponent(q)}`;
        break;
      case 'scholar':
        url = `https://scholar.google.com/scholar?q=${encodeURIComponent(q)}`;
        break;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Search calculations
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        lessons: [],
        terms: [],
        questions: [],
        knowledge: [],
        exams: []
      };
    }

    // 1. Lessons
    const lessons = UNITS_DATA.flatMap((u) => u.lessons).filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.subtitle.toLowerCase().includes(q) ||
        l.sections.some((s) => s.title.toLowerCase().includes(q) || s.content.some((c) => c.toLowerCase().includes(q))) ||
        (l.summary && l.summary.some((sm) => sm.toLowerCase().includes(q)))
    );

    // 2. Glossary terms
    const terms = GLOSSARY_DATA.filter(
      (t) =>
        (t.termAr || t.termArabic || '').toLowerCase().includes(q) ||
        (t.termEn || t.termEnglish || '').toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
    );

    // 3. Questions
    const allQuestions = Object.values(UNIT_QUESTIONS).flat();
    const questions = allQuestions.filter(
      (qt) =>
        qt.questionText.toLowerCase().includes(q) ||
        (qt.explanation && qt.explanation.toLowerCase().includes(q)) ||
        (qt.options && qt.options.some((o) => o.toLowerCase().includes(q)))
    );

    // 4. Knowledge Topics
    const knowledge = KNOWLEDGE_TOPICS.filter(
      (k) =>
        k.title.toLowerCase().includes(q) ||
        k.englishTitle.toLowerCase().includes(q) ||
        k.summary.toLowerCase().includes(q) ||
        k.explanation.toLowerCase().includes(q) ||
        k.keywords.some((kw) => kw.toLowerCase().includes(q))
    );

    // 5. Exams
    const exams = OFFICIAL_EXAMS.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.term.toLowerCase().includes(q) ||
        (e.administration && e.administration.toLowerCase().includes(q))
    );

    return { lessons, terms, questions, knowledge, exams };
  }, [query]);

  if (!isOpen) return null;

  const totalResultsCount =
    searchResults.lessons.length +
    searchResults.terms.length +
    searchResults.questions.length +
    searchResults.knowledge.length +
    searchResults.exams.length;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-14 p-3 sm:p-4 bg-gray-900/60 backdrop-blur-md overflow-y-auto"
      dir="rtl"
    >
      <div className="bg-white border border-gray-200 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Search Header Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3 bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/30">
          <div className="p-2.5 bg-[#1D4ED8] text-white rounded-2xl shadow-sm">
            <Search className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedTopic(null);
              }}
              placeholder="ابحث عن درس، سؤال، مفهوم، كود بايثون، أو ابحث في جوجل..."
              className="w-full bg-transparent text-sm sm:text-base text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-xs font-bold"
            >
              مسح
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition-colors"
            title="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 border-b border-gray-100 overflow-x-auto scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-[#1D4ED8] text-white shadow-2xs'
                : 'bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200/80'
            }`}
          >
            الكل {query && `(${totalResultsCount})`}
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'lessons'
                ? 'bg-[#1D4ED8] text-white shadow-2xs'
                : 'bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>الدروس ({searchResults.lessons.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'bg-[#1D4ED8] text-white shadow-2xs'
                : 'bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200/80'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>المصطلحات ({searchResults.terms.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'knowledge'
                ? 'bg-[#1D4ED8] text-white shadow-2xs'
                : 'bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200/80'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>قواعد ومعارف ({searchResults.knowledge.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'questions'
                ? 'bg-[#1D4ED8] text-white shadow-2xs'
                : 'bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200/80'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>بنك الأسئلة ({searchResults.questions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('web')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'web'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>محركات البحث 🌐</span>
          </button>
        </div>

        {/* Web Search Engines Direct Integration Bar */}
        <div className="px-4 py-2.5 bg-blue-50/60 border-b border-blue-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-gray-700 font-bold">
            <Globe className="w-3.5 h-3.5 text-[#1D4ED8]" />
            <span>الاستعانة بمحرك البحث مباشرة:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => searchInWeb('google')}
              className="px-2.5 py-1 bg-white hover:bg-blue-600 hover:text-white text-gray-700 border border-gray-200 rounded-lg font-bold transition-all flex items-center gap-1 shadow-2xs"
              title="البحث في Google عن موضوع البحث"
            >
              <Search className="w-3 h-3 text-[#1D4ED8]" />
              <span>بحث Google</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </button>
            <button
              onClick={() => searchInWeb('ekb')}
              className="px-2.5 py-1 bg-white hover:bg-amber-600 hover:text-white text-gray-700 border border-gray-200 rounded-lg font-bold transition-all flex items-center gap-1 shadow-2xs"
              title="البحث في بنك المعرفة المصري المعتمد"
            >
              <GraduationCap className="w-3 h-3 text-amber-600" />
              <span>بنك المعرفة المصري (EKB)</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </button>
            <button
              onClick={() => searchInWeb('wikipedia')}
              className="px-2.5 py-1 bg-white hover:bg-purple-600 hover:text-white text-gray-700 border border-gray-200 rounded-lg font-bold transition-all flex items-center gap-1 shadow-2xs"
              title="البحث في موسوعة ويكيبيديا العربية"
            >
              <BookOpen className="w-3 h-3 text-purple-600" />
              <span>ويكيبيديا</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </button>
            <button
              onClick={() => searchInWeb('python')}
              className="px-2.5 py-1 bg-white hover:bg-emerald-600 hover:text-white text-gray-700 border border-gray-200 rounded-lg font-bold transition-all flex items-center gap-1 shadow-2xs"
              title="البحث في وثائق ومراجع بايثون الرسمية"
            >
              <Code2 className="w-3 h-3 text-emerald-600" />
              <span>مراجع Python 3</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-6">
          {/* If a knowledge topic is previewed in full */}
          {selectedTopic && (
            <div className="p-5 bg-gradient-to-br from-blue-50/80 to-indigo-50/40 rounded-3xl border border-blue-200 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#1D4ED8] bg-white px-2.5 py-0.5 rounded-full border border-blue-100 font-bold">
                    {selectedTopic.englishTitle}
                  </span>
                  <h3 className="text-lg font-black text-gray-900 mt-1">
                    {selectedTopic.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="p-1.5 bg-white hover:bg-gray-100 text-gray-500 rounded-xl border border-gray-200 text-xs font-bold"
                >
                  إغلاق الشرح
                </button>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed">
                {selectedTopic.explanation}
              </p>

              {selectedTopic.codeOrExample && (
                <div className="p-3 bg-gray-900 text-gray-100 rounded-2xl text-xs font-mono direction-ltr text-left overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{selectedTopic.codeOrExample}</pre>
                </div>
              )}

              <div className="p-3 bg-white rounded-2xl border border-blue-100 text-xs space-y-1">
                <span className="font-bold text-[#1D4ED8] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> نصيحة مستر بحيري للامتحان:
                </span>
                <p className="text-gray-600">{selectedTopic.examTip}</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-gray-500">{selectedTopic.curriculumRelevance}</span>
                <button
                  onClick={() => searchInWeb('google', selectedTopic.externalQuery)}
                  className="px-3 py-1.5 bg-[#1D4ED8] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-blue-800 transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>بحث متقدم على الويب</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Quick Suggestions when empty */}
          {!query.trim() && (
            <div className="space-y-4 py-3">
              <div className="text-center space-y-2 py-4">
                <Compass className="w-8 h-8 text-[#1D4ED8] mx-auto opacity-75" />
                <h4 className="text-sm font-bold text-gray-800">
                  محرك البحث التعليمي الشامل لمستر بحيري
                </h4>
                <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                  اكتب أي استفسار للبحث الفوري في وحدات المنهج، أسئلة الامتحانات، المفاهيم البرمجية، أو اضغط على أحد الموضوعات الشائعة أدناه:
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-700 block">
                  موضوعات المنهج الأكثر بحثاً:
                </span>
                <div className="flex flex-wrap gap-2">
                  {QUICK_SEARCH_SUGGESTIONS.map((sug) => (
                    <button
                      key={sug}
                      onClick={() => setQuery(sug)}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-[#1D4ED8] border border-gray-200 hover:border-blue-200 rounded-xl text-xs font-bold transition-all"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Knowledge Cards */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-[#1D4ED8] block">
                  مفاهيم تقنية سريعة من المنهج:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {KNOWLEDGE_TOPICS.slice(0, 4).map((top) => (
                    <button
                      key={top.id}
                      onClick={() => setSelectedTopic(top)}
                      className="p-3 text-right bg-white hover:bg-blue-50/40 rounded-2xl border border-gray-200 flex flex-col justify-between transition-all group"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#1D4ED8] font-bold">
                          {top.englishTitle}
                        </span>
                        <h5 className="text-xs font-bold text-gray-900 group-hover:text-[#1D4ED8]">
                          {top.title}
                        </h5>
                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                          {top.summary}
                        </p>
                      </div>
                      <span className="text-[10px] text-[#1D4ED8] font-bold mt-2 inline-flex items-center gap-1">
                        عرض الشرح والتطبيق <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Results Display */}
          {query.trim() && (
            <div className="space-y-6">
              {/* Lessons Results */}
              {(activeTab === 'all' || activeTab === 'lessons') && searchResults.lessons.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-xs font-black text-[#1D4ED8] px-2 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>دروس وفصول المنهج ({searchResults.lessons.length})</span>
                  </span>
                  <div className="space-y-2">
                    {searchResults.lessons.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => {
                          onSelectLesson(l.id);
                          onClose();
                        }}
                        className="w-full text-right p-3.5 rounded-2xl bg-gray-50 hover:bg-blue-50/60 border border-gray-200 flex items-center justify-between group transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100/60 text-[#1D4ED8] rounded-xl shrink-0 mt-0.5">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#1D4ED8] transition-colors">
                              {l.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-0.5">{l.subtitle}</p>
                            <span className="text-[10px] text-[#1D4ED8] font-bold bg-white px-2 py-0.5 rounded-md border border-blue-100 inline-block mt-1.5">
                              {l.durationMinutes} دقيقة قراءة
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="hidden sm:inline text-xs font-bold text-gray-400 group-hover:text-[#1D4ED8]">
                            فتح الدرس
                          </span>
                          <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-[#1D4ED8] group-hover:-translate-x-1 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Knowledge Base */}
              {(activeTab === 'all' || activeTab === 'knowledge') && searchResults.knowledge.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-xs font-black text-indigo-700 px-2 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" />
                    <span>المعارف والقواعد البرمجية والتقنية ({searchResults.knowledge.length})</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {searchResults.knowledge.map((top) => (
                      <button
                        key={top.id}
                        onClick={() => setSelectedTopic(top)}
                        className="p-3.5 text-right rounded-2xl bg-indigo-50/40 hover:bg-indigo-50 border border-indigo-100 flex flex-col justify-between group transition-all"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-indigo-700 font-bold bg-white px-2 py-0.5 rounded-md border border-indigo-100">
                            {top.englishTitle}
                          </span>
                          <h4 className="font-bold text-xs text-gray-900 group-hover:text-indigo-700 transition-colors mt-1">
                            {top.title}
                          </h4>
                          <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                            {top.summary}
                          </p>
                        </div>
                        <span className="text-[10px] text-indigo-700 font-bold mt-2 inline-flex items-center gap-1">
                          قراءة التفسير والملخص <ArrowLeft className="w-3 h-3" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Glossary Terms */}
              {(activeTab === 'all' || activeTab === 'terms') && searchResults.terms.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-xs font-black text-emerald-700 px-2 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    <span>المصطلحات والمفاهيم المعتمدة ({searchResults.terms.length})</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {searchResults.terms.map((term) => (
                      <div
                        key={term.id}
                        className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-1 text-right"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-gray-900">
                            {term.termAr || term.termArabic}
                          </h4>
                          <span className="text-[10px] font-mono text-emerald-700 font-bold">
                            {term.termEn || term.termEnglish}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-relaxed">
                          {term.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Questions Results */}
              {(activeTab === 'all' || activeTab === 'questions') && searchResults.questions.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-xs font-black text-amber-700 px-2 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>الأسئلة والتدريبات المطابقة ({searchResults.questions.length})</span>
                  </span>
                  <div className="space-y-2">
                    {searchResults.questions.slice(0, 10).map((q) => (
                      <button
                        key={q.id}
                        onClick={() => {
                          onSelectQuestion(q.id);
                          onClose();
                        }}
                        className="w-full text-right p-3.5 rounded-2xl bg-gray-50 hover:bg-amber-50/50 border border-gray-200 flex items-center justify-between group transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-xs text-gray-800 line-clamp-2 leading-relaxed group-hover:text-amber-700 transition-colors">
                              {q.questionText}
                            </p>
                            {q.explanation && (
                              <p className="text-[11px] text-gray-500 line-clamp-1 mt-1 font-mono">
                                💡 {q.explanation}
                              </p>
                            )}
                          </div>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-amber-600 group-hover:-translate-x-1 transition-transform shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Official Exams Results */}
              {(activeTab === 'all' || activeTab === 'lessons') && searchResults.exams.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-xs font-black text-purple-700 px-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    <span>الامتحانات الرسمية المطابقة ({searchResults.exams.length})</span>
                  </span>
                  <div className="space-y-2">
                    {searchResults.exams.map((ex) => (
                      <div
                        key={ex.id}
                        className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between"
                      >
                        <div>
                          <h4 className="font-bold text-xs text-gray-900">{ex.title}</h4>
                          <span className="text-[11px] text-purple-700 font-mono">
                            {ex.term} - {ex.year} ({ex.questions.length} أسئلة)
                          </span>
                        </div>
                        {onSelectExam && (
                          <button
                            onClick={() => {
                              onSelectExam(ex.id);
                              onClose();
                            }}
                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <span>فتح الامتحان</span>
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No internal results fallback + Web search banner */}
              {totalResultsCount === 0 && (
                <div className="text-center py-10 space-y-4">
                  <div className="p-4 bg-gray-50 rounded-3xl border border-gray-200 max-w-md mx-auto space-y-3">
                    <Search className="w-8 h-8 text-gray-400 mx-auto" />
                    <h4 className="text-sm font-bold text-gray-800">
                      لم يتم العثور على نتائج مباشرة داخل المذكرة لـ "{query}"
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      يمكنك الاستعانة بمحركات البحث الخارجية المعتمدة الآن مباشرة بنقرة واحدة:
                    </p>
                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        onClick={() => searchInWeb('google')}
                        className="w-full py-2.5 px-4 bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <Search className="w-4 h-4" />
                        <span>البحث عن "{query}" في Google</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => searchInWeb('ekb')}
                        className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>البحث في بنك المعرفة المصري</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => searchInWeb('wikipedia')}
                        className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>البحث في ويكيبيديا العربية</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with quick external launcher */}
        <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-bold text-[#1D4ED8]">#Be7ery</span>
            <span>•</span>
            <span>محرك بحث ذكي متوافق مع منهج 2026/2027</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400">للبحث السريع: اضغط Ctrl+K</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-white hover:bg-gray-100 text-gray-700 font-bold rounded-xl border border-gray-200 transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
