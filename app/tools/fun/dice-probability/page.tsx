import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DiceProbabilityClient from "@/components/tools/fun/dice-probability-client";

export const metadata = buildMetadata({
  title: "Dice Probability Calculator",
  description: "Calculate dice roll probabilities. 1-6 dice with 4/6/8/10/12/20 sides. Exact, at least, at most conditions. Distribution chart. D&D and board game presets.",
  path: "/tools/fun/dice-probability",
  keywords: ["with", "calculate", "sides", "conditions", "roll", "distribution", "probabilities", "exact", "least", "dice", "most"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Dice Probability Calculator",
    description: "Calculate dice roll probabilities. 1-6 dice with 4/6/8/10/12/20 sides. Exact, at least, at most conditions. Distribution chart. D&D and board game presets.",
    path: "/tools/fun/dice-probability",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <DiceProbabilityClient />
    </div>
  );
}
