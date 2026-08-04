import JsonLd from "@/components/seo/json-ld";
import { LoanAmortizationClient } from "@/components/tools/finance/loan-amortization-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Loan Amortization Schedule & Calculator | Toolzium",
  description: "Calculate your monthly loan payment and view a full itemized amortization schedule. See the impact of extra monthly principal payments.",
  path: "/tools/finance/loan-amortization",
  keywords: ["loan amortization calculator", "monthly payment calculator", "extra principal payment", "amortization schedule", "finance tools", "mortgage calculator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/loan-amortization";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Loan Amortization Calculator",
    url: toolUrl,
    description: "Calculate your monthly loan payment and view a full itemized amortization schedule.",
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
      { "@type": "ListItem", position: 3, name: "Loan Amortization Calculator", item: toolUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a loan amortization schedule?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An amortization schedule is a complete table of periodic loan payments, showing the amount of principal and the amount of interest that comprise each payment until the loan is paid off.",
        },
      },
      {
        "@type": "Question",
        name: "How do extra payments affect my loan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Making extra payments directly towards the principal reduces the total balance faster, which decreases the total interest paid over the life of the loan and shortens the loan term.",
        },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <LoanAmortizationClient />
    </div>
  );
}
