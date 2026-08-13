#!/usr/bin/env node
/**
 * Hermes Agent - Fix multi-line and complex className concatenations
 * Handles: className={"a" + "b" + "c"} (multi-line)
 * Converts to: className={cn("a", "b", "c")}
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
let filesFixed = 0;
let bugsFixed = 0;

// Match: className={ "string" + "string" + ... } (possibly multi-line, possibly with expressions)
// Capture the entire content between { and the matching }
const classNameConcatRegex = /className=\{(["'`][^"'`]*["'`](?:\s*\+\s*["'`][^"'`]*["'`])+)\}/g;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const hasCRLF = content.includes('\r\n');
  const sep = hasCRLF ? '\r\n' : '\n';
  let modified = content;
  let fileChanged = false;
  let needsCn = false;

  let match;
  classNameConcatRegex.lastIndex = 0;
  while ((match = classNameConcatRegex.exec(modified)) !== null) {
    const full = match[0];
    const inner = match[1]; // "string" + "string" + ...
    
    // Extract all string literals
    const stringParts = inner.match(/["'`][^"'`]*["'`]/g);
    if (stringParts && stringParts.length > 1) {
      const args = stringParts.join(', ');
      const replacement = `className={cn(${args})}`;
      modified = modified.replace(full, replacement);
      fileChanged = true;
      needsCn = true;
      bugsFixed++;
    }
  }

  // Also handle: className={var + "string"} or className={"string" + var} (single, already done by fix_concat_cn but catch misses)
  const simpleRegex = /className=\{([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\+\s*(["'`][^"'`]*["'`])\}/g;
  while ((match = simpleRegex.exec(modified)) !== null) {
    const full = match[0];
    const replacement = `className={cn(${match[1]}, ${match[2]})}`;
    modified = modified.replace(full, replacement);
    fileChanged = true;
    needsCn = true;
    bugsFixed++;
  }

  const simpleRegex2 = /className=\{(["'`][^"'`]*["'`])\s*\+\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\}/g;
  while ((match = simpleRegex2.exec(modified)) !== null) {
    const full = match[0];
    const replacement = `className={cn(${match[1]}, ${match[2]})}`;
    modified = modified.replace(full, replacement);
    fileChanged = true;
    needsCn = true;
    bugsFixed++;
  }

  if (fileChanged) {
    if (needsCn && !/from\s*["']@\/lib\/utils["']/.test(modified)) {
      const lines = modified.split(sep);
      let insertIdx = -1;
      for (let j = 0; j < lines.length; j++) {
        if (/^import\s+.+\s+from\s*["']/.test(lines[j]) && !lines[j].includes('"use client"')) insertIdx = j;
      }
      if (insertIdx === -1) insertIdx = 0;
      lines.splice(insertIdx + 1, 0, 'import { cn } from"@/lib/utils";');
      modified = lines.join(sep);
    } else if (needsCn) {
      const utilsMatch = modified.match(/import\s*\{([^}]+)\}\s*from\s*["']@\/lib\/utils["']/);
      if (utilsMatch && !utilsMatch[1].includes('cn')) {
        modified = modified.replace(utilsMatch[0], `import { ${utilsMatch[1].trim()}, cn } from"@/lib\/utils";`);
      }
    }
    fs.writeFileSync(file, modified, 'utf8');
    filesFixed++;
  }
}

console.log(`Fixed ${bugsFixed} class concat bugs in ${filesFixed} files`);
