const fs = require('fs');

const dataFile = 'e:\\\\Nouveau dossier (12)\\\\src\\\\data.js';
let content = fs.readFileSync(dataFile, 'utf8');

const updatedSections = `
  // Lycée 3
  'lycee_3_math': [
    { name: 'الرياضيات', coef: 4, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'علوم الحياة والأرض', coef: 1, hasTP: true },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'تاريخ وجغرافيا', coef: 2, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  'lycee_3_sciences_exp': [
    { name: 'علوم الحياة والأرض', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 3, dcCount: 2 },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'تاريخ وجغرافيا', coef: 2, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  'lycee_3_lettres': [
    { name: 'العربية', coef: 4, hasOral: true, dcCount: 2 },
    { name: 'الفلسفة', coef: 2, dcCount: 2 },
    { name: 'الفرنسية', coef: 3, hasOral: true },
    { name: 'الإنجليزية', coef: 3, hasOral: true },
    { name: 'تاريخ وجغرافيا', coef: 2, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'الرياضيات', coef: 2 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  'lycee_3_economie': [
    { name: 'الاقتصاد', coef: 3, dcCount: 2 },
    { name: 'التصرف', coef: 3, dcCount: 2 },
    { name: 'الرياضيات', coef: 3 },
    { name: 'تاريخ وجغرافيا', coef: 2, hasOral: true },
    { name: 'العربية', coef: 2, hasOral: true },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  'lycee_3_sport': [
    { name: 'العلوم البيولوجية', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'اختصاص رياضي', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 2 },
    { name: 'علوم فيزيائية', coef: 2, hasTP: true },
    { name: 'العربية', coef: 3, hasOral: true, dcCount: 2 },
    { name: 'الفرنسية', coef: 2, hasOral: true },
    { name: 'الإنجليزية', coef: 2, hasOral: true },
    { name: 'تاريخ وجغرافيا', coef: 1, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],

  // Bac (Lycée 4)
  'lycee_4_math': [
    { name: 'الرياضيات', coef: 4, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'علوم الحياة والأرض', coef: 1, hasTP: true },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'تاريخ وجغرافيا', coef: 2, hasOral: true },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  'lycee_4_sciences_exp': [
    { name: 'علوم الحياة والأرض', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 3, dcCount: 2 },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'تاريخ وجغرافيا', coef: 2, hasOral: true },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  'lycee_4_lettres': [
    { name: 'العربية', coef: 4, hasOral: true, dcCount: 2 },
    { name: 'الفلسفة', coef: 4, dcCount: 2 },
    { name: 'الفرنسية', coef: 3, hasOral: true },
    { name: 'الإنجليزية', coef: 3, hasOral: true },
    { name: 'تاريخ وجغرافيا', coef: 3, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'الرياضيات', coef: 2 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  'lycee_4_economie': [
    { name: 'الاقتصاد', coef: 3, dcCount: 2 },
    { name: 'التصرف', coef: 3, dcCount: 2 },
    { name: 'الرياضيات', coef: 2 },
    { name: 'تاريخ وجغرافيا', coef: 2, hasOral: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الإعلامية', coef: 1.5, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  'lycee_4_sport': [
    { name: 'العلوم البيولوجية', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'اختصاص رياضي', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 2 },
    { name: 'علوم فيزيائية', coef: 2, hasTP: true },
    { name: 'العربية', coef: 2, hasOral: true, dcCount: 2 },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'تاريخ وجغرافيا', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
`;

// Replace Lycée 3 and 4 blocks
const startMarker = "// Lycée 3";
const endMarker = "  'lycee_4_info': [";
const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + updatedSections.trim() + '\n\n' + content.substring(endIndex);
    fs.writeFileSync(dataFile, newContent);
    console.log("Successfully updated all Lycée 3 and 4 sections with merged History/Geography.");
} else {
    console.log("Could not find replacement boundaries in data.js");
}
