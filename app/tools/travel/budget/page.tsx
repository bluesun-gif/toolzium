import JsonLd from "@/components/seo/json-ld";
import { TravelBudgetClient } from "@/components/tools/travel/budget-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Travel Budget Planner | Toolzium",
  description: "Plan travel budget with expense categories and daily cost breakdown.",
  path: "/tools/travel/budget",
  keywords: ["travel budget planner", "vacation budget", "trip cost calculator"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/travel/budget`;
  
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Travel Budget Planner", 
    url: toolUrl, 
    description: "Plan travel budget with expense categories and daily cost breakdown.", 
    applicationCategory: "TravelApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Travel Tools", item: `${siteURL}/tools#cat-travel` }, 
      { "@type": "ListItem", position: 3, name: "Travel Budget Planner", item: toolUrl }
    ] 
  };
  
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "How do I calculate per-person cost?", acceptedAnswer: { "@type": "Answer", text: "Enter the number of travelers and your total expenses, and it will calculate the per-person split automatically." } }
    ] 
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TravelBudgetClient />
    </div>
  );
}
