import JsonLd from "@/components/seo/json-ld";
import SslCheckerClient from "@/components/tools/network/ssl-checker-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "SSL Certificate Checker",
  description: "Check the SSL/TLS certificate details of any website. View issuer, expiration date, SANs, and validity status instantly.",
  path: "/tools/network/ssl-checker",
  keywords: ["SSL checker", "certificate checker", "TLS certificate", "check SSL expiration", "crt.sh", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/ssl-checker`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SSL Certificate Checker — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Check the SSL/TLS certificate details of any website. View issuer, expiration date, SANs, and validity status instantly.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Check SSL certificate expiration", "View certificate issuer details", "Check certificate transparency logs"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Network & Security", item: `${siteURL}/tools#cat-network-security` },
      { "@type": "ListItem", position: 3, name: "SSL Certificate Checker", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <SslCheckerClient />
    
      <RelatedTools currentToolUrl="/tools/network/ssl-checker" />
</div>
  );
}
