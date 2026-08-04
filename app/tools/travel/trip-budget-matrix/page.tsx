import JsonLd from "@/components/seo/json-ld";
import { TripBudgetMatrixClient } from "@/components/tools/travel/trip-budget-matrix-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currency Trip Budget & Spending Matrix | Toolzium",
  description: "Comprehensive multi-destination travel budget converter matrix.",
  path: "/tools/travel/trip-budget-matrix",
  keywords: ["travel budget", "trip budget matrix", "spending matrix", "currency converter", "travel tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/trip-budget-matrix";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Trip Budget Matrix", url: toolUrl, description: "Comprehensive multi-destination travel budget converter matrix.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Trip Budget Matrix", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to use the trip budget matrix?", acceptedAnswer: { "@type": "Answer", text: "Enter your home currency budget and exchange rates to see daily breakdowns." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TripBudgetMatrixClient />
    </div>
  );
}
