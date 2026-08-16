import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UsernameCheckClient from "@/components/tools/network/username-check-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

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
