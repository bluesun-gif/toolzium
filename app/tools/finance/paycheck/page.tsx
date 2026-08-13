import JsonLd from "@/components/seo/json-ld";
import { PaycheckCalculatorClient } from "@/components/tools/finance/paycheck-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Paycheck Calculator | Toolzium",
  description: "Calculate your take-home pay with taxes and deductions.",
  path: "/tools/finance/paycheck",
  keywords: ["paycheck calculator", "take home pay", "tax calculator"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/paycheck`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Paycheck Calculator", url: toolUrl, description: "Calculate your take-home pay with taxes and deductions.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Paycheck Calculator", item: toolUrl }] };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Paycheck Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Paycheck Calculator runs instantly in your browser. Calculate take-home pay from gross salary. Federal and state tax, Social Security, Medicare. 401k and health insurance deductions. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Paycheck Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Paycheck Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Paycheck Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><PaycheckCalculatorClient /></div>);
}
