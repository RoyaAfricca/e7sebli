const fs = require('fs');

const dataFile = 'e:\\\\Nouveau dossier (12)\\\\src\\\\data.js';
let content = fs.readFileSync(dataFile, 'utf8');

const techSections = `
  'lycee_3_technique': [
    { name: 'التكنولوجيا', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 4, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
  'lycee_4_technique': [
    { name: 'التكنولوجيا', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'الرياضيات', coef: 4, dcCount: 2 },
    { name: 'علوم فيزيائية', coef: 4, hasTP: true, dcCount: 2 },
    { name: 'العربية', coef: 1, hasOral: true },
    { name: 'الفرنسية', coef: 1, hasOral: true },
    { name: 'الإنجليزية', coef: 1, hasOral: true },
    { name: 'الفلسفة', coef: 1 },
    { name: 'الإعلامية', coef: 1, hasTP: true },
    { name: 'التربية البدنية', coef: 1, hasTP: true },
    { name: 'مادة اختيارية', coef: 1, isOptional: true },
  ],
`;

const lastBraceIndex = content.lastIndexOf('};');

if (lastBraceIndex !== -1) {
    const newContent = content.substring(0, lastBraceIndex) + techSections + content.substring(lastBraceIndex);
    fs.writeFileSync(dataFile, newContent);
    console.log("Successfully added Technique sections to data.js");
} else {
    console.log("Could not find the closing brace.");
}
