import JsonLd from "@/components/seo/json-ld";
import { CorsHeadersClient } from "@/components/tools/network/cors-headers-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CORS Header Generator | Toolzium",
  description: "Generate CORS headers for your server or application.",
  path: "/tools/network/cors-headers",
  keywords: ["CORS", "headers", "generator", "nginx", "apache", "express", "flask"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/cors-headers`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CORS Header Generator", url: toolUrl, description: "Generate CORS headers for your server or application.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Network & Security Tools", item: `${siteURL}/tools#cat-network` }, { "@type": "ListItem", position: 3, name: "CORS Header Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is CORS?", acceptedAnswer: { "@type": "Answer", text: "Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CorsHeadersClient /></div>);
}
