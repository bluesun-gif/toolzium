import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssShadowClient from "@/components/tools/dev/css-shadow-client";

export const metadata = buildMetadata({
  title: "CSS Box & Text Shadow Generator",
  description: "Visual generator for CSS box-shadow and text-shadow. Multiple shadow layers, inset toggle, presets (soft glow, neumorphism, material, neon).",
  path: "/tools/dev/css-shadow",
  keywords: ["visual", "presets", "soft", "generator", "shadow", "inset", "layers", "text", "toggle", "multiple"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Box & Text Shadow Generator",
    description: "Visual generator for CSS box-shadow and text-shadow. Multiple shadow layers, inset toggle, presets (soft glow, neumorphism, material, neon).",
    path: "/tools/dev/css-shadow",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CssShadowClient />
    </div>
  );
}
