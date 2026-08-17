import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PriorityQuadrantBoardClient from "@/components/tools/productivity/priority-quadrant-board-client";

const TITLE = "Priority Quadrant Action Board | Toolzium";
const DESCRIPTION = "Interactive 4-quadrant task board with priority sorting.";
const PATH = "/tools/productivity/priority-quadrant-board";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Priority Quadrant Action Board",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PriorityQuadrantBoardClient />
    </>
  );
}
