import React, { useState } from 'react';
import { Search, BookA, Sparkles, Filter, Copy, Check } from 'lucide-react';
import { GLOSSARY_DATA } from '../data/bookData';

export const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = GLOSSARY_DATA.filter((item) => {
    const ar = item.termAr || item.termArabic || '';
    const en = item.termEn || item.termEnglish || '';
    const unitName = item.unit || item.unitId || '';

    const matchesSearch =
      ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUnit =
      selectedUnitFilter === 'all' ||
      unitName.includes(selectedUnitFilter) ||
      (selectedUnitFilter === 'unit-1' && unitName.includes('الأولى')) ||
      (selectedUnitFilter === 'unit-2' && unitName.includes('الثانية')) ||
      (selectedUnitFilter === 'unit-3' && unitName.includes('الثالثة')) ||
      (selectedUnitFilter === 'unit-6' && unitName.includes('السادسة')) ||
      (selectedUnitFilter === 'unit-7' && unitName.includes('السابعة'));

    return matchesSearch && matchesUnit;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-6 md:p-8 shadow-sm text-white space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold mb-1">
              <BookA className="w-4 h-4" />
              القاموس والمصطلحات التقنية المعتمدة
            </div>
            <h2 className="text-2xl md:text-3xl font-black">
              قاموس مصطلحات البرمجة والذكاء الاصطناعي
            </h2>
            <p className="text-xs md:text-sm text-blue-100">
              جميع المصطلحات العلمية والبرمجية باللغتين العربية والإنجليزية مع التعريف الدقيق وأرقام الصفحات.
            </p>
          </div>

          <div className="px-5 py-3 bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl text-center shadow-xs">
            <span className="text-xs text-blue-100 block font-mono">إجمالي المصطلحات</span>
            <span className="text-2xl font-black text-white font-mono">
              {GLOSSARY_DATA.length} مصطلحاً
            </span>
          </div>
        </div>

        {/* Search & Filter Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 absolute right-4 top-3.5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن أي مصطلح بالعربية أو الإنجليزية (مثال: Bit, UX, براءة الاختراع)..."
              className="w-full bg-white border border-gray-200 rounded-2xl pr-11 pl-4 py-3 text-xs md:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/80 shrink-0" />
            <select
              value={selectedUnitFilter}
              onChange={(e) => setSelectedUnitFilter(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-xs md:text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="all">جميع الوحدات</option>
              <option value="unit-1">الوحدة 1: العالم الرقمي والأمن</option>
              <option value="unit-2">الوحدة 2: الملكية الفكرية والأخلاقيات</option>
              <option value="unit-3">الوحدة 3: الأمن السيبراني</option>
              <option value="unit-6">الوحدة 6: تمثيل البيانات والأنظمة العددية</option>
              <option value="unit-7">الوحدة 7: الدوائر المنطقية والمعمارية</option>
            </select>
          </div>
        </div>
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const ar = item.termAr || item.termArabic || '';
          const en = item.termEn || item.termEnglish || '';
          const unitLabel = item.unit || item.unitId || '';

          return (
            <div
              key={item.id}
              className="bg-white border border-gray-200 hover:border-blue-300 rounded-3xl p-5 shadow-sm transition-all hover:-translate-y-0.5 space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-gray-900">{ar}</h3>
                  <span className="text-xs font-mono text-[#1D4ED8] font-bold">{en}</span>
                </div>
                <button
                  onClick={() => handleCopy(item.id, `${ar} (${en}): ${item.definition}`)}
                  className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:text-gray-700 border border-gray-200 transition-colors"
                  title="نسخ التعريف"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                {item.definition}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-gray-400">
                <span className="px-2 py-0.5 bg-blue-50 text-[#1D4ED8] font-bold rounded-md font-mono">
                  {unitLabel}
                </span>
                <span className="font-mono text-gray-400 font-bold">#be7ery</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-3xl space-y-2">
          <Sparkles className="w-8 h-8 text-amber-500 mx-auto opacity-60" />
          <h4 className="font-bold text-gray-900">لم يتم العثور على مصطلح مطابق</h4>
          <p className="text-xs text-gray-500">جرب البحث بكلمات مختلفة أو اسم المصطلح بالإنجليزية</p>
        </div>
      )}
    </div>
  );
};
