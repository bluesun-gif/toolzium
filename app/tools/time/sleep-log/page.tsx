import JsonLd from "@/components/seo/json-ld";
import { SleepLogClient } from "@/components/tools/time/sleep-log-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Sleep Log & Circadian Rhythm Tracker | Toolzium",
  description: "Log and analyze daily sleep patterns, calculate average sleep duration, and track sleep consistency.",
  path: "/tools/time/sleep-log",
  keywords: ["sleep log", "circadian rhythm tracker", "sleep tracker", "time tool", "sleep consistency"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/sleep-log";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Sleep Log Tracker", url: toolUrl, description: "Log and analyze daily sleep patterns and circadian rhythm.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "Sleep Log Tracker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What does this sleep log track?", acceptedAnswer: { "@type": "Answer", text: "It tracks bedtime, wake time, sleep quality, and calculates sleep consistency." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><SleepLogClient />
      <RelatedTools currentToolUrl="/tools/time/sleep-log" />
</div>);
}
