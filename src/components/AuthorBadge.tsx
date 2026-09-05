import React from 'react';
import { Sparkles, Code2, Cpu, Award, BookOpen, Layers, Download } from 'lucide-react';
import { Be7eryLogo } from './Be7eryLogo';

interface AuthorBadgeProps {
  compact?: boolean;
  onOpenInstallApk?: () => void;
}

export const AuthorBadge: React.FC<AuthorBadgeProps> = ({ compact = false, onOpenInstallApk }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
        <div className="w-10 h-10 rounded-xl overflow-hidden border border-blue-100 shadow-xs shrink-0">
          <img
            src="/teacher_be7ery.jpg"
            alt="مستر بحيري"
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
        </div>
        <Be7eryLogo size="sm" showSignature={false} />
        <div className="text-right pr-2 border-r border-gray-200">
          <div className="text-sm font-bold text-gray-900">
            البرمجة والذكاء الاصطناعي
          </div>
          <p className="text-xs text-gray-500">مستر بحيري • الصف الأول الثانوي</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main Hero Banner with Geometric Balance styling */}
      <div className="lg:col-span-8 bg-gradient-to-br from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between relative overflow-hidden shadow-sm min-h-[260px] gap-6">
        <div className="relative z-10 max-w-lg space-y-3 text-right">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-white/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider inline-block">
              المنهج الرسمي 2026/2027
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono font-bold">
              #bE7ERY
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            البرمجة والذكاء الاصطناعي
          </h2>

          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
            «أهلاً بكم يا أبطال الثانوية العامة في المنصة التعليمية التفاعلية. استكشف الأنظمة العددية، أمن المعلومات، المعمارية والدوائر المنطقية بطريقة مبسطة واحترافية!»
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl text-xs font-medium text-blue-50 backdrop-blur-xs">
              <Cpu className="w-3.5 h-3.5 text-blue-200" />
              <span>4 وحدات دراسية</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl text-xs font-medium text-blue-50 backdrop-blur-xs">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>18 امتحان محافظة</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl text-xs font-medium text-blue-50 backdrop-blur-xs">
              <Code2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>مختبر تفاعلي متكامل</span>
            </div>
          </div>
        </div>

        {/* Prominent standalone Teacher & Logo Card situated clearly on the side */}
        <div className="relative z-10 shrink-0 bg-white p-5 sm:p-6 rounded-3xl shadow-xl border border-white/30 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-md border-2 border-blue-500/20 ring-2 ring-blue-100 shrink-0 bg-blue-50">
              <img
                src="/teacher_be7ery.jpg"
                alt="مستر بحيري"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <Be7eryLogo size="md" showSignature={false} />
          </div>
          <div className="text-[11px] font-bold text-gray-500 font-mono tracking-wider pt-2 border-t border-gray-100 w-full flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>مستر بحيري • #Be7ery</span>
          </div>
        </div>

        {/* Ambient background blur */}
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Quick Metrics Box */}
      <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-5 bg-[#1D4ED8] ml-2.5 rounded-full"></span>
            إحصائيات ومميزات المنصة
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-blue-50 rounded-2xl text-center border border-blue-100/60">
              <div className="text-xl font-black text-[#1D4ED8]">12</div>
              <div className="text-[11px] text-gray-600 font-bold mt-0.5">درساً تفاعلياً</div>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-2xl text-center border border-emerald-100/60">
              <div className="text-xl font-black text-emerald-700">100%</div>
              <div className="text-[11px] text-gray-600 font-bold mt-0.5">شرح وأسئلة الوزارة</div>
            </div>

            <div className="p-3.5 bg-purple-50 rounded-2xl text-center border border-purple-100/60">
              <div className="text-xl font-black text-purple-700">22+</div>
              <div className="text-[11px] text-gray-600 font-bold mt-0.5">مصطلحاً معتمداً</div>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl text-center border border-amber-100/60">
              <div className="text-xl font-black text-amber-700">4</div>
              <div className="text-[11px] text-gray-600 font-bold mt-0.5">أدوات حاسبة ذكية</div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-blue-100 shadow-xs shrink-0">
              <img
                src="/teacher_be7ery.jpg"
                alt="مستر بحيري"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <Be7eryLogo size="sm" showSignature={false} />
            <div className="pr-2 border-r border-gray-200">
              <div className="text-xs font-bold text-gray-900">مستر بحيري</div>
              <div className="text-[11px] text-gray-500">البرمجة والذكاء الاصطناعي - 2026</div>
            </div>
          </div>

          {onOpenInstallApk && (
            <button
              onClick={onOpenInstallApk}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all border border-blue-400/30"
              title="تثبيت التطبيق على هواتف الأندرويد"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تطبيق APK</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

