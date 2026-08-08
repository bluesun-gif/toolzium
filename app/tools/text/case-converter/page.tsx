import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import CaseConverterClient from "@/components/tools/text/case-converter-client";

const TITLE = "Case Converter — Uppercase, Lowercase, Title Case & Slugify | Toolzium";
const DESCRIPTION = "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and URL slugs online. Free text case converter tool.";
const PATH = "/tools/text/case-converter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "case converter", "uppercase to lowercase", "title case converter", "camelcase converter", 
    "snake_case", "url slug generator", "slugify text", "capitalize text", "change case online", "Toolzium"
  ],
});

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Case Converter",
      description: DESCRIPTION,
      url: siteURL + PATH,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      isAccessibleForFree: true,
      featureList: [
        "UPPERCASE converter",
        "lowercase converter",
        "Title Case converter",
        "camelCase generator",
        "PascalCase generator",
        "snake_case generator",
        "kebab-case URL slug generator",
        "CONSTANT_CASE generator",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteURL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Text Tools",
          item: siteURL + "/tools/text",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Case Converter",
          item: siteURL + PATH,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What case formats does this converter support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It supports UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case (URL slug), CONSTANT_CASE, and aLtErNaTiNg cAsE — 10 formats in total.",
          },
        },
        {
          "@type": "Question",
          name: "Is this tool free and private?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All conversions happen instantly in your browser. No data is sent to any server, and no registration is required.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between camelCase and PascalCase?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "camelCase starts with a lowercase letter (e.g., getUserName), while PascalCase starts with an uppercase letter (e.g., UserProfile). camelCase is standard for JavaScript variables; PascalCase is used for React components and C# classes.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this to generate URL slugs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The kebab-case output produces clean, lowercase, hyphen-separated strings that are ideal for SEO-friendly URL slugs.",
          },
        },
        {
          "@type": "Question",
          name: "Does the converter handle special characters?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The converter splits text by spaces, underscores, hyphens, and camelCase boundaries. Special characters within words are preserved in the output.",
          },
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd as any} />
      <CaseConverterClient />
    </>
  );
}
