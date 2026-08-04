import JsonLd from "@/components/seo/json-ld";
import { StepCounterClient } from "@/components/tools/health/step-counter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Step Counter & Pedometer Log | Toolzium",
  description: "Track your daily steps, set goals, and monitor calories burned and distance walked over time.",
  path: "/tools/health/step-counter",
  keywords: ["step counter", "pedometer", "health tools", "fitness tracker", "calories burned calculator"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/step-counter`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Step Counter & Pedometer Log",
    url: toolUrl,
    description: "Track your daily steps, set goals, and monitor calories burned and distance walked over time.",
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
      { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` },
      { "@type": "ListItem", position: 3, name: "Step Counter", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many calories are burned per step?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On average, a person burns about 0.04 to 0.05 calories per step, depending on their weight, pace, and fitness level. 10,000 steps roughly burns between 400 and 500 calories."
        }
      },
      {
        "@type": "Question",
        name: "What is an average stride length?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The average stride length is about 2.2 to 2.5 feet (0.67 to 0.76 meters). It is generally calculated as 0.413 x height for women and 0.415 x height for men."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <StepCounterClient />
    </div>
  );
}
