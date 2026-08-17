import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import Magic8BallClient from "@/components/tools/fun/magic-8-ball-client";

const TITLE = "Magic 8 Ball | Toolzium";
const DESCRIPTION = "Free online magic 8 ball tool with instant calculation and privacy.";
const PATH = "/tools/fun/magic-8-ball";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Magic 8 Ball",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Magic8BallClient />
    </>
  );
}
