#!/usr/bin/env node
/**
 * Hermes Agent - Fix GridPattern visibility on tool pages.
 * Replaces the faint/masked GridPattern (opacity-30 + 500px mask + -z-10)
 * with the HOMEPAGE's exact clean usage: <GridPattern /> (default component styling).
 * Also ensures the tool root container is `relative` so the absolute grid is contained.
 */
const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, 'components', 'tools');

function findClientComponents(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findClientComponents(fullPath));
    else if (entry.name.endsWith('-client.tsx')) results.push(fullPath);
  }
  return results;
}

const files = findClientComponents(TOOLS_DIR);
let fixed = 0, rootRelatived = 0;

// Match the multi-line bad GridPattern block
const badGridRegex = /<GridPattern\s*\n?\s*width=\{30\}\s*\n?\s*height=\{30\}\s*\n?\s*x=\{-1\}\s*\n?\s*y=\{-1\}\s*\n?\s*strokeDasharray="4 2"\s*\n?\s*className="[^"]*mask-image[^"]*"\s*\n?\s*\/>/;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const hasCRLF = content.includes('\r\n');
  const sep = hasCRLF ? '\r\n' : '\n';
  let changed = false;

  // 1. Replace bad GridPattern block with clean homepage-style <GridPattern />
  if (badGridRegex.test(content)) {
    content = content.replace(badGridRegex, '<GridPattern />');
    changed = true;
  }

  // 2. Also catch any leftover masked variant with different spacing
  const badGridRegex2 = /<GridPattern\s+[^>]*mask-image[^>]*\/>/;
  if (badGridRegex2.test(content)) {
    content = content.replace(badGridRegex2, '<GridPattern />');
    changed = true;
  }

  // 3. Ensure root container has `relative` for the absolute grid to be contained.
  // Find the return's first <div className="... and add relative if missing.
  if (changed) {
    // Match the first meaningful return div: return (\n <div className="..."
    const retDivRegex = /return\s*\(\s*\n\s*<div\s+className="([^"]*)"/;
    const m = content.match(retDivRegex);
    if (m) {
      const cls = m[1];
      if (!cls.includes('relative')) {
        const newCls = 'relative ' + cls;
        content = content.replace(retDivRegex, `return (\n      <div className="${newCls}"`);
        rootRelatived++;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    fixed++;
  }
}

console.log(`Fixed GridPattern in ${fixed} files (${rootRelatived} root divs made relative)`);
