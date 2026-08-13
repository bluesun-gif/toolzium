import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TikTokCaptionClient from "@/components/tools/social/tiktok-caption-client";
import { siteURL } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "TikTok Viral Caption & Hashtag Hook Studio | Toolzium",
  description:
    "Generate high-converting TikTok captions, viral opening hooks, storytime openers, and trending hashtag clusters.",
  path: "/tools/social/tiktok-caption-generator",
  keywords: [
    "tiktok caption generator",
    "tiktok caption ai",
    "viral tiktok captions",
    "tiktok hook generator",
    "tiktok hashtag generator",
    "tiktok caption maker",
    "ai caption generator",
    "short form video captions",
  ],
});

export default function TikTokCaptionPage() {
  const toolUrl = `${siteURL}/tools/social/tiktok-caption-generator`;

  const jsonLd = buildToolJsonLd({
    name: "TikTok Viral Caption Generator",
    description:
      "Generate high-converting TikTok captions, viral opening hooks, storytime openers, and trending hashtag clusters.",
    path: "/tools/social/tiktok-caption-generator",
    categoryName: "Social Media Tools",
    categoryPath: "/tools/social",
  });

  return (
    <div className="space-y-4">
      <JsonLd data={jsonLd[0]} />
      <JsonLd data={jsonLd[1]} />
      <JsonLd data={jsonLd[2]} />
      <TikTokCaptionClient />
    </div>
  );
}
