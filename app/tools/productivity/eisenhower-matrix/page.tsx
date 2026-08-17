import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EisenhowerMatrixClient from "@/components/tools/productivity/eisenhower-matrix-client";

const TITLE = "Eisenhower Matrix | Toolzium";
const DESCRIPTION = "Prioritize your tasks using the Eisenhower Matrix methodology. Interactive 2x2 priority matrix for better time management.";
const PATH = "/tools/productivity/eisenhower-matrix";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Eisenhower Matrix",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EisenhowerMatrixClient />
    </>
  );
}
