import JsonLd from "@/components/seo/json-ld";
import { FireCalcClient } from "@/components/tools/finance/fire-calc-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "FIRE Calculator | Toolzium",
  description: "Calculate your Financial Independence and Retire Early (FIRE) age and number.",
  path: "/tools/finance/fire-calc",
  keywords: ["FIRE calculator", "financial independence", "retire early", "retirement calculator", "finance tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/fire-calc";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FIRE Calculator",
    url: toolUrl,
    description: "Calculate your Financial Independence and Retire Early (FIRE) age and number.",
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
      { "@type": "ListItem", position: 3, name: "FIRE Calculator", item: toolUrl }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <FireCalcClient />
    
      <RelatedTools currentToolUrl="/tools/finance/fire-calc" />
</div>
  );
}
