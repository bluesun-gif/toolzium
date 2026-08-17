import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PriorityMatrix2x2Client from "@/components/tools/productivity/priority-matrix-2x2-client";

const TITLE = "Priority Matrix 2x2 Task Tracker | Toolzium";
const DESCRIPTION = "Organize tasks using a 2x2 Impact vs Effort Matrix to prioritize your work efficiently.";
const PATH = "/tools/productivity/priority-matrix-2x2";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Priority Matrix 2x2 Task Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PriorityMatrix2x2Client />
    </>
  );
}
