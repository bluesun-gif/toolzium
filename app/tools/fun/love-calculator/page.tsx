import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LoveCalculatorClient from "@/components/tools/fun/love-calculator-client";

const TITLE = "Love Calculator | Toolzium";
const DESCRIPTION = "Free online love calculator tool with instant calculation and privacy.";
const PATH = "/tools/fun/love-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Love Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LoveCalculatorClient />
    </>
  );
}
