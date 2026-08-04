import JsonLd from "@/components/seo/json-ld";
import { InvoiceCalcClient } from "@/components/tools/office/invoice-calc-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Invoice Line Item Calculator | Toolzium",
  description: "Quick invoice total & tax breakdown calculator with multiple line items.",
  path: "/tools/office/invoice-calc",
  keywords: ["invoice calculator", "tax breakdown", "line item", "office tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/invoice-calc";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Invoice Line Item Calculator", url: toolUrl, description: "Quick invoice total & tax breakdown calculator with multiple line items.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "Invoice Line Item Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How does it work?", acceptedAnswer: { "@type": "Answer", text: "Add line items, set tax and shipping, and calculate the total." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><InvoiceCalcClient /></div>);
}
