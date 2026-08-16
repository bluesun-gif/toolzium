import JsonLd from "@/components/seo/json-ld";
import { RemSleepAlarmClient } from "@/components/tools/time/rem-sleep-alarm-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "REM Sleep Cycle & Wakeup Alarm Calculator | Toolzium",
  description: "Calculate optimal bedtime and wake-up alarm times based on 90-minute REM sleep cycles.",
  path: "/tools/time/rem-sleep-alarm",
  keywords: ["rem sleep", "sleep cycle", "alarm calculator", "wakeup time", "time tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/rem-sleep-alarm";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "REM Sleep Cycle Calculator", url: toolUrl, description: "Calculate optimal bedtime and wake-up alarm times.", applicationCategory: "UtilitiesApplication", operatingSystem: "All" };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "REM Sleep Cycle Calculator", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><RemSleepAlarmClient />
      <RelatedTools currentToolUrl="/tools/time/rem-sleep-alarm" />
</div>);
}
