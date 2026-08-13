#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const script = fs.readFileSync(path.join(__dirname, 'hermes_autofix.js'), 'utf8');
eval(script.split('// Main execution')[0]);

const files = [
  'components/tools/finance/dti-calculator-client.tsx',
  'components/tools/image/color-contrast-checker-client.tsx',
];
const urlMap = {
  'dti-calculator-client.tsx': '/tools/finance/dti-calculator',
  'color-contrast-checker-client.tsx': '/tools/image/color-contrast-checker',
};
let fixed = 0;
for (const file of files) {
  if (!fs.existsSync(file)) { console.log('SKIP: ' + file); continue; }
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  const url = urlMap[path.basename(file)];
  const hasGridPattern = /<GridPattern/.test(content) && /from\s*["']@\/components\/magicui\/grid-pattern["']/.test(content);
  if (!hasGridPattern) content = fixGridPattern(file, content);
  const hasHIW = /<ToolHowItWorks/.test(content);
  const hasFG = /<ToolFeatureGuides/.test(content);
  const hasFAQ = /<ToolFaqAccordion/.test(content);
  const hasRT = /<RelatedTools/.test(content);
  if (!hasHIW || !hasFG || !hasFAQ || !hasRT) content = fixSeoSections(file, content, url);
  const hasGC = /<GlassCard/.test(content);
  if (!hasGC) content = fixGlassCard(file, content);
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    fixed++;
    console.log('Fixed: ' + file);
  } else console.log('No change: ' + file);
}
console.log(`\nFixed ${fixed} files`);
