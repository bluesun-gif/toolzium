import JsonLd from "@/components/seo/json-ld";
import { FreelanceRateClient } from "@/components/tools/finance/freelance-rate-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Freelance Rate Calculator | Toolzium",
  description: "Calculate required hourly and project rate for freelancers.",
  path: "/tools/finance/freelance-rate",
  keywords: ["freelance rate", "hourly rate", "finance tool", "freelancer"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/freelance-rate";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Freelance Rate Calculator", url: toolUrl, description: "Rate calculator.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "Freelance Rate Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to calculate freelance rate?", acceptedAnswer: { "@type": "Answer", text: "Use our freelance rate calculator." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><FreelanceRateClient /></div>);
}
