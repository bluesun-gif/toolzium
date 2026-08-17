import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ShiftCircadianClient from "@/components/tools/time/shift-circadian-client";

const TITLE = "Shift Work Sleep Schedule & Circadian Calculator | Toolzium";
const DESCRIPTION = "Calculate optimal sleep and wake cycles for shift workers.";
const PATH = "/tools/time/shift-circadian";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Shift Work Sleep Schedule & Circadian Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ShiftCircadianClient />
    </>
  );
}
