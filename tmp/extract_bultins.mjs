import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');
const pdf = typeof pdfModule === 'function' ? pdfModule : (pdfModule.default || pdfModule.parse);

const dir = 'E:\\bultin';
const outDir = 'E:\\mo3adly\\tmp\\pdf_extracts';

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf'));

async function processFiles() {
    for (const file of files) {
        if (file.toLowerCase().includes('41062025')) continue; // skip the very big pdf
        if (file.toLowerCase().includes('4')) continue;
        
        const filePath = path.join(dir, file);
        console.log(`Reading: ${filePath}`);
        const dataBuffer = fs.readFileSync(filePath);
        
        try {
            const data = await pdf(dataBuffer);
            const outPath = path.join(outDir, file.replace('.pdf', '.txt'));
            fs.writeFileSync(outPath, data.text);
            console.log(`Processed: ${file}`);
        } catch (e) {
            console.error(`Error processing ${file}`, e);
        }
    }
}

processFiles();
