import JsonLd from "@/components/seo/json-ld";
import { ShiftCircadianClient } from "@/components/tools/time/shift-circadian-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shift Work Sleep Schedule & Circadian Calculator | Toolzium",
  description: "Calculate optimal sleep and wake cycles for shift workers.",
  path: "/tools/time/shift-circadian",
  keywords: ["shift work", "sleep schedule", "circadian rhythm", "time tools", "health"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/shift-circadian";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shift Work Sleep Schedule & Circadian Calculator",
    url: toolUrl,
    description: "Calculate optimal sleep and wake cycles for shift workers.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" },
      { "@type": "ListItem", position: 3, name: "Shift Sleep Calculator", item: toolUrl }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <ShiftCircadianClient />
    </div>
  );
}
