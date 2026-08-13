import JsonLd from "@/components/seo/json-ld";
import CitationGeneratorClient from "@/components/tools/academic/citation-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "APA, MLA & Chicago Citation Generator — 100% Free Bibliography Maker | Toolzium",
  description:
    "Generate accurate APA 7th, MLA 9th, Chicago, and NLM style citations and works cited bibliographies for academic essays, books, and websites.",
  path: "/tools/academic/citation-generator",
  keywords: [
    "citation generator",
    "apa citation generator",
    "chicago citation generator",
    "mla citation maker",
    "nlm citation generator",
    "do my bibliography",
    "bibliography generator"
  ],
});

export default function CitationGeneratorPage() {
  const toolUrl = siteURL + "/tools/academic/citation-generator";

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "APA / MLA / Chicago Citation Generator",
    url: toolUrl,
    description: "Generate formatted APA 7th, MLA 9th, Chicago, and NLM citations.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Academic Tools", item: siteURL + "/tools/academic" },
      { "@type": "ListItem", position: 3, name: "Citation Generator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which citation styles are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Toolzium Citation Generator supports APA 7th edition, MLA 9th edition, Chicago Manual of Style (Notes & Bibliography), and NLM (National Library of Medicine) formats."
        }
      },
      {
        "@type": "Question",
        name: "Is this citation generator free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, it is 100% free with no registration required. You can format unlimited citations for websites, books, journal articles, and reports."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CitationGeneratorClient />
    </div>
  );
}
