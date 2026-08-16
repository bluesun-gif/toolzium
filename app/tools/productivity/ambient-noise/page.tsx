import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AmbientNoiseClient from "@/components/tools/productivity/ambient-noise-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Ambient Focus Noise & Binaural Sound Generator Studio | Toolzium",
  description: "Synthesize Brown Noise, Pink Noise, White Noise, and 40Hz Binaural Beats in your browser for deep work, focus, and sleep.",
  path: "/tools/productivity/ambient-noise",
  keywords: ["noise", "deep", "your", "brown", "white", "browser", "binaural", "synthesize", "beats", "pink"],
});

export default function AmbientNoisePage() {
  return (
    <><AmbientNoiseClient />
      <RelatedTools currentToolUrl="/tools/productivity/ambient-noise" />
    </>
  );
}
