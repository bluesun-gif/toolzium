import { Metadata } from "next";
import InstagramReelClient from "@/components/tools/social/instagram-reel-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "Instagram Reel Hook & Viral Caption Generator | Toolzium",
  description:
    "Generate 3-second high-curiosity opening hooks and viral captions for Instagram Reels with live AI inference.",
};

export default function InstagramReelPage() {
  return (
    <><InstagramReelClient />
      <RelatedTools currentToolUrl="/tools/social/instagram-reel-hooks" />
    </>
  );
}
