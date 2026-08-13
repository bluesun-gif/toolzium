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
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { createShort, getAnalytics, type AnalyticsResponse } from "@/lib/actions/shortener.action";
import {
  Link2,
  Copy,
  Download,
  QrCode,
  Scissors,
  RefreshCcw,
  ExternalLink,
  CheckCircle2,
  History,
  BarChart3,
  Globe,
  MousePointer,
  Smartphone,
  X,
  Sparkles,
  Wand2,
  ShieldCheck,
  Zap,
  Trash2
} from "lucide-react";
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
  const [isGeneratingAiSlug, setIsGeneratingAiSlug] = useState(false);
  const [activeResults, setActiveResults] = useState<ShortenedLink[]>([]);
  const [history, setHistory] = useState<ShortenedLink[]>([]);

  // Modals & Stats
  const [qrModalUrl, setQrModalUrl] = useState<string | null>(null);
  const [analyticsSlug, setAnalyticsSlug] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsResponse | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

  useEffect(() => {
        try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("toolzium_shortener_history");
        if (saved) {
          setHistory(JSON.parse(saved));
        }
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

  const generateAiAlias = async () => {
    if (!longUrl.trim()) {
      toast.error("Please enter a long URL first to generate an AI alias");
      return;
    }

    setIsGeneratingAiSlug(true);
    try {
      const prompt = `Generate a single short, punchy, memorable 6-12 character alphanumeric URL slug for this web address: "${longUrl}".
      Return ONLY the raw slug string without spaces, slashes, or extra punctuation. (e.g. nextjs-ai-2026).`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "text" }),
      });
      const data = await res.json();
      if (data.success && data.raw) {
        const cleanSlug = data.raw.trim().toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 20);
        if (cleanSlug) {
          setCustomAlias(cleanSlug);
          toast.success(`Generated AI Alias: "${cleanSlug}"!`);
        }
      }
    } catch (err) {
      console.warn("AI slug generation error:", err);
      toast.error("Could not generate AI slug. Please type custom alias manually.");
    } finally {
      setIsGeneratingAiSlug(false);
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

        const res = await createShort({ url: target, preferredSlug: alias });

        if (res.ok && res.link) {
          const slug = res.link.short;
          const origin = typeof window !== "undefined" ? window.location.origin : "https://toolzium.com";
          const shortUrl = `${origin}/${slug}`;

          const qrTargetUrl = `${shortUrl}?src=qr`;
          const qrDataUrl = await QRCode.toDataURL(qrTargetUrl, {
            width: 280,
            margin: 2,
            color: { dark: "#000000", light: "#ffffff" }
          });

          newLinks.push({
            id: res.link.id || `slug-${Date.now()}-${i}`,
            original: target,
            shortUrl,
            slug,
            createdAt: new Date().toLocaleTimeString(),
            qrDataUrl,
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

  const fetchAnalytics = async (slug: string) => {
    setAnalyticsSlug(slug);
    setIsLoadingAnalytics(true);
    try {
      const data = await getAnalytics(slug);
      setAnalyticsData(data);
    } catch (err) {
      console.error("Analytics fetch error:", err);
      toast.error("Could not load analytics for this link");
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

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
    <div className="w-full min-h-screen pb-20 relative">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 h-full w-full stroke-border [mask-image:linear-gradient(to_bottom,white,transparent)]"
        )}
      />

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader
          icon={Scissors}
          title="URL Shortener & Click Analytics Manager Studio"
          description="Transform long URLs into short, trackable links with real QR code generation, AI alias suggestions, custom slugs, and audience click analytics."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Input Control Card */}
          <GlassCard className="p-5 flex flex-col bg-background border-border shadow-sm rounded-2xl">
            <div className="flex flex-wrap justify-between items-center border-b border-border pb-3 mb-4 gap-2">
              <Label className="text-base font-bold text-foreground flex items-center gap-2">
                <Scissors className="w-4 h-4 text-primary" /> Shorten URL Studio
              </Label>
              <div className="flex gap-1 bg-muted/60 p-1 rounded-xl border border-border">
                <Button
                  type="button"
                  variant={!isBatchMode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setIsBatchMode(false)}
                  className={cn(
                    "h-7 text-xs font-bold rounded-lg px-3 transition-all",
                    !isBatchMode ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Single URL
                </Button>
                <Button
                  type="button"
                  variant={isBatchMode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setIsBatchMode(true)}
                  className={cn(
                    "h-7 text-xs font-bold rounded-lg px-3 transition-all",
                    isBatchMode ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Bulk Batch Mode
                </Button>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {!isBatchMode ? (
                <>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground block">
                      Long Destination URL
                    </Label>
                    <Input
                      placeholder="https://example.com/very-long-url-path-name?ref=marketing"
                      value={longUrl}
                      onChange={(e) => setLongUrl(e.target.value)}
                      className="bg-background border-border text-foreground font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs font-semibold text-muted-foreground">
                        Custom Alias / Back-half (Optional)
                      </Label>
                      <button
                        type="button"
                        onClick={generateAiAlias}
                        disabled={isGeneratingAiSlug || !longUrl.trim()}
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {isGeneratingAiSlug ? (
                          <RefreshCcw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Wand2 className="w-3 h-3" />
                        )}
                        <span>✨ AI Smart Alias</span>
                      </button>
                    </div>

                    <div className="flex items-center">
                      <span className="text-xs font-mono bg-muted text-foreground border border-border border-r-0 px-3 py-2.5 rounded-l-xl shrink-0 font-bold">
                        toolzium.com/
                      </span>
                      <Input
                        placeholder="my-custom-link"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                        className="bg-background border-border rounded-l-none text-foreground font-mono"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground block">
                    Bulk URLs (One per line)
                  </Label>
                  <textarea
                    className="w-full rounded-xl border border-border bg-background p-3.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono text-foreground min-h-[160px]"
                    placeholder={`https://example.com/page1\nhttps://example.com/page2\nhttps://example.com/page3`}
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                  />
                </div>
              )}

              <Button
                onClick={handleShorten}
                disabled={isShortening || (!longUrl.trim() && !batchInput.trim())}
                className="w-full gap-2 mt-4 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 rounded-xl h-12 text-base"
              >
                {isShortening ? (
                  <RefreshCcw className="w-5 h-5 animate-spin" />
                ) : (
                  <Scissors className="w-5 h-5" />
                )}
                {isShortening ? "Creating Short Link..." : "Shorten URL"}
              </Button>
            </div>
          </GlassCard>

          {/* Right Workspace Results Card */}
          <div className="flex flex-col space-y-4">
            {activeResults.length > 0 ? (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <Label className="text-base font-bold text-foreground block px-1">
                  Newly Created Short Links ({activeResults.length})
                </Label>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {activeResults.map((item) => (
                    <GlassCard
                      key={item.id}
                      className="p-5 space-y-3 border-l-4 border-l-primary bg-card/70 backdrop-blur-md rounded-2xl"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <a
                          href={item.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-extrabold text-primary hover:underline flex items-center gap-1.5 font-mono"
                        >
                          {item.shortUrl} <ExternalLink className="w-4 h-4" />
                        </a>

                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopy(item.shortUrl, "Short URL")}
                            className="h-8 text-xs gap-1 border-border font-semibold"
                          >
                            <Copy className="w-3.5 h-3.5" /> Copy
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fetchAnalytics(item.slug)}
                            className="h-8 text-xs gap-1 border-primary/30 text-primary bg-primary/10 font-semibold"
                          >
                            <BarChart3 className="w-3.5 h-3.5" /> Stats
                          </Button>

                          {item.qrDataUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setQrModalUrl(item.qrDataUrl || null)}
                              className="h-8 text-xs gap-1 border-border font-semibold"
                            >
                              <QrCode className="w-3.5 h-3.5" /> QR
                            </Button>
                          )}
                        </div>
                      </div>

                      <p className="text-xs font-mono bg-muted/40 p-2.5 rounded-lg border border-border text-muted-foreground truncate">
                        Target: {item.original}
                      </p>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            ) : (
              <GlassCard className="p-8 h-full min-h-[420px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed border-2 border-border rounded-2xl bg-background shadow-sm">
                <Scissors className="w-14 h-14 mb-3 text-muted-foreground/40" />
                <p className="text-base font-bold text-foreground">No Short Links Created Yet</p>
                <p className="text-xs max-w-xs mt-1 text-muted-foreground">
                  Paste your long destination URL on the left to generate clean short links, scannable QR codes, and click analytics.
                </p>
              </GlassCard>
            )}
          </div>
        </div>

        {/* History Table */}
        {history.length > 0 && (
          <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl">
            <div className="flex justify-between items-center border-b border-border pb-3 mb-3">
              <Label className="text-base font-bold text-foreground flex items-center gap-2">
                <History className="w-4 h-4 text-primary" /> Your Shortened Links & Analytics ({history.length})
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearHistory}
                className="h-7 text-xs text-muted-foreground hover:text-red-500 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear History
              </Button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between text-xs bg-muted/30 p-3.5 rounded-xl border border-border gap-2"
                >
                  <div className="truncate max-w-md">
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-primary hover:underline font-mono text-sm"
                    >
                      {item.shortUrl}
                    </a>
                    <p className="text-[11px] text-muted-foreground truncate">{item.original}</p>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchAnalytics(item.slug)}
                      className="h-8 text-xs text-primary bg-primary/10 border-primary/20 font-semibold gap-1"
                    >
                      <BarChart3 className="w-3.5 h-3.5" /> Stats
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(item.shortUrl, "Short link")}
                      className="h-8 text-xs border-border font-semibold"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* High-Contrast Analytics Report Modal */}
        {analyticsSlug && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-card border border-border rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-border pb-3">
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    Link Telemetry Report
                  </span>
                  <h3 className="text-lg font-extrabold text-foreground font-mono">/{analyticsSlug}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setAnalyticsSlug(null);
                    setAnalyticsData(null);
                  }}
                  className="rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {isLoadingAnalytics ? (
                <div className="py-12 flex flex-col items-center justify-center text-muted-foreground space-y-2">
                  <RefreshCcw className="w-6 h-6 animate-spin text-primary" />
                  <span className="text-xs font-semibold">Fetching telemetry data...</span>
                </div>
              ) : analyticsData ? (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted/40 rounded-xl border border-border">
                      <span className="text-muted-foreground block text-[11px]">Total Clicks</span>
                      <span className="text-2xl font-extrabold text-primary font-mono">
                        {analyticsData.total || 0}
                      </span>
                    </div>
                    <div className="p-3 bg-muted/40 rounded-xl border border-border">
                      <span className="text-muted-foreground block text-[11px]">Created At</span>
                      <span className="text-xs font-semibold text-foreground">
                        {analyticsData.first ? new Date(analyticsData.first).toLocaleDateString() : "Today"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-muted-foreground block uppercase text-[10px]">Destination URL</span>
                    <p className="p-3 bg-muted/40 rounded-xl border border-border font-mono break-all text-foreground text-xs">
                      {analyticsData.link?.targetUrl}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground space-y-1">
                  <p className="text-sm font-bold text-foreground">No Click Data Logged Yet</p>
                  <p className="text-xs">Share your short link to start collecting click analytics!</p>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* High-Contrast QR Code Download Modal */}
        {qrModalUrl && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-card border border-border rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4"
            >
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Scannable QR Code
                </span>
                <Button variant="ghost" size="icon" onClick={() => setQrModalUrl(null)} className="rounded-full h-8 w-8 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* White card container for 100% QR scannability on all themes */}
              <div className="p-4 bg-white rounded-2xl inline-block border border-slate-200 shadow-md">
                <img src={qrModalUrl} alt="QR Code" className="w-56 h-56 rounded-lg" />
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-10 rounded-xl text-xs"
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = qrModalUrl;
                    a.download = `qrcode_${Date.now()}.png`;
                    a.click();
                    toast.success("QR Code downloaded!");
                  }}
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" /> Download PNG
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Paste Destination URL", description: "Input any long web page link, campaign URL, or affiliate link.", icon: Link2 },
            { step: "02", title: "Generate Custom Alias", description: "Use AI to auto-generate a punchy memorable slug or type your custom alias.", icon: Wand2 },
            { step: "03", title: "Track & Download QR", description: "Copy short URL, view real-time click analytics, or download PNG QR codes.", icon: BarChart3 },
          ]}
          badges={["Custom Slugs", "Real-Time Click Analytics", "High-Contrast QR Code"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Scissors, title: "Custom Back-Half Slugs", description: "Create branded short links with custom aliases (e.g. toolzium.com/spring-sale)." },
            { icon: BarChart3, title: "Click Analytics Telemetry", description: "Track click counts, referrer sources, and device breakdowns in real-time." },
            { icon: QrCode, title: "Scannable QR Codes", description: "Auto-generates high-contrast QR codes for mobile users to scan and visit your links." },
          ]}
        >
          <div className="prose dark:prose-invert max-w-none mt-6">
            <h3>Why Short Links Matter for Digital Brands</h3>
            <p>
              Short links clean up messy destination URLs, improve social media click-through rates, and allow accurate campaign tracking without leaking internal query parameters.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "Do my short links expire?", answer: "No! All short links created on Toolzium remain active indefinitely." },
            { question: "Can I customize the alias?", answer: "Yes! Type any custom slug or click 'AI Smart Alias' to auto-generate a punchy link name." },
          ]}
        />

        <RelatedTools currentToolUrl="/tools/url/shortener" max={6} />
      </div>
    </div>
  );
}

export default ShortenerClient;
