import JsonLd from "@/components/seo/json-ld";
import { HydrationClient } from "@/components/tools/health/hydration-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Hydration Reminder | Toolzium",
  description: "Track daily water intake with visual progress.",
  path: "/tools/health/hydration",
  keywords: ["hydration tracker", "water reminder", "health", "wellness"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/hydration`;
  
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Hydration Reminder", 
    url: toolUrl, 
    description: "Track daily water intake.", 
    applicationCategory: "HealthApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, 
      { "@type": "ListItem", position: 3, name: "Hydration Reminder", item: toolUrl }
    ] 
  };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Hydration Reminder work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Hydration Reminder runs instantly in your browser. Track daily water intake with visual fill animation. Quick-add buttons for glass, bottle, can. Daily goal tracking. 7-day history. Hydration tips. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Hydration Reminder 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Hydration Reminder is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Hydration Reminder?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <HydrationClient />
    
      <RelatedTools currentToolUrl="/tools/health/hydration" />
</div>
  );
}
