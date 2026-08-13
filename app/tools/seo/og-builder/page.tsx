import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import OGBuilderClient from "@/components/tools/seo/og-builder-client";

export const metadata = buildMetadata({
  title: "OG Image Builder",
  description: "Create custom Open Graph images for social media sharing. Design OG images for Facebook, Twitter, LinkedIn previews. Free social media card generator with templates and customization.",
  path: "/tools/seo/og-builder",
  keywords: ["facebook", "twitter", "create", "open", "sharing", "social", "graph", "images", "media", "custom", "design"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "OG Image Builder",
    description: "Create custom Open Graph images for social media sharing. Design OG images for Facebook, Twitter, LinkedIn previews. Free social media card generator with templates and customization.",
    path: "/tools/seo/og-builder",
    categoryName: "Seo",
    categoryPath: "/tools/seo",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <OGBuilderClient />
    </div>
  );
}
