import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SopBuilderClient from "@/components/tools/office/sop-builder-client";

const TITLE = "SOP Template Builder | Toolzium";
const DESCRIPTION = "Create Standard Operating Procedure documents easily.";
const PATH = "/tools/office/sop-builder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "SOP Template Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SopBuilderClient />
    </>
  );
}
