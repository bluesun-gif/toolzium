import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonCsvClient from "@/components/tools/dev/json-csv-client";

const TITLE = "Json Csv | Toolzium";
const DESCRIPTION = "Free online json csv tool with instant calculation and privacy.";
const PATH = "/tools/dev/json-csv";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Json Csv",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonCsvClient />
    </>
  );
}
