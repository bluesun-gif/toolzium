import JsonLd from "@/components/seo/json-ld";
import { TzAlarmClient } from "@/components/tools/time/tz-alarm-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Timezone Alarm | Toolzium",
  description: "Set and manage alarms across different timezones.",
  path: "/tools/time/tz-alarm",
  keywords: ["timezone", "alarm", "world clock", "time", "snooze"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/tz-alarm";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Timezone Alarm", url: toolUrl, description: "Set cross-timezone alarms.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "Timezone Alarm", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Can I set multiple alarms?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can set as many alarms as you need." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TzAlarmClient />
    
      <RelatedTools currentToolUrl="/tools/time/tz-alarm" />
</div>
  );
}
