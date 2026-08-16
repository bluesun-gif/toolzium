import JsonLd from "@/components/seo/json-ld";
import FancyTextClient from "@/components/tools/text/fancy-text-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Fancy Text Generator - Cool Fonts & Text Styles",
  description: "Generate fancy text, cool fonts, and weird unicode styles for Instagram, Twitter, Facebook, and Discord.",
  path: "/tools/text/fancy-text",
  keywords: ["fancy text", "text generator", "cool fonts", "unicode text", "weird text", "text styles", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/text/fancy-text`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Fancy Text Generator — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Generate fancy text, cool fonts, and weird unicode styles for Instagram, Twitter, Facebook, and Discord.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Mathematical Bold text",
      "Fraktur text",
      "Script text",
      "Upside Down text",
      "Fullwidth text",
      "Zalgo text"
    ],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Text", item: `${siteURL}/tools#cat-text` },
      { "@type": "ListItem", position: 3, name: "Fancy Text Generator", item: toolUrl },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <FancyTextClient />
    
      <RelatedTools currentToolUrl="/tools/text/fancy-text" />
</div>
  );
}
