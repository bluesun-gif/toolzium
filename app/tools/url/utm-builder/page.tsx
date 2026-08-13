import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UTMBuilderClient from "@/components/tools/url/utm-builder-client";

export const metadata = buildMetadata({
  title: "UTM Builder",
  description: "Build campaign tracking URLs with UTM parameters for Google Analytics. Generate utm_source, utm_medium, utm_campaign, utm_term, and utm_content tags to track your marketing performance.",
  path: "/tools/url/utm-builder",
  keywords: ["build", "with", "campaign", "parameters", "generate", "your", "tracking", "analytics", "google", "track", "urls", "tags"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "UTM Builder",
    description: "Build campaign tracking URLs with UTM parameters for Google Analytics. Generate utm_source, utm_medium, utm_campaign, utm_term, and utm_content tags to track your marketing performance.",
    path: "/tools/url/utm-builder",
    categoryName: "Url",
    categoryPath: "/tools/url",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <UTMBuilderClient />
    </div>
  );
}
