import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AgeCalculatorClient from "@/components/tools/time/age-calculator-client";

const TITLE = "Age | Toolzium";
const DESCRIPTION = "Free online age tool with instant calculation and privacy.";
const PATH = "/tools/time/age";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Age",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AgeCalculatorClient />
    </>
  );
}
