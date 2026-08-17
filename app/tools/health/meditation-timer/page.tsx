import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MeditationTimerClient from "@/components/tools/health/meditation-timer-client";

const TITLE = "Meditation Timer | Toolzium";
const DESCRIPTION = "A calming meditation timer with presets, custom durations, and a breathing guide.";
const PATH = "/tools/health/meditation-timer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Meditation Timer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MeditationTimerClient />
    </>
  );
}
