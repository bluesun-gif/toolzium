import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MetaGeneratorClient from "@/components/tools/seo/meta-generator-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Meta Tags Generator",
  description: "Generate SEO meta tags for HTML head section. Create title, description, Open Graph, Twitter Cards, canonical tags with live preview. Free meta tag generator for better search rankings.",
  path: "/tools/seo/meta-generator",
  keywords: ["description", "generate", "title", "section", "create", "open", "meta", "head", "graph", "tags", "html", "twitter"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Meta Tags Generator",
    description: "Generate SEO meta tags for HTML head section. Create title, description, Open Graph, Twitter Cards, canonical tags with live preview. Free meta tag generator for better search rankings.",
    path: "/tools/seo/meta-generator",
    categoryName: "Seo",
    categoryPath: "/tools/seo",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MetaGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/seo/meta-generator" />
</div>
  );
}
