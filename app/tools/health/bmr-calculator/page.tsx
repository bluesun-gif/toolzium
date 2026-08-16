import JsonLd from "@/components/seo/json-ld";
import { BmrCalculatorClient } from "@/components/tools/health/bmr-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "BMR Calculator | Basal Metabolic Rate Tool | Toolzium",
  description: "Calculate your Basal Metabolic Rate (BMR) and daily calorie needs using the Mifflin-St Jeor and Harris-Benedict equations.",
  path: "/tools/health/bmr-calculator",
  keywords: ["bmr calculator", "basal metabolic rate", "calorie calculator", "mifflin st jeor", "harris benedict"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/bmr-calculator`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "BMR Calculator", url: toolUrl, description: "Calculate your Basal Metabolic Rate (BMR) and daily calorie needs.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "BMR Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is BMR?", acceptedAnswer: { "@type": "Answer", text: "BMR (Basal Metabolic Rate) is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <BmrCalculatorClient />
    
      <RelatedTools currentToolUrl="/tools/health/bmr-calculator" />
</div>
  );
}
