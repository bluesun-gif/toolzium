"use client";

import React, { useMemo, useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { CopyButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { FileText, Plus, Trash2, Download } from"lucide-react";

const cardClass =
"border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const fieldClass =
"w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

interface RobotsRule {
 id: string;
 type:"Allow"|"Disallow";
 path: string;
}

function createRule(): RobotsRule {
 return {
 id: Math.random().toString(36).slice(2),
 type:"Disallow",
 path:"/",
 };
}

export default function RobotsGeneratorClient() {
 const [userAgent, setUserAgent] = useState("*");
 const [customAgent, setCustomAgent] = useState("");
 const [rules, setRules] = useState<RobotsRule[]>([createRule()]);
 const [crawlDelay, setCrawlDelay] = useState("");
 const [sitemapUrl, setSitemapUrl] = useState("");

 const robotsTxt = useMemo(() => {
 const agent = userAgent ==="custom"&& customAgent.trim() ? customAgent.trim() : userAgent;

 const lines: string[] = [`User-agent: ${agent}`];

 for (const rule of rules) {
 if (rule.path.trim()) {
 lines.push(`${rule.type}: ${rule.path.trim()}`);
 }
 }

 if (crawlDelay.trim()) {
 lines.push(`Crawl-delay: ${crawlDelay.trim()}`);
 }

 if (sitemapUrl.trim()) {
 lines.push("");
 lines.push(`Sitemap: ${sitemapUrl.trim()}`);
 }

 return lines.join("\n");
 }, [userAgent, customAgent, rules, crawlDelay, sitemapUrl]);

 const updateRule = (id: string, patch: Partial<RobotsRule>) => {
 setRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, ...patch } : rule)));
 };

 const addRule = () => {
 setRules((prev) => [...prev, createRule()]);
 };

 const removeRule = (id: string) => {
 setRules((prev) => prev.filter((rule) => rule.id !== id));
 };

 const downloadTxt = () => {
 const blob = new Blob([robotsTxt], { type:"text/plain"});
 const url = URL.createObjectURL(blob);
 const link = document.createElement("a");
 link.href = url;
 link.download ="robots.txt";
 link.click();
 URL.revokeObjectURL(url);
 toast.success("Downloaded robots.txt");
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader
 icon={FileText}
 title="Robots.txt Generator"
 description="Configure user agents, allow/disallow rules, crawl delay, and sitemap URL to generate robots.txt."
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <FileText className="w-4 h-4 text-primary"/> Configuration
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">User-agent</label>
 <select
 value={userAgent}
 onChange={(e) => setUserAgent(e.target.value)}
 className={fieldClass}
 >
 <option value="*">All</option>
 <option value="Googlebot">Googlebot</option>
 <option value="Bingbot">Bingbot</option>
 <option value="custom">Custom</option>
 </select>
 </div>

 {userAgent ==="custom"&& (
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Custom User-agent</label>
 <Input
 value={customAgent}
 onChange={(e) => setCustomAgent(e.target.value)}
 placeholder="e.g. DuckDuckBot"
 />
 </div>
 )}
 </div>

 <div className="space-y-3">
 <label className="text-xs font-medium text-muted-foreground">Rules</label>
 {rules.map((rule) => (
 <div
 key={rule.id}
 className="grid grid-cols-1 gap-3 rounded-xl border border-border/60 bg-background/60 p-3 md:grid-cols-[140px_1fr_auto] md:items-end"
 >
 <select
 value={rule.type}
 onChange={(e) =>
 updateRule(rule.id, { type: e.target.value as RobotsRule["type"] })
 }
 className={fieldClass}
 >
 <option value="Allow">Allow</option>
 <option value="Disallow">Disallow</option>
 </select>

 <Input
 value={rule.path}
 onChange={(e) => updateRule(rule.id, { path: e.target.value })}
 placeholder="/private/"
 />

 <Button variant="outline"onClick={() => removeRule(rule.id)} className="h-10">
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 ))}

 <Button onClick={addRule} variant="outline">
 <Plus className="w-4 h-4"/> Add Rule
 </Button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Crawl-delay</label>
 <Input
 value={crawlDelay}
 onChange={(e) => setCrawlDelay(e.target.value)}
 placeholder="e.g. 10"
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Sitemap URL</label>
 <Input
 value={sitemapUrl}
 onChange={(e) => setSitemapUrl(e.target.value)}
 placeholder="https://example.com/sitemap.xml"
 />
 </div>
 </div>
 </CardContent>
 </Card>

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Download className="w-4 h-4 text-primary"/> Generated robots.txt
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <pre className="rounded-lg border border-border/60 bg-background/70 p-3 text-xs font-mono whitespace-pre-wrap break-words max-h-[420px] overflow-auto">
 {robotsTxt}
 </pre>
 <div className="flex flex-col gap-2 sm:flex-row">
 <CopyButton getText={() => robotsTxt} label="Copy robots.txt"/>
 <Button onClick={downloadTxt} variant="outline">
 <Download className="w-4 h-4"/> Download .txt
 </Button>
 </div>
 </CardContent>
 </Card>
 </div>

 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Choose User-agent",
 description:"Apply rules to all crawlers or a specific bot.",
 icon: FileText,
 },
 {
 step:"02",
 title:"Add Allow/Disallow Rules",
 description:"Define which paths crawlers can or cannot access.",
 icon: Plus,
 },
 {
 step:"03",
 title:"Export robots.txt",
 description:"Copy or download the file and place it in your site root.",
 icon: Download,
 },
 ]}
 badges={["100% Free","Client-Side","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 {
 icon: FileText,
 title:"Crawler Control",
 description:"Creates rules for managing how bots access your site.",
 },
 {
 icon: Plus,
 title:"Flexible Rules",
 description:"Supports multiple Allow and Disallow paths.",
 },
 {
 icon: Download,
 title:"Instant Export",
 description:"Copy or download the generated robots.txt file.",
 },
 {
 icon: FileText,
 title:"Sitemap Support",
 description:"Adds your sitemap URL directly to the file.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>
 A robots.txt file tells crawlers which parts of your website they can request. It is commonly used to avoid
 overloading servers, keep internal utility paths out of crawl queues, and guide crawlers toward important
 content.
 </p>
 <p>
 It is important to understand that robots.txt is not a security tool. It does not protect sensitive pages
 from being indexed if they are linked elsewhere. For private content, use authentication, noindex rules, or
 proper access controls.
 </p>
 <p>
 When creating robots.txt rules, be careful with broad Disallow patterns. Accidentally blocking CSS,
 JavaScript, or important pages can hurt how search engines render and understand your site. Always test
 your final file before deploying it.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 {
 question:"Where does robots.txt go?",
 answer:"It should usually be placed in the root directory of your domain.",
 },
 {
 question:"Does robots.txt block indexing?",
 answer:
"Not directly. It controls crawling, not necessarily indexing. Use noindex if you want to prevent indexing.",
 },
 {
 question:"Is crawl-delay supported by all bots?",
 answer:"No. Some crawlers ignore it, so use it only when appropriate.",
 },
 ]}
 />

 <RelatedTools currentToolUrl="/tools/seo/robots-generator"max={6} />
 </div>
 );
}
