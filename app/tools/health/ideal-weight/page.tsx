import JsonLd from "@/components/seo/json-ld";
import { IdealWeightClient } from "@/components/tools/health/ideal-weight-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Ideal Weight Calculator | Toolzium",
  description: "Calculate ideal body weight using multiple formulas.",
  path: "/tools/health/ideal-weight",
  keywords: ["ideal weight", "weight calculator", "health tools", "bmi"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/ideal-weight`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Ideal Weight Calculator", url: toolUrl, description: "Calculate ideal body weight using multiple formulas.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Ideal Weight Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is ideal weight calculated?", acceptedAnswer: { "@type": "Answer", text: "It uses Devine, Robinson, Miller, and Hamwi formulas." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><IdealWeightClient />
      <RelatedTools currentToolUrl="/tools/health/ideal-weight" />
</div>);
}
