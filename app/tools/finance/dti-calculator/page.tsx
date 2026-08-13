import JsonLd from "@/components/seo/json-ld";
import { DtiCalculatorClient } from "@/components/tools/finance/dti-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Debt-to-Income (DTI) Ratio Calculator | Toolzium",
  description: "Calculate your front-end and back-end debt-to-income ratio for mortgage and loan eligibility.",
  path: "/tools/finance/dti-calculator",
  keywords: ["dti", "debt to income", "mortgage calculator", "loan eligibility", "finance"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/dti-calculator";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Debt-to-Income (DTI) Ratio Calculator",
    url: toolUrl,
    description: "Calculate your DTI ratio.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" },
      { "@type": "ListItem", position: 3, name: "Debt-to-Income (DTI) Calculator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Debt-to-Income (DTI) Ratio Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Debt-to-Income (DTI) Ratio Calculator runs instantly in your browser. Calculate Front-End and Back-End Debt-to-Income (DTI) ratios for mortgage underwriting & loan approval limits. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Debt-to-Income (DTI) Ratio Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Debt-to-Income (DTI) Ratio Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Debt-to-Income (DTI) Ratio Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <DtiCalculatorClient />
    </div>
  );
}
