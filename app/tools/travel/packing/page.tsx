import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PackingChecklistClient from "@/components/tools/travel/packing-checklist-client";

const TITLE = "Packing | Toolzium";
const DESCRIPTION = "Free online packing tool with instant calculation and privacy.";
const PATH = "/tools/travel/packing";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Packing",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PackingChecklistClient />
    </>
  );
}
