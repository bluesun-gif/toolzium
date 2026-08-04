import JsonLd from "@/components/seo/json-ld";
import { BusinessCardClient } from "@/components/tools/office/business-card-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Business Card Generator | Toolzium",
  description: "Design and generate custom digital business cards with QR codes and download as PNG.",
  path: "/tools/office/business-card",
  keywords: ["business card maker", "digital business card", "vCard generator", "office tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/office/business-card`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Business Card Generator", url: toolUrl, description: "Design and generate custom digital business cards.", applicationCategory: "BusinessApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: `${siteURL}/tools#cat-office` }, { "@type": "ListItem", position: 3, name: "Business Card Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I download the business card?", acceptedAnswer: { "@type": "Answer", text: "Fill in your details, customize the design, and click the Download button to save the card as a PNG image." } }, { "@type": "Question", name: "Can I add a QR code?", acceptedAnswer: { "@type": "Answer", text: "Yes, the tool automatically generates a QR code based on your contact details which you can include on the card." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <BusinessCardClient />
    </div>
  );
}
