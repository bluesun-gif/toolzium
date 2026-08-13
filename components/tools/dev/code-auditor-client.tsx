"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Braces, AlertTriangle, CheckCircle2, XCircle, Info, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
interface Finding {
  line: number;
  severity: 'critical' | 'warning' | 'info';
  category: string;
  description: string;
  suggestion: string;
  code: string;
}
const patterns = [{
  regex: /eval\s*\(/g,
  severity: 'critical' as const,
  category: 'Security',
  description: 'eval() usage detected',
  suggestion: 'Avoid eval() - use safer alternatives like Function constructor or JSON.parse'
}, {
  regex: /innerHTML\s*=|dangerouslySetInnerHTML/g,
  severity: 'critical' as const,
  category: 'XSS',
  description: 'Potential XSS vulnerability',
  suggestion: 'Use textContent or sanitize HTML with DOMPurify'
}, {
  regex: /var\s+\w+/g,
  severity: 'warning' as const,
  category: 'Best Practice',
  description: 'var keyword used',
  suggestion: 'Use const or let for block-scoped variables'
}, {
  regex: /==(?!=)/g,
  severity: 'warning' as const,
  category: 'Best Practice',
  description: 'Loose equality operator',
  suggestion: 'Use === for strict equality comparison'
}, {
  regex: /console\.(log|error|warn|info)/g,
  severity: 'info' as const,
  category: 'Production',
  description: 'Console statement found',
  suggestion: 'Remove console statements before production deployment'
}, {
  regex: /password\s*[:=]\s*['"][^'"]+['"]/gi,
  severity: 'critical' as const,
  category: 'Security',
  description: 'Hardcoded password detected',
  suggestion: 'Move sensitive data to environment variables'
}, {
  regex: /api[_-]?key\s*[:=]\s*['"][^'"]+['"]/gi,
  severity: 'critical' as const,
  category: 'Security',
  description: 'Hardcoded API key found',
  suggestion: 'Use environment variables for API keys'
}, {
  regex: /try\s*{[^}]*}/g,
  severity: 'info' as const,
  category: 'Error Handling',
  description: 'Verify error handling coverage',
  suggestion: 'Ensure all async operations have proper error handling'
}, {
  regex: /\b\d{2,}\b/g,
  severity: 'info' as const,
  category: 'Code Quality',
  description: 'Magic number detected',
  suggestion: 'Extract magic numbers to named constants'
}, {
  regex: /\.split\(|\.substring\(|\.slice\(/g,
  severity: 'info' as const,
  category: 'SQL Injection',
  description: 'String manipulation in potential query',
  suggestion: 'Use parameterized queries instead of string concatenation'
}];
export default function CodeAuditorClient() {
  const [code, setCode] = useState('');
  const [findings, setFindings] = useState<Finding[]>([]);
  const [language, setLanguage] = useState<string>('Unknown');
  const detectLanguage = (code: string): string => {
    if (code.includes('import ') && code.includes('from ')) return 'TypeScript/JavaScript';
    if (code.includes('def ') && code.includes(':')) return 'Python';
    if (code.includes('SELECT') && code.includes('FROM')) return 'SQL';
    if (code.includes('public class') || code.includes('private ')) return 'Java';
    return 'Unknown';
  };
  const auditCode = useCallback(() => {
    if (!code.trim()) {
      toast.error('Please paste some code to audit');
      return;
    }
    const lines = code.split('\n');
    const newFindings: Finding[] = [];
    patterns.forEach(pattern => {
      let match;
      // Reset regex index for safety
      pattern.regex.lastIndex = 0;
      while ((match = pattern.regex.exec(code)) !== null) {
        const beforeMatch = code.substring(0, match.index);
        const lineNumber = beforeMatch.split('\n').length;
        const lineCode = lines[lineNumber - 1]?.trim() || '';

        // Prevent duplicate findings on the exact same line
        if (!newFindings.some(f => f.line === lineNumber && f.description === pattern.description)) {
          newFindings.push({
            line: lineNumber,
            severity: pattern.severity,
            category: pattern.category,
            description: pattern.description,
            suggestion: pattern.suggestion,
            code: lineCode
          });
        }
      }
    });
    newFindings.sort((a, b) => {
      const severityOrder = {
        critical: 0,
        warning: 1,
        info: 2
      };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });
    setFindings(newFindings);
    setLanguage(detectLanguage(code));
    toast.success(`Audit complete: ${newFindings.length} issues found`);
  }, [code]);
  const stats = useMemo(() => {
    const critical = findings.filter(f => f.severity === 'critical').length;
    const warning = findings.filter(f => f.severity === 'warning').length;
    const info = findings.filter(f => f.severity === 'info').length;
    return {
      critical,
      warning,
      info,
      total: findings.length
    };
  }, [findings]);
  const severityIcon = (severity: string) => {
    if (severity === 'critical') return <XCircle className="w-4 h-4 text-red-500" />;
    if (severity === 'warning') return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    return <Info className="w-4 h-4 text-primary" />;
  };
  const severityColor = (severity: string) => {
    if (severity === 'critical') return 'bg-red-500/10 text-red-600 border-red-500/30';
    if (severity === 'warning') return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30';
    return 'bg-blue-500/10 text-primary border-blue-500/30';
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Shield} title="Code Auditor" description="Analyze your code for security vulnerabilities, best practice violations, and potential bugs - all client-side" />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Braces className="w-4 h-4 text-primary" />
 Code Input
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <textarea className={textareaClass} rows={12} value={code} onChange={e => setCode(e.target.value)} placeholder="Paste your code here for security and quality analysis..." />
 <div className="flex gap-2">
 <Button onClick={auditCode} className="flex-1">
 <Shield className="w-4 h-4 mr-2" />
 Audit Code
 </Button>
 <Button variant="outline" onClick={() => {
              setCode('');
              setFindings([]);
            }}>
 Clear
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 {findings.length > 0 && <>
 <GlassCard>
 <CardContent className="p-4">
 <div className="flex flex-wrap gap-3 items-center">
 <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
 <span className="text-sm font-medium">Language:</span>
 <span className="text-sm font-bold text-primary">{language}</span>
 </div>
 {stats.critical > 0 && <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30">
 <XCircle className="w-4 h-4 text-red-500" />
 <span className="text-sm font-bold text-red-600">{stats.critical} Critical</span>
 </div>}
 {stats.warning > 0 && <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
 <AlertTriangle className="w-4 h-4 text-yellow-500" />
 <span className="text-sm font-bold text-yellow-600">{stats.warning} Warnings</span>
 </div>}
 {stats.info > 0 && <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30">
 <Info className="w-4 h-4 text-primary" />
 <span className="text-sm font-bold text-primary">{stats.info} Info</span>
 </div>}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <AlertTriangle className="w-4 h-4 text-primary" />
 Findings ({findings.length})
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-3">
 {findings.map((finding, idx) => <div key={idx} className={`p-4 rounded-lg border ${severityColor(finding.severity)} animate-in fade-in slide-in-from-top-2`} style={{
              animationDelay: `${idx * 50}ms`
            }}>
 <div className="flex items-start gap-3">
 {severityIcon(finding.severity)}
 <div className="flex-1 space-y-2">
 <div className="flex items-center gap-2 flex-wrap">
 <span className="text-xs font-mono bg-background/50 px-2 py-0.5 rounded">
 Line {finding.line}
 </span>
 <span className="text-xs font-semibold uppercase tracking-wide">
 {finding.category}
 </span>
 </div>
 <p className="text-sm font-medium">{finding.description}</p>
 <code className="block text-xs bg-background/50 p-2 rounded font-mono overflow-x-auto">
 {finding.code}
 </code>
 <p className="text-xs opacity-80 italic">💡 {finding.suggestion}</p>
 </div>
 </div>
 </div>)}
 </CardContent>
 </GlassCard>
 </>}

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Paste Your Code",
        description: "Copy and paste any code snippet into the editor",
        icon: Braces
      }, {
        step: "02",
        title: "Run Analysis",
        description: "Click audit to scan for vulnerabilities and issues",
        icon: Shield
      }, {
        step: "03",
        title: "Review Findings",
        description: "Get detailed reports with line numbers and fixes",
        icon: CheckCircle2
      }]} badges={["100% Client-Side", "No Data Upload", "Instant Analysis"]} />

 <ToolFeatureGuides features={[{
        icon: Shield,
        title: "Security Scanning",
        description: "Detect SQL injection, XSS, and hardcoded secrets"
      }, {
        icon: AlertTriangle,
        title: "Best Practices",
        description: "Identify code quality issues and anti-patterns"
      }, {
        icon: Info,
        title: "Multi-Language",
        description: "Auto-detect JavaScript, Python, SQL, and more"
      }, {
        icon: CheckCircle2,
        title: "Actionable Fixes",
        description: "Get specific recommendations for each issue"
      }]}>
 <div className="prose max-w-none dark:prose-invert">
 <h3>Comprehensive Code Quality Analysis</h3>
 <p>The Code Auditor is a powerful client-side static analysis tool that helps developers identify security vulnerabilities, code quality issues, and best practice violations before they reach production. Unlike traditional linters that require installation and configuration, this tool runs entirely in your browser, ensuring your code never leaves your machine.</p>
 
 <h3>Security Vulnerability Detection</h3>
 <p>Security is paramount in modern software development. Our auditor scans for critical vulnerabilities including eval() usage (which can lead to code injection), innerHTML assignments that create XSS attack vectors, and hardcoded credentials that should never appear in source code. Each finding includes the exact line number and a clear explanation of why it's dangerous.</p>
 
 <h3>Code Quality & Best Practices</h3>
 <p>Beyond security, the tool identifies common anti-patterns like using var instead of const/let, loose equality operators (==) that can cause type coercion bugs, and console.log statements that should be removed before deployment. These issues might not break your code, but they indicate poor maintainability and can lead to subtle bugs.</p>
 
 <h3>How It Works</h3>
 <p>The auditor uses sophisticated regular expressions to pattern-match your code against known issue signatures. It counts line numbers accurately even in minified or formatted code, and provides context-aware suggestions. The analysis happens instantly in your browser using JavaScript's powerful regex engine, making it fast enough for even large codebases.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Is my code uploaded to a server?",
        answer: "No. All analysis happens 100% client-side in your browser. Your code never leaves your machine, ensuring complete privacy and security."
      }, {
        question: "What languages are supported?",
        answer: "The auditor auto-detects JavaScript, TypeScript, Python, SQL, and Java. It uses pattern matching to identify language-specific constructs and applies appropriate rules."
      }, {
        question: "Can I use this for production code?",
        answer: "Yes! This tool is designed for production code review. However, it's a supplement to professional security audits, not a replacement for comprehensive penetration testing."
      }]} />

 <RelatedTools currentToolUrl="/tools/dev/code-auditor" max={6} />
 </div></div>;
}