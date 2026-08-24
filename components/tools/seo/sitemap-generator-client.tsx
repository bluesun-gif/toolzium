"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { FileCode, Plus, Trash2, Download, Globe, Sparkles, Check } from "lucide-react";
import toast from "react-hot-toast";

interface SitemapUrl {
  id: string;
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export function SitemapGeneratorClient() {
  const [urls, setUrls] = useState<SitemapUrl[]>([
    {
      id: "1",
      loc: "https://toolzium.com",
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "daily",
      priority: "1.0"
    },
    {
      id: "2",
      loc: "https://toolzium.com/tools",
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: "0.8"
    }
  ]);

  const addUrl = () => {
    setUrls([
      ...urls,
      {
        id: Date.now().toString(),
        loc: "https://toolzium.com/tools/new-tool",
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "weekly",
        priority: "0.8"
      }
    ]);
    toast.success("Added URL entry!");
  };

  const removeUrl = (id: string) => {
    if (urls.length <= 1) {
      toast.error("Must have at least one URL entry.");
      return;
    }
    setUrls(urls.filter(u => u.id !== id));
  };

  const updateUrl = (id: string, field: keyof SitemapUrl, val: string) => {
    setUrls(urls.map(u => u.id === id ? { ...u, [field]: val } : u));
  };

  const generateXml = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    for (const u of urls) {
      xml += `  <url>\n`;
      xml += `    <loc>${u.loc}</loc>\n`;
      xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
      xml += `    <priority>${u.priority}</priority>\n`;
      xml += `  </url>\n`;
    }
    xml += `</urlset>`;
    return xml;
  };

  const downloadXml = () => {
    const xml = generateXml();
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded sitemap.xml!");
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={FileCode}
          title="XML Sitemap Generator"
          description="Build search-engine ready sitemap.xml files with custom priorities, change frequencies, and instant XML validation."
          actions={<div className="flex flex-wrap items-center gap-2">
              <CopyButton getText={generateXml} label="Copy XML" />
              <Button variant="default" onClick={downloadXml}>
                <Download className="w-4 h-4 mr-2" /> Download XML
              </Button>
            </div>
          }
        />

        <GlassCard>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Sitemap URLs ({urls.length})</CardTitle>
                <CardDescription>Configure URLs to include in the sitemap protocol output.</CardDescription>
              </div>
              <Button onClick={addUrl} size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add URL
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {urls.map((u) => (
              <div key={u.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 rounded-lg bg-muted/40 items-center">
                <div className="md:col-span-5">
                  <Input
                    placeholder="https://example.com/page"
                    value={u.loc}
                    onChange={e => updateUrl(u.id, "loc", e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    type="date"
                    value={u.lastmod}
                    onChange={e => updateUrl(u.id, "lastmod", e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <select
                    className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                    value={u.changefreq}
                    onChange={e => updateUrl(u.id, "changefreq", e.target.value)}
                  >
                    <option value="always">Always</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="never">Never</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <select
                    className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                    value={u.priority}
                    onChange={e => updateUrl(u.id, "priority", e.target.value)}
                  >
                    <option value="1.0">1.0 (Highest)</option>
                    <option value="0.9">0.9</option>
                    <option value="0.8">0.8 (Normal Hub)</option>
                    <option value="0.7">0.7</option>
                    <option value="0.6">0.6</option>
                    <option value="0.5">0.5 (Default)</option>
                    <option value="0.3">0.3</option>
                    <option value="0.1">0.1 (Lowest)</option>
                  </select>
                </div>
                <div className="md:col-span-1 flex justify-center">
                  <Button variant="ghost" size="icon" onClick={() => removeUrl(u.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </GlassCard>

        {/* XML Preview */}
        <GlassCard>
          <CardHeader>
            <CardTitle>Live sitemap.xml Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="p-4 rounded-lg bg-muted/60 font-mono text-xs overflow-x-auto whitespace-pre">
              {generateXml()}
            </pre>
          </CardContent>
        </GlassCard>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Add Webpage URLs", description: "Enter all the canonical URLs from your website.", icon: Globe },
            { step: "02", title: "Configure Meta", description: "Set last modified dates, update frequency, and crawling priority (0.1 to 1.0).", icon: Sparkles },
            { step: "03", title: "Export XML", description: "Download or copy the W3C-compliant sitemap.xml file for Google Search Console.", icon: Download }
          ]}
          badges={["100% Free Forever", "Official Sitemaps.org Schema", "Instant Local Generation"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Globe, title: "Sitemaps.org Compliant", description: "Generates valid XML adhering to the official search engine schema standard." },
            { icon: FileCode, title: "Custom Priority & Frequency", description: "Fine-tune crawling schedules with changefreq and priority attributes." },
            { icon: Download, title: "One-Click File Download", description: "Download ready-to-deploy sitemap.xml directly to your root directory." },
            { icon: Check, title: "Search Engine Optimization", description: "Ensures Googlebot and Bingbot discover all newly published pages rapidly." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Accelerating Search Engine Discovery with XML Sitemaps</h3>
            <p>
              An XML Sitemap acts as a roadmap for search engine crawlers (such as Googlebot, Bingbot, and AI indexing bots), informing them which pages are available for indexing and when they were last updated. Providing an accurate sitemap ensures that newly deployed tools, blog articles, and documentation pages get indexed quickly without waiting for organic link discovery.
            </p>
            <p>
              This generator allows webmasters and developers to build compliant sitemaps locally in their web browser with custom priorities and change frequencies, eliminating the need for expensive third-party crawler software.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "Where should I upload the sitemap.xml file?", answer: "Place sitemap.xml in the public root directory of your website (e.g. https://yourdomain.com/sitemap.xml) and submit the URL in Google Search Console." },
            { question: "What is the maximum limit for a single sitemap file?", answer: "A single standard sitemap.xml can contain up to 50,000 URLs or 50MB uncompressed. Larger websites can use a Sitemap Index file." },
            { question: "Is this tool free?", answer: "Yes, 100% free with no limits on URL generation." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/seo/sitemap-generator" max={6} />
      </div>
    </div>
  );
}

export default SitemapGeneratorClient;
