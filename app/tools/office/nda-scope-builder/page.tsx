import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NdaScopeBuilderClient from "@/components/tools/office/nda-scope-builder-client";

const TITLE = "Mutual NDA Scope & Term Builder | Toolzium";
const DESCRIPTION = "Generator for Mutual and Unilateral Non-Disclosure Agreements with custom confidential information scope clauses.";
const PATH = "/tools/office/nda-scope-builder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Mutual NDA Scope & Term Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <NdaScopeBuilderClient />
    </>
  );
}
