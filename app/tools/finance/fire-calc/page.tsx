import JsonLd from "@/components/seo/json-ld";
import { FireCalcClient } from "@/components/tools/finance/fire-calc-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "FIRE Calculator | Toolzium",
  description: "Calculate your Financial Independence and Retire Early (FIRE) age and number.",
  path: "/tools/finance/fire-calc",
  keywords: ["FIRE calculator", "financial independence", "retire early", "retirement calculator", "finance tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/fire-calc";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FIRE Calculator",
    url: toolUrl,
    description: "Calculate your Financial Independence and Retire Early (FIRE) age and number.",
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
      { "@type": "ListItem", position: 3, name: "FIRE Calculator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the FIRE Financial Independence Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's FIRE Financial Independence Calculator runs instantly in your browser. Calculate age of Financial Independence & Early Retirement. Required portfolio size, net worth growth projection table, Lean/Fat/Coast FIRE. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the FIRE Financial Independence Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the FIRE Financial Independence Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the FIRE Financial Independence Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <FireCalcClient />
    
      <RelatedTools currentToolUrl="/tools/finance/fire-calc" />
</div>
  );
}
