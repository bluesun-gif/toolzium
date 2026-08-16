import JsonLd from "@/components/seo/json-ld";
import EmailHeadersClient from "@/components/tools/network/email-headers-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Email Header Analyzer",
  description: "Analyze raw email headers to trace routing paths, identify sender details, and check SPF, DKIM, and DMARC authentication results.",
  path: "/tools/network/email-headers",
  keywords: ["email header analyzer", "email trace", "SPF checker", "DKIM checker", "DMARC checker", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/email-headers`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Email Header Analyzer — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Analyze raw email headers to trace routing paths, identify sender details, and check SPF, DKIM, and DMARC authentication results.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Extract email metadata", "Trace routing hops", "Analyze SPF, DKIM, DMARC"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Network & Security", item: `${siteURL}/tools#cat-network-security` },
      { "@type": "ListItem", position: 3, name: "Email Header Analyzer", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <EmailHeadersClient />
    
      <RelatedTools currentToolUrl="/tools/network/email-headers" />
</div>
  );
}
