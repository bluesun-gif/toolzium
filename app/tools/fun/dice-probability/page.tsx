import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DiceProbabilityClient from "@/components/tools/fun/dice-probability-client";

const TITLE = "Dice Probability | Toolzium";
const DESCRIPTION = "Free online dice probability tool with instant calculation and privacy.";
const PATH = "/tools/fun/dice-probability";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Dice Probability",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DiceProbabilityClient />
    </>
  );
}
