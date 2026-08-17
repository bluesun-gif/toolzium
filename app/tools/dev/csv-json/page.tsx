import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CsvJsonClient from "@/components/tools/dev/csv-json-client";

const TITLE = "Csv Json | Toolzium";
const DESCRIPTION = "Free online csv json tool with instant calculation and privacy.";
const PATH = "/tools/dev/csv-json";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Csv Json",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CsvJsonClient />
    </>
  );
}
