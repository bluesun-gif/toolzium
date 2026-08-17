import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import GratitudeClient from "@/components/tools/productivity/gratitude-client";

const TITLE = "Gratitude Journal | Toolzium";
const DESCRIPTION = "Track your daily gratitude, build a streak, and reflect on what matters.";
const PATH = "/tools/productivity/gratitude";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Gratitude Journal",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <GratitudeClient />
    </>
  );
}
