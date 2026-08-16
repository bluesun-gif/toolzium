import JsonLd from "@/components/seo/json-ld";
import { siteURL } from "@/lib/constants";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Placeholder Image Generator — Create Dummy Images",
  description: "Generate placeholder images with custom dimensions, colors, and text. Create dummy images for mockups, wireframes, and development. Free online tool.",
  path: "/tools/image/placeholder-image",
  keywords: ["with", "generate", "create", "dimensions", "colors", "dummy", "images", "custom", "text", "mockups", "placeholder"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Placeholder Image Generator — Create Dummy Images",
    description: "Generate placeholder images with custom dimensions, colors, and text. Create dummy images for mockups, wireframes, and development. Free online tool.",
    path: "/tools/image/placeholder-image",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PlaceholderImageClient />
    
      <RelatedTools currentToolUrl="/tools/image/placeholder-image" />
</>
  );
}
