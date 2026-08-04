import JsonLd from "@/components/seo/json-ld";
import { ColorContrastClient } from "@/components/tools/image/color-contrast-extractor-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Color Contrast Ratio & Accessibility Analyzer | Toolzium",
  description: "Test color contrast ratios between text and background colors to ensure WCAG accessibility compliance.",
  path: "/tools/image/color-contrast-extractor",
  keywords: ["color contrast", "wcag", "accessibility analyzer", "contrast ratio", "image tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/color-contrast-extractor`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Color Contrast Ratio & Accessibility Analyzer", url: toolUrl, description: "Test color contrast ratios between text and background colors.", applicationCategory: "DesignApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` }, { "@type": "ListItem", position: 3, name: "Color Contrast", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><ColorContrastClient /></div>);
}
