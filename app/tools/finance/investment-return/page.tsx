import JsonLd from "@/components/seo/json-ld";
import { InvestmentReturnClient } from "@/components/tools/finance/investment-return-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Investment Return Calculator | Toolzium",
  description: "Calculate investment returns over time with monthly contributions and compound interest.",
  path: "/tools/finance/investment-return",
  keywords: ["investment calculator", "compound interest", "return on investment", "finance tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/investment-return`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Investment Return Calculator",
    url: toolUrl,
    description: "Calculate investment returns over time with monthly contributions and compound interest.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` },
      { "@type": "ListItem", position: 3, name: "Investment Return Calculator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is investment return calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Investment return is calculated using compound interest, taking into account the initial investment, monthly contributions, and the expected annual return rate."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <InvestmentReturnClient />
    
      <RelatedTools currentToolUrl="/tools/finance/investment-return" />
</div>
  );
}
