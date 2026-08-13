#!/usr/bin/env node
/**
 * Hermes Agent - SAFE button unification via Babel AST (not regex).
 * Converts raw <button> JSX to shared <Button> component (homepage standard).
 * Handles multi-line buttons correctly. Preserves all attributes/children.
 * Reports any file it cannot safely transform (skips instead of corrupting).
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
let totalConverted = 0, filesChanged = 0, filesSkipped = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (!/<button[\s>]/.test(content)) continue;
  const hasCRLF = content.includes('\r\n');
  const sep = hasCRLF ? '\r\n' : '\n';

  let ast;
  try {
    ast = parser.parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
  } catch (e) {
    filesSkipped++;
    continue;
  }

  let changed = false;
  let needButtonImport = !/from\s*["']@\/components\/ui\/button["']/.test(content);
  let needCn = false;

  // Walk AST, find JSXOpeningElement named 'button'
  const visit = (node) => {
    if (!node || typeof node.type !== 'string') return;
    if (node.type === 'JSXOpeningElement' && t.isJSXIdentifier(node.name) && node.name.name === 'button') {
      // Convert to Button
      node.name = t.jsxIdentifier('Button');
      // Ensure className is present (merge via cn if expression, else keep)
      const clsAttr = node.attributes.find(a => t.isJSXAttribute(a) && t.isJSXIdentifier(a.name) && a.name.name === 'className');
      if (clsAttr) {
        // If className value is a string literal, keep as-is; if expression, wrap in cn()
        if (clsAttr.value && clsAttr.value.type === 'JSXExpressionContainer' && clsAttr.value.expression.type !== 'StringLiteral') {
          // wrap: cn(<expr>)
          clsAttr.value = t.jsxExpressionContainer(t.callExpression(t.identifier('cn'), [clsAttr.value.expression]));
          needCn = true;
        }
      }
      changed = true;
      totalConverted++;
    }
    if (node.type === 'JSXClosingElement' && t.isJSXIdentifier(node.name) && node.name.name === 'button') {
      node.name = t.jsxIdentifier('Button');
    }
    for (const key of Object.keys(node)) {
      if (key === 'loc' || key === 'start' || key === 'end' || key === 'range' || key === 'leadingComments' || key === 'trailingComments' || key === 'innerComments') continue;
      const child = node[key];
      if (Array.isArray(child)) child.forEach(visit);
      else if (child && typeof child.type === 'string') visit(child);
    }
  };
  visit(ast.program);

  if (changed) {
    try {
      let out = generate(ast, { retainLines: false, jsescOption: { minimal: true } }, content).code;
      // Add imports AFTER "use client" directive (must stay first line in Next.js)
      const lines = out.split('\n');
      const useClientIdx = lines.findIndex(l => l.trim() === '"use client";');
      const insertAt = useClientIdx >= 0 ? useClientIdx + 1 : 0;
      const importsToAdd = [];
      if (needButtonImport) importsToAdd.push('import { Button } from"@/components/ui/button";');
      if (needCn && !/from\s*["']@\/lib\/utils["']/.test(out)) importsToAdd.push('import { cn } from"@/lib/utils";');
      if (importsToAdd.length) lines.splice(insertAt, 0, ...importsToAdd);
      out = lines.join('\n');
      fs.writeFileSync(file, out, 'utf8');
      filesChanged++;
    } catch (e) {
      filesSkipped++;
    }
  }
}

console.log(`Converted ${totalConverted} buttons in ${filesChanged} files (skipped ${filesSkipped})`);
