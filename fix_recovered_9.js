#!/usr/bin/env node
/**
 * Hermes Agent - Re-apply Design DNA fixes to recovered files (safe version)
 */
const fs = require('fs');
const path = require('path');

// Load autofix functions
const script = fs.readFileSync(path.join(__dirname, 'hermes_autofix.js'), 'utf8');
eval(script.split('// Main execution')[0]);

const files = [
  'components/tools/image/contrast-matrix-sheet-client.tsx',
  'components/tools/productivity/daily-priority-action-board-client.tsx',
  'components/tools/productivity/eisenhower-board-client.tsx',
  'components/tools/productivity/eisenhower-checklist-client.ts' === '' ? '' : 'components/tools/productivity/eisenhower-checklist-client.tsx',
  'components/tools/productivity/eisenhower-kanban-client.tsx',
  'components/tools/productivity/priority-matrix-2x2-client.tsx',
  'components/tools/time/event-widget-client.tsx',
  'components/tools/time/world-planner-client.tsx',
  'components/tools/util/password-entropy-client.tsx',
];

const urlMap = {
  'contrast-matrix-sheet-client.tsx': '/tools/image/contrast-matrix-sheet',
  'daily-priority-action-board-client.tsx': '/tools/productivity/daily-priority-action-board',
  'eisenhower-board-client.tsx': '/tools/productivity/eisenhower-board',
  'eisenhower-checklist-client.tsx': '/tools/productivity/eisenhower-checklist',
  'eisenhower-kanban-client.tsx': '/tools/productivity/eisenhower-kanban',
  'priority-matrix-2x2-client.tsx': '/tools/productivity/priority-matrix-2x2',
  'event-widget-client.tsx': '/tools/time/event-widget',
  'world-planner-client.tsx': '/tools/time/world-planner',
  'password-entropy-client.tsx': '/tools/util/password-entropy',
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
