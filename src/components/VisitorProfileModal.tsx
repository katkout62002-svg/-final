import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  X, 
  GraduationCap, 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Loader2,
  Database,
  Sparkles,
  Award
} from 'lucide-react';
import { DeviceVisitRecord, saveVisitorProfile } from '../services/visitTracker';

interface VisitorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDeviceRecord: DeviceVisitRecord | null;
  onProfileSaved: (updatedRecord: DeviceVisitRecord) => void;
}

export const VisitorProfileModal: React.FC<VisitorProfileModalProps> = ({
  isOpen,
  onClose,
  currentDeviceRecord,
  onProfileSaved,
}) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<number | string>(15);
  const [educationalAdmin, setEducationalAdmin] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  // Sync existing record when opening
  useEffect(() => {
    if (isOpen && currentDeviceRecord) {
      if (currentDeviceRecord.fullName) setFullName(currentDeviceRecord.fullName);
      if (currentDeviceRecord.age) setAge(currentDeviceRecord.age);
      if (currentDeviceRecord.educationalAdmin) setEducationalAdmin(currentDeviceRecord.educationalAdmin);
      if (currentDeviceRecord.schoolName) setSchoolName(currentDeviceRecord.schoolName);
    }
  }, [isOpen, currentDeviceRecord]);

  if (!isOpen) return null;

  const popularAdmins = [
    'إدارة شرق الإسكندرية',
    'إدارة وسط الإسكندرية',
    'إدارة المنتزه أول',
    'إدارة الجيزة التعليمية',
    'إدارة مصر الجديدة',
    'إدارة مدينة نصر',
    'إدارة غرب طنطا',
    'إدارة المنصورة',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || fullName.trim().length < 3) {
      setErrorMessage('يرجى كتابة الاسم ثلاثياً أو ثنائياً على الأقل.');
      return;
    }
    const numAge = Number(age);
    if (isNaN(numAge) || numAge < 10 || numAge > 90) {
      setErrorMessage('يرجى إدخال سن صحيح (بين 10 و 90 عاماً).');
      return;
    }
    if (!educationalAdmin.trim() || educationalAdmin.trim().length < 3) {
      setErrorMessage('يرجى تحديد الإدارة التعليمية التابع لها.');
      return;
    }
    if (!schoolName.trim() || schoolName.trim().length < 3) {
      setErrorMessage('يرجى كتابة اسم المدرسة الثانوية التابع لها.');
      return;
    }

    setIsSubmitting(true);
    try {
      const updated = await saveVisitorProfile({
        fullName: fullName.trim(),
        age: numAge,
        educationalAdmin: educationalAdmin.trim(),
        schoolName: schoolName.trim(),
      });
      setSuccessMessage(true);
      onProfileSaved(updated);
      setTimeout(() => {
        setSuccessMessage(false);
        onClose();
      }, 1400);
    } catch (err) {
      console.error(err);
      setErrorMessage('تعذر حفظ البيانات في قاعدة البيانات السحابية، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-gray-900/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      dir="rtl"
    >
      <div className="bg-white border border-gray-200 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50/80 via-emerald-50/40 to-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#1D4ED8] text-white rounded-2xl shadow-sm">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900">
                تسجيل بيانات الطالب / الزائر
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                تُحفظ بياناتك بشكل آمن وموثّق وترتبط بهذا الجهاز
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto max-h-[75vh]">
          {/* Welcome note */}
          <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-2xl flex items-start gap-2.5 text-xs text-blue-900">
            <Sparkles className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              مرحباً بك يا بطل! سجل بياناتك للانضمام إلى لوحة طلاب مستر بحيري وتخصيص نتائج اختباراتك وشهاداتك باسمك ومدرستك.
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>تم حفظ بياناتك ومزامنتها بنجاح في قاعدة البيانات!</span>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-gray-800 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#1D4ED8]" />
              <span>اسم الطالب / الزائر (رباعي أو ثلاثي):</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="مثال: أحمد محمد علي حسن"
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-gray-900 font-medium"
            />
          </div>

          {/* Age */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-gray-800 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>السن / العمر:</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="10"
                max="90"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-24 px-3.5 py-2.5 text-xs bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-gray-900 font-bold font-mono text-center"
              />
              <span className="text-xs text-gray-500 font-bold">عاماً</span>
              <div className="flex gap-1.5 mr-auto">
                {[15, 16, 17].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAge(preset)}
                    className={`px-2.5 py-1 text-[11px] rounded-lg border font-bold transition-all ${
                      Number(age) === preset 
                        ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]' 
                        : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {preset} سنة
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Educational Administration */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-gray-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-600" />
              <span>الإدارة التعليمية:</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={educationalAdmin}
              onChange={(e) => setEducationalAdmin(e.target.value)}
              placeholder="مثال: إدارة شرق التعليمية / إدارة مصر الجديدة"
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-gray-900 font-medium"
            />
            {/* Quick Suggestions Chips */}
            <div className="pt-1 flex flex-wrap gap-1.5">
              {popularAdmins.slice(0, 4).map((admin) => (
                <button
                  key={admin}
                  type="button"
                  onClick={() => setEducationalAdmin(admin)}
                  className="text-[10px] bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-100 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                >
                  {admin}
                </button>
              ))}
            </div>
          </div>

          {/* School Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-gray-800 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>اسم المدرسة:</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="مثال: مدرسة جمال عبد الناصر الثانوية بنين"
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-gray-900 font-medium"
            />
          </div>

          {/* Database link note */}
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center gap-2 text-[11px] text-gray-600">
            <Database className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
            <span>
              يتم ربط بياناتك السابقة بمعرف هذا الجهاز ({currentDeviceRecord?.deviceId?.substring(0, 12)}...) وتحديثها تلقائياً.
            </span>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-xs font-black text-white bg-[#1D4ED8] hover:bg-blue-800 rounded-xl shadow-xs transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <>
                  <Award className="w-3.5 h-3.5" />
                  <span>حفظ البيانات وتأكيد التسجيل</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
