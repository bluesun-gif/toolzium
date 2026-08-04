import JsonLd from "@/components/seo/json-ld";
import { AspectRatioClient } from "@/components/tools/calc/aspect-ratio-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aspect Ratio Calculator | Toolzium",
  description: "Calculate and scale aspect ratios for images and videos.",
  path: "/tools/calc/aspect-ratio",
  keywords: ["aspect ratio", "resolution calculator", "resize calculator"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/calc/aspect-ratio`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Aspect Ratio Calculator", url: toolUrl, description: "Calculate and scale aspect ratios for images and videos.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteURL}/tools#cat-calc` }, { "@type": "ListItem", position: 3, name: "Aspect Ratio Calculator", item: toolUrl }] };
  
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><AspectRatioClient /></div>);
}
