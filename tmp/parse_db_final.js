import fs from 'fs';

let rawContent = fs.readFileSync('db_dump.txt');
let content;

if (rawContent[0] === 0xff && rawContent[1] === 0xfe) {
    content = rawContent.toString('utf16le');
} else {
    content = rawContent.toString('utf8');
}

const lines = content.split(/\r?\n/);
const tables = {};
let currentTable = null;
let headers = null;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('--- Table:')) {
        currentTable = line.split(':')[1].replace(/---/g, '').trim();
        tables[currentTable] = [];
        headers = null;
    } else if (currentTable && line && !line.startsWith('---')) {
        if (!headers) {
            headers = line.split(/\t/).map(h => h.trim());
        } else {
            const values = line.split(/\t/);
            const row = {};
            headers.forEach((header, j) => {
                if (header) {
                    row[header] = values[j] ? values[j].trim() : '';
                }
            });
            tables[currentTable].push(row);
        }
    }
}

const matieres = {};
if (tables.matiere) {
    tables.matiere.forEach(m => {
        matieres[m.codemati] = m.libematiar;
    });
}

const levelMap = {
    '210017': 'college_7',
    '210018': 'college_8',
    '210019': 'college_9',
    '311011': 'lycee_1_standard',
    '312102': 'lycee_2_lettres',
    '312202': 'lycee_2_sciences',
    '312302': 'lycee_2_info',
    '312402': 'lycee_2_economie_services',
    '312812': 'lycee_2_sport',
    '312113': 'lycee_3_lettres',
    '312213': 'lycee_3_math',
    '312223': 'lycee_3_sciences_exp',
    '312233': 'lycee_3_technique',
    '312313': 'lycee_3_info',
    '312413': 'lycee_3_economie',
    '312813': 'lycee_3_sport',
    '312114': 'lycee_4_lettres',
    '312214': 'lycee_4_math',
    '312224': 'lycee_4_sciences_exp',
    '312234': 'lycee_4_technique',
    '312314': 'lycee_4_info',
    '312414': 'lycee_4_economie',
    '312814': 'lycee_4_sport'
};

const subjectsData = {};

if (tables.matisect) {
    tables.matisect.forEach(ms => {
        const key = levelMap[ms.codenive];
        if (key) {
            if (!subjectsData[key]) subjectsData[key] = [];
            let subjectName = matieres[ms.codemati];
            if (!subjectName) return;
            
            // Standardize some names to match the code expectations
            if (subjectName.includes('عربية')) subjectName = 'العربية';
            if (subjectName.includes('فرنسية')) subjectName = 'الفرنسية';
            if (subjectName.includes('أنقليزية')) subjectName = 'الإنجليزية';
            if (subjectName.includes('إعلامية')) subjectName = 'الإعلامية';
            if (subjectName.includes('رياضيات')) subjectName = 'الرياضيات';
            if (subjectName.includes('علوم الحياة والأرض')) subjectName = 'علوم الحياة والأرض';
            if (subjectName.includes('علوم فيزيائية')) subjectName = 'العلوم الفيزيائية';
            if (subjectName.includes('فلسفة')) subjectName = 'الفلسفة';
            if (subjectName.includes('تاريخ')) subjectName = 'التاريخ';
            if (subjectName.includes('جغرافيا')) subjectName = 'الجغرافيا';

            const coefString = ms.coefmati ? ms.coefmati.replace(',', '.') : '0';
            const coef = parseFloat(coefString);
            
            const existing = subjectsData[key].find(s => s.name === subjectName);
            if (!existing) {
                subjectsData[key].push({ name: subjectName, coef: coef });
            } else if (existing.coef !== coef && coef > 0) {
                existing.coef = coef;
            }
        }
    });
}

fs.writeFileSync('tmp/subjects_update.json', JSON.stringify(subjectsData, null, 2), 'utf8');
console.log('Successfully wrote subjects_update.json');
