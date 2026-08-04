import JsonLd from "@/components/seo/json-ld";
import { StairStepperCalorieClient } from "@/components/tools/health/stair-stepper-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Stair Stepper & StepMill Calorie Calculator | Toolzium",
  description: "Calculate total calories burned on stair steppers, StepMill gym machines.",
  path: "/tools/health/stair-stepper-calorie",
  keywords: ["calorie", "calculator", "stair stepper", "health"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/stair-stepper-calorie";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Stair Stepper & StepMill Calorie Calculator", url: toolUrl, description: "Calculate total calories burned on stair steppers, StepMill gym machines.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Stair Stepper Calorie", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How does it work?", acceptedAnswer: { "@type": "Answer", text: "It uses MET values to calculate calories burned." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><StairStepperCalorieClient /></div>);
}
