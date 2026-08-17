import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FreelanceRateClient from "@/components/tools/finance/freelance-rate-client";

const TITLE = "Freelance Rate & Wage Calculator — Hourly & Annual Salary (2026) | Toolzium";
const DESCRIPTION = "Calculate your target hourly, daily, and project rate based on desired annual salary, overhead expenses, taxes, and billable client hours.";
const PATH = "/tools/finance/freelance-rate";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Freelance Rate & Wage Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FreelanceRateClient />
    </>
  );
}
