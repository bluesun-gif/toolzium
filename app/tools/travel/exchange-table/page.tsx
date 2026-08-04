import JsonLd from "@/components/seo/json-ld";
import { ExchangeTableClient } from "@/components/tools/travel/exchange-table-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currency Exchange Comparison Table | Toolzium",
  description: "Quick currency exchange conversion reference table for traveler pockets.",
  path: "/tools/travel/exchange-table",
  keywords: ["currency exchange", "exchange table", "travel cheatsheet", "travel tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/exchange-table";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Currency Exchange Comparison Table",
    url: toolUrl,
    description: "Quick currency exchange conversion reference table for traveler pockets.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" },
      { "@type": "ListItem", position: 3, name: "Currency Exchange Table", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How do I use this table?", acceptedAnswer: { "@type": "Answer", text: "Enter your base currency, target currency, and the current exchange rate. It will generate a printable reference table for common amounts." } }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ExchangeTableClient />
    </div>
  );
}
