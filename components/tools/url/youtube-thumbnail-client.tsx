"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Youtube, Loader2, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface ThumbnailInfo {
  url: string;
  quality: string;
  resolution: string;
  name: string;
}

export default function YoutubeThumbnailClient() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState<ThumbnailInfo[]>([]);

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

  const downloadThumbnail = async (thumbnailUrl: string, qualityName: string) => {
    try {
      // Direct client blob download to bypass browser page open where possible
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
    } catch (error) {
      // Fallback: open in new tab if CORS prevents direct fetching
      window.open(thumbnailUrl, "_blank");
    }
  };

  const handleClear = () => {
    setUrl("");
    setVideoId(null);
    setThumbnails([]);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <ToolPageHeader
        title="YouTube Thumbnail Downloader"
        description="Free online utility to grab, preview, and download YouTube video thumbnails in all available resolutions instantly."
      />

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {/* Input Column */}
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Input URL</CardTitle>
              <CardDescription>
                Paste a YouTube video, shorts, or embed URL below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGetThumbnails} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={loading}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Fetching...
                      </>
                    ) : (
                      <>
                        <Youtube className="mr-2 h-4 w-4" />
                        Get Thumbnails
                      </>
                    )}
                  </Button>
                  {(videoId || url) && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClear}
                      disabled={loading}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Results Column */}
        <div className="md:col-span-2 space-y-6">
          {videoId ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {thumbnails.map((t, idx) => (
                <Card key={idx} className="overflow-hidden flex flex-col justify-between">
                  <div className="relative aspect-video w-full bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.url}
                      alt={`${t.quality} preview`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // If maxresdefault fails (some videos don't have it), hide or show placeholder
                        if (t.name === "maxres") {
                          (e.target as HTMLElement).parentElement?.classList.add("hidden");
                        }
                      }}
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="backdrop-blur-md bg-background/70 text-foreground font-semibold">
                        {t.resolution}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 pt-3 pb-0">
                    <CardTitle className="text-sm font-bold">{t.quality}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => downloadThumbnail(t.url, t.name)}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Image
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center py-16 text-center">
              <CardContent className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/30">
                  <Youtube className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">No Video Selected</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mt-1">
                    Enter a YouTube video URL in the input panel to fetch and download high-resolution cover image assets.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* SEO Info section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">About YouTube Thumbnail Downloader</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3 leading-relaxed">
              <p>
                A video thumbnail acts as a billboard for creators to attract viewers on search feeds. The **YouTube Thumbnail Downloader** is designed for creators, designers, and researchers to fetch original cover assets directly.
              </p>
              <p>
                <strong>💡 Why use this downloader?</strong> Our tool extracts raw URLs directly from Google server CDNs and resolves them client-side inside your browser, meaning it is fast, free, and operates on-device without recording your download history.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
