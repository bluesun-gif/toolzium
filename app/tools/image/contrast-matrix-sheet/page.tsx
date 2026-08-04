import JsonLd from "@/components/seo/json-ld";
import { ContrastMatrixSheetClient } from "@/components/tools/image/contrast-matrix-sheet-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contrast Compliance Color Matrix Sheet Exporter | Toolzium",
  description: "Test brand palette colors against each other for WCAG 2.1 AA/AAA accessibility compliance.",
  path: "/tools/image/contrast-matrix-sheet",
  keywords: ["color contrast", "wcag compliance", "accessibility matrix", "color palette tester", "design system tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/contrast-matrix-sheet";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Contrast Compliance Color Matrix Sheet", url: toolUrl, description: "Test brand palette colors against each other for WCAG 2.1 AA/AAA accessibility compliance.", applicationCategory: "DesignApplication", operatingSystem: "All" };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, { "@type": "ListItem", position: 3, name: "Contrast Color Matrix", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><ContrastMatrixSheetClient /></div>);
}
