import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UaParserClient from "@/components/tools/dev/ua-parser-client";

export const metadata = buildMetadata({
  title: "User Agent Parser & Inspector",
  description: "Parse User-Agent strings. Browser, OS, device type, engine detection. Auto-detect current browser UA. Preset sample UA strings.",
  path: "/tools/dev/ua-parser",
  keywords: ["agent", "strings", "browser", "detection", "parse", "user", "engine", "detect", "device", "auto", "type", "current"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "User Agent Parser & Inspector",
    description: "Parse User-Agent strings. Browser, OS, device type, engine detection. Auto-detect current browser UA. Preset sample UA strings.",
    path: "/tools/dev/ua-parser",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <UaParserClient />
    </div>
  );
}
