const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app', 'tools');
const toolsContent = fs.readFileSync(path.join(__dirname, '..', 'data', 'tools.ts'), 'utf8');

// Get all item URLs from tools.ts
const itemUrlRegex = /url:\s*["'](\/tools\/[^"']+)["']/g;
let match;
const toolUrls = [];

while ((match = itemUrlRegex.exec(toolsContent)) !== null) {
  toolUrls.push(match[1]);
}

const uniqueToolUrls = Array.from(new Set(toolUrls));
console.log(`Total unique tool URLs in data/tools.ts: ${uniqueToolUrls.length}`);

// Check each URL to see if app[url]/page.tsx exists
const missing = [];
for (const url of uniqueToolUrls) {
  const relPath = url.replace(/^\/tools\/?/, '');
  if (!relPath) continue; // /tools itself is app/tools/page.tsx
  const fullPath = path.join(appDir, relPath, 'page.tsx');
  if (!fs.existsSync(fullPath)) {
    missing.push(url);
  }
}

console.log(`\n=== MISSING TOOL PAGE.TSX (${missing.length}) ===`);
missing.forEach(u => console.log(`  ${u}`));
