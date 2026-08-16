import JsonLd from "@/components/seo/json-ld";
import { SleepLatencyClient } from "@/components/tools/time/sleep-latency-calc-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Sleep Latency & Sleep Onset Calculator | Toolzium",
  description: "Calculate optimal bedtimes based on sleep latency and 90-minute REM sleep cycles.",
  path: "/tools/time/sleep-latency-calc",
  keywords: ["sleep latency", "sleep calculator", "rem sleep cycles", "bedtime calculator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/sleep-latency-calc";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Sleep Latency & Sleep Onset Calculator",
    url: toolUrl,
    description: "Calculate optimal bedtimes based on sleep latency and 90-minute REM sleep cycles.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" },
      { "@type": "ListItem", position: 3, name: "Sleep Latency Calculator", item: toolUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is sleep latency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sleep latency is the amount of time it takes you to fall asleep after you get into bed. The average is about 15 minutes.",
        },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SleepLatencyClient />
    
      <RelatedTools currentToolUrl="/tools/time/sleep-latency-calc" />
</div>
  );
}
