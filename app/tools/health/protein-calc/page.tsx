import JsonLd from "@/components/seo/json-ld";
import { ProteinCalcClient } from "@/components/tools/health/protein-calc-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Protein Intake Calculator | Toolzium",
  description: "Calculate your daily recommended protein intake based on your goals.",
  path: "/tools/health/protein-calc",
  keywords: ["protein", "calculator", "health", "fitness", "macros"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/protein-calc";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Protein Intake Calculator", url: toolUrl, description: "Calculate your daily recommended protein intake based on your goals.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Protein Intake Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How much protein do I need?", acceptedAnswer: { "@type": "Answer", text: "It depends on your weight and activity level. Use this tool to calculate it." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ProteinCalcClient />
    
      <RelatedTools currentToolUrl="/tools/health/protein-calc" />
</div>
  );
}
