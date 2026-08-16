import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import InstagramReelClient from "@/components/tools/social/instagram-reel-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Instagram Reel Hook & Viral Caption Generator",
  description: "Generate 3-second high-curiosity opening hooks and viral captions for Instagram Reels with live AI inference.",
  path: "/tools/social/instagram-reel-hooks",
  keywords: ["hooks", "with", "generate", "opening", "second", "viral", "captions", "instagram", "reels", "live", "high", "curiosity"],
});

export default function InstagramReelPage() {
  return (
    <><InstagramReelClient />
      <RelatedTools currentToolUrl="/tools/social/instagram-reel-hooks" />
    </>
  );
}
