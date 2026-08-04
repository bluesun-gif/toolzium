import JsonLd from "@/components/seo/json-ld";
import { BloodTypeClient } from "@/components/tools/health/blood-type-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blood Type Compatibility Checker | Toolzium",
  description: "Check blood type compatibility for donation and receiving. See universal donors and recipients.",
  path: "/tools/health/blood-type",
  keywords: ["blood type", "blood compatibility", "blood donation", "universal donor", "universal recipient"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/blood-type`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Blood Type Compatibility", url: toolUrl, description: "Check blood type compatibility.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Blood Type Compatibility", item: toolUrl }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <BloodTypeClient />
    </div>
  );
}
