import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MyIpClient from "@/components/tools/network/my-ip-client";

const TITLE = "My Ip | Toolzium";
const DESCRIPTION = "Free online my ip tool with instant calculation and privacy.";
const PATH = "/tools/network/my-ip";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "My Ip",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MyIpClient />
    </>
  );
}
