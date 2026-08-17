import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import InstagramBioClient from "@/components/tools/social/instagram-bio-client";

const TITLE = "Instagram Bio & Aesthetic Caption Generator";
const DESCRIPTION = "Generate aesthetic, line-break formatted Instagram bios, content creator profile copy, and brand layout templates.";
const PATH = "/tools/social/instagram-bio-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Instagram Bio & Aesthetic Caption Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <InstagramBioClient />
    </>
  );
}
