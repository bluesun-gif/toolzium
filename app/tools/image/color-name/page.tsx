import JsonLd from "@/components/seo/json-ld";
import { ColorNameFinderClient } from "@/components/tools/image/color-name-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Color Name Finder | Toolzium",
  description: "Find the closest named color for any hex value, including CSS named colors and extended color names.",
  path: "/tools/image/color-name",
  keywords: ["color name", "hex to name", "color picker", "named colors"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/color-name`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Color Name Finder", url: toolUrl, description: "Find the closest named color for any hex value.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` }, { "@type": "ListItem", position: 3, name: "Color Name Finder", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this tool?", acceptedAnswer: { "@type": "Answer", text: "It finds the closest named color for a given hex code." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ColorNameFinderClient /></div>);
}
