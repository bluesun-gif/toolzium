import JsonLd from "@/components/seo/json-ld";
import { SleepEfficiencyClient } from "@/components/tools/time/sleep-efficiency-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Sleep Efficiency & Quality Score Calculator | Toolzium",
  description: "Calculate your Sleep Efficiency Percentage and Quality Score based on time in bed and actual time asleep.",
  path: "/tools/time/sleep-efficiency",
  keywords: ["sleep efficiency calculator", "sleep quality score", "time tools", "sleep health", "insomnia tracker"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/sleep-efficiency";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Sleep Efficiency Calculator", url: toolUrl, description: "Calculate your Sleep Efficiency Percentage and Quality Score.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "Sleep Efficiency Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a good sleep efficiency?", acceptedAnswer: { "@type": "Answer", text: "A sleep efficiency of 85% or higher is generally considered normal and healthy." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><SleepEfficiencyClient />
      <RelatedTools currentToolUrl="/tools/time/sleep-efficiency" />
</div>);
}
