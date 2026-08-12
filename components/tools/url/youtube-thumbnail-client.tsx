"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import {
  Download,
  Youtube,
  Loader2,
  RefreshCw,
  ShieldCheck,
  FileImage,
  Image,
  History,
  FileText,
  Wand2,
  Sparkles,
  ExternalLink
} from "lucide-react";
import toast from "react-hot-toast";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

interface ThumbnailInfo {
  url: string;
  quality: string;
  resolution: string;
  name: string;
}

export default function YoutubeThumbnailClient() {
  const [mounted, setMounted] = useState(false);
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState<ThumbnailInfo[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const extractVideoId = (inputUrl: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\/shorts\/)([^#\&\?]*).*/;
    const match = inputUrl.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleGetThumbnails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    setLoading(true);
    const id = extractVideoId(url.trim());

    if (!id) {
      toast.error("Invalid YouTube URL. Please enter a valid video link.");
      setLoading(false);
      return;
    }

    setVideoId(id);

    const list: ThumbnailInfo[] = [
      {
        url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
        quality: "Maximum Resolution (HD)",
        resolution: "1280 x 720 (or 1920 x 1080)",
        name: "maxres",
      },
      {
        url: `https://img.youtube.com/vi/${id}/sddefault.jpg`,
        quality: "Standard Definition",
        resolution: "640 x 480",
        name: "standard",
      },
      {
        url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
        quality: "Medium Definition",
        resolution: "320 x 180",
        name: "medium",
      },
      {
        url: `https://img.youtube.com/vi/${id}/default.jpg`,
        quality: "Default Quality",
        resolution: "120 x 90",
        name: "default",
      },
    ];

    setThumbnails(list);
    setLoading(false);
    toast.success("Thumbnails fetched successfully!");
  };

  const runAiCtrAudit = async () => {
    if (!videoId) return;
    setIsAnalyzingAi(true);
    try {
      const prompt = `Act as an expert YouTube Growth & Thumbnail Design Strategist. Perform a thumbnail CTR design audit for YouTube Video ID "${videoId}".
      Explain color contrast strategies, facial expression framing, title text placement rules, and 3 tips to double Click-Through Rates (CTR). Keep response concise in Markdown.`;

      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "text" }),
      });
      const data = await response.json();
      if (data.success && data.raw) {
        setAiAnalysis(data.raw);
        toast.success("AI CTR Design Audit complete!");
      }
    } catch (e) {
      console.warn("AI thumbnail audit error:", e);
    } finally {
      setIsAnalyzingAi(false);
    }
  };

  const downloadThumbnail = async (thumbnailUrl: string, qualityName: string) => {
    try {
      const response = await fetch(thumbnailUrl, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `youtube-thumbnail-${videoId}-${qualityName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      toast.success("Thumbnail downloaded!");
    } catch (error) {
      window.open(thumbnailUrl, "_blank");
    }
  };

  const handleClear = () => {
    setUrl("");
    setVideoId(null);
    setThumbnails([]);
    setAiAnalysis(null);
  };

  if (!mounted) return <div className="min-h-screen p-8 animate-pulse" />;

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
          title="YouTube HD Thumbnail Downloader & CTR Studio"
          description="Free online utility to grab, preview, and download YouTube video thumbnails in all available resolutions instantly."
          icon={Youtube}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {/* Input Column */}
          <div className="md:col-span-1">
            <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl sticky top-24">
              <CardHeader className="p-0 pb-4 border-b border-border mb-4">
                <CardTitle className="text-base font-bold text-foreground">Input YouTube URL</CardTitle>
              </CardHeader>
              <form onSubmit={handleGetThumbnails} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Video Link / Shorts URL</Label>
                  <Input
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={loading}
                    className="w-full bg-background border-border"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-xl shadow-md shadow-primary/20"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Youtube className="mr-2 h-4 w-4" />
                    )}
                    Get Thumbnails
                  </Button>
                  {(videoId || url) && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClear}
                      disabled={loading}
                      className="h-11 rounded-xl border-border"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {videoId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={runAiCtrAudit}
                    disabled={isAnalyzingAi}
                    className="w-full mt-2 border-primary/30 text-primary bg-primary/10 font-bold h-10 rounded-xl text-xs gap-1.5"
                  >
                    {isAnalyzingAi ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Wand2 className="w-3.5 h-3.5" />
                    )}
                    <span>✨ AI Thumbnail CTR Audit</span>
                  </Button>
                )}
              </form>
            </GlassCard>
          </div>

          {/* Results Column */}
          <div className="md:col-span-2 space-y-6">
            {videoId ? (
              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {thumbnails.map((t, idx) => (
                    <GlassCard key={idx} className="overflow-hidden flex flex-col justify-between p-0 bg-background border-border shadow-sm rounded-2xl">
                      <div className="relative aspect-video w-full bg-muted overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={t.url}
                          alt={`${t.quality} preview`}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            if (t.name === "maxres") {
                              (e.target as HTMLElement).parentElement?.classList.add("hidden");
                            }
                          }}
                        />
                        <div className="absolute top-2 left-2">
                          <span className="text-[10px] font-mono font-bold bg-background/90 text-foreground backdrop-blur-md px-2.5 py-1 rounded-md border border-border">
                            {t.resolution}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <h4 className="text-xs font-extrabold text-foreground">{t.quality}</h4>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => downloadThumbnail(t.url, t.name)}
                          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold h-10 rounded-xl"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download Image
                        </Button>
                      </div>
                    </GlassCard>
                  ))}
                </div>

                {aiAnalysis && (
                  <GlassCard className="p-5 bg-card/80 backdrop-blur-md border-border rounded-2xl space-y-2">
                    <Label className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border pb-2">
                      <Sparkles className="w-4 h-4 text-primary" /> AI Thumbnail CTR Analysis
                    </Label>
                    <div className="prose prose-xs dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {aiAnalysis}
                    </div>
                  </GlassCard>
                )}
              </div>
            ) : (
              <GlassCard className="flex flex-col items-center justify-center py-16 text-center border-dashed border-2 border-border rounded-2xl">
                <Youtube className="h-12 w-12 text-muted-foreground/40 mb-3" />
                <h3 className="text-base font-bold text-foreground">No Video Selected</h3>
                <p className="text-xs text-muted-foreground max-w-sm mt-1">
                  Enter a YouTube video URL in the input panel to fetch and download high-resolution cover image assets.
                </p>
              </GlassCard>
            )}
          </div>
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Paste Video Link", description: "Copy any valid YouTube watch, shorts, embed, or sharing URL and paste it in.", icon: Youtube },
            { step: "02", title: "Extract Cover ID", description: "The tool extracts the unique 11-character video ID client-side in milliseconds.", icon: FileText },
            { step: "03", title: "Download Quality", description: "Pre-rendered card links load direct media server assets. Click to download as a local JPG file.", icon: Download },
          ]}
          badges={["100% Free", "HD 1080p Resolution", "YouTube Shorts Ready"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: FileImage, title: "Multiple Qualities", description: "Extract MaxRes HD, Standard, Medium, and Default quality cover variations." },
            { icon: Youtube, title: "Smart URL Parser", description: "Compatible with standard desktop watches, shorts, embeds, and mobile shortlinks." },
            { icon: Download, title: "Direct JPG Downloads", description: "Generates quick client-side blob downloads to save cover assets straight to your device." },
          ]}
        >
          <div className="prose dark:prose-invert max-w-none">
            <h3>How Video Thumbnails Drive Click-Through Rate (CTR)</h3>
            <p>
              On YouTube, a video thumbnail is the single most critical factor influencing a viewer's decision to click, representing up to 90% of the visual hook for search results.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "How do I download a YouTube thumbnail?", answer: "Copy the YouTube video URL, paste it into our tool, and click 'Get Thumbnails'." },
            { question: "Is it legal to download YouTube video thumbnails?", answer: "Yes, downloading thumbnails for personal use or design research is generally fine under Fair Use." },
          ]}
        />

        <RelatedTools currentToolUrl="/tools/url/youtube-thumbnail" max={6} />
      </div>
    </div>
  );
}
