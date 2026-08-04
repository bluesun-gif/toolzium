import JsonLd from "@/components/seo/json-ld";
import { RemSleepClockClient } from "@/components/tools/time/rem-sleep-clock-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "REM Sleep Cycle & Optimal Bedtime Clock | Toolzium",
  description: "Calculate optimal sleep & wake times based on 90-minute REM sleep cycles.",
  path: "/tools/time/rem-sleep-clock",
  keywords: ["sleep cycle calculator", "rem sleep clock", "optimal bedtime", "wake up time", "time tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/rem-sleep-clock";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "REM Sleep Cycle Clock", url: toolUrl, description: "Calculate optimal sleep & wake times based on 90-minute REM sleep cycles.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "REM Sleep Clock", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a sleep cycle?", acceptedAnswer: { "@type": "Answer", text: "A sleep cycle lasts about 90 minutes. Waking up at the end of a cycle helps you feel more refreshed." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <RemSleepClockClient />
    </div>
  );
}
