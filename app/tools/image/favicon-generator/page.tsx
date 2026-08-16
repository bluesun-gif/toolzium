import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import FaviconGeneratorClient from "@/components/tools/image/favicon-generator-client";
import RelatedTools from "@/components/shared/related-tools";

const TITLE = "Favicon & App Icon Generator — Convert Image to Favicon.ico | Toolzium";
const DESCRIPTION = "Generate website favicons, Apple Touch icons, Android PWA icons, and multi-resolution favicon.ico files online. Download ready-to-use icon zip packages with HTML head code.";
const PATH = "/tools/image/favicon-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "favicon generator", "ico converter", "png to ico", "generate favicon", "make favicon from image", 
    "app icon generator", "pwa icons", "apple touch icon", "website icon generator", "Toolzium"
  ],
});

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Favicon & App Icon Generator",
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
          name: "Favicon Generator",
          item: siteURL + PATH,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd as any} />
      <FaviconGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/image/favicon-generator" />
</>
  );
}
