import JsonLd from "@/components/seo/json-ld";
import { FontPairingClient } from "@/components/tools/image/font-pairing-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Font Pairing Suggester | Toolzium",
  description: "Discover beautiful font pairings for your next design project.",
  path: "/tools/image/font-pairing",
  keywords: ["font pairing", "typography", "design", "google fonts"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/font-pairing`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Font Pairing Suggester", url: toolUrl, description: "Discover beautiful font pairings for your next design project.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` }, { "@type": "ListItem", position: 3, name: "Font Pairing Suggester", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is font pairing?", acceptedAnswer: { "@type": "Answer", text: "Font pairing is the art of combining two complementary fonts to enhance the typography of a design." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><FontPairingClient /></div>);
}
