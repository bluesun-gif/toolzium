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
import { Map, Plus, Trash2, Download } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass =
"border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const fieldClass =
"w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

interface SitemapRow {
 id: string;
 url: string;
 priority: string;
 changefreq: string;
 lastmod: string;
}

const changeFrequencies = [
"always",
"hourly",
"daily",
"weekly",
"monthly",
"yearly",
"never",
];

const priorities = ["0.1","0.2","0.3","0.4","0.5","0.6","0.7","0.8","0.9","1.0"];

function createRow(): SitemapRow {
 return {
 id: Math.random().toString(36).slice(2),
 url:"",
 priority:"0.8",
 changefreq:"weekly",
 lastmod: new Date().toISOString().split("T")[0],
 };
}

function escapeXml(value: string): string {
 return value
 .replace(/&/g,"&amp;")
 .replace(/</g,"&lt;")
 .replace(/>/g,"&gt;")
 .replace(/"/g,"&quot;")
 .replace(/'/g,"&apos;");
}

export default function SitemapGeneratorClient() {
 const [rows, setRows] = useState<SitemapRow[]>([createRow()]);

 const sitemapXml = useMemo(() => {
 const validRows = rows.filter((row) => row.url.trim());

 const urlBlocks = validRows
 .map((row) => {
 return [
"<url>",
 ` <loc>${escapeXml(row.url.trim())}</loc>`,
 row.lastmod ? ` <lastmod>${escapeXml(row.lastmod)}</lastmod>` :"",
 ` <changefreq>${escapeXml(row.changefreq)}</changefreq>`,
 ` <priority>${escapeXml(row.priority)}</priority>`,
"</url>",
 ]
 .filter(Boolean)
 .join("\n");
 })
 .join("\n");

 return `<?xml version="1.0"encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlBlocks}\n</urlset>`;
 }, [rows]);

 const updateRow = (id: string, patch: Partial<SitemapRow>) => {
 setRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));
 };

 const addRow = () => {
 setRows((prev) => [...prev, createRow()]);
 };

 const removeRow = (id: string) => {
 setRows((prev) => prev.filter((row) => row.id !== id));
 };

 const downloadXml = () => {
 const blob = new Blob([sitemapXml], { type:"application/xml"});
 const url = URL.createObjectURL(blob);
 const link = document.createElement("a");
 link.href = url;
 link.download ="sitemap.xml";
 link.click();
 URL.revokeObjectURL(url);
 toast.success("Downloaded sitemap.xml");
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader
 icon={Map}
 title="Sitemap Generator"
 description="Create a valid XML sitemap with URL priority, change frequency, and last modified dates."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Map className="w-4 h-4 text-primary"/> URLs
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 {rows.map((row) => (
 <div
 key={row.id}
 className="grid grid-cols-1 gap-3 rounded-xl border border-border/60 bg-background/60 p-3 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-end"
 >
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">URL</label>
 <Input
 value={row.url}
 onChange={(e) => updateRow(row.id, { url: e.target.value })}
 placeholder="https://example.com/page"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Priority</label>
 <select
 value={row.priority}
 onChange={(e) => updateRow(row.id, { priority: e.target.value })}
 className={fieldClass}
 >
 {priorities.map((priority) => (
 <option key={priority} value={priority}>
 {priority}
 </option>
 ))}
 </select>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Change Frequency</label>
 <select
 value={row.changefreq}
 onChange={(e) => updateRow(row.id, { changefreq: e.target.value })}
 className={fieldClass}
 >
 {changeFrequencies.map((frequency) => (
 <option key={frequency} value={frequency}>
 {frequency}
 </option>
 ))}
 </select>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Last Modified</label>
 <Input
 type="date"
 value={row.lastmod}
 onChange={(e) => updateRow(row.id, { lastmod: e.target.value })}
 />
 </div>

 <Button
 variant="outline"
 onClick={() => removeRow(row.id)}
 className="h-10 w-full md:w-auto"
 >
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 ))}

 <div className="flex flex-col gap-2 sm:flex-row">
 <Button onClick={addRow} variant="outline">
 <Plus className="w-4 h-4"/> Add URL
 </Button>
 <Button onClick={downloadXml} variant="outline">
 <Download className="w-4 h-4"/> Download .xml
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Map className="w-4 h-4 text-primary"/> Generated XML Sitemap
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <pre className="rounded-lg border border-border/60 bg-background/70 p-3 text-xs font-mono whitespace-pre-wrap break-words max-h-96 overflow-auto">
 {sitemapXml}
 </pre>
 <CopyButton getText={() => sitemapXml} label="Copy Sitemap XML"/>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Add URLs",
 description:"Enter the pages you want search engines to crawl.",
 icon: Map,
 },
 {
 step:"02",
 title:"Set Metadata",
 description:"Choose priority, change frequency, and last modified date.",
 icon: Plus,
 },
 {
 step:"03",
 title:"Copy or Download",
 description:"Export the sitemap as XML and upload it to your site.",
 icon: Download,
 },
 ]}
 badges={["100% Free","Client-Side","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 {
 icon: Map,
 title:"Valid XML Output",
 description:"Creates a sitemap formatted according to common sitemap standards.",
 },
 {
 icon: Plus,
 title:"Dynamic Rows",
 description:"Add or remove URLs as needed without leaving the page.",
 },
 {
 icon: Download,
 title:"Download Support",
 description:"Save the result directly as sitemap.xml.",
 },
 {
 icon: Map,
 title:"Crawl Guidance",
 description:"Supports changefreq and priority metadata for crawling hints.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>
 A sitemap helps search engines discover the important pages on your website. It is especially useful for
 large sites, new sites with few external links, or pages that may not be easily reached through internal
 navigation alone.
 </p>
 <p>
 XML sitemaps can include useful metadata such as when a page was last modified, how often it changes, and
 its relative priority. While search engines may not always use these hints as strict instructions, they can
 still help organize and understand site structure.
 </p>
 <p>
 After generating your sitemap, upload it to your website root or another accessible path and submit it in
 your preferred search console. Keep it updated as you add, remove, or restructure important pages.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 {
 question:"Where should I upload my sitemap?",
 answer:
"Usually to your website root, such as example.com/sitemap.xml, or another publicly accessible URL.",
 },
 {
 question:"Do all websites need a sitemap?",
 answer:
"Not always, but sitemaps are helpful for large, new, or complex websites.",
 },
 {
 question:"Does priority guarantee indexing?",
 answer:
"No. Priority is a hint, not a command. Search engines decide what to crawl and index.",
 },
 ]}
 />

 <RelatedTools currentToolUrl="/tools/seo/sitemap-generator" max={6} />
 </div>
 );
}
