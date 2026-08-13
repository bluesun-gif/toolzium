import JsonLd from "@/components/seo/json-ld";
import { LtvCalculatorClient } from "@/components/tools/finance/ltv-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "LTV Calculator — Free Loan to Value Ratio & Mortgage Calculator (2026) | Toolzium",
  description: "Calculate your Loan-to-Value (LTV) ratio, Combined LTV (CLTV), auto & home equity for mortgages, car loans, and HELOCs with instant 80% PMI limits.",
  path: "/tools/finance/ltv-calculator",
  keywords: [
    "ltv calculator",
    "loan to value calculator",
    "ltv mortgage calculator",
    "cltv calculator",
    "home equity calculator",
    "mortgage calculator ltv",
    "80 ltv calculator",
    "auto ltv calculator"
  ],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/ltv-calculator";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Loan-to-Value (LTV) Calculator",
    url: toolUrl,
    description: "Calculate your Loan-to-Value (LTV) ratio, Combined LTV (CLTV), and available home equity for mortgages and auto loans.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools/finance" },
      { "@type": "ListItem", position: 3, name: "LTV Calculator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is Loan-to-Value (LTV) ratio calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "LTV is calculated by dividing your total loan amount by the appraised property value, then multiplying by 100. Formula: (Loan Amount / Appraised Property Value) * 100."
        }
      },
      {
        "@type": "Question",
        name: "What is a good LTV ratio for a mortgage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An LTV ratio of 80% or lower is generally considered ideal by lenders. An 80% LTV avoids private mortgage insurance (PMI) requirements and qualifies you for better interest rates."
        }
      },
      {
        "@type": "Question",
        name: "What is the difference between LTV and CLTV?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "LTV considers only your primary mortgage loan. Combined Loan-to-Value (CLTV) includes all loans secured against the property, including second mortgages and HELOC lines of credit."
        }
      }
    ]
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
