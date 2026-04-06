import fs from 'fs';
import path from 'path';
import Tesseract from 'tesseract.js';

const imgDir = 'E:\\mo3adly\\tmp\\pdf_images';
const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.png'));

async function processImages() {
    for (const file of files) {
        if (file.toLowerCase().includes('4')) continue;
        const filePath = path.join(imgDir, file);
        console.log(`Processing ${file}...`);
        try {
            const { data: { text } } = await Tesseract.recognize(
                filePath,
                'ara+fra',
                { logger: m => {} }
            );
            fs.writeFileSync(filePath.replace('.png', '.txt'), text);
            console.log(`Done ${file}`);
        } catch (e) {
            console.error(`Error ${file}`, e);
        }
    }
}

processImages();
