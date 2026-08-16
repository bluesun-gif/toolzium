#!/usr/bin/env node
/**
 * Hermes Agent - Remove corrupted FeatureGuides insertions
 * The autofix inserted duplicate ToolFeatureGuides content into files that already had it
 * This removes the inserted <div className="prose..."> block that contains "Why Use Our"
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TOOLS_DIR = path.join(__dirname, 'components', 'tools');

// Get files with current TS errors
let errorFiles = [];
try {
  const output = execSync('npx tsc --noEmit 2>&1', { encoding: 'utf8' });
  output.split('\n').forEach(line => {
    const match = line.match(/^(.+)\((\d+),\d+\): error/);
    if (match) errorFiles.push({ file: match[1], line: parseInt(match[2]) });
  });
} catch (e) {
  const out = e.stdout || '';
  out.split('\n').forEach(line => {
    const match = line.match(/^(.+)\((\d+),\d+\): error/);
    if (match) errorFiles.push({ file: match[1], line: parseInt(match[2]) });
  });
}

errorFiles = [...new Set(errorFiles.map(e => path.join(__dirname, e.file)))];
console.log(`Found ${errorFiles.length} files with TS errors`);

let fixed = 0;
for (const file of errorFiles) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const hasCRLF = content.includes('\r\n');
  const sep = hasCRLF ? '\r\n' : '\n';
  const lines = content.split(sep);
  
  // Find lines with our inserted "Why Use Our" text
  let modified = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Why Use Our') && lines[i].includes('h3')) {
      // This is our corrupted insertion. Find the enclosing ToolFeatureGuides
      // and remove from the opening children div to before </ToolFeatureGuides>
      // Actually, let's find the <div className="prose dark:prose-invert max-w-none"> that STARTS our insertion
      // and remove everything until we find </ToolFeatureGuides>
      
      // Search backward for the start of our inserted block
      let startIdx = -1;
      for (let j = i; j >= 0; j--) {
        if (lines[j].includes('<div className="prose dark:prose-invert max-w-none">') || 
            lines[j].includes('<div className="prose max-w-none')) {
          startIdx = j;
          break;
        }
      }
      
      // Search forward for </ToolFeatureGuides>
      let endIdx = -1;
      for (let j = i; j < lines.length; j++) {
        if (lines[j].includes('</ToolFeatureGuides>')) {
          endIdx = j;
          break;
        }
      }
      
      if (startIdx !== -1 && endIdx !== -1) {
        // Remove from startIdx to endIdx (inclusive)
        lines.splice(startIdx, endIdx - startIdx + 1);
        modified = true;
        console.log(`  Removed inserted block from ${path.basename(file)} (lines ${startIdx+1}-${endIdx+1})`);
        break;
      }
    }
  }
  
  if (modified) {
    fs.writeFileSync(file, lines.join(sep), 'utf8');
    fixed++;
  }
}

console.log(`\nFixed ${fixed} files`);
