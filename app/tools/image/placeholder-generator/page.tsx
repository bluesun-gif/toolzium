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

<<<<<<< HEAD
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Image Placeholder Generator",
          description: "Generate custom image placeholders in PNG or SVG format.",
          applicationCategory: "DesignApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />
    
      <RelatedTools currentToolUrl="/tools/image/placeholder-generator" />
</>
=======
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PlaceholderGeneratorClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
