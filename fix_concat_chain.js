#!/usr/bin/env node
/**
 * Hermes Agent - SAFE chain concat fixer (single-line className only)
 * Handles: className={"a" + var + "b" + (expr) + "c"}
 * Converts to: className={cn("a", var, "b", (expr), "c")}
 * Single-line only. Never merges lines or creates blanks.
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
let totalBugs = 0, filesChanged = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const hasCRLF = content.includes('\r\n');
  const sep = hasCRLF ? '\r\n' : '\n';
  const lines = content.split(sep);
  let changed = false;
  let needsCn = false;
  let bugs = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes('className') || !line.includes('+') || line.includes('cn(')) continue;
    const openIdx = line.indexOf('className={');
    if (openIdx === -1) continue;
    // Find matching close brace on SAME line only
    let depth = 0, closeIdx = -1;
    for (let j = openIdx + 'className='.length; j < line.length; j++) {
      if (line[j] === '{') depth++;
      else if (line[j] === '}') { depth--; if (depth === 0) { closeIdx = j; break; } }
    }
    if (closeIdx === -1) continue; // multiline — skip (safe)

    const inner = line.slice(openIdx + 'className={'.length, closeIdx); // content between { and }
    // Must contain a + to be a concat bug
    if (!inner.includes('+')) continue;

    // Tokenize the inner expression by + (respecting string/ paren boundaries)
    const tokens = [];
    let cur = '';
    let inStr = null;
    let paren = 0;
    for (let k = 0; k < inner.length; k++) {
      const ch = inner[k];
      if (inStr) {
        cur += ch;
        if (ch === inStr && inner[k-1] !== '\\') inStr = null;
      } else if (ch === '"' || ch === "'" || ch === '`') {
        inStr = ch; cur += ch;
      } else if (ch === '(') {
        paren++; cur += ch;
      } else if (ch === ')') {
        paren--; cur += ch;
      } else if (ch === '+' && paren === 0) {
        tokens.push(cur.trim());
        cur = '';
      } else {
        cur += ch;
      }
    }
    if (cur.trim()) tokens.push(cur.trim());

    // Build cn() args — each token is either a string literal or an expression
    const args = tokens.map(t => t);
    const replacement = `cn(${args.join(', ')})`;
    const newLine = line.slice(0, openIdx) + 'className={' + replacement + '}' + line.slice(closeIdx + 1);
    lines[i] = newLine;
    changed = true;
    needsCn = true;
    bugs++;
  }

  if (changed) {
    let modified = lines.join(sep);
    if (needsCn && !/from\s*["']@\/lib\/utils["']/.test(modified)) {
      const ls = modified.split(sep);
      let ins = -1;
      for (let j = 0; j < ls.length; j++) {
        if (/^import\s+.+\s+from\s*["']/.test(ls[j]) && !ls[j].includes('"use client"')) ins = j;
      }
      if (ins === -1) ins = 0;
      ls.splice(ins + 1, 0, 'import { cn } from"@/lib/utils";');
      modified = ls.join(sep);
    } else if (needsCn) {
      const um = modified.match(/import\s*\{([^}]+)\}\s*from\s*["']@\/lib\/utils["']/);
      if (um && !um[1].includes('cn')) {
        modified = modified.replace(um[0], `import { ${um[1].trim()}, cn } from"@/lib/utils";`);
      }
    }
    fs.writeFileSync(file, modified, 'utf8');
    filesChanged++;
    totalBugs += bugs;
    console.log(`Fixed ${bugs} bugs in ${path.basename(file)}`);
  }
}

console.log(`\nTotal: ${totalBugs} bugs fixed in ${filesChanged} files`);
