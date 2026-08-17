import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MacLookupClient from "@/components/tools/network/mac-lookup-client";

const TITLE = "Mac Lookup | Toolzium";
const DESCRIPTION = "Free online mac lookup tool with instant calculation and privacy.";
const PATH = "/tools/network/mac-lookup";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Mac Lookup",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MacLookupClient />
    </>
  );
}
