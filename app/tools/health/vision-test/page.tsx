import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import VisionTestClient from "@/components/tools/health/vision-test-client";

const TITLE = "Vision Test | Toolzium";
const DESCRIPTION = "Simple online vision screening tool.";
const PATH = "/tools/health/vision-test";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Vision Test",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <VisionTestClient />
    </>
  );
}
