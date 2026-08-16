import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TruthOrDareClient from "@/components/tools/fun/truth-or-dare-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Truth or Dare Generator",
  description: "Play truth or dare online! 120+ truths and dares with difficulty levels (Easy, Medium, Spicy), family-friendly and adult modes, player names, and history tracking.",
  path: "/tools/fun/truth-or-dare",
  keywords: ["easy", "with", "truths", "play", "levels", "online", "dares", "medium", "truth", "difficulty", "dare", "spicy"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Truth or Dare Generator",
    description: "Play truth or dare online! 120+ truths and dares with difficulty levels (Easy, Medium, Spicy), family-friendly and adult modes, player names, and history tracking.",
    path: "/tools/fun/truth-or-dare",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TruthOrDareClient />
    
      <RelatedTools currentToolUrl="/tools/fun/truth-or-dare" />
</div>
  );
}
