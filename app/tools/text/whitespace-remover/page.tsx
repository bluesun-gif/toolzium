import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import WhitespaceRemoverClient from "@/components/tools/text/whitespace-remover-client";
const TITLE = "Whitespace Remover — Remove Extra Spaces & Blank Lines | Toolzium";
const DESCRIPTION = "Remove extra spaces, blank lines, leading/trailing whitespace from text. Clean and trim text online for free. No signup required.";
const URL = `${siteURL}/tools/text/whitespace-remover`;

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/tools/text/whitespace-remover",
  keywords: [
    "whitespace remover", "remove extra spaces", "trim spaces online", "remove blank lines", "clean whitespace", "strip spaces", "remove whitespace online", "space remover", "trim whitespace", "clean text spaces", "remove double spaces", "whitespace cleaner", "text trimmer", "Toolzium", "online tools"
  ]
});

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": TITLE,
        "description": DESCRIPTION,
        "url": URL,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteURL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Text Tools",
            "item": `${siteURL}/tools/text`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Whitespace Remover",
            "item": URL
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does a whitespace remover do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It removes extra spaces, blank lines, and unnecessary whitespace from your text."
            }
          },
          {
            "@type": "Question",
            "name": "Can I keep single spaces?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, use the 'collapse multiple spaces' option to keep single spaces."
            }
          },
          {
            "@type": "Question",
            "name": "Does it modify my original text?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it processes in your browser and shows a clean copy."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd} />
      <WhitespaceRemoverClient />
    
      <RelatedTools currentToolUrl="/tools/text/whitespace-remover" />
</div>
  );
}
