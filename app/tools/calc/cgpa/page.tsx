import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CgpaCalculatorClient from "@/components/tools/calc/cgpa-calculator-client";

const TITLE = "Cgpa | Toolzium";
const DESCRIPTION = "Free online cgpa tool with instant calculation and privacy.";
const PATH = "/tools/calc/cgpa";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Cgpa",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CgpaCalculatorClient />
    </>
  );
}
