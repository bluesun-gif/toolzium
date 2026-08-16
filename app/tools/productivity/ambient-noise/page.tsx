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

<<<<<<< HEAD
export default function AmbientNoisePage() {
  return (
    <><AmbientNoiseClient />
      <RelatedTools currentToolUrl="/tools/productivity/ambient-noise" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Ambient Focus Noise & Binaural Sound Generator Studio",
    description: "Synthesize Brown Noise, Pink Noise, White Noise, and 40Hz Binaural Beats in your browser for deep work, focus, and sleep.",
    path: "/tools/productivity/ambient-noise",
    categoryName: "Productivity",
    categoryPath: "/tools/productivity",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AmbientNoiseClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
