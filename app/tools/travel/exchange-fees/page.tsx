import JsonLd from "@/components/seo/json-ld";
import { ExchangeFeesClient } from "@/components/tools/travel/exchange-fees-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Currency Exchange Fee & Hidden Markup Calculator | Toolzium",
  description: "Uncover hidden exchange rate markups and total foreign transaction fees when converting currency.",
  path: "/tools/travel/exchange-fees",
  keywords: ["currency exchange calculator", "hidden markup calculator", "travel tools", "foreign transaction fees"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/exchange-fees";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Currency Exchange Fee Calculator", url: toolUrl, description: "Uncover hidden exchange rate markups.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Currency Exchange Fee Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a hidden exchange markup?", acceptedAnswer: { "@type": "Answer", text: "It's the difference between the actual mid-market rate and the rate a provider offers you." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ExchangeFeesClient />
      <RelatedTools currentToolUrl="/tools/travel/exchange-fees" />
</div>);
}
