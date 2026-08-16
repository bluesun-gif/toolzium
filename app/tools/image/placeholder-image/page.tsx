import JsonLd from "@/components/seo/json-ld";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import RelatedTools from "@/components/shared/related-tools";
=======
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PlaceholderImageClient from "@/components/tools/image/placeholder-image-client";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

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
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/image/placeholder-image" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
