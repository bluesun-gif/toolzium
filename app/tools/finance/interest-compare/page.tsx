import JsonLd from "@/components/seo/json-ld";
import { InterestCompareClient } from "@/components/tools/finance/interest-compare-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Interest Rate Comparison | Toolzium",
  description:
    "Compare savings and investment returns across different interest rates and compounding frequencies.",
  path: "/tools/finance/interest-compare",
  keywords: [
    "interest rate compare",
    "compound interest",
    "investment calculator",
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/interest-compare`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Interest Rate Comparison",
    url: toolUrl,
    description: "Compare savings returns across different rates.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Finance Tools",
        item: `${siteURL}/tools#cat-finance`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Interest Rate Comparison",
        item: toolUrl,
      },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is compounding frequency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Compounding frequency is the number of times per year that accumulated interest is paid out and credited to an account balance.",
        },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <InterestCompareClient />
    
      <RelatedTools currentToolUrl="/tools/finance/interest-compare" />
</div>
  );
}
