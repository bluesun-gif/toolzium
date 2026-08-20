const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app', 'tools');
const toolsFile = path.join(__dirname, '..', 'data', 'tools.ts');

// 1. Get all page.tsx files under app/tools
function getRoutes(dir, base = '/tools') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes = routes.concat(getRoutes(full, `${base}/${entry.name}`));
    } else if (entry.name === 'page.tsx') {
      routes.push(base);
    }
  }
  return routes;
}

const existingRoutes = new Set(getRoutes(appDir));
console.log(`Total existing tool page.tsx routes: ${existingRoutes.size}`);

// 2. Scan all files in project for /tools/... links
function scanLinks(dir) {
  let links = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      links = links.concat(scanLinks(full));
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.json')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/\/tools\/[a-zA-Z0-9\-_/]+/g) || [];
      for (const m of matches) {
        // clean up trailing slash, quotes, etc.
        const clean = m.replace(/[",');`]+$/, '');
        links.push({ file: full, link: clean });
      }
    }
  }
  return links;
}

const projectRoot = path.join(__dirname, '..');
const allLinks = scanLinks(projectRoot);
console.log(`Total tool link occurrences found: ${allLinks.length}`);

// Unique links
const uniqueLinks = new Set(allLinks.map(l => l.link));
const invalidLinks = [];

for (const link of uniqueLinks) {
  if (!existingRoutes.has(link)) {
    // Find where it's referenced
    const refs = allLinks.filter(l => l.link === link).map(l => path.relative(projectRoot, l.file));
    invalidLinks.push({ link, refs: Array.from(new Set(refs)) });
  }
}

console.log(`\n=== INVALID OR MISSING ROUTES (${invalidLinks.length}) ===`);
invalidLinks.sort((a,b) => a.link.localeCompare(b.link)).forEach(item => {
  console.log(`\n❌ ${item.link}`);
  console.log(`   Referenced in: ${item.refs.slice(0, 3).join(', ')}${item.refs.length > 3 ? ` (+${item.refs.length - 3} more)` : ''}`);
});
