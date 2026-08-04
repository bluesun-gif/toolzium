import JsonLd from "@/components/seo/json-ld";
import { PaycheckCalculatorClient } from "@/components/tools/finance/paycheck-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Paycheck Calculator | Toolzium",
  description: "Calculate your take-home pay with taxes and deductions.",
  path: "/tools/finance/paycheck",
  keywords: ["paycheck calculator", "take home pay", "tax calculator"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/paycheck`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Paycheck Calculator", url: toolUrl, description: "Calculate your take-home pay with taxes and deductions.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Paycheck Calculator", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><PaycheckCalculatorClient /></div>);
}
