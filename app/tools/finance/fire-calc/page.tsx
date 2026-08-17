import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FireCalcClient from "@/components/tools/finance/fire-calc-client";

const TITLE = "FIRE Calculator | Toolzium";
const DESCRIPTION = "Calculate your Financial Independence and Retire Early (FIRE) age and number.";
const PATH = "/tools/finance/fire-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "FIRE Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FireCalcClient />
    </>
  );
}
