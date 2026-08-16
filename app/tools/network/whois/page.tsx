import JsonLd from "@/components/seo/json-ld";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
const title = "WHOIS Domain Lookup — Check Domain Registration Details | Toolzium";
const description =
  "Free online WHOIS domain lookup tool. Check registrar info, domain registration date, expiry date, owner details, name servers, and raw RDAP records instantly.";
const toolUrl = `${siteURL}/tools/network/whois`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
=======
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WhoisClient from "@/components/tools/network/whois-client";

export const metadata = buildMetadata({
  title: "WHOIS Domain Lookup",
  description: "Look up domain registration details using the free RDAP protocol. Find registrar, registration date, expiration date, nameservers, and DNSSEC status for any domain.",
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
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
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/network/whois" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
