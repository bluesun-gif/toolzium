import JsonLd from "@/components/seo/json-ld";
import { JumpropeCalorieClient } from "@/components/tools/health/jumprope-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Jump Rope & HIIT Calorie Calculator | Toolzium",
  description: "Calculate total calories burned during jump rope and High-Intensity Interval Training (HIIT) workouts.",
  path: "/tools/health/jumprope-calorie",
  keywords: ["jump rope", "HIIT", "calorie calculator", "fitness tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/jumprope-calorie";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Jump Rope & HIIT Calorie Calculator",
    url: toolUrl,
    description: "Calculate total calories burned during jump rope and High-Intensity Interval Training (HIIT) workouts.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" },
      { "@type": "ListItem", position: 3, name: "Jump Rope Calorie Calculator", item: toolUrl }
    ]
  };


  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Jump Rope & HIIT Calorie Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Jump Rope & HIIT Calorie Calculator runs instantly in your browser. Calculate total calories burned during jump rope and High-Intensity Interval Training (HIIT) workouts. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Jump Rope & HIIT Calorie Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Jump Rope & HIIT Calorie Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Jump Rope & HIIT Calorie Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <JumpropeCalorieClient />
    
      <RelatedTools currentToolUrl="/tools/health/jumprope-calorie" />
</div>
  );
}
