export interface KeyTerm {
  arabic: string;
  english: string;
  definition: string;
  example?: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string[];
  subsections?: {
    title: string;
    items?: string[];
    explanation?: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
    note?: string;
    example?: string;
  }[];
  highlightBox?: {
    title: string;
    text: string;
    type?: 'info' | 'warning' | 'tip' | 'math';
  };
}

export interface Lesson {
  id: string;
  unitId: string;
  number: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  summary: string[];
  sections: LessonSection[];
  keyTerms: KeyTerm[];
  mindMapNodes?: { id: string; label: string; parent?: string }[];
}

export interface Unit {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  lessons: Lesson[];
}

export type QuestionType = 
  | 'mcq' 
  | 'true_false' 
  | 'matching' 
  | 'fill_blanks' 
  | 'scientific_term' 
  | 'problem_solving';

export interface MatchingPair {
  left: string;
  right: string;
  id: string;
}

export interface Question {
  id: string;
  unitId?: string;
  lessonId?: string;
  examId?: string;
  type: QuestionType;
  questionText: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  correctAnswersList?: string[]; // for multi-matching or multi-blanks
  matchingPairs?: MatchingPair[];
  explanation: string;
  pageReference?: number;
  hints?: string;
}

export interface Exam {
  id: string;
  title: string;
  category: 'october' | 'november' | 'final_governorate';
  governorate?: string;
  administration?: string;
  term: 'الفصل الدراسي الأول';
  year: '2025 / 2026';
  durationMinutes: number;
  questions: Question[];
  totalScore: number;
}

export interface GlossaryItem {
  id: string;
  termAr?: string;
  termEn?: string;
  termArabic?: string;
  termEnglish?: string;
  unit?: string;
  unitId?: string;
  definition: string;
  category?: 'information' | 'ethics' | 'security' | 'binary' | 'hardware' | 'logic' | 'programming' | 'ai';
}

export interface StudyNote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface BookmarkItem {
  id: string;
  type: 'lesson' | 'question' | 'exam' | 'term';
  targetId: string;
  title: string;
  subtitle?: string;
  timestamp: number;
  note?: string;
}
