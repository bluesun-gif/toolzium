import JsonLd from "@/components/seo/json-ld";
import { DecisionMakerClient } from "@/components/tools/util/decision-maker-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Decision Maker | Toolzium",
  description: "Help make decisions with simple random choice or weighted criteria.",
  path: "/tools/util/decision-maker",
  keywords: ["decision maker", "random choice generator", "weighted decision matrix"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/util/decision-maker`;
  
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Decision Maker", 
    url: toolUrl, 
    description: "Help make decisions with simple random choice or weighted criteria.", 
    applicationCategory: "UtilitiesApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Utility Tools", item: `${siteURL}/tools#cat-util` }, 
      { "@type": "ListItem", position: 3, name: "Decision Maker", item: toolUrl }
    ] 
  };
  
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "How does the random choice work?", acceptedAnswer: { "@type": "Answer", text: "It picks one option randomly from your list." } }, 
      { "@type": "Question", name: "What is weighted mode?", acceptedAnswer: { "@type": "Answer", text: "It calculates the best option based on the weights you assign to pros and cons." } }
    ] 
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <DecisionMakerClient />
    
      <RelatedTools currentToolUrl="/tools/util/decision-maker" />
</div>
  );
}
