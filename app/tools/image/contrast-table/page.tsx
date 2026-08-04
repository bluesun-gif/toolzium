import JsonLd from "@/components/seo/json-ld";
import { ContrastTableClient } from "@/components/tools/image/contrast-table-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Color Contrast Ratio Compliance Table | Toolzium",
  description: "Generate WCAG 2.1 accessibility contrast comparison tables for design systems.",
  path: "/tools/image/contrast-table",
  keywords: ["color", "contrast", "wcag", "accessibility", "a11y", "design system", "compliance"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/contrast-table";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Color Contrast Ratio Compliance Table", url: toolUrl, description: "Generate WCAG 2.1 accessibility contrast comparison tables for design systems.", applicationCategory: "DesignApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, { "@type": "ListItem", position: 3, name: "Color Contrast Ratio Compliance Table", item: toolUrl }] };
  return (<div className={"space-y-4"}><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><ContrastTableClient /></div>);
}
