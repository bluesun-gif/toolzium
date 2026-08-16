import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RandomPickerClient from "@/components/tools/util/random-picker-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "Random Picker",
  description: "Pick random winners from a list of names. Random name picker for contests, giveaways, and decision making. Fair and unbiased random selection tool.",
  path: "/tools/util/random-picker",
  keywords: ["from", "giveaways", "random", "list", "names", "winners", "picker", "contests", "decision", "name", "pick"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Random Picker",
    description: "Pick random winners from a list of names. Random name picker for contests, giveaways, and decision making. Fair and unbiased random selection tool.",
    path: "/tools/util/random-picker",
    categoryName: "Util",
    categoryPath: "/tools/util",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <RandomPickerClient />
    
      <RelatedTools currentToolUrl="/tools/util/random-picker" />
</div>
  );
}
