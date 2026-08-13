import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorBlindnessClient from "@/components/tools/dev/color-blindness-client";

export const metadata = buildMetadata({
  title: "Color Blindness Simulator",
  description: "Simulate how colors appear to people with color blindness. Test hex colors against Protanopia, Deuteranopia, Tritanopia, and Achromatopsia. Essential accessibility tool for designers and developers.",
  path: "/tools/dev/color-blindness",
  keywords: ["against", "with", "simulate", "colors", "test", "deuteranopia", "color", "protanopia", "people", "blindness", "appear"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Blindness Simulator",
    description: "Simulate how colors appear to people with color blindness. Test hex colors against Protanopia, Deuteranopia, Tritanopia, and Achromatopsia. Essential accessibility tool for designers and developers.",
    path: "/tools/dev/color-blindness",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ColorBlindnessClient />
    </div>
  );
}
