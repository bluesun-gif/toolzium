import JsonLd from "@/components/seo/json-ld";
import { JsonSchemaClient } from "@/components/tools/dev/json-schema-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "JSON Schema Validator | Toolzium",
  description: "Validate JSON data against a JSON Schema instantly. Real-time validation, formatting, and helpful error messages.",
  path: "/tools/dev/json-schema",
  keywords: ["json schema validator", "json validator", "schema validation", "developer tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/json-schema`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON Schema Validator",
    url: toolUrl,
    description: "Validate JSON data against a JSON Schema instantly. Real-time validation, formatting, and helpful error messages.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${siteURL}/tools#cat-dev` },
      { "@type": "ListItem", position: 3, name: "JSON Schema Validator", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a JSON Schema?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JSON Schema is a vocabulary that allows you to annotate and validate JSON documents."
        }
      },
      {
        "@type": "Question",
        name: "Does this tool use external packages for validation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This tool uses a lightweight custom validator for basic schema validation features including required fields, types, and constraints."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <JsonSchemaClient />
    </div>
  );
}
