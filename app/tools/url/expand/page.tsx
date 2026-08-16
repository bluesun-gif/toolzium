import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LinkExpandClient from "@/components/tools/url/link-expand-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Link Expander",
  description: "Unshorten URLs and reveal the destination of shortened links safely. Check where bit.ly, tinyurl, and other short links lead before clicking. Preview redirects and inspect link safety.",
  path: "/tools/url/expand",
  keywords: ["safely", "links", "destination", "check", "other", "shortened", "unshorten", "short", "tinyurl", "where", "urls", "reveal"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Link Expander",
    description: "Unshorten URLs and reveal the destination of shortened links safely. Check where bit.ly, tinyurl, and other short links lead before clicking. Preview redirects and inspect link safety.",
    path: "/tools/url/expand",
    categoryName: "Url",
    categoryPath: "/tools/url",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <LinkExpandClient />
    
      <RelatedTools currentToolUrl="/tools/url/expand" />
</div>
  );
}
