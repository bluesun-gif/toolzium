const fs = require('fs');
const path = require('path');

const componentsToolsDir = path.join(__dirname, 'components', 'tools');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Add "use client"; if missing in tsx components
  if (filePath.endsWith('.tsx') && !content.startsWith('"use client";') && !content.startsWith("'use client';")) {
    content = '"use client";\n\n' + content;
  }

  // Replace className={`...`} with className={"..."} when there are no variables or simple concatenation
  // Helper: fix template literals in className
  content = content.replace(/className=\{`([^`${}]*)`\}/g, (match, p1) => {
    return 'className="' + p1 + '"';
  });

  // Fix className={`... ${var} ...`} with concatenation or Array join
  content = content.replace(/className=\{`([\s\S]*?)`\}/g, (match, p1) => {
    // If it spans lines or contains complex template expressions, convert to string concatenation
    // E.g., `prefix ${expr} suffix` -> "prefix " + (expr) + " suffix"
    const parts = [];
    let lastIdx = 0;
    const regex = /\$\{([\s\S]*?)\}/g;
    let m;
    while ((m = regex.exec(p1)) !== null) {
      const textBefore = p1.substring(lastIdx, m.index);
      if (textBefore) {
        parts.push(JSON.stringify(textBefore));
      }
      parts.push('(' + m[1].trim() + ')');
      lastIdx = regex.lastIndex;
    }
    const textAfter = p1.substring(lastIdx);
    if (textAfter) {
      parts.push(JSON.stringify(textAfter));
    }
    return 'className={' + parts.join(' + ') + '}';
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', path.relative(__dirname, filePath));
  }
}

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      fixFile(fullPath);
    }
  }
}

processDir(componentsToolsDir);
console.log('Finished auto-fixing components!');
