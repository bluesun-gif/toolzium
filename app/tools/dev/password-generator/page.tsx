import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DicewarePasswordClient from "@/components/tools/dev/password-generator-client";

const TITLE = "Password Generator | Toolzium";
const DESCRIPTION = "Free online password generator tool with instant calculation and privacy.";
const PATH = "/tools/dev/password-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Password Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DicewarePasswordClient />
    </>
  );
}
