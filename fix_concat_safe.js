#!/usr/bin/env node
/**
 * Hermes Agent - SAFE className concat fixer (single-line only)
 * Converts className={"a" + (expr)} or className={"a" + var} to cn()
 * Only operates on lines that are VALID single-line expressions.
 * Never merges lines or creates blank lines.
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

// Pattern A: className={"string" + (...)} on a SINGLE line (balanced parens on same line)
const patA = /className=\{(["'`][^"'`]*["'`])\s*\+\s*\(([^()]*)\)\}/g;
// Pattern B: className={(...)} + "string" on SINGLE line
const patB = /className=\{\(([^()]*)\)\s*\+\s*(["'`][^"'`]*["'`])\}/g;
// Pattern C: className={"string" + var} single line
const patC = /className=\{(["'`][^"'`]*["'`])\s*\+\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\}/g;
// Pattern D: className={var + "string"} single line
const patD = /className=\{([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\+\s*(["'`][^"'`]*["'`])\}/g;

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
    // Only process if the className expression is fully contained on this single line
    // i.e. the line has a complete `className={...}` with matching braces on same line
    const openIdx = line.indexOf('className={');
    if (openIdx === -1) continue;
    // Find the matching close brace for this className (same line only)
    let depth = 0, closeIdx = -1;
    for (let j = openIdx + 'className='.length; j < line.length; j++) {
      if (line[j] === '{') depth++;
      else if (line[j] === '}') { depth--; if (depth === 0) { closeIdx = j; break; } }
    }
    if (closeIdx === -1) continue; // multi-line, skip (safe)

    const expr = line.slice(openIdx + 'className='.length, closeIdx + 1); // includes { and }
    let newExpr = expr;
    let matched = false;

    let m;
    patA.lastIndex = 0;
    while ((m = patA.exec(expr)) !== null) {
      newExpr = newExpr.replace(m[0], `cn(${m[1]}, (${m[2]}))`);
      matched = true;
    }
    patB.lastIndex = 0;
    while ((m = patB.exec(expr)) !== null) {
      newExpr = newExpr.replace(m[0], `cn((${m[1]}), ${m[2]})`);
      matched = true;
    }
    patC.lastIndex = 0;
    while ((m = patC.exec(expr)) !== null) {
      newExpr = newExpr.replace(m[0], `cn(${m[1]}, ${m[2]})`);
      matched = true;
    }
    patD.lastIndex = 0;
    while ((m = patD.exec(expr)) !== null) {
      newExpr = newExpr.replace(m[0], `cn(${m[1]}, ${m[2]})`);
      matched = true;
    }

    if (matched) {
      lines[i] = line.slice(0, openIdx) + 'className=' + newExpr + line.slice(closeIdx + 1);
      changed = true;
      needsCn = true;
      bugs++;
    }
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
