import JsonLd from "@/components/seo/json-ld";
import { CurrencyChartClient } from "@/components/tools/finance/currency-chart-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currency Pair Chart | Toolzium",
  description: "Visual currency pair comparison tool with simulated historical charts.",
  path: "/tools/finance/currency-chart",
  keywords: ["currency", "exchange rate", "finance", "chart", "converter"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/currency-chart`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Currency Pair Chart", url: toolUrl, description: "Visual currency pair comparison tool.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Currency Pair Chart", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Is this real financial data?", acceptedAnswer: { "@type": "Answer", text: "No, this tool uses simulated historical charts for educational purposes." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CurrencyChartClient />
    </div>
  );
}
