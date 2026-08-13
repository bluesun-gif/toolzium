import JsonLd from "@/components/seo/json-ld";
import { ExchangeHistoryClient } from "@/components/tools/travel/exchange-history-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currency Exchange Rate History | Toolzium",
  description: "View historical exchange rate trends.",
  path: "/tools/travel/exchange-history",
  keywords: ["currency", "exchange", "rate", "history", "travel"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/exchange-history";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Exchange Rate History", url: toolUrl, description: "Historical exchange rates.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Exchange Rate History", item: toolUrl }] };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Exchange Rate History work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Exchange Rate History runs instantly in your browser. Historical exchange rate trends. 30+ currencies. Line chart over 30-365 days. Min, max, average rates. Best time to exchange indicator. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Exchange Rate History 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Exchange Rate History is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Exchange Rate History?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ExchangeHistoryClient />
    </div>
  );
}
