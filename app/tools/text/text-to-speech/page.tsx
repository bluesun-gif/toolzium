import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TextToSpeechClient from "@/components/tools/text/text-to-speech-client";

const TITLE = "Text To Speech | Toolzium";
const DESCRIPTION = "Free online text to speech tool with instant calculation and privacy.";
const PATH = "/tools/text/text-to-speech";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Text To Speech",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TextToSpeechClient />
    </>
  );
}
