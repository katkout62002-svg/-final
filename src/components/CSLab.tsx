import React, { useState } from 'react';
import { 
  Binary, 
  Calculator, 
  Cpu, 
  Image as ImageIcon, 
  KeyRound, 
  Layers, 
  CheckCircle2, 
  RefreshCw,
  Sparkles,
  ArrowRightLeft,
  Zap
} from 'lucide-react';

export const CSLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'converter' | 'arithmetic' | 'logic' | 'image' | 'ascii' | 'latch'>('converter');

  // Converter states
  const [decInput, setDecInput] = useState<string>('198');
  const [binInput, setBinInput] = useState<string>('11000110');
  const [hexInput, setHexInput] = useState<string>('C6');

  const handleDecChange = (val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    setDecInput(clean);
    if (!clean) {
      setBinInput('');
      setHexInput('');
      return;
    }
    const num = parseInt(clean, 10);
    setBinInput(num.toString(2));
    setHexInput(num.toString(16).toUpperCase());
  };

  const handleBinChange = (val: string) => {
    const clean = val.replace(/[^01]/g, '');
    setBinInput(clean);
    if (!clean) {
      setDecInput('');
      setHexInput('');
      return;
    }
    const num = parseInt(clean, 2);
    setDecInput(num.toString(10));
    setHexInput(num.toString(16).toUpperCase());
  };

  const handleHexChange = (val: string) => {
    const clean = val.replace(/[^0-9a-fA-F]/g, '').toUpperCase();
    setHexInput(clean);
    if (!clean) {
      setDecInput('');
      setBinInput('');
      return;
    }
    const num = parseInt(clean, 16);
    setDecInput(num.toString(10));
    setBinInput(num.toString(2));
  };

  // Logic Gate Simulator states
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'NOT' | 'HALF_ADDER' | 'FULL_ADDER'>('AND');
  const [inputA, setInputA] = useState<boolean>(true);
  const [inputB, setInputB] = useState<boolean>(false);
  const [inputCin, setInputCin] = useState<boolean>(false);

  // Arithmetic & Complements states
  const [arithNum1, setArithNum1] = useState<string>('0101');
  const [arithNum2, setArithNum2] = useState<string>('0011');
  const [arithOp, setArithOp] = useState<'add' | 'sub' | 'twos'>('add');

  // Image size calculator states
  const [imgWidth, setImgWidth] = useState<number>(1280);
  const [imgHeight, setImgHeight] = useState<number>(720);
  const [colorDepth, setColorDepth] = useState<number>(24);
  const [divisorType, setDivisorType] = useState<'1000' | '1024'>('1000');

  // ASCII Inspector states
  const [asciiInput, setAsciiInput] = useState<string>('Hello #be7ery');

  // Calculations for Image
  const totalPixels = imgWidth * imgHeight;
  const totalBits = totalPixels * colorDepth;
  const totalBytes = totalBits / 8;
  const divFactor = divisorType === '1000' ? 1000 : 1024;
  const totalKB = totalBytes / divFactor;
  const totalMB = totalKB / divFactor;

  // Logic calculation
  const getGateOutput = () => {
    switch (gateType) {
      case 'AND':
        return { out: inputA && inputB ? 1 : 0 };
      case 'OR':
        return { out: inputA || inputB ? 1 : 0 };
      case 'NOT':
        return { out: !inputA ? 1 : 0 };
      case 'HALF_ADDER': {
        const sum = (inputA !== inputB) ? 1 : 0;
        const carry = (inputA && inputB) ? 1 : 0;
        return { sum, carry };
      }
      case 'FULL_ADDER': {
        const a = inputA ? 1 : 0;
        const b = inputB ? 1 : 0;
        const cin = inputCin ? 1 : 0;
        const sum = (a ^ b ^ cin);
        const carry = ((a & b) | (b & cin) | (a & cin));
        return { sum, carry };
      }
      default:
        return { out: 0 };
    }
  };

  const gateResult = getGateOutput();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 bg-gradient-to-br from-[#1D4ED8] to-[#1E40AF] text-white relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              المختبر التفاعلي للبرمجة والذكاء الاصطناعي
            </div>
            <h2 className="text-2xl md:text-3xl font-black">
              محاكيات وأنظمة الحساب الرياضية الرقمية
            </h2>
            <p className="text-sm text-blue-100 mt-1">
              أدوات تفاعلية تطبيقية لشرح التحويلات، العمليات الثنائية، المتممات، البوابات، وحساب أحجام الصور.
            </p>
          </div>
          <div className="px-5 py-2.5 bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl text-center shadow-xs">
            <span className="text-xs text-blue-100 block font-mono">توقيع المادة</span>
            <span className="text-lg font-black text-white font-mono">#be7ery</span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white border border-gray-200 rounded-2xl shadow-2xs">
        {[
          { id: 'converter', label: 'محول الأنظمة العددية', icon: ArrowRightLeft },
          { id: 'arithmetic', label: 'الجمع والطرح والمتممات', icon: Calculator },
          { id: 'logic', label: 'محاكي البوابات وجداول الصواب', icon: Cpu },
          { id: 'image', label: 'حاسبة حجم الصور الرقمية', icon: ImageIcon },
          { id: 'ascii', label: 'محلل نصوص ASCII & Unicode', icon: Binary },
          { id: 'latch', label: 'مستكشف مبدأ LATCH للتصميم', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-[#1D4ED8] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Number Converter */}
      {activeTab === 'converter' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Binary className="w-5 h-5 text-[#1D4ED8]" />
                التحويل الفوري بين الأنظمة (العشري، الثنائي، السادس عشر)
              </h3>

              <div className="space-y-4">
                {/* Decimal */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                    <span>النظام العشري (Decimal - Base 10)</span>
                    <span className="text-[11px] text-[#1D4ED8] font-mono">الأرقام 0 إلى 9</span>
                  </label>
                  <input
                    type="text"
                    value={decInput}
                    onChange={(e) => handleDecChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-lg font-mono text-gray-900 focus:outline-none focus:border-[#1D4ED8] focus:bg-white transition-colors"
                    placeholder="مثال: 198"
                  />
                </div>

                {/* Binary */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                    <span>النظام الثنائي (Binary - Base 2)</span>
                    <span className="text-[11px] text-amber-600 font-mono">0 و 1 فقط</span>
                  </label>
                  <input
                    type="text"
                    value={binInput}
                    onChange={(e) => handleBinChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-lg font-mono text-gray-900 focus:outline-none focus:border-[#1D4ED8] focus:bg-white transition-colors"
                    placeholder="مثال: 11000110"
                  />
                </div>

                {/* Hexadecimal */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                    <span>النظام السادس عشر (Hexadecimal - Base 16)</span>
                    <span className="text-[11px] text-emerald-700 font-mono">0-9 و A-F</span>
                  </label>
                  <input
                    type="text"
                    value={hexInput}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-lg font-mono text-gray-900 focus:outline-none focus:border-[#1D4ED8] focus:bg-white transition-colors uppercase"
                    placeholder="مثال: C6"
                  />
                </div>
              </div>

              {/* Quick Presets */}
              <div className="pt-2">
                <span className="text-xs text-gray-500 block mb-2 font-bold">أمثلة وتطبيقات مستر بحيري:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'C6_16 = 198_10', dec: '198' },
                    { label: '9A_16 = 154_10', dec: '154' },
                    { label: 'A4_16 = 164_10', dec: '164' },
                    { label: '6_10 = 110_2', dec: '6' },
                    { label: '13_10 = 1101_2', dec: '13' },
                    { label: '255_10 = FF_16', dec: '255' },
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDecChange(p.dec)}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-mono rounded-xl border border-gray-200 transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical Step Breakdown */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#1D4ED8]" />
              خطوات الحل الرياضي المفصلة
            </h4>

            {binInput && decInput && (
              <div className="space-y-3 text-xs text-gray-700">
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                  <span className="font-bold text-[#1D4ED8] block">1. التحويل من ثنائي لعشري بقوى العدد 2:</span>
                  <div className="font-mono text-[11px] text-gray-600 leading-relaxed overflow-x-auto p-1">
                    {binInput
                      .split('')
                      .reverse()
                      .map((bit, idx) => `(${bit} × 2^${idx})`)
                      .reverse()
                      .join(' + ')}
                    {' = ' + decInput}
                  </div>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                  <span className="font-bold text-emerald-800 block">2. تقسيم المجموعات السداسية عشرية:</span>
                  <p className="text-gray-500">
                    تقسيم البتات إلى رباعيات بدءاً من اليمين:
                  </p>
                  <div className="font-mono text-[#1D4ED8] text-sm font-bold">
                    {binInput.padStart(Math.ceil(binInput.length / 4) * 4, '0').match(/.{1,4}/g)?.join(' | ')}
                  </div>
                  <div className="font-mono text-amber-700 text-sm font-bold">
                    = {hexInput}_16
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Arithmetic & Complements */}
      {activeTab === 'arithmetic' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#1D4ED8]" />
              حساب العمليات الثنائية والمتممات
            </h3>

            <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-200">
              <button
                onClick={() => setArithOp('add')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  arithOp === 'add' ? 'bg-[#1D4ED8] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                جمع ثنائي (+)
              </button>
              <button
                onClick={() => setArithOp('sub')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  arithOp === 'sub' ? 'bg-[#1D4ED8] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                طرح ثنائي بالمتمم (-)
              </button>
              <button
                onClick={() => setArithOp('twos')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  arithOp === 'twos' ? 'bg-[#1D4ED8] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                مكمل الآحاد والاثنين
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  العدد الثنائي الأول:
                </label>
                <input
                  type="text"
                  value={arithNum1}
                  onChange={(e) => setArithNum1(e.target.value.replace(/[^01]/g, ''))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-lg font-mono text-gray-900 focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                />
              </div>

              {arithOp !== 'twos' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    العدد الثنائي الثاني:
                  </label>
                  <input
                    type="text"
                    value={arithNum2}
                    onChange={(e) => setArithNum2(e.target.value.replace(/[^01]/g, ''))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-lg font-mono text-gray-900 focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Results Box */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              النتيجة وخطوات المعالجة
            </h4>

            {arithOp === 'add' && (
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex justify-between font-mono text-base">
                    <span className="text-gray-500">الناتج الثنائي:</span>
                    <span className="font-bold text-[#1D4ED8]">
                      {(parseInt(arithNum1 || '0', 2) + parseInt(arithNum2 || '0', 2)).toString(2)}_2
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-sm text-gray-500">
                    <span>المعادل العشري:</span>
                    <span className="text-amber-800 font-bold">
                      {parseInt(arithNum1 || '0', 2)} + {parseInt(arithNum2 || '0', 2)} ={' '}
                      {parseInt(arithNum1 || '0', 2) + parseInt(arithNum2 || '0', 2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {arithOp === 'twos' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                  <span className="text-gray-500">مكمل الآحاد (One's Complement):</span>
                  <div className="font-mono text-base font-bold text-amber-700">
                    {arithNum1
                      .split('')
                      .map((b) => (b === '1' ? '0' : '1'))
                      .join('')}_2
                  </div>
                  <p className="text-[11px] text-gray-500">يتم بقلب كل بت (1 تصبح 0 و 0 تصبح 1).</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                  <span className="text-gray-500">المكمل الثنائي / مكمل الاثنين (Two's Complement):</span>
                  <div className="font-mono text-base font-bold text-emerald-700">
                    {(
                      parseInt(
                        arithNum1
                          .split('')
                          .map((b) => (b === '1' ? '0' : '1'))
                          .join('') || '0',
                        2
                      ) + 1
                    ).toString(2).padStart(arithNum1.length, '0')}_2
                  </div>
                  <p className="text-[11px] text-gray-500">يتم بإضافة 1 إلى مكمل الآحاد.</p>
                </div>
              </div>
            )}

            {arithOp === 'sub' && (
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex justify-between font-mono text-sm">
                    <span className="text-gray-500">ناتج الطرح:</span>
                    <span className="font-bold text-[#1D4ED8] font-mono text-base">
                      {Math.max(0, parseInt(arithNum1 || '0', 2) - parseInt(arithNum2 || '0', 2)).toString(2)}_2
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    خطوات الحاسب: إيجاد مكمل الاثنين للعدد المطروح، جمعه مع المطروح منه، وتجاهل الحمل النهائي الفائض (Carry).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Logic Circuit Simulator */}
      {activeTab === 'logic' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#1D4ED8]" />
                محاكي الدوائر المنطقية التفاعلي
              </h3>
            </div>

            {/* Select Gate */}
            <div className="flex flex-wrap gap-2">
              {(['AND', 'OR', 'NOT', 'HALF_ADDER', 'FULL_ADDER'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGateType(g)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    gateType === g
                      ? 'bg-[#1D4ED8] text-white shadow-xs'
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {g === 'HALF_ADDER' ? 'دائرة الجمع النصفي (Half Adder)' : g === 'FULL_ADDER' ? 'دائرة الجمع الكامل (Full Adder)' : `بوابة ${g}`}
                </button>
              ))}
            </div>

            {/* Interactive Inputs */}
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-6">
              <span className="text-xs font-bold text-gray-500 block">المفاتيح والمدخلات الرقمية (اضغط للتبديل بين 0 و 1):</span>
              <div className="flex flex-wrap gap-6 items-center">
                {/* Switch A */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-700 font-mono">المدخل A:</span>
                  <button
                    onClick={() => setInputA(!inputA)}
                    className={`w-14 h-9 rounded-full p-1 transition-colors relative flex items-center ${
                      inputA ? 'bg-[#1D4ED8] justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-white text-gray-900 font-mono font-black text-xs flex items-center justify-center shadow-xs">
                      {inputA ? '1' : '0'}
                    </div>
                  </button>
                </div>

                {/* Switch B */}
                {gateType !== 'NOT' && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-700 font-mono">المدخل B:</span>
                    <button
                      onClick={() => setInputB(!inputB)}
                      className={`w-14 h-9 rounded-full p-1 transition-colors relative flex items-center ${
                        inputB ? 'bg-amber-500 justify-end' : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-white text-gray-900 font-mono font-black text-xs flex items-center justify-center shadow-xs">
                        {inputB ? '1' : '0'}
                      </div>
                    </button>
                  </div>
                )}

                {/* Switch Cin for Full Adder */}
                {gateType === 'FULL_ADDER' && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-700 font-mono">الحمل Cin:</span>
                    <button
                      onClick={() => setInputCin(!inputCin)}
                      className={`w-14 h-9 rounded-full p-1 transition-colors relative flex items-center ${
                        inputCin ? 'bg-emerald-600 justify-end' : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-white text-gray-900 font-mono font-black text-xs flex items-center justify-center shadow-xs">
                        {inputCin ? '1' : '0'}
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Output Display */}
              <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center gap-6">
                {'out' in gateResult && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-700 font-mono">المخرج النهائي (X):</span>
                    <div
                      className={`px-5 py-2 rounded-2xl font-mono text-xl font-black border ${
                        gateResult.out === 1
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}
                    >
                      {gateResult.out}
                    </div>
                  </div>
                )}

                {'sum' in gateResult && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-700 font-mono">المجموع (Sum / S):</span>
                      <div
                        className={`px-4 py-2 rounded-2xl font-mono text-lg font-black border ${
                          gateResult.sum === 1
                            ? 'bg-blue-50 text-[#1D4ED8] border-blue-200'
                            : 'bg-gray-100 text-gray-500 border-gray-200'
                        }`}
                      >
                        {gateResult.sum}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-700 font-mono">الحمل (Carry / C):</span>
                      <div
                        className={`px-4 py-2 rounded-2xl font-mono text-lg font-black border ${
                          gateResult.carry === 1
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-gray-100 text-gray-500 border-gray-200'
                        }`}
                      >
                        {gateResult.carry}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Truth Table */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-gray-900">
              جدول الصواب (Truth Table) للبوابة
            </h4>

            {gateType === 'AND' && (
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="py-2">A</th>
                    <th className="py-2">B</th>
                    <th className="py-2">X = A . B</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono">
                  {[
                    [0, 0, 0],
                    [0, 1, 0],
                    [1, 0, 0],
                    [1, 1, 1],
                  ].map(([a, b, x], idx) => {
                    const isSelected = (inputA ? 1 : 0) === a && (inputB ? 1 : 0) === b;
                    return (
                      <tr key={idx} className={isSelected ? 'bg-blue-50 text-[#1D4ED8] font-bold' : 'text-gray-700'}>
                        <td className="py-2">{a}</td>
                        <td className="py-2">{b}</td>
                        <td className="py-2 font-black">{x}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {gateType === 'OR' && (
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="py-2">A</th>
                    <th className="py-2">B</th>
                    <th className="py-2">X = A + B</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono">
                  {[
                    [0, 0, 0],
                    [0, 1, 1],
                    [1, 0, 1],
                    [1, 1, 1],
                  ].map(([a, b, x], idx) => {
                    const isSelected = (inputA ? 1 : 0) === a && (inputB ? 1 : 0) === b;
                    return (
                      <tr key={idx} className={isSelected ? 'bg-blue-50 text-[#1D4ED8] font-bold' : 'text-gray-700'}>
                        <td className="py-2">{a}</td>
                        <td className="py-2">{b}</td>
                        <td className="py-2 font-black">{x}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {gateType === 'HALF_ADDER' && (
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="py-2">A</th>
                    <th className="py-2">B</th>
                    <th className="py-2">Sum (S)</th>
                    <th className="py-2">Carry (C)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono">
                  {[
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [1, 0, 1, 0],
                    [1, 1, 0, 1],
                  ].map(([a, b, s, c], idx) => {
                    const isSelected = (inputA ? 1 : 0) === a && (inputB ? 1 : 0) === b;
                    return (
                      <tr key={idx} className={isSelected ? 'bg-blue-50 text-[#1D4ED8] font-bold' : 'text-gray-700'}>
                        <td className="py-2">{a}</td>
                        <td className="py-2">{b}</td>
                        <td className="py-2 font-bold">{s}</td>
                        <td className="py-2 font-bold">{c}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Image Size Calculator */}
      {activeTab === 'image' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#1D4ED8]" />
              حاسبة حجم ملفات الصور الرقمية
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  العرض (Pixels Width):
                </label>
                <input
                  type="number"
                  value={imgWidth}
                  onChange={(e) => setImgWidth(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 font-mono text-gray-900 focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  الارتفاع (Pixels Height):
                </label>
                <input
                  type="number"
                  value={imgHeight}
                  onChange={(e) => setImgHeight(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 font-mono text-gray-900 focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  عمق اللون (Color Depth):
                </label>
                <select
                  value={colorDepth}
                  onChange={(e) => setColorDepth(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                >
                  <option value={1}>1 Bit (أبيض وأسود)</option>
                  <option value={8}>8 Bits (256 لون / تدرج رمادي)</option>
                  <option value={24}>24 Bits (ألوان كاملة Full Color - 16.7 مليون لون)</option>
                  <option value={32}>32 Bits (ألوان كاملة + شفافية Alpha)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  معامل القسمة للكيلوبايت:
                </label>
                <select
                  value={divisorType}
                  onChange={(e) => setDivisorType(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                >
                  <option value="1000">1000 (كما في أمثلة المقرر المدرسية)</option>
                  <option value="1024">1024 (المعيار الثنائي الدقيق)</option>
                </select>
              </div>
            </div>

            {/* Presets from book */}
            <div className="pt-2">
              <span className="text-xs text-gray-500 block mb-2 font-bold">مسائل وتطبيقات مستر بحيري الجاهزة:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setImgWidth(600);
                    setImgHeight(800);
                    setColorDepth(8);
                  }}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs rounded-xl border border-gray-200"
                >
                  600 × 800 (8-bit) = 480 KB
                </button>
                <button
                  onClick={() => {
                    setImgWidth(1280);
                    setImgHeight(720);
                    setColorDepth(24);
                  }}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs rounded-xl border border-gray-200"
                >
                  1280 × 720 (24-bit) = 2.76 MB
                </button>
                <button
                  onClick={() => {
                    setImgWidth(1920);
                    setImgHeight(1080);
                    setColorDepth(24);
                  }}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs rounded-xl border border-gray-200"
                >
                  1920 × 1080 (24-bit) = 6.22 MB
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-gray-900">
              خطوات الحساب التراكمية
            </h4>

            <div className="space-y-2.5 text-xs text-gray-700 font-mono">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-gray-500 block text-[11px]">1. إجمالي البكسلات:</span>
                <span className="text-[#1D4ED8] font-bold">{totalPixels.toLocaleString()} Pixels</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-gray-500 block text-[11px]">2. الحجم بالبت (Bits):</span>
                <span className="text-amber-700 font-bold">{totalBits.toLocaleString()} Bits</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-gray-500 block text-[11px]">3. الحجم بالبايت (Bytes):</span>
                <span className="text-emerald-700 font-bold">{totalBytes.toLocaleString()} Bytes</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-gray-500 block text-[11px]">4. الحجم النهائي بالميجابايت:</span>
                <span className="text-rose-700 text-lg font-black">{totalMB.toFixed(2)} MB</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: ASCII Inspector */}
      {activeTab === 'ascii' && (
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Binary className="w-5 h-5 text-[#1D4ED8]" />
              محلل نصوص وترميز الأحرف (ASCII & Unicode Inspector)
            </h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              اكتب أي نص لتحليله إلى كود ASCII وسادس عشر وثنائي:
            </label>
            <input
              type="text"
              value={asciiInput}
              onChange={(e) => setAsciiInput(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-base text-gray-900 font-mono focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="py-2.5 px-3">الحرف (Char)</th>
                  <th className="py-2.5 px-3">العشري (Decimal)</th>
                  <th className="py-2.5 px-3">السادس عشر (Hex)</th>
                  <th className="py-2.5 px-3">الثنائي 8-Bit (Binary)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono">
                {asciiInput.split('').map((char, idx) => {
                  const code = char.charCodeAt(0);
                  const hex = code.toString(16).toUpperCase().padStart(2, '0');
                  const bin = code.toString(2).padStart(8, '0');
                  return (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-2.5 px-3 font-bold text-amber-700 text-sm">{char === ' ' ? '(مسافة)' : char}</td>
                      <td className="py-2.5 px-3 text-gray-700">{code}</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-bold">{hex}</td>
                      <td className="py-2.5 px-3 text-[#1D4ED8]">{bin}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: LATCH Information Design Explorer */}
      {activeTab === 'latch' && (
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#1D4ED8]" />
              مستكشف طرق تصنيف البيانات الخمسة (LATCH Principle)
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              مبدأ LATCH الشهير المذكور بالوحدة السادسة في مذكرات مستر بحيري لتنظيم وعرض المعلومات للمستخدمين بسهولة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                letter: 'L',
                name: 'Location (الموقع)',
                desc: 'التنظيم وفق المكان الجغرافي أو المادي.',
                example: 'خريطة فصول المدرسة وتوزيع المعامل.',
                color: 'border-blue-200 bg-blue-50/50 text-[#1D4ED8]',
              },
              {
                letter: 'A',
                name: 'Alphabet (الأبجدية)',
                desc: 'الترتيب الهجائي أو الأبجدي.',
                example: 'أسماء الطلاب في كشف الحضور.',
                color: 'border-blue-200 bg-blue-50/50 text-[#1D4ED8]',
              },
              {
                letter: 'T',
                name: 'Time (الوقت)',
                desc: 'التنظيم الزمني والتسلسلي للأحداث.',
                example: 'جدول الحصص الأسبوعي ومراحل المشروع.',
                color: 'border-amber-200 bg-amber-50/50 text-amber-800',
              },
              {
                letter: 'C',
                name: 'Category (الفئة)',
                desc: 'التصنيف حسب نوع وشبه الخصائص.',
                example: 'تقسيم الكتب (علوم، لغات، تاريخ).',
                color: 'border-emerald-200 bg-emerald-50/50 text-emerald-800',
              },
              {
                letter: 'H',
                name: 'Hierarchy (الهرمية)',
                desc: 'التصنيف حسب الحجم، الرتبة، أو الأهمية.',
                example: 'الهيكل التنظيمي للمدرسة (مدير -> وكيل -> معلم).',
                color: 'border-rose-200 bg-rose-50/50 text-rose-800',
              },
            ].map((item) => (
              <div key={item.letter} className={`p-4 rounded-2xl border ${item.color} space-y-2`}>
                <div className="text-2xl font-black font-mono">{item.letter}</div>
                <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                <div className="text-[11px] font-semibold text-gray-800 bg-white p-2 rounded-xl border border-gray-200">
                  مثال: {item.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
