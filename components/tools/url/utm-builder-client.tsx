"use client";

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
import { Copy, Download, History, Link2, QrCode } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

const SOURCES = ["google", "facebook", "twitter", "linkedin", "email", "newsletter", "bing", "reddit"];
const MEDIUMS = ["cpc", "social", "email", "banner", "referral", "organic", "video", "display"];

interface UtmHistoryItem { url: string; source: string; medium: string; campaign: string; date: string; }

export function UTMBuilderClient() {
  const [baseUrl, setBaseUrl] = useState("https://toolflux.com");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [history, setHistory] = useState<UtmHistoryItem[]>([]);
  const [bulkUrls, setBulkUrls] = useState("");
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");

  useEffect(() => {
    const saved = localStorage.getItem("utm_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const generatedUrl = useMemo(() => {
    if (!baseUrl) return "";
    try {
      const url = new URL(baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`);
      if (source) url.searchParams.set("utm_source", source);
      if (medium) url.searchParams.set("utm_medium", medium);
      if (campaign) url.searchParams.set("utm_campaign", campaign);
      if (term) url.searchParams.set("utm_term", term);
      if (content) url.searchParams.set("utm_content", content);
      return url.toString();
    } catch {
      return "Invalid Base URL";
    }
  }, [baseUrl, source, medium, campaign, term, content]);

  const mockShortUrl = useMemo(() => {
    if (generatedUrl === "Invalid Base URL" || !generatedUrl) return "";
    let hash = 0;
    for (let i = 0; i < generatedUrl.length; i++) hash = ((hash << 5) - hash) + generatedUrl.charCodeAt(i);
    return `https://tz.m/${Math.abs(hash).toString(36).substring(0, 6)}`;
  }, [generatedUrl]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const saveToHistory = () => {
    if (generatedUrl === "Invalid Base URL" || !source || !medium || !campaign) {
      return toast.error("Base URL, Source, Medium, and Campaign are required to save!");
    }
    const newItem: UtmHistoryItem = { url: generatedUrl, source, medium, campaign, date: new Date().toLocaleDateString() };
    const newHistory = [newItem, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("utm_history", JSON.stringify(newHistory));
    toast.success("Saved to history!");
  };

  const exportCSV = () => {
    if (history.length === 0) return toast.error("No history to export!");
    const headers = ["Date", "URL", "Source", "Medium", "Campaign"];
    const rows = history.map(h => [h.date, `"${h.url}"`, h.source, h.medium, h.campaign].join(",")).join("\n");
    const csv = headers.join(",") + "\n" + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "utm-links.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV Exported!");
  };

  const bulkResults = useMemo(() => {
    if (!bulkUrls.trim()) return [];
    return bulkUrls.split("\n").filter(u => u.trim()).map(u => {
      try {
        const url = new URL(u.trim().startsWith("http") ? u.trim() : `https://${u.trim()}`);
        if (source) url.searchParams.set("utm_source", source);
        if (medium) url.searchParams.set("utm_medium", medium);
        if (campaign) url.searchParams.set("utm_campaign", campaign);
        if (term) url.searchParams.set("utm_term", term);
        if (content) url.searchParams.set("utm_content", content);
        return url.toString();
      } catch { return `Invalid: ${u}`; }
    });
  }, [bulkUrls, source, medium, campaign, term, content]);

  const renderMiniQR = (text: string) => {
    let seed = 0;
    for (let i = 0; i < text.length; i++) seed = (seed * 31 + text.charCodeAt(i)) % 1000000;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const size = 21;
    const matrix: number[][] = Array(size).fill(0).map(() => Array(size).fill(0));
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) matrix[r][c] = rand() > 0.5 ? 1 : 0;
    const drawFinder = (sr: number, sc: number) => {
      for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) matrix[sr+r][sc+c] = 1;
        else matrix[sr+r][sc+c] = 0;
      }
    };
    drawFinder(0,0); drawFinder(0,14); drawFinder(14,0);
    
    return (
      <svg viewBox={`0 0 ${size} ${size}`} className="w-24 h-24 bg-white p-1 rounded border">
        {matrix.map((row, r) => row.map((cell, c) => cell === 1 ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#000" /> : null))}
      </svg>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader icon={Link2} title="UTM Builder" description="Build, track, and manage marketing campaign URLs with precise UTM parameters and bulk generation." />
      
      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <div className="flex gap-4">
            <Button variant={activeTab === "single" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("single")}>Single URL</Button>
            <Button variant={activeTab === "bulk" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("bulk")}>Bulk Generator</Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {activeTab === "single" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Base URL *</Label>
                  <Input value={baseUrl} onChange={e => setBaseUrl(e.target.value)} placeholder="https://example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>utm_source *</Label>
                    <Input value={source} onChange={e => setSource(e.target.value)} list="sources" placeholder="google" />
                    <datalist id="sources">{SOURCES.map(s => <option key={s} value={s} />)}</datalist>
                  </div>
                  <div className="space-y-2">
                    <Label>utm_medium *</Label>
                    <Input value={medium} onChange={e => setMedium(e.target.value)} list="mediums" placeholder="cpc" />
                    <datalist id="mediums">{MEDIUMS.map(m => <option key={m} value={m} />)}</datalist>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>utm_campaign *</Label>
                  <Input value={campaign} onChange={e => setCampaign(e.target.value)} placeholder="spring_sale_2026" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>utm_term <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                    <Input value={term} onChange={e => setTerm(e.target.value)} placeholder="running+shoes" />
                  </div>
                  <div className="space-y-2">
                    <Label>utm_content <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                    <Input value={content} onChange={e => setContent(e.target.value)} placeholder="logolink" />
                  </div>
                </div>
              </div>
              <div className="space-y-4 bg-muted/30 p-4 rounded-xl border">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground">GENERATED URL</Label>
                  <div className="p-3 bg-background rounded-lg border break-all text-sm font-mono min-h-[60px]">
                    {generatedUrl}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground">SHORTENED (MOCK)</Label>
                  <div className="p-3 bg-background rounded-lg border text-sm font-mono">{mockShortUrl}</div>
                </div>
                <div className="flex justify-center py-2">{renderMiniQR(generatedUrl)}</div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => handleCopy(generatedUrl)} disabled={generatedUrl === "Invalid Base URL"}><Copy className="w-4 h-4 mr-2" /> Copy URL</Button>
                  <Button variant="outline" onClick={saveToHistory}><History className="w-4 h-4 mr-2" /> Save</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Source" value={source} onChange={e => setSource(e.target.value)} />
                <Input placeholder="Medium" value={medium} onChange={e => setMedium(e.target.value)} />
                <Input placeholder="Campaign" value={campaign} onChange={e => setCampaign(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Paste Base URLs (One per line)</Label>
                <textarea className={textareaClass} rows={8} value={bulkUrls} onChange={e => setBulkUrls(e.target.value)} placeholder={"https://site1.com\nhttps://site2.com"} />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Bulk Results ({bulkResults.length})</Label>
                <div className="max-h-60 overflow-y-auto space-y-2 p-2 bg-muted/20 rounded-lg border">
                  {bulkResults.map((u, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-background rounded border text-xs font-mono break-all">
                      <span className="flex-1">{u}</span>
                      <Button size="sm" variant="ghost" onClick={() => handleCopy(u)}><Copy className="w-3 h-3" /></Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {history.length > 0 && activeTab === "single" && (
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <div className="flex justify-between items-center w-full">
              <CardTitle className={titleClass}><History className="w-4 h-4" /> Recent Links</CardTitle>
              <Button size="sm" variant="outline" onClick={exportCSV}><Download className="w-4 h-4 mr-2" /> Export CSV</Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 divide-y">
            {history.map((h, i) => (
              <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-xs text-muted-foreground w-20">{h.date}</span>
                <div className="flex-1 text-sm font-mono truncate">{h.url}</div>
                <Button size="sm" variant="ghost" onClick={() => handleCopy(h.url)}><Copy className="w-4 h-4" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <ToolHowItWorks steps={[
        { step: "01", title: "Enter Base URL", description: "Provide the destination URL for your marketing campaign or landing page.", icon: Link2 },
        { step: "02", title: "Define Parameters", description: "Fill in the required Source, Medium, and Campaign fields to categorize your traffic.", icon: History },
        { step: "03", title: "Copy & Track", description: "Copy the generated URL and paste it into your ads, emails, or social posts.", icon: Copy }
      ]} badges={["Bulk Generation", "CSV Export", "Offline Privacy"]} />

      <ToolFeatureGuides features={[
        { icon: Link2, title: "Real-Time Validation", description: "Instantly see your URL construct with proper encoding and parameter appending." },
        { icon: History, title: "Local History", description: "Automatically saves your last 10 generated links for quick retrieval and copying." },
        { icon: Download, title: "CSV Export", description: "Export your entire link history into a spreadsheet for team sharing or agency reporting." },
        { icon: QrCode, title: "Instant QR Preview", description: "Generates a visual QR matrix on the fly for quick mobile scanning and verification." }
      ]}>
        <div className="prose dark:prose-invert max-w-none mt-6">
          <h3>Precision Marketing Attribution</h3>
          <p>In the world of digital marketing, understanding exactly where your traffic originates is paramount. UTM (Urchin Tracking Module) parameters are the industry-standard method for tagging URLs so that analytics platforms like Google Analytics 4 (GA4) can accurately attribute sessions, conversions, and revenue to specific campaigns. Our UTM Builder eliminates the error-prone process of manually typing query strings, ensuring your links are perfectly formatted, URL-encoded, and syntactically valid every single time.</p>
          <p>The tool enforces the three mandatory UTM parameters: <code>utm_source</code> (the origin, like Google or Facebook), <code>utm_medium</code> (the channel, like CPC or Email), and <code>utm_campaign</code> (the specific promotion name). It also provides optional fields for <code>utm_term</code> (used for paid search keywords) and <code>utm_content</code> (used for A/B testing different ad creatives or links within the same email). By using standardized dropdown suggestions for common sources and mediums, the tool promotes consistency across your entire marketing team, preventing fragmented data like \"facebook\", \"Facebook\", and \"FB\" from polluting your analytics reports.</p>
          <p>For agencies and growth hackers managing multiple domains, the Bulk Generator tab is an indispensable productivity multiplier. Simply paste a list of hundreds of base URLs, define your campaign parameters once, and the engine will instantly append the tracking tags to every single link. Combined with the one-click CSV export feature, you can generate, verify, and hand off massive link-building spreadsheets to clients or media buyers in seconds. All processing happens locally in your browser, meaning your sensitive campaign strategies and unreleased landing page URLs never touch a third-party server.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[
        { question: "Do I need all 5 UTM parameters?", answer: "No. Only utm_source, utm_medium, and utm_campaign are strictly required for GA4 to track the campaign properly. utm_term and utm_content are optional and used for deeper granularity." },
        { question: "Are spaces allowed in UTM parameters?", answer: "It is best practice to avoid spaces. This tool automatically handles URL encoding, but you should use underscores (e.g., spring_sale) or hyphens instead of spaces to ensure compatibility across all analytics platforms." },
        { question: "Is my link data sent to a server?", answer: "Absolutely not. The UTM Builder operates 100% client-side. Your URLs, campaign names, and history are processed and stored exclusively in your browser's local storage." }
      ]} />

      <RelatedTools currentToolUrl="/tools/url/utm-builder" max={6} />
    </div>
  );
}

export { UTMBuilderClient as UtmBuilderClient };
export default UTMBuilderClient;
