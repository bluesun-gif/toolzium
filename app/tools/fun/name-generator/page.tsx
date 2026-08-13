import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NameGeneratorClient from "@/components/tools/fun/name-generator-client";

export const metadata = buildMetadata({
  title: "Random Name Generator",
  description: "Generate random names for characters, babies, usernames, and pen names. 200+ first names, fantasy names, and username patterns. Filter by gender, starting letter, and category.",
  path: "/tools/fun/name-generator",
  keywords: ["first", "username", "random", "generate", "names", "fantasy", "babies", "characters", "usernames"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Random Name Generator",
    description: "Generate random names for characters, babies, usernames, and pen names. 200+ first names, fantasy names, and username patterns. Filter by gender, starting letter, and category.",
    path: "/tools/fun/name-generator",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <NameGeneratorClient />
    </div>
  );
}
