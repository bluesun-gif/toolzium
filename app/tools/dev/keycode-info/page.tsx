import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import KeycodeInfoClient from "@/components/tools/dev/keycode-info-client";

const TITLE = "Keycode Info | Toolzium";
const DESCRIPTION = "Free online keycode info tool with instant calculation and privacy.";
const PATH = "/tools/dev/keycode-info";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Keycode Info",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <KeycodeInfoClient />
    </>
  );
}
