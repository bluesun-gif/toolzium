import JsonLd from "@/components/seo/json-ld";
import { CalorieBurnClient } from "@/components/tools/health/calorie-burn-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Calorie Burn Calculator | Toolzium",
  description: "Calculate calories burned during various physical activities and exercises based on your body weight and duration.",
  path: "/tools/health/calorie-burn",
  keywords: ["calorie calculator", "burn calories", "met calculator", "activity calories"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/calorie-burn`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Calorie Burn Calculator", url: toolUrl, description: "Calculate calories burned during various activities.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Calorie Burn Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is calorie burn calculated?", acceptedAnswer: { "@type": "Answer", text: "It uses the MET (Metabolic Equivalent of Task) value of an activity, combined with your weight and the duration of the activity." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CalorieBurnClient /></div>);
}
