import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HttpStatusClient from "@/components/tools/dev/http-status-client";

const TITLE = "HTTP Status Code Reference | Toolzium";
const DESCRIPTION = "Complete list of HTTP status codes with descriptions, categories, and common use cases.";
const PATH = "/tools/dev/http-status";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "HTTP Status Code Reference",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HttpStatusClient />
    </>
  );
}
