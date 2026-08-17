import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PortReferenceClient from "@/components/tools/network/port-reference-client";

const TITLE = "Port Number Reference | Toolzium";
const DESCRIPTION = "Searchable database of common network ports and their associated services.";
const PATH = "/tools/network/port-reference";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Port Number Reference",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PortReferenceClient />
    </>
  );
}
