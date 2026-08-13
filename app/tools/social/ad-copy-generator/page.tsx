import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AdCopyGeneratorClient from "@/components/tools/social/ad-copy-generator-client";
import { siteURL } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "AI Facebook & Instagram Ad Copy Studio | Toolzium",
  description:
    "Generate high-converting Meta primary text, headlines, and call-to-action variants using PAS, AIDA, and Social Proof frameworks.",
  path: "/tools/social/ad-copy-generator",
  keywords: [
    "ad copy generator",
    "facebook ad copy",
    "instagram ad copy",
    "ai ad copy writer",
    "meta ad copy generator",
    "copy ai",
    "aida copywriting",
    "pas copywriting",
  ],
});

export default function AdCopyGeneratorPage() {
  const toolUrl = `${siteURL}/tools/social/ad-copy-generator`;

  const jsonLd = buildToolJsonLd({
    name: "AI Ad Copy Generator",
    description:
      "Generate high-converting Meta primary text, headlines, and call-to-action variants using PAS, AIDA, and Social Proof frameworks.",
    path: "/tools/social/ad-copy-generator",
    categoryName: "Social Media Tools",
    categoryPath: "/tools/social",
  });

  return (
    <div className="space-y-4">
      <JsonLd data={jsonLd[0]} />
      <JsonLd data={jsonLd[1]} />
      <JsonLd data={jsonLd[2]} />
      <AdCopyGeneratorClient />
    </div>
  );
}
