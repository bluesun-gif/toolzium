import JsonLd from "@/components/seo/json-ld";
import { TravelDocumentsClient } from "@/components/tools/travel/documents-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Travel Document Checklist | Toolzium",
  description: "Comprehensive travel document checklist for any type of trip.",
  path: "/tools/travel/documents",
  keywords: ["travel", "documents", "checklist", "passport", "visa"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/documents";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Travel Document Checklist", url: toolUrl, description: "Checklist for travel documents.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Travel Document Checklist", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Can I add custom items?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can easily add custom items to your checklist." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TravelDocumentsClient />
    </div>
  );
}
