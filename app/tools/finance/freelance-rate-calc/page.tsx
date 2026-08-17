import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FreelanceRateCalcClient from "@/components/tools/finance/freelance-rate-calc-client";

const TITLE = "Freelance Hourly Rate & Project Pricing Calculator";
const DESCRIPTION = "Calculate your minimum required hourly rate, day rate, and project pricing based on target annual income, taxes, and overhead.";
const PATH = "/tools/finance/freelance-rate-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Freelance Hourly Rate & Project Pricing Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FreelanceRateCalcClient />
    </>
  );
}
