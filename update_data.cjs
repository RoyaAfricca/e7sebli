const fs = require('fs');

const dataFile = 'e:\\\\Nouveau dossier (12)\\\\src\\\\data.js';
let content = fs.readFileSync(dataFile, 'utf8');

const updatedLycee = `  // Lycée 1 (Tronc Commun)
  'lycee_1': [
    { name: 'العربية', coef: 3, hasOral: true },
    { name: 'الفرنسية', coef: 3, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'الرياضيات', coef: 4, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 3, hasTP: true },
    { name: 'علوم الحياة والأرض', coef: 2, hasTP: true },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'تكنولوجيا', coef: 1, hasTP: true },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
  ],

  // Lycée 2
  'lycee_2_lettres': [
    { name: 'العربية', coef: 4, hasOral: true, dcCount: 2 },
    { name: 'الفرنسية', coef: 3, hasOral: true },
    { name: 'الإنجليزية', coef: 3, hasOral: true },
    { name: 'التاريخ', coef: 1.5, hasOral: true },
    { name: 'الجغرافيا', coef: 1.5, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'الرياضيات', coef: 2 },
    { name: 'علوم الحياة والأرض', coef: 1, hasTP: true },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
  ],
  'lycee_2_sciences': [
    { name: 'الرياضيات', coef: 5, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 5, hasTP: true, dcCount: 2 },
    { name: 'علوم الحياة والأرض', coef: 4, hasTP: true },
    { name: 'العربية', coef: 2, hasOral: true },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'تكنولوجيا', coef: 1, hasTP: true },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
  ],
  'lycee_2_economie_services': [
    { name: 'الاقتصاد', coef: 3, dcCount: 2 },
    { name: 'التصرف', coef: 3, dcCount: 2 },
    { name: 'الرياضيات', coef: 3 },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'العربية', coef: 2, hasOral: true },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
  ],
  'lycee_2_info': [
    { name: 'تكنولوجيا الإعلامية', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 4, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 3, hasTP: true },
    { name: 'العربية', coef: 2, hasOral: true },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
  ],
  'lycee_2_sport': [
    { name: 'العلوم البيولوجية', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 2 },
    { name: 'علوم فيزيائية', coef: 2, hasTP: true },
    { name: 'العربية', coef: 3, hasOral: true, dcCount: 2 },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'اختصاص رياضي', coef: 3, hasTP: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
  ],

  // Lycée 3
  'lycee_3_math': [
    { name: 'الرياضيات', coef: 6, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'علوم الحياة والأرض', coef: 2, hasTP: true },
    { name: 'العربية', coef: 2, hasOral: true },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
  ],
  'lycee_3_sciences_exp': [
    { name: 'علوم الحياة والأرض', coef: 5, hasTP: true, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 5, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 4, dcCount: 2 },
    { name: 'العربية', coef: 2, hasOral: true },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
  ],

  // Bac (Lycée 4)
  'lycee_4_math': [
    { name: 'الرياضيات', coef: 6, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'علوم الحياة والأرض', coef: 2, hasTP: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'العربية', coef: 2, hasOral: true },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
  ],
  'lycee_4_sciences_exp': [
    { name: 'علوم الحياة والأرض', coef: 5, hasTP: true, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 5, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 4, dcCount: 2 },
    { name: 'الفلسفة', coef: 1 },
    { name: 'العربية', coef: 2, hasOral: true },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
  ],
  'lycee_4_lettres': [
    { name: 'الفلسفة', coef: 4, dcCount: 2 },
    { name: 'العربية', coef: 4, hasOral: true, dcCount: 2 },
    { name: 'الفرنسية', coef: 3, hasOral: true },
    { name: 'الإنجليزية', coef: 3, hasOral: true },
    { name: 'التاريخ', coef: 1.5, hasOral: true },
    { name: 'الجغرافيا', coef: 1.5, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'الرياضيات', coef: 2 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
  ],
  'lycee_4_economie': [
    { name: 'الاقتصاد', coef: 3, dcCount: 2 },
    { name: 'التصرف', coef: 3, dcCount: 2 },
    { name: 'الرياضيات', coef: 2 },
    { name: 'التاريخ', coef: 1 },
    { name: 'الجغرافيا', coef: 1 },
    { name: 'الفلسفة', coef: 1 },
    { name: 'العربية', coef: 2, hasOral: true },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'الإعلامية', coef: 1.5, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
  ]
};`;

const startIndex = content.indexOf('  // Lycée 1 (Tronc Commun)');
const endIndex = content.indexOf('};', startIndex) + 2;

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + updatedLycee + content.substring(endIndex);
    fs.writeFileSync('e:\\\\Nouveau dossier (12)\\\\src\\\\data.js', newContent);
    console.log("Successfully updated data.js");
} else {
    console.log("Could not find the replace boundaries.");
}
