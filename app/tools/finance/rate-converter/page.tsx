import JsonLd from "@/components/seo/json-ld";
import { RateConverterClient } from "@/components/tools/finance/rate-converter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Interest Rate Converter | Toolzium",
  description: "Convert interest rates between APR, APY, nominal and effective rates with different compounding frequencies.",
  path: "/tools/finance/rate-converter",
  keywords: ["interest rate", "APR", "APY", "effective rate", "nominal rate", "compound interest"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/rate-converter`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Interest Rate Converter",
    url: toolUrl,
    description: "Convert interest rates across different compounding frequencies.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` },
      { "@type": "ListItem", position: 3, name: "Interest Rate Converter", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the difference between APR and APY?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "APR (Annual Percentage Rate) is the nominal interest rate without taking into account compounding within the year. APY (Annual Percentage Yield) or Effective Annual Rate (EAR) takes compounding into account, representing the true cost or return."
        }
      }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <RateConverterClient />
    
      <RelatedTools currentToolUrl="/tools/finance/rate-converter" />
</div>
  );
}
