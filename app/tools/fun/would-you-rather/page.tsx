import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WouldYouRatherClient from "@/components/tools/fun/would-you-rather-client";

export const metadata = buildMetadata({
  title: "Would You Rather",
  description: "Play Would You Rather with 50+ dilemmas across funny, philosophical, and impossible categories. Choose between two options, see fun percentage stats, and track your choices.",
  path: "/tools/fun/would-you-rather",
  keywords: ["across", "funny", "would", "with", "philosophical", "categories", "choose", "between", "play", "rather", "impossible", "dilemmas"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Would You Rather",
    description: "Play Would You Rather with 50+ dilemmas across funny, philosophical, and impossible categories. Choose between two options, see fun percentage stats, and track your choices.",
    path: "/tools/fun/would-you-rather",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <WouldYouRatherClient />
    </div>
  );
}
