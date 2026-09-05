import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  GraduationCap, 
  Cpu, 
  BookA, 
  Bookmark, 
  Search,
} from 'lucide-react';
import { Be7eryLogo } from './Be7eryLogo';

interface NavbarProps {
  activeView: 'reader' | 'quiz' | 'exams' | 'lab' | 'glossary' | 'bookmarks';
  onSelectView: (view: 'reader' | 'quiz' | 'exams' | 'lab' | 'glossary' | 'bookmarks') => void;
  onOpenSearch: () => void;
  bookmarksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onSelectView,
  onOpenSearch,
  bookmarksCount,
}) => {
  const navItems = [
    { id: 'reader', label: 'الدروس والمقرر', icon: BookOpen },
    { id: 'quiz', label: 'بنك الأسئلة والتدريبات', icon: HelpCircle },
    { id: 'exams', label: 'امتحانات المحافظات', icon: GraduationCap },
    { id: 'lab', label: 'المختبر الذكي', icon: Cpu },
    { id: 'glossary', label: 'قاموس المصطلحات', icon: BookA },
    { id: 'bookmarks', label: 'ملاحظاتي', icon: Bookmark, badge: bookmarksCount },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo Brand on the side */}
          <div 
            className="flex items-center gap-3 cursor-pointer py-1 px-2 rounded-2xl hover:bg-gray-50 transition-colors shrink-0" 
            onClick={() => onSelectView('reader')}
            title="الرئيسية - البرمجة والذكاء الاصطناعي"
          >
            <div className="bg-white p-1 rounded-xl">
              <Be7eryLogo size="md" showSignature={false} />
            </div>
            <div className="hidden sm:flex flex-col text-right pr-2 border-r border-gray-200">
              <span className="font-extrabold text-gray-900 text-xs sm:text-sm leading-tight">
                البرمجة والذكاء الاصطناعي
              </span>
              <span className="text-[10px] text-blue-600 font-bold font-mono">
                الصف الأول الثانوي
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-gray-50/80 p-1.5 rounded-2xl border border-gray-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 relative ${
                    isActive
                      ? 'bg-[#EFF6FF] text-[#1D4ED8] font-bold shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 font-semibold'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-full"></span>}
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1D4ED8]' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#1D4ED8] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Search & Author Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200/80 text-gray-700 transition-colors flex items-center gap-2 border border-transparent hover:border-gray-300"
              title="بحث سريع"
            >
              <Search className="w-4 h-4 text-[#1D4ED8]" />
              <span className="hidden sm:inline text-xs font-semibold text-gray-600">ابحث عن درس أو سؤال...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white text-gray-500 rounded border border-gray-200 shadow-2xs">Ctrl+K</kbd>
            </button>

            <div className="hidden sm:flex items-center gap-2 pr-2 border-r border-gray-200">
              <span className="text-xs font-mono px-3 py-1 bg-blue-50 text-[#1D4ED8] border border-blue-100 rounded-full font-bold">
                #be7ery
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none border-t border-gray-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#EFF6FF] text-[#1D4ED8] font-bold border border-blue-200 shadow-2xs'
                    : 'bg-white text-gray-600 border border-gray-200 font-semibold hover:bg-gray-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1D4ED8] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

