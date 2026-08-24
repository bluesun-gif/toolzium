import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BaseConverterClient from "@/components/tools/dev/base-converter-client";

const TITLE = "Universal Number Base Converter | Toolzium";
const DESCRIPTION = "Convert numbers across Binary, Octal, Decimal, Hexadecimal, ASCII, and Custom Radix (2 to 36) with arbitrary precision.";
const PATH = "/tools/dev/base-converter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Universal Number Base & Radix Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BaseConverterClient />
    </>
  );
}
