import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TikTokCaptionClient from "@/components/tools/social/tiktok-caption-client";
import RelatedTools from "@/components/shared/related-tools";

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
  return (
    <><TikTokCaptionClient />
      <RelatedTools currentToolUrl="/tools/social/tiktok-caption-generator" />
    </>
  );
}
