import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssGridClient from "@/components/tools/dev/css-grid-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "CSS Grid Generator",
  description: "Visual CSS Grid layout generator. Set columns, rows, gap. Define grid-template with fr, px, auto. Span cells. Generate and copy CSS.",
  path: "/tools/dev/css-grid",
  keywords: ["columns", "with", "visual", "rows", "generator", "layout", "template", "grid", "auto", "span", "define"],
});

export default function Page() {
<<<<<<< HEAD
  const toolUrl = `${siteURL}/tools/dev/css-grid`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS Grid Generator", url: toolUrl, description: "Visual CSS Grid layout generator", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${siteURL}/tools#cat-dev` }, { "@type": "ListItem", position: 3, name: "CSS Grid Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is CSS Grid?", acceptedAnswer: { "@type": "Answer", text: "CSS Grid is a powerful 2-dimensional layout system for the web." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CssGridClient />
      <RelatedTools currentToolUrl="/tools/dev/css-grid" />
</div>);
=======
  const jsonLd = buildToolJsonLd({
    name: "CSS Grid Generator",
    description: "Visual CSS Grid layout generator. Set columns, rows, gap. Define grid-template with fr, px, auto. Span cells. Generate and copy CSS.",
    path: "/tools/dev/css-grid",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CssGridClient />
    </div>
  );
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
