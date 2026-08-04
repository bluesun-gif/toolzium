import JsonLd from "@/components/seo/json-ld";
import { SleepOnsetClockClient } from "@/components/tools/time/sleep-onset-clock-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sleep Onset Latency & Bedtime Clock | Toolzium",
  description: "Calculate optimal bedtime and wake-up times accounting for personal sleep latency and 90-minute REM cycles.",
  path: "/tools/time/sleep-onset-clock",
  keywords: ["sleep calculator", "bedtime clock", "REM cycle calculator", "sleep latency", "wake up time"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/sleep-onset-clock";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Sleep Onset Latency & Bedtime Clock", url: toolUrl, description: "Calculate optimal bedtime and wake-up times accounting for personal sleep latency.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "Sleep Onset Latency & Bedtime Clock", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is sleep latency?", acceptedAnswer: { "@type": "Answer", text: "Sleep latency is the amount of time it takes to transition from full wakefulness to sleep." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SleepOnsetClockClient />
    </div>
  );
}
