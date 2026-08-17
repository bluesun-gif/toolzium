"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw, ShieldAlert, Download, ChevronDown, ChevronUp, FileWarning, KeyRound, AlertTriangle, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
interface EnvVar {
  key: string;
  value: string;
  line: number;
}
interface Risk {
  key: string;
  level: "CRITICAL" | "WARNING" | "INFO";
  issue: string;
  recommendation: string;
}
export function EnvScannerClient() {
  const [input, setInput] = useState<string>("");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  const analysis = useMemo(() => {
    if (!input.trim()) return {
      vars: [] as EnvVar[],
      risks: [] as Risk[],
      stats: {
        total: 0,
        risks: 0,
        critical: 0
      }
    };
    const lines = input.split("\n");
    const vars: EnvVar[] = [];
    const keysSeen = new Set<string>();
    const risks: Risk[] = [];
    const sensitiveWords = ["password", "secret", "key", "token", "auth", "private"];
    const placeholders = ["changeme", "todo", "xxx", "example", "test", "placeholder", "your_", "insert_"];
    const requiredVars = ["DATABASE_URL", "NODE_ENV"];
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) return;
      const key = trimmed.substring(0, eqIdx).trim();
      let value = trimmed.substring(eqIdx + 1).trim();
      if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      vars.push({
        key,
        value,
        line: idx + 1
      });
      if (keysSeen.has(key)) {
        risks.push({
          key,
          level: "WARNING",
          issue: "Duplicate key definition",
          recommendation: "Remove the duplicate variable to avoid unexpected overrides."
        });
      }
      keysSeen.add(key);
      if (!/^[A-Z0-9_]+$/.test(key) && !key.startsWith("NEXT_PUBLIC_")) {
        risks.push({
          key,
          level: "INFO",
          issue: "Non-standard naming convention",
          recommendation: "Use SCREAMING_SNAKE_CASE for environment variables."
        });
      }
      if (value === "") {
        risks.push({
          key,
          level: "WARNING",
          issue: "Empty value detected",
          recommendation: "Assign a valid value or remove the variable if unused."
        });
      }
      if (value.includes("") && !trimmed.substring(eqIdx + 1).trim().startsWith('"') && !trimmed.substring(eqIdx + 1).trim().startsWith("'")) {
        risks.push({
          key,
          level: "WARNING",
          issue: "Unquoted value with spaces",
          recommendation: 'Wrap values containing spaces in quotes (e.g.,"my value").'
        });
      }
      if (value === "*") {
        risks.push({
          key,
          level: "CRITICAL",
          issue: "Overly permissive wildcard (*)",
          recommendation: "Restrict CORS or access control to specific domains/IPs."
        });
      }
      const lowerVal = value.toLowerCase();
      if (placeholders.some(p => lowerVal.includes(p))) {
        risks.push({
          key,
          level: "WARNING",
          issue: "Placeholder/default value detected",
          recommendation: "Replace with a secure, production-ready value."
        });
      }
      if (value.startsWith("sk_live_") || value.startsWith("AKIA") || value.startsWith("ghp_") || value.startsWith("sk-") && value.length > 20) {
        risks.push({
          key,
          level: "CRITICAL",
          issue: "Potential live API key exposed",
          recommendation: "REVOKE THIS KEY IMMEDIATELY and move to a secure vault."
        });
      }
      if (key.startsWith("NEXT_PUBLIC_") && sensitiveWords.some(w => key.toLowerCase().includes(w))) {
        risks.push({
          key,
          level: "CRITICAL",
          issue: "Sensitive variable exposed to browser",
          recommendation: "Remove NEXT_PUBLIC_ prefix. Secrets must remain server-side only."
        });
      }
    });
    requiredVars.forEach(req => {
      if (!keysSeen.has(req)) {
        risks.push({
          key: req,
          level: "INFO",
          issue: "Common required variable missing",
          recommendation: `Consider adding ${req} for standard environment configuration.`
        });
      }
    });
    return {
      vars,
      risks,
      stats: {
        total: vars.length,
        risks: risks.length,
        critical: risks.filter(r => r.level === "CRITICAL").length
      }
    };
  }, [input]);
  const toggleRow = (key: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(analysis, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "env-audit-report.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Report exported!");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={ShieldAlert} title="Env Scanner & Security Analyzer" description="Audit your .env files for leaked secrets, hardcoded passwords, and configuration vulnerabilities entirely client-side." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <FileWarning className="w-4 h-4" /> Environment Configuration Input
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <textarea className={textareaClass} rows={10} placeholder={`# Paste your .env file contents here\nDATABASE_URL="postgresql://..."\nNEXT_PUBLIC_SECRET_KEY="changeme"`} value={input} onChange={e => setInput(e.target.value)} />
 <div className="flex flex-wrap gap-3">
 <Button onClick={() => toast.success("Scan complete!")}>Scan Environment Variables</Button>
 <Button variant="outline" onClick={() => setInput("")}>
 <RotateCcw className="w-4 h-4 mr-2" /> Clear
 </Button>
 <Button variant="secondary" onClick={exportJson} disabled={analysis.risks.length === 0 && analysis.vars.length === 0}>
 <Download className="w-4 h-4 mr-2" /> Export JSON Report
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 {input.trim() && <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <CheckCircle2 className="w-4 h-4" /> Audit Statistics
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
 <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
 <div className="text-2xl font-bold text-foreground">{analysis.stats.total}</div>
 <div className="text-xs text-muted-foreground uppercase tracking-wider">Variables Scanned</div>
 </div>
 <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
 <div className="text-2xl font-bold text-yellow-500">{analysis.stats.risks}</div>
 <div className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-wider">Risks Found</div>
 </div>
 <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
 <div className="text-2xl font-bold text-red-500">{analysis.stats.critical}</div>
 <div className="text-xs text-red-600 dark:text-red-400 uppercase tracking-wider">Critical Issues</div>
 </div>
 </div>
 </CardContent>
 </GlassCard>}

 {analysis.risks.length > 0 && <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <AlertTriangle className="w-4 h-4" /> Security Findings
 </CardTitle>
 </CardHeader>
 <CardContent className="p-0">
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border/50">
 <tr>
 <th className="px-4 py-3">Variable</th>
 <th className="px-4 py-3">Severity</th>
 <th className="px-4 py-3">Issue</th>
 <th className="px-4 py-3 text-right">Details</th>
 </tr>
 </thead>
 <tbody>
 {analysis.risks.map((risk, idx) => {
                  const isCritical = risk.level === "CRITICAL";
                  const isWarning = risk.level === "WARNING";
                  const colorClass = isCritical ? "text-red-500 bg-red-500/10 border-red-500/20" : isWarning ? "text-yellow-500 bg-yellow-500/10 border-yellow-500/20" : "text-primary bg-blue-500/10 border-blue-500/20";
                  return <React.Fragment key={`${risk.key}-${idx}`}>
 <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => toggleRow(`${risk.key}-${idx}`)}>
 <td className="px-4 py-3 font-mono font-semibold">{risk.key}</td>
 <td className="px-4 py-3">
 <span className={`px-2 py-1 rounded-md text-xs font-bold border ${colorClass}`}>{risk.level}</span>
 </td>
 <td className="px-4 py-3 text-muted-foreground">{risk.issue}</td>
 <td className="px-4 py-3 text-right">
 {expandedRows[`${risk.key}-${idx}`] ? <ChevronUp className="w-4 h-4 mx-auto" /> : <ChevronDown className="w-4 h-4 mx-auto" />}
 </td>
 </tr>
 {expandedRows[`${risk.key}-${idx}`] && <tr className="bg-muted/10 border-b border-border/30">
 <td colSpan={4} className="px-6 py-4 text-sm">
 <div className="flex items-start gap-2">
 <KeyRound className="w-4 h-4 mt-0.5 text-primary" />
 <span>
 <strong>Recommendation:</strong> {risk.recommendation}
 </span>
 </div>
 </td>
 </tr>}
 </React.Fragment>;
                })}
 </tbody>
 </table>
 </div>
 </CardContent>
 </GlassCard>}

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Paste Your Env File",
        description: "Copy the raw contents of your .env or .env.local file and paste it into the scanner textarea.",
        icon: FileWarning
      }, {
        step: "02",
        title: "Instant Analysis",
        description: "Our engine immediately parses variables, checking against known leak patterns, weak defaults, and naming standards.",
        icon: ShieldAlert
      }, {
        step: "03",
        title: "Review & Export",
        description: "Review the severity-ranked findings, expand for remediation steps, and export the full report as JSON.",
        icon: Download
      }]} badges={["100% Free", "Client-Side Privacy", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: KeyRound,
        title: "API Key Leak Detection",
        description: "Instantly identifies exposed Stripe, AWS, GitHub, and OpenAI live keys using pattern matching."
      }, {
        icon: AlertTriangle,
        title: "Next.js Public Exposure",
        description: "Flags dangerous NEXT_PUBLIC_ prefixes applied to sensitive variables that leak secrets to the browser."
      }, {
        icon: FileWarning,
        title: "Weak Defaults & Placeholders",
        description: "Catches insecure defaults like 'changeme', empty strings, and overly permissive wildcards."
      }, {
        icon: ShieldAlert,
        title: "Zero Data Transmission",
        description: "All parsing and analysis occurs locally in your browser. Your secrets never touch our servers."
      }]}>
 <div className="prose dark:prose-invert max-w-none">
 <h3>The Critical Importance of Environment Security</h3>
 <p>Environment variables are the backbone of modern application configuration, securely storing everything from database URIs to third-party API keys. However, misconfigured <code>.env</code> files are a leading cause of catastrophic data breaches. Exposing a single live Stripe key or AWS access token can result in massive financial liabilities and compromised infrastructure within minutes.</p>
 <p>This Env Scanner acts as your first line of defense, performing a rigorous static analysis of your configuration files before they ever reach production. By enforcing strict naming conventions (SCREAMING_SNAKE_CASE), identifying unquoted strings that may break parsing, and detecting accidental commits of live credentials, developers can maintain a hardened security posture.</p>
 <h3>Common Vulnerabilities Detected</h3>
 <ul>
 <li><strong>Browser Exposure:</strong> Frameworks like Next.js expose any variable prefixed with <code>NEXT_PUBLIC_</code> to the client-side bundle. Applying this prefix to database passwords or secret tokens effectively publishes them to the world.</li>
 <li><strong>Placeholder Persistence:</strong> Development environments often rely on placeholders like"xxx"or"changeme". If these are promoted to staging or production without replacement, they create silent failures or security gaps.</li>
 <li><strong>Overly Permissive CORS:</strong> Using wildcards (<code>*</code>) for CORS origins or API access controls violates the principle of least privilege and invites malicious cross-origin requests.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Are my .env variables sent to a server for analysis?",
        answer: "No. This tool operates 100% client-side using JavaScript in your browser. Your environment variables, secrets, and API keys never leave your local machine."
      }, {
        question: "Does this tool support .env formatting with quotes?",
        answer: "Yes. The parser intelligently strips both single and double quotes from values to accurately analyze the underlying string data."
      }, {
        question: "What frameworks does this scanner support?",
        answer: "While it works for any standard key-value format, it includes specialized rules for Next.js (NEXT_PUBLIC_), React, Node.js, and standard Docker environment configurations."
      }, {
        question: "Can I export the audit results for my compliance team?",
        answer: "Absolutely. Use the 'Export JSON Report' button to download a structured file containing all scanned variables, identified risks, and remediation recommendations."
      }]} />
    </div>
    </div>
);
}

export default EnvScannerClient;
