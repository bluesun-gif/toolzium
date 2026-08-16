import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SteamBioClient from "@/components/tools/gaming/steam-bio-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Steam Profile Bio & Layout Decorator",
  description: "Generate aesthetic Steam profile bios, hardware spec boxes, CS2/Dota 2 rank tags, and custom artwork spacers.",
  path: "/tools/gaming/steam-bio-generator",
  keywords: ["aesthetic", "profile", "generate", "steam", "bios", "hardware", "spec", "boxes", "rank", "custom", "tags", "dota"],
});

<<<<<<< HEAD
export default function SteamBioPage() {
  return (
    <><SteamBioClient />
      <RelatedTools currentToolUrl="/tools/gaming/steam-bio-generator" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Steam Profile Bio & Layout Decorator",
    description: "Generate aesthetic Steam profile bios, hardware spec boxes, CS2/Dota 2 rank tags, and custom artwork spacers.",
    path: "/tools/gaming/steam-bio-generator",
    categoryName: "Gaming",
    categoryPath: "/tools/gaming",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SteamBioClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
