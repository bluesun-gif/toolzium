import JsonLd from "@/components/seo/json-ld";
import { FileRenamerClient } from "@/components/tools/office/file-renamer-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Batch File Renamer | Toolzium",
  description: "Preview file rename patterns without actually renaming.",
  path: "/tools/office/file-renamer",
  keywords: ["file renamer", "batch rename", "office"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/office/file-renamer`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Batch File Renamer", url: toolUrl, description: "Preview file rename patterns without actually renaming.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: `${siteURL}/tools#cat-office` }, { "@type": "ListItem", position: 3, name: "Batch File Renamer", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this tool?", acceptedAnswer: { "@type": "Answer", text: "It helps you rename files in batch." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><FileRenamerClient />
      <RelatedTools currentToolUrl="/tools/office/file-renamer" />
</div>);
}
