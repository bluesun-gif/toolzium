import JsonLd from "@/components/seo/json-ld";
import { BodyFatClient } from "@/components/tools/health/body-fat-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Body Fat Calculator | Toolzium",
  description: "Estimate your body fat percentage, lean mass, and fat mass using the US Navy method.",
  path: "/tools/health/body-fat",
  keywords: ["body fat calculator", "us navy body fat", "body fat percentage", "fitness tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/body-fat`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Body Fat Calculator", url: toolUrl, description: "Estimate your body fat percentage.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Body Fat Calculator", item: toolUrl }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <BodyFatClient />
    </div>
  );
}
