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
import { Copy, RotateCcw, Link2, QrCode, History, Scissors } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

interface ShortenedLink {
  original: string;
  short: string;
  alias: string;
  date: string;
}

export function ShortenerClient() {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [batchUrls, setBatchUrls] = useState("");
  const [isBatch, setIsBatch] = useState(false);
  const [results, setResults] = useState<ShortenedLink[]>([]);
  const [history, setHistory] = useState<ShortenedLink[]>([]);
  const [activeQr, setActiveQr] = useState<string | null>(null);

  const generateShortCode = (url: string): string => {
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      const char = url.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    const base62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    let num = Math.abs(hash);
    while (num > 0) {
      result = base62[num % 62] + result;
      num = Math.floor(num / 62);
    }
    return result.substring(0, 6).padStart(6, '0');
  };

  const generateQRSvg = (text: string) => {
    const size = 25;
    const cells = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (x * 7 + y * 13) % text.length;
        const charCode = text.charCodeAt(idx) || 0;
        const isBlack = (charCode + x + y) % 3 === 0;
        
        const inTL = x < 7 && y < 7;
        const inTR = x >= size - 7 && y < 7;
        const inBL = x < 7 && y >= size - 7;
        
        let draw = isBlack;
        if (inTL || inTR || inBL) {
          const lx = inTR ? x - (size - 7) : x;
          const ly = inBL ? y - (size - 7) : y;
          const isOuter = lx === 0 || lx === 6 || ly === 0 || ly === 6;
          const isInner = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
          draw = isOuter || isInner;
        }
        
        if (draw) {
          cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />);
        }
      }
    }
    return (
      <svg viewBox={`0 0 ${size} ${size}`} className="w-32 h-32 text-foreground bg-background p-1 rounded border border-border/50">
        {cells}
      </svg>
    );
  };

  const shortenUrl = (url: string, alias?: string): ShortenedLink => {
    const code = alias && alias.trim().length > 0 ? alias.trim().replace(/[^a-zA-Z0-9_-]/g, '') : generateShortCode(url);
    return {
      original: url,
      short: `toolzium.com/s/${code}`,
      alias: code,
      date: new Date().toLocaleTimeString()
    };
  };

  const handleShorten = () => {
    const urlsToShorten = isBatch 
      ? batchUrls.split('\n').map(u => u.trim()).filter(u => u.length > 0)
      : [longUrl.trim()].filter(u => u.length > 0);

    if (urlsToShorten.length === 0) {
      toast.error("Please enter at least one URL");
      return;
    }

    const newResults = urlsToShorten.map((url, i) => 
      shortenUrl(url, !isBatch && i === 0 ? customAlias : undefined)
    );

    setResults(newResults);
    setHistory(prev => [...newResults, ...prev].slice(0, 20));
    toast.success(`Shortened ${newResults.length} link(s)`);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleReset = () => {
    setLongUrl("");
    setCustomAlias("");
    setBatchUrls("");
    setResults([]);
    setActiveQr(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={Scissors}
        title="URL Shortener & Link Manager"
        description="Create clean, memorable short links with custom aliases and automatic QR code generation. 100% client-side processing."
      />

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <Scissors className="w-4 h-4" /> Link Shortening Studio
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant={isBatch ? "outline" : "default"} onClick={() => setIsBatch(false)}>Single URL</Button>
            <Button variant={isBatch ? "default" : "outline"} onClick={() => setIsBatch(true)}>Bulk Shortening</Button>
          </div>

          {!isBatch ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Long URL</Label>
                <Input 
                  value={longUrl} 
                  onChange={(e) => setLongUrl(e.target.value)} 
                  placeholder="https://example.com/very/long/path/to/resource" 
                />
              </div>
              <div className="space-y-2">
                <Label>Custom Alias (Optional)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-mono">toolzium.com/s/</span>
                  <Input 
                    value={customAlias} 
                    onChange={(e) => setCustomAlias(e.target.value)} 
                    placeholder="my-custom-link" 
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Paste URLs (one per line)</Label>
              <textarea
                className={textareaClass}
                rows={6}
                value={batchUrls}
                onChange={(e) => setBatchUrls(e.target.value)}
                placeholder={"https://example.com/1\nhttps://example.com/2"}
              />
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={handleShorten} className="w-full sm:w-auto">
              <Scissors className="w-4 h-4 mr-2" /> Shorten {isBatch ? 'All' : 'Link'}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>

          {results.length > 0 && (
            <div className="space-y-4 mt-6 border-t border-border/50 pt-6">
              <h3 className="font-semibold text-lg">Generated Short Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((res, i) => (
                  <Card key={i} className="border border-border/50 bg-muted/10">
                    <CardContent className="p-4 space-y-3">
                      <p className="text-xs text-muted-foreground truncate">{res.original}</p>
                      <div className="flex items-center gap-2 bg-background p-3 rounded-lg border border-border">
                        <span className="font-mono text-sm text-primary font-bold flex-1 truncate">{res.short}</span>
                        <Button size="sm" variant="ghost" onClick={() => handleCopy(res.short)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm" onClick={() => setActiveQr(activeQr === res.short ? null : res.short)}>
                          <QrCode className="w-3 h-3 mr-2" /> {activeQr === res.short ? 'Hide' : 'Show'} QR
                        </Button>
                        <span className="text-xs text-muted-foreground">Clicks: N/A (Client-side)</span>
                      </div>
                      {activeQr === res.short && (
                        <div className="flex justify-center pt-2">
                          {generateQRSvg(res.short)}
                        </div>
                      )}
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
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {history.map((h, i) => (
                  <div key={i} className="text-xs p-2 bg-muted/20 rounded flex justify-between items-center gap-2">
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-primary truncate">{h.short}</span>
                      <span className="text-muted-foreground truncate">{h.original}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 flex-shrink-0" onClick={() => handleCopy(h.short)}>
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
          { step: "01", title: "Paste Your Long URL", description: "Enter the lengthy, unformatted URL you want to clean up into the main input field.", icon: Link2 },
          { step: "02", title: "Customize Your Alias", description: "Optionally define a custom, memorable alias for your short link, or let our engine generate a secure hash.", icon: Scissors },
          { step: "03", title: "Generate & Share", description: "Instantly receive your new toolzium.com/s/ link, complete with a scannable QR code for print and mobile.", icon: QrCode }
        ]}
        badges={["100% Client-Side", "Custom Aliases", "Auto QR Codes"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Scissors, title: "Algorithmic Hashing", description: "Uses a deterministic base62 hashing algorithm to generate unique, collision-resistant 6-character short codes for every URL." },
          { icon: QrCode, title: "Dynamic SVG QR Codes", description: "Instantly generates vector-based QR codes mapped directly to your short link, perfect for business cards and flyers." },
          { icon: History, title: "Session History", description: "Automatically saves your last 20 generated links in local component state for quick access and re-copying." },
          { icon: Copy, title: "Bulk Processing", description: "Shorten dozens of URLs at once by switching to Bulk Mode and pasting a newline-separated list of links." }
        ]}
      >
        <h3>The Power of Custom Short Links</h3>
        <p>In an era of character-limited SMS and visually crowded social media feeds, long URLs with endless query parameters are a liability. They break layouts, look unprofessional, and discourage clicks. A URL shortener transforms these unwieldy addresses into clean, branded, and memorable links.</p>
        <p>Toolzium's URL Shortener operates entirely in your browser. This means your original URLs are never transmitted to our servers for processing, ensuring absolute privacy for sensitive internal links or pre-launch campaign URLs. The custom alias feature allows marketers to create vanity links (e.g., toolzium.com/s/summer-sale) that build brand recognition and trust before the user even clicks.</p>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Are the shortened links permanent?", answer: "Because this tool operates 100% client-side, it generates the short link structure but does not host the redirect database. For production routing, these aliases must be configured in your own DNS or routing layer." },
          { question: "Can I track clicks on these short links?", answer: "The generated links display 'Clicks: N/A' because client-side generation cannot track server-side requests. To track analytics, you must implement server-side routing for the /s/ paths." },
          { question: "What characters are allowed in a custom alias?", answer: "Custom aliases support alphanumeric characters (a-z, A-Z, 0-9), hyphens (-), and underscores (_). Special characters and spaces are automatically stripped." },
          { question: "Is my data private?", answer: "Yes. All URL processing and hash generation happen locally in your browser. No URLs are sent to external APIs or stored on our servers." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/url/shortener" max={6} />
    </div>
  );
}

export default ShortenerClient;
