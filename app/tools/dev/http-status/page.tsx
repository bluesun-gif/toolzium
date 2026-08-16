import JsonLd from "@/components/seo/json-ld";
import { HttpStatusClient } from "@/components/tools/dev/http-status-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "HTTP Status Code Reference | Toolzium",
  description: "Complete list of HTTP status codes with descriptions, categories, and common use cases.",
  path: "/tools/dev/http-status",
  keywords: ["http status codes", "developer tools", "web development", "api reference", "http errors"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/http-status`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "HTTP Status Code Reference",
    url: toolUrl,
    description: "Complete list of HTTP status codes with descriptions, categories, and common use cases.",
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
      { "@type": "ListItem", position: 3, name: "HTTP Status Codes", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a 404 status code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 404 Not Found status code indicates that the requested resource could not be found on the server, but may be available again in the future."
        }
      },
      {
        "@type": "Question",
        name: "What do 5xx errors mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "5xx status codes indicate server errors, meaning the server failed to fulfill a valid request due to an internal issue or overload."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <HttpStatusClient />
    
      <RelatedTools currentToolUrl="/tools/dev/http-status" />
</div>
  );
}
