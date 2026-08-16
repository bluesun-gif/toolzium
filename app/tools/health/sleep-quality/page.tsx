import JsonLd from "@/components/seo/json-ld";
import { SleepQualityClient } from "@/components/tools/health/sleep-quality-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Sleep Quality Analyzer | Toolzium",
  description: "Analyze and score your sleep quality, calculate sleep efficiency, and track habits.",
  path: "/tools/health/sleep-quality",
  keywords: ["sleep quality", "sleep calculator", "health tools", "sleep score", "sleep efficiency"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/sleep-quality`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Sleep Quality Analyzer",
    url: toolUrl,
    description: "Analyze and score your sleep quality.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` },
      { "@type": "ListItem", position: 3, name: "Sleep Quality Analyzer", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is the sleep quality score calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The score is calculated based on sleep duration, sleep efficiency, number of interruptions, time taken to fall asleep, and daily habits like caffeine intake and screen time."
        }
      }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SleepQualityClient />
    
      <RelatedTools currentToolUrl="/tools/health/sleep-quality" />
</div>
  );
}
