import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssKeyframesSpeedClient from "@/components/tools/dev/css-keyframes-speed-client";

export const metadata = buildMetadata({
  title: "CSS Keyframe Visual Curve & Speed Builder",
  description: "Visual CSS keyframe animation timing curve builder. Cubic-bezier parameters, easing presets, speed duration, and live ball preview.",
  path: "/tools/dev/css-keyframes-speed",
  keywords: ["animation", "parameters", "visual", "presets", "builder", "bezier", "keyframe", "easing", "curve", "speed", "timing", "cubic"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Keyframe Visual Curve & Speed Builder",
    description: "Visual CSS keyframe animation timing curve builder. Cubic-bezier parameters, easing presets, speed duration, and live ball preview.",
    path: "/tools/dev/css-keyframes-speed",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CssKeyframesSpeedClient />
    </div>
  );
}
