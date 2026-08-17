import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FreeFireNameClient from "@/components/tools/gaming/free-fire-name-client";

const TITLE = "Free Fire (FF) Nickname & Boss Squad Tag Studio";
const DESCRIPTION = "Generate cool Free Fire nicknames, Boss style symbols, V.I.P tags, and invisible space characters for Garena Free Fire.";
const PATH = "/tools/gaming/free-fire-name-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free Fire (FF) Nickname & Boss Squad Tag Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FreeFireNameClient />
    </>
  );
}
