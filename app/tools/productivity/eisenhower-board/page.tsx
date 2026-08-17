import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EisenhowerBoardClient from "@/components/tools/productivity/eisenhower-board-client";

const TITLE = "Eisenhower Matrix Board | Toolzium";
const DESCRIPTION = "Prioritize your tasks using the Eisenhower Matrix methodology. Interactive board for task management.";
const PATH = "/tools/productivity/eisenhower-board";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Eisenhower Matrix Board",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EisenhowerBoardClient />
    </>
  );
}
