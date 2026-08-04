import JsonLd from "@/components/seo/json-ld";
import { SleepLatencyClient } from "@/components/tools/time/sleep-latency-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sleep Latency & Alarm Clock | Toolzium",
  description: "Sleep latency & sleep efficiency analyzer with custom alarm calculator.",
  path: "/tools/time/sleep-latency",
  keywords: ["sleep", "latency", "alarm", "clock", "calculator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/sleep-latency";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Sleep Latency & Alarm Clock", url: toolUrl, description: "Sleep latency & sleep efficiency analyzer with custom alarm calculator.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "Sleep Latency", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is sleep latency?", acceptedAnswer: { "@type": "Answer", text: "Sleep latency is the time it takes to transition from full wakefulness to sleep." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><SleepLatencyClient /></div>);
}
