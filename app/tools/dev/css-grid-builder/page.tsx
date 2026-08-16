import JsonLd from "@/components/seo/json-ld";
import { CssGridBuilderClient } from "@/components/tools/dev/css-grid-builder-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "CSS Grid Layout Visual Builder | Toolzium",
  description: "Interactive visual CSS Grid builder and playground. Create grid layouts and generate CSS code snippets.",
  path: "/tools/dev/css-grid-builder",
  keywords: ["CSS grid", "grid generator", "CSS layout builder", "web development tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-grid-builder";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CSS Grid Layout Visual Builder",
    url: toolUrl,
    description: "Interactive visual CSS Grid builder and playground. Create grid layouts and generate CSS code snippets.",
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
      { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" },
      { "@type": "ListItem", position: 3, name: "CSS Grid Layout Visual Builder", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is CSS Grid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns."
        }
      },
      {
        "@type": "Question",
        name: "How do I generate CSS grid code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use our interactive visual builder to add columns, rows, and gaps, then copy the generated CSS snippet."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CssGridBuilderClient />
    
      <RelatedTools currentToolUrl="/tools/dev/css-grid-builder" />
</div>
  );
}
