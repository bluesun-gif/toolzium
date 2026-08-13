#!/usr/bin/env node
/**
 * Hermes: Global readability fix (Bug 1) — mirror homepage pattern.
 * For each tool client:
 *  1. Replace <GridPattern /> with <ToolBackground /> (grid + soft radial scrim)
 *  2. Wrap all content siblings in <div className="relative z-10 ..."> so text
 *     sits ABOVE the grid (homepage uses the same z-10 wrapper)
 *  3. Add ToolBackground import
 * AST-based (safe). Idempotent.
 */
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const t = require('@babel/types');
const generate = require('@babel/generator').default;

const TOOLS_DIR = path.join(__dirname, 'components', 'tools');
function findClientComponents(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...findClientComponents(fp));
    else if (e.name.endsWith('-client.tsx')) out.push(fp);
  }
  return out;
}
const files = findClientComponents(TOOLS_DIR);
let changed = 0, skipped = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (/ToolBackground/.test(content)) continue; // already done
  if (!/<\s*GridPattern\s*\/>/.test(content)) continue;

  let ast;
  try { ast = parser.parse(content, { sourceType: 'module', plugins: ['jsx', 'typescript'] }); }
  catch (e) { skipped++; continue; }

  // Find ReturnStatement -> JSXElement root
  let rootEl = null;
  const findReturn = (n) => {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'ReturnStatement' && n.argument && t.isJSXElement(n.argument)) { rootEl = n.argument; return; }
    for (const k of Object.keys(n)) {
      if (['loc','start','end','range','leadingComments','trailingComments','innerComments'].includes(k)) continue;
      const c = n[k];
      if (Array.isArray(c)) c.forEach(findReturn);
      else if (c && typeof c.type === 'string') findReturn(c);
    }
  };
  findReturn(ast.program);
  if (!rootEl) { skipped++; continue; }

  // Find GridPattern self-closing inside root
  let gridNode = null;
  const findGrid = (n) => {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'JSXElement' && t.isJSXIdentifier(n.openingElement.name) && n.openingElement.name.name === 'GridPattern' && n.openingElement.selfClosing) { gridNode = n; return; }
    for (const k of Object.keys(n)) {
      if (['loc','start','end','range','leadingComments','trailingComments','innerComments'].includes(k)) continue;
      const c = n[k];
      if (Array.isArray(c)) c.forEach(findGrid);
      else if (c && typeof c.type === 'string') findGrid(c);
    }
  };
  findGrid(rootEl);
  if (!gridNode) { skipped++; continue; }

  // Replace GridPattern with ToolBackground
  gridNode.openingElement.name = t.jsxIdentifier('ToolBackground');
  gridNode.closingElement = null;
  gridNode.selfClosing = true;
  gridNode.children = [];

  // Wrap root's children (except the ToolBackground node) in a relative z-10 div
  const kids = rootEl.children.filter(c => c.type === 'JSXElement' || c.type === 'JSXExpressionContainer' || c.type === 'JSXText');
  const nonGrid = kids.filter(c => !(c.type === 'JSXElement' && t.isJSXIdentifier(c.openingElement.name) && c.openingElement.name.name === 'ToolBackground'));
  const wrapper = t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier('div'), [t.jsxAttribute(t.jsxIdentifier('className'), t.stringLiteral('relative z-10'))], false),
    t.jsxClosingElement(t.jsxIdentifier('div')),
    nonGrid,
    false
  );
  // Replace root's children: [ToolBackground, wrapper]
  rootEl.children = rootEl.children.map(c => {
    if (c.type === 'JSXElement' && t.isJSXIdentifier(c.openingElement.name) && c.openingElement.name.name === 'ToolBackground') return c;
    return wrapper; // first non-grid child gets replaced by wrapper (which contains all non-grid)
  });
  // Ensure we didn't duplicate wrapper: if multiple non-grid siblings, they were all mapped to `wrapper` (same node ref) -> babel will render once? No, it duplicates. Fix: rebuild children array.
  const tbNode = rootEl.children.find(c => c.type === 'JSXElement' && t.isJSXIdentifier(c.openingElement.name) && c.openingElement.name.name === 'ToolBackground');
  rootEl.children = [tbNode, wrapper];

  let out = generate(ast, { retainLines: false, jsescOption: { minimal: true } }, content).code;
  const lines = out.split('\n');
  // Insert after the last directive ("use client" or "use strict") to avoid re-emit duplication
  let insertAt = -1;
  for (let i = 0; i < lines.length; i++) {
    const tr = lines[i].trim();
    if (tr === '"use client";' || tr === '"use strict";') insertAt = i;
    else if (tr.startsWith('import ') || tr === '') { break; }
  }
  if (insertAt < 0) insertAt = 0;
  lines.splice(insertAt + 1, 0, 'import { ToolBackground } from"@/components/shared/tool-background";');
  out = lines.join('\n');
  fs.writeFileSync(file, out, 'utf8');
  changed++;
}
console.log(`Bug1 fix applied to ${changed} files (skipped ${skipped})`);
