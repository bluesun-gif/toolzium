import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TimestampConverterClient from "@/components/tools/dev/timestamp-converter-client";

const TITLE = "Timestamp Converter | Toolzium";
const DESCRIPTION = "Free online timestamp converter tool with instant calculation and privacy.";
const PATH = "/tools/dev/timestamp-converter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Timestamp Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TimestampConverterClient />
    </>
  );
}
