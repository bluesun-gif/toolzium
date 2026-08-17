import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JwtDecoderClient from "@/components/tools/dev/jwt-decoder-client";

const TITLE = "Jwt Decode | Toolzium";
const DESCRIPTION = "Free online jwt decode tool with instant calculation and privacy.";
const PATH = "/tools/dev/jwt-decode";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Jwt Decode",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <JwtDecoderClient />
    </>
  );
}
