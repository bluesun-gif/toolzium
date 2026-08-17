import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DateFormatterClient from "@/components/tools/time/date-formatter-client";

const TITLE = "Date Formatter & Converter | Toolzium";
const DESCRIPTION = "Convert dates between different formats like ISO 8601, RFC 2822, Unix timestamps, and locale-specific strings.";
const PATH = "/tools/time/date-formatter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Date Formatter & Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DateFormatterClient />
    </>
  );
}
