import JsonLd from "@/components/seo/json-ld";
import { MortgageClient } from "@/components/tools/finance/mortgage-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Mortgage Calculator | Toolzium",
  description: "Calculate your monthly mortgage payment, see amortization schedules, and understand total home loan costs.",
  path: "/tools/finance/mortgage",
  keywords: ["mortgage calculator", "home loan calculator", "monthly payment", "amortization"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/mortgage`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mortgage Calculator",
    url: toolUrl,
    description: "Calculate your monthly mortgage payment and interest.",
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
      { "@type": "ListItem", position: 3, name: "Mortgage Calculator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is a monthly mortgage payment calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It is calculated using the principal loan amount, interest rate, and term length using a standard amortization formula."
        }
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <MortgageClient />
    </div>
  );
}
