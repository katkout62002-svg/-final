import { Question } from '../types';

export const UNIT_QUESTIONS: Record<string, Question[]> = {
  'u1-l1': [
    {
      id: 'q-u1l1-1',
      lessonId: 'u1-l1',
      unitId: 'unit-1',
      type: 'mcq',
      questionText: 'أي مما يلي يمثل "المعلومات"؟',
      options: ['الحقائق الخام', 'ما يحمل معنى أو قيمة للمتلقي', 'رموز غير مفهومة', 'أرقام فقط'],
      correctAnswer: 1,
      explanation: 'المعلومات هي البيانات بعد معالجتها وتنظيمها بحيث أصبحت ذات معنى وقيمة وتساعد المتلقي على اتخاذ القرار.',
      pageReference: 8
    },
    {
      id: 'q-u1l1-2',
      lessonId: 'u1-l1',
      unitId: 'unit-1',
      type: 'mcq',
      questionText: 'المعرفة تعني:',
      options: ['نسخ المعلومات', 'تحليل وتنظيم المعلومات لحل المشكلات', 'البيانات الخام', 'الشائعات'],
      correctAnswer: 1,
      explanation: 'المعرفة هي قمة الهرم المعرفي حيث يتم فهم وتحليل المعلومات وتطبيقها لحل المشكلات المعقدة.',
      pageReference: 8
    },
    {
      id: 'q-u1l1-3',
      lessonId: 'u1-l1',
      unitId: 'unit-1',
      type: 'mcq',
      questionText: 'أي من التالي يُعتبر مصدراً للمعلومات الأولية؟',
      options: ['كتاب مدرسي', 'تقرير تجربة شخصية أو ملاحظة ميدانية', 'صحيفة يومية', 'برنامج تلفزيوني'],
      correctAnswer: 1,
      explanation: 'المعلومات الأولية (Primary) هي التي يحصل عليها الشخص بنفسه مباشرة من خلال التجربة والملاحظة والاستبيانات الميدانية.',
      pageReference: 8
    },
    {
      id: 'q-u1l1-4',
      lessonId: 'u1-l1',
      unitId: 'unit-1',
      type: 'mcq',
      questionText: 'وسائط النقل أو الإرسال تتضمن:',
      options: ['أقراص DVD', 'التلفزيون والراديو والإنترنت', 'النصوص والصور', 'التخزين السحابي'],
      correctAnswer: 1,
      explanation: 'وسائط النقل والإرسال تنقل المعلومات بين الأماكن والأشخاص مثل التلفزيون والراديو والهاتف والإنترنت.',
      pageReference: 8
    },
    {
      id: 'q-u1l1-5',
      lessonId: 'u1-l1',
      unitId: 'unit-1',
      type: 'mcq',
      questionText: 'عملية مقارنة المعلومات من مصادر متعددة تسمى:',
      options: ['التخزين', 'التكرار', 'الانتشار', 'التحقق المتبادل (Cross-checking)'],
      correctAnswer: 3,
      explanation: 'التحقق المتبادل هو مقارنة البيانات من مصادر متنوعة للتأكد من دقتها وموثوقيتها.',
      pageReference: 8
    },
    {
      id: 'q-u1l1-6',
      lessonId: 'u1-l1',
      unitId: 'unit-1',
      type: 'true_false',
      questionText: 'البيانات هي الحقائق الخام الممثلة بأرقام أو حروف أو رموز.',
      correctAnswer: true,
      explanation: 'صحيح، البيانات تمثل المادة الخام التي لم تعالج بعد.',
      pageReference: 9
    },
    {
      id: 'q-u1l1-7',
      lessonId: 'u1-l1',
      unitId: 'unit-1',
      type: 'true_false',
      questionText: 'من خصائص المعلومات أنها تختفي تماماً بعد نشرها على الإنترنت.',
      correctAnswer: false,
      explanation: 'خطأ، من خصائص المعلومات "الاستمرارية" (Persistence) حيث يصعب محوها بالكامل بعد نشرها.',
      pageReference: 9
    },
    {
      id: 'q-u1l1-8',
      lessonId: 'u1-l1',
      unitId: 'unit-1',
      type: 'true_false',
      questionText: 'المعلومات الثانوية يتم الحصول عليها من طرف ثالث مثل الكتب والصحف.',
      correctAnswer: true,
      explanation: 'صحيح، لأنها معلومات غير مستمدة مباشرة من التجربة الميدانية الذاتية.',
      pageReference: 9
    },
    {
      id: 'q-u1l1-9',
      lessonId: 'u1-l1',
      unitId: 'unit-1',
      type: 'scientific_term',
      questionText: 'قدرة الإنسان على فهم وتفسير وتحليل المعلومات القادمة من التلفزيون أو الإنترنت بدقة وتفكير نقدي.',
      correctAnswer: 'الثقافة الإعلامية',
      explanation: 'الثقافة الإعلامية (Media Literacy) هي المهارة النقدية في تمييز الأخبار والمحتوى الإعلامي.',
      pageReference: 10
    },
    {
      id: 'q-u1l1-10',
      lessonId: 'u1-l1',
      unitId: 'unit-1',
      type: 'fill_blanks',
      questionText: 'خاصية ...... تعني إمكانية نسخ المعلومات بسهولة وبكميات كبيرة.',
      correctAnswer: 'قابلية التكرار',
      options: ['قابلية التكرار', 'الاستمرارية', 'الانتشار', 'التوافرية'],
      explanation: 'قابلية التكرار (Reproducibility) هي سهولة مضاعفة المعلومات دون تكلفة إضافية.',
      pageReference: 10
    }
  ],
  'u1-l2': [
    {
      id: 'q-u1l2-1',
      lessonId: 'u1-l2',
      unitId: 'unit-1',
      type: 'mcq',
      questionText: 'أي من النقاط التالية يُعد انتهاكاً لأخلاقيات المعلومات؟',
      options: ['التحقق من المصادر', 'نشر صور محمية بحقوق نشر دون إذن صاحبها', 'احترام الخصوصية', 'عدم التشهير بالآخرين'],
      correctAnswer: 1,
      explanation: 'نشر مصنفات ومواد الغير دون الحصول على إذن كتابي يعد انتهاكاً لحقوق المؤلف وأخلاقيات المعلومات.',
      pageReference: 17
    },
    {
      id: 'q-u1l2-2',
      lessonId: 'u1-l2',
      unitId: 'unit-1',
      type: 'mcq',
      questionText: 'العلامة الجغرافية (Geotagging) في الصور ومقاطع الفيديو تتضمن:',
      options: ['الاسم والعنوان', 'خطوط الطول ودوائر العرض (إحداثيات GPS)', 'العمر والجنس', 'البريد الإلكتروني'],
      correctAnswer: 1,
      explanation: 'العلامة الجغرافية تحفظ إحداثيات الموقع الفعلي لالتقاط الصورة (Latitude & Longitude).',
      pageReference: 17
    },
    {
      id: 'q-u1l2-3',
      lessonId: 'u1-l2',
      unitId: 'unit-1',
      type: 'mcq',
      questionText: 'من مخاطر العلامة الجغرافية في الصور المنشورة:',
      options: ['الحماية التامة', 'صعوبة التتبع', 'تحديد الموقع الحقيقي للمنزل أو المدرسة وكشفه للغرباء', 'فقدان شحن البطارية'],
      correctAnswer: 2,
      explanation: 'تمكن المخترقين أو المتربصين من معرفة المكان الدقيق لمنزلك أو مسار تحركاتك اليومية.',
      pageReference: 17
    },
    {
      id: 'q-u1l2-4',
      lessonId: 'u1-l2',
      unitId: 'unit-1',
      type: 'true_false',
      questionText: 'أخلاقيات المعلومات تعتمد فقط على وجود نصوص القوانين ولا علاقة لها بالقيم والمفاهيم.',
      correctAnswer: false,
      explanation: 'خطأ، أخلاقيات المعلومات هي مجموعة قيم وتوجيهات وسلوكيات ملزمة ذاتياً سواء وُجدت قوانين أم لم توجد.',
      pageReference: 18
    },
    {
      id: 'q-u1l2-5',
      lessonId: 'u1-l2',
      unitId: 'unit-1',
      type: 'true_false',
      questionText: 'المعلومات المضللة (Disinformation) هي معلومات خاطئة يتم نشرها عمداً لخداع الناس.',
      correctAnswer: true,
      explanation: 'صحيح، تنشر بقصد التضليل والتأثير المغرض على المجتمع.',
      pageReference: 18
    },
    {
      id: 'q-u1l2-6',
      lessonId: 'u1-l2',
      unitId: 'unit-1',
      type: 'scientific_term',
      questionText: 'قيام شخص بالتظاهر بأنه شخص آخر بهدف خداع الضحايا وسرقة معلوماتهم وأموالهم.',
      correctAnswer: 'انتحال الشخصية',
      explanation: 'انتحال الشخصية (Identity Theft) جريمة احتيالية يعاقب عليها القانون.',
      pageReference: 19
    }
  ],
  'u2-l1': [
    {
      id: 'q-u2l1-1',
      lessonId: 'u2-l1',
      unitId: 'unit-2',
      type: 'mcq',
      questionText: 'البيانات الشخصية هي كل معلومة تتعلق بـ:',
      options: ['حيوان', 'مؤسسة', 'شخص طبيعي محدد', 'دولة'],
      correctAnswer: 2,
      explanation: 'البيانات الشخصية قانوناً هي كل معلومة تخص إنساناً بشرياً (شخصاً طبيعياً) يمكن التعرف عليه من خلالها.',
      pageReference: 28
    },
    {
      id: 'q-u2l1-2',
      lessonId: 'u2-l1',
      unitId: 'unit-2',
      type: 'mcq',
      questionText: 'من أمثلة البيانات الأساسية الأربعة:',
      options: ['بصمة الإصبع', 'العنوان', 'الديانة', 'السجل الجنائي'],
      correctAnswer: 1,
      explanation: 'البيانات الأساسية الأربعة هي: الاسم، العنوان، تاريخ الميلاد، والنوع.',
      pageReference: 28
    },
    {
      id: 'q-u2l1-3',
      lessonId: 'u2-l1',
      unitId: 'unit-2',
      type: 'mcq',
      questionText: 'أي من التالي يُعد من البيانات الشخصية الحساسة؟',
      options: ['تاريخ الميلاد', 'رخصة القيادة', 'الديانة والحالة الصحية', 'البريد الإلكتروني'],
      correctAnswer: 2,
      explanation: 'البيانات الحساسة تشمل الديانة، العرق، الآراء السياسية، والحالة الصحية والوراثية والسجل الجنائي.',
      pageReference: 28
    },
    {
      id: 'q-u2l1-4',
      lessonId: 'u2-l1',
      unitId: 'unit-2',
      type: 'mcq',
      questionText: 'أي من الحالات التالية تسمح قانوناً بمشاركة البيانات دون موافقة صاحبها؟',
      options: ['رغبة الجيران', 'القوانين وحماية الأمن القومي والطوارئ الطبية', 'الفضول الشخصي', 'أغراض ترفيهية'],
      correctAnswer: 1,
      explanation: 'القانون استثنى حالات الضرورة القصوى كالأمن القومي، وإنقاذ حياة المرضى، وتنفيذ الأحكام القضائية وعقود الشحن.',
      pageReference: 28
    },
    {
      id: 'q-u2l1-5',
      lessonId: 'u2-l1',
      unitId: 'unit-2',
      type: 'mcq',
      questionText: 'حقوق الدعاية تحمي المصالح الاقتصادية والتجارية لـ:',
      options: ['الأطفال', 'المشاهير', 'الطلاب', 'الموظفين فقط'],
      correctAnswer: 1,
      explanation: 'حقوق الدعاية تمنح المشاهير السيطرة على استغلال صورهم وأسمائهم في الإعلانات والدعاية التجارية.',
      pageReference: 28
    },
    {
      id: 'q-u2l1-6',
      lessonId: 'u2-l1',
      unitId: 'unit-2',
      type: 'scientific_term',
      questionText: 'نظام يشترط الحصول على موافقة صريحة ومسبقة من المستخدم قبل جمع ومعالجة بياناته.',
      correctAnswer: 'نظام الموافقة المسبقة',
      explanation: 'نظام الموافقة المسبقة (Prior Approval System) هو الإلزام الأمني الأقوى لحماية الخصوصية.',
      pageReference: 30
    }
  ],
  'u2-l2': [
    {
      id: 'q-u2l2-1',
      lessonId: 'u2-l2',
      unitId: 'unit-2',
      type: 'mcq',
      questionText: 'فترة حماية براءات الاختراع قانوناً هي:',
      options: ['7 سنوات', '10 سنوات', '20 سنة من تاريخ التقديم', '50 سنة'],
      correctAnswer: 2,
      explanation: 'مدة حماية براءة الاختراع هي 20 سنة تبدأ من تاريخ تقديم طلب البراءة.',
      pageReference: 40
    },
    {
      id: 'q-u2l2-2',
      lessonId: 'u2-l2',
      unitId: 'unit-2',
      type: 'mcq',
      questionText: 'فترة حماية حقوق نموذج المنفعة هي:',
      options: ['5 سنوات', '7 سنوات من تاريخ التقديم', '15 سنة', '20 سنة'],
      correctAnswer: 1,
      explanation: 'نموذج المنفعة (التحسينات التقنية البسيطة) يحمى لمدة 7 سنوات.',
      pageReference: 40
    },
    {
      id: 'q-u2l2-3',
      lessonId: 'u2-l2',
      unitId: 'unit-2',
      type: 'mcq',
      questionText: 'مدة الحماية الاقتصادية لحقوق المؤلف تستمر:',
      options: ['مدى حياة المؤلف فقط', '20 سنة من تاريخ النشر', 'طوال حياة المبدع + 50 سنة بعد وفاته', '100 سنة ثابتة'],
      correctAnswer: 2,
      explanation: 'حقوق المؤلف المالية تستمر طوال حياته ولمدة 50 عاماً كاملة بعد وفاته لصالح ورثته.',
      pageReference: 40
    },
    {
      id: 'q-u2l2-4',
      lessonId: 'u2-l2',
      unitId: 'unit-2',
      type: 'true_false',
      questionText: 'مبدأ عدم الشكلية يعني أن حقوق المؤلف تثبت وتمنح بمجرد إبداع العمل دون اشتراط تسجيله رسمياً.',
      correctAnswer: true,
      explanation: 'صحيح، حقوق المؤلف تخضع لمبدأ عدم الشكلية (Non-formality) وتنشأ الحماية فور ولادة المصنف.',
      pageReference: 41
    },
    {
      id: 'q-u2l2-5',
      lessonId: 'u2-l2',
      unitId: 'unit-2',
      type: 'true_false',
      questionText: 'الحقوق المعنوية للمؤلف (مثل نسب المصنف لاسمه) تسقط بمرور 50 سنة بعد وفاته.',
      correctAnswer: false,
      explanation: 'خطأ، الحقوق المعنوية والأدبية أبدية ودائمة ولا تسقط أبداً بالتقادم.',
      pageReference: 41
    }
  ],
  'u2-l3': [
    {
      id: 'q-u2l3-1',
      lessonId: 'u2-l3',
      unitId: 'unit-2',
      type: 'mcq',
      questionText: 'الرمز (BY) في تراخيص المشاع الإبداعي يعني شرط:',
      options: ['المنع التجاري', 'عدم النسخ', 'نسب العمل للمؤلف (الإسناد)', 'عدم التعديل'],
      correctAnswer: 2,
      explanation: 'شرط BY (Attribution) يلزم بذكر اسم المبدع الأصلي ومصدر العمل.',
      pageReference: 49
    },
    {
      id: 'q-u2l3-2',
      lessonId: 'u2-l3',
      unitId: 'unit-2',
      type: 'mcq',
      questionText: 'الرمز (NC) في تراخيص المشاع الإبداعي يشير إلى:',
      options: ['نشر مفتوح', 'لا تعديل', 'نسب العمل', 'غير تجاري (Non-Commercial)'],
      correctAnswer: 3,
      explanation: 'شرط NC يمنع الاستخدام في المشروعات الهادفة للربح أو الإعلانات التجارية.',
      pageReference: 49
    },
    {
      id: 'q-u2l3-3',
      lessonId: 'u2-l3',
      unitId: 'unit-2',
      type: 'mcq',
      questionText: 'الرمز (ND) في تراخيص المشاع الإبداعي يمنع:',
      options: ['النسب للمؤلف', 'الاستخدام التجاري', 'الاشتقاق والتعديل (No Derivatives)', 'النسخ الجماعي'],
      correctAnswer: 2,
      explanation: 'شرط ND يحظر تعديل أو قص أو تحريف أو ترجمة العمل الأصلي.',
      pageReference: 49
    },
    {
      id: 'q-u2l3-4',
      lessonId: 'u2-l3',
      unitId: 'unit-2',
      type: 'true_false',
      questionText: 'يجب أن يكون العمل المقتبس هو الأساس في بحثك بينما عملك الأصلي هو التابع.',
      correctAnswer: false,
      explanation: 'خطأ، من شروط الاقتباس أن يكون عملك الأصلي هو الأساس والمقتبس مجرد عنصر تابع وداعم.',
      pageReference: 49
    },
    {
      id: 'q-u2l3-5',
      lessonId: 'u2-l3',
      unitId: 'unit-2',
      type: 'scientific_term',
      questionText: 'استخدام أجزاء من عمل محمي بحقوق المؤلف دون إذن لأغراض التعليم والبحث والنقد دون إلحاق ضرر بالمؤلف.',
      correctAnswer: 'الاستخدام العادل',
      explanation: 'الاستخدام العادل (Fair Use) هو التوازن القانوني بين حماية المبدع وخدمة المجتمع.',
      pageReference: 50
    }
  ],
  'u3-l1': [
    {
      id: 'q-u3l1-1',
      lessonId: 'u3-l1',
      unitId: 'unit-3',
      type: 'mcq',
      questionText: 'السرية (Confidentiality) في أمن المعلومات تعني أن المعلومات يمكن الوصول إليها فقط من قبل:',
      options: ['الجميع', 'المخترقين', 'المصرح لهم فقط', 'أجهزة الحاسوب'],
      correctAnswer: 2,
      explanation: 'السرية تضمن منع أي شخص غير مرخص له من قراءة أو كشف البيانات.',
      pageReference: 58
    },
    {
      id: 'q-u3l1-2',
      lessonId: 'u3-l1',
      unitId: 'unit-3',
      type: 'mcq',
      questionText: 'البرمجية الخبيثة التي تنسخ نفسها وتنتشر ذاتياً عبر الشبكة تسمى:',
      options: ['حصان طروادة', 'الدودة (Worm)', 'برامج التجسس', 'برامج الفدية'],
      correctAnswer: 1,
      explanation: 'الدودة (Worm) تنتشر ذاتياً عبر الشبكات دون حاجة لتدخل المستخدم أو الارتباط بملف.',
      pageReference: 59
    },
    {
      id: 'q-u3l1-3',
      lessonId: 'u3-l1',
      unitId: 'unit-3',
      type: 'mcq',
      questionText: 'برنامج خبيث يقوم بتشفير ملفات الحاسب بالكامل ويطالب بمبلغ مالي لاستعادتها:',
      options: ['برنامج الفدية (Ransomware)', 'برنامج التجسس', 'حصان طروادة', 'برامج الإعلانات'],
      correctAnswer: 0,
      explanation: 'برنامج الفدية يقوم بحجب الوصول للبيانات بتشفيرها وابتزاز المستخدم مالياً.',
      pageReference: 59
    },
    {
      id: 'q-u3l1-4',
      lessonId: 'u3-l1',
      unitId: 'unit-3',
      type: 'true_false',
      questionText: 'سلامة المعلومات (Integrity) تشير إلى أن المعلومات لم يتم العبث بها أو تعديلها أو حذفها.',
      correctAnswer: true,
      explanation: 'صحيح، السلامة تضمن صحة ودقة واكتمال البيانات.',
      pageReference: 60
    }
  ],
  'u3-l2': [
    {
      id: 'q-u3l2-1',
      lessonId: 'u3-l2',
      unitId: 'unit-3',
      type: 'mcq',
      questionText: 'المصادقة البيومترية (Biometric) تعتمد على:',
      options: ['كلمة المرور', 'البطاقة الذكية', 'الخصائص الفيزيائية والسلوكية مثل بصمة الإصبع وقزحية العين', 'رمز PIN'],
      correctAnswer: 2,
      explanation: 'المصادقة البيومترية تستخدم السمات الحيوية الفريدة لجسد الإنسان.',
      pageReference: 70
    },
    {
      id: 'q-u3l2-2',
      lessonId: 'u3-l2',
      unitId: 'unit-3',
      type: 'mcq',
      questionText: 'المصادقة الثنائية (2FA) تستخدم عاملين:',
      options: ['من نفس الفئة', 'من فئتين مختلفتين (مثل شيء تعرفه + شيء تمتلكه)', 'كلمتي مرور متتاليتين', 'سؤالين سريين'],
      correctAnswer: 1,
      explanation: 'المصادقة الثنائية تتطلب عاملين من نوعين مختلفين ككلمة السر ورمز SMS.',
      pageReference: 70
    },
    {
      id: 'q-u3l2-3',
      lessonId: 'u3-l2',
      unitId: 'unit-3',
      type: 'mcq',
      questionText: 'نظام أمني يمنع الوصول غير المصرح به من خارج الشبكة ويراقب حزم البيانات:',
      options: ['جهاز الإدخال', 'جدار الحماية (Firewall)', 'المعالج', 'وحدة الذاكرة'],
      correctAnswer: 1,
      explanation: 'جدار الحماية Firewall هو خط الدفاع الشبكي الأول لمنع المتسللين.',
      pageReference: 70
    }
  ],
  'u3-l3': [
    {
      id: 'q-u3l3-1',
      lessonId: 'u3-l3',
      unitId: 'unit-3',
      type: 'mcq',
      questionText: 'التلصص بالنظر على شاشة الهاتف أو لوحة المفاتيح أثناء كتابة رمز PIN يسمى:',
      options: ['انتحال الشخصية', 'التصيد', 'التجسس المباشر (Shoulder surfing)', 'التزوير'],
      correctAnswer: 2,
      explanation: 'Shoulder surfing هو التلصص البصري من فوق الكتف أثناء إدخال البيانات السرية.',
      pageReference: 79
    },
    {
      id: 'q-u3l3-2',
      lessonId: 'u3-l3',
      unitId: 'unit-3',
      type: 'mcq',
      questionText: 'سرقة بيانات البطاقات المصرفية عبر تركيب أجهزة ناسخة سرية على ماكينات الصراف الآلي يسمى:',
      options: ['التزوير (Skimming)', 'التصيد', 'الهندسة الاجتماعية', 'الاحتيال بالفواتير'],
      correctAnswer: 0,
      explanation: 'Skimming هو قراءة ونسخ الشريط الممغنط للبطاقات الائتمانية دون علم صاحبها.',
      pageReference: 79
    },
    {
      id: 'q-u3l3-3',
      lessonId: 'u3-l3',
      unitId: 'unit-3',
      type: 'scientific_term',
      questionText: 'التفتيش في سلات مهملات المؤسسات للحصول على أوراق ومستندات سرية تحوي حسابات.',
      correctAnswer: 'البحث في المهملات (Dumper diving)',
      explanation: 'Dumpster diving أحد أساليب جمع المعلومات في الهندسة الاجتماعية.',
      pageReference: 81
    }
  ],
  'u6-l1': [
    {
      id: 'q-u6l1-1',
      lessonId: 'u6-l1',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'عدد الاحتمالات الممكنة لتمثيل 3 بتات (Bits) هو:',
      options: ['2', '4', '8', '16'],
      correctAnswer: 2,
      explanation: 'القانون: 2^n حيث n=3 بتات -> 2^3 = 8 احتمالات مختلفة (من 000 إلى 111).',
      pageReference: 90
    },
    {
      id: 'q-u6l1-2',
      lessonId: 'u6-l1',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'عند تحويل الرقم الثنائي 1101_2 إلى النظام العشري تكون النتيجة:',
      options: ['10', '11', '12', '13'],
      correctAnswer: 3,
      explanation: 'التحويل: (1 × 2^0) + (0 × 2^1) + (1 × 2^2) + (1 × 2^3) = 1 + 0 + 4 + 8 = 13_10.',
      pageReference: 90
    },
    {
      id: 'q-u6l1-3',
      lessonId: 'u6-l1',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'عدد البتات في البايت الواحد (1 Byte) هو:',
      options: ['4 بتات', '8 بتات', '16 بتاً', '2 بت'],
      correctAnswer: 1,
      explanation: 'كل 1 بايت = 8 بتات وتستطيع تمثيل 256 احتمالاً (2^8).',
      pageReference: 90
    },
    {
      id: 'q-u6l1-4',
      lessonId: 'u6-l1',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: '1 ميجابايت (1 MB) تساوي:',
      options: ['1000 KB', '1024 KB', '512 KB', '2048 KB'],
      correctAnswer: 1,
      explanation: 'في حسابات الكمبيوتر: 1 MB = 1024 KB.',
      pageReference: 90
    },
    {
      id: 'q-u6l1-5',
      lessonId: 'u6-l1',
      unitId: 'unit-6',
      type: 'problem_solving',
      questionText: 'حول العدد العشري 39_10 إلى النظام الثنائي موضحاً خطوات القسمة على 2.',
      correctAnswer: '100111',
      explanation: '39 ÷ 2 = 19 (الباقي 1) | 19 ÷ 2 = 9 (الباقي 1) | 9 ÷ 2 = 4 (الباقي 1) | 4 ÷ 2 = 2 (الباقي 0) | 2 ÷ 2 = 1 (الباقي 0) | 1 ÷ 2 = 0 (الباقي 1). بقراءة البواقي من الأسفل للأعلى: 100111_2.',
      pageReference: 86
    }
  ],
  'u6-l2': [
    {
      id: 'q-u6l2-1',
      lessonId: 'u6-l2',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'الرقم الثنائي 10011010_2 يعادل في النظام السادس عشر:',
      options: ['A9_16', '91_16', '19_16', '9A_16'],
      correctAnswer: 3,
      explanation: 'نقسم الرقم إلى مجموعتين رباعيتين: (1001) و (1010). 1010 تعادل 10 بالعشري أي A، و 1001 تعادل 9. إذن الناتج = 9A_16.',
      pageReference: 100
    },
    {
      id: 'q-u6l2-2',
      lessonId: 'u6-l2',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'عند تحويل الرقم السادس عشر A4_16 إلى ثنائي يكون الناتج:',
      options: ['10011010_2', '11100011_2', '11001001_2', '10100100_2'],
      correctAnswer: 3,
      explanation: 'A تعادل 10 = 1010_2 ، و 4 تعادل 0100_2. إذن بالترتيب: 10100100_2.',
      pageReference: 100
    },
    {
      id: 'q-u6l2-3',
      lessonId: 'u6-l2',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'العدد السادس عشر C6_16 يساوي في النظام العشري:',
      options: ['196', '197', '198', '199'],
      correctAnswer: 2,
      explanation: 'الحساب: (C × 16^1) + (6 × 16^0) = (12 × 16) + (6 × 1) = 192 + 6 = 198_10.',
      pageReference: 101
    },
    {
      id: 'q-u6l2-4',
      lessonId: 'u6-l2',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'الحرف F في النظام السادس عشر يمثل القيمة العشرية:',
      options: ['13', '14', '15', '16'],
      correctAnswer: 2,
      explanation: 'في النظام السادس عشر: A=10, B=11, C=12, D=13, E=14, F=15.',
      pageReference: 100
    }
  ],
  'u6-l3': [
    {
      id: 'q-u6l3-1',
      lessonId: 'u6-l3',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'الحرف "H" في سلسلة "Hello" يمثل في كود ASCII بالنظام السادس عشر بالقيمة:',
      options: ['C6', '65', '48', 'F6'],
      correctAnswer: 2,
      explanation: 'قيمة H في ASCII بالعشري هي 72، والتي تقابل 01001000 ثنائياً و 48 بالسداسي عشر.',
      pageReference: 112
    },
    {
      id: 'q-u6l3-2',
      lessonId: 'u6-l3',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'أي من اللغات التالية لا يدعمها كود ASCII بصورة مباشرة؟',
      options: ['الحروف الإنجليزية', 'الأرقام', 'أحرف التحكم', 'اللغة العربية'],
      correctAnswer: 3,
      explanation: 'كود ASCII مقتصر على الإنجليزية والأرقام والرموز الأساسية فقط، ولذلك طُوّر معيار Unicode لدعم اللغة العربية وباقي لغات العالم.',
      pageReference: 112
    },
    {
      id: 'q-u6l3-3',
      lessonId: 'u6-l3',
      unitId: 'unit-6',
      type: 'scientific_term',
      questionText: 'ظاهرة تشوه النصوص وظهورها كرموز غريبة نتيجة عدم تطابق نظام التشفير مع نظام فك التشفير.',
      correctAnswer: 'تلف الأحرف (Character corruption)',
      explanation: 'Character Corruption يحدث عند قراءة ملف بنظام ترميز مختلف عما تم الحفظ به.',
      pageReference: 112
    }
  ],
  'u6-l4': [
    {
      id: 'q-u6l4-1',
      lessonId: 'u6-l4',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'في الجمع الثنائي: 1 + 1 تكون النتيجة:',
      options: ['0 مع حمل 1 (10_2)', '1', '2', '11_2'],
      correctAnswer: 0,
      explanation: 'في النظام الثنائي 1 + 1 = 2 بالعشري، وتكتب 10_2 أي نضع 0 في الخانة الحالية ونحمل 1 للخانة التالية.',
      pageReference: 118
    },
    {
      id: 'q-u6l4-2',
      lessonId: 'u6-l4',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'ناتج الطرح الثنائي: 1010_2 - 0110_2 هو:',
      options: ['0010_2', '0100_2', '0110_2', '1000_2'],
      correctAnswer: 1,
      explanation: '10 - 6 = 4 بالعشري، والعدد 4 يكتب ثنائياً 0100_2.',
      pageReference: 118
    },
    {
      id: 'q-u6l4-3',
      lessonId: 'u6-l4',
      unitId: 'unit-6',
      type: 'problem_solving',
      questionText: 'أوجد ناتج جمع الرقمين الثنائيين التاليين: 0101_2 + 1010_2',
      correctAnswer: '1111',
      explanation: 'الخانة 1: 1+0=1 | الخانة 2: 0+1=1 | الخانة 3: 1+0=1 | الخانة 4: 0+1=1. الناتج = 1111_2 (تعادل 15 بالعشري).',
      pageReference: 117
    }
  ],
  'u6-l5': [
    {
      id: 'q-u6l5-1',
      lessonId: 'u6-l5',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'ما مكمل الآحاد (One\'s Complement) للعدد الثنائي 0101_2؟',
      options: ['1010_2', '1011_2', '0100_2', '1101_2'],
      correctAnswer: 0,
      explanation: 'مكمل الآحاد يتم بقلب كل بت: الصفر يصبح 1 والواحد يصبح 0، إذن 0101 تصبح 1010_2.',
      pageReference: 126
    },
    {
      id: 'q-u6l5-2',
      lessonId: 'u6-l5',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'ما المكمل الثنائي (Two\'s Complement) للعدد الثنائي 0101_2؟',
      options: ['1010_2', '0101_2', '1011_2', '1100_2'],
      correctAnswer: 2,
      explanation: 'المكمل الثنائي = مكمل الآحاد + 1. إذن: 1010 + 1 = 1011_2.',
      pageReference: 126
    },
    {
      id: 'q-u6l5-3',
      lessonId: 'u6-l5',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'ما مكمل العشرة (10\'s complement) للعدد العشري 635؟',
      options: ['365', '355', '375', '395'],
      correctAnswer: 0,
      explanation: 'المكمل للتسعة = (9-6)(9-3)(9-5) = 364. المكمل للعشرة = 364 + 1 = 365.',
      pageReference: 126
    }
  ],
  'u6-l6': [
    {
      id: 'q-u6l6-1',
      lessonId: 'u6-l6',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'ما هو العيب الرئيسي للتنسيق النقطي (Bitmap) عند مقارنته بالتنسيق الشعاعي (Vector)؟',
      options: ['يقلل حجم الملف', 'يسمح بالنصوص فقط', 'يؤدي إلى ظهور رموز غير مقروءة', 'تظهر به التعرجات (Jaggies) عند تكبير الصورة'],
      correctAnswer: 3,
      explanation: 'الصور النقطية مكونة من بكسلات مربعة ثابتة فتفقد نقائها وتظهر حوافها مسننة ومتعرجة عند التكبير.',
      pageReference: 139
    },
    {
      id: 'q-u6l6-2',
      lessonId: 'u6-l6',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'في نظام الألوان الكاملة (24-bit full color)، ما هو عدد المستويات اللونية لكل لون أساسي؟',
      options: ['9 مستويات', '24 مستوى', '256 مستوى (8 بت)', '224 مستوى'],
      correctAnswer: 2,
      explanation: 'يخصص 8 بت لكل لون أساسي (R, G, B) مما يعطي 2^8 = 256 مستوى لوني لكل منها.',
      pageReference: 139
    },
    {
      id: 'q-u6l6-3',
      lessonId: 'u6-l6',
      unitId: 'unit-6',
      type: 'problem_solving',
      questionText: 'احسب حجم صورة رقمية أبعادها 600 × 800 بكسل وعمق اللون 8 بت بالكيلوبايت (KB).',
      correctAnswer: '480',
      explanation: '1. عدد البكسلات = 600 × 800 = 480,000 بكسل. 2. الحجم بالبت = 480,000 × 8 = 3,840,000 بت. 3. الحجم بالبايت = 3,840,000 ÷ 8 = 480,000 بايت. 4. الحجم بالكيلوبايت = 480,000 ÷ 1000 = 480 KB.',
      pageReference: 134
    }
  ],
  'u6-l7': [
    {
      id: 'q-u6l7-1',
      lessonId: 'u6-l7',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'وفقاً لمبدأ LATCH، أي نوع من التصنيف يعتمد على تسلسل الأحداث من حيث الوقت؟',
      options: ['الموقع (Location)', 'الأبجدية (Alphabet)', 'النوع / الفئة (Category)', 'الوقت (Time)'],
      correctAnswer: 3,
      explanation: 'Time في مبدأ LATCH ينظم البيانات تسلسلياً حسب تاريخ حدوثها من الأقدم للأحدث أو العكس.',
      pageReference: 147
    },
    {
      id: 'q-u6l7-2',
      lessonId: 'u6-l7',
      unitId: 'unit-6',
      type: 'mcq',
      questionText: 'الخصائص التي توضح الإجراءات أو العمليات التي يمكن تنفيذها على زر أو عنصر تسمى:',
      options: ['الدلالة (Signifier)', 'الإمكانية (Affordance)', 'تجربة المستخدم (UX)', 'التصميم الشامل'],
      correctAnswer: 1,
      explanation: 'الإمكانية (Affordance) هي ما يقدمه التصميم بصرياً ليوحي بوظيفته (كالزر الذي يوحي بإمكانية الضغط).',
      pageReference: 147
    },
    {
      id: 'q-u6l7-3',
      lessonId: 'u6-l7',
      unitId: 'unit-6',
      type: 'scientific_term',
      questionText: 'رمز أو رسم مصمم لغرض نقل البيانات والتوجيه دون استخدام الكلمات كإشارات محطات القطار ومخارج الطوارئ.',
      correctAnswer: 'الرسم التصويري (Pictogram)',
      explanation: 'Pictogram لغة بصرية عالمية مختصرة وموحدة.',
      pageReference: 149
    }
  ],
  'u7-l1': [
    {
      id: 'q-u7l1-1',
      lessonId: 'u7-l1',
      unitId: 'unit-7',
      type: 'mcq',
      questionText: 'معيار الاتصال الذي ينقل الصوت والفيديو الرقمي عالي الدقة عبر كابل واحد هو:',
      options: ['USB', 'HDMI', 'Ethernet', 'VGA'],
      correctAnswer: 1,
      explanation: 'HDMI ينقل إشارات الصوت والفيديو عالية الوضوح معاً دون تشويش.',
      pageReference: 156
    },
    {
      id: 'q-u7l1-2',
      lessonId: 'u7-l1',
      unitId: 'unit-7',
      type: 'mcq',
      questionText: 'تعرف وحدة التحكم (CU) ووحدة الحساب والمنطق (ALU) معاً باسم:',
      options: ['وحدة الإدخال', 'وحدة الذاكرة الرئيسية', 'وحدة المعالجة المركزية (CPU)', 'وحدة التخزين الثانوي'],
      correctAnswer: 2,
      explanation: 'المعالج المركزي CPU يتألف رئيسياً من CU و ALU وسجلات المعالج.',
      pageReference: 156
    },
    {
      id: 'q-u7l1-3',
      lessonId: 'u7-l1',
      unitId: 'unit-7',
      type: 'mcq',
      questionText: 'تخزن البرامج والبيانات النشطة مؤقتاً أثناء التشغيل داخل:',
      options: ['الذاكرة الرئيسية (RAM)', 'الذاكرة الثانوية', 'وحدة الحساب', 'وحدة الإدخال'],
      correctAnswer: 0,
      explanation: 'ذاكرة RAM تخزن التعليمات التنفيذية مؤقتاً وتفقد محتوياتها عند انقطاع التيار.',
      pageReference: 156
    }
  ],
  'u7-l2': [
    {
      id: 'q-u7l2-1',
      lessonId: 'u7-l2',
      unitId: 'unit-7',
      type: 'mcq',
      questionText: 'ما ناتج بوابة AND إذا كانت المدخلات (A = 1 و B = 0)؟',
      options: ['0', '1', '2', 'لا شيء'],
      correctAnswer: 0,
      explanation: 'بوابة AND تتطلب أن تكون جميع المدخلات 1 لتعطي 1. بما أن أحد المدخلات 0 فالناتج هو 0.',
      pageReference: 171
    },
    {
      id: 'q-u7l2-2',
      lessonId: 'u7-l2',
      unitId: 'unit-7',
      type: 'mcq',
      questionText: 'ما ناتج بوابة NOT إذا كان الإدخال A = 1؟',
      options: ['0', '1', '2', 'غير محدد'],
      correctAnswer: 0,
      explanation: 'بوابة NOT عاكسة، فتقلب 1 إلى 0.',
      pageReference: 171
    },
    {
      id: 'q-u7l2-3',
      lessonId: 'u7-l2',
      unitId: 'unit-7',
      type: 'mcq',
      questionText: 'تتكون دائرة الجمع النصفي (Half Adder) من بوابتي:',
      options: ['AND و OR', 'AND و XOR', 'OR و NOT', 'XOR و NOT'],
      correctAnswer: 1,
      explanation: 'دائرة الجمع النصفي تستخدم XOR لحساب المجموع (Sum) و AND لحساب الحمل (Carry).',
      pageReference: 170
    },
    {
      id: 'q-u7l2-4',
      lessonId: 'u7-l2',
      unitId: 'unit-7',
      type: 'mcq',
      questionText: 'الفرق الأساسي بين دائرة الجمع الكامل ودائرة الجمع النصفي هو أن الجمع الكامل:',
      options: ['أسرع فقط', 'تأخذ في الاعتبار الحمل القادم من الخانة السابقة (Carry In)', 'تجمع مدخلاً واحداً', 'تعمل في العمليات المنطقية فقط'],
      correctAnswer: 1,
      explanation: 'الجمع الكامل تستقبل 3 مدخلات (A, B, Cin) وتتعامل مع سلاسل الأعداد الطويلة.',
      pageReference: 171
    }
  ],
  'u8-l1': [
    {
      id: 'q-u8l1-1',
      lessonId: 'u8-l1',
      unitId: 'unit-8',
      type: 'mcq',
      questionText: 'أي من الرموز التالية يُستخدم في مخطط الانسياب لاتخاذ القرار والشرط؟',
      options: ['المستطيل', 'المعين (Diamond)', 'متوازي الأضلاع', 'الشكل البيضاوي'],
      correctAnswer: 1,
      explanation: 'رمز المعين يُستخدم في مخطط الانسياب للشرط واتخاذ القرار وله مخرجان على الأقل (Yes / No).',
      pageReference: 180
    },
    {
      id: 'q-u8l1-2',
      lessonId: 'u8-l1',
      unitId: 'unit-8',
      type: 'mcq',
      questionText: 'تقسيم المشكلة الكبيرة المعقدة إلى مشكلات فرعية أصغر يسمى في التفكير الحوسبي:',
      options: ['التجريد (Abstraction)', 'التفكيك (Decomposition)', 'التعرف على الأنماط', 'البرمجة'],
      correctAnswer: 1,
      explanation: 'التفكيك (Decomposition) هو تجزئة المسألة الكبيرة إلى أجزاء أصغر يسهل فهمها وحلها.',
      pageReference: 181
    },
    {
      id: 'q-u8l1-3',
      lessonId: 'u8-l1',
      unitId: 'unit-8',
      type: 'mcq',
      questionText: 'الشكل البيضاوي في مخططات الانسياب يمثل:',
      options: ['إدخال وإخراج البيانات', 'إجراء العمليات الحسابية', 'البداية أو النهاية (Start / End)', 'الشرط'],
      correctAnswer: 2,
      explanation: 'الشكل البيضاوي مخصص لتحديد نقطة بداية البرنامج أو نهايته.',
      pageReference: 182
    }
  ],
  'u8-l2': [
    {
      id: 'q-u8l2-1',
      lessonId: 'u8-l2',
      unitId: 'unit-8',
      type: 'mcq',
      questionText: 'في لغة بايثون، ما هو ناتج العملية: 17 // 5 ؟',
      options: ['3.4', '3', '2', '1'],
      correctAnswer: 1,
      explanation: 'المعامل // في بايثون يمثل القسمة الصحيحة وتجاهل الكسر، 17 // 5 = 3.',
      pageReference: 190
    },
    {
      id: 'q-u8l2-2',
      lessonId: 'u8-l2',
      unitId: 'unit-8',
      type: 'mcq',
      questionText: 'ما هو النوع البياني الذي تعيده دالة input() في بايثون افتراضياً؟',
      options: ['عدد صحيح (int)', 'عدد عشري (float)', 'سلسلة نصية (str)', 'قيمة منطقية (bool)'],
      correctAnswer: 2,
      explanation: 'دالة input() تستقبل المدخلات دائماً كـ String نصي، ويلزم استخدام int() أو float() لتحويلها لأرقام.',
      pageReference: 192
    },
    {
      id: 'q-u8l2-3',
      lessonId: 'u8-l2',
      unitId: 'unit-8',
      type: 'mcq',
      questionText: 'أي من أسماء المتغيرات التالية صحيح ومقبول في بايثون؟',
      options: ['2nd_score', 'student-name', 'total_score', 'class'],
      correctAnswer: 2,
      explanation: 'total_score اسم صحيح؛ لأنه يبدأ بحرف ولا يحتوي على رموز خاصة عدا الشرطة السفلية، و class كلمة محجوزة.',
      pageReference: 193
    }
  ],
  'u8-l3': [
    {
      id: 'q-u8l3-1',
      lessonId: 'u8-l3',
      unitId: 'unit-8',
      type: 'mcq',
      questionText: 'تعتمد لغة بايثون على ........... لتحديد بداية ونهاية الكتل البرمجية التابعة للشروط والحلقات:',
      options: ['الأقواس المتعرجة {}', 'المسافات البادئة (Indentation)', 'الفواصل المنقوطة ;', 'علامات التنصيص'],
      correctAnswer: 1,
      explanation: 'المسافات البادئة هي السمة المميزة لبايثون لتحديد التبعية المنطقية للأوامر البرمجية.',
      pageReference: 200
    },
    {
      id: 'q-u8l3-2',
      lessonId: 'u8-l3',
      unitId: 'unit-8',
      type: 'mcq',
      questionText: 'الأمر المستخدم للخروج الفوري وإنهاء حلقة التكرار في بايثون هو:',
      options: ['pass', 'continue', 'break', 'stop'],
      correctAnswer: 2,
      explanation: 'الأمر break ينهي عمل الحلقة تماماً ويخرج منها فوراً.',
      pageReference: 202
    }
  ],
  'u9-l1': [
    {
      id: 'q-u9l1-1',
      lessonId: 'u9-l1',
      unitId: 'unit-9',
      type: 'mcq',
      questionText: 'جميع تطبيقات وأنظمة الذكاء الاصطناعي المستخدمة اليوم في الهواتف والشركات تُصنف كـ:',
      options: ['ذكاء اصطناعي عام (General AI)', 'ذكاء اصطناعي فائق (Super AI)', 'ذكاء اصطناعي ضيق/محدود (Narrow AI)', 'ذكاء واعي'],
      correctAnswer: 2,
      explanation: 'جميع الأنظمة الحالية مخصصة لمهام محددة (Narrow AI) مثل التوصيات أو التعرف على الصوت أو تشخيص الصور.',
      pageReference: 210
    },
    {
      id: 'q-u9l1-2',
      lessonId: 'u9-l1',
      unitId: 'unit-9',
      type: 'mcq',
      questionText: 'اختبار تورينج (Turing Test) صُمم أساساً من أجل:',
      options: ['قياس سرعة معالجة الحاسوب', 'قياس قدرة الآلة على محاكاة السلوك البشري الذكي', 'فحص أمان كلمات المرور', 'اختبار شاشات العرض'],
      correctAnswer: 1,
      explanation: 'يقيس اختبار تورينج مدى قدرة الآلة على إظهار سلوك لا يمكن للإنسان تمييزه عن السلوك البشري.',
      pageReference: 212
    }
  ],
  'u9-l2': [
    {
      id: 'q-u9l2-1',
      lessonId: 'u9-l2',
      unitId: 'unit-9',
      type: 'mcq',
      questionText: 'التعلم الذي يعتمد على تزويد النموذج ببيانات مصنفة ومصحوبة بالإجابات الصحيحة يسمى:',
      options: ['التعلم التعزيزي (Reinforcement)', 'التعلم غير الخاضع لإشراف (Unsupervised)', 'التعلم بإشراف (Supervised Learning)', 'التعلم العشوائي'],
      correctAnswer: 2,
      explanation: 'التعلم بإشراف (Supervised) يستخدم بيانات مصنفة مسبقاً (Labeled Data).',
      pageReference: 220
    },
    {
      id: 'q-u9l2-2',
      lessonId: 'u9-l2',
      unitId: 'unit-9',
      type: 'mcq',
      questionText: 'الذكاء الاصطناعي القادر على ابتكار نصوص ورسومات وأكواد برمجية جديدة بناء على أوامر المستخدم يُعرف بـ:',
      options: ['الذكاء الاصطناعي التقليدي', 'الذكاء الاصطناعي التوليدي (Generative AI)', 'المنطق البولياني', 'أنظمة التشغيل'],
      correctAnswer: 1,
      explanation: 'الذكاء التوليدي (Generative AI) يبتكر محتوى جديداً مثل النصوص والصور بناء على النماذج التوليدية.',
      pageReference: 222
    }
  ],
  'u9-l3': [
    {
      id: 'q-u9l3-1',
      lessonId: 'u9-l3',
      unitId: 'unit-9',
      type: 'mcq',
      questionText: 'عندما تصدر خوارزمية الذكاء الاصطناعي قرارات غير منصفة تجاه فئة معينة بسبب بيانات التدريب، يُسمى هذا:',
      options: ['الأمن السيبراني', 'الانحياز الخوارزمي (Algorithmic Bias)', 'التعلم العميق', 'الاستخدام العادل'],
      correctAnswer: 1,
      explanation: 'الانحياز الخوارزمي هو انحراف نتائج النظام الآلي بسبب البيانات غير المتوازنة التي تم تدريبه عليها.',
      pageReference: 230
    },
    {
      id: 'q-u9l3-2',
      lessonId: 'u9-l3',
      unitId: 'unit-9',
      type: 'mcq',
      questionText: 'تقنية استخدام الذكاء الاصطناعي لتعديل وتبديل الوجوه والأصوات في مقاطع الفيديو بشكل واقعي تسمى:',
      options: ['التزييف العميق (Deepfake)', 'التصيد الاحتيالي', 'الترميز الموحد', 'المشاع الإبداعي'],
      correctAnswer: 0,
      explanation: 'التزييف العميق (Deepfake) تقنية اصطناعية لإنتاج وسائط مزيفة عالية الواقعية.',
      pageReference: 232
    }
  ]
};
