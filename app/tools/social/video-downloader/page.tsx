import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import VideoDownloaderClient from "@/components/tools/social/video-downloader-client";
export const metadata: Metadata = {
  title: "Social Video Downloader — YouTube, TikTok, Instagram, Twitter | Toolzium",
  description:
    "Download videos from YouTube (up to 4K), TikTok (no watermark), Instagram Reels, Twitter, Facebook, Reddit, Vimeo, Pinterest, and 15+ more platforms. Free, fast, no signup.",
  path: "/tools/social/video-downloader",
  keywords: [
    "video downloader",
    "youtube downloader",
    "tiktok downloader no watermark",
    "instagram reel downloader",
    "twitter video downloader",
    "facebook video downloader",
    "reddit video downloader",
    "social media video downloader",
    "free video downloader",
    "4K video downloader",
  ],
});

export default function VideoDownloaderPage() {
  return (
    <><VideoDownloaderClient />
      <RelatedTools currentToolUrl="/tools/social/video-downloader" />
    </>
  );
}
