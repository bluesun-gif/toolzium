import JsonLd from "@/components/seo/json-ld";
import { FlexboxGeneratorClient } from "@/components/tools/dev/flexbox-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "CSS Flexbox Layout Generator | Toolzium",
  description: "Visually generate and customize CSS Flexbox layouts with interactive controls and instant code generation.",
  path: "/tools/dev/flexbox-generator",
  keywords: ["flexbox", "css", "layout generator", "css flexbox", "flex generator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/flexbox-generator";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CSS Flexbox Layout Generator",
    url: toolUrl,
    description: "Visually generate and customize CSS Flexbox layouts.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" },
      { "@type": "ListItem", position: 3, name: "CSS Flexbox Layout Generator", item: toolUrl }
    ]
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is CSS Flexbox?", acceptedAnswer: { "@type": "Answer", text: "Flexbox is a one-dimensional layout method for laying out items in rows or columns." } },
      { "@type": "Question", name: "How do I use the generator?", acceptedAnswer: { "@type": "Answer", text: "Adjust the flex container and item properties using the controls, then copy the generated CSS code." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <FlexboxGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/dev/flexbox-generator" />
</div>
  );
}
