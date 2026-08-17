import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColdEmailGeneratorClient from "@/components/tools/marketing/cold-email-generator-client";

const TITLE = "AI Cold Email & B2B Sales Outreach Sequence Generator | Toolzium";
const DESCRIPTION = "Craft high-reply B2B cold email campaigns, personalized sales pitches, and follow-up templates powered by live AI.";
const PATH = "/tools/marketing/cold-email-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Cold Email & B2B Sales Outreach Sequence Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColdEmailGeneratorClient />
    </>
  );
}
