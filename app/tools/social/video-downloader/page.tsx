import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import VideoDownloaderClient from "@/components/tools/social/video-downloader-client";
<<<<<<< HEAD
export const metadata: Metadata = {
  title: "Social Video Downloader — YouTube, TikTok, Instagram, Twitter | Toolzium",
=======

export const metadata = buildMetadata({
  title: "Social Video Downloader — Free 4K YouTube, TikTok & Reels Saver",
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
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
<<<<<<< HEAD
  return (
    <><VideoDownloaderClient />
      <RelatedTools currentToolUrl="/tools/social/video-downloader" />
=======
  const jsonLd = buildToolJsonLd({
    name: "Social Video Downloader",
    description:
      "Download videos from YouTube (up to 4K), TikTok (no watermark), Instagram Reels, Twitter, Facebook, Reddit, Vimeo, Pinterest, and 15+ more platforms. Free, fast, no signup.",
    path: "/tools/social/video-downloader",
    categoryName: "Social Media",
    categoryPath: "/tools/social",
    faqs: [
      {
        question: "Can I download TikTok videos without a watermark?",
        answer:
          "Yes! Our video downloader strips TikTok watermarks automatically and outputs clean HD video files.",
      },
      {
        question: "Is this video downloader 100% free with no limits?",
        answer:
          "Yes, Toolzium's video downloader is completely free for unlimited video downloads across all supported social platforms.",
      },
      {
        question: "What video resolutions are supported?",
        answer:
          "Depending on the source video quality, downloads are available in 720p, 1080p Full HD, 2K, and 4K Ultra HD formats.",
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VideoDownloaderClient />
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
    </>
  );
}
