import JsonLd from "@/components/seo/json-ld";
import { NutritionLabelClient } from "@/components/tools/health/nutrition-label-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Nutrition Label Maker | Toolzium",
  description: "Create FDA-style nutrition labels with automatically calculated daily values.",
  path: "/tools/health/nutrition-label",
  keywords: ["nutrition", "label", "maker", "generator", "fda", "health", "food"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/nutrition-label`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Nutrition Label Maker", url: toolUrl, description: "Create FDA-style nutrition labels.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Nutrition Label Maker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is % Daily Value calculated?", acceptedAnswer: { "@type": "Answer", text: "It is based on a 2,000 calorie daily diet according to FDA guidelines." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <NutritionLabelClient />
    
      <RelatedTools currentToolUrl="/tools/health/nutrition-label" />
</div>
  );
}
