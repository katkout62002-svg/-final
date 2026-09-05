import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  KeyRound, 
  X, 
  Eye, 
  EyeOff, 
  Download, 
  Search, 
  GraduationCap, 
  Building2, 
  MapPin, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  SlidersHorizontal,
  FileSpreadsheet,
  Users
} from 'lucide-react';
import { VisitorProfile, fetchAllRegisteredVisitors } from '../services/visitTracker';
import { 
  verifyAdminPassword, 
  updateAdminPassword, 
  isAdminAuthenticated, 
  setAdminAuthenticated, 
  DEFAULT_ADMIN_PASS,
  hasCustomAdminPassword,
  resetAdminPasswordToDefault
} from '../services/adminAuth';

interface AdminVisitorLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalVisitsCount?: number;
}

export const AdminVisitorLogModal: React.FC<AdminVisitorLogModalProps> = ({
  isOpen,
  onClose,
  totalVisitsCount,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Data state
  const [visitors, setVisitors] = useState<VisitorProfile[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAdminFilter, setSelectedAdminFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'visits' | 'name'>('date');

  // Change password modal state
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const [newPasswordInput, setNewPasswordInput] = useState<string>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');
  const [passChangeSuccess, setPassChangeSuccess] = useState<boolean>(false);
  const [passChangeError, setPassChangeError] = useState<string | null>(null);

  // Check existing session
  useEffect(() => {
    if (isOpen) {
      const alreadyAuth = isAdminAuthenticated();
      setIsAuthenticated(alreadyAuth);
      if (alreadyAuth) {
        loadData();
      }
    }
  }, [isOpen]);

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const list = await fetchAllRegisteredVisitors();
      setVisitors(list);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsVerifying(true);

    try {
      const ok = await verifyAdminPassword(passwordInput);
      if (ok) {
        setAdminAuthenticated(true);
        setIsAuthenticated(true);
        setPasswordInput('');
        loadData();
      } else {
        setAuthError('كلمة المرور غير صحيحة! يرجى التأكد والمحاولة مجدداً.');
      }
    } catch {
      setAuthError('حدث خطأ أثناء فحص كلمة المرور.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassChangeError(null);

    if (newPasswordInput.length < 4) {
      setPassChangeError('يجب أن تكون كلمة المرور 4 أحرف أو أرقام على الأقل.');
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setPassChangeError('كلمتا المرور غير متطابقتين!');
      return;
    }

    try {
      await updateAdminPassword(newPasswordInput);
      setPassChangeSuccess(true);
      setTimeout(() => {
        setIsChangingPassword(false);
        setPassChangeSuccess(false);
        setNewPasswordInput('');
        setConfirmPasswordInput('');
      }, 1500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'فشل تغيير كلمة المرور';
      setPassChangeError(message);
    }
  };

  const handleResetPassword = () => {
    if (confirm('هل تريد إعادة تعيين كلمة المرور إلى الافتراضية؟')) {
      resetAdminPasswordToDefault();
      alert('تمت إعادة تعيين كلمة المرور إلى الافتراضية بنجاح.');
      setIsChangingPassword(false);
    }
  };

  // Export data to CSV with UTF-8 BOM for Arabic Excel
  const handleExportCSV = () => {
    if (visitors.length === 0) {
      alert('لا توجد بيانات متاحة للتصدير حالياً.');
      return;
    }

    const headers = ['م', 'اسم الطالب', 'السن', 'الإدارة التعليمية', 'اسم المدرسة', 'عدد الزيارات', 'تاريخ التسجيل'];
    const rows = visitors.map((v, i) => [
      i + 1,
      `"${(v.fullName || '').replace(/"/g, '""')}"`,
      v.age || '',
      `"${(v.educationalAdmin || '').replace(/"/g, '""')}"`,
      `"${(v.schoolName || '').replace(/"/g, '""')}"`,
      v.visitCount || 1,
      `"${v.registeredAt ? new Date(v.registeredAt).toLocaleDateString('ar-EG') : ''}"`
    ]);

    const csvContent = '\uFEFF' + [
      headers.join(','),
      ...rows.map((r) => r.join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `سجل_طلاب_مستر_بحيري_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Educational admins list for dropdown
  const adminOptions = useMemo(() => {
    const set = new Set<string>();
    visitors.forEach((v) => {
      if (v.educationalAdmin) set.add(v.educationalAdmin);
    });
    return Array.from(set);
  }, [visitors]);

  // Unique schools count
  const uniqueSchoolsCount = useMemo(() => {
    const set = new Set<string>();
    visitors.forEach((v) => {
      if (v.schoolName) set.add(v.schoolName.trim().toLowerCase());
    });
    return set.size;
  }, [visitors]);

  // Filtered and sorted visitors
  const filteredVisitors = useMemo(() => {
    return visitors
      .filter((v) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = !q || 
          (v.fullName && v.fullName.toLowerCase().includes(q)) ||
          (v.schoolName && v.schoolName.toLowerCase().includes(q)) ||
          (v.educationalAdmin && v.educationalAdmin.toLowerCase().includes(q));

        const matchesAdmin = selectedAdminFilter === 'all' || v.educationalAdmin === selectedAdminFilter;

        return matchesQuery && matchesAdmin;
      })
      .sort((a, b) => {
        if (sortBy === 'visits') {
          return (b.visitCount || 0) - (a.visitCount || 0);
        }
        if (sortBy === 'name') {
          return (a.fullName || '').localeCompare(b.fullName || '', 'ar');
        }
        // Default: date
        const timeA = new Date(a.registeredAt || a.lastVisitAt || 0).getTime();
        const timeB = new Date(b.registeredAt || b.lastVisitAt || 0).getTime();
        return timeB - timeA;
      });
  }, [visitors, searchQuery, selectedAdminFilter, sortBy]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-gray-900/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      dir="rtl"
    >
      <div className="bg-white border border-gray-200 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">
                  سجل بيانات الطلاب والزوار (خاص بالمعلم / Admin)
                </h3>
                {isAuthenticated && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    تم التحقق • صلاحية الإدارة
                  </span>
                )}
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                قاعدة بيانات سرية وتوثيق لحظي لجميع زيارات وأسماء الطلاب
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="قفل السجل وتسجيل الخروج"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">قفل السجل</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 bg-slate-50/50">
          {!isAuthenticated ? (
            /* PASSWORD LOGIN GATE */
            <div className="max-w-md mx-auto my-6 p-6 bg-white rounded-3xl border border-gray-200 shadow-md text-center space-y-5">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1D4ED8]">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-lg font-black text-gray-900">
                  منطقة المعلم المحمية 🔒
                </h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  هذا السجل سري وخاص بالأستاذ / مستر بحيري فقط للاطلاع على بيانات الطلاب وإحصائيات المدارس.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-right">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-700 block">
                    أدخل كلمة مرور المعلم:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoFocus
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="كلمة المرور..."
                      className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-gray-900 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                      title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 text-[11px] text-slate-600 text-right leading-relaxed flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>لوحة تحكم وسجل محمي ومخصص للمعلم فقط.</span>
                </div>

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-2.5 px-4 bg-[#1D4ED8] hover:bg-blue-800 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>جاري التحقق...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>فتح سجل الزوار والطلاب</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* ADMIN DASHBOARD CONTENT */
            <div className="space-y-5">
              {/* Top Quick Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Stat 1: Total registered students */}
                <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs text-right">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-[11px] font-bold text-gray-600">الطلاب المسجلين</span>
                    <GraduationCap className="w-4 h-4 text-[#1D4ED8]" />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-black text-gray-900 font-mono">
                      {visitors.length.toLocaleString('ar-EG')}
                    </span>
                    <span className="text-xs text-gray-500 font-bold mr-1">طالب</span>
                  </div>
                </div>

                {/* Stat 2: Unique Schools */}
                <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs text-right">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-[11px] font-bold text-gray-600">المدارس المختلفة</span>
                    <Building2 className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-black text-purple-700 font-mono">
                      {uniqueSchoolsCount.toLocaleString('ar-EG')}
                    </span>
                    <span className="text-xs text-gray-500 font-bold mr-1">مدرسة</span>
                  </div>
                </div>

                {/* Stat 3: Total Visits recorded */}
                <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs text-right">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-[11px] font-bold text-gray-600">إجمالي الزيارات</span>
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-black text-emerald-700 font-mono">
                      {(totalVisitsCount || visitors.reduce((sum, v) => sum + (v.visitCount || 1), 0)).toLocaleString('ar-EG')}
                    </span>
                    <span className="text-xs text-gray-500 font-bold mr-1">زيارة</span>
                  </div>
                </div>

                {/* Stat 4: Educational Directorates */}
                <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs text-right">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-[11px] font-bold text-gray-600">الإدارات التعليمية</span>
                    <MapPin className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-black text-amber-700 font-mono">
                      {adminOptions.length.toLocaleString('ar-EG')}
                    </span>
                    <span className="text-xs text-gray-500 font-bold mr-1">إدارة</span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث باسم الطالب، المدرسة، أو الإدارة..."
                    className="w-full pr-9 pl-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1D4ED8] outline-hidden text-gray-900"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                    >
                      مسح
                    </button>
                  )}
                </div>

                {/* Filters and Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Admin filter dropdown */}
                  <select
                    value={selectedAdminFilter}
                    onChange={(e) => setSelectedAdminFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 font-bold outline-hidden"
                  >
                    <option value="all">جميع الإدارات التعليمية</option>
                    {adminOptions.map((admin) => (
                      <option key={admin} value={admin}>
                        {admin}
                      </option>
                    ))}
                  </select>

                  {/* Sort dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'visits' | 'name')}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 font-bold outline-hidden"
                  >
                    <option value="date">الأحدث تسجيلاً</option>
                    <option value="visits">الأكثر زيارة</option>
                    <option value="name">أبجدياً (أ-ي)</option>
                  </select>

                  {/* Refresh Button */}
                  <button
                    onClick={loadData}
                    disabled={isLoadingData}
                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors cursor-pointer"
                    title="تحديث البيانات من السحابة"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin text-[#1D4ED8]' : ''}`} />
                  </button>

                  {/* Export CSV Button */}
                  <button
                    onClick={handleExportCSV}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    title="تنزيل جدول الطلاب في ملف Excel / CSV"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>تصدير Excel</span>
                  </button>

                  {/* Change Password Trigger */}
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="تغيير كلمة مرور المعلم"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-blue-700" />
                    <span>تغيير كلمة المرور</span>
                  </button>
                </div>
              </div>

              {/* Visitors Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
                {isLoadingData ? (
                  <div className="p-12 text-center text-xs text-gray-500 flex flex-col items-center gap-2">
                    <RefreshCw className="w-6 h-6 text-[#1D4ED8] animate-spin" />
                    <span>جاري جلب أحدث بيانات الطلاب من قاعدة بيانات Firebase...</span>
                  </div>
                ) : filteredVisitors.length === 0 ? (
                  <div className="p-12 text-center text-gray-500 space-y-2">
                    <GraduationCap className="w-8 h-8 text-gray-400 mx-auto" />
                    <p className="text-xs font-bold text-gray-700">
                      لا توجد بيانات مطابقة لبحثك
                    </p>
                    <p className="text-[11px] text-gray-400">
                      عندما يسجل الطلاب أسماءهم ومدارسهم ستظهر هنا فوراً.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-black">
                          <th className="py-3 px-3 w-10 text-center">#</th>
                          <th className="py-3 px-3">اسم الطالب / الزائر</th>
                          <th className="py-3 px-3 text-center">السن</th>
                          <th className="py-3 px-3">اسم المدرسة</th>
                          <th className="py-3 px-3">الإدارة التعليمية</th>
                          <th className="py-3 px-3 text-center">الزيارات</th>
                          <th className="py-3 px-3">تاريخ التسجيل</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredVisitors.map((student, idx) => (
                          <tr 
                            key={student.deviceId || idx}
                            className="hover:bg-blue-50/40 transition-colors"
                          >
                            <td className="py-3 px-3 text-center font-mono font-bold text-gray-400">
                              {idx + 1}
                            </td>
                            <td className="py-3 px-3 font-black text-gray-900">
                              <div className="flex items-center gap-1.5">
                                <GraduationCap className="w-3.5 h-3.5 text-[#1D4ED8]" />
                                <span>{student.fullName}</span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-bold text-gray-700">
                              <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                {student.age || '-'} سنة
                              </span>
                            </td>
                            <td className="py-3 px-3 font-medium text-blue-900">
                              <div className="flex items-center gap-1">
                                <Building2 className="w-3.5 h-3.5 text-blue-500" />
                                <span>{student.schoolName}</span>
                              </div>
                            </td>
                            <td className="py-3 px-3 font-medium text-purple-900">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-purple-500" />
                                <span>{student.educationalAdmin}</span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-black text-emerald-700">
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                                {student.visitCount || 1}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-gray-500 text-[11px] font-sans">
                              {student.registeredAt ? (
                                new Date(student.registeredAt).toLocaleDateString('ar-EG', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })
                              ) : (
                                'مؤخراً'
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Change Password Modal Sub-dialog */}
        {isChangingPassword && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-3xl p-5 w-full max-w-sm border border-gray-200 shadow-2xl space-y-4 text-right">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#1D4ED8]" />
                  <h4 className="text-sm font-black text-gray-900">
                    تغيير كلمة مرور المعلم
                  </h4>
                </div>
                <button
                  onClick={() => setIsChangingPassword(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {passChangeSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>تم حفظ وتحديث كلمة المرور بنجاح!</span>
                </div>
              )}

              {passChangeError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                  {passChangeError}
                </div>
              )}

              <form onSubmit={handleChangePasswordSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-700 block">
                    كلمة المرور الجديدة:
                  </label>
                  <input
                    type="password"
                    required
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="4 أحرف أو أرقام على الأقل"
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1D4ED8] outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-700 block">
                    تأكيد كلمة المرور:
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    placeholder="أعد كتابة كلمة المرور"
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1D4ED8] outline-hidden"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="text-[11px] text-gray-500 hover:text-rose-600 underline"
                  >
                    استعادة الافتراضية
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsChangingPassword(false)}
                      className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-xl"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-black bg-[#1D4ED8] hover:bg-blue-800 text-white rounded-xl shadow-xs"
                    >
                      حفظ التغيير
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3.5 bg-white border-t border-gray-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-gray-500 text-[11px]">
            <Lock className="w-3.5 h-3.5 text-gray-400" />
            <span>بيانات الطلاب محمية ومخزنة سحابياً في Google Firebase Firestore</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
