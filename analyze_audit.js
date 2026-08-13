#!/usr/bin/env node
/**
 * Hermes Agent - Analyze audit report for fix patterns
 */
const fs = require('fs');
const report = JSON.parse(fs.readFileSync('hermes_audit_report.json', 'utf8'));

// Categorize failures
const failureCategories = {};
const allResults = report.results;

console.log('ANALYSIS OF FAILURE PATTERNS\n');

// 1. Count failures by missing layer
const missingLayerCounts = {};
allResults.forEach(r => {
  if (r.overallStatus === 'FAIL') {
    Object.entries(r.layers).forEach(([layer, info]) => {
      if (!info.passed) {
        missingLayerCounts[layer] = (missingLayerCounts[layer] || 0) + 1;
      }
    });
  }
});

console.log('1. FAILURES BY MISSING LAYER:');
console.log('─'.repeat(50));
Object.entries(missingLayerCounts).sort(([,a],[,b]) => b - a).forEach(([layer, count]) => {
  console.log(`  ${layer}: ${count} tools missing`);
});

// 2. Count class concat bugs by type
const bugTypeCounts = {};
let totalBugs = 0;
allResults.forEach(r => {
  r.classConcatBugs.forEach(bug => {
    bugTypeCounts[bug.bugType] = (bugTypeCounts[bug.bugType] || 0) + bug.count;
    totalBugs += bug.count;
  });
});

console.log('\n2. CLASS CONCATENATION BUGS BY TYPE:');
console.log('─'.repeat(50));
Object.entries(bugTypeCounts).forEach(([type, count]) => {
  console.log(`  ${type}: ${count} occurrences`);
});
console.log(`  Total bug occurrences: ${totalBugs}`);

// 3. Files with class concat bugs (top 20)
console.log('\n3. FILES WITH CLASS CONCAT BUGS (showing first 20):');
console.log('─'.repeat(50));
allResults.filter(r => r.classConcatBugsCount > 0).slice(0, 20).forEach(r => {
  const bugSummary = r.classConcatBugs.map(b => `${b.bugType}(${b.count})`).join(', ');
  console.log(`  ${r.url}: ${r.classConcatBugsCount} bugs [${bugSummary}]`);
});

// 4. Files with contrast issues
console.log('\n4. FILES WITH CONTRAST ISSUES:');
console.log('─'.repeat(50));
const contrastFiles = allResults.filter(r => r.contrastIssuesCount > 0);
console.log(`  Total files with contrast issues: ${contrastFiles.length}`);
contrastFiles.slice(0, 20).forEach(r => {
  console.log(`  ${r.url}: ${r.contrastIssuesCount} issues`);
});

// 5. Check what import patterns exist for non-GlassCard components
console.log('\n5. COMPONENTS NOT USING GlassCard (using plain Card):');
console.log('─'.repeat(50));
const nonGlassCard = allResults.filter(r => {
  const content = fs.readFileSync(r.file, 'utf8');
  return /from ["']@\/components\/ui\/glass-card["']/.test(content) === false 
    && /from ["']@\/components\/ui\/card["']/.test(content);
});
console.log(`  Total: ${nonGlassCard.length}`);
nonGlassCard.slice(0, 20).forEach(r => {
  console.log(`  ${r.url}`);
});

// 6. Components without GridPattern
console.log('\n6. COMPONENTS WITHOUT GridPattern:');
console.log('─'.repeat(50));
const noGrid = allResults.filter(r => !r.layers.gridPattern.passed);
console.log(`  Total: ${noGrid.length}`);
noGrid.slice(0, 20).forEach(r => {
  console.log(`  ${r.url}`);
});

// 7. Components with broken RelatedTools (string concat like /tools/x/y"max={6})
console.log('\n7. COMPONENTS WITH BROKEN RelatedTools URL:');
console.log('─'.repeat(50));
const brokenRelated = allResults.filter(r => {
  try {
    const content = fs.readFileSync(r.file, 'utf8');
    return /RelatedTools.*currentToolUrl\s*=\s*"[^"]*"\s*max/.test(content.replace(/\s+/g, ''));
  } catch { return false; }
});
console.log(`  Total: ${brokenRelated.length}`);
brokenRelated.slice(0, 20).forEach(r => {
  console.log(`  ${r.url}`);
});
