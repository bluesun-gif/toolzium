import JsonLd from "@/components/seo/json-ld";
import { NetWorthClient } from "@/components/tools/finance/net-worth-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Net Worth Calculator | Toolzium",
  description: "Calculate your personal net worth by tracking assets and liabilities. Monitor your financial growth over time.",
  path: "/tools/finance/net-worth",
  keywords: ["net worth calculator", "assets and liabilities", "financial tools", "personal finance", "wealth tracking"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/net-worth`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Net Worth Calculator",
    url: toolUrl,
    description: "Calculate your personal net worth by tracking assets and liabilities.",
    applicationCategory: "FinanceApplication",
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
      { "@type": "ListItem", position: 3, name: "Net Worth Calculator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is net worth?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Net worth is the value of all your assets (what you own) minus all your liabilities (what you owe). It is a key measure of financial health."
        }
      },
      {
        "@type": "Question",
        name: "Should I include my car in my net worth?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, vehicles are considered assets. However, you should list their current depreciated market value, and ensure any outstanding car loans are listed under liabilities."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <NetWorthClient />
    
      <RelatedTools currentToolUrl="/tools/finance/net-worth" />
</div>
  );
}
