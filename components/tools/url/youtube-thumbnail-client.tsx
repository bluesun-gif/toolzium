"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Youtube, Loader2, RefreshCw, ShieldCheck, FileImage, Image, History, FileText } from "lucide-react";
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

  const steps = [
    {
      step: "01",
      title: "Paste Video Link",
      description: "Copy any valid YouTube watch, shorts, embed, or sharing URL and paste it in.",
      icon: Youtube,
    },
    {
      step: "02",
      title: "Extract Cover ID",
      description: "The tool extracts the unique 11-character video ID client-side in milliseconds.",
      icon: FileText,
    },
    {
      step: "03",
      title: "Download Quality",
      description: "Pre-rendered card links load direct media server assets. Click to download as a local JPG file.",
      icon: Download,
    },
  ];

  const features = [
    {
      title: "Multiple Qualities",
      description: "Extract MaxRes HD, Standard, Medium, and Default quality cover variations.",
      icon: FileImage,
    },
    {
      title: "Smart URL Parser",
      description: "Compatible with standard desktop watches, shorts, embeds, and mobile shortlinks.",
      icon: Youtube,
    },
    {
      title: "Direct JPG Downloads",
      description: "Generates quick client-side blob downloads to save cover assets straight to your device.",
      icon: Download,
    },
    {
      title: "Secure & On-Device",
      description: "Zero external storage. Parsing is done fully in-browser keeping downloads safe and private.",
      icon: ShieldCheck,
    },
    {
      title: "Auto Failback Filtering",
      description: "Cleverly filters out resolutions not uploaded by the creator to ensure no blank placeholders.",
      icon: Image,
    },
    {
      title: "History Free",
      description: "No remote account tracking or database logs are kept, enabling unlimited free queries.",
      icon: History,
    },
  ];

  const faqs = [
    {
      question: "How do I download a YouTube thumbnail?",
      answer: "Simply copy the YouTube video URL from your browser or app, paste it into our tool input field, and click 'Get Thumbnails'. You will instantly see preview images in various quality sizes with direct download options.",
    },
    {
      question: "Is it legal to download YouTube video thumbnails?",
      answer: "Yes, downloading thumbnails for personal use, design references, mood boards, or custom playlists is generally fine. However, using another creator's copyrighted artwork in your own videos without permission is a copyright violation.",
    },
    {
      question: "What thumbnail sizes and qualities can I download?",
      answer: "You can download thumbnails in maximum resolution (HD 1080p or 720p depending on the upload quality), Standard Definition (640x485), Medium Definition (320x180), and Default Quality (120x90).",
    },
    {
      question: "Why does the Maximum Resolution (MaxRes) download fail or look blank?",
      answer: "Maximum Resolution (MaxRes) defaults are only available if the creator uploaded a high-definition video (720p or higher) and set a custom thumbnail. If the video was uploaded in lower quality or uses an auto-selected frame, YouTube does not generate the maxresdefault asset.",
    },
    {
      question: "Can I download thumbnails from YouTube Shorts?",
      answer: "Yes. Our tool is optimized to parse YouTube Shorts URLs, embed codes, and mobile sharing links, extracting the correct video ID to fetch the cover images instantly.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        title="YouTube Thumbnail Downloader"
        description="Free online utility to grab, preview, and download YouTube video thumbnails in all available resolutions instantly."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Input Column */}
        <div className="md:col-span-1">
          <Card className="sticky top-24 border border-muted/50">
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
                  <Button type="submit" className="flex-1 cursor-pointer" disabled={loading}>
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
                      className="cursor-pointer"
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
                <Card key={idx} className="overflow-hidden flex flex-col justify-between border border-muted/50">
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
                      className="w-full flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                      Download Image
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center py-16 text-center border border-muted/50">
              <CardContent className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/30 mx-auto">
                  <Youtube className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">No Video Selected</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mt-1 mx-auto">
                    Enter a YouTube video URL in the input panel to fetch and download high-resolution cover image assets.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks steps={steps} />

      {/* SECTION 4: FEATURE HIGHLIGHTS & DEEP SEO GUIDE */}
      <ToolFeatureGuides features={features}>
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
          <h3 className="text-xl font-semibold text-foreground">How Video Thumbnails Drive Click-Through Rate (CTR)</h3>
          <p>
            On YouTube, a video thumbnail is the single most critical factor influencing a viewer&apos;s decision to click, representing up to 90% of the visual hook for search results. A custom thumbnail acts as a movie poster or billboard. Creators invest significant resources into composing high-contrast layouts, typography, and emotive expressions. Downloading existing thumbnails serves as an essential research practice to perform competitor analysis, build design inspiration, and construct high-fidelity mood boards.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Official YouTube Thumbnail Size and Resolution Rules</h3>
          <p>
            When uploading custom thumbnails, YouTube enforces specific technical standards to prevent cropping or pixelation on large Smart TV screens and mobile displays:
          </p>
          <table className="w-full border-collapse text-xs border border-border rounded-lg overflow-hidden my-4">
            <thead className="bg-muted text-foreground">
              <tr>
                <th className="border border-border p-2 text-left">Quality Format</th>
                <th className="border border-border p-2 text-left">Standard Resolution</th>
                <th className="border border-border p-2 text-left">Aspect Ratio</th>
                <th className="border border-border p-2 text-left">CDN File Path</th>
                <th className="border border-border p-2 text-left">Recommended Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2 font-medium">Max Resolution (HD)</td>
                <td className="border border-border p-2">1280 x 720 (or 1920 x 1080)</td>
                <td className="border border-border p-2">16:9 widescreen</td>
                <td className="border border-border p-2"><code>maxresdefault.jpg</code></td>
                <td className="border border-border p-2">Primary upload standard, crisp retina layouts</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">Standard Definition (SD)</td>
                <td className="border border-border p-2">640 x 480</td>
                <td className="border border-border p-2">4:3 standard</td>
                <td className="border border-border p-2"><code>sddefault.jpg</code></td>
                <td className="border border-border p-2">Default fallback sizing for tablet/mobile listings</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">Medium Quality (MQ)</td>
                <td className="border border-border p-2">320 x 180</td>
                <td className="border border-border p-2">16:9 miniature</td>
                <td className="border border-border p-2"><code>mqdefault.jpg</code></td>
                <td className="border border-border p-2">Related video sidebar lists, carousel sliders</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">Default Quality (LQ)</td>
                <td className="border border-border p-2">120 x 90</td>
                <td className="border border-border p-2">4:3 thumbnail</td>
                <td className="border border-border p-2"><code>default.jpg</code></td>
                <td className="border border-border p-2">Search results listings feed, email notifications</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold text-foreground">Understanding the YouTube Media Server CDN</h3>
          <p>
            When a video is uploaded, Google&apos;s processing servers automatically generate multiple scaled crops of the thumbnail image, storing them on the high-availability Google User Content Content Delivery Network (CDN) at <code>img.youtube.com</code> and <code>i.ytimg.com</code>. This utility pings those endpoints directly using the unique 11-character video ID, pulling the raw files straight to your browser on-demand.
          </p>
          <p>
            <strong>Why is a video missing a Max Resolution Cover?</strong> If a creator uploads a lower-resolution video (under 720p) or did not upload a custom cover file, YouTube&apos;s backend will not generate a <code>maxresdefault.jpg</code> asset. If you download this version and it appears blank, simply use the <code>Standard Definition</code> or <code>Medium Definition</code> fallbacks, which are guaranteed to exist for every active video.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Copyright, Fair Use, and Creative Ethics</h3>
          <p>
            Downloading thumbnails is a legal activity when used for reference, research, or personal offline collections under the **Fair Use** doctrine. However, reusing another creator&apos;s custom cover art as the primary thumbnail of your own public video without permission violates YouTube&apos;s Community Guidelines and copyright policies. Such actions can result in video takedowns, metadata strikes, or search penalties. Utilize downloaded covers ethically—as layout blueprints or reference examples—while designing your own distinct visual assets.
          </p>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ & RELATED TOOLS */}
      <ToolFaqAccordion faqs={faqs} />
      <RelatedTools currentToolUrl="/tools/url/youtube-thumbnail" max={6} />
    </div>
  );
}
