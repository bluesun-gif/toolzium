import JsonLd from "@/components/seo/json-ld";
import { LtvCalculatorClient } from "@/components/tools/finance/ltv-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Loan-to-Value (LTV) & Home Equity Calculator | Toolzium",
  description: "Calculate your Loan-to-Value (LTV) ratio, Combined LTV (CLTV), and available home equity for mortgages and HELOCs.",
  path: "/tools/finance/ltv-calculator",
  keywords: ["ltv calculator", "loan to value ratio", "cltv calculator", "home equity calculator", "mortgage calculator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/ltv-calculator";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Loan-to-Value (LTV) Calculator",
    url: toolUrl,
    description: "Calculate your Loan-to-Value (LTV) ratio, Combined LTV (CLTV), and available home equity.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" },
      { "@type": "ListItem", position: 3, name: "LTV Calculator", item: toolUrl }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <LtvCalculatorClient />
    </div>
  );
}
