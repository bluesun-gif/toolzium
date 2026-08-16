import JsonLd from "@/components/seo/json-ld";
import { CurrencySlangClient } from "@/components/tools/finance/currency-slang-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Currency Slang Dictionary | Toolzium",
  description: "Dictionary of money and currency slang terms worldwide. Learn terms from the US, UK, Crypto, and more.",
  path: "/tools/finance/currency-slang",
  keywords: ["currency slang", "money slang", "slang dictionary", "financial terms", "crypto slang"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/currency-slang`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Currency Slang Dictionary", url: toolUrl, description: "Dictionary of money slang terms.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Currency Slang Dictionary", item: toolUrl }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <CurrencySlangClient />
    
      <RelatedTools currentToolUrl="/tools/finance/currency-slang" />
</div>
  );
}
