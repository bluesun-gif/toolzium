import JsonLd from "@/components/seo/json-ld";
import MarkdownTableClient from "@/components/tools/text/markdown-table-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Markdown Table Generator | Toolzium",
  description: "Create and edit markdown tables visually. Set rows, columns, alignment, and preview live.",
  path: "/tools/text/markdown-table",
  keywords: ["markdown", "table", "generator", "editor"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/text/markdown-table`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Markdown Table Generator", url: toolUrl, description: "Create markdown tables visually", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Text Tools", item: `${siteURL}/tools#cat-text` }, { "@type": "ListItem", position: 3, name: "Markdown Table Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I create a markdown table?", acceptedAnswer: { "@type": "Answer", text: "Set the number of rows and columns, edit the cells, and copy the generated markdown." } }] };
  return (<div className="max-w-6xl mx-auto space-y-8"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><MarkdownTableClient />
      <RelatedTools currentToolUrl="/tools/text/markdown-table" />
</div>);
}
