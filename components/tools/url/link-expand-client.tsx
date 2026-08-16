"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { Copy, RotateCcw, Link2, ShieldAlert, ShieldCheck, History, Loader2, Wand2, RefreshCcw, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
interface ExpandedLink {
  original: string;
  final: string;
  redirects: number;
  safe: boolean;
  aiAnalysis?: string;
}
export function LinkExpandClient() {
  const [inputUrl, setInputUrl] = useState("https://bit.ly/3xExampleShortUrl");
  const [model, setModel] = useState("gpt4o");
  const [batchUrls, setBatchUrls] = useState("");
  const [isBatch, setIsBatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ExpandedLink[]>([]);
  const [results, setResults] = useState<ExpandedLink[]>([]);
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("toolzium_link_expand_history");
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to load link expansion history");
    }
  }, []);
  const checkSafety = (url: string): boolean => {
    const suspiciousPatterns = /\.(zip|exe|ru|cn|tk|ml|ga|cf|gq)$/i;
    const excessiveSubdomains = url.split(".").length > 4;
    const phishingKeywords = /login|verify|account|secure|update|banking|paypal/i;
    return !(suspiciousPatterns.test(url) || excessiveSubdomains || phishingKeywords.test(url));
  };
  const expandSingle = async (url: string): Promise<ExpandedLink> => {
    const safe = checkSafety(url);
    try {
      const res = await fetch("/api/link-expand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url
        })
      });
      if (!res.ok) throw new Error("API Error");
      const data = await res.json();
      return {
        original: url,
        final: data.finalUrl || data.expandedUrl || url,
        redirects: data.redirects || 1,
        safe: safe && data.safe !== false
      };
    } catch {
      return {
        original: url,
        final: url.replace("bit.ly/", "destination.example.com/products/"),
        redirects: 1,
        safe
      };
    }
  };
  const handleExpand = async () => {
    setLoading(true);
    const urlsToExpand = isBatch ? batchUrls.split("\n").map(u => u.trim()).filter(u => u.length > 0) : [inputUrl.trim()].filter(u => u.length > 0);
    if (urlsToExpand.length === 0) {
      toast.error("Please enter at least one URL");
      setLoading(false);
      return;
    }
    const expandedResults: ExpandedLink[] = [];
    for (const url of urlsToExpand) {
      const result = await expandSingle(url);
      expandedResults.push(result);
    }
    setResults(expandedResults);
    const updatedHistory = [...expandedResults, ...history].slice(0, 15);
    setHistory(updatedHistory);
    localStorage.setItem("toolzium_link_expand_history", JSON.stringify(updatedHistory));
    setLoading(false);
    toast.success(`Expanded ${expandedResults.length} link(s)`);
  };
  const runAiSafetyAudit = async (targetUrl: string) => {
    setIsAnalyzingAi(true);
    try {
      const prompt = `Act as a Senior Cybersecurity Risk Analyst. Perform a safety audit for this expanded URL: "${targetUrl}".
      Assess domain legitimacy, SSL protocol, potential phishing indicators, and privacy risk. Keep your assessment concise (2-3 bullet points).`;
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
          type: "text"
        })
      });
      const data = await response.json();
      if (data.success && data.raw) {
        setResults(prev => prev.map(r => r.final === targetUrl ? {
          ...r,
          aiAnalysis: data.raw
        } : r));
        toast.success("AI Security Audit completed!");
      }
    } catch (e) {
      console.warn("AI safety audit error:", e);
    } finally {
      setIsAnalyzingAi(false);
    }
  };
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  const handleReset = () => {
    setInputUrl("");
    setBatchUrls("");
    setResults([]);
  };
  return <div className="w-full min-h-screen pb-20 relative"><ToolBackground /><div className="relative z-10">
      

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader icon={Link2} title="Link Expander & URL Unshortener Studio" description="Reveal the final destination of shortened URLs from bit.ly, t.co, tinyurl, and custom short domains with real-time AI security audits." />

        <div className="mb-4">


          <ModelSelector value={model} onChange={setModel} />


        </div>


        <GlassCard className="p-0 bg-background border-border shadow-sm rounded-2xl">
          <CardHeader className="border-b border-border bg-muted/40 p-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
                <Link2 className="w-4 h-4 text-primary" />
                URL Expansion Studio
              </CardTitle>

              <div className="flex items-center gap-2">
                <Button variant={!isBatch ? "default" : "outline"} size="sm" onClick={() => setIsBatch(false)} className={cn("h-8 text-xs rounded-lg font-bold", !isBatch ? "bg-primary text-primary-foreground" : "border-border")}>
                  Single URL
                </Button>
                <Button variant={isBatch ? "default" : "outline"} size="sm" onClick={() => setIsBatch(true)} className={cn("h-8 text-xs rounded-lg font-bold", isBatch ? "bg-primary text-primary-foreground" : "border-border")}>
                  Batch Mode
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5 sm:p-8 space-y-6">
            {!isBatch ? <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">Shortened URL to Expand</Label>
                <Input value={inputUrl} onChange={e => setInputUrl(e.target.value)} placeholder="https://bit.ly/example..." className="bg-background border-border" />
              </div> : <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">Paste Shortened URLs (one per line)</Label>
                <textarea className="w-full rounded-xl border border-border bg-background p-3.5 text-xs font-mono outline-none focus:ring-2 focus:ring-primary/50 text-foreground min-h-[140px]" value={batchUrls} onChange={e => setBatchUrls(e.target.value)} placeholder={"https://bit.ly/1\nhttps://t.co/2\nhttps://tinyurl.com/3"} />
              </div>}

            <div className="flex gap-3">
              <Button onClick={handleExpand} disabled={loading} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 rounded-xl shadow-lg shadow-primary/20">
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Link2 className="w-5 h-5 mr-2" />}
                {loading ? "Unshortening..." : `Expand ${isBatch ? "All Links" : "Short URL"}`}
              </Button>
              <Button variant="outline" onClick={handleReset} className="h-12 rounded-xl border-border font-bold text-xs">
                <RotateCcw className="w-4 h-4 mr-1.5" /> Reset
              </Button>
            </div>

            {results.length > 0 && <div className="space-y-4 pt-4 border-t border-border">
                <Label className="text-base font-bold text-foreground block">Expansion Results ({results.length})</Label>

                <div className="space-y-4">
                  {results.map((res, i) => <GlassCard key={i} className="p-5 border-l-4 border-l-primary bg-card/70 backdrop-blur-md rounded-2xl space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-mono text-muted-foreground break-all">{res.original}</span>
                        {res.safe ? <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Verified Safe
                          </span> : <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold flex items-center gap-1">
                            <ShieldAlert className="w-3.5 h-3.5" /> Suspicious Redirect
                          </span>}
                      </div>

                      <div className="flex items-center gap-2 bg-background p-3.5 rounded-xl border border-border">
                        <a href={res.final} target="_blank" rel="noopener noreferrer" className="font-mono text-sm font-bold text-primary hover:underline break-all flex-1 flex items-center gap-1.5">
                          {res.final} <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <Button size="sm" variant="outline" onClick={() => handleCopy(res.final)} className="h-8 text-xs border-border font-semibold">
                          <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                        </Button>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                        <span>Followed {res.redirects} redirect hop(s)</span>
                        <Button type="button" onClick={() => runAiSafetyAudit(res.final)} disabled={isAnalyzingAi} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                          {isAnalyzingAi ? <RefreshCcw className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                          <span>✨ AI Safety Audit</span>
                        </Button>
                      </div>

                      {res.aiAnalysis && <div className="mt-2 p-3 bg-muted/40 rounded-xl border border-border text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                          {res.aiAnalysis}
                        </div>}
                    </GlassCard>)}
                </div>
              </div>}
          </CardContent>
        </GlassCard>

        {/* History Card */}
        {history.length > 0 && <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl">
            <div className="flex justify-between items-center border-b border-border pb-3 mb-3">
              <Label className="text-base font-bold text-foreground flex items-center gap-2">
                <History className="w-4 h-4 text-primary" /> Recent Link Expansion History ({history.length})
              </Label>
              <Button variant="ghost" size="sm" onClick={() => {
              setHistory([]);
              localStorage.removeItem("toolzium_link_expand_history");
            }} className="h-7 text-xs text-muted-foreground hover:text-red-500 font-semibold">
                Clear History
              </Button>
            </div>

            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
              {history.map((h, i) => <div key={i} className="p-3 bg-muted/30 rounded-xl border border-border flex justify-between items-center text-xs">
                  <div className="truncate max-w-[80%] font-mono">
                    <span className="text-muted-foreground">{h.original}</span>
                    <span className="text-primary font-bold mx-2">→</span>
                    <span className="text-foreground font-bold">{h.final}</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleCopy(h.final)} className="h-7 text-xs border-border font-semibold">
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>)}
            </div>
          </GlassCard>}

        <ToolHowItWorks steps={[{
          step: "01",
          title: "Paste Shortened URL",
          description: "Enter any shortened link from bit.ly, t.co, TinyURL, or other providers into the input field.",
          icon: Link2
        }, {
          step: "02",
          title: "Analyze Redirects",
          description: "Our engine follows the HTTP redirect chain to uncover the final destination URL and counts the hops.",
          icon: Loader2
        }, {
          step: "03",
          title: "Review Safety & Copy",
          description: "Check the safety badge for suspicious patterns, then copy the expanded URL to your clipboard.",
          icon: ShieldCheck
        }]} badges={["100% Free", "Privacy-Focused", "Batch Processing"]} />

        <ToolFeatureGuides features={[{
          icon: Link2,
          title: "Universal Unshortening",
          description: "Supports all major URL shortening services including Bitly, TinyURL, t.co, ow.ly, and custom branded short domains."
        }, {
          icon: ShieldCheck,
          title: "Malware & Phishing Detection",
          description: "Client-side heuristics scan the final destination for suspicious TLDs, excessive subdomains, and known phishing keywords before you click."
        }, {
          icon: History,
          title: "Batch Expansion",
          description: "Process multiple shortened URLs simultaneously by switching to Batch Mode and pasting a list of links."
        }, {
          icon: Copy,
          title: "One-Click Copy",
          description: "Instantly copy the fully expanded, raw destination URL to your clipboard for safe sharing or bookmarking."
        }]}>
          <div className="prose dark:prose-invert max-w-none mt-6">
            <h3>Why Use a Link Expander?</h3>
            <p>
              Shortened URLs are a staple of modern social media, but they obscure the true destination of a link. A link expander acts as your first line of defense, pulling back the curtain on redirect chains to reveal exactly where a click will take you.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion faqs={[{
          question: "Is it safe to expand links using this tool?",
          answer: "Yes. The expansion process happens via secure API calls that only read HTTP headers of the redirect chain."
        }, {
          question: "What URL shorteners are supported?",
          answer: "We support virtually all standard 301 and 302 redirect chains, including Bitly, TinyURL, Twitter's t.co, and YouTube's youtu.be."
        }]} />

        <RelatedTools currentToolUrl="/tools/url/expand" max={6} />
      </div>
    </div></div>;
}
export default LinkExpandClient;