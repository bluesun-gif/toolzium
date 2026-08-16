import AmbientNoiseClient from "@/components/tools/productivity/ambient-noise-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = {
  title: "Ambient Focus Noise & Binaural Sound Generator Studio | Toolzium",
  description: "Synthesize Brown Noise, Pink Noise, White Noise, and 40Hz Binaural Beats in your browser for deep work, focus, and sleep.",
};

export default function AmbientNoisePage() {
  return (
    <><AmbientNoiseClient />
      <RelatedTools currentToolUrl="/tools/productivity/ambient-noise" />
    </>
  );
}
