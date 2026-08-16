import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssRadiusClient from "@/components/tools/dev/css-radius-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "CSS Border-Radius Shape Generator",
  description: "8-point fancy blob and custom CSS border-radius generator. Organic blobs, pills, badges, leaves, live animation preview.",
  path: "/tools/dev/css-radius",
  keywords: ["badges", "radius", "generator", "border", "leaves", "organic", "blob", "pills", "custom", "blobs", "point", "fancy"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Border-Radius Shape Generator",
    description: "8-point fancy blob and custom CSS border-radius generator. Organic blobs, pills, badges, leaves, live animation preview.",
    path: "/tools/dev/css-radius",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CssRadiusClient />
    
      <RelatedTools currentToolUrl="/tools/dev/css-radius" />
</div>
  );
}
