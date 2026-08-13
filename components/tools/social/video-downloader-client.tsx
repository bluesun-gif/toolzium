"use client";

import React, { useState } from "react";
import {
  Download,
  Link,
  Loader2,
  Music,
  Video,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Youtube,
  Instagram,
  Twitter,
  ChevronDown,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

type DownloadMode = "auto" | "audio" | "mute";
type VideoQuality = "max" | "2160" | "1440" | "1080" | "720" | "480" | "360" | "240";
type AudioFormat = "best" | "mp3" | "ogg" | "wav" | "opus";

type PickerItem = {
  type: "photo" | "video";
  url: string;
  thumb?: string;
};

type QualityOption = { itag: number; label: string; url: string };

type DownloadResult =
  | { status: "redirect" | "tunnel" | "stream"; url: string; filename?: string; title?: string; thumbnail?: string; duration?: string; platform?: string; quality?: string; availableQualities?: QualityOption[] }
  | { status: "picker"; picker: PickerItem[]; audio?: string; title?: string; thumbnail?: string }
  | { status: "error"; error: { code: string } };

const SUPPORTED_PLATFORMS = [
  { name: "YouTube", icon: Youtube, color: "text-red-500" },
  { name: "TikTok", icon: Video, color: "text-pink-500" },
  { name: "Instagram", icon: Instagram, color: "text-primary" },
  { name: "Twitter / X", icon: Twitter, color: "text-sky-500" },
  { name: "Facebook", icon: Video, color: "text-primary" },
  { name: "Reddit", icon: Video, color: "text-orange-500" },
  { name: "Pinterest", icon: Video, color: "text-red-400" },
  { name: "Vimeo", icon: Video, color: "text-cyan-500" },
  { name: "Twitch", icon: Video, color: "text-violet-500" },
  { name: "Bilibili", icon: Video, color: "text-primary" },
  { name: "SoundCloud", icon: Music, color: "text-orange-400" },
  { name: "Dailymotion", icon: Video, color: "text-primary" },
];

function detectPlatform(url: string): string {
  if (!url) return "";
  if (/youtube\.com|youtu\.be/i.test(url)) return "YouTube";
  if (/tiktok\.com/i.test(url)) return "TikTok";
  if (/instagram\.com/i.test(url)) return "Instagram";
  if (/twitter\.com|x\.com/i.test(url)) return "Twitter / X";
  if (/facebook\.com|fb\.com/i.test(url)) return "Facebook";
  if (/reddit\.com/i.test(url)) return "Reddit";
  if (/pinterest\.com/i.test(url)) return "Pinterest";
  if (/vimeo\.com/i.test(url)) return "Vimeo";
  if (/twitch\.tv/i.test(url)) return "Twitch";
  if (/bilibili\.com/i.test(url)) return "Bilibili";
  if (/soundcloud\.com/i.test(url)) return "SoundCloud";
  if (/dailymotion\.com/i.test(url)) return "Dailymotion";
  return "";
}

export default function VideoDownloaderClient() {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState<DownloadMode>("auto");
  const [quality, setQuality] = useState<VideoQuality>("1080");
  const [audioFormat, setAudioFormat] = useState<AudioFormat>("mp3");
  const [tiktokNoWatermark, setTiktokNoWatermark] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState("");

  const detectedPlatform = detectPlatform(url);
  const isTikTok = detectedPlatform === "TikTok";

  const handleDownload = async () => {
    if (!url.trim()) {
      setError("Please paste a video URL first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload: Record<string, unknown> = {
        url: url.trim(),
        downloadMode: mode,
        videoQuality: quality,
        audioFormat,
      };

      if (isTikTok) {
        payload.tiktokWatermark = !tiktokNoWatermark;
      }

      const res = await fetch("/api/video-downloader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: DownloadResult = await res.json();

      if (!res.ok) {
        const errMsg = (data as { error?: string }).error ?? "Download failed. Please check the URL and try again.";
        setError(errMsg);
        return;
      }

      if (data.status === "error") {
        const errData = data as { status: "error"; error: { code: string } };
        setError(errData?.error?.code ?? "Download failed. Please check the URL and try again.");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDirectDownload = (downloadUrl: string, filename?: string) => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename ?? "download";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full min-h-screen pb-20 relative">
      <GridPattern />

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader
          icon={Download}
          title="Social Video & Reels Downloader Studio"
          description="Download videos from YouTube, TikTok, Instagram, Twitter/X, Facebook, Reddit, and 15+ platforms without watermarks in up to 4K quality."
        />

        {/* Platform badges */}
        <div className="flex flex-wrap justify-center gap-2">
          {SUPPORTED_PLATFORMS.map((p) => (
            <Badge
              key={p.name}
              variant="outline"
              className="text-xs gap-1.5 py-1 px-3 bg-card/70 border-border text-foreground font-semibold"
            >
              <p.icon className={`w-3.5 h-3.5 ${p.color}`} />
              {p.name}
            </Badge>
          ))}
        </div>

        {/* WORKSPACE */}
        <GlassCard className="p-6 md:p-8 space-y-6 bg-background border-border shadow-sm rounded-2xl">
          {/* URL Input */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-foreground flex items-center gap-2">
              <Link className="w-4 h-4 text-primary" />
              Paste Video URL
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="https://www.youtube.com/watch?v=... or any social video URL"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setResult(null);
                  setError("");
                }}
                className="text-sm font-mono bg-background border-border text-foreground"
              />
              {detectedPlatform && (
                <Badge variant="outline" className="shrink-0 px-3 bg-primary/10 text-primary border-primary/20 font-bold">
                  {detectedPlatform}
                </Badge>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Download Mode */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground">Download Mode</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as DownloadMode)}>
                <SelectTrigger className="bg-background border-border text-foreground text-xs font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" /> Video + Audio
                    </div>
                  </SelectItem>
                  <SelectItem value="audio">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4" /> Audio Only
                    </div>
                  </SelectItem>
                  <SelectItem value="mute">
                    <div className="flex items-center gap-2">
                      <VolumeX className="w-4 h-4" /> Video Only (No Audio)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quality */}
            {mode !== "audio" && (
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">Video Quality</Label>
                <Select value={quality} onValueChange={(v) => setQuality(v as VideoQuality)}>
                  <SelectTrigger className="bg-background border-border text-foreground text-xs font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="max">Best Available</SelectItem>
                    <SelectItem value="2160">4K (2160p)</SelectItem>
                    <SelectItem value="1440">1440p (2K)</SelectItem>
                    <SelectItem value="1080">1080p (Full HD)</SelectItem>
                    <SelectItem value="720">720p (HD)</SelectItem>
                    <SelectItem value="480">480p (SD)</SelectItem>
                    <SelectItem value="360">360p</SelectItem>
                    <SelectItem value="240">240p</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Audio Format */}
            {mode === "audio" && (
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">Audio Format</Label>
                <Select value={audioFormat} onValueChange={(v) => setAudioFormat(v as AudioFormat)}>
                  <SelectTrigger className="bg-background border-border text-foreground text-xs font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best">Best Quality</SelectItem>
                    <SelectItem value="mp3">MP3</SelectItem>
                    <SelectItem value="ogg">OGG</SelectItem>
                    <SelectItem value="wav">WAV</SelectItem>
                    <SelectItem value="opus">Opus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* TikTok watermark toggle */}
            {isTikTok && mode !== "audio" && (
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">TikTok Watermark</Label>
                <div className="flex items-center gap-3 h-10 px-3 rounded-xl border border-border bg-background">
                  <Switch
                    id="tiktok-wm"
                    checked={tiktokNoWatermark}
                    onCheckedChange={setTiktokNoWatermark}
                  />
                  <label htmlFor="tiktok-wm" className="text-xs cursor-pointer font-semibold">
                    {tiktokNoWatermark ? (
                      <span className="text-emerald-500">No Watermark</span>
                    ) : (
                      <span className="text-muted-foreground">With Watermark</span>
                    )}
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Download Button */}
          <Button
            onClick={handleDownload}
            disabled={loading || !url.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 rounded-xl h-12 text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Fetching download link…
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Get Download Link
              </>
            )}
          </Button>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Download Failed</p>
                <p className="opacity-90">{error}</p>
              </div>
            </div>
          )}

          {/* Result */}
          {result && result.status !== "error" && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 space-y-4 text-xs">
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Download link ready!</span>
              </div>

              {/* Video metadata card */}
              {"title" in result && result.title && (
                <div className="flex gap-3 p-3 rounded-xl bg-card border border-border">
                  {"thumbnail" in result && result.thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={result.thumbnail}
                      alt={result.title}
                      className="w-24 h-16 object-cover rounded-lg shrink-0"
                    />
                  )}
                  <div className="min-w-0 space-y-1">
                    <p className="font-bold text-foreground line-clamp-2">{result.title}</p>
                    <div className="flex flex-wrap gap-2">
                      {"platform" in result && result.platform && (
                        <Badge variant="outline" className="text-[10px]">{result.platform}</Badge>
                      )}
                      {"quality" in result && result.quality && (
                        <Badge variant="secondary" className="text-[10px]">{result.quality}</Badge>
                      )}
                      {"duration" in result && result.duration && (
                        <Badge variant="secondary" className="text-[10px]">⏱ {result.duration}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Stream / Redirect / Tunnel download buttons */}
              {(result.status === "redirect" || result.status === "tunnel" || result.status === "stream") && (
                <div className="space-y-3">
                  {"filename" in result && result.filename && (
                    <p className="text-xs text-muted-foreground font-mono truncate">
                      📁 {result.filename}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        handleDirectDownload(
                          (result as { url: string }).url,
                          (result as { filename?: string }).filename
                        )
                      }
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 rounded-xl"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Now
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open((result as { url: string }).url, "_blank")}
                      title="Open in new tab"
                      className="h-10 rounded-xl border-border"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Alternative quality options for YouTube */}
                  {"availableQualities" in result && result.availableQualities && result.availableQualities.length > 1 && (
                    <div className="space-y-1 pt-1">
                      <p className="text-xs text-muted-foreground font-semibold">Other available qualities:</p>
                      <div className="flex flex-wrap gap-2">
                        {result.availableQualities.map((q) => (
                          <Button
                            key={q.itag}
                            variant="outline"
                            size="sm"
                            className="text-xs h-8 border-border font-semibold"
                            onClick={() => handleDirectDownload(q.url, result.filename?.replace(/\.[^.]+$/, `.mp4`) ?? `video_${q.label}.mp4`)}
                          >
                            {q.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Picker (multiple items e.g. Instagram carousel) */}
              {result.status === "picker" && (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground font-medium">
                    Multiple items found ({result.picker.length}). Click each to download:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {result.picker.map((item, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        onClick={() => handleDirectDownload(item.url)}
                        className="gap-2 border-border font-semibold"
                      >
                        {item.type === "video" ? (
                          <Video className="w-4 h-4" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                        Item {i + 1}
                      </Button>
                    ))}
                  </div>
                  {result.audio && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDirectDownload(result.audio!)}
                      className="gap-2 border-border font-semibold"
                    >
                      <Volume2 className="w-4 h-4" />
                      Download Audio Track
                    </Button>
                  )}
                </div>
              )}

              <p className="text-[11px] text-muted-foreground">
                💡 If the download opens in the browser instead of saving, right-click the video and choose &quot;Save video as&quot;
              </p>
            </div>
          )}

          {/* Usage note */}
          <p className="text-xs text-muted-foreground text-center">
            ⚠️ Only download videos you have rights to download. Respect copyright and platform terms of service.
          </p>
        </GlassCard>

        {/* HOW IT WORKS */}
        <ToolHowItWorks
          steps={[
            {
              step: "01",
              title: "Paste the Video URL",
              description:
                "Copy the URL of any video from YouTube, TikTok, Instagram, Twitter, Facebook, Reddit, Vimeo, or 15+ other platforms and paste it into the input field.",
              icon: Link,
            },
            {
              step: "02",
              title: "Choose Quality & Format",
              description:
                "Select your preferred video quality (up to 4K), download mode (video+audio, audio only, or mute), and for TikTok — toggle the watermark off.",
              icon: ChevronDown,
            },
            {
              step: "03",
              title: "Download Instantly",
              description:
                "Click 'Get Download Link' and your file will be ready in seconds. Click Download Now to save it directly to your device — no signup required.",
              icon: Download,
            },
          ]}
          badges={["20+ platforms", "No watermark (TikTok)", "Up to 4K quality"]}
        />

        {/* FEATURE GUIDES */}
        <ToolFeatureGuides
          features={[
            {
              icon: Youtube,
              title: "YouTube — Up to 4K",
              description:
                "Download any public YouTube video in 240p to 4K resolution. Choose video+audio (MP4), audio only (MP3), or video-only. Supports Shorts, regular videos, and playlists.",
            },
            {
              icon: Video,
              title: "TikTok — No Watermark",
              description:
                "Download TikTok videos without the @username watermark in the corner. Toggle between watermark and no-watermark versions. Also supports audio-only downloads.",
            },
            {
              icon: Instagram,
              title: "Instagram — Reels, Posts & Carousels",
              description:
                "Download Instagram Reels, regular video posts, and carousel posts with multiple media items. Each item in a carousel is individually downloadable.",
            },
            {
              icon: Twitter,
              title: "Twitter / X — All Qualities",
              description:
                "Download videos from tweets in the best available quality. Works with regular tweets, quote tweets, and threads containing video media.",
            },
            {
              icon: Music,
              title: "Audio Extraction",
              description:
                "Extract audio from any video in MP3, OGG, WAV, or Opus format. Perfect for downloading music, podcasts, interviews, and speech from video content.",
            },
            {
              icon: Download,
              title: "Facebook, Reddit & More",
              description:
                "Works with Facebook videos, Reddit video posts, Pinterest videos, Vimeo, Twitch clips, Bilibili, SoundCloud, Dailymotion, and 10+ additional platforms.",
            },
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4 mt-6">
            <h3 className="text-lg font-bold text-foreground">
              Supported Platforms — Full Compatibility Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-muted/50 border-b border-border text-foreground">
                    <th className="p-2.5 text-left font-bold">Platform</th>
                    <th className="p-2.5 text-left font-bold">Video</th>
                    <th className="p-2.5 text-left font-bold">Audio</th>
                    <th className="p-2.5 text-left font-bold">No Watermark</th>
                    <th className="p-2.5 text-left font-bold">Max Quality</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["YouTube", "✅", "✅ MP3/OGG/WAV", "N/A", "4K (2160p)"],
                    ["TikTok", "✅", "✅", "✅ Yes", "1080p"],
                    ["Instagram", "✅ Reels/Posts/Carousels", "✅", "N/A", "1080p"],
                    ["Twitter / X", "✅", "✅", "N/A", "720p"],
                    ["Facebook", "✅", "✅", "N/A", "1080p"],
                    ["Reddit", "✅", "✅", "N/A", "1080p"],
                    ["Pinterest", "✅", "✅", "N/A", "720p"],
                    ["Vimeo", "✅", "✅", "N/A", "4K"],
                    ["Twitch Clips", "✅", "✅", "N/A", "1080p"],
                    ["SoundCloud", "N/A", "✅ MP3", "N/A", "320kbps"],
                    ["Bilibili", "✅", "✅", "N/A", "1080p"],
                    ["Dailymotion", "✅", "✅", "N/A", "1080p"],
                  ].map(([platform, video, audio, wm, quality]) => (
                    <tr key={platform} className="border-b border-border/50 text-muted-foreground">
                      <td className="p-2.5 font-bold text-foreground">{platform}</td>
                      <td className="p-2.5">{video}</td>
                      <td className="p-2.5">{audio}</td>
                      <td className="p-2.5">{wm}</td>
                      <td className="p-2.5 font-mono text-primary font-bold">{quality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ToolFeatureGuides>

        {/* FAQ */}
        <ToolFaqAccordion
          faqs={[
            {
              question: "Is this video downloader free?",
              answer:
                "Yes, completely free with no signup, no limits, and no ads injected into downloads. You can download as many videos as you need.",
            },
            {
              question: "How do I download a TikTok video without a watermark?",
              answer:
                "Paste the TikTok video URL, make sure the 'No Watermark' toggle is enabled (it's on by default for TikTok), and click Download. The tool fetches the original video file without the @username watermark overlay.",
            },
            {
              question: "Why is my YouTube video not downloading?",
              answer:
                "YouTube may restrict downloads for age-restricted videos, live streams, or region-blocked content. Try a different quality setting (720p instead of 1080p) or try downloading audio-only. Private and members-only videos cannot be downloaded.",
            },
            {
              question: "Can I download Instagram Reels?",
              answer:
                "Yes. Paste the Instagram Reel URL (e.g., instagram.com/reel/...) and click Download. For carousels (multiple photos/videos in one post), the tool shows each item separately so you can download them individually.",
            },
            {
              question: "Is it legal to download videos?",
              answer:
                "Downloading videos for personal, offline viewing may be acceptable in some jurisdictions. However, downloading copyrighted content without permission for commercial use, redistribution, or public display is generally illegal. Always respect copyright, creative rights, and platform terms of service. Only download content you have rights to access.",
            },
            {
              question: "Why does the download open in a new tab instead of saving?",
              answer:
                "Some platforms serve videos with streaming headers that cause the browser to play rather than download. In that case, right-click the opened video and select 'Save video as...' to download it manually. On mobile, tap and hold the video to see download options.",
            },
          ]}
        />
        <RelatedTools currentToolUrl="/tools/social/video-downloader" max={6} />
      </div>
    </div>
  );
}
