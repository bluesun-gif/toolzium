import JsonLd from "@/components/seo/json-ld";
import { CurrencyPriceMatrixClient } from "@/components/tools/travel/currency-price-matrix-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currency Price Matrix | Toolzium",
  description: "Multi-item travel cost converter and comparison sheet.",
  path: "/tools/travel/currency-price-matrix",
  keywords: ["currency", "travel", "exchange rate", "budget", "price matrix"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/currency-price-matrix";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Currency Price Matrix", url: toolUrl, description: "Multi-item travel cost converter and comparison sheet.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Currency Price Matrix", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to compare travel costs?", acceptedAnswer: { "@type": "Answer", text: "Use our price matrix to convert various expenses automatically." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CurrencyPriceMatrixClient />
    </div>
  );
}
