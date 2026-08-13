import JsonLd from "@/components/seo/json-ld";
import AiMetaGeneratorClient from "@/components/tools/seo/ai-meta-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Meta Generator — Free SEO Title & Meta Description Generator | Toolzium",
  description: "Generate search-optimized HTML title tags and meta descriptions tailored for maximum organic Google CTR with live AI inference.",
  path: "/tools/seo/ai-meta-generator",
  keywords: [
    "ai meta generator",
    "meta description generator",
    "seo meta description generator",
    "meta generator",
    "meta description creator",
    "homepage meta description generator",
    "free meta title generator"
  ],
});

export default function AiMetaGeneratorPage() {
  const toolUrl = siteURL + "/tools/seo/ai-meta-generator";

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Meta Generator",
    url: toolUrl,
    description: "Generate search-optimized HTML title tags and meta descriptions.",
    applicationCategory: "SEOApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "SEO Tools", item: siteURL + "/tools/seo" },
      { "@type": "ListItem", position: 3, name: "AI Meta Generator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the recommended meta description length for Google SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Google typically truncates meta descriptions after 155 to 160 characters on desktop and ~120 characters on mobile. Toolzium AI Meta Generator optimizes output length precisely within 150-155 characters."
        }
      },
      {
        "@type": "Question",
        name: "How does AI generate high-CTR meta tags?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The AI analyzes your target page topic, extracts primary keywords, and crafts compelling benefit-driven action verbs that encourage searchers to click."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <AiMetaGeneratorClient />
    </div>
  );
}
