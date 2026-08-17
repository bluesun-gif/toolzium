import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WouldYouRatherClient from "@/components/tools/fun/would-you-rather-client";

const TITLE = "Would You Rather | Toolzium";
const DESCRIPTION = "Free online would you rather tool with instant calculation and privacy.";
const PATH = "/tools/fun/would-you-rather";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Would You Rather",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WouldYouRatherClient />
    </>
  );
}
