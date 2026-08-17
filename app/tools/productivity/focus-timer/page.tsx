import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FocusTimerClient from "@/components/tools/productivity/focus-timer-client";

const TITLE = "Focus Timer | Toolzium";
const DESCRIPTION = "Distraction-free focus timer with customizable sessions.";
const PATH = "/tools/productivity/focus-timer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Focus Timer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FocusTimerClient />
    </>
  );
}
