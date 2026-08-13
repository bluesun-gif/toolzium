#!/usr/bin/env node
/**
 * Hermes Agent - Fix the 7 recovered files
 * Re-applies GridPattern + SEO sections safely (checks current file state)
 */
const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, 'components', 'tools');

// Load autofix functions
const script = fs.readFileSync(path.join(__dirname, 'hermes_autofix.js'), 'utf8');
eval(script.split('// Main execution')[0]);

const files = [
  'components/tools/finance/net-salary-client.tsx',
  'components/tools/health/macro-calculator-client.tsx',
  'components/tools/image/color-blind-palette-client.tsx',
  'components/tools/image/color-extractor-client.tsx',
  'components/tools/image/favicon-generator-client.tsx',
  'components/tools/network/dns-lookup-client.tsx',
  'components/tools/time/week-number-client.tsx',
];

// URL mapping
const urlMap = {
  'net-salary-client.tsx': '/tools/finance/net-salary',
  'macro-calculator-client.tsx': '/tools/health/macro-calculator',
  'color-blind-palette-client.tsx': '/tools/image/color-blind-palette',
  'color-extractor-client.tsx': '/tools/image/color-extractor',
  'favicon-generator-client.tsx': '/tools/image/favicon-generator',
  'dns-lookup-client.tsx': '/tools/network/dns-lookup',
  'week-number-client.tsx': '/tools/time/week-number',
};

let fixed = 0;
for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log('SKIP (not found): ' + file);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  const url = urlMap[path.basename(file)];

  // Fix GridPattern
  const hasGridPattern = /<GridPattern/.test(content) && /from\s*["']@\/components\/magicui\/grid-pattern["']/.test(content);
  if (!hasGridPattern) {
    content = fixGridPattern(file, content);
  }

  // Fix SEO sections (checks current state)
  const hasHowItWorks = /<ToolHowItWorks/.test(content);
  const hasFeatureGuides = /<ToolFeatureGuides/.test(content);
  const hasFaq = /<ToolFaqAccordion/.test(content);
  const hasRelated = /<RelatedTools/.test(content);
  
  if (!hasHowItWorks || !hasFeatureGuides || !hasFaq || !hasRelated) {
    content = fixSeoSections(file, content, url);
  }

  // Fix GlassCard if missing
  const hasGlassCard = /<GlassCard/.test(content);
  if (!hasGlassCard) {
    content = fixGlassCard(file, content);
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    fixed++;
    console.log('Fixed: ' + file);
  } else {
    console.log('No change: ' + file);
  }
}

console.log(`\nFixed ${fixed} files`);
