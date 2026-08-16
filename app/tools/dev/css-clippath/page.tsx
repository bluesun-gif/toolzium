import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssClippathClient from "@/components/tools/dev/css-clippath-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "CSS Clip-Path Maker",
  description: "Interactive CSS clip-path generator. Polygon, circle, ellipse, inset, star, hexagon, arrow. Live handles, CSS output.",
  path: "/tools/dev/css-clippath",
  keywords: ["interactive", "arrow", "circle", "star", "generator", "inset", "hexagon", "polygon", "path", "ellipse", "live", "clip"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Clip-Path Maker",
    description: "Interactive CSS clip-path generator. Polygon, circle, ellipse, inset, star, hexagon, arrow. Live handles, CSS output.",
    path: "/tools/dev/css-clippath",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CssClippathClient />
    
      <RelatedTools currentToolUrl="/tools/dev/css-clippath" />
</div>
  );
}
