import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RandomPickerClient from "@/components/tools/util/random-picker-client";

const TITLE = "Random Picker | Toolzium";
const DESCRIPTION = "Free online random picker tool with instant calculation and privacy.";
const PATH = "/tools/util/random-picker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Random Picker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RandomPickerClient />
    </>
  );
}
