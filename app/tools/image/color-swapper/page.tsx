import JsonLd from "@/components/seo/json-ld";
import { ColorSwapperClient } from "@/components/tools/image/color-swapper-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Image Color Swapper | Toolzium",
  description: "Swap or replace specific colors in your images instantly.",
  path: "/tools/image/color-swapper",
  keywords: ["color swapper", "replace color", "image editor", "recolor"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/color-swapper`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Image Color Swapper", url: toolUrl, description: "Swap or replace specific colors in your images.", applicationCategory: "MultimediaApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` }, { "@type": "ListItem", position: 3, name: "Color Swapper", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Is my image uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No, all processing happens locally in your browser." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ColorSwapperClient /></div>);
}
