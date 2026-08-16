import JsonLd from "@/components/seo/json-ld";
import { OfflineCurrencyClient } from "@/components/tools/travel/offline-currency-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Offline Currency Calculator | Toolzium",
  description: "Offline-first travel currency exchange calculator.",
  path: "/tools/travel/offline-currency",
  keywords: ["currency calculator", "offline currency", "travel currency exchange"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/offline-currency";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Offline Currency Calculator", url: toolUrl, description: "Offline-first travel currency exchange calculator", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Offline Currency Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Does it work offline?", acceptedAnswer: { "@type": "Answer", text: "Yes, it works entirely offline." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><OfflineCurrencyClient />
      <RelatedTools currentToolUrl="/tools/travel/offline-currency" />
</div>);
}
