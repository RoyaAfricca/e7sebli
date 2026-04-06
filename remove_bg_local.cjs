const fs = require('fs');
const path = require('path');

// Colors to key out (based on my previous generations)
const TARGET_COLORS = [
    { r: 26, g: 45, b: 89 }, // #1a2d59
    { r: 15, g: 23, b: 42 }  // #0f172a (possible dark backdrop)
];
const THRESHOLD = 50; // Sensitivity 

async function removeBackground(inputFile, outputFile) {
    try {
        const sharp = require('sharp');
        const image = sharp(inputFile).ensureAlpha();
        const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            let isMatch = false;
            for (const target of TARGET_COLORS) {
                const diff = Math.abs(r - target.r) + Math.abs(g - target.g) + Math.abs(b - target.b);
                if (diff < THRESHOLD) {
                    isMatch = true;
                    break;
                }
            }

            if (isMatch) {
                data[i + 3] = 0; // Set Alpha to 0
            }
        }

        await sharp(data, {
            raw: {
                width: info.width,
                height: info.height,
                channels: 4
            }
        }).png().toFile(outputFile);

        console.log(`Background removed from ${inputFile} -> ${outputFile}`);
    } catch (err) {
        console.error(`Error processing ${inputFile}:`, err.message);
        // Fallback for missing sharp
        if (err.message.includes('sharp')) {
            console.log('Please manualy use remove.bg as per subagent suggestion.');
        }
    }
}

const publicDir = path.join(__dirname, 'public');
removeBackground(path.join(publicDir, 'student_3d.png'), path.join(publicDir, 'student_3d.png'));
removeBackground(path.join(publicDir, 'laptop_3d.png'), path.join(publicDir, 'laptop_3d.png'));
