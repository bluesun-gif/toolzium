import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import PlaceholderGeneratorClient from "@/components/tools/image/placeholder-generator-client";

export const metadata = buildMetadata({
  title: "Free Image Placeholder Generator — Custom Sizes & Colors | Toolzium",
  description: "Generate custom image placeholders in PNG or SVG format. Set exact width, height, background color, text color, and custom labels. Free online placeholder tool.",
  path: "/tools/image/placeholder-generator",
  keywords: ["placeholder generator", "image placeholder", "dummy image generator", "custom image placeholder", "svg placeholder", "png placeholder", "mockup image generator", "Toolzium"],
});

export default function Page() {
  return (
    <>
      <PlaceholderGeneratorClient />

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
    </>
  );
}
