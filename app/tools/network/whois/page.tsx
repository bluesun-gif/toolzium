import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WhoisClient from "@/components/tools/network/whois-client";

export const metadata = buildMetadata({
  title: "WHOIS Domain Lookup",
  description: "Look up domain registration details using the free RDAP protocol. Find registrar, registration date, expiration date, nameservers, and DNSSEC status for any domain.",
  path: "/tools/network/whois",
  keywords: ["registrar", "rdap", "free", "using", "find", "domain", "registration", "look", "details", "date", "protocol"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "WHOIS Domain Lookup",
    description: "Look up domain registration details using the free RDAP protocol. Find registrar, registration date, expiration date, nameservers, and DNSSEC status for any domain.",
    path: "/tools/network/whois",
    categoryName: "Network",
    categoryPath: "/tools/network",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <WhoisClient />
    </div>
  );
}
