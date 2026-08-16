import JsonLd from "@/components/seo/json-ld";
import { SleepCalculatorClient } from "@/components/tools/health/sleep-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Sleep Calculator — Optimal Wake & Bedtimes | Toolzium",
  description: "Calculate the best times to go to sleep or wake up based on 90-minute sleep cycles. Feel refreshed and avoid grogginess with our free sleep calculator.",
  path: "/tools/health/sleep-calculator",
  keywords: [
    "sleep calculator",
    "sleep cycle calculator",
    "wake up time",
    "bedtime calculator",
    "90 minute sleep cycle",
    "REM sleep",
    "health tool",
    "optimal sleep time",
    "sleep duration"
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/sleep-calculator`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Sleep Calculator",
    "url": toolUrl,
    "description": "Calculate optimal sleep and wake times based on 90-minute sleep cycles.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteURL },
      { "@type": "ListItem", "position": 2, "name": "Health Tools", "item": `${siteURL}/tools#cat-health` },
      { "@type": "ListItem", "position": 3, "name": "Sleep Calculator", "item": toolUrl }
    ]
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the sleep calculator work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It calculates optimal sleep or wake times by counting backwards or forwards in 90-minute sleep cycles, plus 15 minutes to fall asleep."
        }
      },
      {
        "@type": "Question",
        "name": "How long is a sleep cycle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A typical sleep cycle lasts about 90 minutes. Waking up at the end of a cycle helps you feel more refreshed and avoid sleep inertia."
        }
      }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SleepCalculatorClient />
    
      <RelatedTools currentToolUrl="/tools/health/sleep-calculator" />
</div>
  );
}
