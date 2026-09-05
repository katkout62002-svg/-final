import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  X, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Share2, 
  ArrowLeft,
  FileCode,
  Globe2
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallApkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallApkModal: React.FC<InstallApkModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isAndroid, isIOS, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'android' | 'exportApk' | 'ios'>('android');
  const [isInstalling, setIsInstalling] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.origin;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectInstall = async () => {
    setIsInstalling(true);
    try {
      await install();
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-gray-900/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      dir="rtl"
    >
      <div className="bg-white border border-gray-200 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/15 text-white rounded-2xl backdrop-blur-xs border border-white/20 shadow-sm">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">
                  تثبيت المنصة كتطبيق أندرويد (APK)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                  Android & WebAPK
                </span>
              </div>
              <p className="text-xs text-blue-100/80 mt-0.5">
                تثبيت سريع وخفيف على هواتف الطلاب للعمل بدون إنترنت
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-100 px-4 pt-2 bg-gray-50/70">
          <button
            onClick={() => setActiveTab('android')}
            className={`pb-3 px-3 text-xs font-black border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'android'
                ? 'border-[#1D4ED8] text-[#1D4ED8]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>تثبيت مباشر على الهاتف (WebAPK)</span>
          </button>

          <button
            onClick={() => setActiveTab('exportApk')}
            className={`pb-3 px-3 text-xs font-black border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'exportApk'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <FileCode className="w-4 h-4 text-indigo-600" />
            <span>توليد ملف APK جاهز للتوزيع</span>
          </button>

          <button
            onClick={() => setActiveTab('ios')}
            className={`pb-3 px-3 text-xs font-black border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'ios'
                ? 'border-gray-800 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>أجهزة iPhone</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* TAB 1: DIRECT ANDROID / WEBAPK INSTALL */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              {/* Status Banner */}
              {isInstalled ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-900">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-black">التطبيق مثبت بالفعل على جهازك!</h4>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      أنت الآن تستخدم المنصة في وضع التطبيق المستقل (Standalone App).
                    </p>
                  </div>
                </div>
              ) : isInstallable ? (
                <div className="p-4.5 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-white border border-blue-200 text-right space-y-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-[#1D4ED8] text-white rounded-xl">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-black text-gray-900">
                        جاهز للتثبيت الفوري بضغطة واحدة!
                      </h4>
                      <p className="text-xs text-gray-500">
                        سيتم إنشاء وتثبيت التطبيق رسمياً كـ WebAPK على هاتفك.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleDirectInstall}
                    disabled={isInstalling}
                    className="w-full py-3 px-4 bg-[#1D4ED8] hover:bg-blue-800 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isInstalling ? 'جاري التثبيت...' : 'تثبيت التطبيق الآن على الهاتف (Install APK)'}</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-right space-y-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-[#1D4ED8]" />
                    <h4 className="text-sm font-black text-gray-900">
                      طريقة التثبيت على هواتف الأندرويد (Google Chrome):
                    </h4>
                  </div>
                  <ol className="text-xs text-gray-700 space-y-2 leading-relaxed pr-4 list-decimal">
                    <li>
                      افتح رابط المنصة على هاتفك باستخدام متصفح <strong>Google Chrome</strong>.
                    </li>
                    <li>
                      اضغط على زر القائمة في أعلى المتصفح (الثلاث نقاط <strong>⋮</strong>).
                    </li>
                    <li>
                      اختر <strong>"تثبيت التطبيق"</strong> أو <strong>"الإضافة إلى الشاشة الرئيسية"</strong> (Add to Home screen).
                    </li>
                    <li>
                      اضغط <strong>"تثبيت"</strong> — سيظهر التطبيق فوراً في شاشة هاتفك مع أيقونة مستر بحيري ويعمل بدون شريط المتصفح وبدون إنترنت!
                    </li>
                  </ol>
                </div>
              )}

              {/* App Features List */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900 font-bold">يعمل بدون إنترنت</strong>
                    <span className="text-[11px] text-gray-500">تصفح الدروس والمذكرات في أي وقت.</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900 font-bold">حجم خفيف جداً</strong>
                    <span className="text-[11px] text-gray-500">أقل من 2 ميجابايت ولا يستهلك ذاكرة الهاتف.</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900 font-bold">تحديثات تلقائية</strong>
                    <span className="text-[11px] text-gray-500">أي درس يضيفه الأستاذ يتحدث فورياً.</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900 font-bold">أيقونة مستقلة</strong>
                    <span className="text-[11px] text-gray-500">تفتح كأي تطبيق أصلي من قائمة التطبيقات.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXPORT RAW APK FILE FOR DISTRIBUTION */}
          {activeTab === 'exportApk' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-right space-y-2">
                <div className="flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-indigo-700" />
                  <h4 className="text-sm font-black text-indigo-950">
                    كيفية تنزيل ملف APK لتوزيعه على الطلاب (عبر الواتساب أو التليجرام):
                  </h4>
                </div>
                <p className="text-xs text-indigo-900/80 leading-relaxed">
                  المنصة مجهزة بملف <strong>Manifest و Service Worker وأيقونات عالية الدقة</strong> متوافقة 100% مع أداة <strong>PWABuilder</strong> الرسمية من مايكروسوفت أو <strong>Google Bubblewrap</strong> لتحويلها لملف <strong>.apk</strong> جاهز بضغطة واحدة:
                </p>
              </div>

              {/* Steps Box */}
              <div className="p-4 bg-white border border-gray-200 rounded-2xl space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center font-bold shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <strong className="text-gray-900 block font-bold">انسخ رابط المنصة:</strong>
                    <div className="mt-1.5 flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={currentUrl}
                        className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-[11px] font-mono text-gray-700 select-all"
                      />
                      <button
                        onClick={handleCopyLink}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                      >
                        {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-gray-100">
                  <span className="w-6 h-6 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center font-bold shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <strong className="text-gray-900 block font-bold">افتح موقع PWABuilder المجاني:</strong>
                    <p className="text-gray-500 mt-0.5">
                      ضع الرابط في الموقع واضغط Start، وسيفحص المنصة ويعطيك درجة 100% للتثبيت.
                    </p>
                    <a
                      href="https://www.pwabuilder.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      <span>فتح موقع PWABuilder</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-gray-100">
                  <span className="w-6 h-6 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center font-bold shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <strong className="text-gray-900 block font-bold">تحميل حزمة الأندرويد (.apk):</strong>
                    <p className="text-gray-500 mt-0.5">
                      اضغط على زر <strong>"Package For Android"</strong> وسيقوم بتوليد ملف <strong>APK</strong> و <strong>AAB</strong> قابل للتثبيت المباشر على أي هاتف ونشره على Google Play إن أردت!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IOS SAFARI GUIDE */}
          {activeTab === 'ios' && (
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 text-right text-xs">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-gray-800" />
                <h4 className="text-sm font-black text-gray-900">
                  طريقة التثبيت على هواتف آيفون (Safari):
                </h4>
              </div>

              <ol className="text-xs text-gray-700 space-y-2 leading-relaxed pr-4 list-decimal">
                <li>
                  افتح رابط المنصة في متصفح <strong>Safari</strong> على جهاز iPhone أو iPad.
                </li>
                <li>
                  اضغط على زر <strong>المشاركة (Share)</strong> <Share2 className="w-3.5 h-3.5 inline mx-1 text-blue-600" /> في أسفل شاشة المتصفح.
                </li>
                <li>
                  مرر للأسفل واضغط على <strong>"إضافة إلى الصفحة الرئيسية"</strong> (Add to Home Screen).
                </li>
                <li>
                  اضغط على <strong>"إضافة" (Add)</strong> في الزاوية العلوية، وسيظهر التطبيق على شاشتك فورياً.
                </li>
              </ol>
            </div>
          )}

          {/* Direct Share Bar */}
          <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-blue-900 font-bold">
              <Globe2 className="w-4 h-4 text-[#1D4ED8]" />
              <span>مشاركة رابط المنصة مع الطلاب:</span>
            </div>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-white hover:bg-blue-50 text-[#1D4ED8] border border-blue-200 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم نسخ الرابط' : 'نسخ رابط المنصة'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3 text-xs">
          <span className="text-gray-500 text-[11px]">
            منصة البرمجة والذكاء الاصطناعي • مستر بحيري
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
