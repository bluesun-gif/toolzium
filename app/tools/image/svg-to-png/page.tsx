import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import SvgToPngClient from "@/components/tools/image/svg-to-png-client";
import RelatedTools from "@/components/shared/related-tools";

const TITLE = "SVG to PNG Converter — Convert SVG Vector to HD PNG | Toolzium";
const DESCRIPTION = "Convert SVG code or SVG vector files to high-resolution PNG images online. Custom resolution multiplier (1x, 2x, 4x, 8x HD), transparent or solid background, and instant PNG export. 100% free and client-side.";
const PATH = "/tools/image/svg-to-png";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "svg to png", "convert svg to png", "svg2png", "svg to png converter", "export svg as png", 
    "high res svg to png", "svg vector to png", "svg renderer", "online svg converter", "Toolzium"
  ],
});

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "SVG to PNG Converter",
      description: DESCRIPTION,
      url: siteURL + PATH,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteURL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Image Tools",
          item: siteURL + "/tools/image",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "SVG to PNG",
          item: siteURL + PATH,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd as any} />
      <SvgToPngClient />
    
      <RelatedTools currentToolUrl="/tools/image/svg-to-png" />
</>
  );
}
