import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StreaksClient from "@/components/tools/productivity/streaks-client";

const TITLE = "Habit Streak Counter | Toolzium";
const DESCRIPTION = "Track habit streaks for daily activities.";
const PATH = "/tools/productivity/streaks";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Habit Streak Counter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <StreaksClient />
    </>
  );
}
