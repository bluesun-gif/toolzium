import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ContrastComplianceSheetClient from "@/components/tools/image/contrast-compliance-sheet-client";

const TITLE = "Color Contrast Ratio Compliance Sheet | Toolzium";
const DESCRIPTION = "Design system WCAG accessibility contrast compliance test sheet. Generate matrix for your colors.";
const PATH = "/tools/image/contrast-compliance-sheet";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Contrast Ratio Compliance Sheet",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ContrastComplianceSheetClient />
    </>
  );
}
