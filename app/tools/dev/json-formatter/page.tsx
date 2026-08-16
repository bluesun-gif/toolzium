import { ToolPageTracker } from "@/components/analytics/tool-page-tracker";
import JsonLd from "@/components/seo/json-ld";
import JSONFormatterClient from "@/components/tools/dev/json-formatter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Free JSON Formatter, Prettifier & Validator | Toolzium",
  description:
    "Pretty print, validate, and minify JSON data online. Sort object keys, detect syntax errors, generate TypeScript interfaces, and audit schemas.",
  path: "/tools/dev/json-formatter",
  keywords: [
    "JSON formatter",
    "pretty print JSON",
    "validate JSON online",
    "JSON validator",
    "minify JSON",
    "beautify JSON",
    "sort JSON keys",
    "JSON syntax checker",
    "Toolzium",
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/json-formatter`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free JSON Formatter, Prettifier & Validator — Toolzium",
    url: toolUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    description:
      "Format, validate, and minify JSON data online with syntax highlighting, key sorting, and live AI schema auditing.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Pretty print JSON with 2-space, 4-space, or tab indents",
      "Real-time syntax validation with line error detection",
      "Minify JSON for compact API payload storage",
      "Sort object keys recursively for clean git diffs",
      "AI Schema audit & TypeScript interface inference",
      "100% Client-Side Privacy: zero server logging",
    ],
    creator: {
      "@type": "Organization",
      name: "Toolzium",
      url: "https://toolzium.com",
    },
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteURL}` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 3, name: "JSON Formatter", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a JSON Formatter and why do I need one?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A JSON Formatter takes raw, minified, or unformatted JSON strings and structures them with proper indentation, line breaks, and spacing. This makes API responses and configuration files human-readable and easy to debug.",
        },
      },
      {
        "@type": "Question",
        name: "What are the most common JSON syntax errors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common JSON syntax errors include: 1) Trailing commas after the last item in objects or arrays. 2) Using single quotes ('key') instead of mandatory double quotes (\"key\"). 3) Unquoted keys. 4) Missing closing brackets } or ].",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Prettifying and Minifying JSON?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Prettifying adds spaces, indentation, and newlines to make JSON human-readable. Minifying removes all extra spaces and line breaks to minimize file size and reduce network payload transfer times.",
        },
      },
      {
        "@type": "Question",
        name: "Is my JSON payload or API data uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Toolzium processes all JSON in your browser using JavaScript's native JSON.parse() and JSON.stringify(). Your data never leaves your computer.",
        },
      },
      {
        "@type": "Question",
        name: "How large of a JSON payload can I format?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Since processing happens locally, Toolzium can handle multi-megabyte JSON files limited only by your computer's available memory.",
        },
      },
    ],
  };

  return (
    <div className="space-y-4">
      <ToolPageTracker toolName="JSON Formatter" category="Developer" />
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />

      <JSONFormatterClient />
    
      <RelatedTools currentToolUrl="/tools/dev/json-formatter" />
</div>
  );
}
