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

<<<<<<< HEAD
export default function InstagramReelPage() {
  return (
    <><InstagramReelClient />
      <RelatedTools currentToolUrl="/tools/social/instagram-reel-hooks" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Instagram Reel Hook & Viral Caption Generator",
    description: "Generate 3-second high-curiosity opening hooks and viral captions for Instagram Reels with live AI inference.",
    path: "/tools/social/instagram-reel-hooks",
    categoryName: "Social",
    categoryPath: "/tools/social",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <InstagramReelClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
