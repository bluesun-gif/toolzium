import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EisenhowerListClient from "@/components/tools/productivity/eisenhower-list-client";

const TITLE = "Eisenhower Matrix Planner | Toolzium";
const DESCRIPTION = "Organize tasks using the 4-quadrant Eisenhower method.";
const PATH = "/tools/productivity/eisenhower-list";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Eisenhower Matrix Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EisenhowerListClient />
    </>
  );
}
