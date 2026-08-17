import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import KanbanClient from "@/components/tools/productivity/kanban-client";

const TITLE = "Kanban Board | Toolzium";
const DESCRIPTION = "A simple, customizable kanban board to organize your tasks and boost productivity.";
const PATH = "/tools/productivity/kanban";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Kanban Board",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <KanbanClient />
    </>
  );
}
