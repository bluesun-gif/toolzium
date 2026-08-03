import JsonLd from "@/components/seo/json-ld";
import { MacroCalculatorClient } from "@/components/tools/health/macro-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Macro Calculator | Toolzium",
  description: "Calculate your daily macronutrient targets (protein, carbs, fats) based on your fitness goals.",
  path: "/tools/health/macro-calculator",
  keywords: ["macro", "calculator", "diet", "nutrition", "protein", "carbs", "fats", "health"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/macro-calculator`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Macro Calculator", url: toolUrl, description: "Calculate your daily macronutrient targets.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Macro Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What are macros?", acceptedAnswer: { "@type": "Answer", text: "Macros (macronutrients) are proteins, carbohydrates, and fats that make up your caloric intake." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><MacroCalculatorClient /></div>);
}
