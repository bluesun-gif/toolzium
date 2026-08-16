import JsonLd from "@/components/seo/json-ld";
import { RetirementClient } from "@/components/tools/finance/retirement-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Retirement Calculator | Toolzium",
  description: "Calculate retirement savings projections. Find out total at retirement, monthly income, and more.",
  path: "/tools/finance/retirement",
  keywords: ["retirement", "calculator", "finance", "savings", "4% rule"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/retirement`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Retirement Calculator", url: toolUrl, description: "Calculate retirement savings projections.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Retirement Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How much do I need to retire?", acceptedAnswer: { "@type": "Answer", text: "Use this calculator to find out based on the 4% rule and your projected savings." } }] };
  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <RetirementClient />
    
      <RelatedTools currentToolUrl="/tools/finance/retirement" />
</div>
  );
}
