import JsonLd from "@/components/seo/json-ld";
import { VisaCheckClient } from "@/components/tools/travel/visa-check-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Visa Requirements Checker | Toolzium",
  description: "Check visa requirements and travel rules between countries.",
  path: "/tools/travel/visa-check",
  keywords: ["visa checker", "travel visa", "visa requirements", "passport power"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/travel/visa-check`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Visa Requirements Checker", url: toolUrl, description: "Check visa requirements and travel rules between countries.", applicationCategory: "TravelApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: `${siteURL}/tools#cat-travel` }, { "@type": "ListItem", position: 3, name: "Visa Requirements Checker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Is this visa information guaranteed?", acceptedAnswer: { "@type": "Answer", text: "No, this tool provides a general guide. Always verify with official government sources before traveling." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <VisaCheckClient />
    </div>
  );
}
