import JsonLd from "@/components/seo/json-ld";
import { ExpensesClient } from "@/components/tools/travel/expenses-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Travel Expense Tracker | Toolzium",
  description: "Track expenses during a trip, manage budget and analyze spending by category.",
  path: "/tools/travel/expenses",
  keywords: ["travel", "expenses", "budget", "tracker", "money", "vacation"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/travel/expenses`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Travel Expense Tracker", url: toolUrl, description: "Track expenses during a trip.", applicationCategory: "TravelApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: `${siteURL}/tools#cat-travel` }, { "@type": "ListItem", position: 3, name: "Travel Expense Tracker", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Travel Expense Tracker work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Travel Expense Tracker runs instantly in your browser. Track expenses during trips. Create trips with budget. Categories, multi-currency support. Dashboard with spending breakdown. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Travel Expense Tracker 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Travel Expense Tracker is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Travel Expense Tracker?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ExpensesClient />
    
      <RelatedTools currentToolUrl="/tools/travel/expenses" />
</div>
  );
}
