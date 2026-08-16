import JsonLd from "@/components/seo/json-ld";
import { ExpenseTrackerClient } from "@/components/tools/office/expense-tracker-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Expense Tracker | Toolzium",
  description: "Track your daily expenses, categorize spending, and view monthly summaries with our free online expense tracker.",
  path: "/tools/office/expense-tracker",
  keywords: ["expense tracker", "budget tool", "spending tracker", "office tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/office/expense-tracker`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Expense Tracker", url: toolUrl, description: "Track your daily expenses, categorize spending, and view monthly summaries.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: `${siteURL}/tools#cat-office` }, { "@type": "ListItem", position: 3, name: "Expense Tracker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How does the expense tracker work?", acceptedAnswer: { "@type": "Answer", text: "You can add your daily expenses, categorize them, and the tool will calculate your total spending and show a visual breakdown by category." } }, { "@type": "Question", name: "Is my expense data saved?", acceptedAnswer: { "@type": "Answer", text: "Yes, your expense data is saved locally in your browser so it will be available when you return." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ExpenseTrackerClient />
      <RelatedTools currentToolUrl="/tools/office/expense-tracker" />
</div>);
}
