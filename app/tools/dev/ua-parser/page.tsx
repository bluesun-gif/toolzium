import JsonLd from "@/components/seo/json-ld";
import UaParserClient from "@/components/tools/dev/ua-parser-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "User Agent Parser & Inspector | Toolzium",
  description: "Parse and analyze User-Agent strings. Detect browser, OS, device type, and rendering engine.",
  path: "/tools/dev/ua-parser",
  keywords: ["user agent parser", "ua string", "browser detection", "device type", "developer tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/ua-parser";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "User Agent Parser & Inspector", url: toolUrl, description: "Parse and analyze User-Agent strings.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "User Agent Parser", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a User-Agent string?", acceptedAnswer: { "@type": "Answer", text: "A User-Agent string is a text sent by your browser to websites, identifying the browser, operating system, and device type." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><UaParserClient /></div>);
}
