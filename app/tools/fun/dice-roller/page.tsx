import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DiceRollerClient from "@/components/tools/fun/dice-roller-client";

const TITLE = "Dice Roller";
const DESCRIPTION = "Roll virtual dice with crisp, visible pips. Choose 1-6 dice, roll with a click or Space bar, and track your recent rolls. Free dice roller with local history.";
const PATH = "/tools/fun/dice-roller";

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
