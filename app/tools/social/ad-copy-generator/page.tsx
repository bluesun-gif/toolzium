import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AdCopyGeneratorClient from "@/components/tools/social/ad-copy-generator-client";

const TITLE = "AI Facebook & Instagram Ad Copy Studio | Toolzium";
const DESCRIPTION = "Generate high-converting Meta primary text, headlines, and call-to-action variants using PAS, AIDA, and Social Proof frameworks.";
const PATH = "/tools/social/ad-copy-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Facebook & Instagram Ad Copy Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AdCopyGeneratorClient />
    </>
  );
}
