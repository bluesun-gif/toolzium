import JsonLd from "@/components/seo/json-ld";
import { TravelBudgetSheetClient } from "@/components/tools/travel/travel-budget-sheet-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Travel Budget Multi-Currency Comparison Sheet | Toolzium",
  description: "Multi-currency travel expense comparison and trip budgeting sheet.",
  path: "/tools/travel/travel-budget-sheet",
  keywords: ["travel budget", "expense comparison", "multi-currency", "trip budget", "travel tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/travel-budget-sheet";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Travel Budget Multi-Currency Comparison Sheet", url: toolUrl, description: "Multi-currency travel expense comparison and trip budgeting sheet.", applicationCategory: "UtilitiesApplication", operatingSystem: "All" };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Travel Budget Sheet", item: toolUrl }] };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Travel Budget Multi-Currency Comparison Sheet work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Travel Budget Multi-Currency Comparison Sheet runs instantly in your browser. Multi-currency travel expense comparison and trip budgeting sheet. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Travel Budget Multi-Currency Comparison Sheet 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Travel Budget Multi-Currency Comparison Sheet is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Travel Budget Multi-Currency Comparison Sheet?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><TravelBudgetSheetClient /></div>);
}
