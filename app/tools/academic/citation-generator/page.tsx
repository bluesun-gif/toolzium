import JsonLd from "@/components/seo/json-ld";
import CitationGeneratorClient from "@/components/tools/academic/citation-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Free Citation Generator (APA 7th, MLA 9th, Chicago, NLM) | Toolzium",
  description:
    "Free academic citation and bibliography generator. Create accurate APA 7th, MLA 9th, Chicago, Harvard, and NLM style citations instantly. No signup required.",
  path: "/tools/academic/citation-generator",
  keywords: [
    "nlm citation generator",
    "chicago citation machine",
    "do my bibliography",
    "chicago citation generator",
    "apa citation generator",
    "mla citation generator",
    "chicago bibliography machine",
    "bibliographic reference generator",
    "apa reference calculator",
    "citation generator for chicago style",
  ],
});

export default function CitationGeneratorPage() {
  const toolUrl = siteURL + "/tools/academic/citation-generator";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Academic Citation & Bibliography Generator",
    url: toolUrl,
    description: "Generate APA 7th, MLA 9th, Chicago, NLM, and Harvard citations and full bibliographies instantly.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Academic Tools", item: siteURL + "/tools#cat-academic" },
      { "@type": "ListItem", position: 3, name: "Citation Generator", item: toolUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which citation styles does this generator support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support APA 7th Edition, MLA 9th Edition, Chicago Style, Harvard, IEEE, NLM, and Vancouver citation formats.",
        },
      },
      {
        "@type": "Question",
        name: "Is this citation generator completely free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, 100% free with unlimited citation generation and bibliography exports. No account or subscription required.",
        },
      },
      {
        "@type": "Question",
        name: "How does the tool handle multiple authors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool automatically formats author lists, ampersands, and 'et al.' rules based on the chosen style guidelines (APA vs MLA vs Chicago).",
        },
      },
    ],
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CitationGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/academic/citation-generator" />
</div>
  );
}
