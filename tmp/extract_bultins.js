const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const dir = 'E:\\bultin';
const outDir = 'E:\\mo3adly\\tmp\\pdf_extracts';

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf'));

async function processFiles() {
    for (const file of files) {
        if (file.toLowerCase().includes('4')) continue; // Skip 4th year as user requested 1st to 3rd year
        
        const filePath = path.join(dir, file);
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
