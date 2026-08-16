import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MlbbNameClient from "@/components/tools/gaming/mlbb-name-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Mobile Legends (MLBB) Fancy Name & Symbol Generator",
  description: "Generate cool, aesthetic Japanese Kanji, Gothic symbols, squad tags, and fancy font nicknames for Mobile Legends Bang Bang.",
  path: "/tools/gaming/mlbb-name-generator",
  keywords: ["aesthetic", "japanese", "nicknames", "generate", "gothic", "squad", "font", "kanji", "fancy", "tags", "symbols", "cool"],
});

export default function MlbbNamePage() {
  return (
    <><MlbbNameClient />
      <RelatedTools currentToolUrl="/tools/gaming/mlbb-name-generator" />
    </>
  );
}
