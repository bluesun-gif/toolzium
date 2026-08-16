import JsonLd from "@/components/seo/json-ld";
import { TravelBudgetMatrixClient } from "@/components/tools/travel/travel-budget-matrix-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Travel Budget Currency Comparison Matrix | Toolzium",
  description: "Compare travel budgets across multiple destination currencies.",
  path: "/tools/travel/travel-budget-matrix",
  keywords: ["travel budget", "currency comparison", "travel tool", "finance"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/travel-budget-matrix";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Travel Budget Currency Comparison Matrix",
    url: toolUrl,
    description: "Compare travel budgets across multiple destination currencies.",
    applicationCategory: "TravelApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" },
      { "@type": "ListItem", position: 3, name: "Budget Matrix", item: toolUrl }
    ]
  };


  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Travel Budget Currency Comparison Matrix work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Travel Budget Currency Comparison Matrix runs instantly in your browser. Compare travel budgets across multiple destination currencies. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Travel Budget Currency Comparison Matrix 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Travel Budget Currency Comparison Matrix is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Travel Budget Currency Comparison Matrix?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TravelBudgetMatrixClient />
    
      <RelatedTools currentToolUrl="/tools/travel/travel-budget-matrix" />
</div>
  );
}
