#!/usr/bin/env node
/**
 * Hermes Agent - Full Codebase Audit Script
 * Toolzium.com - 568 Tool Components Design DNA Compliance
 */
const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, 'components', 'tools');
const OUTPUT_FILE = path.join(__dirname, 'hermes_audit_report.json');

// Design DNA required components and patterns
const LAYER_CHECKS = {
  gridPattern: { 
    label: 'GridPattern Ambient Background', 
    pattern: /from\s*["']@\/components\/magicui\/grid-pattern["']|import\s*\{[^}]*GridPattern[^}]*\}/,
    usage: /<GridPattern/g
  },
  toolPageHeader: { 
    label: 'ToolPageHeader', 
    pattern: /from\s*["']@\/components\/shared\/tool-page-header["']/,
    usage: /<ToolPageHeader/g
  },
  glassCard: { 
    label: 'GlassCard Usage', 
    pattern: /from\s*["']@\/components\/ui\/glass-card["']/,
    usage: /<GlassCard/g
  },
  toolHowItWorks: { 
    label: 'ToolHowItWorks', 
    pattern: /from\s*["']@\/components\/shared\/tool-how-it-works["']/,
    usage: /<ToolHowItWorks/g
  },
  toolFeatureGuides: { 
    label: 'ToolFeatureGuides', 
    pattern: /from\s*["']@\/components\/shared\/tool-feature-guides["']/,
    usage: /<ToolFeatureGuides/g
  },
  toolFaqAccordion: { 
    label: 'ToolFaqAccordion', 
    pattern: /from\s*["']@\/components\/shared\/tool-faq-accordion["']/,
    usage: /<ToolFaqAccordion/g
  },
  relatedTools: { 
    label: 'RelatedTools', 
    pattern: /from\s*["']@\/components\/shared\/related-tools["']/,
    usage: /<RelatedTools/g
  }
};

// Class concatenation bug detection
const CLASS_CONCAT_BUGS = [
  // String concatenation with + that could produce broken classes
  { name: 'Direct string concat', pattern: /\+\s*["'`].*(?:bg-|text-|p-|m-|rounded-|border-|flex-|grid-)/g, severity: 'high' },
  // Template literal without cn() for conditional classes
  { name: 'Conditional class without cn()', pattern: /className\s*=\s*\(`[^`]*\$\{.*\?\s*["`'][^`]*\}|className\s*=\s*\{`\s*[^`]*\$\{.*\?\s*["`'][^`]*\}/g, severity: 'medium' },
];

// Theme contrast checks
const CONTRAST_ISSUES = [
  { name: 'Hardcoded white on white', pattern: /bg-white[^"']*text-white/g, severity: 'critical' },
  { name: 'Hardcoded black on black', pattern: /bg-black[^"']*text-black/g, severity: 'critical' },
  { name: 'text-white on bg-white', pattern: /bg-white[^"]*text-white|bg-white[^"]*text-white/g, severity: 'high' },
];

function findClientComponents(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findClientComponents(fullPath));
    } else if (entry.name.endsWith('-client.tsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(path.join(__dirname), filePath).replace(/\\/g, '/');
  
  // Derive tool URL path
  const toolName = path.basename(filePath, '-client.tsx');
  const category = path.basename(path.dirname(filePath));
  const urlPath = `/tools/${category}/${toolName}`;

  const result = {
    file: relPath,
    url: urlPath,
    category,
    toolName,
    layers: {},
    classConcatBugs: [],
    contrastIssues: [],
    hasExportDefault: /export\s+default\s+(?:function|const)/.test(content) || /export\s+default\s+function/.test(content),
    componentScore: 0,
    overallStatus: 'FAIL'
  };

  // Check each layer
  let layerCount = 0;
  for (const [key, check] of Object.entries(LAYER_CHECKS)) {
    // Use fresh non-global regex tests to avoid stateful lastIndex issues
    const imported = new RegExp(check.pattern.source).test(content);
    const used = new RegExp(check.usage.source).test(content);
    const passed = imported && used;
    if (passed) layerCount++;
    result.layers[key] = {
      label: check.label,
      imported,
      used,
      passed
    };
  }
  
  // Design DNA score = percentage of layers present
  result.designDnaScore = Math.round((layerCount / Object.keys(LAYER_CHECKS).length) * 100);
  
  // Check class concatenation bugs
  for (const bug of CLASS_CONCAT_BUGS) {
    const matches = [...content.matchAll(bug.pattern)];
    if (matches.length > 0) {
      result.classConcatBugs.push({
        bugType: bug.name,
        severity: bug.severity,
        count: matches.length,
        examples: matches.slice(0, 3).map(m => m[0].substring(0, 100))
      });
    }
  }
  result.classConcatBugsCount = result.classConcatBugs.reduce((sum, b) => sum + b.count, 0);

  // Check theme contrast issues
  for (const issue of CONTRAST_ISSUES) {
    const matches = [...content.matchAll(issue.pattern)];
    if (matches.length > 0) {
      result.contrastIssues.push({
        issueType: issue.name,
        severity: issue.severity,
        count: matches.length
      });
    }
  }
  result.contrastIssuesCount = result.contrastIssues.reduce((sum, i) => sum + i.count, 0);

  // Real logic check - verify it has interactive elements
  const hasInput = /<Input|<textarea|<select|<button|<Button/.test(content);
  const hasState = /useState|useReducer|useRef/.test(content);
  const hasFunction = /handle[A-Z]|\w+\(\)/.test(content);
  result.hasRealLogic = hasInput && hasState && hasFunction;

  // Overall status
  const passesAllLayers = layerCount >= 6; // Allow some flexibility - 6 out of 7 minimum
  const hasNoClassBugs = result.classConcatBugsCount === 0;
  const hasNoContrastIssues = result.contrastIssuesCount === 0;
  
  result.overallStatus = (passesAllLayers && hasNoClassBugs && hasNoContrastIssues) ? 'PASS' : 'FAIL';
  
  return result;
}

function runAudit() {
  console.log('🔍 Hermes Agent - Starting Full Codebase Audit...');
  console.log(`📁 Scanning directory: ${TOOLS_DIR}`);
  
  const components = findClientComponents(TOOLS_DIR);
  console.log(`📊 Found ${components.length} tool client components to audit\n`);

  const results = [];
  const categoryStats = {};

  for (const component of components) {
    const result = auditFile(component);
    results.push(result);
    
    if (!categoryStats[result.category]) {
      categoryStats[result.category] = { total: 0, pass: 0, fail: 0, scoreSum: 0 };
    }
    categoryStats[result.category].total++;
    categoryStats[result.category].scoreSum += result.designDnaScore;
    if (result.overallStatus === 'PASS') categoryStats[result.category].pass++;
    else categoryStats[result.category].fail++;
  }

  // Summary
  const totalPass = results.filter(r => r.overallStatus === 'PASS').length;
  const totalFail = results.filter(r => r.overallStatus === 'FAIL').length;
  const avgScore = Math.round(results.reduce((sum, r) => sum + r.designDnaScore, 0) / results.length);
  const totalClassBugs = results.reduce((sum, r) => sum + r.classConcatBugsCount, 0);
  const totalContrastIssues = results.reduce((sum, r) => sum + r.contrastIssuesCount, 0);

  const report = {
    metadata: {
      auditedBy: 'Hermes Agent',
      timestamp: new Date().toISOString(),
      totalTools: results.length,
      passCount: totalPass,
      failCount: totalFail,
      passRate: `${Math.round((totalPass / results.length) * 100)}%`,
      averageDesignDnaScore: avgScore,
      totalClassConcatBugs: totalClassBugs,
      totalContrastIssues: totalContrastIssues
    },
    categoryBreakdown: categoryStats,
    results: results
  };

  // Write full report
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2), 'utf8');
  console.log(`📄 Full report written to: ${OUTPUT_FILE}\n`);

  // Print summary
  console.log('═'.repeat(80));
  console.log('📊 HERMES AGENT - CODEBASE AUDIT SUMMARY');
  console.log('═'.repeat(80));
  console.log(`Total Tools Audited:     ${results.length}`);
  console.log(`✅ PASS:                 ${totalPass}`);
  console.log(`❌ FAIL:                 ${totalFail}`);
  console.log(`🎯 Pass Rate:            ${report.metadata.passRate}`);
  console.log(`⭐ Avg Design DNA Score: ${avgScore}/100`);
  console.log(`🐛 Class Concat Bugs:    ${totalClassBugs}`);
  console.log(`🎨 Contrast Issues:      ${totalContrastIssues}`);
  console.log('═'.repeat(80));
  console.log('\n📂 CATEGORY BREAKDOWN:\n');
  console.log('┌────────────────────────────────┬────────┬──────┬──────┬─────────┐');
  console.log('│ Category                        │ Total  │ PASS │ FAIL │ AvgScore│');
  console.log('├────────────────────────────────┼────────┼──────┼──────┼─────────┤');
  
  Object.entries(categoryStats).sort(([,a],[,b]) => b.total - a.total).forEach(([cat, stats]) => {
    const avgCat = Math.round(stats.scoreSum / stats.total);
    const catStr = `/tools/${cat}`;
    console.log(`│ ${catStr.padEnd(32)} │ ${stats.total.toString().padStart(5)} │ ${stats.pass.toString().padStart(4)} │ ${stats.fail.toString().padStart(4)} │ ${avgCat.toString().padStart(6)}% │`);
  });
  console.log('└────────────────────────────────┴────────┴──────┴──────┴─────────┘');

  // List failed tools
  const failed = results.filter(r => r.overallStatus === 'FAIL');
  if (failed.length > 0) {
    console.log(`\n🔧 FAILED TOOLS (${failed.length}):`);
    console.log('─'.repeat(80));
    failed.slice(0, 30).forEach(r => {
      const failedLayers = Object.entries(r.layers).filter(([_, v]) => !v.passed).map(([k,]) => k);
      console.log(`❌ ${r.url}`);
      console.log(`   File: ${r.file}`);
      console.log(`   DNA: ${r.designDnaScore}% | Missing: ${failedLayers.join(', ')} | Bugs: ${r.classConcatBugsCount} | Contrast: ${r.contrastIssuesCount}`);
      if (failed.length > 30) {
        console.log(`   ... and ${failed.length - 30} more. See full report JSON.`);
        return;
      }
    });
  }

  return report;
}

runAudit();
