import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DailyPriorityActionBoardClient from "@/components/tools/productivity/daily-priority-action-board-client";

const TITLE = "Daily Priority Task Action Board | Toolzium";
const DESCRIPTION = "Manage your daily tasks using the Eisenhower Matrix methodology with this structured priority board.";
const PATH = "/tools/productivity/daily-priority-action-board";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Daily Priority Task Action Board",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DailyPriorityActionBoardClient />
    </>
  );
}
