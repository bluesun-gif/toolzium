"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Settings, Copy, Eye, EyeOff, Plus, Trash2, ArrowDownAZ, AlertTriangle, FileCode } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

type EnvLine = { type:"var"|"comment"|"empty"|"invalid"; key?: string; value?: string; comment?: string; raw?: string; index: number };

export function EnvEditorClient() {
 const [rawEnv, setRawEnv] = useState("# Database Configuration\nDB_HOST=localhost\nDB_PORT=5432\nDB_USER=admin\nDB_PASSWORD=super_secret_password_123\n\n# API Keys\nAPI_KEY=sk_live_1234567890abcdef\nDEBUG=true");
 const [viewMode, setViewMode] = useState<"raw"|"table">("table");
 const [showSecrets, setShowSecrets] = useState(false);
 const [newKey, setNewKey] = useState("");
 const [newValue, setNewValue] = useState("");
 const [exportFormat, setExportFormat] = useState<"env"|"json"|"yaml"|"docker">("env");

 const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard!");
 };

 const parsedEnv = useMemo((): EnvLine[] => {
 return rawEnv.split('\n').map((line, index) => {
 const trimmed = line.trim();
 if (!trimmed) return { type:"empty", raw: line, index };
 if (trimmed.startsWith('#')) return { type:"comment", comment: trimmed.substring(1).trim(), raw: line, index };
 
 const eqIndex = line.indexOf('=');
 if (eqIndex > 0) {
 const key = line.substring(0, eqIndex).trim();
 let value = line.substring(eqIndex + 1).trim();
 if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
 value = value.slice(1, -1);
 }
 return { type:"var", key, value, raw: line, index };
 }
 return { type:"invalid", raw: line, index };
 });
 }, [rawEnv]);

 const validations = useMemo(() => {
 const warnings: string[] = [];
 const keys = parsedEnv.filter((p) => p.type ==="var").map((p) => p.key as string);
 const duplicates = keys.filter((k, i) => keys.indexOf(k) !== i);
 if (duplicates.length > 0) warnings.push(`Duplicate keys found: ${[...new Set(duplicates)].join(', ')}`);
 
 parsedEnv.forEach((p) => {
 if (p.type ==="var") {
 if (!/^[A-Z0-9_]+$/.test(p.key as string)) warnings.push(`Invalid key format: ${p.key} (Use SCREAMING_SNAKE_CASE)`);
 if (!p.value) warnings.push(`Empty value for key: ${p.key}`);
 }
 });
 return warnings;
 }, [parsedEnv]);

 const updateLine = (index: number, field:"key"|"value"|"comment", val: string) => {
 const lines = rawEnv.split('\n');
 const line = parsedEnv[index];
 if (line.type ==="var") {
 if (field ==="key") lines[index] = `${val}=${line.value}`;
 if (field ==="value") lines[index] = `${line.key}=${val}`;
 } else if (line.type ==="comment"&& field ==="comment") {
 lines[index] = `# ${val}`;
 }
 setRawEnv(lines.join('\n'));
 };

 const deleteLine = (index: number) => {
 const lines = rawEnv.split('\n');
 lines.splice(index, 1);
 setRawEnv(lines.join('\n'));
 };

 const addVariable = () => {
 if (!newKey) return toast.error("Key is required");
 const addition = `${newKey}=${newValue}`;
 setRawEnv(rawEnv + (rawEnv.endsWith('\n') ? '' : '\n') + addition);
 setNewKey(""); setNewValue("");
 toast.success("Variable added");
 };

 const sortAlphabetically = () => {
 const lines = rawEnv.split('\n');
 const vars = lines.filter((l) => l.includes('=') && !l.trim().startsWith('#'));
 const others = lines.filter((l) => !l.includes('=') || l.trim().startsWith('#'));
 vars.sort((a, b) => a.split('=')[0].localeCompare(b.split('=')[0]));
 setRawEnv([...others, ...vars].join('\n'));
 toast.success("Sorted alphabetically");
 };

 const removeDuplicates = () => {
 const lines = rawEnv.split('\n');
 const seen = new Set();
 const unique = lines.filter((l) => {
 if (!l.includes('=') || l.trim().startsWith('#')) return true;
 const key = l.split('=')[0].trim();
 if (seen.has(key)) return false;
 seen.add(key);
 return true;
 });
 setRawEnv(unique.join('\n'));
 toast.success("Duplicates removed");
 };

 const exportedCode = useMemo(() => {
 const vars = parsedEnv.filter((p) => p.type ==="var") as EnvLine[];
 if (exportFormat ==="env") return rawEnv;
 if (exportFormat ==="json") {
 const obj: Record<string, string> = {};
 vars.forEach((v) => { obj[v.key as string] = v.value as string; });
 return JSON.stringify(obj, null, 2);
 }
 if (exportFormat ==="yaml") {
 return vars.map((v) => `${v.key}:"${v.value}"`).join('\n');
 }
 if (exportFormat ==="docker") {
 return vars.map((v) => `--env ${v.key}="${v.value}"`).join(' \\\n');
 }
 return"";
 }, [parsedEnv, rawEnv, exportFormat]);

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-4 py-8">
 <ToolPageHeader
 icon={Settings}
 title="Professional .env Editor"
 description="Parse, validate, format, and export environment variables. Manage your .env files with secret masking and syntax validation."
 />

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Controls</CardTitle>
 <div className="flex gap-2">
 <Button variant={viewMode ==="raw"?"default":"outline"} size="sm"onClick={() => setViewMode("raw")}>Raw Text</Button>
 <Button variant={viewMode ==="table"?"default":"outline"} size="sm"onClick={() => setViewMode("table")}>Table View</Button>
 <Button variant="outline"size="sm"onClick={() => setShowSecrets(!showSecrets)}>
 {showSecrets ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
 </Button>
 </div>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 {viewMode ==="raw"? (
 <textarea value={rawEnv} onChange={(e) => setRawEnv(e.target.value)} className={textareaClass} rows={12} />
 ) : (
 <div className="border border-border/50 rounded-lg overflow-hidden">
 <table className="w-full text-sm">
 <thead className="bg-muted/30 border-b border-border/50">
 <tr>
 <th className="p-3 text-left font-semibold">Key</th>
 <th className="p-3 text-left font-semibold">Value</th>
 <th className="p-3 text-left font-semibold">Comment</th>
 <th className="p-3 w-16"></th>
 </tr>
 </thead>
 <tbody>
 {parsedEnv.map((line) => (
 <tr key={line.index} className="border-b border-border/30 hover:bg-muted/10">
 <td className="p-2">
 {line.type ==="var"&& <Input value={line.key} onChange={(e) => updateLine(line.index,"key", e.target.value)} className="font-mono text-xs"/>}
 {line.type ==="invalid"&& <span className="text-red-500 text-xs">{line.raw}</span>}
 </td>
 <td className="p-2">
 {line.type ==="var"&& <Input type={showSecrets || !line.key?.match(/key|secret|password|token|auth/i) ?"text":"password"} value={line.value} onChange={(e) => updateLine(line.index,"value", e.target.value)} className="font-mono text-xs"/>}
 </td>
 <td className="p-2">
 {line.type ==="comment"&& <Input value={line.comment} onChange={(e) => updateLine(line.index,"comment", e.target.value)} className="text-xs text-muted-foreground"/>}
 </td>
 <td className="p-2">
 {(line.type ==="var"|| line.type ==="comment"|| line.type ==="empty") && (
 <Button variant="ghost"size="icon"onClick={() => deleteLine(line.index)}><Trash2 className="w-4 h-4 text-red-500"/></Button>
 )}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}

 <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-border/50">
 <Input placeholder="NEW_KEY"value={newKey} onChange={(e) => setNewKey(e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, ''))} className="flex-1 font-mono"/>
 <Input placeholder="value"value={newValue} onChange={(e) => setNewValue(e.target.value)} className="flex-1 font-mono"/>
 <Button onClick={addVariable}><Plus className="w-4 h-4 mr-2"/> Add</Button>
 <Button variant="outline"onClick={sortAlphabetically}><ArrowDownAZ className="w-4 h-4 mr-2"/> Sort</Button>
 <Button variant="outline"onClick={removeDuplicates}>Remove Duplicates</Button>
 </div>
 </CardContent>
 </Card>

 {validations.length > 0 && (
 <Card className="border border-yellow-500/50 shadow-lg bg-yellow-500/5 rounded-2xl overflow-hidden">
 <CardContent className="p-4 space-y-2">
 <div className="flex items-center gap-2 font-semibold text-yellow-600 dark:text-yellow-400">
 <AlertTriangle className="w-5 h-5"/> Validation Warnings
 </div>
 <ul className="list-disc pl-5 text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
 {validations.map((w, i) => <li key={i}>{w}</li>)}
 </ul>
 </CardContent>
 </Card>
 )}

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><FileCode className="w-4 h-4"/> Export</CardTitle>
 <div className="flex gap-2">
 {(["env","json","yaml","docker"] as const).map((fmt) => (
 <Button key={fmt} variant={exportFormat === fmt ?"default":"outline"} size="sm"onClick={() => setExportFormat(fmt)} className="uppercase">
 {fmt}
 </Button>
 ))}
 <Button variant="outline"size="sm"onClick={() => handleCopy(exportedCode)}><Copy className="w-4 h-4"/></Button>
 </div>
 </CardHeader>
 <CardContent className="p-4">
 <textarea readOnly value={exportedCode} className={textareaClass} rows={10} />
 <div className="mt-3 text-xs text-muted-foreground flex justify-between">
 <span>Total Variables: {parsedEnv.filter((p) => p.type ==="var").length}</span>
 <span>Comments: {parsedEnv.filter((p) => p.type ==="comment").length}</span>
 </div>
 </CardContent>
 </Card>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Paste .env Content", description:"Import your raw environment variables file into the editor.", icon: FileCode },
 { step:"02", title:"Validate & Clean", description:"Automatically detect duplicate keys, invalid formats, and mask sensitive secrets.", icon: AlertTriangle },
 { step:"03", title:"Export for Deployment", description:"Convert your variables into JSON, YAML, or Docker CLI formats instantly.", icon: Copy },
 ]}
 badges={["100% Free","Client-Side Privacy","No Data Upload"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Eye, title:"Secret Masking", description:"Automatically hides values for keys containing 'password', 'secret', 'token', or 'key'."},
 { icon: AlertTriangle, title:"Smart Validation", description:"Detects duplicate keys, empty values, and enforces SCREAMING_SNAKE_CASE naming conventions."},
 { icon: FileCode, title:"Multi-Format Export", description:"Export your config as standard .env, JSON, YAML, or Docker CLI arguments."},
 { icon: ArrowDownAZ, title:"Table Management", description:"Sort alphabetically, remove duplicates, and edit keys/values in a structured grid view."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none mt-6">
 <h3>The Critical Role of Environment Variables in Modern DevOps</h3>
 <p>Environment variables are the backbone of the Twelve-Factor App methodology, providing a clean separation between code and configuration. By storing sensitive credentials, API keys, and environment-specific settings (like database URLs or feature flags) outside the codebase, developers ensure that the same application binary can be deployed across staging, testing, and production environments without modification. However, managing <code>.env</code> files manually is fraught with peril. A single typo, a missing quote, or an accidental commit to version control can lead to catastrophic security breaches or silent application failures.</p>
 <p>This professional editor addresses the common pain points of environment management. First, it enforces strict validation rules. Environment variable keys should universally follow the SCREAMING_SNAKE_CASE convention (e.g., <code>DATABASE_URL</code>) to ensure compatibility across different operating systems and shell environments. The tool automatically flags deviations from this standard, as well as dangerous duplicate keys which can cause unpredictable overriding behavior during runtime.</p>
 <h3>Security and Cross-Platform Compatibility</h3>
 <p>Perhaps the most dangerous aspect of handling <code>.env</code> files is the risk of exposing secrets. This tool implements intelligent secret masking, automatically detecting keys that imply sensitive data (such as those containing"token","secret", or"password") and obscuring their values on screen. Furthermore, different deployment targets require different configuration formats. While Node.js and Python applications typically read standard <code>.env</code> files, modern infrastructure often relies on JSON or YAML for Kubernetes ConfigMaps, or specific CLI flags for Docker containers. The ability to instantly translate your flat key-value pairs into these structured formats eliminates manual translation errors and accelerates deployment pipelines significantly.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Are my environment variables uploaded to a server?", answer:"No. This tool runs 100% locally in your browser. Your .env data is never transmitted over the internet, ensuring maximum security for your credentials."},
 { question:"Why are my values being ignored by my application?", answer:"Many parsers require values containing spaces or special characters to be wrapped in quotes (e.g., `MY_VAR=\"hello world\"`). Ensure your values are properly escaped."},
 { question:"What is the correct naming convention for env keys?", answer:"The industry standard is SCREAMING_SNAKE_CASE (e.g., `AWS_ACCESS_KEY_ID`). This avoids issues with case-sensitivity in different shell environments."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/dev/env-editor"max={6} />
 </div>
 );
}

export default EnvEditorClient;
