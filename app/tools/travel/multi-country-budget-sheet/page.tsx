import JsonLd from "@/components/seo/json-ld";
import { MultiCountryBudgetSheetClient } from "@/components/tools/travel/multi-country-budget-sheet-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Multi-Country Travel Budget & Currency Converter Sheet | Toolzium",
  description: "Multi-country travel budget planner and currency converter for international trips.",
  path: "/tools/travel/multi-country-budget-sheet",
  keywords: ["travel budget", "currency converter", "trip planner", "travel expenses", "travel tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/multi-country-budget-sheet";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Multi-Country Budget Sheet",
    url: toolUrl,
    description: "Multi-country travel budget planner.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" },
      { "@type": "ListItem", position: 3, name: "Multi-Country Budget", item: toolUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I use multiple currencies?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, track expenses across different destination currencies." },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <MultiCountryBudgetSheetClient />
    </div>
  );
}
