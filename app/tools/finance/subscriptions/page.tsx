import JsonLd from "@/components/seo/json-ld";
import { SubscriptionsClient } from "@/components/tools/finance/subscriptions-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Subscription Tracker | Toolzium",
  description: "Track your recurring subscriptions, monitor monthly costs, and manage billing dates.",
  path: "/tools/finance/subscriptions",
  keywords: ["subscriptions", "tracker", "finance", "recurring payments", "budget"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/subscriptions`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Subscription Tracker", url: toolUrl, description: "Track recurring subscriptions.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Subscription Tracker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How can I track my subscriptions?", acceptedAnswer: { "@type": "Answer", text: "Add your subscriptions, cost, and cycle. The tool calculates your total monthly and yearly expenditure." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><SubscriptionsClient />
      <RelatedTools currentToolUrl="/tools/finance/subscriptions" />
</div>);
}
