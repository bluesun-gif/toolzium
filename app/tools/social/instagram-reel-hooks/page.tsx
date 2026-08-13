import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import InstagramReelClient from "@/components/tools/social/instagram-reel-client";

export const metadata = buildMetadata({
  title: "Instagram Reel Hook & Viral Caption Generator",
  description: "Generate 3-second high-curiosity opening hooks and viral captions for Instagram Reels with live AI inference.",
  path: "/tools/social/instagram-reel-hooks",
  keywords: ["hooks", "with", "generate", "opening", "second", "viral", "captions", "instagram", "reels", "live", "high", "curiosity"],
});

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
  );
}
