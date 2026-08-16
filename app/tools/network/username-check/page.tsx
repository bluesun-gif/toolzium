import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UsernameCheckClient from "@/components/tools/network/username-check-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Username Checker",
  description: "Check username availability across 20+ social media platforms. Generate direct profile links for GitHub, Twitter, Instagram, YouTube, TikTok, Reddit, and more.",
  path: "/tools/network/username-check",
  keywords: ["across", "username", "links", "check", "generate", "profile", "availability", "direct", "social", "platforms", "media", "github"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Username Checker",
    description: "Check username availability across 20+ social media platforms. Generate direct profile links for GitHub, Twitter, Instagram, YouTube, TikTok, Reddit, and more.",
    path: "/tools/network/username-check",
    categoryName: "Network",
    categoryPath: "/tools/network",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <UsernameCheckClient />
    
      <RelatedTools currentToolUrl="/tools/network/username-check" />
</div>
  );
}
