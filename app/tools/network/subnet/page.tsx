import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SubnetCalculatorClient from "@/components/tools/network/subnet-client";

const TITLE = "Subnet Calculator | Toolzium";
const DESCRIPTION = "Calculate subnet details from an IP address and CIDR notation.";
const PATH = "/tools/network/subnet";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Subnet Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SubnetCalculatorClient />
    </>
  );
}
