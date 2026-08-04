import JsonLd from "@/components/seo/json-ld";
import { DtiCalculatorClient } from "@/components/tools/finance/dti-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Debt-to-Income (DTI) Ratio Calculator | Toolzium",
  description: "Calculate your front-end and back-end debt-to-income ratio for mortgage and loan eligibility.",
  path: "/tools/finance/dti-calculator",
  keywords: ["dti", "debt to income", "mortgage calculator", "loan eligibility", "finance"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/dti-calculator";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Debt-to-Income (DTI) Ratio Calculator",
    url: toolUrl,
    description: "Calculate your DTI ratio.",
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
      { "@type": "ListItem", position: 3, name: "Debt-to-Income (DTI) Calculator", item: toolUrl }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <DtiCalculatorClient />
    </div>
  );
}
