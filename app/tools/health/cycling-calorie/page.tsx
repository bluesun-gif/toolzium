import JsonLd from "@/components/seo/json-ld";
import { CyclingCalorieClient } from "@/components/tools/health/cycling-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cycling & Biking Calorie & Power Calculator | Toolzium",
  description: "Calculate calories burned and estimated mechanical power output (Watts) during your cycling sessions based on intensity and terrain.",
  path: "/tools/health/cycling-calorie",
  keywords: ["cycling calorie calculator", "biking power calculator", "watts calculator", "calories burned cycling", "health tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/cycling-calorie";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Cycling Calorie Calculator", url: toolUrl, description: "Calculate calories burned and estimated mechanical power output during cycling.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Cycling Calorie Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How are cycling calories calculated?", acceptedAnswer: { "@type": "Answer", text: "We use the MET (Metabolic Equivalent of Task) formula based on body weight, duration, and cycling intensity." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CyclingCalorieClient /></div>);
}
