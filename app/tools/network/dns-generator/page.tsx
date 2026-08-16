import JsonLd from "@/components/seo/json-ld";
import { DnsGeneratorClient } from "@/components/tools/network/dns-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "DNS Record Generator | Toolzium",
  description: "Generate standard DNS records for web and email setups.",
  path: "/tools/network/dns-generator",
  keywords: ["dns generator", "dns records", "zone file"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/dns-generator`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "DNS Record Generator", url: toolUrl, description: "Generate standard DNS records for web and email setups.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Network & Security Tools", item: `${siteURL}/tools#cat-network` }, { "@type": "ListItem", position: 3, name: "DNS Record Generator", item: toolUrl }] };
  
<<<<<<< HEAD
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><DnsGeneratorClient />
      <RelatedTools currentToolUrl="/tools/network/dns-generator" />
</div>);
=======

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the DNS Record Generator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's DNS Record Generator runs instantly in your browser. Generate DNS records for common setups. A, AAAA, CNAME, MX, TXT, NS, SRV types. Presets for email and website. Output in BIND zone file format. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the DNS Record Generator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the DNS Record Generator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the DNS Record Generator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><DnsGeneratorClient /></div>);
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
