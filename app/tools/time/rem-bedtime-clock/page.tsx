import JsonLd from "@/components/seo/json-ld";
import { RemBedtimeClockClient } from "@/components/tools/time/rem-bedtime-clock-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "REM Sleep Cycle & Bedtime Alarm Clock | Toolzium",
  description: "Calculate optimal bedtime and wake-up alarm times based on 90-minute REM sleep cycles.",
  path: "/tools/time/rem-bedtime-clock",
  keywords: ["rem", "sleep cycle", "bedtime", "alarm clock", "time"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/rem-bedtime-clock";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "REM Sleep Cycle & Bedtime Alarm Clock", url: toolUrl, description: "Calculate optimal bedtime and wake-up alarm times based on 90-minute REM sleep cycles.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "REM Sleep Cycle & Bedtime Alarm Clock", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a REM cycle?", acceptedAnswer: { "@type": "Answer", text: "A REM cycle is a stage of sleep that typically lasts 90 minutes." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><RemBedtimeClockClient />
      <RelatedTools currentToolUrl="/tools/time/rem-bedtime-clock" />
</div>);
}
