#!/usr/bin/env node
/**
 * Replace <GridPattern /> with <ToolBackground /> in all tool client files.
 * Also add `relative z-10` to the root container of content by wrapping is too complex;
 * instead we add `relative z-10` to root div via class injection.
 */
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const t = require('@babel/types');
const generate = require('@babel/generator').default;

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
let changed = 0;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (!/<\s*GridPattern\s*\/>/.test(content)) continue;
  const hasCRLF = content.includes('\r\n');
  let ast;
  try { ast = parser.parse(content, { sourceType: 'module', plugins: ['jsx', 'typescript'] }); }
  catch (e) { continue; }
  let swapped = false;
  let needImport = !/from\s*["']@\/components\/shared\/tool-background["']/.test(content);
  const visit = (node) => {
    if (!node || typeof node.type !== 'string') return;
    if (node.type === 'JSXElement') {
      const opening = node.openingElement;
      if (t.isJSXIdentifier(opening.name) && opening.name.name === 'GridPattern' && node.closingElement && t.isJSXIdentifier(node.closingElement.name) && node.closingElement.name.name === 'GridPattern') {
        // replace with <ToolBackground />
        const tb = t.jsxElement(
          t.jsxOpeningElement(t.jsxIdentifier('ToolBackground'), [], true),
          null, [], true
        );
        // mutate in place
        node.openingElement = tb.openingElement;
        node.closingElement = null;
        node.selfClosing = true;
        node.children = [];
        swapped = true;
      }
    }
    for (const key of Object.keys(node)) {
      if (['loc','start','end','range','leadingComments','trailingComments','innerComments'].includes(key)) continue;
      const child = node[key];
      if (Array.isArray(child)) child.forEach(visit);
      else if (child && typeof child.type === 'string') visit(child);
    }
  };
  visit(ast.program);
  if (swapped) {
    let out = generate(ast, { retainLines: false, jsescOption: { minimal: true } }, content).code;
    const lines = out.split('\n');
    const useClientIdx = lines.findIndex(l => l.trim() === '"use client";');
    const insertAt = useClientIdx >= 0 ? useClientIdx + 1 : 0;
    if (needImport) lines.splice(insertAt, 0, 'import { ToolBackground } from"@/components/shared/tool-background";');
    out = lines.join('\n');
    fs.writeFileSync(file, out, 'utf8');
    changed++;
  }
}
console.log(`Replaced GridPattern with ToolBackground in ${changed} files`);
