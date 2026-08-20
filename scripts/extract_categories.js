const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'data', 'tools.ts'), 'utf8');

// We can require it or parse it. Since tools.ts is TypeScript with imports, let's parse the categories with a small script
const categories = [];
const lines = content.split('\n');

let currentCat = null;
let inTools = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const catMatch = line.match(/^\s*title:\s*["']([^"']+)["'],\s*$/);
  const urlMatch = line.match(/^\s*url:\s*["'](\/tools\/[a-z0-9-_]+)["'],\s*$/);
  const iconMatch = line.match(/^\s*icon:\s*(\w+),\s*$/);
  
  if (catMatch && lines[i+1] && lines[i+1].includes('url: "/tools/')) {
    const nextUrl = lines[i+1].match(/url:\s*["'](\/tools\/[a-z0-9-_]+)["']/);
    const nextIcon = lines[i+2] ? lines[i+2].match(/icon:\s*(\w+)/) : null;
    if (nextUrl) {
      currentCat = {
        title: catMatch[1],
        url: nextUrl[1],
        slug: nextUrl[1].replace('/tools/', ''),
        icon: nextIcon ? nextIcon[1] : 'Sparkles',
        tools: []
      };
      categories.push(currentCat);
    }
  }
}

console.log(categories);
