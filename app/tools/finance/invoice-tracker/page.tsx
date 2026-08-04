import JsonLd from "@/components/seo/json-ld";
import { InvoiceTrackerClient } from "@/components/tools/finance/invoice-tracker-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Invoice Payment Tracker | Toolzium",
  description: "Track your invoices, payments, and outstanding balances.",
  path: "/tools/finance/invoice-tracker",
  keywords: ["invoice tracker", "payment tracker", "finance tools", "freelance tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/invoice-tracker";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Invoice Payment Tracker", url: toolUrl, description: "Track your invoices, payments, and outstanding balances.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "Invoice Tracker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Is my invoice data private?", acceptedAnswer: { "@type": "Answer", text: "Yes, all data is stored locally in your browser and never sent to our servers." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><InvoiceTrackerClient /></div>);
}
