import { Metadata } from "next";
import TikTokCaptionClient from "@/components/tools/social/tiktok-caption-client";

export const metadata: Metadata = {
  title: "TikTok Viral Caption & Hashtag Hook Studio | Toolzium",
  description:
    "Generate high-converting TikTok captions, viral opening hooks, storytime openers, and trending hashtag clusters.",
};

export default function TikTokCaptionPage() {
  return <TikTokCaptionClient />;
}
