import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EisenhowerChecklistClient from "@/components/tools/productivity/eisenhower-checklist-client";

const TITLE = "Eisenhower Urgency Matrix Checklist | Toolzium";
const DESCRIPTION = "Organize tasks effectively using the Eisenhower Matrix methodology.";
const PATH = "/tools/productivity/eisenhower-checklist";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Eisenhower Urgency Matrix Checklist",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EisenhowerChecklistClient />
    </>
  );
}
