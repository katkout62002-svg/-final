import React, { useState } from 'react';
import { 
  Activity, 
  Smartphone, 
  Globe2, 
  X, 
  Laptop, 
  Clock, 
  ShieldCheck, 
  RefreshCw, 
  Database, 
  UserPlus, 
  GraduationCap, 
  Building2, 
  MapPin, 
  Users, 
  Edit3, 
  Award, 
  CheckCircle2, 
  Lock, 
  KeyRound 
} from 'lucide-react';
import { 
  DeviceVisitRecord, 
  GlobalVisitStats 
} from '../services/visitTracker';

interface VisitCounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  globalStats: GlobalVisitStats | null;
  deviceStats: DeviceVisitRecord | null;
  isConnected: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  onOpenRegisterProfile: () => void;
  onOpenAdminLog: () => void;
}

export const VisitCounterModal: React.FC<VisitCounterModalProps> = ({
  isOpen,
  onClose,
  globalStats,
  deviceStats,
  isConnected,
  isLoading,
  onRefresh,
  onOpenRegisterProfile,
  onOpenAdminLog,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'adminInfo'>('overview');

  if (!isOpen) return null;

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'الآن';
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('ar-EG', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(date);
    } catch {
      return isoString;
    }
  };

  const hasProfile = !!(deviceStats?.isRegistered || deviceStats?.fullName);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-gray-900/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      dir="rtl"
    >
      <div className="bg-white border border-gray-200 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#1D4ED8] text-white rounded-2xl shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-gray-900">
                  إحصائيات الزيارات
                </h3>
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isConnected 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  {isConnected ? 'البيانات متصلة' : 'جاري التحديث'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 font-sans">
                تتبع دقيق ومباشر لعدد الزيارات ومعدل استخدام المنصة
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

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100 px-5 pt-2 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 text-xs font-black border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-[#1D4ED8] text-[#1D4ED8]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>عداد الزيارات وهذا الجهاز</span>
          </button>

          <button
            onClick={() => setActiveTab('adminInfo')}
            className={`pb-3 px-3 text-xs font-black border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'adminInfo'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Lock className="w-4 h-4 text-indigo-600" />
            <span>سجل الزوار الكامل (خاص بالمعلم 🔒)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[75vh]">
          {activeTab === 'overview' ? (
            <>
              {/* Top Metrics: 3 Columns */}
              <div className="grid grid-cols-3 gap-2.5">
                {/* Total Visits */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 relative overflow-hidden text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-blue-900">إجمالي الزيارات</span>
                    <Globe2 className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#1D4ED8] font-mono">
                      {(globalStats?.totalVisits || 1).toLocaleString('ar-EG')}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500">مرة</span>
                  </div>
                </div>

                {/* Unique Devices */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/40 border border-purple-100 relative overflow-hidden text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-purple-900">الأجهزة الفريدة</span>
                    <Smartphone className="w-3.5 h-3.5 text-purple-700" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-purple-700 font-mono">
                      {(globalStats?.uniqueDevices || 1).toLocaleString('ar-EG')}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500">جهاز</span>
                  </div>
                </div>

                {/* Registered Students */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/40 border border-emerald-100 relative overflow-hidden text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-900">الطلاب المسجلين</span>
                    <Users className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-emerald-700 font-mono">
                      {((globalStats?.registeredStudentsCount || (hasProfile ? 1 : 0))).toLocaleString('ar-EG')}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500">طالب</span>
                  </div>
                </div>
              </div>

              {/* Student/Visitor Profile Banner / Card */}
              {hasProfile ? (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-white border border-blue-200 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-blue-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-[#1D4ED8] text-white rounded-xl">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-900">
                          بيانات الطالب المسجل لهذا الجهاز
                        </h4>
                        <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                          محفوظ ومزامَن في قاعدة البيانات
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={onOpenRegisterProfile}
                      className="px-3 py-1 bg-white hover:bg-blue-50 text-[#1D4ED8] border border-blue-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>تعديل البيانات</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    {/* Name */}
                    <div className="p-2.5 bg-white rounded-xl border border-gray-100 col-span-2">
                      <span className="text-[10px] text-gray-400 block font-bold">الاسم:</span>
                      <span className="font-black text-gray-900 text-xs">
                        {deviceStats?.fullName}
                      </span>
                    </div>

                    {/* Age */}
                    <div className="p-2.5 bg-white rounded-xl border border-gray-100">
                      <span className="text-[10px] text-gray-400 block font-bold">السن:</span>
                      <span className="font-black text-gray-900 text-xs font-mono">
                        {deviceStats?.age} سنة
                      </span>
                    </div>

                    {/* Educational Admin */}
                    <div className="p-2.5 bg-white rounded-xl border border-gray-100 col-span-2">
                      <span className="text-[10px] text-gray-400 block font-bold">الإدارة التعليمية:</span>
                      <span className="font-bold text-purple-900 text-xs">
                        {deviceStats?.educationalAdmin}
                      </span>
                    </div>

                    {/* School */}
                    <div className="p-2.5 bg-white rounded-xl border border-gray-100 col-span-2">
                      <span className="text-[10px] text-gray-400 block font-bold">اسم المدرسة:</span>
                      <span className="font-bold text-blue-900 text-xs">
                        {deviceStats?.schoolName}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-right flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-black text-amber-900">
                      لم تقم بتسجيل بياناتك كطالب بعد
                    </h4>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      سجل اسمك وسنك ومدرستك وإدارتك التعليمية لتصل للأستاذ مباشرة.
                    </p>
                  </div>
                  <button
                    onClick={onOpenRegisterProfile}
                    className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shrink-0 shadow-xs cursor-pointer"
                  >
                    تسجيل الآن
                  </button>
                </div>
              )}

              {/* Device Specific Info Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-right space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-slate-700" />
                    <span className="text-xs font-black text-slate-900">بيانات جهازك الحالي</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    ID: {deviceStats?.deviceId ? `${deviceStats.deviceId.slice(0, 10)}...` : 'محلي'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold">زياراتك من هذا الجهاز:</span>
                    <span className="text-lg font-black text-emerald-700 font-mono">
                      {(deviceStats?.visitCount || 1).toLocaleString('ar-EG')} زيارة
                    </span>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold">نوع الجهاز والنظام:</span>
                    <span className="text-xs font-bold text-slate-800">
                      {deviceStats?.deviceType || 'كمبيوتر'} • {deviceStats?.os || 'متصفح'}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>أول زيارة: {formatDate(deviceStats?.firstVisitAt)}</span>
                  </div>
                  <span>آخر زيارة: {formatDate(deviceStats?.lastVisitAt)}</span>
                </div>
              </div>

              {/* Admin Gate Banner */}
              <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl flex items-center justify-between gap-3 shadow-md border border-indigo-800/40">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-600/50 rounded-xl border border-indigo-400/30">
                    <ShieldCheck className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-black text-white">
                        لوحة تحكم وسجل زوار المعلم (Admin)
                      </h5>
                      <span className="text-[9px] bg-indigo-500/40 border border-indigo-400/30 text-indigo-200 px-1.5 py-0.2 rounded font-mono">
                        محمي بكلمة مرور 🔒
                      </span>
                    </div>
                    <p className="text-[11px] text-blue-200/90 mt-0.5">
                      استعراض أسماء جميع الطلاب المسجلين ومدارسهم وتصديرها لـ Excel.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenAdminLog();
                  }}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>دخول المعلم</span>
                </button>
              </div>
            </>
          ) : (
            /* Admin Gate tab: Inform that registry is protected */
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-black text-gray-900">
                  سجل بيانات الطلاب محمي وخاص بالمعلم (Admin)
                </h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                  حفاظاً على خصوصية بيانات الطلاب وأرقام المدارس، تم قفل السجل الكامل بكلمة مرور. يحق فقط لمستر بحيري / المعلم استعراض وتنزيل قائمة الطلاب المسجلين.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdminLog();
                  }}
                  className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-2xl text-xs font-black inline-flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>إدخال كلمة المرور وفتح السجل</span>
                </button>
              </div>
            </div>
          )}

          {/* Database Info */}
          <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-3">
            <Database className="w-4 h-4 text-[#1D4ED8] mt-0.5 shrink-0" />
            <div className="text-xs text-blue-900 leading-relaxed">
              <span className="font-bold block mb-0.5">
                حفظ وإحصاء سحابي آمن:
              </span>
              يتم تحديث إحصائيات الزيارات تلقائياً وبشكل مشفر وسحابي لضمان دقة وتكامل الإحصائيات.
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3 text-xs">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 font-bold rounded-xl border border-gray-200 flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#1D4ED8] ${isLoading ? 'animate-spin' : ''}`} />
            <span>تحديث الإحصائيات الآن</span>
          </button>

          <div className="flex items-center gap-2">
            {!hasProfile && (
              <button
                onClick={onOpenRegisterProfile}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                تسجيل بياناتي
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold rounded-xl transition-colors cursor-pointer"
            >
              تم
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
