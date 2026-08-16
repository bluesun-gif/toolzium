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

export default function SteamBioPage() {
  return (
    <><SteamBioClient />
      <RelatedTools currentToolUrl="/tools/gaming/steam-bio-generator" />
    </>
  );
}
