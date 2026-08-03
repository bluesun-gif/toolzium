import JsonLd from "@/components/seo/json-ld";
import { JetLagClient } from "@/components/tools/travel/jet-lag-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Jet Lag Calculator | Toolzium",
  description: "Calculate timezone differences, estimate jet lag severity, and get personalized recovery tips based on your travel direction.",
  path: "/tools/travel/jet-lag",
  keywords: ["jet lag calculator", "timezone difference", "travel tips", "jet lag recovery"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/travel/jet-lag`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Jet Lag Calculator",
    url: toolUrl,
    description: "Estimate jet lag severity and get recovery tips.",
    applicationCategory: "TravelApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Travel Tools", item: `${siteURL}/tools#cat-travel` },
      { "@type": "ListItem", position: 3, name: "Jet Lag Calculator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is jet lag recovery time calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Generally, it takes about 1 day to recover for every 1 to 1.5 timezones crossed. Traveling east is often harder to adjust to than traveling west."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <JetLagClient />
    </div>
  );
}
