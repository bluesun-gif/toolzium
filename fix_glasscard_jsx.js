#!/usr/bin/env node
/**
 * Hermes Agent - GlassCard JSX Balancer
 * Fixes the Card/GlassCard mismatch by properly balancing tags
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TOOLS_DIR = path.join(__dirname, 'components', 'tools');

// Get files with TS17002 errors
let errorFiles = [];
try {
  const output = execSync('npx tsc --noEmit 2>&1', { encoding: 'utf8' });
  output.split('\n').forEach(line => {
    const match = line.match(/^(.+)\(\d+,\d+\): error TS17002/);
    if (match) errorFiles.push(match[1]);
  });
} catch (e) {
  const out = e.stdout || '';
  out.split('\n').forEach(line => {
    const match = line.match(/^(.+)\(\d+,\d+\): error TS17002/);
    if (match) errorFiles.push(match[1]);
  });
}

errorFiles = [...new Set(errorFiles)].map(f => path.join(__dirname, f));
console.log(`Found ${errorFiles.length} files with Card mismatch`);

function balanceTags(content) {
  // Tokenize all Card and GlassCard opening/closing tags in order
  const tagRegex = /<(\/?)(GlassCard|Card)\b[^>]*?(\/?)>/g;
  const tokens = [];
  let m;
  while ((m = tagRegex.exec(content)) !== null) {
    const isClose = m[1] === '/';
    const isSelfClose = m[3] === '/';
    const tag = m[2];
    if (isSelfClose) continue;
    tokens.push({ isClose, tag, index: m.index, full: m[0], length: m[0].length });
  }

  // Build a mapping of which closing tags to change
  // Strategy: Stack-based. When we see <GlassCard>, push Glass.
  // When we see <Card>, push Card.
  // When we see </GlassCard> or </Card>, pop and check.
  // The problem: files have <GlassCard> (from our change) but inner </Card> closes.
  // We need: outer <GlassCard> ... </GlassCard>, inner <Card>...</Card>
  
  const stack = [];
  const changes = []; // {index, from, to}
  
  for (const tok of tokens) {
    if (!tok.isClose) {
      stack.push({ tag: tok.tag, openTok: tok });
    } else {
      // This is a closing tag
      const expected = stack[stack.length - 1];
      if (!expected) {
        // Unmatched close - might need to change it
        continue;
      }
      if (expected.tag === tok.tag) {
        stack.pop();
      } else {
        // Mismatch - the close tag needs to match the open tag
        // e.g., open=GlassCard, close=</Card>
        // Change this close tag to </GlassCard>
        changes.push({ index: tok.index, from: tok.full, to: `</${expected.tag}>` });
        stack.pop();
      }
    }
  }

  // Apply changes from end to start to preserve indices
  changes.sort((a, b) => b.index - a.index);
  let result = content;
  for (const ch of changes) {
    result = result.slice(0, ch.index) + ch.to + result.slice(ch.index + ch.from.length);
  }
  
  return result;
}

let fixed = 0;
for (const file of errorFiles) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const balanced = balanceTags(content);
  if (balanced !== content) {
    fs.writeFileSync(file, balanced, 'utf8');
    fixed++;
    console.log(`Fixed: ${path.basename(file)}`);
  }
}

console.log(`\nTotal fixed: ${fixed}`);
