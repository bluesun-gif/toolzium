import JsonLd from "@/components/seo/json-ld";
import { TimeCapsuleClient } from "@/components/tools/time/time-capsule-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Time Capsule Message | Toolzium",
  description: "Create digital time capsule messages locked until a future date.",
  path: "/tools/time/time-capsule",
  keywords: ["time capsule", "locked message", "future message", "time tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/time-capsule";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Time Capsule Message", url: toolUrl, description: "Create digital time capsule messages locked until a future date.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "Time Capsule Message", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How are messages locked?", acceptedAnswer: { "@type": "Answer", text: "They are stored locally in your browser and only become readable after the unlock date." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TimeCapsuleClient />
    
      <RelatedTools currentToolUrl="/tools/time/time-capsule" />
</div>
  );
}
