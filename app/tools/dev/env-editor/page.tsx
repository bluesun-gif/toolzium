import JsonLd from "@/components/seo/json-ld";
import { EnvEditorClient } from "@/components/tools/dev/env-editor-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Environment Variables Editor | Toolzium",
  description: "Visual editor for .env files. Parse, edit, validate, and format your environment variables easily.",
  path: "/tools/dev/env-editor",
  keywords: ["env editor", "dotenv editor", "environment variables", "env parser", ".env tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/env-editor`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Environment Variables Editor",
    url: toolUrl,
    description: "Visually edit, format, and validate .env files with ease.",
    applicationCategory: "DeveloperApplication",
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
      { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${siteURL}/tools#cat-dev` },
      { "@type": "ListItem", position: 3, name: "Env Editor", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the Environment Variables Editor work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can paste raw .env content and view it as a table, or manually add keys and values. It supports validation, duplicate detection, and easy copying."
        }
      },
      {
        "@type": "Question",
        name: "Can I export my environment variables as JSON?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can easily export the variables as a JSON object."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EnvEditorClient />
    
      <RelatedTools currentToolUrl="/tools/dev/env-editor" />
</div>
  );
}
