import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MorseFlashlightClient from "@/components/tools/util/morse-flashlight-client";

const TITLE = "Morse Code Flashlight | Toolzium";
const DESCRIPTION = "Flash Morse code messages using your screen as a visual signal. Adjustable speed, night mode. Learn or signal Morse code instantly. Free.";
const PATH = "/tools/util/morse-flashlight";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Morse Code Flashlight",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MorseFlashlightClient />
    </>
  );
}
