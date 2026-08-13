import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PlaceholderGeneratorClient from "@/components/tools/image/placeholder-generator-client";

export const metadata = buildMetadata({
  title: "Placeholder Image Generator",
  description: "Generate custom placeholder images with custom dimensions, colors, text, and format (PNG, SVG, JPG, WEBP). Free online image placeholder tool for mockups.",
  path: "/tools/image/placeholder-generator",
  keywords: ["with", "format", "generate", "webp", "dimensions", "colors", "free", "images", "custom", "text", "placeholder"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Placeholder Image Generator",
    description: "Generate custom placeholder images with custom dimensions, colors, text, and format (PNG, SVG, JPG, WEBP). Free online image placeholder tool for mockups.",
    path: "/tools/image/placeholder-generator",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PlaceholderGeneratorClient />
    </div>
  );
}
