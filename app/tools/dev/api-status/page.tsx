import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ApiStatusClient from "@/components/tools/dev/api-status-client";

const TITLE = "Api Status | Toolzium";
const DESCRIPTION = "Free online api status tool with instant calculation and privacy.";
const PATH = "/tools/dev/api-status";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Api Status",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ApiStatusClient />
    </>
  );
}
