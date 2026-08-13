import JsonLd from "@/components/seo/json-ld";
import { LtvCalculatorClient } from "@/components/tools/finance/ltv-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free LTV Calculator (2026) — Calculate Loan-to-Value & CLTV Ratio",
  description: "Free Loan-to-Value (LTV) and Combined LTV (CLTV) calculator. Estimate home equity, cash-out refinance limits, and PMI requirements instantly.",
  path: "/tools/finance/ltv-calculator",
  keywords: [
    "ltv calculator",
    "loan to value calculator",
    "cltv calculator",
    "loan to value ratio calculator",
    "home equity calculator",
    "mortgage ltv calculator",
    "calculate ltv",
    "ltv mortgage calculator",
  ],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/ltv-calculator";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Loan-to-Value (LTV) Calculator",
    url: toolUrl,
    description: "Calculate your Loan-to-Value (LTV) ratio, Combined LTV (CLTV), and available home equity.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" },
      { "@type": "ListItem", position: 3, name: "LTV Calculator", item: toolUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a Loan-to-Value (LTV) Ratio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Loan-to-Value (LTV) ratio is a financial term used by lenders to express the ratio of a loan to the value of an asset purchased or refinanced. For example, if you borrow $280,000 to buy a $400,000 home, your LTV ratio is 70%.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between LTV and CLTV?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "LTV calculates the ratio using only your primary mortgage debt. Combined Loan-to-Value (CLTV) includes all secured loans on the property, such as a 2nd mortgage, home equity loan, or Home Equity Line of Credit (HELOC).",
        },
      },
      {
        "@type": "Question",
        name: "Why is 80% LTV an important threshold?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An LTV of 80% or lower is usually required to avoid paying Private Mortgage Insurance (PMI) on conventional loans. Having an LTV at or below 80% also qualifies borrowers for better interest rates.",
        },
      },
      {
        "@type": "Question",
        name: "How can I lower my LTV ratio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can lower your LTV ratio by making a larger down payment when buying a home, paying down your mortgage principal balance faster, or increasing your home value through renovations.",
        },
      },
    ],
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <LtvCalculatorClient />
    </div>
  );
}
