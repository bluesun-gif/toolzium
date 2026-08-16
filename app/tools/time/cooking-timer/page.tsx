import JsonLd from "@/components/seo/json-ld";
import { CookingTimerClient } from "@/components/tools/time/cooking-timer-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Cooking Timer | Toolzium",
  description: "Multiple simultaneous cooking timers with presets and visual alerts.",
  path: "/tools/time/cooking-timer",
  keywords: ["cooking timer", "multiple timers", "kitchen timer", "preset timers"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/time/cooking-timer`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Cooking Timer", url: toolUrl, description: "Multiple simultaneous cooking timers with presets.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: `${siteURL}/tools#cat-time` }, { "@type": "ListItem", position: 3, name: "Cooking Timer", item: toolUrl }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <CookingTimerClient />
    
      <RelatedTools currentToolUrl="/tools/time/cooking-timer" />
</div>
  );
}
