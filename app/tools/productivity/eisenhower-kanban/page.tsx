import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EisenhowerKanbanClient from "@/components/tools/productivity/eisenhower-kanban-client";

const TITLE = "Eisenhower Kanban Board | Toolzium";
const DESCRIPTION = "Manage your tasks using a hybrid Kanban board organized by the Eisenhower matrix (Urgent vs Important).";
const PATH = "/tools/productivity/eisenhower-kanban";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Eisenhower Kanban Board",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EisenhowerKanbanClient />
    </>
  );
}
