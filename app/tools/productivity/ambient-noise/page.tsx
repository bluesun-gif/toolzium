import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AmbientNoiseClient from "@/components/tools/productivity/ambient-noise-client";

export const metadata = buildMetadata({
  title: "Ambient Focus Noise & Binaural Sound Generator Studio | Toolzium",
  description: "Synthesize Brown Noise, Pink Noise, White Noise, and 40Hz Binaural Beats in your browser for deep work, focus, and sleep.",
  path: "/tools/productivity/ambient-noise",
  keywords: ["noise", "deep", "your", "brown", "white", "browser", "binaural", "synthesize", "beats", "pink"],
});

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
  );
}
