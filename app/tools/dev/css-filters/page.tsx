import JsonLd from "@/components/seo/json-ld";
import { CssFiltersClient } from "@/components/tools/dev/css-filters-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CSS Filter Generator | Toolzium",
  description: "Visually generate and preview CSS filter effects like blur, brightness, contrast, and more.",
  path: "/tools/dev/css-filters",
  keywords: ["css filter generator", "css effects", "css image filters", "web design tools", "developer tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-filters";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS Filter Generator", url: toolUrl, description: "Visually generate and preview CSS filter effects like blur, brightness, contrast, and more.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "CSS Filter Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What are CSS filters?", acceptedAnswer: { "@type": "Answer", text: "CSS filters provide effects like blurring or color shifting on an element's rendering before it is displayed." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CssFiltersClient /></div>);
}
