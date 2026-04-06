const fs = require('fs');
const path = require('path');

function saveBase64(base64Data, targetFile) {
    // Remove header (data:image/png;base64,)
    const data = base64Data.split(';base64,').pop();
    const buffer = Buffer.from(data, 'base64');
    fs.writeFileSync(targetFile, buffer);
    console.log(`Saved ${targetFile}`);
}

const args = process.argv.slice(2);
if (args.length >= 2) {
    saveBase64(args[0], path.join(__dirname, 'public', args[1]));
} else {
    console.log('Usage: node save_base64.cjs <base64> <filename>');
}
