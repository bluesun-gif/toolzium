import JsonLd from "@/components/seo/json-ld";
import { HtmlEntitiesClient } from "@/components/tools/dev/html-entities-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HTML Entity Encoder/Decoder | Toolzium",
  description: "Encode and decode HTML entities easily. Convert special characters to HTML entities and vice versa.",
  path: "/tools/dev/html-entities",
  keywords: ["html entities", "encode html", "decode html", "html special characters", "named entities", "numeric entities"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/html-entities`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "HTML Entity Encoder", url: toolUrl, description: "Encode and decode HTML entities easily.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${siteURL}/tools#cat-dev` }, { "@type": "ListItem", position: 3, name: "HTML Entity Encoder", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an HTML entity?", acceptedAnswer: { "@type": "Answer", text: "An HTML entity is a snippet of text that begins with an ampersand (&) and ends with a semicolon (;). They are used to display reserved characters in HTML." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <HtmlEntitiesClient />
    </div>
  );
}
