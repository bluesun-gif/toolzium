import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MarkdownTableClient from "@/components/tools/text/markdown-table-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Markdown Table Generator",
  description: "Create markdown tables visually. Set rows and columns up to 10x10. Edit cells inline. Column alignment options. Live markdown preview. Import from CSV. Copy output.",
  path: "/tools/text/markdown-table",
  keywords: ["columns", "alignment", "markdown", "inline", "rows", "column", "create", "options", "tables", "visually", "cells", "edit"],
});

export default function Page() {
<<<<<<< HEAD
  const toolUrl = `${siteURL}/tools/text/markdown-table`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Markdown Table Generator", url: toolUrl, description: "Create markdown tables visually", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Text Tools", item: `${siteURL}/tools#cat-text` }, { "@type": "ListItem", position: 3, name: "Markdown Table Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I create a markdown table?", acceptedAnswer: { "@type": "Answer", text: "Set the number of rows and columns, edit the cells, and copy the generated markdown." } }] };
  return (<div className="max-w-6xl mx-auto space-y-8"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><MarkdownTableClient />
      <RelatedTools currentToolUrl="/tools/text/markdown-table" />
</div>);
=======
  const jsonLd = buildToolJsonLd({
    name: "Markdown Table Generator",
    description: "Create markdown tables visually. Set rows and columns up to 10x10. Edit cells inline. Column alignment options. Live markdown preview. Import from CSV. Copy output.",
    path: "/tools/text/markdown-table",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MarkdownTableClient />
    </div>
  );
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
