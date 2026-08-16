import JsonLd from "@/components/seo/json-ld";
import { FastingTrackerClient } from "@/components/tools/health/fasting-tracker-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Intermittent Fasting Tracker | Toolzium",
  description: "Track intermittent fasting protocols, monitor fasting state, and log history.",
  path: "/tools/health/fasting-tracker",
  keywords: ["fasting tracker", "intermittent fasting", "health tools", "fasting timer"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/fasting-tracker";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Intermittent Fasting Tracker", url: toolUrl, description: "Track intermittent fasting protocols.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Fasting Tracker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What does this tool do?", acceptedAnswer: { "@type": "Answer", text: "It tracks your intermittent fasting time and states." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <FastingTrackerClient />
    
      <RelatedTools currentToolUrl="/tools/health/fasting-tracker" />
</div>
  );
}
