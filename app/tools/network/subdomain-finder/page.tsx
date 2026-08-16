import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SubdomainFinderClient from "@/components/tools/network/subdomain-finder-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

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
    
      <RelatedTools currentToolUrl="/tools/network/subdomain-finder" />
</div>
  );
}
