import JsonLd from "@/components/seo/json-ld";
import { CssGridClient } from "@/components/tools/dev/css-grid-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CSS Grid Generator | Toolzium",
  description: "Visual CSS Grid layout generator. Set columns, rows, gaps, and generate CSS code.",
  path: "/tools/dev/css-grid",
  keywords: ["css grid", "grid generator", "css layout", "web design"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/css-grid`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS Grid Generator", url: toolUrl, description: "Visual CSS Grid layout generator", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${siteURL}/tools#cat-dev` }, { "@type": "ListItem", position: 3, name: "CSS Grid Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is CSS Grid?", acceptedAnswer: { "@type": "Answer", text: "CSS Grid is a powerful 2-dimensional layout system for the web." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CssGridClient /></div>);
}
