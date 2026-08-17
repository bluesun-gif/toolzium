import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NetWorthClient from "@/components/tools/finance/net-worth-client";

const TITLE = "Net Worth Calculator | Toolzium";
const DESCRIPTION = "Calculate your personal net worth by tracking assets and liabilities. Monitor your financial growth over time.";
const PATH = "/tools/finance/net-worth";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Net Worth Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <NetWorthClient />
    </>
  );
}
