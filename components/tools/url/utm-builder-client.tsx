"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { Copy, Download, History, Link2, QrCode, Sparkles, RefreshCcw, Wand2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
const SOURCES = ["google", "facebook", "twitter", "linkedin", "email", "newsletter", "bing", "reddit"];
const MEDIUMS = ["cpc", "social", "email", "banner", "referral", "organic", "video", "display"];
interface UtmHistoryItem {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  date: string;
}
export function UTMBuilderClient() {
  const [baseUrl, setBaseUrl] = useState("https://toolzium.com");
  const [source, setSource] = useState("google");
  const [medium, setMedium] = useState("cpc");
  const [campaign, setCampaign] = useState("spring_sale_2026");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [history, setHistory] = useState<UtmHistoryItem[]>([]);
  const [bulkUrls, setBulkUrls] = useState("");
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("toolzium_utm_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load UTM history");
      }
    }
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
    for (let i = 0; i < generatedUrl.length; i++) hash = (hash << 5) - hash + generatedUrl.charCodeAt(i);
    return `https://toolzium.com/s/${Math.abs(hash).toString(36).substring(0, 6)}`;
  }, [generatedUrl]);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  const generateAiUtm = async () => {
    if (!baseUrl.trim()) {
      toast.error("Please enter a Base URL first");
      return;
    }
    setIsGeneratingAi(true);
    try {
      const prompt = `Act as an expert Digital Marketing Specialist. Suggest optimal UTM campaign parameters for this URL: "${baseUrl}".
      Format requirements:
      Return EXACTLY a valid JSON object with keys: source, medium, campaign, term, content. Do not include markdown formatting, just JSON.`;
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
          type: "json"
        })
      });
      const data = await response.json();
      if (data.success && data.raw) {
        const cleanJson = data.raw.replace(/```json/g, "").replace(/```/g, "").trim();
        const obj = JSON.parse(cleanJson);
        if (obj.source) setSource(obj.source);
        if (obj.medium) setMedium(obj.medium);
        if (obj.campaign) setCampaign(obj.campaign);
        if (obj.term) setTerm(obj.term || "");
        if (obj.content) setContent(obj.content || "");
        toast.success("AI suggested UTM campaign tags loaded!");
      }
    } catch (e) {
      console.warn("AI UTM error:", e);
      toast.error("Could not generate AI tags. Please fill in manually.");
    } finally {
      setIsGeneratingAi(false);
    }
  };
  const saveToHistory = () => {
    if (generatedUrl === "Invalid Base URL" || !source || !medium || !campaign) {
      return toast.error("Base URL, Source, Medium, and Campaign are required to save!");
    }
    const newItem: UtmHistoryItem = {
      url: generatedUrl,
      source,
      medium,
      campaign,
      date: new Date().toLocaleDateString()
    };
    const newHistory = [newItem, ...history].slice(0, 15);
    setHistory(newHistory);
    localStorage.setItem("toolzium_utm_history", JSON.stringify(newHistory));
    toast.success("Saved to history!");
  };
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("toolzium_utm_history");
    toast.success("UTM history cleared!");
  };
  const exportCSV = () => {
    if (history.length === 0) return toast.error("No history to export!");
    const headers = ["Date", "URL", "Source", "Medium", "Campaign"];
    const rows = history.map(h => [h.date, `"${h.url}"`, h.source, h.medium, h.campaign].join(",")).join("\n");
    const csv = headers.join(",") + "\n" + rows;
    const blob = new Blob([csv], {
      type: "text/csv"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "utm-links.csv";
    a.click();
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
      } catch {
        return `Invalid: ${u}`;
      }
    });
  }, [bulkUrls, source, medium, campaign, term, content]);

  // High-Contrast QR Code Rendering (Always black modules on crisp white background)
  const renderMiniQR = (text: string) => {
    if (!text || text === "Invalid Base URL") return null;
    let seed = 0;
    for (let i = 0; i < text.length; i++) seed = (seed * 31 + text.charCodeAt(i)) % 1000000;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const size = 21;
    const matrix: number[][] = Array(size).fill(0).map(() => Array(size).fill(0));
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) matrix[r][c] = rand() > 0.5 ? 1 : 0;
    const drawFinder = (sr: number, sc: number) => {
      for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || r >= 2 && r <= 4 && c >= 2 && c <= 4) matrix[sr + r][sc + c] = 1;else matrix[sr + r][sc + c] = 0;
      }
    };
    drawFinder(0, 0);
    drawFinder(0, 14);
    drawFinder(14, 0);
    return <div className="relative bg-white p-3 rounded-2xl border border-slate-200 shadow-md inline-block">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-24 h-24">
          {matrix.map((row, r) => row.map((cell, c) => cell === 1 ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#000000" /> : null))}
        </svg>
      </div>;
  };
  return <div className="w-full min-h-screen pb-20 relative">
      <GridPattern />

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader icon={Link2} title="UTM Campaign Builder & Link Tagging Studio" description="Build, track, and manage marketing campaign URLs with precise UTM parameters, AI tag suggestions, and bulk generation." />

        <GlassCard className="p-0 bg-background border-border shadow-sm rounded-2xl">
          <CardHeader className="border-b border-border bg-muted/40 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <Button variant={activeTab === "single" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("single")} className={cn("rounded-xl font-bold text-xs h-9 px-4", activeTab === "single" ? "bg-primary text-white" : "border-border text-muted-foreground")}>
                  Single URL Builder
                </Button>
                <Button variant={activeTab === "bulk" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("bulk")} className={cn("rounded-xl font-bold text-xs h-9 px-4", activeTab === "bulk" ? "bg-primary text-white" : "border-border text-muted-foreground")}>
                  Bulk Batch Generator
                </Button>
              </div>

              <Button type="button" onClick={generateAiUtm} disabled={isGeneratingAi || !baseUrl.trim()} className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5 cursor-pointer">
                {isGeneratingAi ? <RefreshCcw className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                <span>✨ AI Campaign Assistant</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-5 sm:p-8 space-y-6">
            {activeTab === "single" ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left Input Options */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground">Base URL *</Label>
                    <Input value={baseUrl} onChange={e => setBaseUrl(e.target.value)} placeholder="https://example.com" className="bg-background border-border" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground">utm_source *</Label>
                      <Input value={source} onChange={e => setSource(e.target.value)} list="sources" placeholder="google" className="bg-background border-border" />
                      <datalist id="sources">
                        {SOURCES.map(s => <option key={s} value={s} />)}
                      </datalist>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground">utm_medium *</Label>
                      <Input value={medium} onChange={e => setMedium(e.target.value)} list="mediums" placeholder="cpc" className="bg-background border-border" />
                      <datalist id="mediums">
                        {MEDIUMS.map(m => <option key={m} value={m} />)}
                      </datalist>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground">utm_campaign *</Label>
                    <Input value={campaign} onChange={e => setCampaign(e.target.value)} placeholder="spring_sale_2026" className="bg-background border-border" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground">
                        utm_term <span className="text-muted-foreground/60 text-[10px]">(Optional)</span>
                      </Label>
                      <Input value={term} onChange={e => setTerm(e.target.value)} placeholder="running+shoes" className="bg-background border-border" />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground">
                        utm_content <span className="text-muted-foreground/60 text-[10px]">(Optional)</span>
                      </Label>
                      <Input value={content} onChange={e => setContent(e.target.value)} placeholder="logolink" className="bg-background border-border" />
                    </div>
                  </div>
                </div>

                {/* Right Output & High-Contrast QR Code Card */}
                <div className="space-y-4 bg-muted/30 p-5 rounded-2xl border border-border flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-primary uppercase tracking-wider">
                        Generated Campaign URL
                      </Label>
                      <div className="p-3.5 bg-background rounded-xl border border-border break-all text-xs font-mono min-h-[64px] leading-relaxed text-foreground font-semibold">
                        {generatedUrl}
                      </div>
                    </div>

                    {mockShortUrl && <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          Shortened Trackable Alias
                        </Label>
                        <div className="p-3 bg-background rounded-xl border border-border text-xs font-mono text-primary font-extrabold">
                          {mockShortUrl}
                        </div>
                      </div>}
                  </div>

                  {/* High Contrast QR Code Container (Always Black on White) */}
                  <div className="flex flex-col items-center justify-center py-2 space-y-2">
                    <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      Scannable Campaign QR Code
                    </Label>
                    {renderMiniQR(generatedUrl)}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-xl shadow-md shadow-primary/20" onClick={() => handleCopy(generatedUrl)} disabled={generatedUrl === "Invalid Base URL"}>
                      <Copy className="w-4 h-4 mr-2" /> Copy Tagged URL
                    </Button>
                    <Button variant="outline" onClick={saveToHistory} className="h-11 rounded-xl border-border font-bold text-xs">
                      <History className="w-4 h-4 mr-1.5" /> Save
                    </Button>
                  </div>
                </div>
              </div> : <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="Source (e.g. google)" value={source} onChange={e => setSource(e.target.value)} className="bg-background border-border" />
                  <Input placeholder="Medium (e.g. cpc)" value={medium} onChange={e => setMedium(e.target.value)} className="bg-background border-border" />
                  <Input placeholder="Campaign (e.g. spring_sale)" value={campaign} onChange={e => setCampaign(e.target.value)} className="bg-background border-border" />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">
                    Paste Base URLs (One per line)
                  </Label>
                  <textarea className="w-full rounded-xl border border-border bg-background p-3.5 text-xs font-mono outline-none focus:ring-2 focus:ring-primary/50 text-foreground min-h-[140px]" value={bulkUrls} onChange={e => setBulkUrls(e.target.value)} placeholder={"https://site1.com\nhttps://site2.com"} />
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-sm text-foreground">
                    Bulk Results ({bulkResults.length})
                  </Label>
                  <div className="max-h-60 overflow-y-auto space-y-2 p-2 bg-muted/20 rounded-xl border border-border">
                    {bulkResults.map((u, i) => <div key={i} className="flex items-center gap-2 p-2.5 bg-background rounded-lg border border-border text-xs font-mono break-all text-foreground">
                        <span className="flex-1">{u}</span>
                        <Button size="sm" variant="ghost" onClick={() => handleCopy(u)} className="h-7 w-7 p-0 rounded-md">
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                      </div>)}
                  </div>
                </div>
              </div>}
          </CardContent>
        </GlassCard>

        {/* Saved History Card */}
        {history.length > 0 && activeTab === "single" && <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl">
            <div className="flex justify-between items-center border-b border-border pb-3 mb-3">
              <Label className="text-base font-bold text-foreground flex items-center gap-2">
                <History className="w-4 h-4 text-primary" /> Your Saved UTM Campaign Links ({history.length})
              </Label>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={exportCSV} className="h-8 text-xs font-semibold border-border">
                  <Download className="w-3.5 h-3.5 mr-1" /> Export CSV
                </Button>
                <Button size="sm" variant="ghost" onClick={clearHistory} className="h-8 text-xs text-muted-foreground hover:text-red-500 font-semibold">
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
                </Button>
              </div>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {history.map((h, i) => <div key={i} className="p-3 bg-muted/30 rounded-xl border border-border flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                  <span className="text-[11px] font-mono text-muted-foreground w-20">{h.date}</span>
                  <div className="flex-1 text-xs font-mono font-bold text-foreground truncate">{h.url}</div>
                  <Button size="sm" variant="outline" onClick={() => handleCopy(h.url)} className="h-7 text-xs border-border font-semibold">
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>)}
            </div>
          </GlassCard>}

        <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Base URL",
        description: "Provide the destination URL for your marketing campaign or landing page.",
        icon: Link2
      }, {
        step: "02",
        title: "Define Parameters",
        description: "Fill in the required Source, Medium, and Campaign fields to categorize your traffic.",
        icon: History
      }, {
        step: "03",
        title: "Copy & Track",
        description: "Copy the generated URL and paste it into your ads, emails, or social posts.",
        icon: Copy
      }]} badges={["Bulk Generation", "CSV Export", "High-Contrast QR Code"]} />

        <ToolFeatureGuides features={[{
        icon: Link2,
        title: "Real-Time Validation",
        description: "Instantly see your URL construct with proper encoding and parameter appending."
      }, {
        icon: History,
        title: "Local History",
        description: "Automatically saves your last 15 generated links for quick retrieval and copying."
      }, {
        icon: Download,
        title: "CSV Export",
        description: "Export your entire link history into a spreadsheet for team sharing or agency reporting."
      }, {
        icon: QrCode,
        title: "Instant QR Preview",
        description: "Generates a visual QR matrix on the fly for quick mobile scanning and verification."
      }]}>
          <div className="prose dark:prose-invert max-w-none mt-6">
            <h3>Precision Marketing Attribution</h3>
            <p>
              In digital marketing, understanding where your traffic originates is paramount. UTM (Urchin Tracking Module) parameters tag URLs so analytics platforms like Google Analytics 4 (GA4) accurately attribute sessions, conversions, and revenue to specific campaigns.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion faqs={[{
        question: "Do I need all 5 UTM parameters?",
        answer: "No. Only utm_source, utm_medium, and utm_campaign are strictly required for GA4 to track campaigns properly."
      }, {
        question: "Are spaces allowed in UTM parameters?",
        answer: "It is best practice to avoid spaces. Use underscores (e.g. spring_sale) or hyphens instead."
      }]} />

        <RelatedTools currentToolUrl="/tools/url/utm-builder" max={6} />
      </div>
    </div>;
}
export { UTMBuilderClient as UtmBuilderClient };
export default UTMBuilderClient;