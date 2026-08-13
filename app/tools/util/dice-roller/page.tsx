import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DiceRollerClient from "@/components/tools/util/dice-roller-client";

export const metadata = buildMetadata({
  title: "Roll a Dice",
  description: "Roll virtual dice online with realistic animations. Support for 1-6 dice, roll history, and statistics. Fair random dice roller for board games, RPGs, and decision making.",
  path: "/tools/util/dice-roller",
  keywords: ["virtual", "with", "animations", "statistics", "online", "history", "dice", "realistic", "roll", "support"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Roll a Dice",
    description: "Roll virtual dice online with realistic animations. Support for 1-6 dice, roll history, and statistics. Fair random dice roller for board games, RPGs, and decision making.",
    path: "/tools/util/dice-roller",
    categoryName: "Util",
    categoryPath: "/tools/util",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <DiceRollerClient />
    </div>
  );
}
