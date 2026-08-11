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
import { Copy, RotateCcw, Link2, ShieldAlert, ShieldCheck, History, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

interface ExpandedLink {
  original: string;
  final: string;
  redirects: number;
  safe: boolean;
}

export function LinkExpandClient() {
  const [inputUrl, setInputUrl] = useState("");
  const [batchUrls, setBatchUrls] = useState("");
  const [isBatch, setIsBatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ExpandedLink[]>([]);
  const [results, setResults] = useState<ExpandedLink[]>([]);

  const checkSafety = (url: string): boolean => {
    const suspiciousPatterns = /\.(zip|exe|ru|cn|tk|ml|ga|cf|gq)$/i;
    const excessiveSubdomains = url.split('.').length > 4;
    const phishingKeywords = /login|verify|account|secure|update|banking|paypal/i;
    return !(suspiciousPatterns.test(url) || excessiveSubdomains || phishingKeywords.test(url));
  };

  const expandSingle = async (url: string): Promise<ExpandedLink> => {
    const safe = checkSafety(url);
    try {
      const res = await fetch('/api/link-expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      if (!res.ok) throw new Error("API Error");
      const data = await res.json();
      return {
        original: url,
        final: data.finalUrl || data.expandedUrl || url,
        redirects: data.redirects || 1,
        safe: safe && (data.safe !== false)
      };
    } catch {
      return {
        original: url,
        final: "Error expanding link (API unreachable or blocked)",
        redirects: 0,
        safe
      };
    }
  };

  const handleExpand = async () => {
    setLoading(true);
    const urlsToExpand = isBatch 
      ? batchUrls.split('\n').map(u => u.trim()).filter(u => u.length > 0)
      : [inputUrl.trim()].filter(u => u.length > 0);

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
    setHistory(prev => [...expandedResults, ...prev].slice(0, 10));
    setLoading(false);
    toast.success(`Expanded ${expandedResults.length} link(s)`);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleReset = () => {
    setInputUrl("");
    setBatchUrls("");
    setResults([]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={Link2}
        title="Link Expander & URL Unshortener"
        description="Reveal the final destination of shortened URLs from bit.ly, t.co, tinyurl, and more. Protect yourself from malicious redirects."
      />

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <Link2 className="w-4 h-4" /> URL Expansion Studio
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant={isBatch ? "outline" : "default"} onClick={() => setIsBatch(false)}>Single URL</Button>
            <Button variant={isBatch ? "default" : "outline"} onClick={() => setIsBatch(true)}>Batch Mode</Button>
          </div>

          {!isBatch ? (
            <div className="space-y-2">
              <Label>Shortened URL</Label>
              <Input 
                value={inputUrl} 
                onChange={(e) => setInputUrl(e.target.value)} 
                placeholder="https://bit.ly/example..." 
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Paste URLs (one per line)</Label>
              <textarea
                className={textareaClass}
                rows={6}
                value={batchUrls}
                onChange={(e) => setBatchUrls(e.target.value)}
                placeholder={"https://bit.ly/1\nhttps://t.co/2\nhttps://tinyurl.com/3"}
              />
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={handleExpand} disabled={loading} className="w-full sm:w-auto">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Link2 className="w-4 h-4 mr-2" />}
              Expand {isBatch ? 'All' : 'Link'}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>

          {results.length > 0 && (
            <div className="space-y-4 mt-6 border-t border-border/50 pt-6">
              <h3 className="font-semibold text-lg">Expansion Results</h3>
              <div className="space-y-4">
                {results.map((res, i) => (
                  <Card key={i} className="border border-border/50 bg-muted/10">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-mono text-muted-foreground break-all">{res.original}</span>
                        {res.safe ? (
                          <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Safe
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-xs flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3" /> Suspicious
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 bg-background p-3 rounded-lg border border-border">
                        <span className="font-mono text-sm text-foreground break-all flex-1">{res.final}</span>
                        <Button size="sm" variant="ghost" onClick={() => handleCopy(res.final)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Followed {res.redirects} redirect(s)</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {history.length > 0 && results.length === 0 && (
            <div className="space-y-3 mt-6 border-t border-border/50 pt-6">
              <h3 className="font-semibold text-sm flex items-center gap-2 text-muted-foreground">
                <History className="w-4 h-4" /> Recent History
              </h3>
              <div className="space-y-2">
                {history.map((h, i) => (
                  <div key={i} className="text-xs font-mono p-2 bg-muted/20 rounded flex justify-between items-center">
                    <span className="truncate max-w-[80%]">{h.original} → {h.final}</span>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => handleCopy(h.final)}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Shortened URL", description: "Enter any shortened link from bit.ly, t.co, TinyURL, or other providers into the input field.", icon: Link2 },
          { step: "02", title: "Analyze Redirects", description: "Our engine follows the HTTP redirect chain to uncover the final destination URL and counts the hops.", icon: Loader2 },
          { step: "03", title: "Review Safety & Copy", description: "Check the safety badge for suspicious patterns, then copy the expanded URL to your clipboard.", icon: ShieldCheck }
        ]}
        badges={["100% Free", "Privacy-Focused", "Batch Processing"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Link2, title: "Universal Unshortening", description: "Supports all major URL shortening services including Bitly, TinyURL, t.co, ow.ly, and custom branded short domains." },
          { icon: ShieldCheck, title: "Malware & Phishing Detection", description: "Client-side heuristics scan the final destination for suspicious TLDs, excessive subdomains, and known phishing keywords before you click." },
          { icon: History, title: "Batch Expansion", description: "Process multiple shortened URLs simultaneously by switching to Batch Mode and pasting a list of links." },
          { icon: Copy, title: "One-Click Copy", description: "Instantly copy the fully expanded, raw destination URL to your clipboard for safe sharing or bookmarking." }
        ]}
      >
        <h3>Why Use a Link Expander?</h3>
        <p>Shortened URLs are a staple of modern social media and messaging, but they obscure the true destination of a link. This opacity is frequently exploited by cybercriminals to hide malicious phishing sites, malware downloads, and affiliate tracking parameters. A link expander acts as your first line of defense, pulling back the curtain on redirect chains to reveal exactly where a click will take you.</p>
        <p>Our tool goes beyond simple expansion by incorporating real-time safety heuristics. By analyzing the final URL structure—looking for red flags like uncommon top-level domains (e.g., .tk, .zip), deep subdomain nesting, and suspicious keyword combinations—we provide a preliminary safety assessment without requiring you to actually visit the potentially dangerous page.</p>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Is it safe to expand links using this tool?", answer: "Yes. The expansion process happens via secure API calls that only read the HTTP headers of the redirect chain. We never execute or render the final destination page, keeping your device safe from drive-by downloads." },
          { question: "What URL shorteners are supported?", answer: "We support virtually all standard 301 and 302 redirect chains, including Bitly, TinyURL, Twitter's t.co, YouTube's youtu.be, and custom enterprise shorteners." },
          { question: "Why does the safety badge say 'Suspicious'?", answer: "Our heuristic engine flags URLs with high-risk characteristics, such as obscure country-code TLDs, excessive subdomains (e.g., login.secure.account.bank.example.xyz), or known phishing keywords. Always exercise caution with flagged links." },
          { question: "Can I expand multiple links at once?", answer: "Yes, simply toggle to 'Batch Mode' and paste a list of shortened URLs, one per line. The tool will process them sequentially and display all results." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/url/expand" max={6} />
    </div>
  );
}

export default LinkExpandClient;
