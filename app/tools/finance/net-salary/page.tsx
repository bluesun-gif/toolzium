import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NetSalaryClient from "@/components/tools/finance/net-salary-client";

const TITLE = "Net Salary Calculator | Toolzium";
const DESCRIPTION = "Calculate take-home pay after tax deductions.";
const PATH = "/tools/finance/net-salary";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Net Salary Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <NetSalaryClient />
    </>
  );
}
