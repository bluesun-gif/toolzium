import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TipSplitterClient from "@/components/tools/calc/tip-splitter-client";

export const metadata = buildMetadata({
  title: "Tip Calculator & Bill Splitter",
  description: "Calculate tips and split bills among friends. Tip calculator with percentage options (10%, 15%, 20%, custom). Free bill splitter for restaurants and group dining.",
  path: "/tools/calc/tip-split",
  keywords: ["split", "calculate", "with", "options", "among", "free", "calculator", "bills", "tips", "friends", "custom", "percentage"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Tip Calculator & Bill Splitter",
    description: "Calculate tips and split bills among friends. Tip calculator with percentage options (10%, 15%, 20%, custom). Free bill splitter for restaurants and group dining.",
    path: "/tools/calc/tip-split",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TipSplitterClient />
    </div>
  );
}
