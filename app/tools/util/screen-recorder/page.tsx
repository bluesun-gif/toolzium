import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ScreenRecorderClient from "@/components/tools/util/screen-recorder-client";

const TITLE = "Screen Recorder | Toolzium";
const DESCRIPTION = "Record your screen, window, or browser tab with optional microphone audio. No extension or software needed — download instantly as WebM. Free.";
const PATH = "/tools/util/screen-recorder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Screen Recorder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScreenRecorderClient />
    </>
  );
}
