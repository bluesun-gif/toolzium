import JsonLd from "@/components/seo/json-ld";
import { SleepEfficiencyTrackerClient } from "@/components/tools/time/sleep-efficiency-tracker-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Sleep Efficiency & Quality Tracker | Toolzium",
  description: "Calculate your sleep efficiency percentage, score, and get recommendations for better sleep hygiene.",
  path: "/tools/time/sleep-efficiency-tracker",
  keywords: ["sleep efficiency", "sleep quality", "sleep tracker", "sleep calculator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/sleep-efficiency-tracker";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Sleep Efficiency & Quality Tracker", url: toolUrl, description: "Calculate your sleep efficiency percentage, score, and get recommendations for better sleep hygiene.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "Sleep Efficiency & Quality Tracker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is sleep efficiency?", acceptedAnswer: { "@type": "Answer", text: "Sleep efficiency is the ratio of total time spent asleep to the total time spent in bed." } }] };
  
  return (
    <div className={"space-y-4"}>
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SleepEfficiencyTrackerClient />
    
      <RelatedTools currentToolUrl="/tools/time/sleep-efficiency-tracker" />
</div>
  );
}
