import JsonLd from "@/components/seo/json-ld";
import { TaxWithholdingClient } from "@/components/tools/finance/tax-withholding-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Tax Withholding Estimator | Toolzium",
  description: "Estimate US federal tax withholding and effective tax rates based on income and filing status.",
  path: "/tools/finance/tax-withholding",
  keywords: ["tax withholding", "tax calculator", "paycheck calculator", "W-4 estimator", "tax brackets"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/tax-withholding`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tax Withholding Estimator", url: toolUrl, description: "Estimate US federal tax withholding and effective tax rates.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Tax Estimator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this tool for?", acceptedAnswer: { "@type": "Answer", text: "This tool provides a rough estimate of US federal tax withholding based on standard 2024 tax brackets." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><TaxWithholdingClient />
      <RelatedTools currentToolUrl="/tools/finance/tax-withholding" />
</div>);
}
