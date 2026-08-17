import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PriorityKanbanClient from "@/components/tools/productivity/priority-kanban-client";

const TITLE = "Priority Kanban Board | Toolzium";
const DESCRIPTION = "Organize tasks by priority with this simple kanban board.";
const PATH = "/tools/productivity/priority-kanban";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Priority Kanban Board",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PriorityKanbanClient />
    </>
  );
}
