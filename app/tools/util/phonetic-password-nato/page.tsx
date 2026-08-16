import JsonLd from "@/components/seo/json-ld";
import { PhoneticPasswordClient } from "@/components/tools/util/phonetic-password-nato-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Phonetic Password Generator & NATO Guide | Toolzium",
  description: "Generate secure passwords with NATO phonetic spelling breakdowns to easily communicate them.",
  path: "/tools/util/phonetic-password-nato",
  keywords: ["password generator", "nato phonetic alphabet", "secure password", "communicate password"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/util/phonetic-password-nato";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Phonetic Password Generator", url: toolUrl, description: "Generate secure passwords with NATO phonetic spelling.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Utilities", item: siteURL + "/tools#cat-utilities" }, { "@type": "ListItem", position: 3, name: "Phonetic Password Generator", item: toolUrl }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <PhoneticPasswordClient />
    
      <RelatedTools currentToolUrl="/tools/util/phonetic-password-nato" />
</div>
  );
}
