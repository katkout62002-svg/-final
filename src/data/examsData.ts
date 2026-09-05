import { Exam } from '../types';

export const OFFICIAL_EXAMS: Exam[] = [
  {
    id: 'exam-oct-1',
    title: 'اختبار شهر أكتوبر - النموذج الأول',
    category: 'october',
    term: 'الفصل الدراسي الأول',
    year: '2025 / 2026',
    durationMinutes: 30,
    totalScore: 20,
    questions: [
      {
        id: 'oct1-1',
        type: 'mcq',
        questionText: 'عدد الاحتمالات الممكنة لتمثيل 3 بتات هو:',
        options: ['2', '4', '8', '16'],
        correctAnswer: 2,
        explanation: 'القانون: 2^n -> 2^3 = 8 احتمالات.',
        pageReference: 93
      },
      {
        id: 'oct1-2',
        type: 'mcq',
        questionText: 'فيروس الكمبيوتر يهدف إلى ...... أو البرامج:',
        options: ['نقل', 'نسخ', 'حفظ', 'تدمير البيانات'],
        correctAnswer: 3,
        explanation: 'الفيروس يهدف لإلحاق الضرر وتدمير البيانات أو تعطيل البرامج.',
        pageReference: 93
      },
      {
        id: 'oct1-3',
        type: 'mcq',
        questionText: 'كل بيان أو معلومة تتعلق بشخص طبيعي محدد أو يمكن تحديده من خلال الربط:',
        options: ['البيانات الشخصية', 'أرقام الهوية', 'الحقوق', 'الآراء السياسية'],
        correctAnswer: 0,
        explanation: 'تعريف البيانات الشخصية (Personal Information).',
        pageReference: 93
      },
      {
        id: 'oct1-4',
        type: 'mcq',
        questionText: 'عند تحويل الرقم الثنائي 1101_2 إلى عشري تكون النتيجة:',
        options: ['10', '11', '12', '13'],
        correctAnswer: 3,
        explanation: '1 + 0 + 4 + 8 = 13.',
        pageReference: 93
      },
      {
        id: 'oct1-5',
        type: 'mcq',
        questionText: 'برنامج متنكر على أنه شرعي ومفيد ولكنه يخفي هجمات:',
        options: ['البرنامج المخفي', 'حصان طروادة (Trojan Horse)', 'البرنامج غير الفعال', 'البرنامج المكرر'],
        correctAnswer: 1,
        explanation: 'حصان طروادة يتنكر كبرنامج مشروع.',
        pageReference: 93
      },
      {
        id: 'oct1-6',
        type: 'true_false',
        questionText: 'العلامة التجارية تساعد في تمييز المنتجات أو الخدمات.',
        correctAnswer: true,
        explanation: 'صحيح، تميز منتجات وخدمات الشركات عن منافسيها.',
        pageReference: 93
      },
      {
        id: 'oct1-7',
        type: 'true_false',
        questionText: 'تسريب المعلومات الشخصية لشخص آخر يُعد انتهاكاً لخصوصيته.',
        correctAnswer: true,
        explanation: 'صحيح، لأن الخصوصية حق دستوري وقانوني.',
        pageReference: 93
      },
      {
        id: 'oct1-8',
        type: 'true_false',
        questionText: 'براءات الاختراع تندرج تحت الملكية الأدبية والفنية.',
        correctAnswer: false,
        explanation: 'خطأ، براءات الاختراع تندرج تحت الملكية الصناعية.',
        pageReference: 93
      }
    ]
  },
  {
    id: 'exam-oct-2',
    title: 'اختبار شهر أكتوبر - النموذج الثاني',
    category: 'october',
    term: 'الفصل الدراسي الأول',
    year: '2025 / 2026',
    durationMinutes: 30,
    totalScore: 20,
    questions: [
      {
        id: 'oct2-1',
        type: 'mcq',
        questionText: 'عدد الاحتمالات التي يمكن تمثيلها بـ 1 بايت (Byte) هو:',
        options: ['128', '64', '256', '512'],
        correctAnswer: 2,
        explanation: 'البايت = 8 بتات -> 2^8 = 256 احتمالاً (من 0 إلى 255).',
        pageReference: 94
      },
      {
        id: 'oct2-2',
        type: 'mcq',
        questionText: 'برنامج التجسس يجمع المعلومات الشخصية للمستخدم ...... علمه:',
        options: ['دون', 'بموافقة', 'بعد إذن', 'بعد رفض المستخدم'],
        correctAnswer: 0,
        explanation: 'برامج التجسس تعمل سراً بالخلفية دون علم أو موافقة الضحية.',
        pageReference: 94
      },
      {
        id: 'oct2-3',
        type: 'mcq',
        questionText: 'حق يهدف إلى حماية المصالح الاقتصادية للمشاهير وغيرهم في استغلال صورهم لأغراض دعائية:',
        options: ['البيانات الأساسية', 'الحق في الخصوصية', 'البيانات الشخصية', 'حقوق الدعاية'],
        correctAnswer: 3,
        explanation: 'حقوق الدعاية (Rights of publicity) تمنح السيطرة التجارية على الصورة والاسم.',
        pageReference: 94
      },
      {
        id: 'oct2-4',
        type: 'mcq',
        questionText: 'المثال 6 ÷ 2 = 3 والباقي 0 يستخدم لشرح عملية التحويل من:',
        options: ['ثنائي إلى عشري', 'عشري إلى ثنائي', 'بايت إلى بت', 'بايت إلى تيرا'],
        correctAnswer: 1,
        explanation: 'القسمة المتكررة على 2 هي طريقة التحويل من عشري إلى ثنائي.',
        pageReference: 94
      },
      {
        id: 'oct2-5',
        type: 'mcq',
        questionText: 'الدودة (Worm) ...... عبر الإنترنت:',
        options: ['تجمع البيانات', 'تحقق الهدف', 'تنسخ نفسها وتنتشر ذاتياً', 'تحمي نفسها'],
        correctAnswer: 2,
        explanation: 'الديدان متميزة بقدرتها الفائقة على التكاثر والانتشار الذاتي في الشبكات.',
        pageReference: 94
      }
    ]
  },
  {
    id: 'exam-gov-giza',
    title: 'امتحان إدارة أكتوبر / الجيزة',
    category: 'final_governorate',
    governorate: 'الجيزة',
    administration: 'إدارة 6 أكتوبر التعليمية',
    term: 'الفصل الدراسي الأول',
    year: '2025 / 2026',
    durationMinutes: 45,
    totalScore: 30,
    questions: [
      {
        id: 'gz-1',
        type: 'problem_solving',
        questionText: 'أوجد ناتج جمع الرقمين الثنائيين التاليين: 1010_2 + 0101_2',
        correctAnswer: '1111',
        explanation: '1010 + 0101 = 1111_2 (تعادل 10 + 5 = 15 بالعشري).',
        pageReference: 175
      },
      {
        id: 'gz-2',
        type: 'problem_solving',
        questionText: 'أوجد ناتج طرح الرقمين الثنائيين التاليين: 1101_2 - 1010_2',
        correctAnswer: '0011',
        explanation: '1101 - 1010 = 0011_2 (تعادل 13 - 10 = 3 بالعشري).',
        pageReference: 175
      },
      {
        id: 'gz-3',
        type: 'mcq',
        questionText: 'أي من حقوق الملكية الصناعية يحمي الشكل أو الهيكل الخارجي للمنتج؟',
        options: ['حقوق العلامة التجارية', 'حقوق التصميم والرسوم الصناعية', 'حقوق نموذج المنفعة', 'براءة الاختراع'],
        correctAnswer: 1,
        explanation: 'الرسوم والنماذج الصناعية تحمي المظهر الخارجي والزخارف والشكل الجمالي للمنتج.',
        pageReference: 175
      },
      {
        id: 'gz-4',
        type: 'mcq',
        questionText: 'في دائرة الجمع الكامل الرمز C يشير إلى:',
        options: ['الحمل (Carry)', 'المجموع (Sum)', 'مدخل ثالث', 'خط التغذية'],
        correctAnswer: 0,
        explanation: 'الرمز C يعني Carry (الحمل الفائض المترحل للخانة التالية).',
        pageReference: 175
      },
      {
        id: 'gz-5',
        type: 'mcq',
        questionText: 'الرقم الثنائي 1101001_2 يساوي في النظام السداسي عشر:',
        options: ['A9_16', '69_16', '19_16', '91_16'],
        correctAnswer: 1,
        explanation: 'تقسيم رباعي: (0110) و (1001) -> 0110 تعادل 6 ، و 1001 تعادل 9 -> إذن الناتج 69_16.',
        pageReference: 175
      }
    ]
  },
  {
    id: 'exam-gov-cairo-zaytoun',
    title: 'امتحان إدارة الزيتون / القاهرة',
    category: 'final_governorate',
    governorate: 'القاهرة',
    administration: 'إدارة الزيتون التعليمية',
    term: 'الفصل الدراسي الأول',
    year: '2025 / 2026',
    durationMinutes: 45,
    totalScore: 30,
    questions: [
      {
        id: 'cairo-1',
        type: 'true_false',
        questionText: 'تجربة المستخدم (UX) تشير إلى الخبرة والانطباع العاطفي للمستخدم عند التفاعل مع المنتج.',
        correctAnswer: true,
        explanation: 'صحيح، UX تصف المشاعر والراحة وسهولة الاستخدام الكلية.',
        pageReference: 176
      },
      {
        id: 'cairo-2',
        type: 'true_false',
        questionText: 'المعلومات الثانوية يتم الحصول عليها من طرف ثالث مثل الكتب والصحف.',
        correctAnswer: true,
        explanation: 'صحيح، المعلومات الأولية هي المباشرة، والثانوية عبر وسيط ثالث.',
        pageReference: 176
      },
      {
        id: 'cairo-3',
        type: 'true_false',
        questionText: 'وحدة قياس الدقة في الصور (dpi) هي البكسل لكل بوصة.',
        correctAnswer: true,
        explanation: 'صحيح، dpi تعني Dots Per Inch.',
        pageReference: 176
      },
      {
        id: 'cairo-4',
        type: 'true_false',
        questionText: 'حقوق الملكية الفكرية تنقسم إلى حقوق ملكية صناعية وحقوق نشر/مؤلف.',
        correctAnswer: true,
        explanation: 'صحيح، هذان هما الفرعان الرئيسيان للملكية الفكرية.',
        pageReference: 176
      },
      {
        id: 'cairo-5',
        type: 'true_false',
        questionText: 'نظام كود ASCII يدعم جميع لغات العالم بما فيها اللغة العربية.',
        correctAnswer: false,
        explanation: 'خطأ، كود ASCII لا يدعم العربية، المعيار الشامل هو Unicode.',
        pageReference: 176
      }
    ]
  },
  {
    id: 'exam-gov-alex-montazah',
    title: 'امتحان إدارة المنتزه / الإسكندرية',
    category: 'final_governorate',
    governorate: 'الإسكندرية',
    administration: 'إدارة المنتزه التعليمية',
    term: 'الفصل الدراسي الأول',
    year: '2025 / 2026',
    durationMinutes: 45,
    totalScore: 30,
    questions: [
      {
        id: 'alex-1',
        type: 'true_false',
        questionText: 'حقوق المؤلف تهدف إلى المساهمة في التطور الثقافي بضمان الاستخدام العادل للأعمال المحمية.',
        correctAnswer: true,
        explanation: 'صحيح، التوازن بين الحماية والاستخدام العادل يعزز الثقافة.',
        pageReference: 179
      },
      {
        id: 'alex-2',
        type: 'true_false',
        questionText: 'التصميم الشامل يهدف إلى أن يتمكن جميع الأفراد بمختلف قدراتهم من استخدام المنتج بسهولة.',
        correctAnswer: true,
        explanation: 'صحيح، Universal Design يشمل الأصحاء وذوي الاحتياجات الخاصة.',
        pageReference: 179
      },
      {
        id: 'alex-3',
        type: 'mcq',
        questionText: 'في الدوائر المنطقية، أي مما يلي يعبر عن دائرة الجمع الكامل؟',
        options: ['تضم مدخلين فقط', 'تضم ناتج واحد فقط', 'تضم 3 مداخل وتنتج ناتجين: Sum و Carry', 'لا تحتوي على بوابات'],
        correctAnswer: 2,
        explanation: 'الجمع الكامل تستقبل A, B, Cin وتخرج المجموع Sum والحمل Carry.',
        pageReference: 179
      },
      {
        id: 'alex-4',
        type: 'mcq',
        questionText: 'ناتج تحويل 10011010_2 من النظام الثنائي إلى النظام السادس عشر هو:',
        options: ['A5_16', '9C_16', '9A_16', 'A9_16'],
        correctAnswer: 2,
        explanation: '1001 تعادل 9 ، و 1010 تعادل A -> 9A_16.',
        pageReference: 179
      }
    ]
  },
  {
    id: 'exam-gov-dakahlia-azhar',
    title: 'امتحان إدارة الأزهر / الدقهلية',
    category: 'final_governorate',
    governorate: 'الدقهلية',
    administration: 'إدارة الأزهر التعليمية',
    term: 'الفصل الدراسي الأول',
    year: '2025 / 2026',
    durationMinutes: 45,
    totalScore: 30,
    questions: [
      {
        id: 'dak-1',
        type: 'mcq',
        questionText: 'أي مما يلي يمثل المعلومات؟',
        options: ['الحقائق الخام', 'ما يحمل معنى أو قيمة للمتلقي ويساعد في القرار', 'رموز غير مفهومة', 'أرقام فقط'],
        correctAnswer: 1,
        explanation: 'المعلومات هي البيانات المعالجة ذات القيمة والمعنى.',
        pageReference: 177
      },
      {
        id: 'dak-2',
        type: 'mcq',
        questionText: 'وسائط النقل أو الإرسال تتضمن:',
        options: ['التلفزيون والراديو والإنترنت', 'أقراص DVD', 'النصوص والصور', 'التخزين السحابي'],
        correctAnswer: 0,
        explanation: 'وسائط النقل والإرسال تنقل المعلومات بين الأطراف.',
        pageReference: 177
      },
      {
        id: 'dak-3',
        type: 'mcq',
        questionText: 'أي من البرمجيات الخبيثة يعمل على تكرار نفسه والانتشار عبر الشبكة؟',
        options: ['برامج الفدية', 'الدودة (Worm)', 'برامج التجسس', 'حصان طروادة'],
        correctAnswer: 1,
        explanation: 'الدودة تتكاثر وتنتشر ذاتياً.',
        pageReference: 177
      }
    ]
  },
  {
    id: 'exam-gov-monufia',
    title: 'امتحان إدارة بركة السبع / المنوفية',
    category: 'final_governorate',
    governorate: 'المنوفية',
    administration: 'إدارة بركة السبع التعليمية',
    term: 'الفصل الدراسي الأول',
    year: '2025 / 2026',
    durationMinutes: 45,
    totalScore: 30,
    questions: [
      {
        id: 'mon-1',
        type: 'mcq',
        questionText: 'تخزن البرامج والبيانات مؤقتاً داخل:',
        options: ['الذاكرة الرئيسية (RAM)', 'الذاكرة الثانوية', 'وحدة الحساب', 'وحدة الإدخال'],
        correctAnswer: 0,
        explanation: 'RAM تخزن البيانات الجاري تنفيذها وتفقدها بانقطاع الكهرباء.',
        pageReference: 183
      },
      {
        id: 'mon-2',
        type: 'mcq',
        questionText: 'النظام الثنائي يستخدم:',
        options: ['0 و 1 فقط', 'من 0 إلى 9', 'A و B', '1 و 2'],
        correctAnswer: 0,
        explanation: 'أساس النظام الثنائي 2 ويتكون من الرقمين 0 و 1.',
        pageReference: 183
      },
      {
        id: 'mon-3',
        type: 'mcq',
        questionText: 'العدد السادس عشر A4_16 يساوي بالنظام الثنائي:',
        options: ['10100100_2', '10010100_2', '10101000_2', '11000100_2'],
        correctAnswer: 0,
        explanation: 'A = 1010 و 4 = 0100 -> 10100100_2.',
        pageReference: 183
      }
    ]
  },
  {
    id: 'exam-gov-damietta',
    title: 'امتحان إدارة دمياط التعليمية',
    category: 'final_governorate',
    governorate: 'دمياط',
    administration: 'إدارة دمياط التعليمية',
    term: 'الفصل الدراسي الأول',
    year: '2025 / 2026',
    durationMinutes: 45,
    totalScore: 30,
    questions: [
      {
        id: 'dam-1',
        type: 'mcq',
        questionText: 'وظيفة وحدة التحكم (CU) هي:',
        options: ['تنفيذ التعليمات وإصدار الأوامر لباقي الوحدات', 'تخزين البيانات مؤقتاً', 'معالجة البيانات فقط', 'إخراج المعلومات'],
        correctAnswer: 0,
        explanation: 'وحدة التحكم هي الموجه الرئيسي لكافة مكونات الحاسب.',
        pageReference: 185
      },
      {
        id: 'dam-2',
        type: 'mcq',
        questionText: 'العدد 2^8 يساوي:',
        options: ['256', '128', '64', '512'],
        correctAnswer: 0,
        explanation: '2 أس 8 = 256 وهو عدد الاحتمالات في البايت الواحد.',
        pageReference: 185
      },
      {
        id: 'dam-3',
        type: 'mcq',
        questionText: 'أي من القيم التالية تمثل العدد العشري 12 في النظام السادس عشر؟',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
        explanation: 'في السادس عشر: 10=A, 11=B, 12=C, 13=D, 14=E, 15=F.',
        pageReference: 185
      }
    ]
  },
  {
    id: 'exam-gov-gharbia-basyoun',
    title: 'امتحان إدارة بسيون / الغربية',
    category: 'final_governorate',
    governorate: 'الغربية',
    administration: 'إدارة بسيون التعليمية',
    term: 'الفصل الدراسي الأول',
    year: '2025 / 2026',
    durationMinutes: 45,
    totalScore: 30,
    questions: [
      {
        id: 'bas-1',
        type: 'true_false',
        questionText: 'ناتج تحويل الرقم 6 من النظام العشري إلى النظام الثنائي هو 110_2.',
        correctAnswer: true,
        explanation: 'صحيح، 6 = 4 + 2 = (1 × 2^2) + (1 × 2^1) + (0 × 2^0) = 110_2.',
        pageReference: 192
      },
      {
        id: 'bas-2',
        type: 'true_false',
        questionText: 'تهدف حقوق الطبع والنشر إلى ضمان الاستخدام العادل للأعمال المحمية.',
        correctAnswer: true,
        explanation: 'صحيح، لتحقيق التوازن بين حماية المبدع وتشجيع الثقافة.',
        pageReference: 192
      },
      {
        id: 'bas-3',
        type: 'mcq',
        questionText: 'المكمل الثنائي (Two\'s Complement) للعدد 0101_2 هو:',
        options: ['0101_2', '1111_2', '0000_2', '1011_2'],
        correctAnswer: 3,
        explanation: 'مكمل الآحاد = 1010، وبإضافة 1 يصبح 1011_2.',
        pageReference: 192
      },
      {
        id: 'bas-4',
        type: 'mcq',
        questionText: 'مكمل الآحاد للعدد الثنائي 1101_2 هو:',
        options: ['0101_2', '0011_2', '0010_2', '1010_2'],
        correctAnswer: 2,
        explanation: 'بعكس كل بت: 1101 تصبح 0010_2.',
        pageReference: 192
      }
    ]
  }
];
