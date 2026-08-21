import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CompoundInterestClient from "@/components/tools/finance/compound-interest-client";

const TITLE = "Free Compound Interest Calculator - Investment & Wealth Growth";
const DESCRIPTION =
  "Free compound interest calculator. Calculate future investment growth, monthly contributions, compounding frequencies, and export year-by-year amortization schedules.";
const PATH = "/tools/finance/compound-interest";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "compound interest calculator",
    "investment calculator",
    "compound interest formula",
    "interest calculator",
    "401k growth calculator",
    "savings calculator",
    "retirement calculator",
    "wealth growth visualizer",
    "amortization schedule csv",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free Compound Interest & Investment Growth Visualizer",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CompoundInterestClient />
    </>
  );
}
