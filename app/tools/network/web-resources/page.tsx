import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WebResourcesClient from "@/components/tools/network/web-resources-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "Web & Security Directory",
  description: "Curated interactive directory of 30+ of the best search engines, threat registries, and threat databases.",
  path: "/tools/network/web-resources",
  keywords: ["interactive", "best", "directory", "databases", "threat", "search", "engines", "curated", "registries"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Web & Security Directory",
    description: "Curated interactive directory of 30+ of the best search engines, threat registries, and threat databases.",
    path: "/tools/network/web-resources",
    categoryName: "Network",
    categoryPath: "/tools/network",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <WebResourcesClient />
    
      <RelatedTools currentToolUrl="/tools/network/web-resources" />
</div>
  );
}
