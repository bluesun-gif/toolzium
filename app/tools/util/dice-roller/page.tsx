import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DiceRollerClient from "@/components/tools/util/dice-roller-client";

const TITLE = "Dice Roller | Toolzium";
const DESCRIPTION = "Free online dice roller tool with instant calculation and privacy.";
const PATH = "/tools/util/dice-roller";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Dice Roller",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DiceRollerClient />
    </>
  );
}
