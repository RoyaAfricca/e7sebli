export const COLEGE_LEVELS = [
  { id: '7', name: '7 أساسي' },
  { id: '8', name: '8 أساسي' },
  { id: '9', name: '9 أساسي' },
];

export const LYCEE_YEARS = [
  { id: '1', name: '1 ثانوي' },
  { id: '2', name: '2 ثانوي' },
  { id: '3', name: '3 ثانوي' },
  { id: '4', name: '4 ثانوي (باكالوريا)' },
];

export const SECTIONS_1 = [
  { id: 'standard', name: 'جذع مشترك' },
  { id: 'sport', name: 'رياضي' },
];

export const SECTIONS_2 = [
  { id: 'lettres', name: 'آداب' },
  { id: 'sciences', name: 'علوم' },
  { id: 'economie_services', name: 'اقتصاد وخدمات' },
  { id: 'info', name: 'تكنولوجيا الإعلامية' },
  { id: 'sport', name: 'رياضة' },
];

export const SECTIONS = [
  { id: 'lettres', name: 'آداب' },
  { id: 'math', name: 'رياضيات' },
  { id: 'sciences_exp', name: 'علوم تجريبية' },
  { id: 'economie', name: 'اقتصاد وتصرف' },
  { id: 'technique', name: 'تقنية' },
  { id: 'info', name: 'علوم الإعلامية' },
  { id: 'sport', name: 'رياضة' },
];

// Reference subjects for the "9.00-9.99" success rule (rachat)
export const REFERENCE_SUBJECTS = {
  // 3rd & 4th year
  'math': ['الرياضيات', 'العلوم الفيزيائية', 'علوم الحياة والأرض', 'الإنجليزية'],
  'sciences_exp': ['علوم الحياة والأرض', 'العلوم الفيزيائية', 'الرياضيات', 'الإنجليزية'],
  'technique': ['التكنولوجيا', 'الرياضيات', 'العلوم الفيزيائية', 'الإنجليزية'],
  'economie': ['الاقتصاد', 'التصرف', 'الرياضيات', 'الإنجليزية'],
  'lettres': ['العربية', 'الفرنسية', 'الإنجليزية'],
  'info': ['الخوارزميات والبرمجة', 'الرياضيات', 'العلوم الفيزيائية', 'الإنجليزية'],
  'sport': ['العلوم البيولوجية', 'اختصاص رياضي', 'الرياضيات', 'العلوم الفيزيائية', 'التربية البدنية', 'الإنجليزية'],
  
  // 2nd year
  'lettres_2': ['العربية', 'الفرنسية', 'الإنجليزية', 'التاريخ', 'الجغرافيا'],
  'sciences_2': ['الرياضيات', 'العلوم الفيزيائية', 'علوم الحياة والأرض', 'الإنجليزية'],
  'economie_services_2': ['الاقتصاد', 'التصرف', 'الرياضيات', 'الإنجليزية'],
  'info_2': ['تكنولوجيا الإعلامية', 'الرياضيات', 'العلوم الفيزيائية', 'الإنجليزية'],
  'sport_2': ['العلوم البيولوجية', 'الرياضيات', 'العلوم الفيزيائية', 'الإنجليزية'],

  // 1st year (Group 1 & Group 2 subjects)
  'standard_1': ['الرياضيات', 'العربية', 'الفرنسية', 'الإنجليزية', 'العلوم الفيزيائية', 'علوم الحياة والأرض', 'تكنولوجيا', 'التاريخ', 'الجغرافيا'],
  'sport_1': ['الرياضيات', 'العربية', 'الفرنسية', 'الإنجليزية', 'العلوم الفيزيائية', 'الاختصاص الرياضي', 'العلوم البيولوجية', 'التاريخ', 'الجغرافيا'],
};

export const SUBJECTS_DATA = {
  // ===================== COLLÈGE =====================
  'college_7': [
    { name: 'العربية', coef: 4, hasOral: true, dcCount: 2, isLang: true },
    { name: 'الفرنسية', coef: 4, hasOral: true, isLang: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true, isLang: true },
    { name: 'الرياضيات', coef: 3, dcCount: 2 },
    { name: 'علوم الحياة والأرض', coef: 1.5, hasTP: true },
    { name: 'العلوم الفيزيائية', coef: 1.5, hasTP: true },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'التربية المدنية', coef: 1, hasOral: true },
    { name: 'التربية الإسلامية', coef: 1, hasOral: true },
    { name: 'تكنولوجيا', coef: 1, hasTP: true },
    { name: 'الإعلامية', coef: 1, hasTP: true, hasNoDC: true, dsWeight: 1 },
    { name: 'التربية البدنية', coef: 1, isPE: true, dcCount: 2, hasNoDS: true },
    { name: 'التربية الموسيقية', coef: 1, hasTP: true, hasNoDC: true, tpWeight: 2, dsWeight: 1, isArt: true },
    { name: 'تربية مسرحية', coef: 1, hasTP: true, hasNoDC: true, tpWeight: 2, dsWeight: 1, isArt: true },
    { name: 'التربية التشكيلية', coef: 1, hasTP: true, hasNoDC: true, tpWeight: 1, dsWeight: 2, isArtPlastic: true, isArt: true },
  ],
  'college_8': [
    { name: 'العربية', coef: 4, hasOral: true, dcCount: 2, isLang: true },
    { name: 'الفرنسية', coef: 4, hasOral: true, isLang: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true, isLang: true },
    { name: 'الرياضيات', coef: 3, dcCount: 2 },
    { name: 'علوم الحياة والأرض', coef: 1.5, hasTP: true },
    { name: 'العلوم الفيزيائية', coef: 1.5, hasTP: true },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'التربية المدنية', coef: 1, hasOral: true },
    { name: 'التربية الإسلامية', coef: 1, hasOral: true },
    { name: 'تكنولوجيا', coef: 1, hasTP: true },
    { name: 'الإعلامية', coef: 1, hasTP: true, hasNoDC: true, dsWeight: 1 },
    { name: 'التربية البدنية', coef: 1, isPE: true, dcCount: 2, hasNoDS: true },
    { name: 'التربية الموسيقية', coef: 1, hasTP: true, hasNoDC: true, tpWeight: 2, dsWeight: 1, isArt: true },
    { name: 'تربية مسرحية', coef: 1, hasTP: true, hasNoDC: true, tpWeight: 2, dsWeight: 1, isArt: true },
    { name: 'التربية التشكيلية', coef: 1, hasTP: true, hasNoDC: true, tpWeight: 1, dsWeight: 2, isArtPlastic: true, isArt: true },
  ],
  'college_9': [
    { name: 'العربية', coef: 4, hasOral: true, dcCount: 2, isLang: true },
    { name: 'الفرنسية', coef: 4, hasOral: true, isLang: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true, isLang: true },
    { name: 'الرياضيات', coef: 3, dcCount: 2 },
    { name: 'علوم الحياة والأرض', coef: 1.5, hasTP: true },
    { name: 'العلوم الفيزيائية', coef: 1.5, hasTP: true },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'التربية المدنية', coef: 1, hasOral: true },
    { name: 'التربية الإسلامية', coef: 1, hasOral: true },
    { name: 'تكنولوجيا', coef: 1, hasTP: true },
    { name: 'الإعلامية', coef: 1, hasTP: true, hasNoDC: true, dsWeight: 1 },
    { name: 'التربية البدنية', coef: 1, isPE: true, dcCount: 2, hasNoDS: true },
    { name: 'التربية الموسيقية', coef: 1, hasTP: true, hasNoDC: true, tpWeight: 2, dsWeight: 1, isArt: true },
    { name: 'تربية مسرحية', coef: 1, hasTP: true, hasNoDC: true, tpWeight: 2, dsWeight: 1, isArt: true },
    { name: 'التربية التشكيلية', coef: 1, hasTP: true, hasNoDC: true, tpWeight: 1, dsWeight: 2, isArtPlastic: true, isArt: true },
  ],

  // ===================== LYCÉE 1 =====================
  'lycee_1_standard': [
    { name: 'العربية', coef: 3, hasOral: true, dcCount: 2, isLang: true },
    { name: 'الفرنسية', coef: 2.5, hasOral: true, isLang: true },
    { name: 'الإنجليزية', coef: 1.5, hasOral: true, isLang: true },
    { name: 'الرياضيات', coef: 3, dcCount: 2 },
    { name: 'علوم الحياة والأرض', coef: 1.5, hasTP: true },
    { name: 'العلوم الفيزيائية', coef: 2.5, hasTP: true },
    { name: 'التاريخ', coef: 1.5, hasOral: true },
    { name: 'الجغرافيا', coef: 1.5, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1, hasOral: true },
    { name: 'التربية المدنية', coef: 1, hasOral: true },
    { name: 'تكنولوجيا', coef: 1, hasTP: true },
    { name: 'الإعلامية', coef: 1.5, hasTP: true, hasNoDC: true, dsWeight: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
  ],
  'lycee_1_sport': [
    { name: 'العربية', coef: 3, hasOral: true, dcCount: 2, isLang: true },
    { name: 'الفرنسية', coef: 3, hasOral: true, isLang: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true, isLang: true },
    { name: 'الرياضيات', coef: 3, dcCount: 2 },
    { name: 'العلوم البيولوجية', coef: 2, hasTP: true },
    { name: 'العلوم الفيزيائية', coef: 3, hasTP: true },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'الاختصاص الرياضي', coef: 3, dsWeight: 2, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'الإعلامية', coef: 1, hasTP: true, hasNoDC: true, dsWeight: 1 },
    { name: 'التفكير الإسلامي', coef: 1, hasOral: true },
    { name: 'التربية المدنية', coef: 1, hasOral: true },
  ],

  // ===================== LYCÉE 2 =====================
  // 2 آداب
  'lycee_2_lettres': [
    { name: 'العربية', coef: 4, hasOral: true, dcCount: 2 },
    { name: 'الفرنسية', coef: 4, hasOral: true, dcCount: 2 },
    { name: 'الإنجليزية', coef: 3, hasOral: true, dcCount: 2 },
    { name: 'التاريخ', coef: 1.5, hasOral: true },
    { name: 'الجغرافيا', coef: 1.5, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1, hasOral: true },
    { name: 'التربية المدنية', coef: 1, hasOral: true },
    { name: 'الرياضيات', coef: 1 },
    { name: 'علوم الحياة والأرض', coef: 1, hasTP: true },
    { name: 'الإعلامية', coef: 1.5, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 2 علوم
  'lycee_2_sciences': [
    { name: 'الرياضيات', coef: 4 },
    { name: 'العلوم الفيزيائية', coef: 4, hasTP: true },
    { name: 'علوم الحياة والأرض', coef: 2, hasTP: true },
    { name: 'العربية', coef: 2, hasOral: true },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1, hasOral: true },
    { name: 'التربية المدنية', coef: 1, hasOral: true },
    { name: 'تكنولوجيا', coef: 2, hasTP: true },
    { name: 'الإعلامية', coef: 1.5, hasTP: true, hasNoDC: true, dsWeight: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 2 اقتصاد وخدمات
  'lycee_2_economie_services': [
    { name: 'الاقتصاد', coef: 3 },
    { name: 'التصرف', coef: 3 },
    { name: 'الرياضيات', coef: 2.5 },
    { name: 'التاريخ', coef: 1.5, hasOral: true },
    { name: 'الجغرافيا', coef: 1.5, hasOral: true },
    { name: 'العربية', coef: 2, hasOral: true },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1, hasOral: true },
    { name: 'التربية المدنية', coef: 1, hasOral: true },
    { name: 'الإعلامية', coef: 1.5, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 2 إعلامية
  'lycee_2_info': [
    { name: 'الإعلامية', coef: 3, hasTP: true },
    { name: 'تكنولوجيا', coef: 2, hasTP: true },
    { name: 'الرياضيات', coef: 4 },
    { name: 'العلوم الفيزيائية', coef: 3, hasTP: true },
    { name: 'العربية', coef: 2, hasOral: true },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1, hasOral: true },
    { name: 'التربية المدنية', coef: 1, hasOral: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 2 رياضة
  'lycee_2_sport': [
    { name: 'العلوم البيولوجية', coef: 2.5, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 2.5 },
    { name: 'العلوم الفيزيائية', coef: 2.5, hasTP: true },
    { name: 'العربية', coef: 2, hasOral: true, dcCount: 2 },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'اختصاص رياضي', coef: 2.5, hasTP: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],

  // ===================== LYCÉE 3 =====================
  // 3 رياضيات
  'lycee_3_math': [
    { name: 'الرياضيات', coef: 4, dcCount: 1 },
    { name: 'العلوم الفيزيائية', coef: 4, hasTP: true, dcCount: 1 },
    { name: 'علوم الحياة والأرض', coef: 1.5, hasTP: true, dcCount: 1 },
    { name: 'العربية', coef: 2, hasOral: true, dcCount: 1 },
    { name: 'الفرنسية', coef: 2, hasOral: true, dcCount: 1 },
    { name: 'الإنجليزية', coef: 2, hasOral: true, dcCount: 1 },
    { name: 'الفلسفة', coef: 1, hasNoDC: true },
    { name: 'التاريخ', coef: 1, dcCount: 1 },
    { name: 'الجغرافيا', coef: 1, dcCount: 1 },
    { name: 'التفكير الإسلامي', coef: 1, dcCount: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true, hasNoDC: true, dsWeight: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 3 علوم تجريبية
  'lycee_3_sciences_exp': [
    { name: 'علوم الحياة والأرض', coef: 4, hasTP: true, dcCount: 1 },
    { name: 'العلوم الفيزيائية', coef: 4, hasTP: true, dcCount: 1 },
    { name: 'الرياضيات', coef: 3, dcCount: 1 },
    { name: 'العربية', coef: 2, hasOral: true, dcCount: 1 },
    { name: 'الفرنسية', coef: 2, hasOral: true, dcCount: 1 },
    { name: 'الإنجليزية', coef: 2, hasOral: true, dcCount: 1 },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1, dcCount: 1 },
    { name: 'التفكير الإسلامي', coef: 1, hasOral: true },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 3 آداب
  'lycee_3_lettres': [
    { name: 'العربية', coef: 4, hasOral: true, dcCount: 2, dsCount: 2, isArabicSplit: true },
    { name: 'الفرنسية', coef: 3, hasOral: true, dcCount: 1 },
    { name: 'الإنجليزية', coef: 3, hasOral: true, dcCount: 1 },
    { name: 'التاريخ', coef: 1.5, dcCount: 1 },
    { name: 'الجغرافيا', coef: 1.5, dcCount: 1 },
    { name: 'الفلسفة', coef: 1, hasOral: true, dcCount: 1 },
    { name: 'التفكير الإسلامي', coef: 1, hasOral: true, dcCount: 1 },
    { name: 'التربية المدنية', coef: 1, hasOral: true, dcCount: 1 },
    { name: 'علوم الحياة والأرض', coef: 1, hasTP: true, dcCount: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true, hasNoDC: true, dsWeight: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 3 اقتصاد وتصرف
  'lycee_3_economie': [
    { name: 'الاقتصاد', coef: 4, hasTP: true, dcCount: 1 },
    { name: 'التصرف', coef: 4, dcCount: 1 },
    { name: 'الرياضيات', coef: 2.5, dcCount: 1 },
    { name: 'التاريخ', coef: 1, dcCount: 1 },
    { name: 'الجغرافيا', coef: 2, dcCount: 1 },
    { name: 'العربية', coef: 2, hasOral: true, dcCount: 1 },
    { name: 'الفرنسية', coef: 2, hasOral: true, dcCount: 1 },
    { name: 'الإنجليزية', coef: 2, hasOral: true, dcCount: 1 },
    { name: 'الفلسفة', coef: 1, hasNoDC: true },
    { name: 'الإعلامية', coef: 1, hasTP: true, hasNoDC: true, dsWeight: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 3 رياضة
  'lycee_3_sport': [
    { name: 'العلوم البيولوجية', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'اختصاص رياضي', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 2 },
    { name: 'العلوم الفيزيائية', coef: 2, hasTP: true },
    { name: 'العربية', coef: 3, hasOral: true, dcCount: 2 },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'تاريخ وجغرافيا', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1, dcCount: 1 },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 3 تقنية
  'lycee_3_technique': [
    { name: 'التكنولوجيا', coef: 4, hasTP: true, dcCount: 1 },
    { name: 'الرياضيات', coef: 3, dcCount: 1 },
    { name: 'العلوم الفيزيائية', coef: 4, hasTP: true, dcCount: 1 },
    { name: 'العربية', coef: 1, hasOral: true, dcCount: 1 },
    { name: 'الفرنسية', coef: 2, hasOral: true, dcCount: 1 },
    { name: 'الإنجليزية', coef: 2, hasOral: true, dcCount: 1 },
    { name: 'التاريخ', coef: 1, hasOral: true, dcCount: 1 },
    { name: 'الجغرافيا', coef: 1, hasOral: true, dcCount: 1 },
    { name: 'الفلسفة', coef: 1, dcCount: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true, hasNoDC: true, dsWeight: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 3 علوم الإعلامية (جديدة - مضافة)
  'lycee_3_info': [
    { name: 'الخوارزميات والبرمجة', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'الأنظمة وتكنولوجيا المعلومات', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 3, dcCount: 1 },
    { name: 'العلوم الفيزيائية', coef: 3, hasTP: true, dcCount: 1 },
    { name: 'العربية', coef: 1, hasOral: true, dcCount: 1 },
    { name: 'الفرنسية', coef: 2, hasOral: true, dcCount: 1 },
    { name: 'الإنجليزية', coef: 2, hasOral: true, dcCount: 1 },
    { name: 'التاريخ', coef: 1, dcCount: 1 },
    { name: 'الجغرافيا', coef: 1, dcCount: 1 },
    { name: 'الفلسفة', coef: 1, hasNoDC: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],

  // ===================== LYCÉE 4 (BACCALAURÉAT) =====================
  // 4 رياضيات
  'lycee_4_math': [
    { name: 'الرياضيات', coef: 4, dcCount: 2 },
    { name: 'العلوم الفيزيائية', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'علوم الحياة والأرض', coef: 1, hasTP: true },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1, dcCount: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 4 علوم تجريبية
  'lycee_4_sciences_exp': [
    { name: 'علوم الحياة والأرض', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'العلوم الفيزيائية', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 3, dcCount: 2 },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1, dcCount: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 4 آداب
  'lycee_4_lettres': [
    { name: 'العربية', coef: 4, hasOral: true, dcCount: 1 },
    { name: 'الفلسفة', coef: 4, hasOral: true, dcCount: 1 },
    { name: 'الفرنسية', coef: 3, hasOral: true, dcCount: 1 },
    { name: 'الإنجليزية', coef: 3, hasOral: true, dcCount: 1 },
    { name: 'التاريخ', coef: 1.5, dcCount: 1 },
    { name: 'الجغرافيا', coef: 1.5, dcCount: 1 },
    { name: 'التفكير الإسلامي', coef: 1, hasOral: true, dcCount: 1 },
    { name: 'الإعلامية', coef: 1, dcCount: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 4 اقتصاد وتصرف
  'lycee_4_economie': [
    { name: 'الاقتصاد', coef: 4 },
    { name: 'التصرف', coef: 4 },
    { name: 'الرياضيات', coef: 2.5 },
    { name: 'التاريخ', coef: 1.5, hasOral: true },
    { name: 'الجغرافيا', coef: 1.5, hasOral: true },
    { name: 'الفلسفة', coef: 1, dcCount: 1 },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 4 رياضة
  'lycee_4_sport': [
    { name: 'العلوم البيولوجية', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'اختصاص رياضي', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 2 },
    { name: 'العلوم الفيزيائية', coef: 2, hasTP: true },
    { name: 'العربية', coef: 2, hasOral: true, dcCount: 2 },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'تاريخ وجغرافيا', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1, dcCount: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 4 تقنية
  'lycee_4_technique': [
    { name: 'التكنولوجيا', coef: 4, hasTP: true, dcCount: 1 },
    { name: 'الرياضيات', coef: 3, dcCount: 1 },
    { name: 'العلوم الفيزيائية', coef: 4, hasTP: true, dcCount: 1 },
    { name: 'دراسة نص', coef: 1, hasNoDC: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1, hasOral: true, dcCount: 1, tpWeight: 0.5 },
    { name: 'الإعلامية', coef: 1, dcCount: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  // 4 علوم الإعلامية
  'lycee_4_info': [
    { name: 'الخوارزميات والبرمجة', coef: 3, dcCount: 2 },
    { name: 'الأنظمة وتكنولوجيا المعلومات', coef: 3, dcCount: 2 },
    { name: 'الرياضيات', coef: 3, dcCount: 1 },
    { name: 'العلوم الفيزيائية', coef: 3, hasTP: true, dcCount: 1 },
    { name: 'دراسة نص', coef: 1, hasNoDC: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1, hasOral: true, dcCount: 1, tpWeight: 0.5 },
    { name: 'التربية البدنية', coef: 1, hasTP: true, hasNoDC: true, hasNoDS: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
};

// ===================== ELECTIVE OPTIONS =====================
export const ELECTIVE_OPTIONS = {
  languages: [
    { id: 'german', name: 'اللغة الألمانية' },
    { id: 'spanish', name: 'اللغة الإسبانية' },
    { id: 'italian', name: 'اللغة الإيطالية' },
    { id: 'russian', name: 'اللغة الروسية' },
    { id: 'chinese', name: 'اللغة الصينية' },
    { id: 'turkish', name: 'اللغة التركية' },
    { id: 'portuguese', name: 'اللغة البرتغالية' },
  ],
  arts: [
    { id: 'music', name: 'التربية الموسيقية' },
    { id: 'drawing', name: 'التربية التشكيلية' },
  ],
  scientific: [
    { id: 'math', name: 'الرياضيات' },
    { id: 'svt', name: 'علوم الحياة والأرض' },
  ],
  humanities: [
    { id: 'history', name: 'التاريخ' },
    { id: 'geography', name: 'الجغرافيا' },
  ],
  it: [
    { id: 'it', name: 'الإعلامية' },
  ]
};

export const GET_ELECTIVES_FOR_SECTION = (section, year) => {
  if (section === 'lettres') {
    return [...ELECTIVE_OPTIONS.languages, ...ELECTIVE_OPTIONS.arts, ...ELECTIVE_OPTIONS.scientific];
  }
  if (section === 'sport') {
    if (year === '4') return [...ELECTIVE_OPTIONS.humanities, ...ELECTIVE_OPTIONS.it];
    // Sport usually doesn't have languages/arts electives in 3rd year if I recall correctly, but the image implies 4th only for those 3.
    // Let's stick to the image: "مواد اللغات والفنون متاحة لكافة الشعب باستثناء شعبة الرياضة".
    // So for sport, it's only Humanities/IT in 4th year.
    return [];
  }
  return [...ELECTIVE_OPTIONS.languages, ...ELECTIVE_OPTIONS.arts];
};
