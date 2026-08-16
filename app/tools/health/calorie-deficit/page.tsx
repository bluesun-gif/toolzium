import JsonLd from "@/components/seo/json-ld";
import { CalorieDeficitClient } from "@/components/tools/health/calorie-deficit-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Calorie Deficit & Goal Weight Date Estimator | Toolzium",
  description: "Calculate your estimated target date to reach your goal weight based on your daily calorie deficit.",
  path: "/tools/health/calorie-deficit",
  keywords: ["calorie deficit calculator", "goal weight date", "weight loss estimator", "BMR", "TDEE", "health tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/calorie-deficit";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Calorie Deficit Estimator", url: toolUrl, description: "Calculate your estimated target date to reach your goal weight based on your daily calorie deficit.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Calorie Deficit Estimator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is weight loss rate calculated?", acceptedAnswer: { "@type": "Answer", text: "A deficit of 3500 calories per week generally leads to 1 lb of weight loss." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CalorieDeficitClient />
      <RelatedTools currentToolUrl="/tools/health/calorie-deficit" />
</div>);
}
