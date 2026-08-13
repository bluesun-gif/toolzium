import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import InstagramBioClient from "@/components/tools/social/instagram-bio-client";

export const metadata = buildMetadata({
  title: "Instagram Bio & Aesthetic Caption Generator",
  description: "Generate aesthetic, line-break formatted Instagram bios, content creator profile copy, and brand layout templates.",
  path: "/tools/social/instagram-bio-generator",
  keywords: ["aesthetic", "content", "generate", "profile", "break", "copy", "bios", "line", "creator", "formatted", "instagram", "brand"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Instagram Bio & Aesthetic Caption Generator",
    description: "Generate aesthetic, line-break formatted Instagram bios, content creator profile copy, and brand layout templates.",
    path: "/tools/social/instagram-bio-generator",
    categoryName: "Social",
    categoryPath: "/tools/social",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <InstagramBioClient />
    </div>
  );
}
