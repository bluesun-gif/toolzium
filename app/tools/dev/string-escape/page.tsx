import JsonLd from "@/components/seo/json-ld";
import StringEscapeClient from "@/components/tools/dev/string-escape-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "String Escape & Unescape Tool | Toolzium",
  description: "Escape and unescape strings online for HTML, URL, JavaScript, JSON, XML, SQL, CSS, and Base64 formats.",
  path: "/tools/dev/string-escape",
  keywords: ["string escape", "unescape", "html entities", "url encode", "json escape", "base64 encode", "sql escape"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/string-escape`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "String Escape Tool",
    url: toolUrl,
    description: "Escape and unescape strings online for HTML, URL, JavaScript, JSON, XML, SQL, CSS, and Base64 formats.",
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
      { "@type": "ListItem", position: 3, name: "String Escape", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What formats are supported?",
        acceptedAnswer: { "@type": "Answer", text: "We support HTML entities, URL encoding, JavaScript strings, JSON strings, XML, SQL, CSS strings, and Base64 encoding." }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <StringEscapeClient />
    </div>
  );
}
