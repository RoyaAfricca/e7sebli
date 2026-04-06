import fs from 'fs';

const content = fs.readFileSync('db_dump.txt', 'utf8');
const lines = content.split('\n');

const tables = {};
let currentTable = null;
let headers = null;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('--- Table:')) {
        currentTable = line.split(':')[1].trim();
        tables[currentTable] = [];
        headers = null;
        console.log(`Found table: ${currentTable}`);
    } else if (currentTable && line && !line.startsWith('---')) {
        if (!headers) {
            headers = line.split(/\t/);
            console.log(`Headers for ${currentTable}: ${headers.join('|')}`);
        } else {
            const values = line.split(/\t/);
            const row = {};
            headers.forEach((header, j) => {
                row[header.trim()] = values[j] ? values[j].trim() : '';
            });
            tables[currentTable].push(row);
        }
    }
}

console.log(`Total tables: ${Object.keys(tables).length}`);
if (tables.matiere) console.log(`Matiere rows: ${tables.matiere.length}`);
if (tables.matisect) console.log(`Matisect rows: ${tables.matisect.length}`);
if (tables.nivescol) console.log(`Nivescol rows: ${tables.nivescol.length}`);

// Example check
if (tables.matisect && tables.matisect.length > 0) {
    console.log('First matisect row:', tables.matisect[0]);
}
