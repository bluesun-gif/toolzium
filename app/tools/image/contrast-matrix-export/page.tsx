import JsonLd from "@/components/seo/json-ld";
import { ContrastMatrixExportClient } from "@/components/tools/image/contrast-matrix-export-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Color Contrast Matrix Exporter | Toolzium",
  description: "Generate accessible design system color contrast matrices. Check WCAG AA/AAA compliance for your palette.",
  path: "/tools/image/contrast-matrix-export",
  keywords: ["color contrast", "accessibility tool", "wcag compliance", "contrast matrix", "design system tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/contrast-matrix-export`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Color Contrast Matrix Exporter",
    url: toolUrl,
    description: "Generate accessible design system color contrast matrices.",
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" },
      { "@type": "ListItem", position: 3, name: "Contrast Matrix", item: toolUrl }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <ContrastMatrixExportClient />
    </div>
  );
}
