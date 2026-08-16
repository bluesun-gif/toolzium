import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ValorantCrosshairClient from "@/components/tools/gaming/valorant-crosshair-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Valorant Pro Crosshair Generator & Code Converter",
  description: "Browse pro player Valorant crosshair codes (TenZ, Tarik, Demon1, Aspas) with 1-click Valorant import string copying.",
  path: "/tools/gaming/valorant-crosshair",
  keywords: ["with", "tarik", "valorant", "browse", "tenz", "codes", "aspas", "click", "import", "crosshair", "player"],
});

export default function ValorantCrosshairPage() {
  return (
    <><ValorantCrosshairClient />
      <RelatedTools currentToolUrl="/tools/gaming/valorant-crosshair" />
    </>
  );
}
