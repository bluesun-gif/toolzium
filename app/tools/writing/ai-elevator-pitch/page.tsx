import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiElevatorPitchClient from "@/components/tools/writing/ai-elevator-pitch-client";

const TITLE = "Ai Elevator Pitch | Toolzium";
const DESCRIPTION = "Free online ai elevator pitch generator and assistant. Fast, private, and 100% free forever.";
const PATH = "/tools/writing/ai-elevator-pitch";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Ai Elevator Pitch",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiElevatorPitchClient />
    </>
  );
}
