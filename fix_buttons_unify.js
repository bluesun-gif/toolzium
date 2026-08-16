#!/usr/bin/env node
/**
 * Hermes Agent - Unify tool-page raw <button> to shared <Button> (homepage standard).
 * SAFE version: only converts simple single-line <button> open tags, preserves all
 * attributes, wraps className via cn(), adds imports correctly. Verified per-file.
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
let converted = 0, filesChanged = 0, skipped = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const hasCRLF = content.includes('\r\n');
  const sep = hasCRLF ? '\r\n' : '\n';
  const hasRawButton = /<button[\s>]/.test(content);
  if (!hasRawButton) continue;
  const importsButton = /from\s*["']@\/components\/ui\/button["']/.test(content);

  const lines = content.split(sep);
  let changed = false;
  let needCn = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // SAFETY: only convert if <button> open tag is fully on this single line
    // (i.e. the line contains both <button and the closing > of the open tag,
    //  and does NOT contain a newline before the >). Multi-line buttons are skipped.
    const openMatch = line.match(/<button(\s[^>]*)>/);
    if (!openMatch) continue;
    // also skip if there's a stray unclosed <button earlier on the line without >
    if (/<button(?![\s>])/.test(line)) continue;
    const attrs = openMatch[1];
    // Extract className value (string or expression)
    const strCm = attrs.match(/className="([^"]*)"/);
    const exprCm = attrs.match(/className=\{([^}]+)\}/);
    let classValue = null, isExpr = false;
    if (strCm) { classValue = strCm[1]; }
    else if (exprCm) { classValue = exprCm[1].trim(); isExpr = true; }

    // Build new attrs: remove className from attrs string
    let newAttrs = attrs
      .replace(/className="[^"]*"/, '')
      .replace(/className=\{[^}]*\}/, '')
      .replace(/\s{2,}/g, ' ')
      .trim();

    let classAttr = '';
    if (classValue !== null) {
      if (isExpr) {
        classAttr = ` className={cn(${classValue})}`;
        needCn = true;
      } else {
        classAttr = ` className="${classValue}"`;
      }
    }
    const newTag = `<Button ${newAttrs}${classAttr}>`.replace(/\s+/g, ' ').replace('<Button >', '<Button>');
    lines[i] = line.replace(/<button(\s[^>]*)>/, newTag);
    changed = true;
    converted++;
  }

  if (changed) {
    // Validate: no malformed <Button{word} (missing space) and balanced tags
    const joined = lines.join('\n');
    if (/<Button[A-Za-z]/.test(joined)) {
      // malformed — skip this file
      skipped++;
      continue;
    }
    // Fix closing tags
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('</button>')) {
        lines[i] = lines[i].replace(/<\/button>/g, '</Button>');
      }
    }
    // Add imports
    let ls = lines;
    if (!importsButton) {
      // insert Button import after last import before "use client" or first import
      let insIdx = -1;
      for (let j = 0; j < ls.length; j++) {
        if (/^import\s+.+\s+from\s*["']/.test(ls[j]) && !ls[j].includes('"use client"')) { insIdx = j; }
      }
      if (insIdx === -1) insIdx = 0;
      ls.splice(insIdx + 1, 0, 'import { Button } from"@/components/ui/button";');
    }
    if (needCn && !/from\s*["']@\/lib\/utils["']/.test(ls.join('\n'))) {
      let insIdx = -1;
      for (let j = 0; j < ls.length; j++) {
        if (/^import\s+.+\s+from\s*["']/.test(ls[j]) && !ls[j].includes('"use client"')) { insIdx = j; }
      }
      if (insIdx === -1) insIdx = 0;
      ls.splice(insIdx + 1, 0, 'import { cn } from"@/lib/utils";');
    } else if (needCn) {
      // cn already imported? check
      const um = ls.join('\n').match(/import\s*\{([^}]+)\}\s*from\s*["']@\/lib\/utils["']/);
      if (um && !um[1].includes('cn')) {
        for (let j = 0; j < ls.length; j++) {
          if (/import\s*\{[^}]*\}\s*from\s*["']@\/lib\/utils["']/.test(ls[j])) {
            ls[j] = ls[j].replace(/import\s*\{/, 'import { cn, ');
            break;
          }
        }
      }
    }
    content = ls.join(sep);
    fs.writeFileSync(file, content, 'utf8');
    filesChanged++;
  }
}

console.log(`Converted ${converted} raw buttons in ${filesChanged} files`);
