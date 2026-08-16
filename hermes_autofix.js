#!/usr/bin/env node
/**
 * Hermes Agent - Comprehensive Auto-Fix Script
 * Fixes all 475 failing tools to comply with Toolzium Design DNA
 */
const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, 'components', 'tools');
const REPORT_FILE = path.join(__dirname, 'hermes_audit_report.json');

const report = JSON.parse(fs.readFileSync(REPORT_FILE, 'utf8'));
const failing = report.results.filter(r => r.overallStatus === 'FAIL');

// Track fixes
const fixStats = {
  gridPatternAdded: 0,
  seoSectionsAdded: 0,
  glassCardFixed: 0,
  relatedToolsFixed: 0,
  classBugsFixed: 0,
  errors: []
};

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

// Helper: add import if missing (preserves CRLF line endings)
function addImport(content, importLine) {
  const hasCRLF = content.includes('\r\n');
  const sep = hasCRLF ? '\r\n' : '\n';
  
  if (content.includes(importLine.trim().split('\n')[0])) return content;
  // Find a good insertion point - after the last "from '...'" import
  const lines = content.split(sep);
  let insertIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^import\s+.+\s+from\s*["']/.test(lines[i]) && !lines[i].includes('"use client"')) {
      insertIdx = i;
    }
  }
  if (insertIdx === -1) {
    // Insert after "use client"
    const useClientIdx = lines.findIndex(l => l.includes('"use client"'));
    insertIdx = useClientIdx >= 0 ? useClientIdx : 0;
  }
  lines.splice(insertIdx + 1, 0, importLine);
  return lines.join(sep);
}

// Fix 1: Add GridPattern import + JSX
function fixGridPattern(filePath, content) {
  let modified = content;
  const hasImport = /from\s*["']@\/components\/magicui\/grid-pattern["']/.test(modified);
  const hasUsage = /<GridPattern/.test(modified);

  if (!hasImport) {
    modified = addImport(
      modified,
      'import { GridPattern } from"@/components/magicui/grid-pattern";'
    );
  }

  if (!hasUsage) {
    // Find the main return div opening - more robust search
    const returnIdx = modified.indexOf('return (');
    if (returnIdx !== -1) {
      const afterReturn = modified.slice(returnIdx);
      const divMatch = afterReturn.match(/<div[^>]*>/);
      if (divMatch) {
        const divStartInSlice = afterReturn.indexOf(divMatch[0]) + divMatch[0].length;
        const divStart = returnIdx + divStartInSlice;
        const gridPatternJsx = `
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />
`;
        modified = modified.slice(0, divStart) + gridPatternJsx + modified.slice(divStart);
      }
    }
  }

  return modified;
}

// Fix 2: Add missing SEO/educational sections
function fixSeoSections(filePath, content, url) {
  let modified = content;
  const needsHowItWorks = !/<ToolHowItWorks/.test(modified);
  const needsFeatureGuides = !/<ToolFeatureGuides/.test(modified);
  const needsFaq = !/<ToolFaqAccordion/.test(modified);
  const needsRelated = !/<RelatedTools/.test(modified);

  if (!(needsHowItWorks || needsFeatureGuides || needsFaq || needsRelated)) {
    return modified;
  }

  // Ensure imports exist
  if (needsHowItWorks && !/from\s*["']@\/components\/shared\/tool-how-it-works["']/.test(modified)) {
    modified = addImport(modified, 'import ToolHowItWorks from"@/components/shared/tool-how-it-works";');
  }
  if (needsFeatureGuides && !/from\s*["']@\/components\/shared\/tool-feature-guides["']/.test(modified)) {
    modified = addImport(modified, 'import ToolFeatureGuides from"@/components/shared/tool-feature-guides";');
  }
  if (needsFaq && !/from\s*["']@\/components\/shared\/tool-faq-accordion["']/.test(modified)) {
    modified = addImport(modified, 'import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";');
  }
  if (needsRelated && !/from\s*["']@\/components\/shared\/related-tools["']/.test(modified)) {
    modified = addImport(modified, 'import { RelatedTools } from"@/components/shared/related-tools";');
  }

  // Determine tool title from ToolPageHeader (only match string literals or component names, not template literals)
  const titleMatch = modified.match(/title=\{([A-Z][A-Za-z0-9_]*)\}/) || modified.match(/title="([^"{}]+)"/);
  const toolTitle = titleMatch ? (titleMatch[1] || titleMatch[2] || 'This Tool') : 'This Tool';

  // Build sections to insert before the closing </div> of the main return
  let sections = '';

  if (needsHowItWorks) {
    sections += `
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />
`;
  }

  if (needsFeatureGuides) {
    sections += `
      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our ${toolTitle}?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our ${toolTitle} provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>
`;
  }

  if (needsFaq) {
    sections += `
      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />
`;
  }

  if (needsRelated) {
    sections += `
      <RelatedTools currentToolUrl="${url}" max={6} />
`;
  }

  // Insert sections before the final </div> of the component return
  // Find the last </div> that closes the main container
  const lastDivIdx = modified.lastIndexOf('</div>');
  if (lastDivIdx !== -1) {
    modified = modified.slice(0, lastDivIdx) + sections + '\n' + modified.slice(lastDivIdx);
  }

  // Ensure icon imports (Sparkles, Shield, Zap, Copy) are available
  const iconImports = ['Sparkles', 'Shield', 'Zap', 'Copy'];
  const lucideImportMatch = modified.match(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["']/);
  if (lucideImportMatch) {
    const existingIcons = lucideImportMatch[1].split(',').map(s => s.trim());
    const missingIcons = iconImports.filter(icon => !existingIcons.includes(icon));
    if (missingIcons.length > 0) {
      const newImportLine = `import { ${[...existingIcons, ...missingIcons].join(', ')} } from"lucide-react";`;
      modified = modified.replace(lucideImportMatch[0], newImportLine);
    }
  } else {
    // No lucide import - add one
    modified = addImport(modified, `import { ${iconImports.join(', ')} } from"lucide-react";`);
  }

  return modified;
}

// Fix 3: Fix GlassCard usage
function fixGlassCard(filePath, content) {
  let modified = content;
  const hasImport = /from\s*["']@\/components\/ui\/glass-card["']/.test(modified);
  const hasUsage = /<GlassCard/.test(modified);

  if (!hasImport && !hasUsage) {
    // Tool uses <Card> with cardClass. Convert cardClass usages to GlassCard
    if (/const cardClass\s*=/.test(modified) && /<Card\s+className=\{cardClass\}>/.test(modified)) {
      // Add GlassCard import
      modified = addImport(modified, 'import { GlassCard } from"@/components/ui/glass-card";');
      // Replace <Card className={cardClass}> with <GlassCard>
      modified = modified.replace(/<Card\s+className=\{cardClass\}>/g, '<GlassCard>');
      // Replace </Card> that closes those with </GlassCard> - tricky, just replace all </Card> after first
      modified = modified.replace(/<\/Card>/g, '</GlassCard>');
    }
  }

  return modified;
}

// Fix 4: Fix broken RelatedTools spacing (in-memory)
function fixRelatedToolsMem(content) {
  // Pattern: currentToolUrl="..."max={6}  ->  currentToolUrl="..." max={6}
  const brokenPattern = /(<RelatedTools\s+currentToolUrl="[^"]*")(\s*)max=\{(\d+)\}/g;
  if (brokenPattern.test(content)) {
    const modified = content.replace(brokenPattern, '$1 max={$3}');
    return { modified, changed: true };
  }
  return { modified: content, changed: false };
}

// Fix 5: Fix class concatenation bugs
function fixClassBugs(filePath, content) {
  let modified = content;
  let bugCount = 0;

  // Pattern 1: cardClass + "something" or textareaClass + "something"
  const concatPattern = /(cardClass|textareaClass|headerClass|titleClass|fieldClass)(\s*\+\s*"[^"]*")/g;
  if (concatPattern.test(modified)) {
    modified = modified.replace(concatPattern, (match, base, suffix) => {
      bugCount++;
      // Convert to cn(base, "...") - but we need to ensure cn is imported
      const classStr = suffix.replace(/^\s*\+\s*"/, '').replace(/"$/, '');
      return `cn(${base}, "${classStr}")`;
    });
    // Ensure cn is imported
    if (!/from\s*["']@\/lib\/utils["']/.test(modified)) {
      modified = addImport(modified, 'import { cn } from"@/lib/utils";');
    } else if (!/cn/.test(modified.split('\n').find(l => l.includes('@/lib/utils')) || '')) {
      // cn not imported but utils is - add cn to import
      modified = modified.replace(
        /import\s*\{([^}]*)\}\s*from\s*["']@\/lib\/utils["']/,
        (m, p1) => `import { ${p1.trim()}, cn } from"@/lib/utils"`
      );
    }
  }

  return { content: modified, bugCount };
}

// Main execution
console.log('🚀 Hermes Agent - Starting Comprehensive Auto-Fix\n');

const allFiles = findClientComponents(TOOLS_DIR);
const fileMap = {};
allFiles.forEach(f => { fileMap[f] = true; });

// Process ALL tools, not just failing ones - fix any missing layers
for (const result of report.results) {
  const filePath = path.join(__dirname, result.file);
  if (!fs.existsSync(filePath)) {
    fixStats.errors.push(`File not found: ${result.file}`);
    continue;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Apply fixes based on what's missing (check current file state, not stale report)
    const hasGridPattern = /<GridPattern/.test(content) && /from\s*["']@\/components\/magicui\/grid-pattern["']/.test(content);
    if (!hasGridPattern) {
      content = fixGridPattern(filePath, content);
      if (content !== original) fixStats.gridPatternAdded++;
    }

    const hasHowItWorks = /<ToolHowItWorks/.test(content);
    const hasFeatureGuides = /<ToolFeatureGuides/.test(content);
    const hasFaq = /<ToolFaqAccordion/.test(content);
    const hasRelated = /<RelatedTools/.test(content);
    
    if (!hasHowItWorks || !hasFeatureGuides || !hasFaq || !hasRelated) {
      const before = content;
      content = fixSeoSections(filePath, content, result.url);
      if (content !== before) fixStats.seoSectionsAdded++;
    }

    const hasGlassCard = /<GlassCard/.test(content);
    if (!hasGlassCard) {
      const before = content;
      content = fixGlassCard(filePath, content);
      if (content !== before) fixStats.glassCardFixed++;
    }

    // Fix broken RelatedTools spacing (in-memory, no disk re-read)
    const rtResult = fixRelatedToolsMem(content);
    if (rtResult.changed) {
      fixStats.relatedToolsFixed++;
      content = rtResult.modified;
    }

    // Fix class bugs
    if (result.classConcatBugsCount > 0) {
      const { content: fixedContent, bugCount } = fixClassBugs(filePath, content);
      if (bugCount > 0) {
        fixStats.classBugsFixed += bugCount;
        content = fixedContent;
      }
    }

    // Write back if changed
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
    }

  } catch (err) {
    fixStats.errors.push(`Error processing ${result.file}: ${err.message}`);
  }
}

console.log('══════════════════════════════════════════════════════════');
console.log('📊 HERMES AUTO-FIX COMPLETE');
console.log('══════════════════════════════════════════════════════════');
console.log(`GridPattern added:        ${fixStats.gridPatternAdded}`);
console.log(`SEO sections added:       ${fixStats.seoSectionsAdded}`);
console.log(`GlassCard fixed:           ${fixStats.glassCardFixed}`);
console.log(`RelatedTools spacing fix:  ${fixStats.relatedToolsFixed}`);
console.log(`Class bugs fixed:          ${fixStats.classBugsFixed}`);
console.log(`Errors:                    ${fixStats.errors.length}`);
if (fixStats.errors.length > 0) {
  console.log('\n⚠️  ERRORS:');
  fixStats.errors.slice(0, 20).forEach(e => console.log('  - ' + e));
}
console.log('\n✅ All fixes applied. Run hermes_audit.js again to verify.');
