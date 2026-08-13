import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ZodiacClient from "@/components/tools/fun/zodiac-client";

export const metadata = buildMetadata({
  title: "Zodiac Sign Finder",
  description: "Enter your birth date to find your Western zodiac sign, Chinese zodiac animal, element, ruling planet, compatible signs, personality traits, lucky numbers, and birthstone.",
  path: "/tools/fun/zodiac",
  keywords: ["your", "western", "zodiac", "sign", "birth", "find", "chinese", "date", "enter", "animal"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Zodiac Sign Finder",
    description: "Enter your birth date to find your Western zodiac sign, Chinese zodiac animal, element, ruling planet, compatible signs, personality traits, lucky numbers, and birthstone.",
    path: "/tools/fun/zodiac",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ZodiacClient />
    </div>
  );
}
