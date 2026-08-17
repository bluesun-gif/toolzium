import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ApiTesterClient from "@/components/tools/dev/api-tester-client";

const TITLE = "Api Tester | Toolzium";
const DESCRIPTION = "Free online api tester tool with instant calculation and privacy.";
const PATH = "/tools/dev/api-tester";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Api Tester",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ApiTesterClient />
    </>
  );
}
