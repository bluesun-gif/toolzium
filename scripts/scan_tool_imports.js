const fs = require('fs');
const path = require('path');

const appToolsDir = path.join(__dirname, '..', 'app', 'tools');

function findPageFiles(dir) {
  let pages = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      pages = pages.concat(findPageFiles(full));
    } else if (e.name === 'page.tsx') {
      const rel = path.relative(appToolsDir, full).replace(/\\/g, '/');
      // Skip category level pages (e.g. image/page.tsx)
      const parts = rel.split('/');
      if (parts.length >= 2) {
        pages.push({
          full,
          rel: rel.replace('/page.tsx', ''),
          category: parts[0],
          slug: parts[1],
        });
      }
    }
  }
  return pages;
}

const toolPages = findPageFiles(appToolsDir);
console.log(`Found ${toolPages.length} tool pages.`);

const imports = [];
toolPages.forEach(p => {
  const content = fs.readFileSync(p.full, 'utf8');
  // Match client import line
  const m = content.match(/import\s+([a-zA-Z0-9_{}\s,]+)\s+from\s+["'](@\/components\/tools\/[^"']+)["']/);
  if (m) {
    imports.push({
      pathKey: `${p.category}/${p.slug}`,
      importName: m[1].trim(),
      importPath: m[2],
    });
  }
});

console.log(`Extracted ${imports.length} client imports. Sample:`);
console.log(imports.slice(0, 5));
