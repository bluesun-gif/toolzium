import JsonLd from "@/components/seo/json-ld";
import { FaviconGeneratorClient } from "@/components/tools/image/favicon-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Favicon Generator | Toolzium",
  description: "Generate favicons from text, emoji, or images. Preview and download in multiple sizes.",
  path: "/tools/image/favicon",
  keywords: ["favicon", "generator", "image", "icon"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/favicon`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Favicon Generator", url: toolUrl, description: "Generate favicons easily", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` }, { "@type": "ListItem", position: 3, name: "Favicon Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I make a favicon?", acceptedAnswer: { "@type": "Answer", text: "Enter text, choose colors, or upload an image to generate a favicon." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><FaviconGeneratorClient /></div>);
}
