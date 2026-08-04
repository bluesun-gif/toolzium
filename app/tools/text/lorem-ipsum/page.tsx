import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import LoremIpsumClient from "@/components/tools/text/lorem-ipsum-client";

const TITLE = "Lorem Ipsum Generator — Free Placeholder Dummy Text | Toolzium";
const DESCRIPTION = "Generate custom Lorem Ipsum placeholder text by paragraphs, words, sentences, or lists. Includes HTML markup tag options, copy to clipboard, and instant preview. 100% free.";
const PATH = "/tools/text/lorem-ipsum";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "lorem ipsum generator", "dummy text generator", "placeholder text", "lorem ipsum doler", 
    "generate lorem ipsum", "latin text generator", "lorem ipsum text maker", "Toolzium"
  ],
});

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Lorem Ipsum Generator",
      description: DESCRIPTION,
      url: siteURL + PATH,
      applicationCategory: "UtilitiesApplication",
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
          name: "Text Tools",
          item: siteURL + "/tools/text",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Lorem Ipsum Generator",
          item: siteURL + PATH,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd as any} />
      <LoremIpsumClient />
    </>
  );
}
