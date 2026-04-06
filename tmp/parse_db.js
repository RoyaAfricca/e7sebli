import fs from 'fs';

const content = fs.readFileSync('db_dump.txt', 'utf8');

const tables = {};
let currentTable = null;
let headers = null;

content.split('\n').forEach(line => {
    if (line.startsWith('--- Table:')) {
        currentTable = line.split(':')[1].trim();
        tables[currentTable] = [];
        headers = null;
    } else if (currentTable && line.trim() && !line.startsWith('---')) {
        if (!headers) {
            headers = line.trim().split(/\t+/);
        } else {
            const values = line.trim().split(/\t+/);
            const row = {};
            headers.forEach((header, i) => {
                row[header] = values[i] ? values[i].trim() : '';
            });
            tables[currentTable].push(row);
        }
    }
});

const matieres = {};
if (tables.matiere) {
    tables.matiere.forEach(m => {
        matieres[m.codemati] = { ar: m.libematiar, fr: m.libematifr };
    });
}

const levels = {};
if (tables.nivescol) {
    tables.nivescol.forEach(n => {
        levels[n.codenive] = {
            name: n.libenivear,
            codesect: n.codesect
        };
    });
}

const data = {};

if (tables.matisect) {
    tables.matisect.forEach(ms => {
        const level = levels[ms.codenive];
        if (!level) return;

        const levelName = level.name;
        if (!data[levelName]) data[levelName] = [];

        const mat = matieres[ms.codemati];
        if (!mat) return;
        
        const coefString = ms.coefmati ? ms.coefmati.replace(',', '.') : '0';
        const coef = parseFloat(coefString);
        
        // Check if subject already exists for this level
        const existing = data[levelName].find(s => s.name === mat.ar);
        if (!existing) {
            data[levelName].push({
                name: mat.ar,
                coef: coef
            });
        }
    });
}

console.log(JSON.stringify(data, null, 2));
