import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BoxShadowGeneratorClient from "@/components/tools/dev/box-shadow-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "CSS Box Shadow & Glassmorphism Generator — Live CSS Tool | Toolzium",
  description: "Create modern CSS box shadows, multi-layered drop shadows, and frosted Glassmorphism cards with real-time UI sliders. Copy production-ready CSS code instantly.",
  path: "/tools/dev/box-shadow-generator",
  keywords: ["with", "modern", "cards", "create", "layered", "glassmorphism", "real", "shadows", "multi", "frosted", "drop"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Box Shadow & Glassmorphism Generator — Live CSS Tool",
    description: "Create modern CSS box shadows, multi-layered drop shadows, and frosted Glassmorphism cards with real-time UI sliders. Copy production-ready CSS code instantly.",
    path: "/tools/dev/box-shadow-generator",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <BoxShadowGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/dev/box-shadow-generator" />
</>
  );
}
