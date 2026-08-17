import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FreelanceTaxCalcClient from "@/components/tools/finance/freelance-tax-calc-client";

const TITLE = "Freelance Tax & Quarterly Estimate Calculator | Toolzium";
const DESCRIPTION = "Calculate estimated self-employment tax, income tax, and quarterly estimated payments for freelancers and contractors.";
const PATH = "/tools/finance/freelance-tax-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Freelance Tax & Quarterly Estimate Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FreelanceTaxCalcClient />
    </>
  );
}
