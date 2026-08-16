import JsonLd from "@/components/seo/json-ld";
import YoutubeThumbnailClient from "@/components/tools/url/youtube-thumbnail-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "YouTube Thumbnail Downloader — Get High-Quality HD Covers",
  description:
    "Free online YouTube Thumbnail Downloader tool to extract and download YouTube video cover images in MaxRes, HD, Standard, and Medium qualities instantly.",
  path: "/tools/url/youtube-thumbnail",
  keywords: [
    "youtube thumbnail downloader",
    "download youtube thumbnail",
    "grab youtube cover",
    "youtube image extractor",
    "youtube thumbnail size",
    "maxresdefault download",
    "youtube shorts thumbnail",
    "Toolzium",
    "online tools",
  ],
});

export default function YoutubeThumbnailPage() {
  const toolUrl = `${siteURL}/tools/url/youtube-thumbnail`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "YouTube Thumbnail Downloader — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description:
      "Extract and download YouTube video cover images in MaxRes, HD, Standard, and Medium qualities instantly.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Extract MaxRes default cover",
      "Standard, medium, and low definition fallback",
      "Shorts, embed, and watch link parsing",
      "Direct client-side blob download",
    ],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "URL & Text", item: `${siteURL}/tools#cat-url` },
      { "@type": "ListItem", position: 3, name: "YouTube Thumbnail Downloader", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I download a YouTube thumbnail?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply copy the YouTube video URL from your browser or app, paste it into our tool input field, and click 'Get Thumbnails'. You will instantly see preview images in various quality sizes with direct download options.",
        },
      },
      {
        "@type": "Question",
        name: "Is it legal to download YouTube video thumbnails?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, downloading thumbnails for personal use, design references, mood boards, or custom playlists is generally fine. However, using another creator's copyrighted artwork in your own videos without permission is a copyright violation.",
        },
      },
      {
        "@type": "Question",
        name: "What thumbnail sizes and qualities can I download?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can download thumbnails in maximum resolution (HD 1080p or 720p depending on the upload quality), Standard Definition (640x485), Medium Definition (320x180), and Default Quality (120x90).",
        },
      },
      {
        "@type": "Question",
        name: "Why does the Maximum Resolution (MaxRes) download fail or look blank?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Maximum Resolution (MaxRes) defaults are only available if the creator uploaded a high-definition video (720p or higher) and set a custom thumbnail. If the video was uploaded in lower quality or uses an auto-selected frame, YouTube does not generate the maxresdefault asset.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download thumbnails from YouTube Shorts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our tool is optimized to parse YouTube Shorts URLs, embed codes, and mobile sharing links, extracting the correct video ID to fetch the cover images instantly.",
        },
      },
    ],
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <YoutubeThumbnailClient />
    
      <RelatedTools currentToolUrl="/tools/url/youtube-thumbnail" />
</div>
  );
}
