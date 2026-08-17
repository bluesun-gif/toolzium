import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AmbientNoiseClient from "@/components/tools/productivity/ambient-noise-client";

const TITLE = "Ambient Focus Noise & Binaural Sound Generator Studio | Toolzium";
const DESCRIPTION = "Synthesize Brown Noise, Pink Noise, White Noise, and 40Hz Binaural Beats in your browser for deep work, focus, and sleep.";
const PATH = "/tools/productivity/ambient-noise";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Ambient Focus Noise & Binaural Sound Generator Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AmbientNoiseClient />
    </>
  );
}
