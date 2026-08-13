#!/usr/bin/env node
/**
 * Hermes Agent - Fix literal + concatenation in className
 * Converts: className={"p-4 rounded-md" + (cond ? "a" : "b")}
 * To:       className={cn("p-4 rounded-md", cond ? "a" : "b")}
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

// Pattern 1: className={"literal" + expr} or className={expr + "literal"}
// Pattern 2: className={`...` + expr} or className={expr + `...`}
const regexes = [
  // className="literal" + (...)
  /className=\{(["'`][^"'`]*["'`])\s*\+\s*(\([^)]*\))\}/g,
  // className=(...) + "literal"
  /className=\{(\([^)]*\))\s*\+\s*(["'`][^"'`]*["'`])\}/g,
  // className=var + "literal"
  /className=\{([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\+\s*(["'`][^"'`]*["'`])\}/g,
  // className="literal" + var
  /className=\{(["'`][^"'`]*["'`])\s*\+\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\}/g,
  // className="literal" + (complex expression with nested parens)
  /className=\{(["'`][^"'`]*["'`])\s*\+\s*(\([\s\S]*?\))\}/g,
];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const hasCRLF = content.includes('\r\n');
  const sep = hasCRLF ? '\r\n' : '\n';
  let modified = content;
  let fileChanged = false;
  let needsCn = false;

  // Helper: find balanced paren expression starting after "className={... +"
  function fixConcat(line) {
    // Match: className={"string" + (expr)} or className={(expr) + "string"}
    const m = line.match(/className=\{(["'`][^"'`]*["'`])\s*\+\s*\(/);
    if (m) {
      const stringPart = m[1];
      const startIdx = line.indexOf(m[0]) + m[0].length - 1; // position of (
      // Find balanced close paren
      let depth = 0;
      let i = startIdx;
      for (; i < line.length; i++) {
        if (line[i] === '(') depth++;
        else if (line[i] === ')') {
          depth--;
          if (depth === 0) break;
        }
      }
      if (i < line.length) {
        const expr = line.slice(startIdx, i + 1);
        const replacement = `className={cn(${stringPart}, ${expr})}`;
        return line.replace(/className=\{["'`][^"'`]*["'`]\s*\+\s*\([\s\S]*?\)\}/, replacement);
      }
    }
    // Match: className={(expr) + "string"}
    const m2 = line.match(/className=\{\(/);
    if (m2) {
      const startIdx = line.indexOf('className={(') + 'className={'.length;
      let depth = 0;
      let i = startIdx;
      for (; i < line.length; i++) {
        if (line[i] === '(') depth++;
        else if (line[i] === ')') {
          depth--;
          if (depth === 0) break;
        }
      }
      if (i < line.length && line[i+1] === '+' && /["'`]/.test(line[i+2] || '')) {
        // find the string
        const afterPlus = line.slice(i + 1).match(/\+\s*(["'`][^"'`]*["'`])\}/);
        if (afterPlus) {
          const expr = line.slice(startIdx, i + 1);
          const str = afterPlus[1];
          const replacement = `className={cn(${expr}, ${str})}`;
          return line.replace(/className=\(\s*[\s\S]*?\)\s*\+\s*["'`][^"'`]*["'`]\}/, replacement);
        }
      }
    }
    // Match: className={"string" + var} (single line)
    const m3 = line.match(/className=\{(["'`][^"'`]*["'`])\s*\+\s*([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*\})?/);
    if (m3) {
      const replacement = `className={cn(${m3[1]}, ${m3[2]})}`;
      return line.replace(/className=\{(["'`][^"'`]*["'`])\s*\+\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/, replacement);
    }
    // Match: className={var + "string"} (single line)
    const m4 = line.match(/className=\{([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\+\s*(["'`][^"'`]*["'`])(\s*\})?/);
    if (m4) {
      const replacement = `className={cn(${m4[1]}, ${m4[2]})}`;
      return line.replace(/className=\{([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\+\s*(["'`][^"'`]*["'`])/, replacement);
    }
    return line;
  }

  const lines = modified.split(sep);
  let changedLines = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('className') && lines[i].includes('+') && !lines[i].includes('cn(')) {
      const fixed = fixConcat(lines[i]);
      if (fixed !== lines[i]) {
        lines[i] = fixed;
        changedLines = true;
        needsCn = true;
        bugsFixed++;
      } else if (lines[i].trim().endsWith('+') || /className=\{["'`][^"'`]*["'`]\s*\+$/.test(lines[i])) {
        // Multi-line case: combine with next line
        const combined = lines[i] + (lines[i+1] || '');
        const fixedCombined = fixConcat(combined);
        if (fixedCombined !== combined && fixedCombined.includes('cn(')) {
          // Replace current line with fixed, remove next line content
          lines[i] = fixedCombined;
          lines[i+1] = '';
          changedLines = true;
          needsCn = true;
          bugsFixed++;
        }
      }
    }
  }
  if (changedLines) {
    modified = lines.join(sep);
    fileChanged = true;
  }

  if (fileChanged) {
    // Ensure cn import
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
        modified = modified.replace(utilsMatch[0], `import { ${utilsMatch[1].trim()}, cn } from"@/lib/utils";`);
      }
    }
    fs.writeFileSync(file, modified, 'utf8');
    filesFixed++;
  }
}

console.log(`Fixed ${bugsFixed} class concat bugs in ${filesFixed} files`);
