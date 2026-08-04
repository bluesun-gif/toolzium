import JsonLd from "@/components/seo/json-ld";
import { IndoorCyclingCalorieClient } from "@/components/tools/health/indoor-cycling-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Indoor Cycling & Spin Bike Calorie Calculator | Toolzium",
  description: "Calculate calories burned during stationary spin bike and indoor cycling workouts.",
  path: "/tools/health/indoor-cycling-calorie",
  keywords: ["indoor cycling", "spin bike", "calorie calculator", "health", "workout", "fitness"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/indoor-cycling-calorie";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Indoor Cycling Calorie Calculator", url: toolUrl, description: "Calculate calories burned during stationary spin bike and indoor cycling workouts.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Indoor Cycling Calorie Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How are indoor cycling calories calculated?", acceptedAnswer: { "@type": "Answer", text: "We use MET (Metabolic Equivalent of Task) values based on intensity level and body weight to estimate calories burned." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><IndoorCyclingCalorieClient /></div>);
}
