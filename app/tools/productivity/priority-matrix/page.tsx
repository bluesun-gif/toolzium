import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PriorityMatrixClient from "@/components/tools/productivity/priority-matrix-client";

const TITLE = "Priority Matrix | Toolzium";
const DESCRIPTION = "Organize tasks by impact and effort using an Eisenhower-style priority matrix.";
const PATH = "/tools/productivity/priority-matrix";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Priority Matrix",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PriorityMatrixClient />
    </>
  );
}
