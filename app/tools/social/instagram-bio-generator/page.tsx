import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import InstagramBioClient from "@/components/tools/social/instagram-bio-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Instagram Bio & Aesthetic Caption Generator",
  description: "Generate aesthetic, line-break formatted Instagram bios, content creator profile copy, and brand layout templates.",
  path: "/tools/social/instagram-bio-generator",
  keywords: ["aesthetic", "content", "generate", "profile", "break", "copy", "bios", "line", "creator", "formatted", "instagram", "brand"],
});

<<<<<<< HEAD
export default function InstagramBioPage() {
  return (
    <><InstagramBioClient />
      <RelatedTools currentToolUrl="/tools/social/instagram-bio-generator" />
    </>
=======
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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
