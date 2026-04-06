const fs = require('fs');

const dataFile = 'e:\\\\Nouveau dossier (12)\\\\src\\\\data.js';
let content = fs.readFileSync(dataFile, 'utf8');

const infoSections = `
  'lycee_3_info': [
    { name: 'الخوارزميات والبرمجة', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'قواعد البيانات', coef: 1.5, hasTP: true, dcCount: 2 },
    { name: 'تكنولوجيا المعلومات والاتصال', coef: 1.5, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 3, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 2, hasTP: true, dcCount: 2 },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  'lycee_4_info': [
    { name: 'الخوارزميات والبرمجة', coef: 3, hasTP: true, dcCount: 2 },
    { name: 'قواعد البيانات', coef: 1.5, hasTP: true, dcCount: 2 },
    { name: 'تكنولوجيا المعلومات والاتصال', coef: 1.5, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 3, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 2, hasTP: true, dcCount: 2 },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
`;

// Find the last closing brace '};'
const lastBraceIndex = content.lastIndexOf('};');

if (lastBraceIndex !== -1) {
    const newContent = content.substring(0, lastBraceIndex) + infoSections + content.substring(lastBraceIndex);
    fs.writeFileSync(dataFile, newContent);
    console.log("Successfully added Info sections to data.js");
} else {
    console.log("Could not find the closing brace.");
}
