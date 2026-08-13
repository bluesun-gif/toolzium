import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ValorantCrosshairClient from "@/components/tools/gaming/valorant-crosshair-client";

export const metadata = buildMetadata({
  title: "Valorant Pro Crosshair Generator & Code Converter",
  description: "Browse pro player Valorant crosshair codes (TenZ, Tarik, Demon1, Aspas) with 1-click Valorant import string copying.",
  path: "/tools/gaming/valorant-crosshair",
  keywords: ["with", "tarik", "valorant", "browse", "tenz", "codes", "aspas", "click", "import", "crosshair", "player"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Valorant Pro Crosshair Generator & Code Converter",
    description: "Browse pro player Valorant crosshair codes (TenZ, Tarik, Demon1, Aspas) with 1-click Valorant import string copying.",
    path: "/tools/gaming/valorant-crosshair",
    categoryName: "Gaming",
    categoryPath: "/tools/gaming",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ValorantCrosshairClient />
    </div>
  );
}
