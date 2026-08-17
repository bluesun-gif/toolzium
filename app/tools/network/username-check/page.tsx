import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UsernameCheckClient from "@/components/tools/network/username-check-client";

const TITLE = "Username Check | Toolzium";
const DESCRIPTION = "Free online username check tool with instant calculation and privacy.";
const PATH = "/tools/network/username-check";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Username Check",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <UsernameCheckClient />
    </>
  );
}
