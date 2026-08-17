import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ZodiacClient from "@/components/tools/fun/zodiac-client";

const TITLE = "Zodiac | Toolzium";
const DESCRIPTION = "Free online zodiac tool with instant calculation and privacy.";
const PATH = "/tools/fun/zodiac";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Zodiac",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ZodiacClient />
    </>
  );
}
