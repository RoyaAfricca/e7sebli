const fs = require('fs');
const files = ['e:/Nouveau dossier (12)/src/App.jsx', 'e:/Nouveau dossier (12)/src/index.css'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/#f51e65/gi, '#38bdf8');
    content = content.replace(/rgba\(245,\s*30,\s*101/gi, 'rgba(56,189,248');
    content = content.replace(/rgba\(245,30,101/gi, 'rgba(56,189,248');
    fs.writeFileSync(file, content);
    console.log(`Replaced colors in ${file}`);
  }
});
