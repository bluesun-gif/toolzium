import JsonLd from "@/components/seo/json-ld";
import { ReadingListClient } from "@/components/tools/productivity/reading-list-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Reading List Manager | Toolzium",
  description: "Manage your reading list of books, articles, and papers with our free online tool.",
  path: "/tools/productivity/reading-list",
  keywords: ["reading list", "book tracker", "productivity tools", "reading tracker"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/reading-list`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Reading List Manager", url: toolUrl, description: "Manage your reading list of books and articles.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Reading List Manager", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Reading List Manager work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Reading List Manager runs instantly in your browser. Manage books and articles. Track status (To Read, Reading, Completed), rate with stars, add notes. Search, filter, sort. Export list. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Reading List Manager 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Reading List Manager is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Reading List Manager?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ReadingListClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/reading-list" />
</div>
  );
}
