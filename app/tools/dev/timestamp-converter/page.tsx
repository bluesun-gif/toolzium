import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TimestampConverterClient from "@/components/tools/dev/timestamp-converter-client";

export const metadata = buildMetadata({
  title: "Timestamp Converter",
  description: "Convert UNIX timestamps to human-readable dates and vice versa. Timestamp converter supporting milliseconds, seconds, and ISO 8601 formats. Time zone aware date converter.",
  path: "/tools/dev/timestamp-converter",
  keywords: ["human", "timestamp", "supporting", "convert", "milliseconds", "converter", "dates", "vice", "readable", "unix", "versa", "timestamps"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Timestamp Converter",
    description: "Convert UNIX timestamps to human-readable dates and vice versa. Timestamp converter supporting milliseconds, seconds, and ISO 8601 formats. Time zone aware date converter.",
    path: "/tools/dev/timestamp-converter",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TimestampConverterClient />
    </div>
  );
}
