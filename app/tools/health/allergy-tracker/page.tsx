import JsonLd from "@/components/seo/json-ld";
import { AllergyTrackerClient } from "@/components/tools/health/allergy-tracker-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Allergy Tracker | Toolzium",
  description: "Track allergies and reactions with our free online allergy tracker tool.",
  path: "/tools/health/allergy-tracker",
  keywords: ["allergy tracker", "health tools", "reaction log", "allergy log"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/allergy-tracker`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Allergy Tracker", url: toolUrl, description: "Track allergies and reactions.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Allergy Tracker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Is this allergy tracker a replacement for medical advice?", acceptedAnswer: { "@type": "Answer", text: "No, this tool is for informational purposes only. Please consult a doctor for medical advice." } }, { "@type": "Question", name: "Is my allergy data secure?", acceptedAnswer: { "@type": "Answer", text: "Yes, your data is saved locally in your browser and never sent to any server." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <AllergyTrackerClient />
    </div>
  );
}
