import JsonLd from "@/components/seo/json-ld";
import { FreelanceTaxCalcClient } from "@/components/tools/finance/freelance-tax-calc-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Freelance Tax & Quarterly Estimate Calculator | Toolzium",
  description: "Calculate estimated self-employment tax, income tax, and quarterly estimated payments for freelancers and contractors.",
  path: "/tools/finance/freelance-tax-calc",
  keywords: ["freelance tax", "self employment tax", "quarterly estimates", "1099 tax calculator", "finance tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/freelance-tax-calc";
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Freelance Tax & Quarterly Estimate Calculator", 
    url: toolUrl, 
    description: "Calculate estimated self-employment tax, income tax, and quarterly estimated payments for freelancers and contractors.", 
    applicationCategory: "FinanceApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, 
      { "@type": "ListItem", position: 3, name: "Freelance Tax Calculator", item: toolUrl }
    ] 
  };
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "What is Self-Employment Tax?", acceptedAnswer: { "@type": "Answer", text: "Self-employment tax is a tax consisting of Social Security and Medicare taxes primarily for individuals who work for themselves. It is similar to the Social Security and Medicare taxes withheld from the pay of most wage earners." } }
    ] 
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <FreelanceTaxCalcClient />
    
      <RelatedTools currentToolUrl="/tools/finance/freelance-tax-calc" />
</div>
  );
}
