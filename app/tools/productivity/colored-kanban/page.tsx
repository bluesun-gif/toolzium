import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColoredKanbanClient from "@/components/tools/productivity/colored-kanban-client";

const TITLE = "Color-Coded Category Kanban Board | Toolzium";
const DESCRIPTION = "Visual Kanban task board with custom color tags & category badges.";
const PATH = "/tools/productivity/colored-kanban";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color-Coded Category Kanban Board",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColoredKanbanClient />
    </>
  );
}
