import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import BoxShadowGeneratorClient from "@/components/tools/dev/box-shadow-generator-client";
import RelatedTools from "@/components/shared/related-tools";

const TITLE = "CSS Box Shadow & Glassmorphism Generator — Live CSS Tool | Toolzium";
const DESCRIPTION = "Create modern CSS box shadows, multi-layered drop shadows, and frosted Glassmorphism cards with real-time UI sliders. Copy production-ready CSS code instantly.";
const PATH = "/tools/dev/box-shadow-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "box shadow generator", "css shadow generator", "css box shadow", "drop shadow css", 
    "glassmorphism generator", "css glassmorphism", "neumorphism generator", "css shadow maker", 
    "backdrop filter generator", "Toolzium"
  ],
});

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "CSS Box Shadow & Glassmorphism Generator",
      description: DESCRIPTION,
      url: siteURL + PATH,
      applicationCategory: "DeveloperApplication",
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
          name: "Developer Tools",
          item: siteURL + "/tools/dev",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Box Shadow Generator",
          item: siteURL + PATH,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd as any} />
      <BoxShadowGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/dev/box-shadow-generator" />
</>
  );
}
