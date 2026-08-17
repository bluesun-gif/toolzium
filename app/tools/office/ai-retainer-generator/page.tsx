import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiRetainerGeneratorClient from "@/components/tools/office/ai-retainer-generator-client";

const TITLE = "AI Client Retainer & Scope Proposal Generator";
const DESCRIPTION = "Craft recurring monthly client retainer proposals, service allocation tiers, SLA guarantees, and overage terms with live AI.";
const PATH = "/tools/office/ai-retainer-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Client Retainer & Scope Proposal Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiRetainerGeneratorClient />
    </>
  );
}
