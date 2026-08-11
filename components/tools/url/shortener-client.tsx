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
import { createShort, getAnalytics, type AnalyticsResponse } from "@/lib/actions/shortener.action";
import { Link2, Copy, Download, QrCode, Scissors, RefreshCcw, ExternalLink, CheckCircle2, History, BarChart3, Globe, MousePointer, Smartphone, X } from "lucide-react";
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
  
  // Modals
  const [qrModalUrl, setQrModalUrl] = useState<string | null>(null);
  const [analyticsSlug, setAnalyticsSlug] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsResponse | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

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

        const res = await createShort({ url: target, preferredSlug: alias });

        if (res.ok && res.link) {
          const slug = res.link.short;
          const origin = typeof window !== "undefined" ? window.location.origin : "https://toolzium.com";
          const shortUrl = `${origin}/${slug}`;

          const qrTargetUrl = `${shortUrl}?src=qr`;
          const qrDataUrl = await QRCode.toDataURL(qrTargetUrl, { width: 250, margin: 2 });

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
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={Scissors}
        title="URL Shortener & Click Analytics Manager"
        description="Transform long URLs into short, trackable links with real QR code generation, custom slugs, and audience click analytics."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <Link2 className="w-4 h-4 text-blue-600" />
                Shorten URL Input
              </CardTitle>
              <button
                onClick={() => setIsBatchMode(!isBatchMode)}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
              >
                {isBatchMode ? "Single URL Mode" : "Bulk Batch Mode"}
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            {!isBatchMode ? (
              <>
                <div>
                  <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Long URL to Shorten</Label>
                  <Input
                    placeholder="https://example.com/very-long-url-path-name?ref=marketing"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Custom Alias / Back-half (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700">toolzium.com/</span>
                    <Input
                      placeholder="my-custom-link"
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value)}
                      className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Bulk URLs (One per line)</Label>
                <textarea
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono text-slate-900 dark:text-slate-100 min-h-[140px]"
                  placeholder={`https://example.com/page1\nhttps://example.com/page2\nhttps://example.com/page3`}
                  value={batchInput}
                  onChange={(e) => setBatchInput(e.target.value)}
                />
              </div>
            )}

            <Button onClick={handleShorten} disabled={isShortening || (!longUrl.trim() && !batchInput.trim())} className="w-full gap-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/20 rounded-xl h-11">
              {isShortening ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Scissors className="w-4 h-4" />}
              {isShortening ? "Creating Short Link..." : "Shorten URL"}
            </Button>
          </CardContent>
        </GlassCard>

        {/* Output & Results */}
        <div className="space-y-4">
          {activeResults.length > 0 ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider px-1">Newly Created Short Links ({activeResults.length})</span>
              {activeResults.map((item) => (
                <GlassCard key={item.id} className="p-4 space-y-3 border-l-4 border-l-blue-600">
                  <div className="flex items-center justify-between">
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-extrabold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5 font-mono"
                    >
                      {item.shortUrl} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleCopy(item.shortUrl, "Short URL")} className="h-8 text-xs gap-1 border-slate-200 dark:border-slate-700">
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => fetchAnalytics(item.slug)} className="h-8 text-xs gap-1 border-sky-200 text-sky-600 bg-sky-50 dark:bg-sky-950/30">
                        <BarChart3 className="w-3.5 h-3.5" /> Stats
                      </Button>
                      {item.qrDataUrl && (
                        <Button variant="outline" size="sm" onClick={() => setQrModalUrl(item.qrDataUrl || null)} className="h-8 text-xs gap-1 border-slate-200">
                          <QrCode className="w-3.5 h-3.5" /> QR
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 truncate max-w-full font-mono bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-200/60 dark:border-slate-800">
                    Target: {item.original}
                  </p>
                </GlassCard>
              ))}
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-slate-400 border-dashed border-2 border-slate-200 dark:border-slate-800">
              <Scissors className="w-12 h-12 mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No Short Links Created Yet</p>
              <p className="text-xs max-w-xs mt-1 text-slate-500">Paste your long destination URL on the left to generate clean short links, scannable QR codes, and click analytics.</p>
            </GlassCard>
          )}
        </div>
      </div>

      {/* History Table */}
      {history.length > 0 && (
        <GlassCard className="p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-blue-600" /> Your Shortened Links & Analytics ({history.length})
            </span>
            <Button variant="ghost" size="sm" onClick={handleClearHistory} className="h-7 text-xs text-red-500 hover:text-red-600">
              Clear History
            </Button>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {history.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800 gap-2">
                <div className="truncate max-w-md">
                  <a href={item.shortUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 dark:text-blue-400 hover:underline font-mono">
                    {item.shortUrl}
                  </a>
                  <p className="text-[11px] text-slate-500 truncate">{item.original}</p>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Button variant="outline" size="sm" onClick={() => fetchAnalytics(item.slug)} className="h-7 px-2.5 text-xs text-sky-600 bg-sky-50 dark:bg-sky-950/40 border-sky-200 font-semibold gap-1">
                    <BarChart3 className="w-3.5 h-3.5" /> Stats
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(item.shortUrl, "Short link")} className="h-7 px-2.5 text-xs border-slate-200 dark:border-slate-700">
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Crisp High-Contrast Analytics Report Modal */}
      {analyticsSlug && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4"
          >
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Link Telemetry Report</span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 font-mono">/{analyticsSlug}</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { setAnalyticsSlug(null); setAnalyticsData(null); }}
                className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {isLoadingAnalytics ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-2">
                <RefreshCcw className="w-6 h-6 animate-spin text-blue-600" />
                <span className="text-xs font-medium">Loading live click metrics...</span>
              </div>
            ) : analyticsData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-4 rounded-2xl text-center">
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 block mb-1">Total Click Volume</span>
                    <span className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">{analyticsData.total}</span>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 rounded-2xl text-center">
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 block mb-1">First Created</span>
                    <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 font-mono mt-1 block">
                      {new Date(analyticsData.first).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Referral Sources & QR Scans */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block flex items-center gap-1.5">
                    <MousePointer className="w-3.5 h-3.5 text-blue-600" /> Traffic Referrals & Scans
                  </span>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
                    {analyticsData.topReferrers.length > 0 ? (
                      analyticsData.topReferrers.map(([source, count], i) => (
                        <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 font-mono">
                            {source.includes("QR") ? (
                              <span className="p-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 rounded">
                                <Smartphone className="w-3.5 h-3.5" />
                              </span>
                            ) : (
                              <span className="p-1 bg-sky-100 dark:bg-sky-900/50 text-sky-600 rounded">
                                <Globe className="w-3.5 h-3.5" />
                              </span>
                            )}
                            {source}
                          </span>
                          <span className="font-extrabold text-blue-600 dark:text-blue-400 font-mono">{count} clicks</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 text-center text-xs py-3">No click referrers recorded yet.</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-6">No analytics recorded for this short link yet.</p>
            )}
          </motion.div>
        </div>
      )}

      {/* High Contrast QR Code Modal */}
      {qrModalUrl && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4"
          >
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Short Link QR Code</h3>
            <div className="p-4 bg-white rounded-2xl inline-block border border-slate-200 shadow-md">
              <img src={qrModalUrl} alt="QR Code" className="w-48 h-48 rounded-lg" />
            </div>
            <div className="flex justify-center gap-2">
              <a href={qrModalUrl} download="shortlink_qr.png" className="w-full">
                <Button size="sm" className="w-full text-xs gap-1.5 bg-blue-600 text-white font-semibold rounded-xl">
                  <Download className="w-3.5 h-3.5" /> Download PNG
                </Button>
              </a>
              <Button variant="outline" size="sm" onClick={() => setQrModalUrl(null)} className="text-xs rounded-xl border-slate-200">
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Destination Link", description: "Input long URL and optional custom alias slug.", icon: Link2 },
          { step: "02", title: "Instant Link Creation", description: "Generates clean redirect slug saved to database and local storage.", icon: Scissors },
          { step: "03", title: "View Analytics & Stats", description: "Click Analytics to view total click volume, QR code scan breakdown, and referrers.", icon: BarChart3 }
        ]}
        badges={["100% Free", "Click Analytics Included", "QR Scan Tracking"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: BarChart3, title: "Real-Time Click Telemetry", description: "Tracks total click volume, geographic country origin, and referral channels." },
          { icon: Smartphone, title: "QR Scan vs Direct Click Split", description: "Differentiates traffic coming from scanned physical QR codes vs direct web links." },
          { icon: History, title: "Local Browser History", description: "Persists your shortened links securely inside local storage." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Understanding Short Link Click Analytics</h3>
          <p>
            Tracking campaign link performance allows marketers and creators to evaluate channel ROI. Our <strong>URL Shortener Analytics Engine</strong> measures total click volume, distinguishes physical QR code scans from online link clicks, and aggregates top referral sources without collecting personal user data.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "How do I check analytics for my shortened link?", answer: "Click the 'Analytics' or 'Stats' button on any shortened link card to view live click metrics." },
          { question: "Can I track QR code scans separately from direct link clicks?", answer: "Yes! Scanned QR codes are automatically tagged as '📱 QR Code Scan' in your link's analytics report." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/url/shortener" max={6} />
    </div>
  );
}

export default ShortenerClient;
