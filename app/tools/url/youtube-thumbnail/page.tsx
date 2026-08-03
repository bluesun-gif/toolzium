import { Metadata } from "next";
import YoutubeThumbnailClient from "@/components/tools/url/youtube-thumbnail-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "YouTube Thumbnail Downloader — Get High-Quality HD Thumbnails",
  description:
    "Free online YouTube Thumbnail Downloader tool to extract and download YouTube video thumbnails in MaxRes, HD, Standard, and Medium qualities instantly. 100% free, no login required.",
  path: "/tools/url/youtube-thumbnail",
});

export default function YoutubeThumbnailPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I download a YouTube thumbnail?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply copy the YouTube video URL from your browser or app, paste it into our tool input field, and click 'Get Thumbnails'. You will instantly see preview images in various quality sizes with direct download links.",
        },
      },
      {
        "@type": "Question",
        name: "Is it legal to download YouTube video thumbnails?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, downloading thumbnails for personal use, reference, inspiration, or custom playlists is generally fine. However, using other creators' copyrighted artwork in your own videos without permission is not recommended.",
        },
      },
      {
        "@type": "Question",
        name: "What qualities can I download?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can download thumbnails in Max Resolution (HD 1080p/720p depending on upload), Standard Quality (640x480), Medium Quality (320x180), and Default Quality (120x90).",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <YoutubeThumbnailClient />
    </>
  );
}
