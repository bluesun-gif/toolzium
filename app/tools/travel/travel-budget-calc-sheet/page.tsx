import JsonLd from "@/components/seo/json-ld";
import { TravelBudgetCalcSheetClient } from "@/components/tools/travel/travel-budget-calc-sheet-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Multi-Currency Travel Budget Calculator | Toolzium",
  description: "Multi-currency travel expense comparison and trip budgeting sheet.",
  path: "/tools/travel/travel-budget-calc-sheet",
  keywords: ["travel", "budget", "calculator", "currency", "trip"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/travel-budget-calc-sheet";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Multi-Currency Travel Budget Calculator", url: toolUrl, description: "Multi-currency travel expense comparison and trip budgeting sheet.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Multi-Currency Travel Budget Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How does it work?", acceptedAnswer: { "@type": "Answer", text: "Enter your home and target currencies, add expenses, and see the side-by-side cost breakdown." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><TravelBudgetCalcSheetClient /></div>);
}
