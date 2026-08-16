import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UaParserClient from "@/components/tools/dev/ua-parser-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "User Agent Parser & Inspector",
  description: "Parse User-Agent strings. Browser, OS, device type, engine detection. Auto-detect current browser UA. Preset sample UA strings.",
  path: "/tools/dev/ua-parser",
  keywords: ["agent", "strings", "browser", "detection", "parse", "user", "engine", "detect", "device", "auto", "type", "current"],
});

export default function Page() {
<<<<<<< HEAD
  const toolUrl = siteURL + "/tools/dev/ua-parser";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "User Agent Parser & Inspector", url: toolUrl, description: "Parse and analyze User-Agent strings.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "User Agent Parser", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a User-Agent string?", acceptedAnswer: { "@type": "Answer", text: "A User-Agent string is a text sent by your browser to websites, identifying the browser, operating system, and device type." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><UaParserClient />
      <RelatedTools currentToolUrl="/tools/dev/ua-parser" />
</div>);
=======
  const jsonLd = buildToolJsonLd({
    name: "User Agent Parser & Inspector",
    description: "Parse User-Agent strings. Browser, OS, device type, engine detection. Auto-detect current browser UA. Preset sample UA strings.",
    path: "/tools/dev/ua-parser",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <UaParserClient />
    </div>
  );
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
