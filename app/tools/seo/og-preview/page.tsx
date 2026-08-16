import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import OGPreviewClient from "@/components/tools/seo/og-preview-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Open Graph Preview",
  description: "Preview how URLs appear on Facebook, Twitter, LinkedIn, and Slack. Test Open Graph and Twitter Card meta tags. Check social media link previews before sharing.",
  path: "/tools/seo/og-preview",
  keywords: ["facebook", "preview", "slack", "open", "card", "test", "linkedin", "graph", "urls", "appear", "twitter"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Open Graph Preview",
    description: "Preview how URLs appear on Facebook, Twitter, LinkedIn, and Slack. Test Open Graph and Twitter Card meta tags. Check social media link previews before sharing.",
    path: "/tools/seo/og-preview",
    categoryName: "Seo",
    categoryPath: "/tools/seo",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <OGPreviewClient />
    
      <RelatedTools currentToolUrl="/tools/seo/og-preview" />
</div>
  );
}
