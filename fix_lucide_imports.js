#!/usr/bin/env node
/**
 * Hermes Agent - Fix lucide-react import corruption
 * Fixes: double semicolons, double commas, duplicate icons
 */
const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, 'components', 'tools');

function findClientComponents(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findClientComponents(fullPath));
    } else if (entry.name.endsWith('-client.tsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = findClientComponents(TOOLS_DIR);
let fixed = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let modified = content;
  const hasCRLF = content.includes('\r\n');
  const sep = hasCRLF ? '\r\n' : '\n';
  const lines = modified.split(sep);
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Match lucide-react import
    const lucideMatch = line.match(/^import\s*\{([^}]+)\}\s*from\s*["']lucide-react["'];*/);
    if (lucideMatch) {
      const iconsStr = lucideMatch[1];
      // Split by comma, trim, filter empties, dedupe
      const icons = [...new Set(iconsStr.split(',').map(s => s.trim()).filter(s => s.length > 0))];
      const newLine = `import { ${icons.join(', ')} } from"lucide-react";`;
      if (newLine !== line) {
        lines[i] = newLine;
        changed = true;
      }
    }
  }

  if (changed) {
    modified = lines.join(sep);
    fs.writeFileSync(file, modified, 'utf8');
    fixed++;
  }
}

console.log(`Fixed ${fixed} files with lucide-react import issues`);
