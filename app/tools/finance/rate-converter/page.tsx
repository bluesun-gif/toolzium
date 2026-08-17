import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RateConverterClient from "@/components/tools/finance/rate-converter-client";

const TITLE = "Interest Rate Converter | Toolzium";
const DESCRIPTION = "Convert interest rates between APR, APY, nominal and effective rates with different compounding frequencies.";
const PATH = "/tools/finance/rate-converter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Interest Rate Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RateConverterClient />
    </>
  );
}
