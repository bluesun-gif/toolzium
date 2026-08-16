#!/usr/bin/env node
/**
 * Hermes Agent - Convert conditional className template literals to cn()
 * Targets: className={`...${cond ? "a" : "b"}`} -> className={cn("...", cond ? "a" : "b")}
 * Only handles the "Conditional class without cn()" pattern which is safe to convert.
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
let totalFixed = 0;
let filesModified = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const hasCRLF = content.includes('\r\n');
  const sep = hasCRLF ? '\r\n' : '\n';
  const lines = content.split(sep);
  let changed = false;
  let needsCn = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Match: className={`...${cond ? "x" : "y"}...`}
    // Only convert lines where the template literal has a ternary inside
    const cnMatch = line.match(/className=\{`([^`]*)\$\{([^`]*)\}([^`]*)`\}/);
    if (cnMatch) {
      const prefix = cnMatch[1]; // text before ${}
      const expr = cnMatch[2];   // the ${...} expression
      const suffix = cnMatch[3]; // text after }

      // Check if this is a conditional ternary (the pattern we want to fix)
      if (expr.includes('?') && (expr.includes('"') || expr.includes("'"))) {
        // Convert to cn() form
        // cn("prefix", expr, "suffix")
        const args = [];
        if (prefix.trim()) args.push(`"${prefix.trim()}"`);
        args.push(expr.trim());
        if (suffix.trim()) args.push(`"${suffix.trim()}"`);
        
        const newLine = line.replace(
          /className=\{`([^`]*)\$\{([^`]*)\}([^`]*)`\}/,
          `className={cn(${args.join(', ')})}`
        );
        lines[i] = newLine;
        changed = true;
        needsCn = true;
      }
    }
  }

  if (changed) {
    let modified = lines.join(sep);
    // Add cn import if not present
    if (needsCn && !/from\s*["']@\/lib\/utils["']/.test(modified)) {
      // Find a good place to add import
      const importLines = modified.split(sep);
      let insertIdx = -1;
      for (let j = 0; j < importLines.length; j++) {
        if (/^import\s+.+\s+from\s*["']/.test(importLines[j]) && !importLines[j].includes('"use client"')) {
          insertIdx = j;
        }
      }
      if (insertIdx === -1) insertIdx = 0;
      importLines.splice(insertIdx + 1, 0, 'import { cn } from"@/lib/utils";');
      modified = importLines.join(sep);
    } else if (needsCn) {
      // cn import exists but maybe not exported as cn
      const utilsMatch = modified.match(/import\s*\{([^}]+)\}\s*from\s*["']@\/lib\/utils["']/);
      if (utilsMatch && !utilsMatch[1].includes('cn')) {
        const newImport = `import { ${utilsMatch[1].trim()}, cn } from"@/lib/utils";`;
        modified = modified.replace(utilsMatch[0], newImport);
      }
    }
    fs.writeFileSync(file, modified, 'utf8');
    filesModified++;
  }
  totalFixed += changed ? 1 : 0;
}

console.log(`Modified ${filesModified} files`);
