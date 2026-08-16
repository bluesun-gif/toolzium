import JsonLd from "@/components/seo/json-ld";
import { CompoundGrowthClient } from "@/components/tools/finance/compound-growth-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Investment Compound Growth Visualizer | Toolzium",
  description: "Calculate and visualize your investment growth with compound interest.",
  path: "/tools/finance/compound-growth",
  keywords: ["compound interest", "investment calculator", "growth visualizer", "finance tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/compound-growth";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Compound Growth Visualizer", url: toolUrl, description: "Calculate compound growth.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "Compound Growth Visualizer", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is compound interest?", acceptedAnswer: { "@type": "Answer", text: "Compound interest is the interest on savings calculated on both the initial principal and the accumulated interest from previous periods." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CompoundGrowthClient />
    
      <RelatedTools currentToolUrl="/tools/finance/compound-growth" />
</div>
  );
}
