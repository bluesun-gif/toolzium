import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SubdomainFinderClient from "@/components/tools/network/subdomain-finder-client";

export const metadata = buildMetadata({
  title: "Subdomain Finder",
  description: "Find all registered subdomains for any domain using public Certificate Transparency (CT) logs. Fast, 100% free, and legal lookup.",
  path: "/tools/network/subdomain-finder",
  keywords: ["transparency", "public", "free", "fast", "using", "find", "domain", "certificate", "legal", "registered", "logs", "subdomains"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Subdomain Finder",
    description: "Find all registered subdomains for any domain using public Certificate Transparency (CT) logs. Fast, 100% free, and legal lookup.",
    path: "/tools/network/subdomain-finder",
    categoryName: "Network",
    categoryPath: "/tools/network",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SubdomainFinderClient />
    </div>
  );
}
