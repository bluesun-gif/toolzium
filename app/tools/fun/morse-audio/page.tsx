import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MorseAudioClient from "@/components/tools/fun/morse-audio-client";

const TITLE = "Morse Audio | Toolzium";
const DESCRIPTION = "Free online morse audio tool with instant calculation and privacy.";
const PATH = "/tools/fun/morse-audio";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Morse Audio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MorseAudioClient />
    </>
  );
}
