import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PomodoroFocusClient from "@/components/tools/util/pomodoro-focus-client";

const TITLE = "Pomodoro | Toolzium";
const DESCRIPTION = "Free online pomodoro tool with instant calculation and privacy.";
const PATH = "/tools/util/pomodoro";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Pomodoro",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PomodoroFocusClient />
    </>
  );
}
