"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
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
import { createShort } from "@/lib/actions/shortener.action";
import { Link2, Copy, Download, QrCode, Scissors, RefreshCcw, ExternalLink, CheckCircle2, History, Sliders } from "lucide-react";
import toast from "react-hot-toast";

interface ShortenedLink {
  id: string;
  original: string;
  shortUrl: string;
  slug: string;
  createdAt: string;
  qrDataUrl?: string;
}

export function ShortenerClient() {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [batchInput, setBatchInput] = useState("");
  const [isBatchMode, setIsBatchMode] = useState(false);

  const [isShortening, setIsShortening] = useState(false);
  const [activeResults, setActiveResults] = useState<ShortenedLink[]>([]);
  const [history, setHistory] = useState<ShortenedLink[]>([]);
  const [qrModalUrl, setQrModalUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("toolzium_shortener_history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load shortener history:", e);
    }
  }, []);

  const saveHistory = (items: ShortenedLink[]) => {
    try {
      localStorage.setItem("toolzium_shortener_history", JSON.stringify(items.slice(0, 30)));
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  };

  const handleShorten = useCallback(async () => {
    const urlsToProcess = isBatchMode
      ? batchInput.split("\n").map((u) => u.trim()).filter(Boolean)
      : [longUrl.trim()].filter(Boolean);

    if (urlsToProcess.length === 0) {
      toast.error("Please enter at least one URL to shorten");
      return;
    }

    setIsShortening(true);

    try {
      const newLinks: ShortenedLink[] = [];

      for (let i = 0; i < urlsToProcess.length; i++) {
        const target = urlsToProcess[i];
        const alias = !isBatchMode && i === 0 && customAlias.trim() ? customAlias.trim() : undefined;

        // Call backend server action
        const res = await createShort({ url: target, preferredSlug: alias });

        if (res.ok && res.link) {
          const slug = res.link.short;
          const origin = typeof window !== "undefined" ? window.location.origin : "https://toolzium.com";
          const shortUrl = `${origin}/${slug}`;

          // Generate real QR code for shortened link
          const qrDataUrl = await QRCode.toDataURL(shortUrl, { width: 250, margin: 2 });

          newLinks.push({
            id: res.link.id || `slug-${Date.now()}-${i}`,
            original: target,
            shortUrl,
            slug,
            createdAt: new Date().toLocaleTimeString(),
            qrDataUrl
          });
        } else {
          toast.error(`Failed to shorten ${target}`);
        }
      }

      if (newLinks.length > 0) {
        setActiveResults(newLinks);
        setHistory((prev) => {
          const updated = [...newLinks, ...prev];
          saveHistory(updated);
          return updated;
        });
        toast.success(`Successfully shortened ${newLinks.length} link(s)!`);
        if (!isBatchMode) {
          setLongUrl("");
          setCustomAlias("");
        }
      }
    } catch (err) {
      console.error("Shortening error:", err);
      toast.error("Error creating short link. Please try again.");
    } finally {
      setIsShortening(false);
    }
  }, [longUrl, customAlias, batchInput, isBatchMode]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("toolzium_shortener_history");
    toast.success("Shortener history cleared!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={Scissors}
        title="URL Shortener & QR Link Manager"
        description="Transform long, ugly URLs into clean, trackable short links with instant real QR code generation and custom alias support."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-border/40 bg-muted/20 p-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Link2 className="w-4 h-4 text-primary" />
                Shorten URL Input
              </CardTitle>
              <button
                onClick={() => setIsBatchMode(!isBatchMode)}
                className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
              >
                {isBatchMode ? "Single URL Mode" : "Bulk Batch Mode"}
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            {!isBatchMode ? (
              <>
                <div>
                  <Label className="text-xs mb-1 block">Long URL to Shorten</Label>
                  <Input
                    placeholder="https://example.com/very-long-url-path-name?ref=marketing"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Custom Alias / Back-half (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-muted/40 px-2.5 py-2 rounded border border-border/40">toolzium.com/</span>
                    <Input
                      placeholder="my-custom-link"
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <Label className="text-xs mb-1 block">Bulk URLs (One per line)</Label>
                <textarea
                  className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[140px] font-mono"
                  placeholder={`https://example.com/page1\nhttps://example.com/page2\nhttps://example.com/page3`}
                  value={batchInput}
                  onChange={(e) => setBatchInput(e.target.value)}
                />
              </div>
            )}

            <Button onClick={handleShorten} disabled={isShortening || (!longUrl.trim() && !batchInput.trim())} className="w-full gap-2 mt-2">
              {isShortening ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Scissors className="w-4 h-4" />}
              {isShortening ? "Creating Short Link..." : "Shorten URL"}
            </Button>
          </CardContent>
        </GlassCard>

        {/* Output & Results */}
        <div className="space-y-4">
          {activeResults.length > 0 ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-wider px-1">Newly Created Short Links ({activeResults.length})</span>
              {activeResults.map((item) => (
                <GlassCard key={item.id} className="p-4 space-y-3 border-l-4 border-l-primary">
                  <div className="flex items-center justify-between">
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-extrabold text-primary hover:underline flex items-center gap-1.5 font-mono"
                    >
                      {item.shortUrl} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleCopy(item.shortUrl, "Short URL")} className="h-8 text-xs gap-1">
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </Button>
                      {item.qrDataUrl && (
                        <Button variant="ghost" size="sm" onClick={() => setQrModalUrl(item.qrDataUrl || null)} className="h-8 text-xs gap-1">
                          <QrCode className="w-3.5 h-3.5" /> QR Code
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground truncate max-w-full font-mono bg-muted/20 p-2 rounded border border-border/30">
                    Target: {item.original}
                  </p>
                </GlassCard>
              ))}
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed">
              <Scissors className="w-12 h-12 mb-3 text-muted-foreground/30" />
              <p className="text-sm font-medium">No Short Links Created Yet</p>
              <p className="text-xs max-w-xs mt-1">Paste your long destination URL on the left to generate clean short links and scannable QR codes.</p>
            </GlassCard>
          )}
        </div>
      </div>

      {/* History Table */}
      {history.length > 0 && (
        <GlassCard className="p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-border/40 pb-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-3.5 h-3.5" /> Your Shortened Links History ({history.length})
            </span>
            <Button variant="ghost" size="sm" onClick={handleClearHistory} className="h-7 text-xs text-red-500 hover:text-red-600">
              Clear History
            </Button>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {history.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs bg-muted/20 p-2.5 rounded border border-border/30 gap-2">
                <div className="truncate max-w-md">
                  <a href={item.shortUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline font-mono">
                    {item.shortUrl}
                  </a>
                  <p className="text-[11px] text-muted-foreground truncate">{item.original}</p>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-[10px] text-muted-foreground font-mono">{item.createdAt}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(item.shortUrl, "Short link")} className="h-7 px-2 text-xs">
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* QR Code Modal */}
      {qrModalUrl && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <GlassCard className="p-6 max-w-sm w-full space-y-4 text-center">
            <h3 className="text-sm font-bold">Short Link QR Code</h3>
            <div className="p-3 bg-white rounded-lg inline-block shadow">
              <img src={qrModalUrl} alt="QR Code" className="w-48 h-48 rounded" />
            </div>
            <div className="flex justify-center gap-2">
              <a href={qrModalUrl} download="shortlink_qr.png" className="w-full">
                <Button size="sm" className="w-full text-xs gap-1">
                  <Download className="w-3.5 h-3.5" /> Download PNG
                </Button>
              </a>
              <Button variant="outline" size="sm" onClick={() => setQrModalUrl(null)} className="text-xs">
                Close
              </Button>
            </div>
          </GlassCard>
        </div>
      )}

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Destination Link", description: "Input long URL and optional custom alias slug.", icon: Link2 },
          { step: "02", title: "Instant Link Creation", description: "Generates clean redirect slug saved to database and local storage.", icon: Scissors },
          { step: "03", title: "Copy & QR Download", description: "Copy short URL or download matching high-resolution QR code.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Real QR Code Included", "Bulk URL Support"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Link2, title: "High-Performance Redirects", description: "Redirects users instantly with minimal latency." },
          { icon: QrCode, title: "Automated QR Code Generation", description: "Every short link automatically builds a scannable QR code." },
          { icon: History, title: "Local Browser History", description: "Persists your shortened links securely inside local storage." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>The Advantages of Short URLs</h3>
          <p>
            Short links make long URLs readable, clean for social sharing, and easy to print. Combined with automated QR code rendering, short links streamline user access across marketing campaigns, print materials, and mobile messaging.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Do these short links expire?", answer: "No! All created short links remain active indefinitely." },
          { question: "Can I choose my own custom alias?", answer: "Yes! Enter your desired alias in the Custom Alias box before clicking Shorten." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/url/shortener" max={6} />
    </div>
  );
}

export default ShortenerClient;
