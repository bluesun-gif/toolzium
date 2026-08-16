import JsonLd from "@/components/seo/json-ld";
import CompoundInterestClient from "@/components/tools/finance/compound-interest-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Compound Interest Calculator",
  description: "Calculate compound interest over time with optional monthly contributions. See a year-by-year breakdown of your investment growth.",
  path: "/tools/finance/compound-interest",
  keywords: ["compound interest calculator", "investment calculator", "interest calculator", "finance", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/compound-interest`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Compound Interest Calculator — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Calculate compound interest over time with optional monthly contributions. See a year-by-year breakdown of your investment growth.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Calculate final investment amount", "Monthly contribution support", "Year-by-year breakdown table", "Export results"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Finance", item: `${siteURL}/tools#cat-finance` },
      { "@type": "ListItem", position: 3, name: "Compound Interest Calculator", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <CompoundInterestClient />
    
      <RelatedTools currentToolUrl="/tools/finance/compound-interest" />
</div>
  );
}
