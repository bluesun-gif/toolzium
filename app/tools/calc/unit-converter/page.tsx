import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UnitConverterClient from "@/components/tools/calc/unit-converter-client";

const TITLE = "Unit Converter | Toolzium";
const DESCRIPTION = "Free online unit converter tool with instant calculation and privacy.";
const PATH = "/tools/calc/unit-converter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Unit Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <UnitConverterClient />
    </>
  );
}
