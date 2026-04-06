const fs = require('fs');

const dataFile = 'e:\\\\Nouveau dossier (12)\\\\src\\\\data.js';
let content = fs.readFileSync(dataFile, 'utf8');

const replacementText = `
  // Lycée 3
  'lycee_3_math': [
    { name: 'الرياضيات', coef: 4, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'علوم الحياة والأرض', coef: 1, hasTP: true },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
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
    { name: 'التاريخ', coef: 1, hasOral: true },
    { name: 'الجغرافيا', coef: 1, hasOral: true },
    { name: 'التفكير الإسلامي', coef: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],

  // Bac (Lycée 4)
  'lycee_4_math': [
    { name: 'الرياضيات', coef: 4, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'علوم الحياة والأرض', coef: 1, hasTP: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  'lycee_4_sciences_exp': [
    { name: 'علوم الحياة والأرض', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 3, dcCount: 2 },
    { name: 'الفلسفة', coef: 1 },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
`;

const lycee3Index = content.indexOf("  // Lycée 3");
const lycee4LettresIndex = content.indexOf("  'lycee_4_lettres': [");

if (lycee3Index !== -1 && lycee4LettresIndex !== -1) {
    const newContent = content.substring(0, lycee3Index) + replacementText.trim() + '\n' + content.substring(lycee4LettresIndex);
    fs.writeFileSync(dataFile, newContent);
    console.log("Successfully replaced lycee_3_math, lycee_3_sciences_exp, lycee_4_math, lycee_4_sciences_exp");
} else {
    console.log("Could not find the bounds.");
}
