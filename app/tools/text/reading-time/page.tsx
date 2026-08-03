import JsonLd from "@/components/seo/json-ld";
import { ReadingTimeClient } from "@/components/tools/text/reading-time-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reading Time Calculator | Toolzium",
  description: "Calculate reading and speaking time for any text, including word count and readability scores.",
  path: "/tools/text/reading-time",
  keywords: ["reading time calculator", "speaking time", "word count", "readability score", "flesch-kincaid"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/text/reading-time`;
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Reading Time Calculator", 
    url: toolUrl, 
    description: "Calculate reading and speaking time for any text, including word count and readability scores.", 
    applicationCategory: "UtilitiesApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Text Tools", item: `${siteURL}/tools#cat-text` }, 
      { "@type": "ListItem", position: 3, name: "Reading Time Calculator", item: toolUrl }
    ] 
  };
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "How is reading time calculated?", acceptedAnswer: { "@type": "Answer", text: "Reading time is calculated based on the number of words in the text and the average reading speed." } }
    ] 
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ReadingTimeClient />
    </div>
  );
}
