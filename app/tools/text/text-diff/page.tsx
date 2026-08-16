import JsonLd from "@/components/seo/json-ld";
import TextDiffClient from "@/components/tools/text/text-diff-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Text Diff Viewer | Toolzium",
  description: "Compare two blocks of text side-by-side with highlighting for additions, deletions, and unchanged lines. Support for inline diff mode and line numbers.",
  path: "/tools/text/text-diff",
  keywords: ["text diff", "text compare", "diff viewer", "compare text", "text diff tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/text/text-diff`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Text Diff Viewer",
    url: toolUrl,
    description: "Compare two blocks of text side-by-side with highlighting for additions, deletions, and unchanged lines.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Text Tools", item: `${siteURL}/tools#cat-text` },
      { "@type": "ListItem", position: 3, name: "Text Diff Viewer", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a text diff viewer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A text diff viewer is a tool that compares two blocks of text and highlights the differences between them, such as additions, deletions, and unchanged lines."
        }
      },
      {
        "@type": "Question",
        name: "Does it support inline diff mode?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can toggle between side-by-side and inline (unified) diff modes."
        }
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TextDiffClient />
    
      <RelatedTools currentToolUrl="/tools/text/text-diff" />
</div>
  );
}
