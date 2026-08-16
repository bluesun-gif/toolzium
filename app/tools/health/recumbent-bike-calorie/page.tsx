import JsonLd from "@/components/seo/json-ld";
import { RecumbentBikeCalorieClient } from "@/components/tools/health/recumbent-bike-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Recumbent Exercise Bike Calorie Calculator | Toolzium",
  description: "Calculate calories burned on a recumbent stationary bike based on weight, duration, intensity, and cadence.",
  path: "/tools/health/recumbent-bike-calorie",
  keywords: ["recumbent bike calories", "stationary bike calculator", "exercise bike calories burned", "health calculator", "fitness tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/recumbent-bike-calorie";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Recumbent Exercise Bike Calorie Calculator",
    url: toolUrl,
    description: "Calculate calories burned on a recumbent stationary bike based on weight, duration, intensity, and cadence.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" },
      { "@type": "ListItem", position: 3, name: "Recumbent Bike Calorie Calculator", item: toolUrl }
    ]
  };


  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Recumbent Exercise Bike Calorie Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Recumbent Exercise Bike Calorie Calculator runs instantly in your browser. Calculate calories burned on a recumbent stationary bike based on weight, duration, intensity, and cadence. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Recumbent Exercise Bike Calorie Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Recumbent Exercise Bike Calorie Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Recumbent Exercise Bike Calorie Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <RecumbentBikeCalorieClient />
    
      <RelatedTools currentToolUrl="/tools/health/recumbent-bike-calorie" />
</div>
  );
}
