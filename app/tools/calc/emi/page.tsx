import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmiCalculatorClient from "@/components/tools/calc/emi-calculator-client";

const TITLE = "Emi | Toolzium";
const DESCRIPTION = "Free online emi tool with instant calculation and privacy.";
const PATH = "/tools/calc/emi";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Emi",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EmiCalculatorClient />
    </>
  );
}
