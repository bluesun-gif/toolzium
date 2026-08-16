import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DiceRollerClient from "@/components/tools/fun/dice-roller-client";

export const metadata = buildMetadata({
  title: "Dice Roller",
  description: "Roll virtual dice with crisp, visible pips. Choose 1-6 dice, roll with a click or Space bar, and track your recent rolls. Free dice roller with local history.",
  path: "/tools/fun/dice-roller",
  keywords: ["dice", "roll", "roller", "random", "pips", "board", "game", "free", "virtual", "cube"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Dice Roller",
    description: "Roll virtual dice with crisp, visible pips. Choose 1-6 dice, roll with a click or Space bar, and track your recent rolls.",
    path: "/tools/fun/dice-roller",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <DiceRollerClient />
    </div>
  );
}
