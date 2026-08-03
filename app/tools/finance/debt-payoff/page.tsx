import JsonLd from "@/components/seo/json-ld";
import { DebtPayoffClient } from "@/components/tools/finance/debt-payoff-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Debt Payoff Calculator | Toolzium",
  description: "Calculate how long it takes to pay off your debt and how extra payments can help.",
  path: "/tools/finance/debt-payoff",
  keywords: ["debt calculator", "payoff calculator", "amortization", "finance tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/debt-payoff`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Debt Payoff Calculator",
    url: toolUrl,
    description: "Calculate how long it takes to pay off your debt and how extra payments can help.",
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
      { "@type": "ListItem", position: 3, name: "Debt Payoff Calculator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is debt payoff calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Debt payoff is calculated using standard amortization, analyzing the balance, interest rate, and monthly payment."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <DebtPayoffClient />
    </div>
  );
}
