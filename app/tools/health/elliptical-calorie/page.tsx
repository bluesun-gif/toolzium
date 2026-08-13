import JsonLd from "@/components/seo/json-ld";
import { EllipticalCalorieClient } from "@/components/tools/health/elliptical-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Elliptical Trainer Calorie Calculator | Toolzium",
  description: "Calculate calories burned during Elliptical Cross-Trainer workouts based on effort, weight, and duration.",
  path: "/tools/health/elliptical-calorie",
  keywords: ["elliptical", "calorie calculator", "fitness", "workout", "cross trainer"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/elliptical-calorie";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Elliptical Trainer Calorie Calculator",
    url: toolUrl,
    description: "Calculate calories burned during Elliptical Cross-Trainer workouts.",
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
      { "@type": "ListItem", position: 3, name: "Elliptical Trainer Calorie Calculator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Elliptical Trainer Calorie Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Elliptical Trainer Calorie Calculator runs instantly in your browser. Calculate calories burned during Elliptical Cross-Trainer workouts based on effort, weight, and duration. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Elliptical Trainer Calorie Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Elliptical Trainer Calorie Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Elliptical Trainer Calorie Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EllipticalCalorieClient />
    </div>
  );
}
