import JsonLd from "@/components/seo/json-ld";
import { NetSalaryClient } from "@/components/tools/finance/net-salary-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Net Salary Calculator | Toolzium",
  description: "Calculate take-home pay after tax deductions.",
  path: "/tools/finance/net-salary",
  keywords: ["net salary", "take-home pay", "tax calculator", "salary calculator"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/net-salary`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Net Salary Calculator", url: toolUrl, description: "Calculate take-home pay after tax deductions.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Net Salary Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is net salary calculated?", acceptedAnswer: { "@type": "Answer", text: "Net salary is calculated by subtracting applicable taxes and deductions from your gross salary." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><NetSalaryClient /></div>);
}
