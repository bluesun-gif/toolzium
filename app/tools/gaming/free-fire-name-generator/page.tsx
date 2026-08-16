import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FreeFireNameClient from "@/components/tools/gaming/free-fire-name-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Free Fire (FF) Nickname & Boss Squad Tag Studio",
  description: "Generate cool Free Fire nicknames, Boss style symbols, V.I.P tags, and invisible space characters for Garena Free Fire.",
  path: "/tools/gaming/free-fire-name-generator",
  keywords: ["invisible", "style", "nicknames", "generate", "space", "characters", "free", "boss", "fire", "tags", "symbols", "cool"],
});

export default function FreeFireNamePage() {
  return (
    <><FreeFireNameClient />
      <RelatedTools currentToolUrl="/tools/gaming/free-fire-name-generator" />
    </>
  );
}
