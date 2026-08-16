import { Metadata } from "next";
import InstagramBioClient from "@/components/tools/social/instagram-bio-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "Instagram Bio & Aesthetic Caption Generator Studio | Toolzium",
  description:
    "Generate aesthetic, line-break formatted Instagram bios, content creator profile copy, and brand layout templates.",
};

export default function InstagramBioPage() {
  return (
    <><InstagramBioClient />
      <RelatedTools currentToolUrl="/tools/social/instagram-bio-generator" />
    </>
  );
}
