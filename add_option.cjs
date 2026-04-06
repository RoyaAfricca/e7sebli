const fs = require('fs');

const dataFile = 'e:\\\\Nouveau dossier (12)\\\\src\\\\data.js';
let content = fs.readFileSync(dataFile, 'utf8');

// Find all occurrences of lycee_3_ and lycee_4_ array endings
// Usually they look like:
//     { name: 'X', coef: 1, hasTP: true },
//   ],

// Let's use a regex that matches `lycee_[34]_[a-z_]+': \[ ... \],`
// It's safer to just replace standard strings.
// All these arrays end with `\n  ],`
// Actually, it's easier to dynamically evaluate it if possible, but it's a JS file with `export const SUBJECTS_DATA = { ... };`.

// We'll replace the closing bracket for these specific arrays.
// The lycee_3_ and lycee_4_ keys are:
const keys = [
  "lycee_3_math",
  "lycee_3_sciences_exp",
  "lycee_4_math",
  "lycee_4_sciences_exp",
  "lycee_4_lettres",
  "lycee_4_economie"
];

for (const key of keys) {
  const marker = `'${key}': [`;
  const startIndex = content.indexOf(marker);
  if (startIndex === -1) {
     console.log('Not found:', key);
     continue;
  }
  
  const endBracketIndex = content.indexOf('  ],', startIndex);
  if (endBracketIndex !== -1) {
    // Insert optional subject right before the bracket
    const insertStr = "    { name: 'مادة اختيارية', coef: 1, isOptional: true },\n";
    content = content.slice(0, endBracketIndex) + insertStr + content.slice(endBracketIndex);
  }
}

fs.writeFileSync(dataFile, content);
console.log('Added Option Subject successfully.');
