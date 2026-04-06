const fs = require('fs');

const dataFile = 'e:\\\\Nouveau dossier (12)\\\\src\\\\data.js';
let content = fs.readFileSync(dataFile, 'utf8');

// Function to replace Hist + Geo with "تاريخ وجغرافيا" in a content string
function mergeHG(text) {
    // Specifically target Histoire/Geographie pairs
    const hRegex = /\{\s*name:\s*'التاريخ',\s*coef:\s*([\d\.]+).*?\}/g;
    const gRegex = /\{\s*name:\s*'الجغرافيا',\s*coef:\s*([\d\.]+).*?\}/g;

    // This is simple but effective for our structure
    // We'll iterate through sections
    const sections = text.match(/'lycee_[12]_[^']+':\s*\[[\s\S]*?\],/g) || [];
    let updatedText = text;

    for (const section of sections) {
        let newSection = section;
        const hMatch = hRegex.exec(section);
        hRegex.lastIndex = 0; // reset
        const gMatch = gRegex.exec(section);
        gRegex.lastIndex = 0; // reset

        if (hMatch && gMatch) {
            const hCoef = parseFloat(hMatch[1]);
            const gCoef = parseFloat(gMatch[1]);
            const totalCoef = hCoef + gCoef;
            
            // Remove التاريخ
            newSection = newSection.replace(/\{\s*name:\s*'التاريخ',[\s\S]*?\},\s*/, "");
            // Replace الجغرافيا with combined
            newSection = newSection.replace(/\{\s*name:\s*'الجغرافيا',[\s\S]*?\}/, `{ name: 'تاريخ وجغرافيا', coef: ${totalCoef}, hasOral: true }`);
            
            updatedText = updatedText.replace(section, newSection);
        }
    }
    
    // Also handle lycee_1 which is just 'lycee_1'
    const l1Section = text.match(/'lycee_1':\s*\[[\s\S]*?\],/);
    if (l1Section) {
        let newL1 = l1Section[0];
        const hMatch = hRegex.exec(newL1);
        hRegex.lastIndex = 0;
        const gMatch = gRegex.exec(newL1);
        gRegex.lastIndex = 0;
        if (hMatch && gMatch) {
            const hCoef = parseFloat(hMatch[1]);
            const gCoef = parseFloat(gMatch[1]);
            newL1 = newL1.replace(/\{\s*name:\s*'التاريخ',[\s\S]*?\},\s*/, "");
            newL1 = newL1.replace(/\{\s*name:\s*'الجغرافيا',[\s\S]*?\}/, `{ name: 'تاريخ وجغرافيا', coef: ${hCoef + gCoef}, hasOral: true }`);
            updatedText = updatedText.replace(l1Section[0], newL1);
        }
    }

    return updatedText;
}

const finalContent = mergeHG(content);
fs.writeFileSync(dataFile, finalContent);
console.log("Merged History & Geography for Lycée 1 and 2.");
