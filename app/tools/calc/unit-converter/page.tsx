import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UnitConverterClient from "@/components/tools/calc/unit-converter-client";

export const metadata = buildMetadata({
  title: "Unit Converter",
  description: "Convert units of length, weight, temperature, volume, area, speed, time, and more. Free online unit converter with support for metric, imperial, and US customary units.",
  path: "/tools/calc/unit-converter",
  keywords: ["volume", "weight", "length", "convert", "temperature", "time", "online", "free", "more", "speed", "units", "area"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Unit Converter",
    description: "Convert units of length, weight, temperature, volume, area, speed, time, and more. Free online unit converter with support for metric, imperial, and US customary units.",
    path: "/tools/calc/unit-converter",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <UnitConverterClient />
    </div>
  );
}
