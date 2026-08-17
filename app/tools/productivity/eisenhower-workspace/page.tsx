import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EisenhowerWorkspaceClient from "@/components/tools/productivity/eisenhower-workspace-client";

const TITLE = "Eisenhower Matrix Workspace | Toolzium";
const DESCRIPTION = "Prioritize your tasks efficiently using the Eisenhower Matrix. Add, categorize, and export your tasks by urgency and importance.";
const PATH = "/tools/productivity/eisenhower-workspace";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Eisenhower Matrix Workspace",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EisenhowerWorkspaceClient />
    </>
  );
}
