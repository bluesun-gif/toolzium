import { Metadata } from "next";
import TikTokCaptionClient from "@/components/tools/social/tiktok-caption-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "TikTok Viral Caption & Hashtag Hook Studio | Toolzium",
  description:
    "Generate high-converting TikTok captions, viral opening hooks, storytime openers, and trending hashtag clusters.",
};

export default function TikTokCaptionPage() {
  return (
    <><TikTokCaptionClient />
      <RelatedTools currentToolUrl="/tools/social/tiktok-caption-generator" />
    </>
  );
}
