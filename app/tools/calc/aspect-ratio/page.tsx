import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AspectRatioClient from "@/components/tools/calc/aspect-ratio-client";

export const metadata = buildMetadata({
  title: "Aspect Ratio Calculator",
  description: "Calculate aspect ratios for any resolution. Lock ratio and compute missing dimension. Common presets: 16:9, 4:3, 21:9, 1:1, 9:16. Scale calculator.",
  path: "/tools/calc/aspect-ratio",
  keywords: ["calculate", "presets", "resolution", "scale", "lock", "common", "ratio", "dimension", "missing", "compute", "ratios", "aspect"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Aspect Ratio Calculator",
    description: "Calculate aspect ratios for any resolution. Lock ratio and compute missing dimension. Common presets: 16:9, 4:3, 21:9, 1:1, 9:16. Scale calculator.",
    path: "/tools/calc/aspect-ratio",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AspectRatioClient />
    </div>
  );
}
