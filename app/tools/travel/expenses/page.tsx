import JsonLd from "@/components/seo/json-ld";
import { ExpensesClient } from "@/components/tools/travel/expenses-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Travel Expense Tracker | Toolzium",
  description: "Track expenses during a trip, manage budget and analyze spending by category.",
  path: "/tools/travel/expenses",
  keywords: ["travel", "expenses", "budget", "tracker", "money", "vacation"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/travel/expenses`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Travel Expense Tracker", url: toolUrl, description: "Track expenses during a trip.", applicationCategory: "TravelApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: `${siteURL}/tools#cat-travel` }, { "@type": "ListItem", position: 3, name: "Travel Expense Tracker", item: toolUrl }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <ExpensesClient />
    </div>
  );
}
