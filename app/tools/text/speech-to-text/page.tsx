import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SpeechToTextClient from "@/components/tools/text/speech-to-text-client";

const TITLE = "Speech To Text | Toolzium";
const DESCRIPTION = "Free online speech to text tool with instant calculation and privacy.";
const PATH = "/tools/text/speech-to-text";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Speech To Text",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SpeechToTextClient />
    </>
  );
}
