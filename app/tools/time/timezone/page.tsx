import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TimeZoneConverterClient from "@/components/tools/time/timezone-converter-client";

export const metadata = buildMetadata({
  title: "Time Zone Converter",
  description: "Convert time between different time zones worldwide. World clock and time zone calculator for scheduling international meetings. Compare times across multiple cities and countries.",
  path: "/tools/time/timezone",
  keywords: ["between", "worldwide", "time", "convert", "zone", "calculator", "zones", "clock", "different", "world"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Time Zone Converter",
    description: "Convert time between different time zones worldwide. World clock and time zone calculator for scheduling international meetings. Compare times across multiple cities and countries.",
    path: "/tools/time/timezone",
    categoryName: "Time",
    categoryPath: "/tools/time",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TimeZoneConverterClient />
    </div>
  );
}
