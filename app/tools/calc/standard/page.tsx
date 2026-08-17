import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StandardCalculatorClient from "@/components/tools/calc/standard-calculator-client";

const TITLE = "Standard | Toolzium";
const DESCRIPTION = "Free online standard tool with instant calculation and privacy.";
const PATH = "/tools/calc/standard";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Standard",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <StandardCalculatorClient />
    </>
  );
}
