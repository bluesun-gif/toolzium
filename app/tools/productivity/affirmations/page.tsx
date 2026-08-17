import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AffirmationsClient from "@/components/tools/productivity/affirmations-client";

const TITLE = "Daily Affirmations Generator | Toolzium";
const DESCRIPTION = "Generate positive daily affirmations for self-worth, career, health, relationships, and growth.";
const PATH = "/tools/productivity/affirmations";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Daily Affirmations Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AffirmationsClient />
    </>
  );
}
