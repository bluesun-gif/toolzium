import JsonLd from "@/components/seo/json-ld";
import { SymptomDiaryClient } from "@/components/tools/health/symptom-diary-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Symptom Diary | Toolzium",
  description: "Track your daily symptoms with severity, categories, and trends. Save data locally.",
  path: "/tools/health/symptom-diary",
  keywords: ["symptom tracker", "health diary", "symptom log", "health tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/symptom-diary`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Symptom Diary", url: toolUrl, description: "Track your daily symptoms with severity and categories.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Symptom Diary", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><SymptomDiaryClient />
      <RelatedTools currentToolUrl="/tools/health/symptom-diary" />
</div>);
}
