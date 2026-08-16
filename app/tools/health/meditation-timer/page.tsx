import JsonLd from "@/components/seo/json-ld";
import { MeditationTimerClient } from "@/components/tools/health/meditation-timer-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Meditation Timer | Toolzium",
  description: "A calming meditation timer with presets, custom durations, and a breathing guide.",
  path: "/tools/health/meditation-timer",
  keywords: ["meditation", "timer", "health", "mindfulness", "breathing guide", "wellness"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/meditation-timer`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Meditation Timer", url: toolUrl, description: "A calming meditation timer with presets, custom durations, and a breathing guide.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Meditation Timer", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is the Meditation Timer?", acceptedAnswer: { "@type": "Answer", text: "It is a simple timer to help you meditate, featuring preset times and a breathing guide." } }, { "@type": "Question", name: "Does it have a breathing guide?", acceptedAnswer: { "@type": "Answer", text: "Yes, it includes an animated breathing guide (4s inhale, 4s hold, 4s exhale)." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <MeditationTimerClient />
    
      <RelatedTools currentToolUrl="/tools/health/meditation-timer" />
</div>
  );
}
