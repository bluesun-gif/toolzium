const fs = require('fs');

const content = fs.readFileSync('data/tools.ts', 'utf8');

// Quick regex to find all category definitions
const categoryRegex = /{\s*title:\s*["']([^"']+)["'],\s*url:\s*["']([^"']+)["'],\s*icon:\s*(\w+)/g;
let match;
const categories = [];

while ((match = categoryRegex.exec(content)) !== null) {
  categories.push({
    title: match[1],
    url: match[2],
    icon: match[3]
  });
}

console.log(`Found ${categories.length} categories:`);
categories.forEach(c => console.log(`  ${c.title} -> ${c.url} (${c.icon})`));
