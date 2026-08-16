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

export default function InstagramBioPage() {
  return (
    <><InstagramBioClient />
      <RelatedTools currentToolUrl="/tools/social/instagram-bio-generator" />
    </>
  );
}
