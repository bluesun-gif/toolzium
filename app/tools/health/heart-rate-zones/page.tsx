import JsonLd from "@/components/seo/json-ld";
import { HeartRateZonesClient } from "@/components/tools/health/heart-rate-zones-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Heart Rate Zone Calculator | Toolzium",
  description: "Calculate your optimal heart rate training zones based on your age and resting heart rate.",
  path: "/tools/health/heart-rate-zones",
  keywords: ["heart rate calculator", "training zones", "karvonen formula", "health tool", "fitness calculator"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/heart-rate-zones`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Heart Rate Zone Calculator", url: toolUrl, description: "Calculate your optimal heart rate training zones based on your age and resting heart rate.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Heart Rate Zone Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What are heart rate zones?", acceptedAnswer: { "@type": "Answer", text: "Heart rate zones are percentages of your maximum heart rate that indicate how intensely you are exercising." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <HeartRateZonesClient />
    </div>
  );
}
