import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TranslateClient from "@/components/tools/text/translate-client";

const TITLE = "Translate | Toolzium";
const DESCRIPTION = "Free online translate tool with instant calculation and privacy.";
const PATH = "/tools/text/translate";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Translate",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TranslateClient />
    </>
  );
}
